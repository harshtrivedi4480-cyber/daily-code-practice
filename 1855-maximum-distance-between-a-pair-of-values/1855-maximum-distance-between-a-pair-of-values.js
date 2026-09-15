var maxDistance = function(nums1, nums2) {
    let i = 0;
    let j = 0;
    let maxDist = 0;

    while (i < nums1.length && j < nums2.length) {
        if (i <= j && nums1[i] <= nums2[j]) {
            // Valid pair
            maxDist = Math.max(maxDist, j - i);

            // Try to increase distance
            j++;
        } else {
            // Either i > j or nums1[i] > nums2[j]
            i++;

            // Make sure j is never behind i
            if (j < i) {
                j = i;
            }
        }
    }

    return maxDist;
};