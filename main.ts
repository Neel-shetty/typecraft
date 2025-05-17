/**
 * Type Smashing: Demonstrating advanced TypeScript type-level programming
 */

// Import all our utility types and helpers
import { Fibonacci } from "./fibonacci";
import {
  IsEven,
  IsOdd,
  OddOrEven,
  Greater,
  GreatestOfThree,
  Multiply,
  Factorial,
} from "./number-helpers";
import { StringToTuple, IndexedChars, CharAt } from "./string-helpers";

// Demo for the linked list type implementation
import {
  ListNode,
  EmptyList,
  Head,
  Tail,
  Prepend,
  Append,
  Length,
  ValueAt,
  TupleToList,
  ListToTuple,
  Reverse,
  Concat,
  Map,
  AddOne,
} from "./linked-list";

// ----- DEMO: Fibonacci Sequence -----
type F0 = Fibonacci<0>; // 0
type F1 = Fibonacci<1>; // 1
type F2 = Fibonacci<2>; // 1
type F3 = Fibonacci<3>; // 2
type F4 = Fibonacci<4>; // 3
type F5 = Fibonacci<5>; // 5
type F6 = Fibonacci<6>; // 8
type F7 = Fibonacci<7>; // 13
type F8 = Fibonacci<8>; // 21
type F9 = Fibonacci<9>; // 34
type F10 = Fibonacci<10>; // 55
type F16 = Fibonacci<16>; // 987

// ----- DEMO: Even/Odd Numbers -----
type EvenNumber = IsEven<6>; // true
type OddNumber = IsOdd<5>; // true
type NotOddNumber = IsOdd<4>; // false
type OddEvenTest1 = OddOrEven<5>; // "odd"
type OddEvenTest2 = OddOrEven<4>; // "even"

// ----- DEMO: Number Comparisons -----
type CompareTest1 = Greater<1, 2>; // 2
type CompareTest2 = Greater<100, 9>; // 100
type CompareTest3 = Greater<999, 500>; // 999
type ThreeWayTest1 = GreatestOfThree<1, 3, 2>; // 3
type ThreeWayTest2 = GreatestOfThree<1, 3, 4>; // 4
type ThreeWayTest3 = GreatestOfThree<5, 3, 4>; // 5

// ----- DEMO: Arithmetic Operations -----
type MultiplyTest = Multiply<10, 10>; // 100

// ----- DEMO: Factorial -----
type Fact0 = Factorial<0>; // 1
type Fact1 = Factorial<1>; // 1
type Fact2 = Factorial<2>; // 2
type Fact3 = Factorial<3>; // 6
type Fact4 = Factorial<4>; // 24
type Fact5 = Factorial<5>; // 120
type Fact6 = Factorial<6>; // 720

// ----- DEMO: String Operations -----
type StringAsTuple = StringToTuple<"hello">; // ['h', 'e', 'l', 'l', 'o']
type IndexedString = IndexedChars<"hello">; // [[0, 'h'], [1, 'e'], [2, 'l'], [3, 'l'], [4, 'o']]
type SecondChar = CharAt<"hello", 1>; // 'e'

// ----- DEMO: Linked List Operations -----
// Create a linked list: 1 -> 2 -> 3 -> null
type MyList = ListNode<1, ListNode<2, ListNode<3, null>>>;

// Convert tuple to linked list
type FromTuple = TupleToList<[5, 6, 7, 8]>;

// Basic operations
type First = Head<MyList>; // 1
type Rest = Tail<MyList>; // ListNode<2, ListNode<3, null>>
type NewHead = Prepend<0, MyList>; // ListNode<0, MyList>
type Longer = Append<MyList, 4>; // ListNode<1, ListNode<2, ListNode<3, ListNode<4, null>>>>

// Compute length
type ListLength = Length<MyList>; // 3

// Access by index
type Second = ValueAt<MyList, 1>; // 2

// Convert back to tuple
type AsTuple = ListToTuple<MyList>; // [1, 2, 3]

// Reverse the list: 3 -> 2 -> 1 -> null
type Backwards = Reverse<MyList>;

// Concatenate lists
type List1 = TupleToList<[1, 2]>;
type List2 = TupleToList<[3, 4]>;
type Combined = Concat<List1, List2>; // ListNode<1, ListNode<2, ListNode<3, ListNode<4, null>>>>

// Print results using type assertions for demonstration
const _typeChecks = {
  first: {} as unknown as First extends 1 ? true : false,
  length: {} as unknown as ListLength extends 3 ? true : false,
  secondValue: {} as unknown as Second extends 2 ? true : false,
  asTuple: {} as unknown as AsTuple extends [1, 2, 3] ? true : false,
  // Check that our reverse operation really flipped the list
  reversedHead: {} as unknown as Head<Backwards> extends 3 ? true : false,
};

// All should be true if properly implemented
type AllChecksPass = true extends (typeof _typeChecks)["first"]
  ? true extends (typeof _typeChecks)["length"]
    ? true extends (typeof _typeChecks)["secondValue"]
      ? true extends (typeof _typeChecks)["asTuple"]
        ? true extends (typeof _typeChecks)["reversedHead"]
          ? "All linked list operations work correctly!"
          : "Reverse failed"
        : "ListToTuple failed"
      : "ValueAt failed"
    : "Length failed"
  : "Head failed";
