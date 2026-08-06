var numberOfStableArrays = function(zero, one, limit) {
    const MOD = 1000000007;
    const Z = zero, O = one;

    // dp0[i][j]: arrays with i zeros, j ones, ending in 0
    // dp1[i][j]: arrays with i zeros, j ones, ending in 1
    // S1[i][j]: prefix sum of dp1[0..i][j] over the i dimension
    const dp0 = Array.from({ length: Z + 1 }, () => new Array(O + 1).fill(0));
    const dp1 = Array.from({ length: Z + 1 }, () => new Array(O + 1).fill(0));
    const S1  = Array.from({ length: Z + 1 }, () => new Array(O + 1).fill(0));

    for (let i = 0; i <= Z; i++) {
        // --- compute dp0[i][*] using S1 (previous rows) ---
        for (let j = 0; j <= O; j++) {
            if (j === 0) {
                dp0[i][j] = (i >= 1 && i <= limit) ? 1 : 0;
            } else if (i === 0) {
                dp0[i][j] = 0;
            } else {
                const hi = i - 1;
                const loIdx = Math.max(0, i - limit) - 1;
                const hiSum = S1[hi][j];
                const loSum = loIdx >= 0 ? S1[loIdx][j] : 0;
                dp0[i][j] = ((hiSum - loSum) % MOD + MOD) % MOD;
            }
        }

        // --- prefix sum of dp0 within current row (for dp1 computation) ---
        const S0row = new Array(O + 1).fill(0);
        S0row[0] = dp0[i][0];
        for (let j = 1; j <= O; j++) {
            S0row[j] = (S0row[j - 1] + dp0[i][j]) % MOD;
        }

        // --- compute dp1[i][*] using S0row (same row) ---
        for (let j = 0; j <= O; j++) {
            if (i === 0) {
                dp1[i][j] = (j >= 1 && j <= limit) ? 1 : 0;
            } else if (j === 0) {
                dp1[i][j] = 0;
            } else {
                const hi = j - 1;
                const loIdx = Math.max(0, j - limit) - 1;
                const hiSum = S0row[hi];
                const loSum = loIdx >= 0 ? S0row[loIdx] : 0;
                dp1[i][j] = ((hiSum - loSum) % MOD + MOD) % MOD;
            }
        }

        // --- update S1 row i (prefix sum over i dimension) ---
        for (let j = 0; j <= O; j++) {
            const prev = i > 0 ? S1[i - 1][j] : 0;
            S1[i][j] = (prev + dp1[i][j]) % MOD;
        }
    }

    return ((dp0[Z][O] + dp1[Z][O]) % MOD + MOD) % MOD;
};