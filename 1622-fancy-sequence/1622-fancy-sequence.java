class Fancy {

    private static final long MOD = 1_000_000_007L;

    private List<Long> values;
    private List<Long> mulHistory;
    private List<Long> addHistory;

    private long mul;
    private long add;

    public Fancy() {
        values = new ArrayList<>();
        mulHistory = new ArrayList<>();
        addHistory = new ArrayList<>();

        mul = 1;
        add = 0;
    }

    public void append(int val) {
        values.add((long) val);
        mulHistory.add(mul);
        addHistory.add(add);
    }

    public void addAll(int inc) {
        add = (add + inc) % MOD;
    }

    public void multAll(int m) {
        mul = (mul * m) % MOD;
        add = (add * m) % MOD;
    }

    public int getIndex(int idx) {
        if (idx >= values.size()) {
            return -1;
        }

        long originalMul = mulHistory.get(idx);
        long originalAdd = addHistory.get(idx);

        long inverse = modPow(originalMul, MOD - 2);

        long currentMul = mul * inverse % MOD;

        long currentAdd = (add - originalAdd * currentMul % MOD + MOD) % MOD;

        return (int) ((currentMul * values.get(idx) + currentAdd) % MOD);
    }

    private long modPow(long base, long exp) {
        long result = 1;

        while (exp > 0) {
            if ((exp & 1) == 1) {
                result = result * base % MOD;
            }
            base = base * base % MOD;
            exp >>= 1;
        }

        return result;
    }
}