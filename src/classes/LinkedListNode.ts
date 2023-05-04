export default class Node {
  data: number
  next: Node | null

  constructor(data: number) {
    this.data = data
    this.next = null
  }
}
