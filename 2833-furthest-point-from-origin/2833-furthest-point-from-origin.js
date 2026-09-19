var furthestDistanceFromOrigin = function(moves) {
    let left = 0;
    let right = 0;

    for (let move of moves) {
        if (move === 'L') {
            left++;
        } else if (move === 'R') {
            right++;
        }
    }

    let blank = moves.length - left - right;

    // Put all '_' in the direction that increases the distance
    if (left > right) {
        left += blank;
    } else {
        right += blank;
    }

    return Math.abs(right - left);
};