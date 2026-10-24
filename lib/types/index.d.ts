import type { IncomingMessage, ServerResponse } from 'node:http';
import z from '@deepseek-ai/schemastery';
import { type StatusContext } from './status.ts';
export declare const name = "dsh-office-bundle";
export declare const inject: string[];
export declare const Config: z<Schemastery.ObjectS<{}>, Schemastery.ObjectT<{}>, "plain">;
export interface HostContext extends StatusContext {
    connection: {
        requestRejection(request: IncomingMessage): number | undefined;
    };
    webServer: {
        register(route: {
            kind: 'exact';
            path: string;
            handler: (req: IncomingMessage, res: ServerResponse) => void;
        }): () => void;
    };
    effect(fn: () => () => void, label: string): void;
}
export declare function statusHandler(ctx: HostContext, req: IncomingMessage, res: ServerResponse): void;
export declare function apply(ctx: HostContext): void;
