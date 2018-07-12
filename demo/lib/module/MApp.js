var eventbus;
var eventbus2;

var App = (function () {
    function App() {

    }

    App.prototype.singleComponent = function () {
        eventbus = new Eventbus();

        // TODO publisher's data model for MVVM pattern
        // TODO publisher's computed properties
        var pub = new Publisher('event1', [
            {name: 'Sumer'},
            {name: 'Hitit'},
            {name: 'Hatti'},
            {name: 'Hurri'},
            {name: 'İskit'}
        ]);

        eventbus.publisher().register(pub);

        var component = new Component('myComponent', {
            event: 'event1',
            render: function (state) {
                var ce = Component.createElement;

                var ul = ce("ul", {class: "list-group"});

                for (var i in state) {
                    if (state.hasOwnProperty(i)) {
                        var li = Component.createElement("li", {class: "list-group-item", text: state[i].name});
                        ul.append(li);
                    }
                }

                return ul;
            },
            methods: { // or Component.createElement 's on function
                'li': { // all selectors; (.), (#), (tag name)
                    click: function (e) {
                        console.log(this.targetElement);
                    }
                },
                '#myLi': {
                    mouseenter: function (e) {
                        console.log("mouse enter");
                    }
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