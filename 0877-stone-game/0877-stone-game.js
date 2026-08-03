/**
 * @param {number[]} piles
 * @return {boolean}
 */
var stoneGame = function(piles) {
    const n = piles.length;
    // dp[i][j] = the maximum score difference (current player's score - opponent's score)
    // that the current player can achieve when playing optimally on piles[i..j]
    const dp = Array.from({ length: n }, () => new Array(n).fill(0));

    for (let i = 0; i < n; i++) {
        dp[i][i] = piles[i];
    }

    for (let len = 2; len <= n; len++) {
        for (let i = 0; i + len - 1 < n; i++) {
            const j = i + len - 1;
            dp[i][j] = Math.max(
                piles[i] - dp[i + 1][j],
                piles[j] - dp[i][j - 1]
            );
        }
    }

    return dp[0][n - 1] > 0;
};