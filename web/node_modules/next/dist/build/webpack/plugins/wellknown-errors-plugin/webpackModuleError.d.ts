import type { webpack5 as webpack } from 'next/dist/compiled/webpack/webpack';
import type { NextConfig } from '../../../../server/config-shared';
import { SimpleWebpackError } from './simpleWebpackError';
export declare function getModuleBuildError(compilation: webpack.Compilation, input: any, config: NextConfig): Promise<SimpleWebpackError | false>;
