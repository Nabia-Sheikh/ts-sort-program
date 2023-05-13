// Importing the Sortable interface from "../interface/Sortable"
import { Sortable } from "../interface/Sortable"

// Importing the mergeSort function from "../utils/MergeSort"
import mergeSort from "../utils/MergeSort"

// Defining the NumberList class which implements the Sortable interface
export class NumberList implements Sortable {
  // Declaring the "numbers" array which holds the list of numbers
  numbers: number[]

  // Constructor function which sets the initial value of "numbers" array
  constructor(numbers: number[]) {
    this.numbers = numbers
  }

  // Implementation of the Sortable interface "sort" method to sort the "numbers" array
  sort(ascending: boolean = true, algo: string = "Quicksort"): void {
    // Filtering the "numbers" array to keep only numeric values and remove NaN values
    this.numbers = this.numbers.filter(
      (n) => typeof n === "number" && !isNaN(n)
    )

    // Sorting the "numbers" array based on the given "ascending" parameter and the algorithm specified by "algo"
    if (algo === "Quicksort") {
      this.numbers.sort((a, b) => (ascending ? a - b : b - a))
    } else if (algo === "Mergesort") {
      this.numbers = mergeSort(this.numbers, ascending)
    }
  }

  // Method to return a string representation of the "numbers" array
  toString(): string {
    return this.numbers.join(", ")
  }
}
