var eventbus = null;
var pub = null;

var App = (function () {
    function App() {

    }

    App.prototype.start = function () {
        eventbus = new Eventbus();

        window.fon.components = {};

        pub = new Publisher('event1', {
            text_1: new LoremIpsum().generate(5),
            text_2: new LoremIpsum().generate(5),
            text_3: new LoremIpsum().generate(5),
            text_4: new LoremIpsum().generate(5),
            text_5: new LoremIpsum().generate(5),
            style: "font-size: 20px; text-align:center; padding:50px; background-color: " + '#' + Math.floor(Math.random() * 16777215).toString(16) + "; color: " + '#' + Math.floor(Math.random() * 16777215).toString(16) + "; "
        });

        eventbus.publisher().register(pub);

        var component = new Component('myComponent', {
            template: "<div style='{{style}}'> <p f-on:click='clickText(`asd`,`qwe`)' f-on:mouseenter='mouseEnter(this)'>{{text_1}}</p> <p f-on:click='clickText()'>{{text_2}}</p> <p>{{text_3}}</p> <p>{{text_4}}</p> <p>{{text_5}}</p> </div>",
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

        //Routing
        var anatolia = new Anatolia({
            name: 'AnatoliaApp',
            eventbus: eventbus,
            components: {
                '#component_1': component
            }
        });

        anatolia.render();

        // anatolia.listen();
    };

    return App;
})();