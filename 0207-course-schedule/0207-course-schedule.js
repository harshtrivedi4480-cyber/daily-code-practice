/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
    // Build adjacency list and in-degree array
    const adj = Array.from({ length: numCourses }, () => []);
    const inDegree = new Array(numCourses).fill(0);

    for (const [course, prereq] of prerequisites) {
        // prereq -> course (prereq must be done before course)
        adj[prereq].push(course);
        inDegree[course]++;
    }

    // Start with all courses that have no prerequisites
    const queue = [];
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) queue.push(i);
    }

    let visitedCount = 0;

    while (queue.length) {
        const cur = queue.shift();
        visitedCount++;

        for (const next of adj[cur]) {
            inDegree[next]--;
            if (inDegree[next] === 0) {
                queue.push(next);
            }
        }
    }

    // If we visited all courses, there's no cycle
    return visitedCount === numCourses;
};