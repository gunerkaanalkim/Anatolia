var AnatoliaButton = {
    name: "AnatoliaButton",
    render: function (state) {
        var cc = Component.createElement;

        var button = cc("a", {
            class: state.props.class,
            text: state.props.buttonText
        });

        var paragraph = cc("p", {
            text: state.props.counter + " kez tıklanıldı."
        });

        button.append(paragraph);

        return button;
    }
};