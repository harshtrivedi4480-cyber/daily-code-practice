var largestSubmatrix = function(matrix) {
    const m = matrix.length;
    const n = matrix[0].length;

    let height = new Array(n).fill(0);
    let ans = 0;

    for (let i = 0; i < m; i++) {

        // Update heights
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === 1) {
                height[j]++;
            } else {
                height[j] = 0;
            }
        }

        // Sort heights in descending order
        let arr = [...height].sort((a, b) => b - a);

        // Calculate maximum area
        for (let j = 0; j < n; j++) {
            let width = j + 1;
            ans = Math.max(ans, arr[j] * width);
        }
    }

    return ans;
};