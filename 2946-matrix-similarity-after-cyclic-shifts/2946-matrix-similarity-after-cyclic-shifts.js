var areSimilar = function(mat, k) {
    const m = mat.length;
    const n = mat[0].length;

    k = k % n;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            let shiftedIndex;

            if (i % 2 === 0) {
                // Even row -> left shift
                shiftedIndex = (j + k) % n;
            } else {
                // Odd row -> right shift
                shiftedIndex = (j - k + n) % n;
            }

            if (mat[i][j] !== mat[i][shiftedIndex]) {
                return false;
            }
        }
    }

    return true;
};