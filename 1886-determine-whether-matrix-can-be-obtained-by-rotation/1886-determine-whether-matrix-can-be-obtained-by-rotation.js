var findRotation = function(mat, target) {
    const n = mat.length;

    for (let rotation = 0; rotation < 4; rotation++) {
        let same = true;

        // Compare mat with target
        for (let i = 0; i < n && same; i++) {
            for (let j = 0; j < n; j++) {
                if (mat[i][j] !== target[i][j]) {
                    same = false;
                    break;
                }
            }
        }

        if (same) {
            return true;
        }

        // Rotate 90 degrees clockwise
        const rotated = Array.from({ length: n }, () => Array(n));

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                rotated[j][n - 1 - i] = mat[i][j];
            }
        }

        mat = rotated;
    }

    return false;
};