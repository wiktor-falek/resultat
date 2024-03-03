# Resultat - Better error handling

## Description

Resultat is a TypeScript library designed to simplify error handling. It introduces a **Result<T, E>** type, which is either **Ok<T>** or **Err<E>**.
It's an alternative to try/catch error handling, without hidden control flow and unknown error types.

## The problem with try/catch
You're probably familiar with this code, and there some issues with it.

```ts
const res = await fetch("...");
const data = await res.json();
```

What happens when the request fails? Or the response is not in JSON format?
It's very easy to forget that these functions might throw, unless you've read the documentation or learned the hard way.

But what if you're working with a 3rd party library, or your own code?
Let's take a look at another example:

```ts
try {
  const result = db.collection("users").insertOne({ email, hash });
  console.log(result);
}
catch(e) {
  console.error(e);
}
```

There is another problem with try/catch - what's the type of the error? TypeScript doesn't know the type of `e`, and defaults it to `unknown`.
Now you have to import the error interface, then make sure it's the correct one in case it provides multiple error interfaces.
Another thing that sucks about this is that you can't do this:

```ts
try {
  const result = db.collection("users").insertOne({ email, hash });
  console.log(result);
}
catch(e: ErrorType) { // this does not work
  console.error(e);
}
```

So you end up repeating this pattern

```ts
import { type ErrorType } from "some-library";

...

try {
  const result = db.collection("users").insertOne({ email, hash });
  console.log(result);
}
catch(e) {
  const error = e as ErrorType;
  console.error(error);
}
```

And if you forget to wrap a single function with a try/catch, your application could crash in production.
With Resultat, you have to handle the error, or at least acknowledge it before you can get the data, and it will never throw.
Additionally with having errors as values, their type will not default to unknown.


## Installation

To start using Resultat in your TypeScript project, you can install it via npm

```bash
npm install resultat
```

## Usage Example: Dividing Two Numbers

Consider a simple use case of dividing two numbers. The divideNumbers function returns either an **Ok** result containing the division result or an **Err** result with an error message if division by zero occurs.

```ts
import { Ok, Err } from "resultat";
import type { Result } from "resultat";

// Simple example: Divide Two Numbers
function divideNumbers(a: number, b: number) {
  return b === 0 ? Err("Cannot divide by 0") : Ok(a / b);
}
```

## Unpacking `result.ok`

Before retrieving the value from the result, you have to confirm whether the result returned **Ok** or **Err**, using type narrowing. If result.ok is true, it returned **Ok**, otherwise it returned **ResultErr**. Here's how you can achieve this:

```ts
const result = divideNumbers(10, 0);

if (!result.ok) {
  // Handle the Err case
  console.error("Error:", result.err);
} else {
  console.log("Division result:", result.val);
}
```

## `unwrap`: Extracting Values from Ok

The **unwrap** function allows you to extract the value from an **Ok** result. If the result is an **Err**, it throws the error. Use it when you need to assert that result is **Ok**.

```ts
// Success
const result = divideNumbers(10, 2);
const value = result.unwrap(); // Returns 5

// Failure
const result = divideNumbers(10, 0);
const value = result.unwrap(); // Throws the error
```

## `unwrapOr`: Providing a Default Value

The **unwrapOr** function extracts the value from an **Ok** result or returns a provided default value if the result is an **Err**. This is useful when you want to ensure a fallback value in case of errors.

```ts
const result = divideNumbers(10, 0);
const num = result.unwrapOr(0); // Since the function returned Err, it will return undefined
```

## `unwrapOrElse`: Providing a Callback

The **unwrapOrElse** function is used to extract the value from an **Ok** result or execute a provided callback to handle the **Err** result and provide a fallback value.

```ts
const result = divideNumbers(10, 0);
const num = result.unwrapOrElse((err) => {
  console.error(err, "Defaulting to 0");
  return 0; // Fallback value provided by the callback
});
```

## Realistic Example: Retrieving User Data with Error Handling

In real-world applications, fetching user data from a database or API can result in various outcomes. The **Result** type provided by Resultat can simplify error handling and result management. Consider the following example:

### Function Explanation

The following function attempts to retrieve user data based on a provided username.

- If a user is found, the function returns an Ok result containing the user object.
- If no user is found, the function returns an Err result indicating that the user was not found.
- If UserModel.findByUsername throws, the function returns an Err result with a generic error message.

```ts
function findUser(username: string) {
  try {
    const user = UserModel.findByUsername(username);
    if (user === null) {
      return Err("User not found");
    }
    return Ok(user);
  } catch (e) {
    return Err("Something went wrong");
  }
}
```

## Handling each error individually

When using primitives as errors, such as strings and numbers, you can use `as const` in each value passed to `Err()`.
This pattern can make your code more readable.

```ts
function doStuff(x) {
  if (x == 1) {
    return Err("Error 1" as const);
  }
  if (x == 2) {
    return Err("Error 2" as const);
  }
  return Ok();
}

const result = doStuff(1);
if (!result.ok) {
  if (result.err == "Error 1";) {} // Autocompletes to "Error 1" | "Error 2"
}
```
