# Pattern-matching

A pattern matching library for javascript.

## Usage

```typescript
import {match, any} from "pattern-match"

const fact = match(
  [0, () => 1],
  [any, (n) => n * fact(n - 1)]
)

const add = match(
  [1, 2, () => return 3],
  [any, 2, () => return 6],
  [(num1, num2) => num1 + num2]
)

const complex = match(
  [equals({name: "jason"}), equals({name: "jack"}), (obja, objb) => { /** some thing */ }],
  
)
```