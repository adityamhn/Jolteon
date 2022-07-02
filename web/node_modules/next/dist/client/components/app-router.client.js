"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = AppRouter;
exports.fetchServerResponse = fetchServerResponse;
var _react = _interopRequireDefault(require("react"));
var _reactServerDomWebpack = require("next/dist/compiled/react-server-dom-webpack");
var _appRouterContext = require("../../shared/lib/app-router-context");
var _userouterJs = _interopRequireDefault(require("./userouter.js"));
function AppRouter({ initialUrl , layoutPath , children  }) {
    var ref;
    const [appRouter, previousUrlRef, current] = (0, _userouterJs).default(initialUrl);
    const onPopState = _react.default.useCallback(({ state  })=>{
        if (!state) {
            return;
        }
        // @ts-ignore useTransition exists
        // TODO: Ideally the back button should not use startTransition as it should apply the updates synchronously
        _react.default.startTransition(()=>appRouter.replace(state.url));
    }, [
        appRouter
    ]);
    _react.default.useEffect(()=>{
        window.addEventListener('popstate', onPopState);
        return ()=>{
            window.removeEventListener('popstate', onPopState);
        };
    });
    let root;
    // TODO: Check the RSC cache first for the page you want to navigate to
    if (current.url !== ((ref = previousUrlRef.current) == null ? void 0 : ref.url)) {
        // eslint-disable-next-line
        const data = fetchServerResponse(current.url, layoutPath);
        root = data.readRoot();
    }
    return /*#__PURE__*/ _react.default.createElement(_appRouterContext.AppRouterContext.Provider, {
        value: appRouter
    }, root ? root : children);
}
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function createResponseCache() {
    return new Map();
}
const rscCache = createResponseCache();
function fetchFlight(href, layoutPath) {
    const flightUrl = new URL(href, location.origin.toString());
    const searchParams = flightUrl.searchParams;
    searchParams.append('__flight__', '1');
    if (layoutPath) {
        searchParams.append('__flight_router_path__', layoutPath);
    }
    return fetch(flightUrl.toString());
}
function fetchServerResponse(href, layoutPath) {
    const cacheKey = href + layoutPath;
    let response = rscCache.get(cacheKey);
    if (response) return response;
    response = (0, _reactServerDomWebpack).createFromFetch(fetchFlight(href, layoutPath));
    rscCache.set(cacheKey, response);
    return response;
}

if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
  Object.defineProperty(exports.default, '__esModule', { value: true });
  Object.assign(exports.default, exports);
  module.exports = exports.default;
}

//# sourceMappingURL=app-router.client.js.map