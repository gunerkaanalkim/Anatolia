var assert = require("assert");
var Eventbus = require("../../../../js/framework/state-management/eventbus/Eventbus");
var Publisher = require("../../../../js/framework/state-management/publisher/Publisher");

describe('Publisher', function () {
    describe('constructor#event', function () {
        it('Publisher has event attributes', function () {
            var publisher = new Publisher({
                event: "event_1",
                state: {foo: "bar"}
            });

            assert.equal(publisher.event(), 'event_1');

        });
    });

    describe('constructor#state', function () {
        it('Publisher has state attributes', function () {
            var publisher = new Publisher({
                event: "event_1",
                state: {foo: "bar"}
            });

            assert.equal(publisher.state().foo, 'bar');
        });
    });

    describe('propertyHandler', function () {
        it('Property handler methods must run after initialization.', function () {
            new Publisher({
                event: "event_1",
                state: {
                    foo: "bar"
                },
                propertyHandler: {
                    foo: function (key, value) {
                        assert.equal(key, 'foo');
                        assert.equal(value, 'bar');
                    }
                }
            });

        });
    });

    describe('computedProperties', function () {
        it('Computed Properties methods adds new property to state object.', function () {
            var publisher = new Publisher({
                event: "event_1",
                state: {
                    foo: "bar"
                },
                computedProperties: {
                    tar: function (state) {
                        return state.foo + " zar";
                    }
                }
            });

            assert.equal(publisher.state().tar, "bar zar");

        });
    });

});