var eventbus = null;
var pub = null;
var pub2 = null;

var App = (function () {
    function App() {

    }

    App.prototype.start = function () {
        eventbus = new Eventbus();

        window.fon.components = {};

        pub = new Publisher('event1', {
            text_1: 'Sumer',
            text_2: 'Hitit',
            text_3: 'Hatti',
            text_4: 'Hurri',
            text_5: 'İskit',
            style: "font-size: 20px; text-align:center; padding:50px; background-color: " + '#' + Math.floor(Math.random() * 16777215).toString(16) + "; color: " + '#' + Math.floor(Math.random() * 16777215).toString(16) + "; "
        });

        pub2 = new Publisher('event2', {
            text_1: 'Türk',
            style: "font-size: 20px; text-align:center; padding:50px; background-color: " + '#' + Math.floor(Math.random() * 16777215).toString(16) + "; color: " + '#' + Math.floor(Math.random() * 16777215).toString(16) + "; "
        });

        eventbus.publisher().register(pub, pub2);

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

        var component_2 = new Component('myComponent', {
            template: "<div style='{{style}}'> <p f-on:click='clickText()' f-on:mouseenter='mouseEnter(this)'>{{text_1}}</p> </div>",
            event: 'event2',
            methods: {
                clickText: function (value1, value2) {
                    console.log('Holy Anatolia.JS');
                }
            }
        });

        //Routing
        var anatolia = new Anatolia({
            name: 'AnatoliaApp',
            eventbus: eventbus,
            components: {
                '#component_1': component,
                '#component_2': component_2
            }
        });

        anatolia.render();

        // anatolia.listen();
    };

    return App;
})();