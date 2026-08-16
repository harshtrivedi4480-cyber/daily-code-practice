var stoneGameIX = function(stones) {
    let cnt0 = 0;
    let cnt1 = 0;
    let cnt2 = 0;

    for (const stone of stones) {
        const r = stone % 3;

        if (r === 0) {
            cnt0++;
        } else if (r === 1) {
            cnt1++;
        } else {
            cnt2++;
        }
    }

    if (cnt0 % 2 === 0) {
        return cnt1 > 0 && cnt2 > 0;
    }

    return Math.abs(cnt1 - cnt2) >= 3;
};