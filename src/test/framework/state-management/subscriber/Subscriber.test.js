var assert = require("assert");
var Subscriber = require("../../../../js/framework/state-management/subscriber/Subscriber");

describe('Subscriber', function () {
    describe('constructor#id', function () {
        it('Subscriber has id attributes', function () {
            var subscriber = new Subscriber({
                id: "sub1",
                event: "e1",
                callback: function (state) {
                    return true;
                }
            });

            assert.equal(subscriber.getId(), "sub1");

        });
    });

    describe('constructor#event', function () {
        it('Subscriber has event attributes', function () {
            var subscriber = new Subscriber({
                id: "sub1",
                event: "event_1",
                callback: function (state) {
                    return true;
                }
            });

            assert.equal(subscriber.event(), "event_1");
        });
    });

    describe('constructor#multiple-event', function () {
        it('Subscriber subscribes multiple events.', function () {
            var subscriber = new Subscriber({
                id: "sub1",
                event: ['e1', 'e2', 'e3'],
                callback: function (state) {
                    return true;
                }
            });

            assert.equal(subscriber.event()[0], "e1");
        });
    });

    describe('constructor#callback', function () {
        it('Subscriber has callback attributes', function () {
            var subscriber = new Subscriber({
                id: "sub1",
                event: "event_1",
                callback: function (state) {
                    return true;
                }
            });

            assert.equal(subscriber.callback()(), true);
        });
    });
});