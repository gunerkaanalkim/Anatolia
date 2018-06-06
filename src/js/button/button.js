(function ($) {
    "use strict";

    $.fn.button = function (options) {
        if (options == null || typeof options == "undefined") {
            throw "Class attribute in options must be declare."
        }

        var clazz = options.class;
        var style = options.style;
        var text = options.text;
        var fontIcon = options.fontIcon;
        var events = options.events;

        //Buttons's bootstrap class
        this.addClass(clazz);
        this[0].setAttribute("style", style);

        //Append text and icon
        var icon = jQuery("<i>", {
            "class": fontIcon
        });

        var buttonText = jQuery("<span>", {
            "text": text
        });

        this.append(
            icon,
            buttonText
        );

        //Events binding
        for (var i in events) {
            var event = events[i];

            this.bind(i, event);
        }
    };

})(jQuery);