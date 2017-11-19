/**
 * Created by gunerkaanalkim on 13/01/2017.
 */
"use strict";

(function ($) {
    $.fn.flyButton = function (options) {
        if (options == null || typeof options == "undefined") {
            throw "Class attribute in options must be declare."
        }

        var clazz = options.class;
        var style = options.style;
        var text = options.text;
        var iconClass = options.iconClass;
        var spin = options.spin;
        var events = options.events;

        //Buttons's bootstrap class
        this.addClass(clazz);
        this[0].setAttribute("style", style);

        //Spinner
        if (spin != null || spin != "") {
            var spinner = jQuery("<i>", {
                "class": spin,
                "style": "display: none;",
                "id": this[0].getAttribute("id") + "Spinner"
            });

            this.append(spinner);
        }

        //Append text and icon
        var icon = jQuery("<i>", {
            "class": iconClass
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