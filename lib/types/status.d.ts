import { type OfficeStatus } from './shared/status.ts';
export interface Entry {
    options: {
        id?: string;
        name?: string;
        inject?: string[];
        disabled?: unknown;
    };
    disabled?: boolean;
    fiber?: {
        state: number;
        uid?: number | null;
    };
    parent: {
        tree: {
            ctx: {
                baseUrl: string;
            };
        };
    };
}
export interface StatusContext {
    loader: {
        entries(): Iterable<Entry>;
    };
    pluginPackages: {
        packageOf(name: string, base: string): {
            version?: string;
        } | undefined;
    };
    profileContext: {
        dir: string;
        installAnchor: string;
    };
}
export declare function collectStatus(ctx: StatusContext): OfficeStatus;
