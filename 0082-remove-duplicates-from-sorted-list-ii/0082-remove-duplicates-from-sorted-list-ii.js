/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
    // Dummy node simplifies handling the case where head itself is a duplicate
    const dummy = new ListNode(0, head);
    let prev = dummy; // last node known to be part of the final (distinct) list
    let curr = head;
    
    while (curr) {
        // Check if curr starts a run of duplicates
        if (curr.next && curr.val === curr.next.val) {
            // Skip all nodes with this same value
            const dupVal = curr.val;
            while (curr && curr.val === dupVal) {
                curr = curr.next;
            }
            // Reconnect prev directly to the node after the duplicate run
            prev.next = curr;
        } else {
            // curr is not a duplicate, move prev forward
            prev = curr;
            curr = curr.next;
        }
    }
    
    return dummy.next;
};