import fs from "fs"

interface Sortable {
  sort(): void
}

class NumberList implements Sortable {
  numbers: number[]

  constructor(numbers: number[]) {
    this.numbers = numbers
  }

  sort(): void {
     this.numbers = this.numbers.filter(
       (n) => typeof n === "number" && !isNaN(n)
     )
    this.numbers.sort((a, b) => b - a)
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

function main(): void {
  const inputFile = "src/input.txt"
  const outputFile = "src/output.txt"
  const numberList = new FileNumberList(inputFile, outputFile)

  try {
    numberList.read()
    numberList.sort()
    numberList.write()
    console.log("Sorted numbers written to output.txt.")
  } catch (error: any) {
    console.log(error.message)
  }
}

main()
