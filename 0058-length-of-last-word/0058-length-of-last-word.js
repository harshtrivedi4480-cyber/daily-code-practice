/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function(s) {
    let i = s.length - 1;
    
    // Step 1: Skip trailing spaces
    while (i >= 0 && s[i] === ' ') {
        i--;
    }
    
    // Step 2: Count characters of the last word
    let length = 0;
    while (i >= 0 && s[i] !== ' ') {
        length++;
        i--;
    }
    
    return length;
};