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

## Union and Literal Types

Union and literal types let you describe values that can be *one of several specific possibilities* — a capability that has no direct equivalent in plain JavaScript.

### Union types

A **union** type, written with `|`, allows a value to be any one of several types:

```ts
let id: number | string;

id = 42;     // ✓
id = "A-42"; // ✓
id = true;   // ✗ Type 'boolean' is not assignable to 'number | string'.
```

Unions appear constantly — for example, a function that accepts either form of an id:

```ts
function format(id: number | string): string {
  return `ID: ${id}`;
}
```

### Literal types

A **literal type** is a type whose only value is one specific literal. On its own it is rarely useful:

```ts
let mode: "dark"; // can only ever be the string "dark"
mode = "light";   // ✗ Type '"light"' is not assignable to type '"dark"'.
```

Recall from inference that `const x = "dark"` is given the literal type `"dark"`, while `let` widens to `string`. Literals become powerful when combined into a union.

### Literal unions

A **union of literals** describes a small, fixed set of allowed values — a lightweight, type-checked alternative to "magic strings":

```ts
type Theme = "light" | "dark" | "system";

function setTheme(theme: Theme): void {
  // ...
}

setTheme("dark");  // ✓
setTheme("blue");  // ✗ Argument of type '"blue"' is not assignable to 'Theme'.
```

The same works with numeric and boolean literals:

```ts
type Direction = -1 | 0 | 1;
```

### Narrowing

When you have a union, TypeScript only lets you do what is valid for *every* member — until you **narrow** it. Narrowing uses ordinary runtime checks (`typeof`, `===`, `in`, truthiness, etc.) to tell the compiler which member you have in a given branch:

```ts
function format(id: number | string): string {
  if (typeof id === "string") {
    return id.toUpperCase(); // id is string here
  }
  return id.toFixed(0);      // id is number here
}
```

This interplay — a union widening what a value *might* be, and narrowing recovering what it *is* in each branch — is one of the most distinctive and powerful patterns in TypeScript.

### Discriminated unions

A particularly useful pattern combines literal types with object shapes. Each shape carries a common literal property — the **discriminant** — that identifies which variant it is:

```ts
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2; // narrowed to the circle variant
    case "square":
      return shape.side ** 2;             // narrowed to the square variant
  }
}
```

Switching on `kind` narrows `shape` to exactly one variant in each branch, giving you safe access to that variant's properties. This pattern scales cleanly as you add new cases.

## Generics

**Generics** let you write code that works over *many* types while preserving the relationships between them. They are type-level parameters: just as a function parameter stands in for a value supplied at call time, a *type parameter* stands in for a type supplied at use time.

### The problem they solve

Suppose you want a function that returns whatever it is given. Typing it with a concrete type is too narrow; typing it with `any` throws away all type information:

```ts
function identity(value: any): any {
  return value;
}

const result = identity("hello"); // result is `any` — we've lost that it's a string
```

A **generic type parameter**, written in angle brackets, captures the caller's type and threads it through:

```ts
function identity<T>(value: T): T {
  return value;
}

const a = identity("hello"); // T = string, a is string
const b = identity(42);      // T = number, b is number
```

`T` is just a name (a single uppercase letter is conventional, but `identity<Item>` is equally valid). TypeScript usually **infers** the type argument from the call, so you rarely write it explicitly — though you can: `identity<string>("hello")`.

### Generic functions over structures

Generics shine when a function relates its input and output types. Here the element type flows from the array to the return value:

```ts
function first<T>(items: T[]): T | undefined {
  return items[0];
}

const n = first([1, 2, 3]);       // number | undefined
const s = first(["a", "b"]);      // string | undefined
```

### Generic interfaces and type aliases

Types can be generic too. A type parameter on an interface or alias lets one definition describe a whole family of shapes:

```ts
interface Box<T> {
  value: T;
}

const numberBox: Box<number> = { value: 42 };
const stringBox: Box<string> = { value: "hello" };

type Pair<K, V> = {
  key: K;
  value: V;
};
```

You can declare more than one type parameter (`Pair<K, V>` above), and they can have defaults: `interface Box<T = string>`.

### Constraints

