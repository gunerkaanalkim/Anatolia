var eventbus = null;
var sub = null;
var pub = null;
var component = null;

var Comp = (function () {
    function Comp() {

    }

    Comp.prototype.usage = function () {
        eventbus = new Eventbus();

        pub = new Publisher('event1', {
            text_1: new LoremIpsum().generate(5),
            text_2: new LoremIpsum().generate(5),
            text_3: new LoremIpsum().generate(5),
            style: "text-align:center; padding:50px; background-color: #c1c1c1; color: blue; "
        });
        eventbus.publisher().register(pub);

        setInterval(function (args) {
            pub = new Publisher('event1', {
                text_1: new LoremIpsum().generate(5),
                text_2: new LoremIpsum().generate(5),
                text_3: new LoremIpsum().generate(5),
                style: "text-align:center; padding:50px; background-color: " + '#' + Math.floor(Math.random() * 16777215).toString(16) + "; color: " + '#' + Math.floor(Math.random() * 16777215).toString(16) + "; "
            });
            eventbus.publisher().register(pub);
        }, 2000);

        component = new Component('myComponent', {
            container: '#component',
            eventbus: eventbus,
            event: 'event1',
            template: "<div style='{{style}}'><p>{{text_1}}</p> <p>{{text_1}}</p> <p>{{text_1}}</p> </div>"
        });
    };

    return Comp;
})();