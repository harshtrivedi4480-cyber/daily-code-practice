/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function(numCourses, prerequisites) {
    // Build adjacency list and in-degree array
    const adj = Array.from({ length: numCourses }, () => []);
    const inDegree = new Array(numCourses).fill(0);

    for (const [course, prereq] of prerequisites) {
        // prereq -> course (prereq must be completed before course)
        adj[prereq].push(course);
        inDegree[course]++;
    }

    // Start with all courses that have no prerequisites
    const queue = [];
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) queue.push(i);
    }

    const order = [];

    while (queue.length) {
        const cur = queue.shift();
        order.push(cur);

        for (const next of adj[cur]) {
            inDegree[next]--;
            if (inDegree[next] === 0) {
                queue.push(next);
            }
        }
    }

    // If we managed to order all courses, no cycle exists
    return order.length === numCourses ? order : [];
};