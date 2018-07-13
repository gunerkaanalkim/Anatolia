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
        eventbus = new Eventbus();

        // TODO publisher's data model for MVVM pattern
        // TODO publisher's computed properties
        var pub = new Publisher('event1', [
            {order: 1, name: 'Sumer'},
            {order: 2, name: 'Hitit'},
            {order: 3, name: 'Hatti'},
            {order: 4, name: 'Hurri'},
            {order: 5, name: 'İskit'}
        ]);

        var stylePub = new Publisher('styleEvent', [
            {class: 1, name: "table table-condensed table-striped table-hover"}
        ]);

        eventbus.publisher().register(pub, stylePub);

        var tableComponent = new Component('table', {
            render: function (state) {
                return Component.createElement("table", {class: "table table-condensed table-striped table-hover"});
            }
        });

        var component = new Component('myComponent', {
            event: 'event1',
            render: function (state) {
                var $$ = Component.createElement;

                var table = tableComponent.setEventbus(eventbus).setEvent("styleEvent").render();

                var thead = $$("thead");
                var tbody = $$("tbody");
                var theadRow = $$("tr");
                var orderCellThead = $$("th", {text: "Order"});

                var nameCellThead = $$("th", {text: "Name"});

                theadRow.append(orderCellThead, nameCellThead);
                thead.append(theadRow);
                table.append(thead);
                table.append(tbody);

                for (var i in state) {
                    if (state.hasOwnProperty(i)) {
                        var tr = $$("tr");

                        var orderCell = $$("td", {text: state[i].order});
                        var nameCell = $$("td", {text: state[i].name});

                        tr.append(orderCell, nameCell);
                        tbody.append(tr);
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