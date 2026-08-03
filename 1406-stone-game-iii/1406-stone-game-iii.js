/**
 * @param {number[]} stoneValue
 * @return {string}
 */
var stoneGameIII = function(stoneValue) {
    const n = stoneValue.length;
    // dp[i] = the maximum score difference (current player - opponent)
    // achievable by the player whose turn it is, considering stones[i..n-1]
    const dp = new Array(n + 1).fill(0);

    // suffix sums not strictly needed since we track running sum via take
    for (let i = n - 1; i >= 0; i--) {
        let take = 0;
        let best = -Infinity;
        for (let k = 0; k < 3 && i + k < n; k++) {
            take += stoneValue[i + k];
            const diff = take - dp[i + k + 1];
            best = Math.max(best, diff);
        }
        dp[i] = best;
    }

    if (dp[0] > 0) return "Alice";
    if (dp[0] < 0) return "Bob";
    return "Tie";
};