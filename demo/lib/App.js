//TODO event channel
$(document).ready(function () {
    new Button().usage();

    new Textbox().usage();

    new ButtonGroup().usage();

    new Carousel().usage();

    new DataViewer().usage();

    new Selection().usage();

    pubsub();
});

var eventbus = null;

var publisher_1 = null;
var publisher_2 = null;
var publisher_3 = null;

var subscriber_1 = null;
var subscriber_2 = null;
var subscriber_3 = null;

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

    [publisher_1, publisher_2, publisher_3].forEach(function (value) {
        eventbus.publisher().register(value);
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

    [subscriber_1, subscriber_2, subscriber_3].forEach(function (subscriber) {
        eventbus.subscriber().register(subscriber);
    });

    //Trigger spesific publisher
    eventbus.publisher().fire(publisher_1);


    //Listen event bus
    console.log(eventbus.listen());
    //Callbacks removed
    eventbus.mute();

    console.log(eventbus.listen());

    //New Eventbus insctance
    eventbus.clean();
    console.log(eventbus.listen());
}
