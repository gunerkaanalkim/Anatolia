var Widget = (function () {
    function Widget() {

    }

    /**
     * @summary Anatolia button(1.0.1) example usage
     * **/
    Widget.prototype.button = function () {
        new AnatoliaButton({
            container: "#component_1",
            state: {
                attributes: {
                    class: "btn btn-default",
                    id: "myButton",
                    customAttribute: "customAttribute"
                },
                text: 0,
                fontIcon: "fa fa-home"
            },
            actions: {
                self: {
                    click: function () {
                        this.state.text += 1;
                    }
                }
            }
        }).render();

        new Anatolia.Widgets.Button({
            container: "#component_2",
            state: {
                attributes: {
                    class: "btn btn-success",
                    id: "myButton",
                    customAttribute: "customAttribute"
                },
                text: 0,
                fontIcon: "fa fa-home"
            },
            actions: {
                self: {
                    click: function () {
                        this.state.text += 1;
                    }
                }
            }
        }).render();
    };

    return Widget;
})();