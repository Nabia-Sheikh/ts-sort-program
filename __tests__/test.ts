import { performance } from "perf_hooks"
import { NumberList } from "../src/classes/NumberList"

function randomIntsArray(n: number, min: number, max: number): number[] {
  return Array.from({ length: n }, () =>
    Math.floor(Math.random() * (max - min + 1) + min)
  )
}

const n = 1000000 // number of integers to generate
const min = 0 // minimum integer value
const max = 1000000 // maximum integer value

const numbers = randomIntsArray(n, min, max)
const numberList = new NumberList(numbers)

const t0 = performance.now()
numberList.sort(true, "Quicksort")
const t1 = performance.now()

console.log(`Sorted ${n} integers in ${t1 - t0} milliseconds.`)
