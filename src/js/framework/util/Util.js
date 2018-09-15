function Util() {

}

Util.is = {
    defined: function (value) {
        return typeof value !== "undefined"
    },
    null: function (value) {
        return value === null;
    },
    equal: function (val1, val2) {
        return val1 === val2;
    },
    function: function (val) {
        return typeof val === "function";
    },
    object: function (val) {
        return typeof val === "object";
    },
    string: function (val) {
        return typeof val === "string";
    },
    number: function (val) {
        return typeof val === "number";
    },
    date: function (val) {
        return typeof val.getMonth === "function";
    },
    not: {
        defined: function (value) {
            return !Util.is.defined(value);
        },
        null: function (value) {
            return !Util.is.null(value);
        },
        equal: function (val1, val2) {
            return !Util.is.equal(val1, val2);
        },
        function: function (val) {
            return !Util.is.function(val);
        },
        object: function (val) {
            return !Util.is.object(val);
        },
        string: function (val) {
            return !Util.is.string(val);
        },
        number: function (val) {
            return !Util.is.number(val);
        },
        date: function (val) {
            return !Util.is.date(val);
        }
    }
};
