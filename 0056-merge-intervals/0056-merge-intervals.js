function merge(intervals) {
    if (intervals.length <= 1) return intervals;

    // Sort by start time
    intervals.sort((a, b) => a[0] - b[0]);

    const result = [intervals[0]];

    for (let i = 1; i < intervals.length; i++) {
        const current = intervals[i];
        const lastMerged = result[result.length - 1];

        if (current[0] <= lastMerged[1]) {
            // Overlapping (or touching), merge by extending the end
            lastMerged[1] = Math.max(lastMerged[1], current[1]);
        } else {
            // No overlap, push as new interval
            result.push(current);
        }
    }

    return result;
}