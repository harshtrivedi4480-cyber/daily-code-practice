var numberOfSubmatrices = function(grid) {
    const m = grid.length;
    const n = grid[0].length;

    let ans = 0;

    // balance[j] = X count - Y count
    // xCount[j] = X count
    let balance = new Array(n).fill(0);
    let xCount = new Array(n).fill(0);

    for (let i = 0; i < m; i++) {
        let rowBalance = 0;
        let rowX = 0;

        for (let j = 0; j < n; j++) {

            if (grid[i][j] === 'X') {
                rowBalance++;
                rowX++;
            } else if (grid[i][j] === 'Y') {
                rowBalance--;
            }

            balance[j] += rowBalance;
            xCount[j] += rowX;

            // Equal X and Y + at least one X
            if (balance[j] === 0 && xCount[j] > 0) {
                ans++;
            }
        }
    }

    return ans;
};