By default a type parameter could be *anything*, so you can't assume it has any particular properties. A **constraint**, written with `extends`, restricts the type parameter to something that has the members you need:

```ts
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}

longest("hello", "hi");      // ✓ strings have length
longest([1, 2], [1, 2, 3]);  // ✓ arrays have length
longest(10, 20);             // ✗ number has no 'length' property
```

The constraint says "`T` can be any type, *as long as* it has a numeric `length`," which is exactly enough to make `a.length` valid inside the function while still preserving the precise type at the call site.

### Why generics matter

Generics give you the reusability of `any` *without* sacrificing type safety. They are the foundation of TypeScript's standard library — `Array<T>`, `Promise<T>`, `Map<K, V>`, and many built-in utilities are all generic — so understanding them unlocks a large portion of the type system.

## Classes

Classes are a JavaScript feature, but TypeScript adds type annotations, access control, and a few conveniences on top. They package data (properties) and behavior (methods) into a reusable blueprint for objects.

### Fields, constructors, and methods

Class fields are declared with their types, initialized in the **constructor**, and operated on by **methods**:

```ts
class User {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(): string {
    return `Hi, I'm ${this.name}`;
  }
}

const ada = new User("Ada", 36);
ada.greet(); // "Hi, I'm Ada"
```

Unlike plain JavaScript, fields must be declared before use — TypeScript needs to know the shape of an instance.

### Access modifiers

TypeScript adds **access modifiers** that control where a member can be used:

- **`public`** (the default) — accessible everywhere.
- **`private`** — accessible only within the same class.
- **`protected`** — accessible within the class and its subclasses.

```ts
class Account {
  private balance = 0;

  deposit(amount: number): void {
    this.balance += amount; // ✓ inside the class
  }
}

const acc = new Account();
acc.balance; // ✗ Property 'balance' is private.
```

These modifiers are checked at *compile time*. TypeScript also supports JavaScript's native `#private` fields, which enforce privacy at runtime as well.

### `readonly` fields

A `readonly` field can be set in the constructor but never reassigned afterward:

```ts
class User {
  readonly id: number;

  constructor(id: number) {
    this.id = id;
  }
}
```

### Parameter properties

Declaring a field and assigning it from a constructor parameter is so common that TypeScript offers a shorthand: put an access modifier (or `readonly`) on a constructor parameter, and it becomes a field automatically. These two classes are equivalent:

```ts
class User {
  constructor(
    public name: string,
    private age: number,
  ) {}
}

// equivalent to declaring `name`/`age` fields and assigning them in the body
```

### Inheritance

A class can **extend** another to inherit its members, calling the parent constructor with `super`:

```ts
class Animal {
  constructor(public name: string) {}

  move(): string {
    return `${this.name} moves`;
  }
}

class Dog extends Animal {
  constructor(name: string, public breed: string) {
    super(name); // must call before using `this`
  }

  move(): string {
    return `${super.move()} on four legs`; // override, reusing the parent
  }
}
```

### Implementing interfaces

A class can declare that it **implements** an interface, and TypeScript verifies it provides every member the interface requires. This separates the *contract* (the interface) from the *implementation* (the class):

```ts
interface Greetable {
  name: string;
  greet(): string;
}

class User implements Greetable {
  constructor(public name: string) {}

  greet(): string {
    return `Hi, I'm ${this.name}`;
  }
}
```

A class may implement several interfaces, while it can only extend one parent — interfaces are how you compose multiple contracts onto one class.

### Abstract classes

An **abstract class** cannot be instantiated directly; it serves as a base that defines some behavior and leaves the rest for subclasses to fill in via **abstract members**:

```ts
abstract class Shape {
  abstract area(): number; // no body — subclasses must implement

  describe(): string {
    return `Area is ${this.area()}`; // can use the abstract method
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }

  area(): number {
    return Math.PI * this.radius ** 2;
  }
}

new Shape();           // ✗ Cannot create an instance of an abstract class.
new Circle(2).describe(); // ✓
```

Abstract classes sit between interfaces (pure contracts) and concrete classes (full implementations): they can supply shared logic while still forcing subclasses to provide the missing pieces.
