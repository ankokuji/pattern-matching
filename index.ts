import _ from "lodash/fp"

type MatchItem = any[]

const ANY_PATTERN = Symbol("any")

/**
 * Main function to generate a match function.
 *
 * @export
 * @param {...MatchItem[]} matchItems
 * @returns {(...args: any[]) => any}
 */
export function match(...matchItems: MatchItem[]): (...args: any[]) => any {
  if (matchItems.length === 0) {
    return () => {}
  }
  return (...args: any[]) => {
    return matchAndExecAllMatchItems(args, matchItems)
  }
}

/**
 * 
 *
 * @param {any[]} args
 * @param {MatchItem[]} matchItems
 * @returns
 */
function matchAndExecAllMatchItems(args: any[], matchItems: MatchItem[]) {
  const matchPatternLength = matchItems.length
  let isMatched = false
  let result: any
  let matchIndex = 0
  while (!isMatched && matchIndex < matchPatternLength) {
    const [currentIsMatched, currentResult] = matchAndExec(args, matchItems[matchIndex])
    if (currentIsMatched) {
      isMatched = true
      result = currentResult
      break
    }
    matchIndex++
  }
  if (!isMatched) {
    // When there is no pattern matches arguments.
  }
  return result

}

/**
 * Determine if this match item can be matched by arguments.
 * If matched then execute function.
 *
 * @param {any[]} args
 * @param {MatchItem} matchItem
 * @returns {[boolean, any]}
 */
function matchAndExec(args: any[], matchItem: MatchItem): [boolean, any] {
  const execFun = last(matchItem)
  const patterns = initial(matchItem)
  const isMatched = examPattern(patterns, args)
  let execResult
  if(isMatched) {
    execResult = execFun.apply(null, args)
  }
  return [isMatched, execResult]
}

/**
 * Determine if arguments can be tested by patterns.
 *
 * @param {any[]} patterns
 * @param {any[]} args
 * @returns
 */
function examPattern(patterns: any[], args: any[]) {
  if (equalLength2Array(patterns, args)) {
    return examWithSameLength(args, patterns)
  } else if (patterns.length === 1){
    return examWithPatternFun(args, patterns)
  } else if (patterns.length === 0) {
    // No pattern in this item.
    return true
  } else {
    throw new Error(`Length of pattern (${patterns.length}) is not in accordance with the length of arguments(${args.length}). Please examine the function definition.`)
  }
}

/**
 * When patterns length is the same as arguments',
 * test them one by one.
 *
 * @param {any[]} args
 * @param {any[]} patterns
 * @returns
 */
function examWithSameLength(args: any[], patterns: any[]) {
  const length = args.length
  let isMatched = true
  for (let i = 0; i < length; i++) {
    if (!isMatch(patterns[i], args[i])) {
      isMatched = false
    }
  }
  return isMatched
}

/**
 * When there is only one pattern and is a function,
 * test all arguments with this function.
 *
 * @param {any[]} args
 * @param {*} patterns
 * @returns
 */
function examWithPatternFun(args: any[], patterns: any) {
  const patternFun = head(patterns)
  return patternFun.apply(null, args)
}

/**
 * Determine if the length of the two arrays is the same.
 *
 * @param {any[]} array1
 * @param {any[]} array2
 * @returns
 */
function equalLength2Array(array1: any[], array2: any[]) {
  if (!isArray(array1) || !isArray(array2)) {
    return false
  } else {
    return array1.length === array2.length
  }
}

/**
 * Determine target is matched by pattern.
 *
 * @param {*} pattern
 * @param {*} target
 * @returns
 */
function isMatch(pattern: any, target: any) {
  if (pattern === ANY_PATTERN) {
    return true
  }
  if (typeof pattern === "function") {
    return !!pattern.call(null, target)
  } else {
    return pattern === target
  }
}

/**
 * Get the last element of an array.
 *
 * @param {any[]} arr
 * @returns
 */
function last(arr: any[]) {
  if (!isArray(arr)) {
    return undefined
  }
  if (arr.length === 0) {
    return undefined
  }
  return arr[arr.length - 1]
}

/**
 * Get the first element of array.
 *
 * @param {any[]} arr
 * @returns
 */
function head(arr: any[]) {
  return _.head(arr)
}

/**
 * 
 *
 * @param {any[]} arr
 * @returns
 */
function initial(arr: any[]) {
  return _.initial(arr)
}

/**
 * Maybe not guarantee compatibility.
 * Wating to be tested.
 *
 * @param {*} arr
 * @returns
 */
function isArray(arr: any) {
  return Array.isArray(arr)
}

export const $ = ANY_PATTERN