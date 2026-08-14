var minAbsDiff = function(grid, k) {
    const m = grid.length;
    const n = grid[0].length;

    const rows = m - k + 1;
    const cols = n - k + 1;

    let ans = Array.from({ length: rows }, () => Array(cols).fill(0));

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {

            // Store distinct values
            let set = new Set();

            for (let r = i; r < i + k; r++) {
                for (let c = j; c < j + k; c++) {
                    set.add(grid[r][c]);
                }
            }

            // Only one distinct value
            if (set.size <= 1) {
                ans[i][j] = 0;
                continue;
            }

            // Sort distinct values
            let values = [...set].sort((a, b) => a - b);

            let minDiff = Infinity;

            // Minimum difference will always be
            // between adjacent elements after sorting
            for (let x = 1; x < values.length; x++) {
                minDiff = Math.min(
                    minDiff,
                    values[x] - values[x - 1]
                );
            }

            ans[i][j] = minDiff;
        }
    }

    return ans;
};