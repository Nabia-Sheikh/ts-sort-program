// Import required libraries
import fs from "fs" // for reading/writing files
import readline from "readline" // for user input
import { NumberList } from "../src/classes/NumberList" // custom class
import Node from "../src/classes/LinkedListNode" // custom class

// Create a new custom class that extends the NumberList class
class FileNumberList extends NumberList {
  // Define a property to hold the data structure being used
  dataStructure: string = "Array"

  // Define a constructor that takes in the input/output file paths
  constructor(private inpfilePath: string, private outpfilePath: string) {
    super([]) // Call the parent class constructor with an empty array
  }

  // Define a method to read numbers from a file and store them in the number list
  read(): void {
    try {
      // Read the contents of the input file
      const fileContent: string = fs.readFileSync(this.inpfilePath, "utf-8")
      // Split the file content into an array of numbers
      const numbers: number[] = fileContent.split(", ").map(Number)
      // Store the numbers in the number list
      this.numbers = numbers
    } catch (error) {
      // Throw an error if the input file does not exist
      throw new Error(
        `File ${this.inpfilePath} does not exist. Check your file path and try again. Make sure it is in the root directory`
      )
    }
  }

  // Define a method to write the sorted numbers to a file
  write(): void {
    try {
      const content: string = this.toString()
      if (this.dataStructure === "Array") {
        // If using an array, write the string to the output file
        fs.writeFileSync(this.outpfilePath, content)
      } else if (this.dataStructure === "LinkedList") {
        // If using a linked list, write each node's data to the output file
        // Create a new node for the first number
        const head = new Node(this.numbers[0])
        let currentNode = head
        // Create a new node for each subsequent number and link it to the previous node
        for (let i = 1; i < this.numbers.length; i++) {
          const newNode = new Node(this.numbers[i])
          currentNode.next = newNode
          currentNode = newNode
        }
        // Traverse the linked list and concatenate the data into a string with commas
        let current: Node | null = head
        let str = ""
        while (current !== null) {
          str += current.data.toString()
          current = current.next
          if (current !== null) {
            str += ", "
          }
        }
        // Write the string to the output file
        fs.writeFileSync(this.outpfilePath, str)
      }
    } catch (error) {
      // Throw an error if there is a problem writing to the output file
      throw new Error(`Unable to write to ${this.outpfilePath}`)
    }
  }
}

// Define the main function that runs the program
function main(): void {
  // Create a new readline interface for user input
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  // Ask the user for the input file name
  rl.question("Enter input file name: ", (inputFile) => {
    // Ask the user for the output file name
    rl.question("Enter output file name: ", (outputFile) => {
      // Ask the user for the sort order (ascending or descending)
      rl.question("Enter sort order (asc/desc): ", (sortOrder) => {
        const numberList = new FileNumberList(inputFile, outputFile)
        try {
          // Read the numbers from the input file
          numberList.read()

          // Determine the sort order
          const ascending = sortOrder === "asc"

          // Prompt the user to choose a sorting algorithm
          console.log("Choose a sorting algorithm:")
          console.log("1. Quick sort")
          console.log("2. Merge sort")

          // Ask the user for the sorting algorithm to use
          rl.question("Enter sorting algorithm (1/2): ", (sortingAlgorithm) => {
            if (sortingAlgorithm === "1") {
              // Sort the numbers using quicksort
              numberList.sort(ascending, "Quicksort")
              console.log("Quick sort selected.")
            } else if (sortingAlgorithm === "2") {
              // Sort the numbers using mergesort
              numberList.sort(ascending, "Mergesort")
              console.log("Merge sort selected.")
            } else {
              throw new Error(
                "Invalid sorting algorithm specified. Must be 1 or 2"
              )
            }

            // Prompt the user to choose a data structure
            console.log("Choose a data structure:")
            console.log("1. Array")
            console.log("2. Linked list")

            // Ask the user for the data structure to use
            rl.question("Enter data structure (1/2): ", (dataStructure) => {
              if (dataStructure === "1") {
                // Use an array to store the sorted numbers
                numberList.dataStructure = "Array"
                console.log("Array selected.")
              } else if (dataStructure === "2") {
                // Use a linked list to store the sorted numbers
                numberList.dataStructure = "LinkedList"
                console.log("Linked list selected.")
              } else {
                throw new Error(
                  "Invalid data structure specified. Must be 1 or 2"
                )
              }

              // Write the sorted numbers to the output file
              numberList.write()
              console.log("Sorted numbers written to your output file")

              // Close the readline interface
              rl.close()
            })
          })
        } catch (error: any) {
          console.log(error.message)
          // Close the readline interface
          rl.close()
        }
      })
    })
  })
}

// Call the main function to start the program
main()
