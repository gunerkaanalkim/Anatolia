var Widget = (function () {
    function Widget() {

    }

    /**
     * @summary Anatolia button(0.1.0) example usage
     * **/
    Widget.prototype.button = function () {
        var anatoliaButton = new Component(AnatoliaButton);

        anatoliaButton
            .setContainer("#component_1")
            .setState({
                attributes: {
                    class: "btn btn-default",
                    id: "myButton",
                    customAttribute: "customAttribute"
                },
                text: "My Button",
                fontIcon: "fa fa-home"
            })
            .addActions({
                self: {
                    click: function () {
                        console.log(this);
                    }
                }
            });

        anatoliaButton.render();
    };

    return Widget;
})();