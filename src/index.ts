export type ResultOk<T> = {
  val: T;
  ok: true;
};

export type ResultErr = {
  err: string;
  ok: false;
};

export function Ok<T>(value: T) {
  const cb: ResultOk<T> = {
    val: value,
    ok: true,
  };
  return cb;
}

export function Err(message: string) {
  const cb: ResultErr = {
    err: message,
    ok: false,
  };
  return cb;
}

// export class Maybe {
//   value: any;
//   constructor(value: any) {
//     this.value = value;
//   }

//   bind(func: (arg0: any) => any) {
//     if (this.value === null) return this;

//     if (this.value.ok === false) {
//       return this;
//     }

//     if (this.value.ok === true) {
//       let value = func(this.value.val);
//       return new Maybe(value);
//     }

//     let value = func(this.value);
//     return new Maybe(value);
//   }
// }

// function addOne(val: number) {
//   return val + 1;
// }

// const result = new Maybe(20)
//   .bind((num) => divide(num, 2))
//   .bind(addOne)
//   .bind((num) => divide(num, 2));

// console.log(result.value);
