# Introduction to TypeScript

TypeScript is a **statically typed superset of JavaScript** developed by Microsoft. Any valid JavaScript program is also a valid TypeScript program, which means you can adopt TypeScript incrementally. The key addition is a *type system* that is checked at compile time and then erased: the code that actually runs is plain JavaScript.

## Why TypeScript?

JavaScript is dynamically typed — the type of a value is only known while the program runs. This flexibility is convenient for small scripts, but as a codebase grows it becomes a source of bugs that surface only at runtime:

```js
function double(x) {
  return x * 2;
}

double("5"); // NaN — no error until you inspect the result
```

TypeScript catches this class of mistake *before the code runs*:

```ts
function double(x: number): number {
  return x * 2;
}

double("5"); // ✗ Compile error: Argument of type 'string'
             //   is not assignable to parameter of type 'number'.
```

The benefits compound in larger projects:

- **Earlier error detection** — many bugs become compile-time errors instead of runtime surprises.
- **Better tooling** — editors can offer precise autocompletion, inline documentation, and safe refactors because they know the shape of your data.
- **Self-documenting code** — type annotations describe intent, reducing the need for comments and guesswork.

## How It Runs

The browser and Node.js cannot execute TypeScript directly. A *compiler* (`tsc`) transforms `.ts` files into `.js` files, checking types along the way:

```
source.ts  ──tsc──▶  source.js  ──▶  runtime (browser / Node)
```

Crucially, **types have no effect at runtime**. They exist only to help you and your tools during development, and are removed entirely when the code is compiled. This is called *type erasure*.

## Basic Types

You attach a type to a variable with a **type annotation** — a colon followed by the type name:

```ts
let title: string = "TypeScript";
let version: number = 5;
let stable: boolean = true;
```

### The primitives

TypeScript builds on JavaScript's primitive types:

- **`string`** — textual data: `"hello"`, `` `template ${x}` ``.
- **`number`** — all numeric values; there is no separate `int` or `float`. Includes `42`, `3.14`, `Infinity`, `NaN`.
- **`boolean`** — `true` or `false`.
- **`null`** and **`undefined`** — the absence of a value, each its own type.

Note that the type names are lowercase (`string`, not `String`). The capitalized versions refer to JavaScript's wrapper objects and should generally be avoided.

### Arrays

Arrays are written as the element type followed by `[]`:

```ts
let scores: number[] = [90, 85, 100];
let names: string[] = ["Ada", "Alan"];
```

An equivalent generic form, `Array<number>`, means exactly the same thing — pick whichever reads better to you.

### Tuples

A **tuple** is an array with a fixed length and a known type at each position:

```ts
let point: [number, number] = [10, 20];
let entry: [string, number] = ["age", 30];
```

### `any`

The **`any`** type opts out of type checking entirely. A value typed `any` can be assigned anything and used in any way, with no compile-time errors:

```ts
let value: any = 4;
value = "now a string"; // allowed
value.foo.bar();        // allowed — no error, may crash at runtime
```

`any` is an escape hatch. It is occasionally useful when migrating JavaScript or interfacing with untyped libraries, but every `any` is a hole in your type safety — use it sparingly.

### `unknown`

**`unknown`** is the type-safe counterpart to `any`. You can assign anything *to* it, but you cannot use it until you've narrowed it to a more specific type:

```ts
let input: unknown = fetchData();

input.toUpperCase();        // ✗ Error: 'input' is of type 'unknown'.

if (typeof input === "string") {
  input.toUpperCase();      // ✓ OK — narrowed to string inside the guard
}
```

Prefer `unknown` over `any` whenever you must accept a value of uncertain type but still want the compiler to protect you.

### `void` and `never`

- **`void`** describes a function that returns no useful value:

  ```ts
  function log(message: string): void {
    console.log(message);
  }
  ```

- **`never`** describes a value that can never occur — for instance, the return type of a function that always throws or never finishes:

  ```ts
  function fail(message: string): never {
    throw new Error(message);
  }
  ```
