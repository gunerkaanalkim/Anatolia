/**
 * Anatolia Observer pattern toolkit
 * Returns a html collection.
 *
 * @summary Applys observer patters to given object
 *
 * @author Güner Kaan ALKIM <g.kaanalkim@gmail.com>
 * @version 1.0.1
 *
 * **/
function Observer() {

}

/**
 * @summary Makes observable objects
 *
 * @static
 * @function watch
 *
 * @param {object}      object   -   JS object
 * @param {function}    handler  -   Triggers after first parameter's attribute assignment
 *
 * @return nothing
 * **/
Observer.watch = function (object, handler) {
    for (var prop in object) {
        if (object.hasOwnProperty(prop)) {
            function _doObserver(object, prop, handler) {
                if (Array.isArray(object)) {
                    Observer.listenArray(object, handler);
                } else if (Array.isArray(object[prop])) {
                    Observer.listenArray(object[prop], handler);
                } else {
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
                            Observer.watch(object, handler); // re-observer all object
                            handler(prop, oldValue, newValue);
                        }
                    });
                }
            }

            _doObserver(object, prop, handler);

            if (typeof object[prop] === "object") {
                Observer.watch(object[prop], handler);
            }
        }
    }
};

/**
 * @summary  Makes observable arrays. This method apply monkey patch to first parameter's method. When a Array method call, firstly, real array method calls and then calls handler method
 *
 * @static
 * @function listenArray
 *
 * @param {array}       arrayInstance   -   JS object
 * @param {function}    handler         -   Triggers after first parameter's attribute assignment
 *
 * @return nothing
 * **/
Observer.listenArray = function (arrayInstance, handler) {
    var methodsOfArray = ['pop', 'push', 'reverse', 'shift', 'unshift', 'splice', 'sort'];

    methodsOfArray.forEach(function (methods) {
        arrayInstance[methods] = function () {
            var val = Array.prototype[methods].apply(arrayInstance, arguments);
            handler.apply(arrayInstance, arguments);
            return val;
        }
    });
};