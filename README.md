## Examples

`Result, Err, Ok`

```ts
function divide(num: number, by: number) {
  return by === 0 ? Err("Cannot divide by 0") : Ok(num / by);
}

let result: Result = divide(10, 2);
if (result.isErr()) {
  console.log("An error occurred:", result.val);
} else {
  console.log("The result is:", result.val);
}
```