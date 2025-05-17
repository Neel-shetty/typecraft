/**
 * Type-level number operations and predicates
 */
import { BuildTuple, Subtract } from './utility-types';

/**
 * Checks if a number is even
 */
export type IsEven<
  N extends number,
  T extends unknown[] = BuildTuple<N>
> = T extends [unknown, unknown, ...infer Rest]
  ? IsEven<Rest['length']>
  : T extends [unknown]
  ? false
  : true;

/**
 * Checks if a number is odd
 */
export type IsOdd<N extends number> = IsEven<N> extends true
  ? false : true;

/**
 * Returns "even" or "odd" depending on number
 */
export type OddOrEven<N extends number> = IsEven<N> extends true ? "even" : "odd";

/**
 * Returns the greater of two numbers
 */
export type Greater<
  N extends number,
  T extends number,
> = BuildTuple<N> extends [...BuildTuple<T>, ...infer _Rest] ? N : T;

/**
 * Returns the greatest of three numbers
 */
export type GreatestOfThree<
  A extends number,
  B extends number,
  C extends number,
> = Greater<A, B> extends A ?
  Greater<A, C> extends A ? A : C
  : Greater<B, C> extends B ? B : C;

/**
 * Multiplies two numbers at type level
 */
export type Multiply<
  A extends number,
  B extends number,
  Result extends unknown[] = []
> = B extends 0
  ? Result['length']
  : Multiply<A, Subtract<B, 1>, [...Result, ...BuildTuple<A>]>;

/**
 * Calculates factorial at type level
 */
export type Factorial<
  N extends number,
  Acc extends number = 1,
> = N extends 0
  ? Acc
  : Factorial<Subtract<N, 1>, Multiply<Acc, N>>;