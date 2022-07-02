"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _webpack = require("next/dist/compiled/webpack/webpack");
var _constants = require("../../../shared/lib/constants");
var _utils = require("../loaders/utils");
var _path = require("path");
const PLUGIN_NAME = "FlightManifestPlugin";
class FlightManifestPlugin {
    dev = false;
    appDir = false;
    constructor(options){
        if (typeof options.dev === "boolean") {
            this.dev = options.dev;
        }
        this.appDir = options.appDir;
        this.pageExtensions = options.pageExtensions;
    }
    apply(compiler) {
        compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation, { normalModuleFactory  })=>{
            compilation.dependencyFactories.set(_webpack.webpack.dependencies.ModuleDependency, normalModuleFactory);
            compilation.dependencyTemplates.set(_webpack.webpack.dependencies.ModuleDependency, new _webpack.webpack.dependencies.NullDependency.Template());
        });
        compiler.hooks.make.tap(PLUGIN_NAME, (compilation)=>{
            compilation.hooks.processAssets.tap({
                name: PLUGIN_NAME,
                // @ts-ignore TODO: Remove ignore when webpack 5 is stable
                stage: _webpack.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONS
            }, (assets)=>this.createAsset(assets, compilation, compiler.context));
        });
    }
    createAsset(assets, compilation, context) {
        const manifest = {};
        const appDir = this.appDir;
        const dev = this.dev;
        compilation.chunkGroups.forEach((chunkGroup)=>{
            function recordModule(chunk, id, mod) {
                const resource = mod.resource;
                // TODO: Hook into deps instead of the target module.
                // That way we know by the type of dep whether to include.
                // It also resolves conflicts when the same module is in multiple chunks.
                if (!resource || !_utils.clientComponentRegex.test(resource)) {
                    return;
                }
                const moduleExports = manifest[resource] || {};
                const moduleIdMapping = manifest.__ssr_module_mapping__ || {};
                moduleIdMapping[id] = moduleIdMapping[id] || {};
                // Note that this isn't that reliable as webpack is still possible to assign
                // additional queries to make sure there's no conflict even using the `named`
                // module ID strategy.
                let ssrNamedModuleId = (0, _path).relative(context, mod.resourceResolveData.path);
                if (!ssrNamedModuleId.startsWith(".")) ssrNamedModuleId = `./${ssrNamedModuleId}`;
                const exportsInfo = compilation.moduleGraph.getExportsInfo(mod);
                const cjsExports = [
                    ...new Set([].concat(mod.dependencies.map((dep)=>{
                        // Match CommonJsSelfReferenceDependency
                        if (dep.type === "cjs self exports reference") {
                            // `module.exports = ...`
                            if (dep.base === "module.exports") {
                                return "default";
                            }
                            // `exports.foo = ...`, `exports.default = ...`
                            if (dep.base === "exports") {
                                return dep.names.filter((name)=>name !== "__esModule");
                            }
                        }
                        return null;
                    }))), 
                ];
                const moduleExportedKeys = [
                    "",
                    "*"
                ].concat([
                    ...exportsInfo.exports
                ].map((exportInfo)=>{
                    if (exportInfo.provided) {
                        return exportInfo.name;
                    }
                    return null;
                }), ...cjsExports).filter((name)=>name !== null);
                moduleExportedKeys.forEach((name)=>{
                    if (!moduleExports[name]) {
                        moduleExports[name] = {
                            id,
                            name,
                            chunks: appDir ? chunk.ids.map((chunkId)=>{
                                return chunkId + ":" + chunk.name + (dev ? "" : "-" + chunk.hash);
                            }) : []
                        };
                    }
                    if (!moduleIdMapping[id][name]) {
                        moduleIdMapping[id][name] = {
                            ...moduleExports[name],
                            id: ssrNamedModuleId
                        };
                    }
                });
                manifest[resource] = moduleExports;
                manifest.__ssr_module_mapping__ = moduleIdMapping;
            }
            chunkGroup.chunks.forEach((chunk)=>{
                const chunkModules = compilation.chunkGraph.getChunkModulesIterable(chunk);
                for (const mod of chunkModules){
                    const modId = compilation.chunkGraph.getModuleId(mod);
                    recordModule(chunk, modId, mod);
                    // If this is a concatenation, register each child to the parent ID.
                    if (mod.modules) {
                        mod.modules.forEach((concatenatedMod)=>{
                            recordModule(chunk, modId, concatenatedMod);
                        });
                    }
                }
            });
        });
        const file = "server/" + _constants.FLIGHT_MANIFEST;
        const json = JSON.stringify(manifest);
        assets[file + ".js"] = new _webpack.sources.RawSource("self.__RSC_MANIFEST=" + json);
        assets[file + ".json"] = new _webpack.sources.RawSource(json);
    }
}
exports.FlightManifestPlugin = FlightManifestPlugin;

//# sourceMappingURL=flight-manifest-plugin.js.map