var countSubmatrices = function(grid, k) {
    const m = grid.length;
    const n = grid[0].length;

    let ans = 0;

    // prefix[j] = current row tak column j ka sum
    let prefix = new Array(n).fill(0);

    for (let i = 0; i < m; i++) {
        let rowSum = 0;

        for (let j = 0; j < n; j++) {
            rowSum += grid[i][j];

            // Total sum from (0,0) to (i,j)
            prefix[j] += rowSum;

            if (prefix[j] <= k) {
                ans++;
            }
        }
    }

    return ans;
};