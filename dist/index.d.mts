import { AxiosInterceptorManager } from 'axios';

type InterceptorFunction<T> = (value: T) => T | Promise<T>;

declare function applyInterceptors<T>(interceptorManager: AxiosInterceptorManager<T>, interceptors: InterceptorFunction<T>[], errorInterceptors: InterceptorFunction<T>[]): void;

export { applyInterceptors };
