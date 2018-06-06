var ButtonGroup = (function () {
    function ButtonGroup() {

    }

    ButtonGroup.prototype.usage = function () {
        $("#buttongrp").buttonGroup({
            class: "btn-group btn-group-justified",
            style: "margin-bottom:10px;",
            buttons: [
                {
                    class: "btn btn-default",
                    text: " Görüntüle",
                    iconClass: "fa fa-eye fa-lg",
                    events: {
                        click: function (e) {

                        }
                    }
                },
                {
                    class: "btn btn-info",
                    text: " Düzenle",
                    iconClass: "fa fa-pencil fa-lg",
                    events: {
                        click: function (e) {

                        }
                    }
                },
                {
                    class: "btn btn-success",
                    text: " Yazdır",
                    iconClass: "fa fa-print fa-lg",
                    events: {
                        click: function (e) {

                        }
                    }
                },
                {
                    class: "btn btn-danger",
                    text: " Sil",
                    iconClass: "fa fa-times fa-lg",
                    events: {
                        click: function (e) {

                        }
                    }
                }
            ]
        });
    };

    return ButtonGroup;
})();