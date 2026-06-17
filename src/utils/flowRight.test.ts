import { describe, it } from "node:test";
import assert from "node:assert";
import { flowRight } from "./flowRight";

describe("flowRight", () => {
  it("should compose functions right-to-left", () => {
    const add1 = (x: number) => x + 1;
    const double = (x: number) => x * 2;
    const composed = flowRight(add1, double);

    assert.strictEqual(composed(3), 7);
  });

  it("should return same result as calling a single function", () => {
    const fn = (x: number) => x * 3;
    const composed = flowRight(fn);

    assert.strictEqual(composed(5), 15);
  });

  it("should return identity-like pass-through when no functions given", () => {
    const composed = flowRight();

    assert.strictEqual(composed(42), 42);
  });

  it("should throw TypeError if any argument is not a function", () => {
    assert.throws(
      () => flowRight((x: number) => x, null as unknown as Function),
      TypeError,
    );
  });

  it("should compose async functions", async () => {
    const asyncAdd1 = async (x: number) => x + 1;
    const asyncDouble = async (x: number) => x * 2;
    const composed = flowRight(asyncAdd1, asyncDouble);

    const result = await composed(3);
    assert.strictEqual(result, 7);
  });

  it("should preserve `this` context", () => {
    const obj = {
      multiplier: 2,
      fn(this: { multiplier: number }, x: number) {
        return x * this.multiplier;
      },
    };

    const composed = flowRight(obj.fn);
    assert.strictEqual(composed.call(obj, 5), 10);
  });
});
