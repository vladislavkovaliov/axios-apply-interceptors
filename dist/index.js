"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  applyInterceptors: () => applyInterceptors
});
module.exports = __toCommonJS(index_exports);

// src/utils/flowRight.ts
function flow(...funcs) {
  const length = funcs.length;
  let i = length;
  while (i--) {
    if (typeof funcs[i] !== "function") {
      throw new TypeError("Expected a function");
    }
  }
  return function(...args) {
    let j = 0;
    let result = length ? funcs[j].apply(this, args) : args[0];
    while (++j < length) {
      if (result instanceof Promise) {
        result = result.then(
          /* @__PURE__ */ ((k) => (value) => funcs[k].call(this, value))(j)
        );
      } else {
        result = funcs[j].call(this, result);
      }
    }
    return result;
  };
}
function flowRight(...fns) {
  return flow(...fns.reverse());
}

// src/utils/composeInterceptors.ts
function composeInterceptors(...interceptors) {
  return flowRight(...interceptors);
}

// src/index.ts
function applyInterceptors(interceptorManager, interceptors, errorInterceptors) {
  interceptorManager.use(
    composeInterceptors(...interceptors),
    composeInterceptors(...errorInterceptors)
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  applyInterceptors
});
//# sourceMappingURL=index.js.map