function validSequence(word1, word2) {
    const n = word1.length;
    const m = word2.length;

    // left[j] = word2[j] ko exact match karne ka
    // sabse chhota possible index
    const left = new Array(m).fill(-1);

    let p = 0;

    for (let j = 0; j < m; j++) {
        while (p < n && word1[p] !== word2[j]) {
            p++;
        }

        if (p === n) break;

        left[j] = p;
        p++;
    }

    // right[j] = word2[j] se suffix ko exact match karne ke liye
    // word2[j] ka sabse bada possible index
    const right = new Array(m + 1).fill(n);

    p = n - 1;

    for (let j = m - 1; j >= 0; j--) {
        while (p >= 0 && word1[p] !== word2[j]) {
            p--;
        }

        if (p < 0) break;

        right[j] = p;
        p--;
    }

    /*
     * nextDiff[i] = i ke baad/equal first index j
     * jahan word1[j] !== word1[i]
     */
    const nextDiff = new Array(n).fill(n);

    for (let i = n - 2; i >= 0; i--) {
        if (word1[i] !== word1[i + 1]) {
            nextDiff[i] = i + 1;
        } else {
            nextDiff[i] = nextDiff[i + 1];
        }
    }

    let firstBetterJ = -1;
    let firstBetterIndex = -1;

    let lastPossibleJ = -1;
    let lastPossibleIndex = -1;

    /*
     * Har position j ko mismatch banakar check karte hain.
     */
    for (let j = 0; j < m; j++) {

        // word2[0 ... j-1] exact match hona chahiye
        if (j > 0 && left[j - 1] === -1) {
            continue;
        }

        const start = j === 0 ? 0 : left[j - 1] + 1;

        if (start >= n) continue;

        let mismatchIndex;

        // start par hi mismatch mil gaya
        if (word1[start] !== word2[j]) {
            mismatchIndex = start;
        } else {
            // word1[start] same hai, isliye next different
            // character dhoondho
            mismatchIndex = nextDiff[start];
        }

        if (mismatchIndex >= n) {
            continue;
        }

        // Mismatch ke baad suffix exact match hona chahiye
        if (j !== m - 1 && right[j + 1] >= n) {
            continue;
        }

        // Mismatch index suffix ke index se pehle hona chahiye
        if (j !== m - 1 && mismatchIndex >= right[j + 1]) {
            continue;
        }

        lastPossibleJ = j;
        lastPossibleIndex = mismatchIndex;

        /*
         * Agar mismatch index exact matching index se chhota hai,
         * to ye lexicographically better answer dega.
         */
        const exactIndex = left[j] === -1 ? n : left[j];

        if (
            mismatchIndex < exactIndex &&
            firstBetterJ === -1
        ) {
            firstBetterJ = j;
            firstBetterIndex = mismatchIndex;
        }
    }

    let mismatchJ;
    let mismatchIndex;

    /*
     * Pehle aisa mismatch choose karo jo answer ko
     * lexicographically chhota bana raha ho.
     */
    if (firstBetterJ !== -1) {
        mismatchJ = firstBetterJ;
        mismatchIndex = firstBetterIndex;
    }

    /*
     * Agar pura word2 exact match ho sakta hai,
     * wahi lexicographically smallest hoga.
     */
    else if (left[m - 1] !== -1) {
        return left;
    }

    /*
     * Exact match possible nahi hai, to mismatch ko
     * jitna late rakh sakte hain utna better hai.
     */
    else if (lastPossibleJ !== -1) {
        mismatchJ = lastPossibleJ;
        mismatchIndex = lastPossibleIndex;
    }

    else {
        return [];
    }

    const answer = [];

    // Prefix
    for (let j = 0; j < mismatchJ; j++) {
        answer.push(left[j]);
    }

    // One mismatch
    answer.push(mismatchIndex);

    // Suffix
    p = mismatchIndex + 1;

    for (let j = mismatchJ + 1; j < m; j++) {
        while (p < n && word1[p] !== word2[j]) {
            p++;
        }

        if (p === n) {
            return [];
        }

        answer.push(p);
        p++;
    }

    return answer;
}