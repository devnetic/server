/// <reference types="node" />
import { SecureServerOptions } from 'http2';
import { Router } from '@devnetic/router';
export interface KiirusServer {
    listen: (port?: number, hostname?: string, listeningListener?: () => void) => void;
    router: Router;
    usage: () => string;
}
interface InstanceOptions {
    http2?: boolean;
    https?: SecureServerOptions;
    keepAliveTimeout?: number;
    logger?: boolean;
}
export declare const createServer: (options?: InstanceOptions, requestListener?: (() => void) | undefined) => KiirusServer;
export {};
