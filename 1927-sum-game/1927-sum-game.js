var sumGame = function(num) {
    let n = num.length;
    let half = n / 2;

    let leftSum = 0;
    let rightSum = 0;

    let leftQ = 0;
    let rightQ = 0;

    for (let i = 0; i < half; i++) {
        if (num[i] === '?') {
            leftQ++;
        } else {
            leftSum += Number(num[i]);
        }
    }

    for (let i = half; i < n; i++) {
        if (num[i] === '?') {
            rightQ++;
        } else {
            rightSum += Number(num[i]);
        }
    }

    // If number of '?' is odd, Alice can always force a win
    if ((leftQ + rightQ) % 2 !== 0) {
        return true;
    }

    // Difference between existing sums
    let diff = rightSum - leftSum;

    // Alice can force the sums to be different
    return diff !== 9 * (leftQ - rightQ) / 2;
};