var maxPalindromes = function(s, k) {
    const n = s.length;

    // pal[l][r] = whether s[l...r] is a palindrome
    const pal = Array.from({ length: n }, () => new Uint8Array(n));

    // Build palindrome table
    for (let len = 1; len <= n; len++) {
        for (let l = 0; l + len <= n; l++) {
            const r = l + len - 1;

            if (
                s[l] === s[r] &&
                (len <= 2 || pal[l + 1][r - 1])
            ) {
                pal[l][r] = 1;
            }
        }
    }

    // dp[i] = maximum number of valid substrings
    // in s[0 ... i-1]
    const dp = new Int32Array(n + 1);

    for (let i = 1; i <= n; i++) {
        // Don't select a substring ending at i-1
        dp[i] = dp[i - 1];

        // Try every palindrome ending at i-1
        for (let l = 0; l <= i - k; l++) {
            if (pal[l][i - 1]) {
                dp[i] = Math.max(dp[i], dp[l] + 1);
            }
        }
    }

    return dp[n];
};