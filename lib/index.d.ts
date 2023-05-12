export type ResultOk<T> = {
    val: T;
    ok: true;
};
export type ResultErr = {
    err: string;
    ok: false;
};
export declare function Ok<T>(value: T): ResultOk<T>;
export declare function Err(message: string): ResultErr;
