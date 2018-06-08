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

var sub1;

function pubsub() {
    eventbus = new Eventbus();

    eventbus.publish('event_1', {
        foo: 'bar tar'
    });

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

    eventbus.subscribe('event_1', function (state) {
        console.log(state);
    }).unsubscribe();

    eventbus.subscribe('event_2', function (state) {
        console.log(state);
    });

    eventbus.subscribe('event_3', function (state) {
        console.log(state);
    });
}