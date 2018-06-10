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
            text_4: new LoremIpsum().generate(5),
            text_5: new LoremIpsum().generate(5),
            style: "font-size: 20px; text-align:center; padding:50px; background-color: " + '#' + Math.floor(Math.random() * 16777215).toString(16) + "; color: " + '#' + Math.floor(Math.random() * 16777215).toString(16) + "; "
        });
        eventbus.publisher().register(pub);

        component = new Component('myComponent', {
            container: '#component',
            eventbus: eventbus,
            event: 'event1',
            template: "<div style='{{style}}'> <p>{{text_1}}</p> <p>{{text_2}}</p> <p>{{text_3}}</p> <p>{{text_4}}</p> <p>{{text_5}}</p> </div>"
        });
    };

    return Comp;
})();