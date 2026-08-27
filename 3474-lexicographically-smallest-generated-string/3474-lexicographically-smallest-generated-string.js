function generateString(str1, str2) {
    const n = str1.length;
    const m = str2.length;
    const len = n + m - 1;

    // '?' means this position is not fixed yet
    const word = new Array(len).fill('?');
    const fixed = new Array(len).fill(false);

    // Step 1: Place str2 for every 'T'
    for (let i = 0; i < n; i++) {
        if (str1[i] === 'T') {
            for (let j = 0; j < m; j++) {
                const pos = i + j;

                if (word[pos] !== '?' && word[pos] !== str2[j]) {
                    return "";
                }

                word[pos] = str2[j];
                fixed[pos] = true;
            }
        }
    }

    // Step 2: Fill all remaining positions with 'a'
    for (let i = 0; i < len; i++) {
        if (word[i] === '?') {
            word[i] = 'a';
        }
    }

    // Step 3: Handle every 'F'
    for (let i = 0; i < n; i++) {
        if (str1[i] === 'F') {
            let matches = true;

            for (let j = 0; j < m; j++) {
                if (word[i + j] !== str2[j]) {
                    matches = false;
                    break;
                }
            }

            // Already different, no problem
            if (!matches) continue;

            // It matches str2, so change one non-fixed character.
            // Choose from right to left to keep lexicographic order minimal.
            let changed = false;

            for (let j = m - 1; j >= 0; j--) {
                const pos = i + j;

                if (!fixed[pos]) {
                    // Change to the smallest character different from str2[j]
                    if (str2[j] !== 'a') {
                        word[pos] = 'a';
                    } else {
                        word[pos] = 'b';
                    }

                    changed = true;
                    break;
                }
            }

            if (!changed) {
                return "";
            }
        }
    }

    // Final verification
    for (let i = 0; i < n; i++) {
        let matches = true;

        for (let j = 0; j < m; j++) {
            if (word[i + j] !== str2[j]) {
                matches = false;
                break;
            }
        }

        if (str1[i] === 'T' && !matches) return "";
        if (str1[i] === 'F' && matches) return "";
    }

    return word.join('');
}