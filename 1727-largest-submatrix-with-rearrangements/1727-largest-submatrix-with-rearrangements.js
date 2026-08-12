var largestSubmatrix = function(matrix) {
    const m = matrix.length;
    const n = matrix[0].length;

    let heights = new Array(n).fill(0);
    let maxArea = 0;

    for (let i = 0; i < m; i++) {

        // Calculate consecutive 1 heights
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === 1) {
                heights[j]++;
            } else {
                heights[j] = 0;
            }
        }

        // Copy and sort heights in descending order
        const sorted = [...heights].sort((a, b) => b - a);

        // Calculate maximum area
        for (let j = 0; j < n; j++) {
            const width = j + 1;
            const height = sorted[j];

            maxArea = Math.max(
                maxArea,
                width * height
            );
        }
    }

    return maxArea;
};