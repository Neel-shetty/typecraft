# Type Smashing

A collection of advanced TypeScript type-level programming utilities that demonstrate the power of TypeScript's type system.

## Overview

Type Smashing is a TypeScript library that showcases type-level programming techniques. It implements various data structures and algorithms purely at the type level, demonstrating how TypeScript's type system can be used for compile-time computation.

## Features

### Linked List

A complete type-level implementation of a linked list data structure with the following operations:

- Create linked lists with `ListNode<T, Next>`
- Basic operations: `Head`, `Tail`, `Prepend`, `Append`
- List manipulation: `Length`, `ValueAt`, `Reverse`, `Concat`
- Conversions: `TupleToList`, `ListToTuple`
- Transformations: `Map`

### Fibonacci Sequence

Compute Fibonacci numbers at compile-time using recursive type definitions.

### Number Operations

Various type-level operations for working with numbers:

- Predicates: `IsEven`, `IsOdd`, `OddOrEven`
- Comparisons: `Greater`, `GreatestOfThree`
- Arithmetic: `Multiply`, `Factorial`

### String Operations

Type-level utilities for working with strings:

- `StringToTuple`: Convert a string to a tuple of characters
- `IndexedChars`: Create a tuple of index-character pairs
- `CharAt`: Get a character at a specific index

## Usage

Import the types you need and use them in your TypeScript code:

```typescript
import { Fibonacci } from "./fibonacci";
import { IsEven, Factorial } from "./number-helpers";
import { TupleToList, Append, Reverse } from "./linked-list";

// Type-level computation examples:
type Fib10 = Fibonacci<10>; // 55
type Is42Even = IsEven<42>; // true
type Fact5 = Factorial<5>; // 120

// Linked list operations:
type MyList = TupleToList<[1, 2, 3]>;
type Extended = Append<MyList, 4>; // ListNode<1, ListNode<2, ListNode<3, ListNode<4, null>>>>
type Reversed = Reverse<MyList>; // ListNode<3, ListNode<2, ListNode<1, null>>>
```

## Project Structure

- `linked-list.ts`: Type-level linked list implementation
- `fibonacci.ts`: Type-level Fibonacci sequence
- `number-helpers.ts`: Numeric operations and predicates
- `string-helpers.ts`: String manipulation utilities
- `utility-types.ts`: Common utility types used across the library
- `main.ts`: Demo showcasing the library features

## Why Type-Level Programming?

Type-level programming in TypeScript allows for:

1. Compile-time validation
2. Advanced type safety
3. Self-documenting code through the type system
4. Learning the limits and capabilities of TypeScript's type system
5. I just wanted to learn TS deeply.

This project primarily serves as an educational demonstration of what's possible with TypeScript's type system.
