var resultArray = function(nums, k, queries) {
    const n = nums.length;

    const prod = new Int32Array(4 * n);
    const cnt = Array.from(
        { length: 4 * n },
        () => new Int32Array(k)
    );

    function pull(node) {
        const left = node * 2;
        const right = node * 2 + 1;

        prod[node] = (prod[left] * prod[right]) % k;

        cnt[node].fill(0);

        // Prefixes completely inside left
        for (let r = 0; r < k; r++) {
            cnt[node][r] += cnt[left][r];
        }

        // Prefixes which continue into right
        for (let r = 0; r < k; r++) {
            if (cnt[right][r] === 0) continue;

            const newRemainder = (prod[left] * r) % k;
            cnt[node][newRemainder] += cnt[right][r];
        }
    }

    function build(node, l, r) {
        if (l === r) {
            const rem = nums[l] % k;

            prod[node] = rem;
            cnt[node][rem] = 1;

            return;
        }

        const mid = (l + r) >> 1;

        build(node * 2, l, mid);
        build(node * 2 + 1, mid + 1, r);

        pull(node);
    }

    function update(node, l, r, index, value) {
        if (l === r) {
            const rem = value % k;

            prod[node] = rem;
            cnt[node].fill(0);
            cnt[node][rem] = 1;

            return;
        }

        const mid = (l + r) >> 1;

        if (index <= mid) {
            update(node * 2, l, mid, index, value);
        } else {
            update(node * 2 + 1, mid + 1, r, index, value);
        }

        pull(node);
    }

    function merge(left, right) {
        const result = {
            prod: (left.prod * right.prod) % k,
            cnt: new Int32Array(k)
        };

        // Prefixes completely inside left
        for (let r = 0; r < k; r++) {
            result.cnt[r] += left.cnt[r];
        }

        // Prefixes that continue into right
        for (let r = 0; r < k; r++) {
            if (right.cnt[r] === 0) continue;

            const newRemainder = (left.prod * r) % k;
            result.cnt[newRemainder] += right.cnt[r];
        }

        return result;
    }

    function query(node, l, r, ql, qr) {
        if (ql <= l && r <= qr) {
            return {
                prod: prod[node],
                cnt: cnt[node].slice()
            };
        }

        const mid = (l + r) >> 1;

        if (qr <= mid) {
            return query(node * 2, l, mid, ql, qr);
        }

        if (ql > mid) {
            return query(node * 2 + 1, mid + 1, r, ql, qr);
        }

        const left = query(node * 2, l, mid, ql, qr);
        const right = query(node * 2 + 1, mid + 1, r, ql, qr);

        return merge(left, right);
    }

    build(1, 0, n - 1);

    const answer = [];

    for (const queryData of queries) {
        const index = queryData[0];
        const value = queryData[1];
        const start = queryData[2];
        const x = queryData[3];

        // Persistent update
        update(1, 0, n - 1, index, value);

        // Consider nums[start ... n-1]
        const node = query(
            1,
            0,
            n - 1,
            start,
            n - 1
        );

        answer.push(node.cnt[x]);
    }

    return answer;
};