var eventbus = null;
var sub = null;
var pub = null;
var component = null;
var fon = {};

var Comp = (function () {
    function Comp() {

    }

    Comp.prototype.usage = function () {
        window.fon.components = {};

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
            template: "<div style='{{style}}'> <p f-on:click='clickText(`asd`,`qwe`)' f-on:mouseenter='mouseEnter(this)'>{{text_1}}</p> <p f-on:click='clickText()'>{{text_2}}</p> <p>{{text_3}}</p> <p>{{text_4}}</p> <p>{{text_5}}</p> </div>",
            container: '#component',
            eventbus: eventbus,
            event: 'event1',
            methods: {
                clickText: function (value1, value2) {
                    console.log(value1);
                },
                mouseEnter: function (value) {
                    console.log(value);
                }
            }
        });
    };

    return Comp;
})();