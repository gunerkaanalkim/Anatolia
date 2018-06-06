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
                click: function () {
                    console.log('click');
                },
                mouseenter: function () {
                    console.log('mouseenter');
                },
                mouseleave: function () {
                    console.log('mouseleave');
                },
                input: function (e) {
                    console.log(e.target.value);
                }
            }
        });
    };

    return Textbox;
})();