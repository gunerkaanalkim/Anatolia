var assert = require('assert');
var Util = require('../../js/framework/util/Util');

describe('Util', function () {

    /**
     * Util.is
     * **/
    describe('is#defined(val)', function () {
        it('returns true if parameter is defined', function () {
            var is = Util.is;

            var val1 = 1;

            assert.equal(is.defined(val1), true);
        });
    });

    describe('is#null(val)', function () {
        it('returns true if parameter is null', function () {
            var is = Util.is;

            var val1 = null;

            assert.equal(is.null(null), true);
        });
    });

    describe('is#equal(val)', function () {
        it('returns true if parameters equal', function () {
            var is = Util.is;

            assert.equal(is.equal(1, 1), true);
        });
    });

    describe('is#function(val)', function () {
        it('returns true if parameter is a function  ', function () {
            var is = Util.is;

            var param = function () {
            };

            assert.equal(is.function(param), true);
        });
    });

    describe('is#object(val)', function () {
        it('returns true if parameter is an object', function () {
            var is = Util.is;

            var param = new Object();

            assert.equal(is.object(param), true);
        });
    });

    describe('is#string(val)', function () {
        it('returns true if parameter is an string', function () {
            var is = Util.is;

            var param = "Test String";

            assert.equal(is.string(param), true);
        });
    });

    describe('is#number(val)', function () {
        it('returns true if parameter is a number', function () {
            var is = Util.is;

            var param = 1;

            assert.equal(is.number(param), true);
        });
    });

    describe('is#date(val)', function () {
        it('returns true if parameter is a date', function () {
            var is = Util.is;

            var param = new Date();

            assert.equal(is.date(param), true);
        });
    });

    describe('is#array(val)', function () {
        it('returns true if parameter is an array', function () {
            var is = Util.is;

            var param = [1, 2, 3];

            assert.equal(is.array(param), true);
        });
    });

    /**
     * Util.is.not
     * **/
    describe('is.not#defined(val)', function () {
        it('returns true if parameter is.not defined', function () {
            var is = Util.is;

            var val1 = undefined;

            assert.equal(is.not.defined(val1), true);
        });
    });

    describe('is.not#null(val)', function () {
        it('returns true if parameter is.not null', function () {
            var is = Util.is;

            var val1 = 1;

            assert.equal(is.not.null(val1), true);
        });
    });

    describe('is.not#equal(val)', function () {
        it('returns true if parameters equal', function () {
            var is = Util.is;

            assert.equal(is.not.equal(1, 2), true);
        });
    });

    describe('is.not#function(val)', function () {
        it('returns true if parameter is.not a function  ', function () {
            var is = Util.is;

            var param = [];

            assert.equal(is.not.function(param), true);
        });
    });

    describe('is.not#object(val)', function () {
        it('returns true if parameter is.not an object', function () {
            var is = Util.is;

            var param = "";

            assert.equal(is.not.object(param), true);
        });
    });

    describe('is.not#string(val)', function () {
        it('returns true if parameter is.not an string', function () {
            var is = Util.is;

            var param = 1;

            assert.equal(is.not.string(param), true);
        });
    });

    describe('is.not#number(val)', function () {
        it('returns true if parameter is.not a number', function () {
            var is = Util.is;

            var param = "";

            assert.equal(is.not.number(param), true);
        });
    });

    describe('is.not#date(val)', function () {
        it('returns true if parameter is.not a date', function () {
            var is = Util.is;

            var param = "01.01.1970";

            assert.equal(is.not.date(param), true);
        });
    });

    describe('is.not#array(val)', function () {
        it('returns true if parameter is.not an array', function () {
            var is = Util.is;

            var param = {name: "Kaan ALKIM"};

            assert.equal(is.not.array(param), true);
        });
    });
});