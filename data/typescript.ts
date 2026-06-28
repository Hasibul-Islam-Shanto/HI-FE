import { Topic } from '@/types/question';

export const typescript: Topic = {
  slug: 'typescript',
  title: 'TypeScript',
  description: 'Types, generics & safe code.',
  color: '#06b6d4',
  questions: [
    {
      id: 'typescript-01',
      question: 'What is TypeScript and what benefits does it provide?',
      level: 'junior',
      answer: 'TypeScript is a statically typed superset of JavaScript compiled to JS. Benefits: catch type errors at compile time, better IDE autocomplete/refactoring, self-documenting code via types, safer large codebase maintenance. Zero runtime overhead after compilation.',
    },
    {
      id: 'typescript-02',
      question: "What's the difference between type and interface?",
      level: 'middle',
      answer: 'Both define object shapes. interface can be extended and merged via declaration merging (adding properties to the same name in multiple places). type is more versatile: it supports union types, intersections, mapped types, and conditional types. Prefer interface for objects/classes; type for everything else.',
    },
    {
      id: 'typescript-03',
      question: "What's the difference between any, unknown and never?",
      level: 'middle',
      answer: 'any opts out of type checking entirely, which is dangerous. unknown is a type-safe any — it must be narrowed (with typeof or instanceof) before use. never is the empty type — a function that never returns, because it always throws or loops forever, has return type never. Prefer unknown over any, and use never for exhaustive checks.',
    },
    {
      id: 'typescript-04',
      question: 'What are generics and what are they for?',
      level: 'middle',
      answer: 'Generics allow writing reusable code that works with multiple types while preserving type safety, such as an identity function that returns whatever type it was given. Used in arrays, Promises, API response types, and utility functions. They can be constrained with the extends keyword.',
    },
    {
      id: 'typescript-05',
      question: "What's the difference between union and intersection types?",
      level: 'middle',
      answer: 'A union type means the value can be type A OR type B. An intersection type means the value must satisfy BOTH types — combining all their properties. Use union for "one of several shapes" and intersection for composing types together.',
    },
    {
      id: 'typescript-06',
      question: 'What do utility types (Partial, Pick, Omit, Record) do?',
      level: 'middle',
      answer: 'Partial makes all properties optional. Required makes all properties required. Pick keeps only specified keys. Omit removes specified keys. Record constructs an object type with a given key type and value type. Readonly makes all properties read-only.',
    },
    {
      id: 'typescript-07',
      question: 'What is an optional and readonly property?',
      level: 'junior',
      answer: 'An optional property may be undefined or absent, marked with a question mark after its name. A readonly property cannot be reassigned after initialization. The Readonly utility type applies this to every property of a type at once.',
    },
    {
      id: 'typescript-08',
      question: 'What is type assertion (as) and what are its risks?',
      level: 'middle',
      answer: 'A type assertion, using the as keyword, tells TypeScript "trust me, this is this type" — for example asserting that an element returned by getElementById is specifically an HTMLDivElement. It bypasses type checking — if you\'re wrong, it causes runtime errors. Use only when you know more than TS infers, and prefer type guards over assertions where possible. A double assertion through unknown is a red flag.',
    },
    {
      id: 'typescript-09',
      question: 'What does strict mode (tsconfig) enable?',
      level: 'middle',
      answer: 'Setting strict to true enables a bundle of checks: strictNullChecks (null/undefined are not assignable to other types), noImplicitAny, strictFunctionTypes, strictPropertyInitialization, strictBindCallApply, and others. Always enable it in new projects.',
    },
    {
      id: 'typescript-10',
      question: 'What is type inference?',
      level: 'junior',
      answer: 'TypeScript automatically infers types from values without explicit annotations — for example, assigning the number 5 to a variable infers its type as number. This works for variables, return types, destructuring, and more, reducing boilerplate while keeping type safety.',
    },
    {
      id: 'typescript-11',
      question: 'What is a tuple?',
      level: 'middle',
      answer: 'A tuple is a fixed-length array with specific types at each index, such as a pair representing a 2D point with two number elements. TypeScript enforces both the length and the position-specific types. Tuples can also have optional elements and rest elements.',
    },
    {
      id: 'typescript-12',
      question: 'What is an enum and is there an alternative?',
      level: 'junior',
      answer: 'An enum creates named constants, numeric by default, or string-valued if explicitly assigned strings. A commonly preferred alternative is a plain object marked "as const" paired with a derived union type — this avoids runtime overhead and works better with type narrowing than a traditional enum.',
    },
    {
      id: 'typescript-13',
      question: 'What are conditional types and infer?',
      level: 'senior',
      answer: "A conditional type acts as a type-level ternary: if a type extends another, resolve to one type, otherwise another. The infer keyword lets you extract a type from within an extends clause, which is how many built-in utility types (like extracting a function's return type) are implemented.",
    },
    {
      id: 'typescript-14',
      question: 'Discriminated union and exhaustive check?',
      level: 'senior',
      answer: "A discriminated union shares a literal \"tag\" property across its union members, such as a shape type with variants tagged 'circle' or 'rect', each carrying different additional properties. Switching on the tag lets TypeScript safely narrow which variant you're working with. An exhaustive check adds a default branch that assigns the remaining value to the never type — if a new variant is added without being handled, TypeScript errors at compile time.",
    },
    {
      id: 'typescript-15',
      question: 'What does the satisfies operator provide?',
      level: 'senior',
      answer: 'satisfies validates that a value matches a type without widening the inferred type — for example checking that an object of color names mapping to RGB tuples matches a Record of string arrays, while still keeping the more precise inferred type (so TypeScript still knows each value is a specific-length tuple, not just a generic array).',
    },
    {
      id: 'typescript-16',
      question: 'Module augmentation and declaration merging?',
      level: 'senior',
      answer: "Declaration merging means multiple interface declarations with the same name are merged together automatically. Module augmentation lets you add properties to an existing module's types by re-declaring that module — for example adding a custom user property to an existing Request interface from a third-party library. Used to extend types from libraries you don't control, such as adding request context in Express-style frameworks.",
    },
    {
      id: 'typescript-17',
      question: 'TODO — add 17th TypeScript question',
      level: 'middle',
      answer: 'TODO',
    },
  ],
};
