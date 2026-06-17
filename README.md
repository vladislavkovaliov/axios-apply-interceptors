# axios-apply-interceptors

[![npm version](https://img.shields.io/npm/v/axios-apply-interceptors)](https://www.npmjs.com/package/axios-apply-interceptors)
[![License](https://img.shields.io/npm/l/axios-apply-interceptors)](LICENSE)

Easily compose and apply multiple axios interceptors with a single call.

## Why

`AxiosInterceptorManager.use()` only accepts a single pair of handlers. When you have multiple request or response interceptors, you'd normally chain them manually or flatten them into one function.

This library lets you pass **arrays** of fulfilled and rejected handlers — they are composed automatically right-to-left (inner interceptor runs first).

## Install

```bash
npm install axios-apply-interceptors
```

## Usage

```ts
import axios from "axios";
import { applyInterceptors } from "axios-apply-interceptors";

function addToken(config: InternalAxiosRequestConfig) {
  return {
    ...config,
    headers: { ...config.headers, Authorization: `Bearer ${getToken()}` },
  };
}

function addLocale(config: InternalAxiosRequestConfig) {
  return {
    ...config,
    headers: { ...config.headers, "Accept-Language": "en" },
  };
}

function onError(error: unknown) {
  console.error(error);
  return Promise.reject(error);
}

const api = axios.create({ baseURL: "https://api.example.com" });

applyInterceptors(
  api.interceptors.request,
  [addToken, addLocale],
  [onError],
);
```

Both `addLocale` and `addToken` run on every request — `addLocale` first, then `addToken`.

## API

### `applyInterceptors<T>(manager, fulfilled, rejected)`

| Parameter | Type | Description |
|-----------|------|-------------|
| `manager` | `AxiosInterceptorManager<T>` | The interceptor manager (e.g. `axios.interceptors.request`) |
| `fulfilled` | `InterceptorFunction<T>[]` | Array of fulfilled handlers, composed right-to-left |
| `rejected` | `InterceptorFunction<T>[]` | Array of error handlers, composed right-to-left |

### `InterceptorFunction<T>`

```ts
type InterceptorFunction<T> = (value: T) => T | Promise<T>;
```

Both sync and async handlers are supported. The composition automatically awaits promises before passing the value to the next handler.

## License

ISC
