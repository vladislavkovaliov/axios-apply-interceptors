import { InterceptorFunction } from "../types";
export declare function composeInterceptors<T>(...interceptors: InterceptorFunction<T>[]): InterceptorFunction<T>;
