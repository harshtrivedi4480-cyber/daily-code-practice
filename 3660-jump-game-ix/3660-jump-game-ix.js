var maxValue = function(nums) {
    const n = nums.length;

    // suffixMin[i] = minimum value from i to n - 1
    const suffixMin = new Array(n);
    suffixMin[n - 1] = nums[n - 1];

    for (let i = n - 2; i >= 0; i--) {
        suffixMin[i] = Math.min(nums[i], suffixMin[i + 1]);
    }

    const ans = new Array(n);

    let start = 0;
    let prefixMax = nums[0];

    for (let i = 0; i < n - 1; i++) {
        prefixMax = Math.max(prefixMax, nums[i]);

        // No edge can cross this boundary
        if (prefixMax <= suffixMin[i + 1]) {
            // Find maximum value in current component
            let componentMax = nums[start];

            for (let j = start; j <= i; j++) {
                componentMax = Math.max(componentMax, nums[j]);
            }

            for (let j = start; j <= i; j++) {
                ans[j] = componentMax;
            }

            start = i + 1;
        }
    }

    // Last component
    let componentMax = nums[start];

    for (let i = start; i < n; i++) {
        componentMax = Math.max(componentMax, nums[i]);
    }

    for (let i = start; i < n; i++) {
        ans[i] = componentMax;
    }

    return ans;
};