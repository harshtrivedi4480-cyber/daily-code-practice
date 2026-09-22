var hasValidPath = function(grid) {
    const m = grid.length;
    const n = grid[0].length;

    // Directions:
    // 0 = left
    // 1 = right
    // 2 = up
    // 3 = down

    // For each street type, define which directions it connects to.
    const directions = {
        1: [0, 1], // left, right
        2: [2, 3], // up, down
        3: [0, 3], // left, down
        4: [1, 3], // right, down
        5: [0, 2], // left, up
        6: [1, 2]  // right, up
    };

    // Movement offsets
    const dr = [0, 0, -1, 1];
    const dc = [-1, 1, 0, 0];

    const visited = Array.from(
        { length: m },
        () => Array(n).fill(false)
    );

    const queue = [[0, 0]];
    visited[0][0] = true;

    let index = 0;

    while (index < queue.length) {
        const [r, c] = queue[index++];

        // Destination reached
        if (r === m - 1 && c === n - 1) {
            return true;
        }

        const currentType = grid[r][c];

        for (const dir of directions[currentType]) {
            const nr = r + dr[dir];
            const nc = c + dc[dir];

            // Outside grid
            if (
                nr < 0 ||
                nr >= m ||
                nc < 0 ||
                nc >= n
            ) {
                continue;
            }

            if (visited[nr][nc]) {
                continue;
            }

            const nextType = grid[nr][nc];

            // Opposite direction
            const opposite = [1, 0, 3, 2][dir];

            // Check whether next street connects back to current street
            if (directions[nextType].includes(opposite)) {
                visited[nr][nc] = true;
                queue.push([nr, nc]);
            }
        }
    }

    return false;
};