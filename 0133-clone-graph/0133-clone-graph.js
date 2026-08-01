/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 */
var cloneGraph = function(node) {
    if (!node) return null;

    const visited = new Map(); // original node -> cloned node

    function dfs(curNode) {
        if (visited.has(curNode)) {
            return visited.get(curNode);
        }

        // Create clone (without neighbors yet) and mark visited immediately
        const clone = new Node(curNode.val);
        visited.set(curNode, clone);

        // Recurse for each neighbor and build the neighbor list
        for (const neighbor of curNode.neighbors) {
            clone.neighbors.push(dfs(neighbor));
        }

        return clone;
    }

    return dfs(node);
};