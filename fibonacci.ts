/**
 * Type-level Fibonacci sequence implementation
 */
import { BuildTuple, ToNumber, Add } from './utility-types';

export type Fibonacci<
  N extends number,
  A extends number = 0,
  B extends number = 1,
  I extends unknown[] = []
> = I['length'] extends N ? A : Fibonacci<N, B, ToNumber<Add<A, B>>, [unknown, ...I]>;