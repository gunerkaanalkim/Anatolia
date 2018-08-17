function Observer() {

}

Observer.watch = function (object, handler) {
    for (var prop in object) {
        if (object.hasOwnProperty(prop)) {
            function _doObserver(object, prop, handler) {
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
                        handler(prop, object["_" + prop], newValue);
                        object["_" + prop] = newValue;
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