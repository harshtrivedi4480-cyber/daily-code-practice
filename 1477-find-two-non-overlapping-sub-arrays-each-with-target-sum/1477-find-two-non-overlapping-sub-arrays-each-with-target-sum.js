var minSumOfLengths = function(arr, target) {
    const n = arr.length;

    // best[i] = minimum length of a valid subarray
    // completely inside arr[0...i]
    const best = new Array(n).fill(Infinity);

    let left = 0;
    let sum = 0;
    let answer = Infinity;

    for (let right = 0; right < n; right++) {
        sum += arr[right];

        // Shrink window if sum becomes greater than target
        while (sum > target && left <= right) {
            sum -= arr[left];
            left++;
        }

        // Valid subarray [left ... right]
        if (sum === target) {
            const len = right - left + 1;

            // Check if there is a previous non-overlapping subarray
            if (left > 0 && best[left - 1] !== Infinity) {
                answer = Math.min(answer, len + best[left - 1]);
            }

            // Best valid subarray up to current right
            if (right === 0) {
                best[right] = len;
            } else {
                best[right] = Math.min(best[right - 1], len);
            }
        } else {
            // Carry forward previous best
            if (right > 0) {
                best[right] = best[right - 1];
            }
        }
    }

    return answer === Infinity ? -1 : answer;
};