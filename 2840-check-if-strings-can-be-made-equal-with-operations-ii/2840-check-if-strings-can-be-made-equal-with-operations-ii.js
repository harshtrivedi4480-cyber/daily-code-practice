/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkStrings = function(s1, s2) {
    const even = new Array(26).fill(0);
    const odd = new Array(26).fill(0);

    for (let i = 0; i < s1.length; i++) {
        const idx1 = s1.charCodeAt(i) - 97;
        const idx2 = s2.charCodeAt(i) - 97;

        if (i % 2 === 0) {
            even[idx1]++;
            even[idx2]--;
        } else {
            odd[idx1]++;
            odd[idx2]--;
        }
    }

    // All frequencies must be zero
    for (let i = 0; i < 26; i++) {
        if (even[i] !== 0 || odd[i] !== 0) {
            return false;
        }
    }

    return true;
};