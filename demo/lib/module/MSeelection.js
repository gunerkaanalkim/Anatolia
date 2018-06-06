var Selection = (function () {
    function Selection() {

    }

    Selection.prototype.usage = function () {
        var data = [
            {
                key: 'E',
                value: 'Erkek'
            },
            {
                key: 'K',
                value: 'Kadın'
            }
        ];


        $('#slct').selection({
            class: "form-control input-sm",
            style: "",
            placeHolder: "Cinsiyet Seçiniz...",
            dataTextField: "key",
            dataValueField: "value",
            datasource: data,
            events: {
                change: function (e) {
                    console.log($(e.target).find(":selected")[0].getAttribute('value'));
                }
            }
        });
    };

    return Selection;
})();