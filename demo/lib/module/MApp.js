var eventbus;
var tableResponsiveComponent;
var tableComponent;
var tableFooterComponent;
var component;
var eventbus;
var sub;
var state;
var arr;
var todoItemPublisher;
var eventbus;
var todoItemOrderPublisher;
var todoApp;
var button1;
var button2;
var list;


var App = (function () {
    function App() {

    }

    App.prototype.singleComponent = function () {
        eventbus = new Eventbus();

        var pub = new Publisher({
            event: 'event1',
            state: [
                {name: 'Sumer'},
                {name: 'Hitit'},
                {name: 'Hatti'},
                {name: 'Hurri'},
                {name: 'İskit'}
            ]
        });

        eventbus.publisher().register(pub);

        var component = new Component({
            name: 'myComponent',
            event: 'event1',
            render: function (state) {
                state = state.event1;

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
            actions: { // or Component.createElement 's on function
                querySelector: {
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

    App.prototype.parentChildDataTransfer = function () {
        eventbus = new Eventbus();

        var pub = new Publisher({
            event: "e1",
            state: {text: "Hello Anatolia!"}
        });

        eventbus.publisher().register(pub);

        var myParagraph = new Component({
            name: "myParagraph",
            render: function (state) {
                var myParagraph = document.createElement("p");
                var myParagraphText = document.createTextNode(state.text);

                myParagraph.append(myParagraphText);

                return myParagraph;
            }
        });

        var component = new Component({
            name: "myDiv",
            event: "e1",
            render: function (state) {
                var myDiv = document.createElement("div");

                var myP = myParagraph.setState(state.e1).render();

                myDiv.append(myP);

                return myDiv;
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

    App.prototype.nestedComponentsWithPublishers = function () {
        eventbus = new Eventbus();

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
            }
        });

        var tableResponsivePub = new Publisher({
            event: 'tableResponsive',
            state: {
                class: "table-responsive"
            }
        });

        eventbus.publisher().register(pub, stylePub, tableResponsivePub);

        tableResponsiveComponent = new Component({
            name: "tableResponsive",
            render: function (state) {
                var responsiveContainer = document.createElement("template");
                responsiveContainer.innerHTML = "<div class=" + state.tableResponsive.class + "></div>";

                return responsiveContainer.content.firstChild;
            }
        }).setEventbus(eventbus).setEvent('tableResponsive');

        tableComponent = new Component({
            name: 'table',
            render: function (state) {
                var styles = state.styleEvent;
                var data = state.event1;

                var $$ = Component.createElement;

                var table = $$("table", {class: styles.class});
                var thead = $$("thead");
                var tbody = $$("tbody");
                var theadRow = $$("tr");

                thead.append(theadRow);
                table.append(thead);
                table.append(tbody);

                for (var i in styles.header) {
                    if (styles.header.hasOwnProperty(i)) {
                        var headerCell = $$("th", {text: styles.header[i].text});
                        theadRow.append(headerCell);
                    }
                }

                // console.log(styles.header);

                for (var i in data) {
                    if (data.hasOwnProperty(i)) {
                        var tr = $$("tr");

                        var orderCell = $$("td", {text: data[i].order});
                        var nameCell = $$("td", {text: data[i].name});

                        tr.append(orderCell, nameCell);
                        table.children[1].append(tr);
                    }
                }


                return table;
            }
        });

        tableFooterComponent = new Component({
            name: "tfoot",
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
            actions: {
                querySelector: {
                    'td': {
                        click: function (e) {
                            console.log(this);
                        }
                    }
                }
            }
        });

        component = new Component({
            name: 'myComponent',
            render: function () {
                var tableResponsiveContainer = tableResponsiveComponent.render(this);
                var table = tableComponent.setEventbus(eventbus).setEvent(["styleEvent", "event1"]).render(this);
                var tableFooter = tableFooterComponent.render(this);

                table.append(tableFooter);
                tableResponsiveContainer.append(table);

                return tableResponsiveContainer;
            },
            actions: { // or Component.createElement 's on function
                // querySelector:{
                //     'tr': { // all selectors; (.), (#), (tag name)
                //         click: function (e) {
                //             console.log(this.targetElement);
                //         }
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
    };

    App.prototype.customButton = function () {
        AnatoliaButton = new Component({
            container: '#component_1',
            state: {
                increaseButton: {
                    text: "Increase",
                    class: "btn btn-success"
                },
                decreaseButton: {
                    text: "Decrease",
                    class: "btn btn-danger"
                },
                counter: 0,
                arr: []
            },
            actions: {
                querySelector: {
                    '.increaseButton': { // all selectors; (.), (#), (tag name)
                        click: function (e) {
                            this.state.counter += 1;
                            this.state.arr.push(Math.random());
                        }
                    },
                    '.decreaseButton': { // all selectors; (.), (#), (tag name)
                        click: function (e) {
                            this.state.counter -= 1;
                            this.state.arr.pop();
                        }
                    }
                }
            },
            render: function (state) {
                var cc = Component.createElement;

                var componentContainer = cc("div", {class: "row clearfix"});

                var buttonGroupContainer = cc("div", {class: "btn-group btn-group-justified"});

                var increaseButton = cc("a", {
                    class: state.increaseButton.class + " increaseButton",
                    text: state.increaseButton.text
                });

                var decreaseButton = cc("a", {
                    class: state.decreaseButton.class + " decreaseButton",
                    text: state.decreaseButton.text
                });

                buttonGroupContainer.append(increaseButton);
                buttonGroupContainer.append(decreaseButton);

                var resultElement = cc("p", {
                    text: state.counter,
                    style: "font-size: 50px; font-weight: bold; text-align: center;"
                });

                var arrayValueElement = cc("p", {class: "font-size: 50px; font-weight: bold; text-align: center;"});

                var arrayValues = "";
                state.arr.forEach(function (value) {
                    arrayValues += value + " | ";
                });

                arrayValueElement.textContent = arrayValues;

                componentContainer.append(buttonGroupContainer);
                componentContainer.append(resultElement);
                componentContainer.append(arrayValueElement);

                return componentContainer;
            }
        });

        AnatoliaButton.render();
    };

    App.prototype.todoApp = function () {
        var todoApp = new Component({
            container: "#component_1",
            name: "MyTodoApp",
            state: {
                todoList: [
                    {text: "Pasaport işlemlerini yap."},
                    {text: "Uçak bileti satın al."},
                    {text: "Otel rezervasyonu yaptır."}
                ]
            },
            actions: {
                querySelector: {
                    '#addTodoItem': {
                        click: function () {
                            var todoText = document.querySelector(".todoText").value;

                            if (todoText !== "") {
                                this.state.todoList.push({
                                    text: todoText
                                })
                            }
                        }
                    }
                }
            },
            render: function (state) {
                var cc = Component.createElement;

                var todoContainer = cc("div");

                /**
                 * Entries
                 * **/
                var firstRow = cc("div", {class: "row clearfix"});
                var input = cc("input", {
                    class: "form-control input-sm todoText",
                    placeholder: "Planladığınız bir iş yazınız...",
                    style: "margin:10px 0 10px 0;"
                });

                var addTodoItem = cc("a", {
                    id: "addTodoItem",
                    class: "btn btn-primary pull-right",
                    text: "Add",
                    style: "margin:10px 0 10px 0;"
                });

                firstRow.append(input);
                firstRow.append(addTodoItem);

                /**
                 * TodoItems
                 * **/
                var secondRow = cc("div", {class: "row clearfix"});
                var listContainer = cc("ul", {class: "list-group"});

                state.todoList.forEach(function (todoItem) {
                    var listItem = cc("li", {class: "list-group-item", text: todoItem.text});
                    listContainer.append(listItem);
                });

                secondRow.append(listContainer);
                todoContainer.append(firstRow, secondRow);

                return todoContainer;
            }
        });

        todoApp.render();
    };

    App.prototype.todoAppWithPublisher = function () {
        eventbus = new Eventbus();

        todoItemPublisher = new Publisher({
            event: "todo",
            state: {
                list: [
                    {text: "Pasaport işlemlerini yap."},
                    {text: "Uçak bileti satın al."},
                    {text: "Otel rezervasyonu yaptır."}
                ]
            }
        });

        eventbus.publisher().register(todoItemPublisher);

        var todoApp = new Component({
            container: "#component_1",
            name: "MyTodoApp",
            event: "todo",
            actions: {
                querySelector: {
                    '#addTodoItem': {
                        click: function () {
                            var todoText = document.querySelector(".todoText").value;

                            if (todoText !== "") {
                                this.state.todo.list.push({
                                    text: todoText
                                });
                                this.publish("todo", this.state); // publish a event with event name
                            }
                        }
                    }
                }
            },
            render: function (state) {
                var cc = Component.createElement;

                var todoContainer = cc("div");

                /**
                 * Entries
                 * **/
                var firstRow = cc("div", {class: "row clearfix"});
                var input = cc("input", {
                    class: "form-control input-sm todoText",
                    placeholder: "Planladığınız bir iş yazınız...",
                    style: "margin:10px 0 10px 0;"
                });

                var addTodoItem = cc("a", {
                    id: "addTodoItem",
                    class: "btn btn-primary pull-right",
                    text: "Add",
                    style: "margin:10px 0 10px 0;"
                });

                firstRow.append(input);
                firstRow.append(addTodoItem);

                /**
                 * TodoItems
                 * **/
                var secondRow = cc("div", {class: "row clearfix"});
                var listContainer = cc("ul", {class: "list-group"});

                state.todo.list.forEach(function (todoItem) {
                    var listItem = cc("li", {class: "list-group-item", text: todoItem.text});
                    listContainer.append(listItem);
                });

                secondRow.append(listContainer);
                todoContainer.append(firstRow, secondRow);

                return todoContainer;
            }
        });

        todoApp.setEventbus(eventbus).render();

    };

    App.prototype.todoAppWithMultiplePublisher = function () {
        eventbus = new Eventbus();

        todoItemPublisher = new Publisher({
            event: "todo",
            state: {
                list: [
                    {text: "Pasaport işlemlerini yap."},
                    {text: "Uçak bileti satın al."},
                    {text: "Otel rezervasyonu yaptır."}
                ]
            }
        });

        todoItemOrderPublisher = new Publisher({
            event: "todoOrders",
            state: {
                list: [
                    {order: "1"},
                    {order: "2"},
                    {order: "3"}
                ]
            }
        });

        eventbus.publisher().register(todoItemPublisher, todoItemOrderPublisher);

        todoApp = new Component({
            container: "#component_1",
            name: "MyTodoApp",
            event: ["todo", "todoOrders"],
            actions: {
                querySelector: {
                    '#addTodoItem': {
                        click: function () {
                            var todoText = document.querySelector(".todoText").value;

                            if (todoText !== "") {
                                var order = this.state.todo.list.push({
                                    text: todoText
                                });

                                this.state.todoOrders.list.push({
                                    order: order
                                });

                                this.publish("todo", this.state.todo); // publish a event with event name
                                this.publish("todoOrders", this.state.todoOrders); // publish a event with event name
                            }
                        }
                    }
                }
            },
            render: function (state) {
                var cc = Component.createElement;

                var todoContainer = cc("div");

                /**
                 * Entries
                 * **/
                var firstRow = cc("div", {class: "row clearfix"});
                var input = cc("input", {
                    class: "form-control input-sm todoText",
                    placeholder: "Planladığınız bir iş yazınız...",
                    style: "margin:10px 0 10px 0;"
                });

                var addTodoItem = cc("a", {
                    id: "addTodoItem",
                    class: "btn btn-primary pull-right",
                    text: "Add",
                    style: "margin:10px 0 10px 0;"
                });

                firstRow.append(input);
                firstRow.append(addTodoItem);

                /**
                 * TodoItems
                 * **/
                var secondRow = cc("div", {class: "row clearfix"});
                var listContainer = cc("ul", {class: "list-group"});

                state.todo.list.forEach(function (todoItem, index) {
                    var listItem = cc("li", {
                        class: "list-group-item",
                        text: state.todoOrders.list[index].order + " - " + todoItem.text
                    });
                    listContainer.append(listItem);
                });

                secondRow.append(listContainer);
                todoContainer.append(firstRow, secondRow);

                return todoContainer;
            }
        });

        todoApp.setEventbus(eventbus).render();
    };

    /**
     * Sample reusable component
     * **/
    App.prototype.button = function () {
        button1 = new Component(AnatoliaButton);
        button2 = new Component(AnatoliaButton);

        button1
            .setContainer("#component_1")
            .setState({
                props: {
                    buttonText: "Click",
                    counter: 0,
                    class: "btn btn-default btn-sm"
                }
            }).addActions({
            self: {
                click: function () {
                    this.state.props.buttonText = Math.random();
                    this.state.props.counter += 1;
                }
            }
        });

        button2
            .setContainer("#component_2")
            .setState({
                props: {
                    buttonText: "Tıkla",
                    counter: 0,
                    class: "btn btn-warning btn-sm"
                }
            }).addActions({
            self: {
                click: function () {
                    this.state.props.buttonText = Math.random();
                    this.state.props.counter += 1;
                }
            }
        });

        // button1.render();
        // button2.render();

        list = new Component(AnatoliaList);

        list
            .setContainer("#component_3")
            .setState({
                containerElementName: "div",
                class: "list-group",
                list: [
                    {text: "List Item 1"},
                    {text: "List Item 2"},
                    {text: "List Item 3"}
                ]
            })
            .addActions({
                querySelector: {
                    "#pushButton": {
                        click: function () {
                            // this.state.list.push({
                            //     text: Math.random()
                            // });

                            this.state.list = [
                                {text: "List Item 1"},
                                {text: "List Item 2"},
                                {text: "New Node"},
                                {text: "List Item 3"}
                            ];

                            // this.state.class = "list-group myClass";
                            // this.state.containerElementName = "section";
                        }
                    },
                    "#popButton": {
                        click: function () {
                            this.state.list.pop();
                        }
                    }
                }
            });

        list.render();
    };

    return App;
})();



