

var memoizeComponent = new MemoizeComponent({
    container: "#component_1",
    state: {
        value: 1
    },
    render: function (state) {
        var memoization = new Memoization();
        var elementCreate = memoization.add(Element.create);

        var button = elementCreate("a");

        button.setAttribute("class", "btn btn-primary");
        button.textContent = state.value;

        return button;
    }
}).render();


var renderComponent = new MemoizeComponent({
    container: "#component_2",
    state: {
        value: "Re-render memoize component!"
    },
    render: function (state) {
        var memoization = new Memoization();
        var elementCreate = memoization.add(Element.create);

        var button = elementCreate("a");

        button.setAttribute("class", "btn btn-default");
        button.textContent = state.value;

        return button;
    },
    actions: {
        self: {
            click: function () {
                memoizeComponent.render();
            }
        }
    }
}).render();
