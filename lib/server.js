"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const http_1 = __importDefault(require("http"));
const http2_1 = __importDefault(require("http2"));
const https_1 = __importDefault(require("https"));
const router_1 = require("@devnetic/router");
// let server: Server | Http2Server
let serverIntance;
exports.createServer = (options = {}, requestListener) => {
    var _a, _b;
    if (options.https) {
        if (options.http2) {
            const server = http2_1.default.createSecureServer(options.https, requestListener);
            setServerIntance(server);
        }
        else {
            const server = https_1.default.createServer(options.https, requestListener);
            server.keepAliveTimeout = (_a = options.keepAliveTimeout) !== null && _a !== void 0 ? _a : 5000;
            setServerIntance(server);
        }
    }
    else if (options.http2) {
        const server = http2_1.default.createServer(requestListener);
        setServerIntance(server);
    }
    else {
        const server = http_1.default.createServer(requestListener);
        server.keepAliveTimeout = (_b = options.keepAliveTimeout) !== null && _b !== void 0 ? _b : 5000;
        setServerIntance(server);
    }
    return {
        listen,
        router: router_1.router,
        usage
    };
};
const listen = () => {
    serverIntance.listen(port, hostname, (error) => {
        if (error) {
            console.log('Something bad happened: %o', error);
            throw new Error(`Something bad happened ${error}`);
        }
        console.log(`Server is listening on host ${host} and port ${port}`);
        return serverIntance;
    });
    let shuttingDown = false;
    const signals = ['SIGINT', 'SIGTERM'];
    signals.forEach(signal => {
        process.on(signal, () => {
            if (!shuttingDown) {
                console.log('Closing server');
                shuttingDown = true;
                serverIntance.close();
                const timer = setTimeout(() => {
                    console.log('Ending process');
                    clearTimeout(timer);
                    process.exit();
                }, 0);
            }
        });
    });
};
const usage = () => {
    return '';
};
const setServerIntance = (server) => {
    serverIntance = server;
};
//# sourceMappingURL=server.js.map