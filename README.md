# Anatolia 
Understandable and human-readable JavaScript framework for amazing UI/UX

**Dev Installation** 

```
git clone https://github.com/gunerkaanalkim/Anatolia.git
cd Anatolia
rm -rf .git
bower install
//foo
//bar
//tar
```

**Sample Component**
```js
var pub = new Publisher({
    event: 'event1',
    state: [
        {order: 1, name: 'Sumer'},
        {order: 2, name: 'Hitit'},
        {order: 3, name: 'Hatti'},
        {order: 4, name: 'Hurri'},
        {order: 5, name: 'İskit'}
    ]
});

var stylePub = new Publisher({
    event: 'styleEvent',
    state: {
        class: "table table-condensed table-striped table-hover",
        header: [
            {text: "Order"},
            {text: "Name"}
        ],
        propA: "my",
        propB: "Class"
    },
    propertyHandler: { // for MVVM pattern
        class: function (key, value) {
            console.log(key);
        },
        header: function (key, value) {
            // console.log(value);
        }
    },
    computedProperties: { // for new property
        newProp: function (state) {
            return state.propA + state.propB;
        }
    }
});

var tableResponsivePub = new Publisher({
        event: 'tableResponsive',
        state: {
            class: "table-responsive"
        }
    }
);

eventbus.publisher().register(pub, stylePub, tableResponsivePub);

var tableResponsiveComponent = new Component("tableResponsive", {
    render: function (state) {
        var responsiveContainer = document.createElement("template");
        responsiveContainer.innerHTML = "<div class=" + state.class + "></div>";

        return responsiveContainer.content.firstChild;
    }
}).setEventbus(eventbus).setEvent('tableResponsive');

var tableComponent = new Component('table', {
    render: function (state) {
        var table = Component.createElement("table", {class: state.class});
        var thead = Component.createElement("thead");
        var tbody = Component.createElement("tbody");
        var theadRow = Component.createElement("tr");

        for (var i in state.header) {
            if (state.header.hasOwnProperty(i)) {
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

var tableFooterComponent = new Component("tfoot", {
    render: function () {
        var el = Component.createElementFromObject({
            tagName: "tfoot",
            class: "tfoot",
            id: "tfoot",
            myAttribute: "tfoot",
            child: [
                {
                    tagName: "tr",
                    child: [
                        {
                            tagName: "td",
                            text: "Hello"
                        },
                        {
                            tagName: "td",
                            text: "World"
                        }
                    ]
                }
            ]
        });

        return el;
    },
    methods: {
        'td': {
            click: function (e) {
                console.log(this);
            }
        }
    }
});

var component = new Component('myComponent', {
    event: 'event1',
    render: function (state) {
        var $$ = Component.createElement;

        var tableResponsiveContainer = tableResponsiveComponent.render();
        var table = tableComponent.setEventbus(eventbus).setEvent("styleEvent").render();
        var tableFooter = tableFooterComponent.render();

        for (var i in state) {
            if (state.hasOwnProperty(i)) {
                var tr = $$("tr");

                var orderCell = $$("td", {text: state[i].order});
                var nameCell = $$("td", {text: state[i].name});

                tr.append(orderCell, nameCell);
                table.children[1].append(tr);
            }
        }

        table.append(tableFooter);
        tableResponsiveContainer.append(table);

        return tableResponsiveContainer;
    },
    methods: { // or Component.createElement 's on function
        // 'tr': { // all selectors; (.), (#), (tag name)
        //     click: function (e) {
        //         console.log(this.targetElement);
        //     }
        // }
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
```
