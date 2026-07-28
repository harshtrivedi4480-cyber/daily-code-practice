class Solution {
public:
    string countAndSay(int n) {
        string result = "1";
        
        for (int i = 2; i <= n; i++) {
            string next = "";
            int count = 1;
            
            for (int j = 1; j <= (int)result.size(); j++) {
                if (j < (int)result.size() && result[j] == result[j - 1]) {
                    count++;
                } else {
                    next += to_string(count) + result[j - 1];
                    count = 1;
                }
            }
            
            result = next;
        }
        
        return result;
    }
};