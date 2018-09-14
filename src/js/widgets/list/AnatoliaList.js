var AnatoliaList = {
    render: function (state) {
        var cc = Component.createElement;

        var container = cc(state.containerElementName);
        var firstRow = cc("div", {class: "row clearfix"});

        var ul = cc("ul", {class: state.class});

        state.list.forEach(function (listItem) {
            var li = cc("li", {class: "list-group-item", text: listItem.text});

            ul.append(li);
        });

        firstRow.append(ul);

        var secondRow = cc("div", {class: "row clearfix", style: "margin-top: 30px;"});
        var pushButton = cc("a", {class: "btn btn-success", text: "PUSH", id: "pushButton"});
        var popButton = cc("a", {class: "btn btn-danger", text: "POP", id: "popButton"});

        secondRow.append(pushButton);
        secondRow.append(popButton);

        container.append(secondRow);
        container.append(firstRow);

        return container;
    }
};

