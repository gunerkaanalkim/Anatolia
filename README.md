# Anatolia 
Understandable and human-readable JavaScript framework for elegant JavaScript Apps

**Dev Installation** 

```
git clone https://github.com/gunerkaanalkim/Anatolia.git
cd Anatolia
bower install
//foo
//bar
//tar
```

**Sample Component**
```js
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
    methods: {
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
```

**Pub/Sub Design Pattern Based State Manager**
```js
var eventbus = new Eventbus();

var publisher_1 = new Publisher({
    event: "e1",
    state: {number: "one"}
});

var publisher_2 = new Publisher({
    event: "e2",
    state: {number: "two"}
});

var publisher_3 = new Publisher({
    event: "e3",
    state: {number: "three"},
    propertyHandler: {
        number: function (key, value) {
            // console.log(key);
        }
    },
    computedProperties: {
        newNumber: function (state) {
            return "four";
        }
    }
});

[publisher_1, publisher_2, publisher_3].forEach(function (publisher) {
    eventbus.publisher().register(publisher);
});

var subscriber_1 = new Subscriber({
    id: "sub1",
    event: "e1",
    callback: function (state) {
        console.log(state);
    }
});

var subscriber_2 = new Subscriber({
    id: "sub2",
    event: "e2",
    callback: function (state) {
        console.log(state);
    }
});

var subscriber_3 = new Subscriber({
    id: "sub3",
    event: "e3",
    callback: function (state) {
        console.log(state);
    }
});

var subscriber_4 = new Subscriber({
    id: "sub4",
    event: ['e1', 'e2', 'e3'],
    callback: function (state) {
        console.log(state);
    }
});

[subscriber_1, subscriber_2, subscriber_3, subscriber_4].forEach(function (subscriber) {
    eventbus.subscriber().register(subscriber);
});

```
