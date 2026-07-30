function merge(nums1, m, nums2, n) {
    let i = m - 1;       // last valid element in nums1
    let j = n - 1;       // last valid element in nums2
    let k = m + n - 1;   // last position in nums1 (write pointer)

    while (j >= 0) {
        if (i >= 0 && nums1[i] > nums2[j]) {
            nums1[k] = nums1[i];
            i--;
        } else {
            nums1[k] = nums2[j];
            j--;
        }
        k--;
    }

    return nums1;
}