/**
 * Created by gunerkaanalkim on 23/01/2017.
 */
"use strict";

(function ($) {
    $.fn.flyButtonGroup = function (options) {
        var cantainerClass = options.class;
        var style = options.style;
        var buttons = options.buttons;

        var buttonGroup = jQuery("<div>", {
            "class": cantainerClass,
            "style": style,
            "role": "group"
        });

        for (var i in buttons) {
            var btn = buttons[i];

            var innerButtonGroup = jQuery("<div>", {
                "class": "btn-group",
                "role": "group"
            });

            var button = jQuery("<button>", {
                "class": btn.class
            });

            var buttonText = jQuery("<span>", {
                "text": btn.text
            });

            var buttonIcon = jQuery("<i>", {
                "class": btn.iconClass
            });

            buttonGroup.append(
                innerButtonGroup.append(
                    button.append(
                        buttonIcon,
                        buttonText
                    )
                )
            );

            var events = btn.events;

            for (var j in events) {
                var event = events[j];

                button.bind(j, event);
            }

        }

        this.append(buttonGroup);
    };

})(jQuery);