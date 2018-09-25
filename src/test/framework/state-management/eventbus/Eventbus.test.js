var assert = require("assert");
var Eventbus = require("../../../../js/framework/state-management/eventbus/Eventbus");
var Subscriber = require("../../../../js/framework/state-management/subscriber/Subscriber");
var Publisher = require("../../../../js/framework/state-management/publisher/Publisher");

describe('Eventbus', function () {
    describe('publisher()#register-single', function () {
        it('Eventbus registers a publisher', function () {
            var eventbus = new Eventbus();

            var publisher = new Publisher({
                event: "event_1",
                state: {foo: "bar"}
            });

            eventbus.publisher().register(publisher);

            assert.equal(eventbus.getSubscriptionList()[0], "event_1");
        });
    });

    describe('publisher()#register-multiple', function () {
        it('Eventbus registers multiple publishers', function () {
            var eventbus = new Eventbus();

            var publisher_1 = new Publisher({
                event: "event_1",
                state: {foo: "bar"}
            });

            var publisher_2 = new Publisher({
                event: "event_2",
                state: {foo: "bar"}
            });

            eventbus.publisher().register(publisher_1, publisher_2);

            assert.equal(eventbus.getSubscriptionList()[0], "event_1");
            assert.equal(eventbus.getSubscriptionList()[1], "event_2");
        });
    });

    describe('subscriber()#register-single', function () {
        it('Eventbus registers a subscriber', function () {
            var eventbus = new Eventbus();

            var publisher_1 = new Publisher({
                event: "event_1",
                state: {foo: "bar"}
            });

            eventbus.publisher().register(publisher_1);

            var subscriber = new Subscriber({
                id: "sub1",
                event: "event_1",
                callback: function (state) {
                    assert.equal(state.event_1.foo, "bar");
                }
            });

            eventbus.subscriber().register(subscriber);
        });
    });

    describe('subscriber()#register-multiple', function () {
        it('Eventbus registers multiple subscribers', function () {
            var eventbus = new Eventbus();

            var publisher_1 = new Publisher({
                event: "event_1",
                state: {
                    foo: "bar",
                    tar: "zar"
                }
            });

            eventbus.publisher().register(publisher_1);

            var subscriber_1 = new Subscriber({
                id: "sub1",
                event: "event_1",
                callback: function (state) {
                    assert.equal(state.event_1.foo, "bar");
                }
            });

            var subscriber_2 = new Subscriber({
                id: "sub2",
                event: "event_1",
                callback: function (state) {
                    assert.equal(state.event_1.tar, "zar");
                }
            });

            eventbus.subscriber().register(subscriber_1, subscriber_2);
        });
    });

    describe('publisher()#fire', function () {
        it('Eventbus publisher()\'s fire method trigger callback of subscriber of publisher.', function () {
            var eventbus = new Eventbus();

            var publisher_1 = new Publisher({
                event: "event_1",
                state: {
                    foo: "bar",
                    tar: "zar"
                }
            });

            eventbus.publisher().register(publisher_1);

            var subscriber_1 = new Subscriber({
                id: "sub1",
                event: "event_1",
                callback: function (state) {
                    assert.equal(state.event_1.foo, "bar");
                }
            });

            var subscriber_2 = new Subscriber({
                id: "sub2",
                event: "event_1",
                callback: function (state) {
                    assert.equal(state.event_1.tar, "zar");
                }
            });

            eventbus.subscriber().register(subscriber_1, subscriber_2);
            eventbus.publisher().fire(publisher_1);

        });
    });
});