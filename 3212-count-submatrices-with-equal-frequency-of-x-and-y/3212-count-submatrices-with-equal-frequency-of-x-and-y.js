var numberOfSubmatrices = function(grid) {
    const m = grid.length;
    const n = grid[0].length;

    const x = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    const y = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

    let ans = 0;

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {

            x[i][j] =
                x[i - 1][j] +
                x[i][j - 1] -
                x[i - 1][j - 1] +
                (grid[i - 1][j - 1] === 'X' ? 1 : 0);

            y[i][j] =
                y[i - 1][j] +
                y[i][j - 1] -
                y[i - 1][j - 1] +
                (grid[i - 1][j - 1] === 'Y' ? 1 : 0);

            // Equal X and Y
            // At least one X
            if (x[i][j] === y[i][j] && x[i][j] > 0) {
                ans++;
            }
        }
    }

    return ans;
};