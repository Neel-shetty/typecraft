/**
 * Type-level string operations
 */

/**
 * Converts a string to a tuple of characters
 */
export type StringToTuple<S extends string, T extends string[] = []> =
  S extends `${infer First}${infer Rest}`
    ? StringToTuple<Rest, [...T, First]>
    : T;

/**
 * Creates a tuple of index-character pairs
 */
export type IndexedChars<S extends string> = StringToTuple<S> extends infer Arr extends string[]
  ? { [K in keyof Arr]: [K, Arr[K]] }
  : never;

/**
 * Gets character at specific index
 */
export type CharAt<
  S extends string,
  I extends number,
  Arr extends string[] = StringToTuple<S>
> = Arr[I];