function reverseParentheses(s) {
    let stack = [""];

    for (let ch of s) {
        if (ch === "(") {
            stack.push("");
        } 
        else if (ch === ")") {
            let current = stack.pop();

            current = current.split("").reverse().join("");

            stack[stack.length - 1] += current;
        } 
        else {
            stack[stack.length - 1] += ch;
        }
    }

    return stack[0];
}