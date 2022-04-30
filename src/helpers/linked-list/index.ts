export class ListNode<T> {
  value: T;
  next: Nullable<ListNode<T>>;

  constructor(data: T) {
    this.value = data
    this.next = null
  }
}


export class LinkedList<T> {
  firstNode: ListNode<T>;
  head: ListNode<T>
  length: number
  tail: ListNode<T>

  constructor(values: T[]) {
    const value = values[0];
    this.firstNode = {
      value,
      next: null
    }

    this.head = this.firstNode;
    this.length = 1
    this.tail = this.head
    this.appendMany(values.slice(1, values.length))
  }

  private appendMany(values: T[]): void {
    for (const value of values) {
      this.append(value)
    }
  }

  private append(value: T) {
    if (!this.firstNode) {
      this.initList(value)
      return;
    }
    const newNode = new ListNode(value);
    this.tail.next = newNode;
    this.tail = newNode
    this.length++
  }

  private initList(value: T) {
    this.firstNode = {
      value,
      next: null
    };
    this.head = this.firstNode;
    this.length = 1;
    this.tail = this.head;
  }
}
