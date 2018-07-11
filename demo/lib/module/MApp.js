var eventbus;
var eventbus2;

var App = (function () {
    function App() {

    }

    App.prototype.singleComponent = function () {
        eventbus = new Eventbus();

        var pub = new Publisher('event1', {
            text_1: {
                state: 'Sumer',
                year: {
                    start: 'c. 4500',
                    end: 'c. 1900 BC'
                }
            },
            text_2: 'Hitit',
            text_3: 'Hatti',
            text_4: 'Hurri',
            text_5: 'İskit',
            style: "font-size: 20px; text-align:center; padding:50px; background-color: " + '#' + Math.floor(Math.random() * 16777215).toString(16) + "; color: " + '#' + Math.floor(Math.random() * 16777215).toString(16) + "; "
        });

        var pub2 = new Publisher('event2', {
            text_1: 'Türk',
            style: "font-size: 20px; text-align:center; padding:50px; background-color: " + '#' + Math.floor(Math.random() * 16777215).toString(16) + "; color: " + '#' + Math.floor(Math.random() * 16777215).toString(16) + "; "
        });

        eventbus.publisher().register(pub, pub2);

        var component = new Component('myComponent', {
            render: function (state) {
                var el = document.createElement("p");
                el.innerText = "Hittites";
                el.setAttribute("style", state.style);

                return el;
            },
            event: 'event1'
        });

        var component_2 = new Component('myComponent', {
            render: function (state) {
                var el = document.createElement("p");
                el.innerText = "Hurries";
                el.setAttribute("style", state.style);

                return el;
            },
            event: 'event2'
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

    App.prototype.nestedComponents = function () {
        eventbus2 = new Eventbus();

        var pub = new Publisher('event1', {
            list: {
                items: [
                    {
                        id: '1',
                        text: "Sümer",
                        value: 'S'
                    },
                    {
                        id: '2',
                        text: "Hitit",
                        value: 'H'
                    },
                    {
                        id: '3',
                        text: "Hatti",
                        value: 'Ht'
                    },
                    {
                        id: '4',
                        text: "Hurri",
                        value: 'Hr'
                    },
                    {
                        id: '5',
                        text: "İskit",
                        value: 'İ'
                    }
                ]
            },
            text_1: 'Loop Example'
        });

        eventbus2.publisher().register(pub);

        var component = new Component('myComponent', {
            template: "",
            dynamicRender: [
                {
                    selector: 'li',
                    data: 'list.items',
                    index: 'item'
                }
            ],
            event: 'event1',
            methods: {
                'li': {
                    click: function () {
                        console.log(this);
                    }
                }
            }
        });

        var anatolia = new Anatolia({
            name: 'AnatoliaApp2',
            eventbus: eventbus2,
            components: {
                '#component_3': component
            }
        });

        anatolia.render();
    };

    return App;
})();