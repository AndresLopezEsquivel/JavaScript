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

## Type Inference

You do not have to annotate everything. When TypeScript can figure out a type on its own, it does — this is called **type inference**. In practice, much of a well-typed codebase has few explicit annotations.

### Inference from initialization

When you declare and initialize a variable in one step, TypeScript infers the type from the value:

```ts
let title = "TypeScript"; // inferred as string
let version = 5;          // inferred as number
let stable = true;        // inferred as boolean
```

These are equivalent to writing `: string`, `: number`, and `: boolean` explicitly — but the annotation is redundant, so idiomatic TypeScript omits it. The inferred type is still fully enforced:

```ts
let title = "TypeScript";
title = 5; // ✗ Error: Type 'number' is not assignable to type 'string'.
```

### `let` vs `const`

The *width* of an inferred type depends on how the variable is declared. A `const` can never be reassigned, so TypeScript infers the narrowest possible **literal type**; a `let` may change, so it infers the broader primitive:

```ts
let mutable = "hello";   // inferred as string
const fixed = "hello";   // inferred as "hello" (a literal type)
```

This narrowing is what makes literal and union types practical later on.

### Return type inference

Function return types are inferred from the `return` statements, so you often don't need to annotate them:

```ts
function add(a: number, b: number) {
  return a + b; // return type inferred as number
}
```

Parameters, however, are **not** inferred in an ordinary function declaration — TypeScript has no way to know what callers will pass, so unannotated parameters fall back to `any` (or raise an error under `noImplicitAny`). As a rule of thumb: **annotate parameters, let return types infer.**

### Contextual typing

Inference also flows *inward* from the surrounding context. When the position of an expression already implies a type, TypeScript types it for you — this is **contextual typing**:

```ts
const names = ["Ada", "Alan"];

names.forEach((name) => {
  // `name` is inferred as string from the array's element type
  console.log(name.toUpperCase());
});
```

Here the callback parameter `name` needs no annotation: TypeScript knows `forEach` on a `string[]` passes a `string`.

### When to annotate

Inference is powerful, but explicit annotations are still valuable in a few places:

- **Function parameters** — almost always annotate them.
- **Public APIs** — annotating exported function return types makes the contract explicit and stops an accidental internal change from silently altering the signature.
- **Uninitialized variables** — `let result;` infers `any`; write `let result: number;` instead.

The guiding principle: let inference handle the obvious, and annotate where it documents intent or closes a safety gap.

## Functions

Functions are where type annotations do the most work: they describe what a function accepts and what it produces, turning the call site into a checked contract.

### Annotating parameters and return types

Each parameter gets its own annotation, and the return type follows the parameter list:

```ts
function greet(name: string): string {
  return `Hello, ${name}`;
}
```

As covered under inference, you typically annotate parameters and let the return type infer — but annotating the return type explicitly is worthwhile for public functions.

### Function expressions and arrow functions

The same applies to function expressions and arrow functions:

```ts
const greet = (name: string): string => `Hello, ${name}`;
```

### Optional parameters

A `?` after the parameter name makes it **optional**. Optional parameters must come after all required ones, and their type includes `undefined`:

```ts
function greet(name: string, title?: string): string {
  return title ? `Hello, ${title} ${name}` : `Hello, ${name}`;
}

greet("Ada");            // ✓
greet("Ada", "Dr.");     // ✓
```

### Default parameters

A **default value** is used when the argument is omitted or `undefined`. A parameter with a default is automatically optional, and its type is inferred from the default:

```ts
function greet(name: string, greeting = "Hello"): string {
  return `${greeting}, ${name}`;
}

greet("Ada");          // "Hello, Ada"
greet("Ada", "Hi");    // "Hi, Ada"
```

### Rest parameters

A **rest parameter** collects any number of trailing arguments into an array, typed as an array type:

```ts
function sum(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}

sum(1, 2, 3); // 6
```

### Function types

A function itself has a type, written as a parameter list and an arrow to the return type. This is how you describe a value that *is* a function — for example, a callback:

```ts
let operation: (a: number, b: number) => number;

operation = (a, b) => a + b; // params inferred from the function type
operation = (a, b) => a * b;
```

Because the function type already supplies the parameter types, the assigned arrow function needs no annotations of its own — contextual typing fills them in.

### `void` return type

A function type returning `void` describes a function whose result is ignored. Notably, a function returning a value *is still assignable* to a `void`-returning type — the value is simply discarded:

```ts
const numbers = [1, 2, 3];
const logged: number[] = [];

numbers.forEach((n) => logged.push(n));
// push returns a number, but forEach expects (value) => void — allowed
```

This special rule is what lets you pass concise callbacks like the one above without wrapping them to discard the return value.

## Interfaces and Type Aliases

So far we've typed individual values. To describe the **shape of an object** — what properties it has and what types they hold — TypeScript offers two tools: `interface` and `type`.

### Interfaces

An **interface** names an object shape:

```ts
interface User {
  id: number;
  name: string;
}

const ada: User = { id: 1, name: "Ada" };
```

A value satisfies the interface as long as it has the required properties with the right types. Missing or mistyped properties are compile errors:

```ts
const bad: User = { id: 1 }; // ✗ Property 'name' is missing.
```

### Type aliases

A **type alias** gives a name to *any* type — not just object shapes. For an object it looks almost identical to an interface:

```ts
type User = {
  id: number;
  name: string;
};
```

But a `type` can also name primitives, unions, tuples, and more — things an `interface` cannot express:

```ts
type ID = number | string;
type Point = [number, number];
```

### Optional and readonly properties

A `?` marks a property as **optional**; `readonly` prevents reassignment after creation. Both work in interfaces and object type aliases:

```ts
interface User {
  readonly id: number; // can't be changed once set
  name: string;
  email?: string;      // may be omitted
}

const ada: User = { id: 1, name: "Ada" };
ada.id = 2;            // ✗ Cannot assign to 'id' — it is read-only.
```

### Nested and function members

Object types compose: properties can themselves be objects, arrays, or functions:

```ts
interface User {
  id: number;
  name: string;
  address: {
    city: string;
    country: string;
  };
  greet(): string; // a method
}
```

### Extending and composing

Interfaces can **extend** other interfaces to build larger shapes from smaller ones:

```ts
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}
```

Type aliases achieve the same through **intersection** with `&`:

```ts
type Animal = { name: string };
type Dog = Animal & { breed: string };
```

### Interface vs. type: which to use?

The two overlap heavily for object shapes. The practical differences:

- **Interfaces** can be *reopened* — declaring an `interface` with the same name twice merges the declarations (**declaration merging**). Type aliases cannot be redeclared.
- **Type aliases** are more general — they can name unions, tuples, primitives, and computed types that interfaces cannot.

A common convention: **use `interface` for object shapes** (especially public ones meant to be extended), and **reach for `type` when you need a union, tuple, or other non-object type**. Either choice is fine for plain objects — consistency matters more than the specific rule.
