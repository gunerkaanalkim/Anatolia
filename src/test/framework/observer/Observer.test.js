var assert = require("assert");
var Observer = require("../../../../src/js/framework/observer/Observer");

describe('Observer', function () {
    describe('Object watching', function () {
        it('Handler method gives key, old value and new value.', function () {
            var obj = {
                name: "Güner ALKIM",
                email: "g.kaanalkim@gmail.com"
            };

            Observer.watch(obj, function (key, oldValue, newValue) {
                assert.equal(key, "name");
                assert.equal(oldValue, "Güner ALKIM");
                assert.equal(newValue, "Güner Kaan ALKIM");
            });

            obj.name = "Güner Kaan ALKIM";
        });
    });
});