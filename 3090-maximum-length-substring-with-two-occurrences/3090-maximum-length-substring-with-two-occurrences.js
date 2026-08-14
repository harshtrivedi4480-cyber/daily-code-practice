var maximumLengthSubstring = function(s) {
    let freq = new Array(26).fill(0);
    let left = 0;
    let ans = 0;

    for (let right = 0; right < s.length; right++) {
        let index = s.charCodeAt(right) - 97;
        freq[index]++;

        while (freq[index] > 2) {
            let leftIndex = s.charCodeAt(left) - 97;
            freq[leftIndex]--;
            left++;
        }

        ans = Math.max(ans, right - left + 1);
    }

    return ans;
};