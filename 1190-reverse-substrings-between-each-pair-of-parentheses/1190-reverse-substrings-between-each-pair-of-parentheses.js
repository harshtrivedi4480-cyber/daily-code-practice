function reverseParentheses(s) {
    let stack = [""];
    
    for (let ch of s) {
        if (ch === "(") {
            // Start a new level
            stack.push("");
        } 
        else if (ch === ")") {
            // Get the current substring
            let current = stack.pop();
            
            // Reverse it and add it to previous level
            stack[stack.length - 1] += current.split("").reverse().join("");
        } 
        else {
            // Normal character
            stack[stack.length - 1] += ch;
        }
    }

    return stack[0];
}