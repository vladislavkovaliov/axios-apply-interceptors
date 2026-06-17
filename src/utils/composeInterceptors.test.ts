import { describe, it } from "node:test";
import assert from "node:assert";
import { composeInterceptors } from "./composeInterceptors";

describe("composeInterceptors", () => {
  it("should compose fulfilled interceptors right-to-left", () => {
    const addTimestamp = (config: Record<string, unknown>) => ({
      ...config,
      ts: true,
    });
    const addToken = (config: Record<string, unknown>) => ({
      ...config,
      token: "abc",
    });

    const composed = composeInterceptors(addTimestamp, addToken);
    const result = composed({});

    assert.deepStrictEqual(result, { ts: true, token: "abc" });
  });

  it("should return the same function when given a single interceptor", () => {
    const fn = (x: number) => x + 1;
    const composed = composeInterceptors(fn);

    assert.strictEqual(composed(1), 2);
  });

  it("should pass through value when no interceptors given", () => {
    const composed = composeInterceptors();

    assert.strictEqual(composed(42), 42);
  });

  it("should compose async interceptors", async () => {
    const asyncAdd = async (x: number) => x + 1;
    const asyncDouble = async (x: number) => x * 2;
    const composed = composeInterceptors(asyncAdd, asyncDouble);

    const result = await composed(3);
    assert.strictEqual(result, 7);
  });
});
