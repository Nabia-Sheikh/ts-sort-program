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

export default mergeSort
