var countSubmatrices = function(grid, k) {
    const m = grid.length;
    const n = grid[0].length;

    // prefix[i][j] = sum of rectangle
    // from (0,0) to (i-1,j-1)
    const prefix = Array.from(
        { length: m + 1 },
        () => new Array(n + 1).fill(0)
    );

    let ans = 0;

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {

            prefix[i][j] =
                grid[i - 1][j - 1]
                + prefix[i - 1][j]
                + prefix[i][j - 1]
                - prefix[i - 1][j - 1];

            // This prefix sum represents the submatrix
            // from (0,0) to (i-1,j-1)
            if (prefix[i][j] <= k) {
                ans++;
            }
        }
    }

    return ans;
};