/**
 * @param {number} n
 * @param {number[][]} reservedSeats
 * @return {number}
 */
var maxNumberOfFamilies = function(n, reservedSeats) {
    const rows = new Map();

    // Mark reserved seats for each affected row.
    for (const [row, seat] of reservedSeats) {
        if (!rows.has(row)) {
            rows.set(row, 0);
        }

        // Use bits for seats 2 through 9.
        // seat 2 -> bit 0, seat 3 -> bit 1, ..., seat 9 -> bit 7
        if (seat >= 2 && seat <= 9) {
            rows.set(row, rows.get(row) | (1 << (seat - 2)));
        }
    }

    let answer = (n - rows.size) * 2;

    // Masks for the three possible groups:
    // seats 2,3,4,5
    const left = 0b00001111;

    // seats 4,5,6,7
    const middle = 0b00111100;

    // seats 6,7,8,9
    const right = 0b11110000;

    for (const reserved of rows.values()) {
        const canLeft = (reserved & left) === 0;
        const canMiddle = (reserved & middle) === 0;
        const canRight = (reserved & right) === 0;

        if (canLeft && canRight) {
            // Two non-overlapping groups.
            answer += 2;
        } else if (canLeft || canMiddle || canRight) {
            // At least one group can fit.
            answer += 1;
        }
    }

    return answer;
};