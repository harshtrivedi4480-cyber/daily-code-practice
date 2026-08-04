function numberOfStableArrays(zero, one, limit) {
    const MOD = 1000000007;
    
    // dp0[i][j] = number of ways using i zeros, j ones, array ends with a 0 (all runs <= limit)
    // dp1[i][j] = same but ends with a 1
    // P0[i][j] = prefix sum of dp0[i][0..j] (prefix along j, fixed i)
    // P1[i][j] = prefix sum of dp1[0..i][j] (prefix along i, fixed j)
    
    const dp0 = Array.from({length: zero + 1}, () => new Array(one + 1).fill(0));
    const dp1 = Array.from({length: zero + 1}, () => new Array(one + 1).fill(0));
    const P0 = Array.from({length: zero + 1}, () => new Array(one + 1).fill(0));
    const P1 = Array.from({length: zero + 1}, () => new Array(one + 1).fill(0));
    
    for (let i = 0; i <= zero; i++) {
        for (let j = 0; j <= one; j++) {
            if (i === 0 && j === 0) continue; // empty array, skip
            
            // Compute dp0[i][j]: array ends with a run of 0s
            if (i > 0) {
                const K = Math.min(limit, i);
                const upperIdx = i - 1;               // P1[i-1][j]
                const lowerIdx = i - 1 - K;            // subtract P1[lowerIdx][j] if valid
                let s = P1[upperIdx][j];
                if (lowerIdx >= 0) s -= P1[lowerIdx][j];
                let base = (i <= limit && j === 0) ? 1 : 0;
                dp0[i][j] = ((s + base) % MOD + MOD) % MOD;
            }
            
            // Compute dp1[i][j]: array ends with a run of 1s
            if (j > 0) {
                const K = Math.min(limit, j);
                const upperIdx = j - 1;                // P0[i][j-1]
                const lowerIdx = j - 1 - K;
                let s = P0[i][upperIdx];
                if (lowerIdx >= 0) s -= P0[i][lowerIdx];
                let base = (j <= limit && i === 0) ? 1 : 0;
                dp1[i][j] = ((s + base) % MOD + MOD) % MOD;
            }
            
            // Update prefix sums
            P0[i][j] = ((j > 0 ? P0[i][j-1] : 0) + dp0[i][j]) % MOD;
            P1[i][j] = ((i > 0 ? P1[i-1][j] : 0) + dp1[i][j]) % MOD;
        }
    }
    
    return (dp0[zero][one] + dp1[zero][one]) % MOD;
}