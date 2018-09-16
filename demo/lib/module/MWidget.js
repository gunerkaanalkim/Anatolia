var Widget = (function () {
    function Widget() {

    }

    /**
     * @summary Anatolia button(1.1.0) example usage
     * **/
    Widget.prototype.button = function () {
        var button = new Component({
            container: "#component_1",
            render: Anatolia.Widgets.Button,
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
        });

        button.render();
    };

    return Widget;
})();