var minAbsDiff = function(grid, k) {
    const m = grid.length;
    const n = grid[0].length;

    const ans = [];

    for (let i = 0; i <= m - k; i++) {
        const row = [];

        for (let j = 0; j <= n - k; j++) {
            const values = new Set();

            // Collect distinct values from k x k window
            for (let x = i; x < i + k; x++) {
                for (let y = j; y < j + k; y++) {
                    values.add(grid[x][y]);
                }
            }

            // Only one distinct value
            if (values.size <= 1) {
                row.push(0);
                continue;
            }

            const sorted = Array.from(values).sort((a, b) => a - b);

            let minDiff = Infinity;

            // Minimum difference must be between adjacent
            // values after sorting.
            for (let p = 1; p < sorted.length; p++) {
                minDiff = Math.min(
                    minDiff,
                    sorted[p] - sorted[p - 1]
                );

                if (minDiff === 0) break;
            }

            row.push(minDiff);
        }

        ans.push(row);
    }

    return ans;
};