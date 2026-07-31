/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    let left = 0;
    let right = s.length - 1;

    const isAlphanumeric = (ch) => /[a-z0-9]/i.test(ch);

    while (left < right) {
        // Left se non-alphanumeric characters skip karo
        while (left < right && !isAlphanumeric(s[left])) {
            left++;
        }
        // Right se non-alphanumeric characters skip karo
        while (left < right && !isAlphanumeric(s[right])) {
            right--;
        }

        // Case-insensitive comparison
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }

        left++;
        right--;
    }

    return true;
};