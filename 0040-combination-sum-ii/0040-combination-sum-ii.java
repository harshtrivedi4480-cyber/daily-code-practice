import java.util.*;

class Solution {
    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        List<List<Integer>> result = new ArrayList<>();
        Arrays.sort(candidates); // sort to handle duplicates and allow pruning
        backtrack(candidates, target, 0, new ArrayList<>(), result);
        return result;
    }

    private void backtrack(int[] candidates, int remaining, int start,
                            List<Integer> current, List<List<Integer>> result) {
        if (remaining == 0) {
            result.add(new ArrayList<>(current));
            return;
        }

        for (int i = start; i < candidates.length; i++) {
            // Prune: if current candidate already exceeds remaining, 
            // since array is sorted, no need to check further
            if (candidates[i] > remaining) {
                break;
            }

            // Skip duplicates at the same tree depth
            // (only skip if it's not the first element being considered at this level)
            if (i > start && candidates[i] == candidates[i - 1]) {
                continue;
            }

            current.add(candidates[i]);
            // move to i + 1 since each number can only be used once
            backtrack(candidates, remaining - candidates[i], i + 1, current, result);
            current.remove(current.size() - 1); // backtrack
        }
    }

    // Example usage
    public static void main(String[] args) {
        Solution sol = new Solution();

        int[] candidates1 = {10, 1, 2, 7, 6, 1, 5};
        System.out.println(sol.combinationSum2(candidates1, 8));
        // [[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]]

        int[] candidates2 = {2, 5, 2, 1, 2};
        System.out.println(sol.combinationSum2(candidates2, 5));
        // [[1, 2, 2], [5]]
    }
}