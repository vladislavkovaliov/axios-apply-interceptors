export type InterceptorFunction<T> = (value: T) => T | Promise<T>;
