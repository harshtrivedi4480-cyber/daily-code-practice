var smallestNumber = function(n, t) {
    while (true) {
        let product = 1;
        for (const digit of String(n)) {
            product *= Number(digit);
        }
        if (product % t === 0) return n;
        n++;
    }
};