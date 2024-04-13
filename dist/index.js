"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyInterceptors = void 0;
const utils_1 = require("./utils");
function applyInterceptors(interceptorManager, interceptors, errorInterceptors) {
    interceptorManager.use((0, utils_1.composeInterceptors)(...interceptors), (0, utils_1.composeInterceptors)(...errorInterceptors));
}
exports.applyInterceptors = applyInterceptors;
