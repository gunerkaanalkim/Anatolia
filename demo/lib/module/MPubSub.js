var eventbus = null;

var publisher_1 = null;
var publisher_2 = null;
var publisher_3 = null;

var subscriber_1 = null;
var subscriber_2 = null;
var subscriber_3 = null;
var subscriber_4 = null;
var subscriber_5 = null;

var PubSub = (function () {
    function PubSub() {
    }

    PubSub.prototype.usage = function () {
        eventbus = new Eventbus();

        publisher_1 = new Publisher({
            event: "e1",
            state: {number: "one"}
        });

        publisher_2 = new Publisher({
            event: "e2",
            state: {number: "two"}
        });

        publisher_3 = new Publisher({
            event: "e3",
            state: {number: "three"},
            propertyHandler: {
                key: function (key, value) {
                    // console.log(key);
                }
            },
            computedProperties: {
                newNumber: function (state) {
                    return "four";
                }
            }
        });

        // eventbus.publisher().register(publisher_1); // register single publisher
        // eventbus.publisher().register(publisher_1, publisher_2); // register multiple publisher

        [publisher_1, publisher_2, publisher_3].forEach(function (publisher) {
            // console.log(publisher);
            eventbus.publisher().register(publisher);
        });

        subscriber_1 = new Subscriber({
            id: "sub1",
            event: "e1",
            callback: function (state) {
                console.log(state);
            }
        });

        subscriber_2 = new Subscriber({
            id: "sub2",
            event: "e2",
            callback: function (state) {
                console.log(state);
            }
        });

        subscriber_3 = new Subscriber({
            id: "sub3",
            event: "e3",
            callback: function (state) {
                console.log(state);
            }
        });

        subscriber_4 = new Subscriber({
            id: "sub4",
            event: ['e1', 'e2', 'e3'],
            callback: function (state) {
                console.log(state);
            }
        });

        // eventbus.subscriber().register(subscriber_1); // register single subscriber
        // eventbus.subscriber().register(subscriber_1, subscriber_2); // register multiple subscriber

        [subscriber_1, subscriber_2, subscriber_3, subscriber_4].forEach(function (subscriber) {
            eventbus.subscriber().register(subscriber);
        });

        var state = {
            class: "table table-condensed table-striped table-hover",
            header: [
                {text1: "Order"},
                {text2: "Name"}
            ],
            otherProp: {asd: "asd"},
            propA: "my",
            propB: "Class"
        };

        Util.observer(state, function (key, oldValue, newValue) {
            console.log("key : " + key + " oldValue : " + oldValue + " newValue :" + newValue);
        });

    };

    return PubSub;
})();