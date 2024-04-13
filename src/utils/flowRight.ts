function flow(...funcs: Function[]) {
  const length = funcs.length;
  let i = length;
  while (i--) {
    if (typeof funcs[i] !== "function") {
      throw new TypeError("Expected a function");
    }
  }
  return function (this: any, ...args: any[]) {
    let j = 0;
    let result = length ? funcs[j].apply(this, args) : args[0];
    while (++j < length) {
      result = funcs[j].call(this, result);
    }
    return result;
  };
}

export function flowRight(...fns: Function[]) {
  return flow(...fns.reverse());
}
