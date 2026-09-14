var maxDistance = function(nums1, nums2) {
    let i = 0;
    let j = 0;
    let maxDist = 0;

    while (i < nums1.length && j < nums2.length) {
        if (nums1[i] <= nums2[j]) {
            // Valid pair
            maxDist = Math.max(maxDist, j - i);
            j++;
        } else {
            // nums1[i] is too large
            i++;
            
            // j must always be >= i
            if (j < i) {
                j = i;
            }
        }
    }

    return maxDist;
};