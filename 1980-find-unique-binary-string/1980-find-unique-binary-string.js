function findDifferentBinaryString(nums) {
    let result = '';
    for (let i = 0; i < nums.length; i++) {
        // Flip the i-th character of the i-th string
        result += nums[i][i] === '0' ? '1' : '0';
    }
    return result;
}