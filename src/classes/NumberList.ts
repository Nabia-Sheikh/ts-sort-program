import { Sortable } from "../interface/Sortable"
import mergeSort from "../utils/MergeSort"

export class NumberList implements Sortable {
  numbers: number[]

  constructor(numbers: number[]) {
    this.numbers = numbers
  }

  sort(ascending: boolean = true, algo: string = "Quicksort"): void {
    this.numbers = this.numbers.filter(
      (n) => typeof n === "number" && !isNaN(n)
    )

    if (algo === "Quicksort") {
      this.numbers.sort((a, b) => (ascending ? a - b : b - a))
    } else if (algo === "Mergesort") {
      this.numbers = mergeSort(this.numbers, ascending)
    }
  }

  toString(): string {
    return this.numbers.join(", ")
  }
}
