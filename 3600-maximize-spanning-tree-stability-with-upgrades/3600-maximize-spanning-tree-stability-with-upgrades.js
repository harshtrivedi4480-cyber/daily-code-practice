function maxStability(n, edges, k) {
    const mandatory = [];
    const optional = [];
    for (const [u, v, s, must] of edges) {
        if (must === 1) mandatory.push([u, v, s]);
        else optional.push([u, v, s]);
    }

    function makeDSU(n) {
        const parent = new Array(n);
        const size = new Array(n).fill(1);
        for (let i = 0; i < n; i++) parent[i] = i;
        return { parent, size };
    }
    function find(dsu, x) {
        while (dsu.parent[x] !== x) {
            dsu.parent[x] = dsu.parent[dsu.parent[x]];
            x = dsu.parent[x];
        }
        return x;
    }
    function union(dsu, a, b) {
        let ra = find(dsu, a), rb = find(dsu, b);
        if (ra === rb) return false;
        if (dsu.size[ra] < dsu.size[rb]) [ra, rb] = [rb, ra];
        dsu.parent[rb] = ra;
        dsu.size[ra] += dsu.size[rb];
        return true;
    }

    // Step 1: union mandatory edges, detect cycle
    const baseDSU = makeDSU(n);
    let minMandatoryStrength = Infinity;
    for (const [u, v, s] of mandatory) {
        if (!union(baseDSU, u, v)) return -1; // cycle among mandatory edges
        if (s < minMandatoryStrength) minMandatoryStrength = s;
    }

    let baseComponents = 0;
    {
        const roots = new Set();
        for (let i = 0; i < n; i++) roots.add(find(baseDSU, i));
        baseComponents = roots.size;
    }

    const baseParentSnap = baseDSU.parent.slice();
    const baseSizeSnap = baseDSU.size.slice();

    function feasible(X) {
        if (mandatory.length > 0 && minMandatoryStrength < X) return false;

        const dsu = { parent: baseParentSnap.slice(), size: baseSizeSnap.slice() };
        let comp = baseComponents;

        // Pass 1: free edges (no upgrade needed)
        for (const [u, v, s] of optional) {
            if (s >= X) {
                if (union(dsu, u, v)) comp--;
            }
        }

        // Pass 2: edges needing exactly one upgrade
        let upgrades = 0;
        for (const [u, v, s] of optional) {
            if (s < X && s * 2 >= X) {
                if (union(dsu, u, v)) {
                    comp--;
                    upgrades++;
                }
            }
        }

        return comp === 1 && upgrades <= k;
    }

    let maxS = 0;
    for (const [, , s] of optional) if (s > maxS) maxS = s;
    for (const [, , s] of mandatory) if (s > maxS) maxS = s;

    let lo = 1, hi = maxS * 2, ans = -1;
    if (!feasible(lo)) return -1;

    while (lo <= hi) {
        const mid = (lo + hi) >> 1;
        if (feasible(mid)) {
            ans = mid;
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }

    return ans;
}