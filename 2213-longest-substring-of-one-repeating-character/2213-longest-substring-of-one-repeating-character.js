/**
 * @param {string} s
 * @param {string} queryCharacters
 * @param {number[]} queryIndices
 * @return {number[]}
 */
var longestRepeating = function(s, queryCharacters, queryIndices) {
    const n = s.length;

    const tree = Array(4 * n);

    function makeNode(ch) {
        return {
            leftChar: ch,
            rightChar: ch,
            prefix: 1,
            suffix: 1,
            best: 1,
            len: 1
        };
    }

    function merge(left, right) {
        if (!left) return right;
        if (!right) return left;

        const node = {
            leftChar: left.leftChar,
            rightChar: right.rightChar,
            prefix: left.prefix,
            suffix: right.suffix,
            best: Math.max(left.best, right.best),
            len: left.len + right.len
        };

        // Entire left segment has the same character
        if (
            left.prefix === left.len &&
            left.leftChar === right.leftChar
        ) {
            node.prefix = left.len + right.prefix;
        }

        // Entire right segment has the same character
        if (
            right.suffix === right.len &&
            left.rightChar === right.rightChar
        ) {
            node.suffix = right.len + left.suffix;
        }

        // Join suffix of left + prefix of right
        if (left.rightChar === right.leftChar) {
            node.best = Math.max(
                node.best,
                left.suffix + right.prefix
            );
        }

        return node;
    }

    function build(index, l, r) {
        if (l === r) {
            tree[index] = makeNode(s[l]);
            return;
        }

        const mid = Math.floor((l + r) / 2);

        build(index * 2, l, mid);
        build(index * 2 + 1, mid + 1, r);

        tree[index] = merge(
            tree[index * 2],
            tree[index * 2 + 1]
        );
    }

    function update(index, l, r, pos, ch) {
        if (l === r) {
            tree[index] = makeNode(ch);
            return;
        }

        const mid = Math.floor((l + r) / 2);

        if (pos <= mid) {
            update(index * 2, l, mid, pos, ch);
        } else {
            update(index * 2 + 1, mid + 1, r, pos, ch);
        }

        tree[index] = merge(
            tree[index * 2],
            tree[index * 2 + 1]
        );
    }

    build(1, 0, n - 1);

    const ans = [];

    for (let i = 0; i < queryCharacters.length; i++) {
        const index = queryIndices[i];
        const ch = queryCharacters[i];

        update(1, 0, n - 1, index, ch);

        ans.push(tree[1].best);
    }

    return ans;
};