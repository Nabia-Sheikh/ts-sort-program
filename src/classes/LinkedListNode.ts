// This is a Node class that will be used to create nodes in a linked list.
export default class Node {
  data: number // This variable will store the data of the node.
  next: Node | null // This variable will store the reference to the next node in the linked list.

  // The constructor method will be called when an object of this class is created.
  // It will set the value of the 'data' variable to the value passed as argument and the 'next' variable to null.
  constructor(data: number) {
    this.data = data
    this.next = null
  }
}
