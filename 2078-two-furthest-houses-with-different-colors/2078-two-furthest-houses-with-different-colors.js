var maxDistance = function(colors) {
    const n = colors.length;
    let ans = 0;

    // Compare the first house with every other house
    for (let j = 1; j < n; j++) {
        if (colors[0] !== colors[j]) {
            ans = Math.max(ans, j);
        }
    }

    // Compare the last house with every other house
    for (let i = 0; i < n - 1; i++) {
        if (colors[i] !== colors[n - 1]) {
            ans = Math.max(ans, n - 1 - i);
        }
    }

    return ans;
};