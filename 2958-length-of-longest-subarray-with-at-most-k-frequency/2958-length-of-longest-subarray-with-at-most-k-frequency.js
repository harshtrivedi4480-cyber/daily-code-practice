var maxSubarrayLength = function(nums, k) {
    let freq = new Map();
    let left = 0;
    let ans = 0;

    for (let right = 0; right < nums.length; right++) {
        // Add current element
        freq.set(nums[right], (freq.get(nums[right]) || 0) + 1);

        // If frequency exceeds k, shrink window
        while (freq.get(nums[right]) > k) {
            freq.set(nums[left], freq.get(nums[left]) - 1);
            left++;
        }

        // Current window is good
        ans = Math.max(ans, right - left + 1);
    }

    return ans;
};