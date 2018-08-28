# Anatolia 
Understandable and human-readable JavaScript framework for elegant UI/UX

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

**Road Map** 
1.  A new **HyperScript** Dialect
2.  Component's **.prepare()** method with accessor methods
3.  **vDOM** implementation with HyperScript function
