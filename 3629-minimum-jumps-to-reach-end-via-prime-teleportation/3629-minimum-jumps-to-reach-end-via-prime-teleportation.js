const MAX = 1000000;

// Build SPF only ONCE
const spf = new Int32Array(MAX + 1);

for (let i = 2; i <= MAX; i++) {
    if (spf[i] === 0) {
        spf[i] = i;

        if (i * i <= MAX) {
            for (let j = i * i; j <= MAX; j += i) {
                if (spf[j] === 0) {
                    spf[j] = i;
                }
            }
        }
    }
}

var minJumps = function(nums) {
    const n = nums.length;

    if (n === 1) return 0;

    // prime -> indices where nums[index] is divisible by prime
    const primeIndices = new Map();

    for (let i = 0; i < n; i++) {
        let x = nums[i];

        while (x > 1) {
            const p = spf[x];

            if (!primeIndices.has(p)) {
                primeIndices.set(p, []);
            }

            primeIndices.get(p).push(i);

            // Remove all occurrences of this prime
            while (x % p === 0) {
                x /= p;
            }
        }
    }

    const dist = new Int32Array(n);
    dist.fill(-1);

    const queue = new Int32Array(n);
    let head = 0;
    let tail = 0;

    queue[tail++] = 0;
    dist[0] = 0;

    // A prime teleport group is processed only once
    const usedPrime = new Uint8Array(MAX + 1);

    while (head < tail) {
        const i = queue[head++];

        if (i === n - 1) {
            return dist[i];
        }

        // Move left
        if (i > 0 && dist[i - 1] === -1) {
            dist[i - 1] = dist[i] + 1;
            queue[tail++] = i - 1;
        }

        // Move right
        if (i + 1 < n && dist[i + 1] === -1) {
            dist[i + 1] = dist[i] + 1;
            queue[tail++] = i + 1;
        }

        // Teleport only when nums[i] itself is prime
        const value = nums[i];

        if (spf[value] === value && usedPrime[value] === 0) {
            usedPrime[value] = 1;

            const indices = primeIndices.get(value);

            if (indices) {
                for (const j of indices) {
                    if (dist[j] === -1) {
                        dist[j] = dist[i] + 1;
                        queue[tail++] = j;
                    }
                }
            }
        }
    }

    return -1;
};