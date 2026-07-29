/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function(head, k) {
    if (!head || !head.next || k === 0) {
        return head;
    }
    
    // Step 1: Find the length of the list and the tail node
    let length = 1;
    let tail = head;
    while (tail.next) {
        tail = tail.next;
        length++;
    }
    
    // Step 2: Normalize k (rotating by 'length' brings list back to original)
    k = k % length;
    if (k === 0) {
        return head; // no rotation needed
    }
    
    // Step 3: Connect tail to head, forming a cycle
    tail.next = head;
    
    // Step 4: Find the new tail, which is (length - k - 1) steps from old head
    let stepsToNewTail = length - k;
    let newTail = head;
    for (let i = 1; i < stepsToNewTail; i++) {
        newTail = newTail.next;
    }
    
    // Step 5: New head is right after new tail; break the cycle
    let newHead = newTail.next;
    newTail.next = null;
    
    return newHead;
};