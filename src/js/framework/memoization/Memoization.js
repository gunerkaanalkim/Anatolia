function Memoization() {
    this.cache = new MemoizationCache();
}

Memoization.prototype.add = function(fn) {
    return Memoization.arityControl({
        method: fn,
        cache: this.cache
    });
};

Memoization.arityControl = function (options) {
    var methodByArity = options.method.length === 1 ? Memoization.monadic : Memoization.variadic;

    return methodByArity.bind(this, options.method, options.cache);
};

Memoization.monadic = function (fn, cache, args) {
    var cacheKey = Memoization.serializer(args);

    var computedValue = cache.get(cacheKey);
    if (!cache.has(cacheKey)) {
        computedValue = fn.call(this, args);
        cache.set(cacheKey, computedValue)
    }

    return (function () {
        return computedValue;
    })(computedValue);
};

Memoization.variadic = function (fn, cache) {
    var args = Array.prototype.slice.call(arguments, 2);
    var cacheKey = Memoization.serializer(args);

    console.table(cache);

    var computedValue = cache.get(cacheKey);
    if (!cache.has(cacheKey)) {
        computedValue = fn.apply(this, args);
        cache.set(cacheKey, computedValue)
    }

    return (function () {
        return computedValue;
    })(computedValue);
};

Memoization.serializer = function () {
    return JSON.stringify(arguments);
};

function MemoizationCache() {
    this.cache = Object.create(null)
}

MemoizationCache.prototype.has = function (key) {
    return (key in this.cache)
};

MemoizationCache.prototype.get = function (key) {
    return this.cache[key]
};

MemoizationCache.prototype.set = function (key, value) {
    this.cache[key] = value
};

MemoizationCache.prototype.getCache = function () {
    return this.cache;
};