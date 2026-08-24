/**
 * @param {number[][]} lcp
 * @return {string}
 */
var findTheString = function(lcp) {
    const n = lcp.length;

    const word = new Array(n).fill('');

    let charCode = 97; // 'a'

    for (let i = 0; i < n; i++) {

        // Already assigned
        if (word[i] !== '') {
            continue;
        }

        // Only a-z are allowed
        if (charCode > 122) {
            return "";
        }

        const ch = String.fromCharCode(charCode);
        word[i] = ch;

        // Every position having lcp[i][j] > 0
        // must have the same character.
        for (let j = i + 1; j < n; j++) {
            if (lcp[i][j] > 0) {
                if (word[j] !== '' && word[j] !== ch) {
                    return "";
                }

                word[j] = ch;
            }
        }

        charCode++;
    }

    // Verify the generated string against the entire matrix.
    const actual = Array.from(
        { length: n },
        () => new Array(n).fill(0)
    );

    for (let i = n - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {

            if (word[i] === word[j]) {
                if (i === n - 1 || j === n - 1) {
                    actual[i][j] = 1;
                } else {
                    actual[i][j] = actual[i + 1][j + 1] + 1;
                }
            }
        }
    }

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (actual[i][j] !== lcp[i][j]) {
                return "";
            }
        }
    }

    return word.join('');
};