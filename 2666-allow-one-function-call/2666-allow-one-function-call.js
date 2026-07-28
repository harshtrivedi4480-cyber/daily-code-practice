/**
 * @param {Function} fn
 * @return {Function}
 */
function once(fn) {
    let called = false;
    let result;
    
    return function(...args) {
        if (called) {
            return undefined;
        }
        called = true;
        result = fn(...args);
        return result;
    };
}
