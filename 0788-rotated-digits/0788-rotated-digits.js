function rotatedDigits(n) {
    let count = 0;

    for (let i = 1; i <= n; i++) {
        let num = i;
        let changed = false;
        let valid = true;

        while (num > 0) {
            let digit = num % 10;

            if (digit === 2 || digit === 5 || digit === 6 || digit === 9) {
                changed = true;
            } 
            else if (digit === 0 || digit === 1 || digit === 8) {
                // These digits remain the same
            } 
            else {
                valid = false;
                break;
            }

            num = Math.floor(num / 10);
        }

        if (valid && changed) {
            count++;
        }
    }

    return count;
}