function Ok<T = any>(value: T) {
  const cb: Result<T> = {
    val: value,
    isOk: () => true,
    isErr: () => false,
  };
  return cb;
}

function Err(message: string) {
  const cb: Result<typeof message> = {
    val: message,
    isOk: () => false,
    isErr: () => true,
  };
  return cb;
}

type Result<T> = {
  val: T;
  isOk: () => boolean;
  isErr: () => boolean;
};

function divide(num: number, by: number) {
  return by === 0 ? Err("Cannot divide by 0") : Ok(num / by);
}

let result = divide(10, 2);
if (result.isErr()) {
  console.log("Handling error:", result.val);
} else {
  console.log("The result is:", result.val);
}
