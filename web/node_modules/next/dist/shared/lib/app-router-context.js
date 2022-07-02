"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AppRouterContext = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const AppRouterContext = _react.default.createContext(null);
exports.AppRouterContext = AppRouterContext;
if (process.env.NODE_ENV !== "production") {
    AppRouterContext.displayName = "AppRouterContext";
}

//# sourceMappingURL=app-router-context.js.map