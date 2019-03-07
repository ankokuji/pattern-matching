# Pattern-matching

A pattern matching library for javascript. Which works well with functional programming libraries like lodash to simplify nesting statement of "if ... else ..." and "switch".

## Usage

```typescript
import {match, $, equal, include} from "pattern-match"

// This will generate a function of factorial.
const fact = match(
  [0, () => 1],
  // Identify `$` represents a pattern of `any`.
  [$, (n) => n * fact(n - 1)]
)

const add = match(
  [1, 2, () => return 3],
  [4, 2, () => return 6],
  // Only one elemnt in array will be equal to [$, $, (num1, num2) => num1 + num2].
  [(num1, num2) => num1 + num2]
)

const complexMatch = match(
  [equal({name: "jason"}), equal({name: "jack"}), (obja, objb) => { /** some thing */ }],
  [include({age: 5}), $, (obja, objb) => { /** ... */}]
)
```

## Interface