var getBiggestThree = function(grid) {
    const m = grid.length;
    const n = grid[0].length;

    const downLeft = Array.from(
        { length: m + 1 },
        () => new Array(n + 1).fill(0)
    );

    const downRight = Array.from(
        { length: m + 1 },
        () => new Array(n + 1).fill(0)
    );

    // Build diagonal sums
    for (let i = m - 1; i >= 0; i--) {
        for (let j = 0; j < n; j++) {
            downLeft[i][j] =
                grid[i][j] +
                (i + 1 < m && j - 1 >= 0
                    ? downLeft[i + 1][j - 1]
                    : 0);

            downRight[i][j] =
                grid[i][j] +
                (i + 1 < m && j + 1 < n
                    ? downRight[i + 1][j + 1]
                    : 0);
        }
    }

    const sums = new Set();

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {

            // Size 0 rhombus
            sums.add(grid[i][j]);

            for (let k = 1; i + 2 * k < m; k++) {

                // Left and right corners must be inside grid
                if (j - k < 0 || j + k >= n) {
                    break;
                }

                const leftRow = i + k;
                const leftCol = j - k;

                const rightRow = i + k;
                const rightCol = j + k;

                const bottomRow = i + 2 * k;
                const bottomCol = j;

                // Top -> Left
                const topLeft =
                    downLeft[i][j]
                    - downLeft[leftRow][leftCol]
                    + grid[leftRow][leftCol];

                // Top -> Right
                const topRight =
                    downRight[i][j]
                    - downRight[rightRow][rightCol]
                    + grid[rightRow][rightCol];

                // Left -> Bottom
                const leftBottom =
                    downRight[leftRow][leftCol]
                    - downRight[bottomRow][bottomCol]
                    + grid[bottomRow][bottomCol];

                // Right -> Bottom
                const rightBottom =
                    downLeft[rightRow][rightCol]
                    - downLeft[bottomRow][bottomCol]
                    + grid[bottomRow][bottomCol];

                /*
                    Four corners are counted twice,
                    so subtract them once.
                */
                const sum =
                    topLeft +
                    topRight +
                    leftBottom +
                    rightBottom
                    - grid[i][j]
                    - grid[leftRow][leftCol]
                    - grid[rightRow][rightCol]
                    - grid[bottomRow][bottomCol];

                sums.add(sum);
            }
        }
    }

    return [...sums]
        .sort((a, b) => b - a)
        .slice(0, 3);
};