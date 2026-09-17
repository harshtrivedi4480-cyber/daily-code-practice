var minimumHammingDistance = function(source, target, allowedSwaps) {
    const n = source.length;

    // DSU
    const parent = Array.from({ length: n }, (_, i) => i);
    const rank = new Array(n).fill(0);

    function find(x) {
        if (parent[x] !== x) {
            parent[x] = find(parent[x]);
        }
        return parent[x];
    }

    function union(a, b) {
        let rootA = find(a);
        let rootB = find(b);

        if (rootA === rootB) return;

        if (rank[rootA] < rank[rootB]) {
            parent[rootA] = rootB;
        } else if (rank[rootA] > rank[rootB]) {
            parent[rootB] = rootA;
        } else {
            parent[rootB] = rootA;
            rank[rootA]++;
        }
    }

    // Connect all indices that can swap with each other
    for (const [a, b] of allowedSwaps) {
        union(a, b);
    }

    // For each connected component, count values in source
    // and match them against target.
    const components = new Map();

    for (let i = 0; i < n; i++) {
        const root = find(i);

        if (!components.has(root)) {
            components.set(root, new Map());
        }

        const map = components.get(root);

        map.set(source[i], (map.get(source[i]) || 0) + 1);
    }

    let hammingDistance = 0;

    for (let i = 0; i < n; i++) {
        const root = find(i);
        const map = components.get(root);

        if (map.get(target[i]) > 0) {
            // We can place this value at index i
            map.set(target[i], map.get(target[i]) - 1);
        } else {
            // No matching source value available
            hammingDistance++;
        }
    }

    return hammingDistance;
};