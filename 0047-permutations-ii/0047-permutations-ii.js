/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function(nums) {
    const result = [];
    const path = [];
    const used = new Array(nums.length).fill(false);

    nums.sort((a, b) => a - b); // duplicates ko saath mein laane ke liye sort karo

    const backtrack = () => {
        if (path.length === nums.length) {
            result.push([...path]);
            return;
        }

        for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue;

            // Duplicate skip karo: agar current element pichle wale jaisa hai
            // aur pichla wala abhi use nahi hua (isi level pe), toh skip karo
            if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue;

            used[i] = true;
            path.push(nums[i]);
            backtrack();
            path.pop();
            used[i] = false;
        }
    };

    backtrack();
    return result;
};