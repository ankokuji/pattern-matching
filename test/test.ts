import {match, $} from "../index"

const add = match(
  [0, 1, (a, b) => console.log("a 0 and b 1")],
  [2, 3, (a, b) => console.log("a 2 and b 3")],
  [$, 5, (a, b) => console.log("b is 5")],
  // [() => console.log("default pattern")]
)

const fact = match(
  [0, () => 1],
  // Identify `$` represents a pattern of `any`.
  [$, (n) => n * fact(n - 1)]
)

const ss = fact(5)

// const fun: (...args: any[]) => any = (a, b) => {return a+ b}

const res = add(4,6)
debugger