import java.util.*;

class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        // Map: sorted-character-key -> list of original strings
        Map<String, List<String>> map = new HashMap<>();
        
        for (String str : strs) {
            // Convert to char array, sort it, use as key
            char[] chars = str.toCharArray();
            Arrays.sort(chars);
            String key = new String(chars);
            
            // Group strings with the same sorted key together
            map.computeIfAbsent(key, k -> new ArrayList<>()).add(str);
        }
        
        return new ArrayList<>(map.values());
    }
}