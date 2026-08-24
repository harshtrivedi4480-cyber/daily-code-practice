/**
 * @param {number[]} stones
 * @return {number}
 */
var stoneGameVIII = function(stones) {
    const n = stones.length;

    // Prefix sum
    let sum = stones[0];

    for (let i = 1; i < n; i++) {
        sum += stones[i];
    }

    let best = sum;

    // Work backwards
    for (let i = n - 2; i >= 1; i--) {
        sum -= stones[i + 1];

        best = Math.max(best, sum - best);
    }

    return best;
};