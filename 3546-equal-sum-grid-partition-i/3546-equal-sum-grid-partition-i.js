var canPartitionGrid = function(grid) {
    const m = grid.length;
    const n = grid[0].length;

    let total = 0;

    // Calculate total sum
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            total += grid[i][j];
        }
    }

    // If total is odd, it cannot be split equally.
    if (total % 2 !== 0) {
        return false;
    }

    const target = total / 2;

    // Check horizontal cuts
    let topSum = 0;

    for (let i = 0; i < m - 1; i++) {
        for (let j = 0; j < n; j++) {
            topSum += grid[i][j];
        }

        if (topSum === target) {
            return true;
        }
    }

    // Check vertical cuts
    let leftSum = 0;

    for (let j = 0; j < n - 1; j++) {
        for (let i = 0; i < m; i++) {
            leftSum += grid[i][j];
        }

        if (leftSum === target) {
            return true;
        }
    }

    return false;
};