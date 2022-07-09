type ListNodeType<T> = {
  value: T
  next: Nullable<ListNodeType<T>>
}

export class ListNode<T> {
  value: T

  next: Nullable<ListNodeType<T>>

  constructor(data: T) {
    this.value = data
    this.next = null
  }
}
