/**
 * Anatolia utility class.
 *
 * @summary A abstraction for beautiful code.
 * @author Güner Kaan ALKIM <g.kaanalkim@gmail.com>
 * @version 0.1.0
 *
 * **/

function Util() {

}

Util.is = {
    /**
     * @function defined
     * @return true     -   if parameter is not undefined
     * **/
    defined: function (value) {
        return typeof value !== "undefined"
    },
    /**
     * @function null
     * @return true     -   if parameter is null
     * **/
    null: function (value) {
        return value === null;
    },
    /**
     * @function equal
     * @return true     -   if parameters is equal
     * **/
    equal: function (val1, val2) {
        return val1 === val2;
    },
    /**
     * @function function
     * @return true     -   if parameters is function
     * **/
    function: function (val) {
        return typeof val === "function";
    },
    /**
     * @function object
     * @return true     -   if parameters is object
     * **/
    object: function (val) {
        return typeof val === "object";
    },
    /**
     * @function string
     * @return true     -   if parameters is string
     * **/
    string: function (val) {
        return typeof val === "string";
    },
    /**
     * @function number
     * @return true     -   if parameters is number
     * **/
    number: function (val) {
        return typeof val === "number";
    },
    /**
     * @function date
     * @return true     -   if parameters is date
     * **/
    date: function (val) {
        return typeof val.getMonth === "function";
    },
    /**
     * @function array
     * @return true     -   if parameters is array
     * **/
    array: function (val) {
        return Array.isArray(val);
    },
    not: {
        /**
         * @function defined
         * @return true     -   if parameter is undefined
         * **/
        defined: function (value) {
            return !Util.is.defined(value);
        },
        /**
         * @function null
         * @return true     -   if parameter is not null
         * **/
        null: function (value) {
            return !Util.is.null(value);
        },
        /**
         * @function equal
         * @return true     -   if parameter is not equal
         * **/
        equal: function (val1, val2) {
            return !Util.is.equal(val1, val2);
        },
        /**
         * @function function
         * @return true     -   if parameter is not function
         * **/
        function: function (val) {
            return !Util.is.function(val);
        },
        /**
         * @function object
         * @return true     -   if parameter is not object
         * **/
        object: function (val) {
            return !Util.is.object(val);
        },
        /**
         * @function string
         * @return true     -   if parameter is not string
         * **/
        string: function (val) {
            return !Util.is.string(val);
        },
        /**
         * @function number
         * @return true     -   if parameter is not number
         * **/
        number: function (val) {
            return !Util.is.number(val);
        },
        /**
         * @function date
         * @return true     -   if parameter is not date
         * **/
        date: function (val) {
            return !Util.is.date(val);
        },
        /**
         * @function array
         * @return true     -   if parameter is not array
         * **/
        array: function (val) {
            return !Util.is.array(val);
        }
    }
};
