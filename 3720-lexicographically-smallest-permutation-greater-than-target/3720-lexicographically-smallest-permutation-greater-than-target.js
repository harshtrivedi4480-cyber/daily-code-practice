function lexGreaterPermutation(s, target) {
    const n = s.length;

    const freq = new Array(26).fill(0);

    for (const ch of s) {
        freq[ch.charCodeAt(0) - 97]++;
    }

    // Try making the first difference as far right as possible
    for (let i = n - 1; i >= 0; i--) {
        const remaining = freq.slice();

        // Check whether target[0...i-1] can be formed
        let possible = true;

        for (let j = 0; j < i; j++) {
            const idx = target.charCodeAt(j) - 97;

            if (remaining[idx] === 0) {
                possible = false;
                break;
            }

            remaining[idx]--;
        }

        if (!possible) continue;

        // Find the smallest available character
        // that is greater than target[i]
        const targetIdx = target.charCodeAt(i) - 97;

        for (let c = targetIdx + 1; c < 26; c++) {
            if (remaining[c] > 0) {
                let ans = target.slice(0, i);

                ans += String.fromCharCode(97 + c);
                remaining[c]--;

                // Add all remaining characters in sorted order
                for (let k = 0; k < 26; k++) {
                    if (remaining[k] > 0) {
                        ans += String.fromCharCode(97 + k).repeat(remaining[k]);
                    }
                }

                return ans;
            }
        }
    }

    return "";
}