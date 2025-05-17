/**
 * Linked List Implementation in TypeScript's Type System
 * 
 * This file implements a type-level linked list with various operations
 */

// Define the structure of a linked list node
export type ListNode<T, Next = null> = {
  value: T;
  next: Next;
};

// Empty list is represented by null
export type EmptyList = null;

// Helper to check if a list is empty
export type IsEmpty<List> = List extends null ? true : false;

// Get the head (first value) of a linked list
export type Head<List> = List extends ListNode<infer T, any> ? T : never;

// Get the tail (rest of the list) of a linked list
export type Tail<List> = List extends ListNode<any, infer Next> ? Next : never;

// Prepend a value to a linked list (add at beginning)
export type Prepend<Value, List> = ListNode<Value, List>;

// Append a value to the end of a linked list
export type Append<List, Value> = List extends null
  ? ListNode<Value, null>
  : ListNode<Head<List>, Append<Tail<List>, Value>>;

// Get the length of a linked list
export type Length<List, Acc extends any[] = []> = List extends null
  ? Acc["length"]
  : Length<Tail<List>, [...Acc, any]>;

// Get value at a specific index
export type ValueAt<List, Index extends number, CurrentIndex extends any[] = []> = 
  List extends null 
    ? never
    : CurrentIndex["length"] extends Index
      ? Head<List>
      : ValueAt<Tail<List>, Index, [...CurrentIndex, any]>;

// Convert tuple to linked list
export type TupleToList<Tuple extends any[]> = 
  Tuple extends [] 
    ? null
    : Tuple extends [infer First, ...infer Rest]
      ? ListNode<First, TupleToList<Rest>>
      : never;

// Convert linked list to tuple
export type ListToTuple<List> = 
  List extends null 
    ? []
    : [Head<List>, ...ListToTuple<Tail<List>>];

// Reverse a linked list
export type Reverse<List, Acc = null> = 
  List extends null 
    ? Acc
    : Reverse<Tail<List>, ListNode<Head<List>, Acc>>;

// Concatenate two linked lists
export type Concat<ListA, ListB> = 
  ListA extends null 
    ? ListB
    : ListNode<Head<ListA>, Concat<Tail<ListA>, ListB>>;

// Map a type transformation over a linked list
export type Map<List, F extends (item: any) => any> = 
  List extends null 
    ? null
    : ListNode<F extends (item: infer I) => infer R ? ReturnType<F> : never, Map<Tail<List>, F>>;

// Example of type-level transformation
export type AddOne<T extends number> = [1, ...TupleMaker<T>]["length"];
export type TupleMaker<N extends number, T extends any[] = []> = 
  T["length"] extends N ? T : TupleMaker<N, [...T, any]>;

// ----- DEMO -----

// Example: Create a linked list with values 1, 2, 3
export type ExampleList = ListNode<1, ListNode<2, ListNode<3, null>>>;

// Example: Convert a tuple to a linked list
export type NumbersList = TupleToList<[1, 2, 3, 4, 5]>;

// Example: Get the head of a list
export type FirstValue = Head<NumbersList>; // 1

// Example: Get the tail of a list
export type RestOfList = Tail<NumbersList>; // ListNode<2, ListNode<3, ListNode<4, ListNode<5, null>>>>

// Example: Prepend a value
export type PrependedList = Prepend<0, NumbersList>; // ListNode<0, NumbersList>

// Example: Append a value
export type AppendedList = Append<NumbersList, 6>; // ListNode<1, ListNode<2, ... ListNode<6, null>>>

// Example: Get the length
export type ListLength = Length<NumbersList>; // 5

// Example: Get value at index
export type ThirdValue = ValueAt<NumbersList, 2>; // 3

// Example: Reverse a list
export type ReversedList = Reverse<NumbersList>; // ListNode<5, ListNode<4, ... ListNode<1, null>>>

// Example: Concatenate lists
export type List1 = TupleToList<[1, 2]>;
export type List2 = TupleToList<[3, 4]>;
export type ConcatList = Concat<List1, List2>; // ListNode<1, ListNode<2, ListNode<3, ListNode<4, null>>>>

// Example: Map operation (add 1 to each number)
export type IncrementedList = Map<NumbersList, { <T extends number>(n: T): AddOne<T> }>; // ListNode<2, ListNode<3, ... ListNode<6, null>>>