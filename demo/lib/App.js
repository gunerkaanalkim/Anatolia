//TODO event channel
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

function pubsub() {
    // TODO  : publish in contsructor
    eventbus = new Eventbus();

    // Single Publishing
    eventbus.publish('event_4', {
        state: 'foo bar tar'
    });

    // Single Subscribing
    var subscribe = eventbus.subscribe('event_4', function (state) {
        console.log(state);
    });

    // Multiple Publishing
    eventbus.publish([
        {
            event: 'event_1',
            state: {
                foo1: 'bar1 tar1'
            }
        },
        {
            event: 'event_2',
            state: {
                foo2: 'bar2 tar2'
            }
        },
        {
            event: 'event_3',
            state: {
                foo3: 'bar3 tar3'
            }
        }
    ]);

    // Multiple Subscribing
    var subscribers = eventbus.subscribe([
        {
            event: 'event_1',
            listener: function (state) {
                console.log(state);
            }
        },
        {
            event: 'event_2',
            listener: function (state) {
                console.log(state);
            }
        },
        {
            event: 'event_3',
            listener: function (state) {
                console.log(state);
            }
        }
    ]);

    //Fire a specific event
    eventbus.fire('event_1');

    //Fire all events
    eventbus.fire();

    //Listen event bus
    eventbus.listen();
    //Callbacks removed
    eventbus.mute();

    eventbus.listen();
    //New Eventbus insctance
    eventbus.clean();
    eventbus.listen();
}
