export type ResultOk<T> = {
  val: T;
  ok: true;
};

export type ResultErr = {
  err: string;
  ok: false;
};

export type Result<T> = ResultOk<T> | ResultErr;

export function Ok<T>(value: T): ResultOk<T> {
  return {
    val: value,
    ok: true,
  };
}

export function Err(message: string): ResultErr {
  return {
    err: message,
    ok: false,
  };
}
