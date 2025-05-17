/**
 * Utility types for type-level programming
 */

/**
 * Builds a tuple of specified length
 */
export type BuildTuple<
  N extends number,
  T extends unknown[] = []
> = T['length'] extends N ? T : BuildTuple<N, [unknown, ...T]>;

/**
 * Converts a type to number if possible
 */
export type ToNumber<T> = T extends number ? T : never;

/**
 * Adds two numbers at type level
 */
export type Add<
  A extends number,
  B extends number,
> = [...BuildTuple<A>, ...BuildTuple<B>]['length'];

/**
 * Subtracts B from A at type level
 */
export type Subtract<
  A extends number,
  B extends number
> = BuildTuple<A> extends [...BuildTuple<B>, ...infer R] ? R['length'] : never;