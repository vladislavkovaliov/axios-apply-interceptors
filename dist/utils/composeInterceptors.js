"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composeInterceptors = void 0;
const utils_1 = require("../utils");
function composeInterceptors(...interceptors) {
    return (0, utils_1.flowRight)(...interceptors);
}
exports.composeInterceptors = composeInterceptors;
