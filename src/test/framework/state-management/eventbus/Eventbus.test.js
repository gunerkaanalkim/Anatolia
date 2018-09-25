var assert = require("assert");
var Eventbus = require("../../../../js/framework/state-management/eventbus/Eventbus");
var Subscriber = require("../../../../js/framework/state-management/subscriber/Subscriber");
var Publisher = require("../../../../js/framework/state-management/publisher/Publisher");

describe('Eventbus', function () {
    describe('publisher()#register', function () {
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
});