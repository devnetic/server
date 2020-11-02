"use strict";
// import { getParams } from '@devnetic/cli'
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { create } from './server'
// const params = getParams()
// process.env.PORT = params.p ?? (params.port ?? 3000)
// process.env.HOST = params.H ?? (params.host ?? '::')
// if (params.help !== undefined || params.h !== undefined) {
//   console.log(server.usage())
//   process.exit()
// }
// export = {
//   ...server
// }
__exportStar(require("./server"), exports);
//# sourceMappingURL=index.js.map