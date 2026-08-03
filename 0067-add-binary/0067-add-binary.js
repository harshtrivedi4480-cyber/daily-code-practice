/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function(a, b) {
    let i = a.length - 1;
    let j = b.length - 1;
    let carry = 0;
    const result = [];

    while (i >= 0 || j >= 0 || carry > 0) {
        let sum = carry;
        if (i >= 0) {
            sum += a.charCodeAt(i) - 48; // '0' or '1' to numeric value
            i--;
        }
        if (j >= 0) {
            sum += b.charCodeAt(j) - 48;
            j--;
        }
        result.push(sum % 2);
        carry = Math.floor(sum / 2);
    }

    return result.reverse().join('');
};