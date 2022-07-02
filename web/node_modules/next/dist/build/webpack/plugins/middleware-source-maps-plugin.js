"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getMiddlewareSourceMapPlugins = void 0;
var _webpack = require("next/dist/compiled/webpack/webpack");
var _constants = require("../../../lib/constants");
const getMiddlewareSourceMapPlugins = ()=>{
    return [
        new _webpack.webpack.SourceMapDevToolPlugin({
            filename: "[file].map",
            include: [
                new RegExp(`^${_constants.MIDDLEWARE_LOCATION_REGEXP}\\.`),
                /^edge-chunks\//, 
            ]
        }),
        new MiddlewareSourceMapsPlugin(), 
    ];
};
exports.getMiddlewareSourceMapPlugins = getMiddlewareSourceMapPlugins;
/**
 * Produce source maps for middlewares.
 * Currently we use the same compiler for browser and middlewares,
 * so we can avoid having the custom plugins if the browser source maps
 * are emitted.
 */ class MiddlewareSourceMapsPlugin {
    apply(compiler) {
        const PLUGIN_NAME = "NextJsMiddlewareSourceMapsPlugin";
        compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation)=>{
            compilation.hooks.buildModule.tap(PLUGIN_NAME, (module)=>{
                module.useSourceMap = module.layer === "middleware";
            });
        });
    }
}

//# sourceMappingURL=middleware-source-maps-plugin.js.map