var maxProductPath = function(grid) {
    const MOD = 1000000007;

    const m = grid.length;
    const n = grid[0].length;

    // maxDP[i][j] = maximum product reaching (i, j)
    // minDP[i][j] = minimum product reaching (i, j)
    const maxDP = Array.from({ length: m }, () => Array(n));
    const minDP = Array.from({ length: m }, () => Array(n));

    maxDP[0][0] = grid[0][0];
    minDP[0][0] = grid[0][0];

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i === 0 && j === 0) continue;

            const value = grid[i][j];

            let maxPrev = -Infinity;
            let minPrev = Infinity;

            // From top
            if (i > 0) {
                maxPrev = Math.max(maxPrev, maxDP[i - 1][j]);
                minPrev = Math.min(minPrev, minDP[i - 1][j]);
            }

            // From left
            if (j > 0) {
                maxPrev = Math.max(maxPrev, maxDP[i][j - 1]);
                minPrev = Math.min(minPrev, minDP[i][j - 1]);
            }

            // Multiplying both min and max by the current value
            // gives all possibilities we need.
            const candidates = [
                maxPrev * value,
                minPrev * value
            ];

            maxDP[i][j] = Math.max(...candidates);
            minDP[i][j] = Math.min(...candidates);
        }
    }

    const result = maxDP[m - 1][n - 1];

    if (result < 0) {
        return -1;
    }

    return result % MOD;
};