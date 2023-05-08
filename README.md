## Examples

`Result, Err, Ok`

```ts
function divide(num: number, by: number) {
  return by === 0 ? Err("Cannot divide by 0") : Ok(num / by);
}

const result = divide(10, 2);
if (!result.ok) {
  console.log("Handling error:", result.err);
} else {
  console.log(result.val);
}
```
