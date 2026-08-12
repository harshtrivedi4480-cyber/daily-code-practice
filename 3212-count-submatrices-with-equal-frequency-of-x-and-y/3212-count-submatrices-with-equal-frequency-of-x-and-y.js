var numberOfSubmatrices = function(grid) {
    const m = grid.length;
    const n = grid[0].length;

    const xPrefix = Array.from(
        { length: m + 1 },
        () => new Array(n + 1).fill(0)
    );

    const yPrefix = Array.from(
        { length: m + 1 },
        () => new Array(n + 1).fill(0)
    );

    let ans = 0;

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {

            const isX = grid[i - 1][j - 1] === 'X' ? 1 : 0;
            const isY = grid[i - 1][j - 1] === 'Y' ? 1 : 0;

            xPrefix[i][j] =
                isX +
                xPrefix[i - 1][j] +
                xPrefix[i][j - 1] -
                xPrefix[i - 1][j - 1];

            yPrefix[i][j] =
                isY +
                yPrefix[i - 1][j] +
                yPrefix[i][j - 1] -
                yPrefix[i - 1][j - 1];

            // Equal X and Y
            // AND at least one X
            if (
                xPrefix[i][j] === yPrefix[i][j] &&
                xPrefix[i][j] > 0
            ) {
                ans++;
            }
        }
    }

    return ans;
};