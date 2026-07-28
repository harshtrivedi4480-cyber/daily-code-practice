class Solution {
public:
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        vector<vector<int>> result;
        vector<int> current;
        
        sort(candidates.begin(), candidates.end()); // pruning ke liye sort zaroori
        backtrack(candidates, target, 0, current, result);
        
        return result;
    }
    
private:
    void backtrack(vector<int>& candidates, int remaining, int start, 
                    vector<int>& current, vector<vector<int>>& result) {
        if (remaining == 0) {
            result.push_back(current);
            return;
        }
        
        for (int i = start; i < (int)candidates.size(); i++) {
            if (candidates[i] > remaining) break; // sorted hai, aage sab bade honge, so break
            
            current.push_back(candidates[i]);
            // i pass kiya (i+1 nahi), kyunki same element dobara use ho sakta hai
            backtrack(candidates, remaining - candidates[i], i, current, result);
            current.pop_back(); // backtrack
        }
    }
};