var eventbus = null;

$(document).ready(function () {
    new Button().usage();

    new Textbox().usage();

    new ButtonGroup().usage();

    new Carousel().usage();

    new DataViewer().usage();

    new Selection().usage();

    pubsub();
});

var sub1;

function pubsub() {
    eventbus = new Eventbus();

    eventbus.publish('event_1', {
        foo: 'bar tar'
    });

    //TODO a subscriber should not subscribe to the same channel more than once, subscriber should define an ID during subscription
    eventbus.subscribe('event_1', function (state) {
        console.log('event_1 -> listener 1 -> state.foo = ' + state.foo + '}');
    });
}