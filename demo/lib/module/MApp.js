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
        eventbus = new Eventbus(); //TODO publsher change event with object propert set event

        // TODO publisher's data model for MVVM pattern
        // TODO publisher's computed properties
        var pub = new Publisher('event1', [
            {order: 1, name: 'Sumer'},
            {order: 2, name: 'Hitit'},
            {order: 3, name: 'Hatti'},
            {order: 4, name: 'Hurri'},
            {order: 5, name: 'İskit'}
        ]);

        var stylePub = new Publisher('styleEvent',
            {
                class: "table table-condensed table-striped table-hover",
                header: [
                    {text: "Order"},
                    {text: "Name"}
                ]
            }
        );

        eventbus.publisher().register(pub, stylePub);

        var tableComponent = new Component('table', {
            render: function (state) {
                var table = Component.createElement("table", {class: state.class});
                var thead = Component.createElement("thead"); // TODO  Component.createElement("table.table.table-condensed.table-striped > thead - tbody")
                var tbody = Component.createElement("tbody");
                var theadRow = Component.createElement("tr");

                Component.createElement("table.table.table-condensed.table-striped > thead,tbody");

                for(var i in state.header) {
                    if(state.header.hasOwnProperty(i)) {
                        var headerCell = Component.createElement("th", {text: state.header[i].text});
                        theadRow.append(headerCell);
                    }
                }

                thead.append(theadRow);
                table.append(thead);
                table.append(tbody);

                return table;
            }
        });

        var component = new Component('myComponent', {
            event: 'event1',
            render: function (state) {
                var $$ = Component.createElement;

                //TODO re-render containerless components when subscriber fired
                var table = tableComponent.setEventbus(eventbus).setEvent("styleEvent").render();

                for (var i in state) {
                    if (state.hasOwnProperty(i)) {
                        var tr = $$("tr");

                        var orderCell = $$("td", {text: state[i].order});
                        var nameCell = $$("td", {text: state[i].name});

                        tr.append(orderCell, nameCell);
                        table.children[1].append(tr);
                    }
                }

                return table;
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
    };

    return App;
})();