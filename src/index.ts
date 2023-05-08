export function Ok<T = any>(value: T) {
  const cb: Result<T> = {
    val: value,
    isOk: () => true,
    isErr: () => false,
  };
  return cb;
}

export function Err(message: string) {
  const cb: Result<typeof message> = {
    val: message,
    isOk: () => false,
    isErr: () => true,
  };
  return cb;
}

export type Result<T> = {
  val: T;
  isOk: () => boolean;
  isErr: () => boolean;
};

