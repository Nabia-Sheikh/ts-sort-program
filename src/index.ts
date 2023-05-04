import fs from "fs"
import readline from "readline"

interface Sortable {
  sort(): void
}

class NumberList implements Sortable {
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

class FileNumberList extends NumberList {
  constructor(private inpfilePath: string, private outpfilePath: string) {
    super([])
  }

  read(): void {
    try {
      const fileContent: string = fs.readFileSync(this.inpfilePath, "utf-8")
      const numbers: number[] = fileContent.split(", ").map(Number)
      this.numbers = numbers
    } catch (error) {
      throw new Error(
        `File ${this.inpfilePath} does not exist. Check your file path and try again. Make sure it is in the root directory`
      )
    }
  }

  write(): void {
    try {
      const content: string = this.toString()
      fs.writeFileSync(this.outpfilePath, content)
    } catch (error) {
      throw new Error(`Unable to write to ${this.outpfilePath}`)
    }
  }
}

function mergeSort(arr: number[], ascending: boolean = true): number[] {
  if (arr.length <= 1) {
    return arr
  }

  const middle = Math.floor(arr.length / 2)
  const left = arr.slice(0, middle)
  const right = arr.slice(middle)

  return merge(
    mergeSort(left, ascending),
    mergeSort(right, ascending),
    ascending
  )
}

function merge(
  left: number[],
  right: number[],
  ascending: boolean = true
): number[] {
  let result: number[] = []
  let leftIndex = 0
  let rightIndex = 0

  while (leftIndex < left.length && rightIndex < right.length) {
    if (
      (ascending && left[leftIndex] < right[rightIndex]) ||
      (!ascending && left[leftIndex] > right[rightIndex])
    ) {
      result.push(left[leftIndex])
      leftIndex++
    } else {
      result.push(right[rightIndex])
      rightIndex++
    }
  }

  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex))
}

function main(): void {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  rl.question("Enter input file name: ", (inputFile) => {
    rl.question("Enter output file name: ", (outputFile) => {
      rl.question("Enter sort order (asc/desc): ", (sortOrder) => {
        const numberList = new FileNumberList(inputFile, outputFile)

        try {
          numberList.read()

          const ascending = sortOrder === "asc"

          console.log("Choose a sorting algorithm:")
          console.log("1. Quick sort")
          console.log("2. Merge sort")

          rl.question("Enter sorting algorithm (1/2): ", (sortingAlgorithm) => {
            if (sortingAlgorithm === "1") {
              numberList.sort(ascending, "Quicksort")
              console.log("Quick sort selected.")
            } else if (sortingAlgorithm === "2") {
              numberList.sort(ascending, "Mergesort")
              console.log("Merge sort selected.")
            } else {
              throw new Error(
                "Invalid sorting algorithm specified. Must be 1 or 2"
              )
            }

            console.log("Choose a data structure:")
            console.log("1. Array")
            console.log("2. Linked list")

            rl.question("Enter data structure (1/2): ", (dataStructure) => {
              if (dataStructure === "1") {
                console.log("Array selected.")
              } else if (dataStructure === "2") {
                console.log("Linked list selected.")
              } else {
                throw new Error(
                  "Invalid data structure specified. Must be 1 or 2"
                )
              }

              numberList.write()
              console.log("Sorted numbers written to output.txt.")
              rl.close()
            })
          })
        } catch (error: any) {
          console.log(error.message)
          rl.close()
        }
      })
    })
  })
}

main()
