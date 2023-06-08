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

// export class Maybe {
//   val: any;
//   constructor(val: any) {
//     this.val = val;
//   }

//   bind(func: (arg0: any) => any) {
//     if (this.val === null) return this;

//     if (this.val.ok === false) {
//       return this;
//     }

//     if (this.val.ok === true) {
//       let val = func(this.val.val);
//       return new Maybe(val);
//     }

//     let val = func(this.val);
//     return new Maybe(val);
//   }
// }

// function divide(num: number, by: number): Result<number> {
//   return by === 0 ? Err("Cannot divide by 0") : Ok(num / by);
// }

// function addOne(val: number) {
//   return val + 1;
// }

// const result = new Maybe(20)
//   .bind((num) => divide(num, 0))
//   .bind(addOne)
//   .bind((num) => divide(num, 2));

// console.log(result.val);
