var Textbox = (function () {
    function Textbox() {

    }

    Textbox.prototype.usage = function () {
        $("#textview").textbox({
            class: 'form-control',
            type: 'text',
            style: 'padding: 20px;',
            value: '',
            placeholder: 'Placeholder',
            events: {
                keyup: function (e) {
                    console.log(e.target.value);
                }
            }
        });
    };

    return Textbox;
})();