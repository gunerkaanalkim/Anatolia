//TODO event channel
var eventbus = null;
var publisher_1 = null;
var publisher_2 = null;
var publisher_3 = null;
var subscriber_1 = null;
var subscriber_2 = null;
var subscriber_3 = null;

$(document).ready(function () {
    new Button().usage();

    new Textbox().usage();

    new ButtonGroup().usage();

    new Carousel().usage();

    new DataViewer().usage();

    new Selection().usage();

    pubsub();
});

function pubsub() {
    // TODO  : publish in contsructor
    eventbus = new Eventbus();

    publisher_1 = new Publisher('event_1', {
        foo: 'bar'
    });

    publisher_2 = new Publisher('event_2', {
        zar: 'tar'
    });

    publisher_3 = new Publisher('event_3', {
        car: 'tır'
    });

    var publisherArr = [publisher_1, publisher_2, publisher_3];
    publisherArr.forEach(function (value) {
        eventbus.publisher.register(value);
    });

    subscriber_1 = new Subscriber('event_1', function (state) {
        console.log(state);
    });

    subscriber_2 = new Subscriber('event_2', function (state) {
        console.log(state);
    });

    subscriber_3 = new Subscriber('event_3', function (state) {
        console.log(state);
    });

    var subscriberArr = [subscriber_1, subscriber_2, subscriber_3];

    subscriberArr.forEach(function (subscriber) {
        eventbus.subscriber.register(subscriber);
    });

    //Trigger spesific publisher
    eventbus.publisher.fire(publisher_1);


    // subscriber = new Subscriber('event_1', function (state) {
    //     console.log(state);
    // });

    // eventbus.publisher.register([
    //     publisher_1,
    //     publisher_2
    // ]);
    // eventbus.publisher.register(publisher_1);

    // // Single Publishing
    // eventbus.publish('event_4', {
    //     state: 'foo bar tar'
    // });
    //
    // // Single Subscribing
    // var subscribe = eventbus.subscribe('event_4', function (state) {
    //     console.log(state);
    // });

    // Multiple Publishing
    // eventbus.publisher.register([
    //     {
    //         event: 'event_1',
    //         state: {
    //             foo1: 'bar1 tar1'
    //         }
    //     },
    //     {
    //         event: 'event_2',
    //         state: {
    //             foo2: 'bar2 tar2'
    //         }
    //     },
    //     {
    //         event: 'event_3',
    //         state: {
    //             foo3: 'bar3 tar3'
    //         }
    //     }
    // ]);
    //
    // // Multiple Subscribing
    // var subscribers = eventbus.subscribe([
    //     {
    //         event: 'event_1',
    //         listener: function (state) {
    //             // console.log(state);
    //         }
    //     },
    //     {
    //         event: 'event_2',
    //         listener: function (state) {
    //             // console.log(state);
    //         }
    //     },
    //     {
    //         event: 'event_3',
    //         listener: function (state) {
    //             // console.log(state);
    //         }
    //     }
    // ]);
    //
    // console.log(eventbus.listen());


    // //Fire a specific event
    // eventbus.fire('event_1');
    //
    // //Fire all events
    // eventbus.fire();
    //
    // //Listen event bus
    // eventbus.listen();
    // //Callbacks removed
    // eventbus.mute();
    //
    // eventbus.listen();
    // //New Eventbus insctance
    // eventbus.clean();
    // eventbus.listen();
}
