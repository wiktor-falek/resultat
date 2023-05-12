"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Err = exports.Ok = void 0;
function Ok(value) {
    const cb = {
        val: value,
        ok: true,
    };
    return cb;
}
exports.Ok = Ok;
function Err(message) {
    const cb = {
        err: message,
        ok: false,
    };
    return cb;
}
exports.Err = Err;
