#include <string>
using namespace std;

class Solution {
public:
    bool isNumber(string s) {
        int n = s.length();
        int i = 0;
        
        bool seenDigit = false;
        bool seenDot = false;
        bool seenExp = false;
        
        for (i = 0; i < n; i++) {
            char c = s[i];
            
            if (c >= '0' && c <= '9') {
                seenDigit = true;
            }
            else if (c == '+' || c == '-') {
                // Sign must be first char overall, or immediately after 'e'/'E'
                if (i > 0 && s[i - 1] != 'e' && s[i - 1] != 'E') {
                    return false;
                }
            }
            else if (c == '.') {
                // No more than one dot, and no dot after exponent
                if (seenDot || seenExp) {
                    return false;
                }
                seenDot = true;
            }
            else if (c == 'e' || c == 'E') {
                // No more than one 'e', and must have seen a digit before it
                if (seenExp || !seenDigit) {
                    return false;
                }
                seenExp = true;
                seenDigit = false; // reset: need at least one digit after 'e'
            }
            else {
                // Any other character is invalid
                return false;
            }
        }
        
        // Valid only if we ended having seen at least one digit
        // (this also ensures digits exist after 'e' if exponent was used)
        return seenDigit;
    }
};