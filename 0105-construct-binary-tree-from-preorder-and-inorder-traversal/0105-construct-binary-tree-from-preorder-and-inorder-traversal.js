/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
    const indexMap = new Map();
    for (let i = 0; i < inorder.length; i++) {
        indexMap.set(inorder[i], i);
    }

    let preIndex = 0;

    function build(inLeft, inRight) {
        if (inLeft > inRight) return null;

        const rootVal = preorder[preIndex];
        preIndex++;

        const root = new TreeNode(rootVal);

        const mid = indexMap.get(rootVal);

        // Build left subtree first (matches preorder: root, left, right)
        root.left = build(inLeft, mid - 1);
        root.right = build(mid + 1, inRight);

        return root;
    }

    return build(0, inorder.length - 1);
};

function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}