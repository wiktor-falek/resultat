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
