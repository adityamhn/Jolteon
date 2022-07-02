import type { webpack5 as webpack } from 'next/dist/compiled/webpack/webpack';
import type { NextConfig } from '../../../../server/config-shared';
export declare class WellKnownErrorsPlugin {
    config: NextConfig;
    constructor({ config }: {
        config: NextConfig;
    });
    apply(compiler: webpack.Compiler): void;
}
