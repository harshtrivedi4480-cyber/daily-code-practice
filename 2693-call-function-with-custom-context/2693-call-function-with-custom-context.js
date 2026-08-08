Function.prototype.callPolyfill = function(obj, ...args) {
    const key = Symbol();

    obj[key] = this;

    const result = obj[key](...args);

    delete obj[key];

    return result;
};