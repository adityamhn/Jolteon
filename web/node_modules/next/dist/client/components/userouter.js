"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = useRouter;
var _react = _interopRequireDefault(require("react"));
function useRouter(initialUrl) {
    const initialState = {
        url: initialUrl
    };
    const previousUrlRef = _react.default.useRef(initialState);
    const [current, setCurrent] = _react.default.useState(initialState);
    const change = _react.default.useCallback((method, url)=>{
        // @ts-ignore startTransition exists
        _react.default.startTransition(()=>{
            previousUrlRef.current = current;
            const state = _extends({}, current, {
                url
            });
            setCurrent(state);
            // TODO: update url eagerly or not?
            window.history[method](state, '', url);
        });
    }, [
        current
    ]);
    const appRouter = _react.default.useMemo(()=>{
        return {
            // TODO: implement prefetching of loading / flight
            prefetch: ()=>Promise.resolve({}),
            replace: (url)=>{
                return change('replaceState', url);
            },
            push: (url)=>{
                return change('pushState', url);
            },
            url: current.url
        };
    }, [
        current,
        change
    ]);
    return [
        appRouter,
        previousUrlRef,
        current,
        change
    ];
}
function _extends() {
    _extends = Object.assign || function(target) {
        for(var i = 1; i < arguments.length; i++){
            var source = arguments[i];
            for(var key in source){
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    return _extends.apply(this, arguments);
}
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
  Object.defineProperty(exports.default, '__esModule', { value: true });
  Object.assign(exports.default, exports);
  module.exports = exports.default;
}

//# sourceMappingURL=userouter.js.map