var distance = function(nums) {
    const map = new Map();
    const ans = new Array(nums.length).fill(0);

    // Store indices of each number
    for (let i = 0; i < nums.length; i++) {
        if (!map.has(nums[i])) {
            map.set(nums[i], []);
        }

        map.get(nums[i]).push(i);
    }

    // Calculate distances
    for (const indices of map.values()) {
        const n = indices.length;

        const prefix = new Array(n + 1).fill(0);

        // Prefix sum
        for (let i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + indices[i];
        }

        for (let i = 0; i < n; i++) {
            const index = indices[i];

            // Left side
            const leftCount = i;
            const leftSum = prefix[i];

            const leftDistance =
                index * leftCount - leftSum;

            // Right side
            const rightCount = n - i - 1;
            const rightSum = prefix[n] - prefix[i + 1];

            const rightDistance =
                rightSum - index * rightCount;

            ans[index] = leftDistance + rightDistance;
        }
    }

    return ans;
};