var maximumAmount = function(coins) {
    const m = coins.length;
    const n = coins[0].length;

    const NEG = -Infinity;

    // dp[j][k] = maximum profit at current position
    // using k neutralizations
    const dp = Array.from({ length: n }, () => [NEG, NEG, NEG]);

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {

            const value = coins[i][j];
            const next = [NEG, NEG, NEG];

            // Starting cell
            if (i === 0 && j === 0) {
                next[0] = value;

                if (value < 0) {
                    next[1] = 0;
                }
            } else {

                // Get best states from top and left
                const sources = [];

                if (i > 0) {
                    sources.push(dp[j]);
                }

                if (j > 0) {
                    sources.push(dp[j - 1]);
                }

                for (const prev of sources) {
                    for (let k = 0; k <= 2; k++) {

                        if (prev[k] === NEG) continue;

                        // Don't neutralize
                        next[k] = Math.max(
                            next[k],
                            prev[k] + value
                        );

                        // Neutralize this robber
                        if (value < 0 && k < 2) {
                            next[k + 1] = Math.max(
                                next[k + 1],
                                prev[k]
                            );
                        }
                    }
                }
            }

            dp[j] = next;
        }
    }

    // We can use 0, 1, or 2 neutralizations
    return Math.max(
        dp[n - 1][0],
        dp[n - 1][1],
        dp[n - 1][2]
    );
};