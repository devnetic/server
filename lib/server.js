"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usage = exports.listen = void 0;
const http_1 = require("http");
const router_1 = require("@devnetic/router");
const listen = (port, hostname) => {
    const server = http_1.createServer(router_1.router.attach);
    server.listen(port, hostname, () => {
    });
};
exports.listen = listen;
const usage = () => {
    return '';
};
exports.usage = usage;
//# sourceMappingURL=server.js.map