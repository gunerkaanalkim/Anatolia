function Observer() {

}

Observer.watch = function (object, handler) {
    for (var prop in object) {
        if (object.hasOwnProperty(prop)) {
            function _doObserver(object, prop, handler) {
                if (Array.isArray(object[prop])) {
                    Observer.listenArray(object[prop], handler);
                }

                Object.defineProperty(object, "_" + prop, {
                    value: object[prop],
                    enumerable: false,
                    writable: true,
                    configurable: true
                });

                Object.defineProperty(object, prop, {
                    get: function () {
                        return object["_" + prop];
                    },
                    set: function (newValue) {
                        var oldValue = object["_" + prop];
                        object["_" + prop] = newValue;
                        handler(prop, oldValue, newValue);
                    }
                });
            }

            _doObserver(object, prop, handler);

            if (typeof object[prop] === "object") {
                Util.observer(object[prop], handler);
            }
        }
    }
};

Observer.listenArray = function (arrayInstance, callback) {
    ['pop', 'push', 'reverse', 'shift', 'unshift', 'splice', 'sort'].forEach(function (methods) {
        arrayInstance[methods] = function () {
            var res = Array.prototype[methods].apply(arrayInstance, arguments);
            callback.apply(arrayInstance, arguments);
            return res;
        }
    });
};