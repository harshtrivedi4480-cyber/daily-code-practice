/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
    if (s.length < t.length) return "";

    const need = new Map();
    for (const ch of t) {
        need.set(ch, (need.get(ch) || 0) + 1);
    }

    let required = need.size; // number of distinct chars in t that need to be fully matched
    let formed = 0; // number of distinct chars currently satisfied in window

    const windowCounts = new Map();

    let left = 0;
    let bestLen = Infinity;
    let bestLeft = 0;

    for (let right = 0; right < s.length; right++) {
        const ch = s[right];
        windowCounts.set(ch, (windowCounts.get(ch) || 0) + 1);

        if (need.has(ch) && windowCounts.get(ch) === need.get(ch)) {
            formed++;
        }

        // try to shrink window from left while it's still valid
        while (formed === required) {
            if (right - left + 1 < bestLen) {
                bestLen = right - left + 1;
                bestLeft = left;
            }

            const leftCh = s[left];
            windowCounts.set(leftCh, windowCounts.get(leftCh) - 1);
            if (need.has(leftCh) && windowCounts.get(leftCh) < need.get(leftCh)) {
                formed--;
            }
            left++;
        }
    }

    return bestLen === Infinity ? "" : s.substring(bestLeft, bestLeft + bestLen);
};