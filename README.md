# Axios Apply Interceptors

Make simple to add interceptors into axios and reusable.

## Example

Defining interceptor which adds session info to headers.

```tsx
export function onFulfilledRequestSession(config: InternalAxiosRequestConfig) {
  const sessionToken = sessionStorage.getItem("sessionToken");
  const sessionId = sessionStorage.getItem("sessionId");

  return {
    ...config,
    headers: {
      ...config.headers,
      ...(!!sessionToken && { Authorization: `Bearer ${sessionToken}` }),
      ...(!!sessionId && { "X-Session-Id": sessionId }),
    } as AxiosRequestHeaders,
  };
}
```

Defining interceptor to process errors.

```tsx
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function onRejectedRequest(error: any) {
  return Promise.reject(error);
}
```

Let's implement apply interceptors axios config file.

```tsx
import AxiosFactory, { CreateAxiosDefaults } from "axios";
import { onRejectedRequest, onFulfilledRequestSession } from "./interceptors";
import { applyInterceptors } from "axios-apply-interceptos/applyInterceptors";

export const axios = AxiosFactory.create({
  baseURL: process.env.BASE_URL,
} as CreateAxiosDefaults);

applyInterceptors(
  axios.interceptors.request,
  [onFulfilledRequestSession], // if no interceptors just make []
  [onRejectedRequest],
);
```
