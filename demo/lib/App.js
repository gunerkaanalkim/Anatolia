//TODO event channel
var eventbus = null;
var eventbus2 = null;

var publisher_1 = null;
var publisher_2 = null;
var publisher_3 = null;

var subscriber_1 = null;
var subscriber_2 = null;
var subscriber_3 = null;
var subscriber_4 = null;

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
