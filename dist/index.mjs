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
export {
  applyInterceptors
};
//# sourceMappingURL=index.mjs.map