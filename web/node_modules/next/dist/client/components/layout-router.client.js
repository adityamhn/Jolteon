"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = LayoutRouter;
var _react = _interopRequireDefault(require("react"));
var _appRouterContext = require("../../shared/lib/app-router-context");
var _appRouterClientJs = require("./app-router.client.js");
var _userouterJs = _interopRequireDefault(require("./userouter.js"));
function LayoutRouter({ initialUrl , layoutPath , children  }) {
    var ref;
    const [appRouter, previousUrlRef, current] = (0, _userouterJs).default(initialUrl);
    let root;
    if (current.url !== ((ref = previousUrlRef.current) == null ? void 0 : ref.url)) {
        // eslint-disable-next-line
        const data = (0, _appRouterClientJs).fetchServerResponse(current.url, layoutPath);
        root = data.readRoot();
    // TODO: handle case where middleware rewrites to another page
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

if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
  Object.defineProperty(exports.default, '__esModule', { value: true });
  Object.assign(exports.default, exports);
  module.exports = exports.default;
}

//# sourceMappingURL=layout-router.client.js.map