import { AxiosInterceptorManager } from "axios";

import { InterceptorFunction } from "./types";
import { composeInterceptors } from "./utils";

export function applyInterceptors<T>(
  interceptorManager: AxiosInterceptorManager<T>,
  interceptors: InterceptorFunction<T>[],
  errorInterceptors: InterceptorFunction<T>[],
) {
  interceptorManager.use(
    composeInterceptors(...interceptors),
    composeInterceptors(...errorInterceptors),
  );
}

console.log(42);
