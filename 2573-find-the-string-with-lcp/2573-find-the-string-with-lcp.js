var findTheString = function(lcp) {
    const n = lcp.length;
    const word = Array(n).fill("");

    // Step 1: Diagonal check
    // lcp[i][i] must be n - i
    for (let i = 0; i < n; i++) {
        if (lcp[i][i] !== n - i) {
            return "";
        }
    }

    // Step 2: Assign characters greedily
    // First unassigned position gets the smallest
    // unused character.
    let nextChar = 0;

    for (let i = 0; i < n; i++) {
        if (word[i] !== "") continue;

        if (nextChar >= 26) {
            return "";
        }

        const ch = String.fromCharCode(97 + nextChar);
        nextChar++;

        for (let j = i; j < n; j++) {
            if (lcp[i][j] > 0) {
                if (word[j] !== "" && word[j] !== ch) {
                    return "";
                }

                word[j] = ch;
            }
        }
    }

    // Step 3: Validate the complete LCP matrix
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            let expected;

            if (word[i] !== word[j]) {
                expected = 0;
            } else if (i === n - 1 || j === n - 1) {
                expected = 1;
            } else {
                expected = 1 + lcp[i + 1][j + 1];
            }

            if (lcp[i][j] !== expected) {
                return "";
            }
        }
    }

    return word.join("");
};