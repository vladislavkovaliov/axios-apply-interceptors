import { InterceptorFunction } from "../types";
import { flowRight } from "../utils";

export function composeInterceptors<T>(
  ...interceptors: InterceptorFunction<T>[]
): InterceptorFunction<T> {
  return flowRight(...interceptors);
}
