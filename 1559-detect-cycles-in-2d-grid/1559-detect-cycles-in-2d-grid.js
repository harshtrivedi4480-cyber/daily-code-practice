var containsCycle = function(grid) {
    const m = grid.length;
    const n = grid[0].length;

    const visited = Array.from(
        { length: m },
        () => Array(n).fill(false)
    );

    const directions = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1]
    ];

    function dfs(r, c, parentR, parentC) {
        visited[r][c] = true;

        for (const [dr, dc] of directions) {
            const nr = r + dr;
            const nc = c + dc;

            // Outside grid
            if (
                nr < 0 ||
                nr >= m ||
                nc < 0 ||
                nc >= n
            ) {
                continue;
            }

            // Must have same character
            if (grid[nr][nc] !== grid[r][c]) {
                continue;
            }

            // Don't go back to the cell we came from
            if (nr === parentR && nc === parentC) {
                continue;
            }

            // Visited same-value cell => cycle
            if (visited[nr][nc]) {
                return true;
            }

            if (dfs(nr, nc, r, c)) {
                return true;
            }
        }

        return false;
    }

    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            if (!visited[r][c]) {
                if (dfs(r, c, -1, -1)) {
                    return true;
                }
            }
        }
    }

    return false;
};