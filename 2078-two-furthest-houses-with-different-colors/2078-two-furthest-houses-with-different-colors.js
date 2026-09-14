var maxDistance = function(colors) {
    let n = colors.length;
    let maxDist = 0;

    // Find the farthest house from the first house
    for (let j = n - 1; j >= 0; j--) {
        if (colors[j] !== colors[0]) {
            maxDist = Math.max(maxDist, j);
            break;
        }
    }

    // Find the farthest house from the last house
    for (let i = 0; i < n; i++) {
        if (colors[i] !== colors[n - 1]) {
            maxDist = Math.max(maxDist, n - 1 - i);
            break;
        }
    }

    return maxDist;
};