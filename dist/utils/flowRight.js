"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flowRight = void 0;
function flow(...funcs) {
    const length = funcs.length;
    let i = length;
    while (i--) {
        if (typeof funcs[i] !== "function") {
            throw new TypeError("Expected a function");
        }
    }
    return function (...args) {
        let j = 0;
        let result = length ? funcs[j].apply(this, args) : args[0];
        while (++j < length) {
            result = funcs[j].call(this, result);
        }
        return result;
    };
}
function flowRight(...fns) {
    return flow(...fns.reverse());
}
exports.flowRight = flowRight;
