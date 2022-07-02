"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.renderToHTML = renderToHTML;
var _react = _interopRequireDefault(require("react"));
var _querystring = require("querystring");
var _reactServerDomWebpack = require("next/dist/compiled/react-server-dom-webpack");
var _writerBrowserServer = require("next/dist/compiled/react-server-dom-webpack/writer.browser.server");
var _styledJsx = require("styled-jsx");
var _renderResult = _interopRequireDefault(require("./render-result"));
var _nodeWebStreamsHelper = require("./node-web-streams-helper");
var _utils = require("../shared/lib/router/utils");
var _node = require("./api-utils/node");
var _htmlescape = require("./htmlescape");
var _utils1 = require("./utils");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const ReactDOMServer = process.env.__NEXT_REACT_ROOT ? require("react-dom/server.browser") : require("react-dom/server");
function interopDefault(mod) {
    return mod.default || mod;
}
const rscCache = new Map();
var // Shadowing check does not work with TypeScript enums
// eslint-disable-next-line no-shadow
RecordStatus;
(function(RecordStatus) {
    RecordStatus[RecordStatus["Pending"] = 0] = "Pending";
    RecordStatus[RecordStatus["Resolved"] = 1] = "Resolved";
    RecordStatus[RecordStatus["Rejected"] = 2] = "Rejected";
})(RecordStatus || (RecordStatus = {}));
function createRecordFromThenable(thenable) {
    const record = {
        status: 0,
        value: thenable
    };
    thenable.then(function(value) {
        if (record.status === 0) {
            const resolvedRecord = record;
            resolvedRecord.status = 1;
            resolvedRecord.value = value;
        }
    }, function(err) {
        if (record.status === 0) {
            const rejectedRecord = record;
            rejectedRecord.status = 2;
            rejectedRecord.value = err;
        }
    });
    return record;
}
function readRecordValue(record) {
    if (record.status === 1) {
        return record.value;
    } else {
        throw record.value;
    }
}
function preloadDataFetchingRecord(map, key, fetcher) {
    let record = map.get(key);
    if (!record) {
        const thenable = fetcher();
        record = createRecordFromThenable(thenable);
        map.set(key, record);
    }
    return record;
}
function useFlightResponse(writable, cachePrefix, req, serverComponentManifest) {
    const id = cachePrefix + "," + _react.default.useId();
    let entry = rscCache.get(id);
    if (!entry) {
        const [renderStream, forwardStream] = (0, _nodeWebStreamsHelper).readableStreamTee(req);
        entry = (0, _reactServerDomWebpack).createFromReadableStream(renderStream, {
            moduleMap: serverComponentManifest.__ssr_module_mapping__
        });
        rscCache.set(id, entry);
        let bootstrapped = false;
        const forwardReader = forwardStream.getReader();
        const writer = writable.getWriter();
        function process() {
            forwardReader.read().then(({ done , value  })=>{
                if (!bootstrapped) {
                    bootstrapped = true;
                    writer.write((0, _nodeWebStreamsHelper).encodeText(`<script>(self.__next_s=self.__next_s||[]).push(${(0, _htmlescape).htmlEscapeJsonString(JSON.stringify([
                        0,
                        id
                    ]))})</script>`));
                }
                if (done) {
                    rscCache.delete(id);
                    writer.close();
                } else {
                    writer.write((0, _nodeWebStreamsHelper).encodeText(`<script>(self.__next_s=self.__next_s||[]).push(${(0, _htmlescape).htmlEscapeJsonString(JSON.stringify([
                        1,
                        id,
                        (0, _nodeWebStreamsHelper).decodeText(value)
                    ]))})</script>`));
                    process();
                }
            });
        }
        process();
    }
    return entry;
}
// Create the wrapper component for a Flight stream.
function createServerComponentRenderer(ComponentToRender, ComponentMod, { cachePrefix , transformStream , serverComponentManifest  }) {
    // We need to expose the `__webpack_require__` API globally for
    // react-server-dom-webpack. This is a hack until we find a better way.
    if (ComponentMod.__next_app_webpack_require__ || ComponentMod.__next_rsc__) {
        // @ts-ignore
        globalThis.__next_require__ = ComponentMod.__next_app_webpack_require__ || ComponentMod.__next_rsc__.__webpack_require__;
        // @ts-ignore
        globalThis.__next_chunk_load__ = ()=>Promise.resolve();
    }
    const writable = transformStream.writable;
    const ServerComponentWrapper = (props)=>{
        const reqStream = (0, _writerBrowserServer).renderToReadableStream(/*#__PURE__*/ _react.default.createElement(ComponentToRender, Object.assign({}, props)), serverComponentManifest);
        const response = useFlightResponse(writable, cachePrefix, reqStream, serverComponentManifest);
        const root = response.readRoot();
        return root;
    };
    return ServerComponentWrapper;
}
async function renderToHTML(req, res, pathname, query, renderOpts) {
    // don't modify original query object
    query = Object.assign({}, query);
    const { buildManifest , serverComponentManifest , supportsDynamicHTML , runtime , ComponentMod ,  } = renderOpts;
    const isFlight = query.__flight__ !== undefined;
    const flightRouterPath = isFlight ? query.__flight_router_path__ : undefined;
    (0, _utils1).stripInternalQueries(query);
    const hasConcurrentFeatures = !!runtime;
    const pageIsDynamic = (0, _utils).isDynamicRoute(pathname);
    const componentPaths = Object.keys(ComponentMod.components);
    const components = componentPaths.filter((path)=>{
        // Rendering part of the page is only allowed for flight data
        if (flightRouterPath) {
            // TODO: check the actual path
            const pathLength = path.length;
            return pathLength > flightRouterPath.length;
        }
        return true;
    }).sort().map((path)=>{
        const mod = ComponentMod.components[path]();
        mod.Component = interopDefault(mod);
        mod.path = path;
        return mod;
    });
    const isSubtreeRender = components.length < componentPaths.length;
    // Reads of this are cached on the `req` object, so this should resolve
    // instantly. There's no need to pass this data down from a previous
    // invoke, where we'd have to consider server & serverless.
    const previewData = (0, _node).tryGetPreviewData(req, res, renderOpts.previewProps);
    const isPreview = previewData !== false;
    const dataCache = new Map();
    let WrappedComponent;
    for(let i = components.length - 1; i >= 0; i--){
        const dataCacheKey = i.toString();
        const layout = components[i];
        let fetcher;
        // TODO: pass a shared cache from previous getStaticProps/
        // getServerSideProps calls?
        if (layout.getServerSideProps) {
            fetcher = ()=>Promise.resolve(layout.getServerSideProps({
                    req: req,
                    res: res,
                    query,
                    resolvedUrl: renderOpts.resolvedUrl,
                    ...pageIsDynamic ? {
                        params: renderOpts.params
                    } : undefined,
                    ...isPreview ? {
                        preview: true,
                        previewData: previewData
                    } : undefined,
                    locales: renderOpts.locales,
                    locale: renderOpts.locale,
                    defaultLocale: renderOpts.defaultLocale
                }));
        }
        // TODO: implement layout specific caching for getStaticProps
        if (layout.getStaticProps) {
            fetcher = ()=>Promise.resolve(layout.getStaticProps({
                    ...pageIsDynamic ? {
                        params: query
                    } : undefined,
                    ...isPreview ? {
                        preview: true,
                        previewData: previewData
                    } : undefined,
                    locales: renderOpts.locales,
                    locale: renderOpts.locale,
                    defaultLocale: renderOpts.defaultLocale
                }));
        }
        if (fetcher) {
            // Kick off data fetching before rendering, this ensures there is no waterfall for layouts as
            // all data fetching required to render the page is kicked off simultaneously
            preloadDataFetchingRecord(dataCache, dataCacheKey, fetcher);
        }
        const LayoutRouter = ComponentMod.LayoutRouter;
        const getLoadingMod = ComponentMod.loadingComponents[layout.path];
        const Loading = getLoadingMod ? interopDefault(getLoadingMod()) : null;
        // eslint-disable-next-line no-loop-func
        const lastComponent = WrappedComponent;
        WrappedComponent = (props)=>{
            if (fetcher) {
                // The data fetching was kicked off before rendering (see above)
                // if the data was not resolved yet the layout rendering will be suspended
                const record = preloadDataFetchingRecord(dataCache, dataCacheKey, fetcher);
                // Result of calling getStaticProps or getServerSideProps. If promise is not resolve yet it will suspend.
                const recordValue = readRecordValue(record);
                if (props) {
                    props = Object.assign({}, props, recordValue.props);
                } else {
                    props = recordValue.props;
                }
            }
            const children = /*#__PURE__*/ _react.default.createElement(lastComponent || _react.default.Fragment, {}, null);
            // TODO: add tests for loading.js
            const chilrenWithLoading = Loading ? /*#__PURE__*/ _react.default.createElement(_react.default.Suspense, {
                fallback: /*#__PURE__*/ _react.default.createElement(Loading, null)
            }, children) : children;
            // Pages don't need to be wrapped in a router
            return /*#__PURE__*/ _react.default.createElement(layout.Component, props, layout.path.endsWith("/page") ? chilrenWithLoading : // TODO: only provide the part of the url that is relevant to the layout (see layout-router.client.tsx)
            /*#__PURE__*/ _react.default.createElement(LayoutRouter, {
                initialUrl: pathname,
                layoutPath: layout.path
            }, chilrenWithLoading));
        };
    // TODO: loading state
    // const AfterWrap = WrappedComponent
    // WrappedComponent = () => {
    //   return (
    //     <Suspense fallback={<>Loading...</>}>
    //       <AfterWrap />
    //     </Suspense>
    //   )
    // }
    }
    const AppRouter = ComponentMod.AppRouter;
    const WrappedComponentWithRouter = ()=>{
        if (flightRouterPath) {
            return /*#__PURE__*/ _react.default.createElement(WrappedComponent, null);
        }
        return(// TODO: verify pathname passed is correct
        /*#__PURE__*/ _react.default.createElement(AppRouter, {
            initialUrl: pathname
        }, /*#__PURE__*/ _react.default.createElement(WrappedComponent, null)));
    };
    const bootstrapScripts = !isSubtreeRender ? buildManifest.rootMainFiles.map((src)=>"/_next/" + src) : undefined;
    let serverComponentsInlinedTransformStream = null;
    serverComponentsInlinedTransformStream = new TransformStream();
    const search = (0, _querystring).stringify(query);
    const Component = createServerComponentRenderer(WrappedComponentWithRouter, ComponentMod, {
        cachePrefix: pathname + (search ? `?${search}` : ""),
        transformStream: serverComponentsInlinedTransformStream,
        serverComponentManifest
    });
    const jsxStyleRegistry = (0, _styledJsx).createStyleRegistry();
    const styledJsxFlushEffect = ()=>{
        const styles = jsxStyleRegistry.styles();
        jsxStyleRegistry.flush();
        return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, styles);
    };
    const AppContainer = ({ children  })=>/*#__PURE__*/ _react.default.createElement(_styledJsx.StyleRegistry, {
            registry: jsxStyleRegistry
        }, children);
    const renderServerComponentData = isFlight;
    if (renderServerComponentData) {
        return new _renderResult.default((0, _writerBrowserServer).renderToReadableStream(/*#__PURE__*/ _react.default.createElement(WrappedComponentWithRouter, null), serverComponentManifest).pipeThrough((0, _nodeWebStreamsHelper).createBufferedTransformStream()));
    }
    /**
   * Rules of Static & Dynamic HTML:
   *
   *    1.) We must generate static HTML unless the caller explicitly opts
   *        in to dynamic HTML support.
   *
   *    2.) If dynamic HTML support is requested, we must honor that request
   *        or throw an error. It is the sole responsibility of the caller to
   *        ensure they aren't e.g. requesting dynamic HTML for an AMP page.
   *
   * These rules help ensure that other existing features like request caching,
   * coalescing, and ISR continue working as intended.
   */ const generateStaticHTML = supportsDynamicHTML !== true;
    const bodyResult = async ()=>{
        const content = /*#__PURE__*/ _react.default.createElement(AppContainer, null, /*#__PURE__*/ _react.default.createElement(Component, null));
        const renderStream = await (0, _nodeWebStreamsHelper).renderToInitialStream({
            ReactDOMServer,
            element: content,
            streamOptions: {
                bootstrapScripts
            }
        });
        const flushEffectHandler = ()=>{
            const flushed = ReactDOMServer.renderToString(styledJsxFlushEffect());
            return flushed;
        };
        // Handle static data for server components.
        // async function generateStaticFlightDataIfNeeded() {
        //   if (serverComponentsPageDataTransformStream) {
        //     // If it's a server component with the Node.js runtime, we also
        //     // statically generate the page data.
        //     let data = ''
        //     const readable = serverComponentsPageDataTransformStream.readable
        //     const reader = readable.getReader()
        //     const textDecoder = new TextDecoder()
        //     while (true) {
        //       const { done, value } = await reader.read()
        //       if (done) {
        //         break
        //       }
        //       data += decodeText(value, textDecoder)
        //     }
        //     ;(renderOpts as any).pageData = {
        //       ...(renderOpts as any).pageData,
        //       __flight__: data,
        //     }
        //     return data
        //   }
        // }
        // @TODO: A potential improvement would be to reuse the inlined
        // data stream, or pass a callback inside as this doesn't need to
        // be streamed.
        // Do not use `await` here.
        // generateStaticFlightDataIfNeeded()
        return await (0, _nodeWebStreamsHelper).continueFromInitialStream(renderStream, {
            suffix: "",
            dataStream: serverComponentsInlinedTransformStream == null ? void 0 : serverComponentsInlinedTransformStream.readable,
            generateStaticHTML: generateStaticHTML || !hasConcurrentFeatures,
            flushEffectHandler
        });
    };
    return new _renderResult.default(await bodyResult());
}

//# sourceMappingURL=app-render.js.map