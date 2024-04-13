import { AxiosInterceptorManager } from "axios";
import { InterceptorFunction } from "./types";
export declare function applyInterceptors<T>(interceptorManager: AxiosInterceptorManager<T>, interceptors: InterceptorFunction<T>[], errorInterceptors: InterceptorFunction<T>[]): void;
