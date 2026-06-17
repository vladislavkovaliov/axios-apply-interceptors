import { describe, it, beforeEach } from "node:test";
import assert from "node:assert";
import { applyInterceptors } from "./index";

interface HandlerPair<T> {
  fulfilled: (value: T) => T | Promise<T>;
  rejected: (error: unknown) => unknown;
}

function createMockInterceptorManager<T>() {
  const handlers: HandlerPair<T>[] = [];
  return {
    handlers,
    manager: {
      use(
        fulfilled: (value: T) => T | Promise<T>,
        rejected: (error: unknown) => unknown,
      ) {
        handlers.push({ fulfilled, rejected });
        return handlers.length - 1;
      },
      eject(_id: number) {},
      clear() {
        handlers.length = 0;
      },
    },
  };
}

describe("applyInterceptors", () => {
  it("should register a single pair of fulfilled and rejected handlers", () => {
    const { handlers, manager } = createMockInterceptorManager<number>();

    const fulfilled = (x: number) => x + 1;
    const rejected = (err: Error) => Promise.reject(err);

    applyInterceptors(manager, [fulfilled], [rejected]);

    assert.strictEqual(handlers.length, 1);
  });

  it("should compose multiple fulfilled interceptors in left-to-right call order", () => {
    const { handlers, manager } = createMockInterceptorManager<number>();

    const add1 = (x: number) => x + 1;
    const double = (x: number) => x * 2;

    applyInterceptors(manager, [add1, double], []);

    assert.strictEqual(handlers.length, 1);
    const composed = handlers[0].fulfilled;

    assert.strictEqual(composed(3), 7);
  });

  it("should compose multiple rejected interceptors", async () => {
    const { handlers, manager } = createMockInterceptorManager<number>();

    const log = (err: unknown) => {
      return Promise.reject(err);
    };
    const rethrow = (err: unknown) => {
      return Promise.reject(err);
    };

    applyInterceptors(manager, [], [log, rethrow]);

    assert.strictEqual(handlers.length, 1);
    const composed = handlers[0].rejected;
    const testErr = new Error("test");

    await assert.rejects(() => composed(testErr));
  });

  it("should handle empty interceptor arrays", () => {
    const { handlers, manager } = createMockInterceptorManager<number>();

    applyInterceptors(manager, [], []);

    assert.strictEqual(handlers.length, 1);
    const { fulfilled, rejected } = handlers[0];

    assert.strictEqual(fulfilled(5), 5);
    assert.strictEqual(rejected("err"), "err");
  });

  it("should compose mixed sync and async fulfilled interceptors", async () => {
    const { handlers, manager } = createMockInterceptorManager<number>();

    const sync = (x: number) => x + 1;
    const async = async (x: number) => x * 2;

    applyInterceptors(manager, [sync, async], []);

    const composed = handlers[0].fulfilled;
    const result = await composed(3);

    assert.strictEqual(result, 7);
  });
});
