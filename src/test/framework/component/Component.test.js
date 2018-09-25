var assert = require("assert");
var Component = require("../../../../src/js/framework/component/Component");

describe('Component', function () {
    describe('#contructor', function () {
        it('takes a container as string', function () {
            var component = new Component({
                container: "#element",
                state: {
                    foo: "bar"
                },
                render: function (state) {
                    return state || true;

                }
            });

            assert.equal(component.getContainer(), "#element");
        });
    });

    it('takes render method', function () {
        var component = new Component({
            container: "#element",
            state: {
                foo: "bar"
            },
            render: function (state) {
                return state || true;

            }
        });

        assert.equal(component.render(), "bar");
    });

});