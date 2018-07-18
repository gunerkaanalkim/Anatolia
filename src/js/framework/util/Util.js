function Util() {

}

Util.prototype.constructor = Util;

Util.flattenObject = function (obj) {
    var toReturn = {};

    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;

        if ((typeof obj[i]) === 'object') {
            var flatObject = Util.flattenObject(obj[i]);
            for (var x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) continue;

                toReturn[i + '.' + x] = flatObject[x];
            }
        } else {
            toReturn[i] = obj[i];
        }
    }
    return toReturn;
};

Util.observer = function (object, handler) {
    for (var prop in object) {
        if (object.hasOwnProperty(prop)) {
            if (!Array.isArray(object) && !Array.isArray(object[prop])) {
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
            }

            if (typeof object[prop] === "object") {
                Util.observer(object[prop], handler);
            }
        }
    }
};