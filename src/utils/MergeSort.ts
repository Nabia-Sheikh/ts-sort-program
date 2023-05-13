// This function implements the merge sort algorithm to sort an array of numbers
// It accepts two parameters, an array to be sorted and a boolean indicating whether to sort in ascending (true) or descending (false) order
// It returns a sorted array of numbers
function mergeSort(arr: number[], ascending: boolean = true): number[] {
  if (arr.length <= 1) {
    // Base case: array is already sorted if it has only one element
    return arr
  }

  const middle = Math.floor(arr.length / 2) // Split the array into two halves
  const left = arr.slice(0, middle) // Left half of the array
  const right = arr.slice(middle) // Right half of the array

  return merge(
    mergeSort(left, ascending), // Recursively sort the left half of the array
    mergeSort(right, ascending), // Recursively sort the right half of the array
    ascending // Specify the sort order
  )
}

// This function merges two sorted arrays into a single sorted array
// It accepts three parameters, the left and right arrays to be merged and a boolean indicating whether to sort in ascending (true) or descending (false) order
// It returns a merged and sorted array
function merge(
  left: number[],
  right: number[],
  ascending: boolean = true
): number[] {
  let result: number[] = []
  let leftIndex = 0
  let rightIndex = 0

  // Compare elements of both arrays and add the smaller one to the result array
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

  // Add remaining elements to the result array
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex))
}

// Export the mergeSort function as the default export of this module
export default mergeSort
