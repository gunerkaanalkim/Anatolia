var Button = (function () {
    function Button() {

    }

    Button.prototype.usage = function () {
        $("#defaultButtonCustom").button({
            class: "btn btn-default",
            text: "Default",
            style: "padding: 2px;",
            events: {
                click: function () {
                    console.log("clicked");
                },
                mouseenter: function () {
                    console.log("mouseenter");
                },
                mouseleave: function () {
                    console.log("mouseleave");
                }
                //etc...
            }
        });

        $("#primaryButtonCustom").button({
            class: "btn btn-primary",
            text: "Primary",
            style: "padding: 4px;"
        });

        $("#infoButtonCustom").button({
            class: "btn btn-info",
            text: "Info",
            style: "padding: 6px;"
        });

        $("#warningButtonCustom").button({
            class: "btn btn-warning",
            text: "Warning",
            style: "padding: 8px;"
        });

        $("#successButtonCustom").button({
            class: "btn btn-success",
            text: "Success",
            style: "padding: 10px;"
        });

        $("#dangerButtonCustom").button({
            class: "btn btn-danger",
            text: "Danger",
            style: "padding: 12px;"
        });
    };

    return Button;
})();