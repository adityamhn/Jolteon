/// <reference types="node" />
import type { IncomingMessage, ServerResponse } from 'http';
import type { LoadComponentsReturnType } from './load-components';
import type { ServerRuntime } from './config-shared';
import { NextParsedUrlQuery } from './request-meta';
import RenderResult from './render-result';
export declare type RenderOptsPartial = {
    err?: Error | null;
    dev?: boolean;
    serverComponentManifest?: any;
    supportsDynamicHTML?: boolean;
    runtime?: ServerRuntime;
    serverComponents?: boolean;
};
export declare type RenderOpts = LoadComponentsReturnType & RenderOptsPartial;
export declare function renderToHTML(req: IncomingMessage, res: ServerResponse, pathname: string, query: NextParsedUrlQuery, renderOpts: RenderOpts): Promise<RenderResult | null>;
