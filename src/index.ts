export type ResultOk<T> = {
  val: T;
  ok: true;
  unwrap: () => T;
  unwrapOr: <TDefault>(defaultValue: TDefault) => T;
  unwrapOrElse: <TReturn>(cb: (err: undefined) => TReturn) => T;
};

export type ResultErr<E> = {
  err: E;
  ok: false;
  unwrap: () => never;
  unwrapOr: <TDefault>(defaultValue: TDefault) => TDefault;
  unwrapOrElse: <TReturn>(cb: (err: E) => TReturn) => TReturn;
};

export type Result<T, E> = ResultOk<T> | ResultErr<E>;

export function Ok<T>(value: T): ResultOk<T> {
  return {
    val: value,
    ok: true,
    unwrap: () => value,
    unwrapOr: (defaultValue) => value,
    unwrapOrElse: (error) => value,
  };
}

export function Err<E>(error: E): ResultErr<E> {
  return {
    err: error,
    ok: false,
    unwrap: () => {
      throw error;
    },
    unwrapOr: (defaultValue) => defaultValue,
    unwrapOrElse: (cb) => cb(error),
  };
}

/**
 * Converts a synchronous function that might throw to a {@link Result} type.
 *
 * If the function throws, returns a {@link ResultErr}, otherwise {@link ResultOk}
 *
 * The type of {@link ResultErr} defaults to unknown as TypeScript simply doesn't know.
 * You can pass types of {@link ResultOk} and {@link ResultErr} as generics, or you can use {@link ToResultCurried} to specify just the type of 
 * {@link ResultErr} and infer the {@link ResultOk} from callback return value.
 *
 * To specify just the type of {@link ResultErr} use {@link ToResultCurried}.
 *
 * @example
 * // Usage:
 * const result = ToResult(() => JSON.parse("{;"))
 *
 * // Typed usage:
 * const result = ToResult<any, Error>(() => JSON.parse("{;"))
 *
 * @param cb The synchronous function to execute.
 */
export function ToResult<T, E = unknown>(cb: () => T): Result<T, E> {
  try {
    const result = cb();
    return Ok(result);
  } catch (error) {
    return Err(error as E);
  }
}

/**
 * Curried version of {@link ToResult} that allows to specify
 * only the type of the Error the callback might throw,
 * and infer the type of Ok from callback return type.
 *
 * @example
 * // Usage:
 * const ToResultWithError = ToResultCurried<Error>();
 * const result = ToResultWithError(() => JSON.parse("{;"))
 *
 * // Inline usage:
 * const result = ToResultCurried<Error>()(() => JSON.parse("{;"))
 *
 * @param cb The synchronous function to execute.
 */
export function ToResultCurried<E>() {
  return function <T>(cb: () => T): Result<T, E> {
    try {
      const result = cb();
      return Ok(result);
    } catch (error) {
      return Err(error as E);
    }
  };
}

/**
 * Converts an asynchronous function to a `Promise<Result>` type.
 *
 * If the function throws or the promise is rejected, returns a {@link ResultErr}, otherwise {@link ResultOk}.
 *
 * The type of ResultErr defaults to unknown as TypeScript simply doesn't know.
 * You can pass types of {@link ResultOk} and {@link ResultErr} as generics, or you can use {@link ToResultAsyncCurried} to specify just the type of 
 * {@link ResultErr} and infer the {@link ResultOk} from callback return value.
 *
 * @example
 * // Usage:
 * const result = await ToResultAsync(() => fetch('https://api.example.com/data'));
 *
 * // Typed usage:
 * const result = await ToResultAsync<Response, TypeError>(() => fetch('https://api.example.com/data'));
 *
 * @param cb - The asynchronous function to execute.
 */
export async function ToResultAsync<T, E = unknown>(
  cb: () => Promise<T>
): Promise<Result<T, unknown>> {
  try {
    const result = await cb();
    return Ok(result);
  } catch (error) {
    return Err(error as E);
  }
}

/**
 * Curried version of {@link ToResultAsync} that allows specifying the type of the ResultErr the callback might throw.
 *
 * @example
 * // Usage:
 * const ToResultAsyncWithError = ToResultAsyncCurried<TypeError>();
 * const result = await ToResultAsyncWithError(() => fetch('https://api.example.com/data'));
 *
 * // Inline usage:
 * const result = await ToResultAsyncCurried<TypeError>()(() => fetch('https://api.example.com/data'));
 *
 * @param cb - The asynchronous function to execute.
 */
export function ToResultAsyncCurried<E>() {
  return async function <T>(cb: () => T): Promise<Result<T, E>> {
    try {
      const result = await cb();
      return Ok(result);
    } catch (error) {
      return Err(error as E);
    }
  };
}
