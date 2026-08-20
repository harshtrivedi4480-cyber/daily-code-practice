var canPartitionGrid = function(grid) {
    const m = grid.length;
    const n = grid[0].length;

    let total = 0;

    // Total sum
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            total += grid[i][j];
        }
    }

    // Equal partition possible only if total is even
    if (total % 2 !== 0) {
        return false;
    }

    const target = total / 2;

    // Check horizontal cuts
    let sum = 0;

    for (let i = 0; i < m - 1; i++) {
        for (let j = 0; j < n; j++) {
            sum += grid[i][j];
        }

        if (sum === target) {
            return true;
        }
    }

    // Check vertical cuts
    sum = 0;

    for (let j = 0; j < n - 1; j++) {
        for (let i = 0; i < m; i++) {
            sum += grid[i][j];
        }

        if (sum === target) {
            return true;
        }
    }

    return false;
};