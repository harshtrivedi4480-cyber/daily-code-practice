var Fancy = function() {
    this.MOD = 1000000007n;
    this.mult = 1n; // current global multiplier
    this.add = 0n;  // current global additive term
    this.sequence = []; // each entry: [val, multAtAppend, addAtAppend]
};

/** 
 * @param {number} val
 * @return {void}
 */
Fancy.prototype.append = function(val) {
    this.sequence.push([BigInt(val), this.mult, this.add]);
};

/** 
 * @param {number} inc
 * @return {void}
 */
Fancy.prototype.addAll = function(inc) {
    this.add = (this.add + BigInt(inc)) % this.MOD;
};

/** 
 * @param {number} m
 * @return {void}
 */
Fancy.prototype.multAll = function(m) {
    this.mult = (this.mult * BigInt(m)) % this.MOD;
    this.add = (this.add * BigInt(m)) % this.MOD;
};

// Modular exponentiation for computing modular inverse (Fermat's little theorem)
function modPow(base, exp, mod) {
    base = ((base % mod) + mod) % mod;
    let result = 1n;
    while (exp > 0n) {
        if (exp & 1n) {
            result = (result * base) % mod;
        }
        base = (base * base) % mod;
        exp >>= 1n;
    }
    return result;
}

function modInverse(a, mod) {
    return modPow(a, mod - 2n, mod);
}

/** 
 * @param {number} idx
 * @return {number}
 */
Fancy.prototype.getIndex = function(idx) {
    if (idx >= this.sequence.length) return -1;
    
    const [val, multAtAppend, addAtAppend] = this.sequence[idx];
    
    // Recover the "base" value before this element's stored transformation:
    // val = multAtAppend * base + addAtAppend (mod p)
    // => base = (val - addAtAppend) * inverse(multAtAppend) (mod p)
    const inv = modInverse(multAtAppend, this.MOD);
    let base = ((val - addAtAppend) % this.MOD + this.MOD) % this.MOD;
    base = (base * inv) % this.MOD;
    
    // Apply current global transformation to base
    let result = (base * this.mult + this.add) % this.MOD;
    return Number(result);
};

/**
 * Your Fancy object will be instantiated and called as such:
 * var obj = new Fancy()
 * obj.append(val)
 * obj.addAll(inc)
 * obj.multAll(m)
 * var param_4 = obj.getIndex(idx)
 */
