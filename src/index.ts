import fs from "fs"
import readline from "readline"
import { NumberList } from "../src/classes/NumberList"
import Node from "../src/classes/LinkedListNode"

class FileNumberList extends NumberList {
  dataStructure: string = "Array"

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
      if (this.dataStructure === "Array") {
        fs.writeFileSync(this.outpfilePath, content)
      } else if (this.dataStructure === "LinkedList") {
        const head = new Node(this.numbers[0])
        let currentNode = head
        for (let i = 1; i < this.numbers.length; i++) {
          const newNode = new Node(this.numbers[i])
          currentNode.next = newNode
          currentNode = newNode
        }
        let current: Node | null = head
        let str = ""
        while (current !== null) {
          str += current.data.toString()
          current = current.next
          if (current !== null) {
            str += ", "
          }
        }
        fs.writeFileSync(this.outpfilePath, str)
      }
    } catch (error) {
      throw new Error(`Unable to write to ${this.outpfilePath}`)
    }
  }
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
                numberList.dataStructure = "Array"
                console.log("Array selected.")
              } else if (dataStructure === "2") {
                numberList.dataStructure = "LinkedList"
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
