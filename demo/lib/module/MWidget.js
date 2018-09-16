var buttonGroup;


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

    /**
     * @summary Anatolia button group (1.0.0) example usage
     * **/
    Widget.prototype.buttonGroup = function () {
        buttonGroup = new Component({
            container: "#component_1",
            render: Anatolia.Widgets.ButtonGroup,
            state: {
                buttons: [
                    {
                        attributes: {
                            class: "btn btn-default",
                            id: "button1",
                            customAttribute: "customAttribute"
                        },
                        text: 0,
                        fontIcon: "fa fa-home"
                    },
                    {
                        attributes: {
                            class: "btn btn-primary",
                            id: "button2",
                            customAttribute: "customAttribute"
                        },
                        text: 0,
                        fontIcon: "fa fa-home"
                    },
                    {
                        attributes: {
                            class: "btn btn-warning",
                            id: "button3",
                            customAttribute: "customAttribute"
                        },
                        text: 0,
                        fontIcon: "fa fa-home"
                    },
                    {
                        attributes: {
                            class: "btn btn-info",
                            id: "button4",
                            customAttribute: "customAttribute"
                        },
                        text: 0,
                        fontIcon: "fa fa-home"
                    },
                    {
                        attributes: {
                            class: "btn btn-danger",
                            id: "button5",
                            customAttribute: "customAttribute"
                        },
                        text: 0,
                        fontIcon: "fa fa-home"
                    },
                    {
                        attributes: {
                            class: "btn btn-success",
                            id: "button6",
                            customAttribute: "customAttribute"
                        },
                        text: 0,
                        fontIcon: "fa fa-home"
                    }
                ],
                class: "btn-group btn-group-lg"
            },
            actions: {
                querySelector: {
                    "#button1": {
                        click: function () {
                            this.state.buttons[0].text += 1;
                        }
                    },
                    "#button2": {
                        click: function () {
                            this.state.buttons[1].text += 1;
                        }
                    },
                    "#button3": {
                        click: function () {
                            this.state.buttons[2].text += 1;
                        }
                    },
                    "#button4": {
                        click: function () {
                            this.state.buttons[3].text += 1;
                        }
                    },
                    "#button5": {
                        click: function () {
                            this.state.buttons[4].text += 1;
                        }
                    },
                    "#button6": {
                        click: function () {
                            this.state.buttons[5].text += 1;
                        }
                    }
                }
            }
        });

        buttonGroup.render();

    };

    return Widget;
})();