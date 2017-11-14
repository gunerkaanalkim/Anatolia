/**
 * Created by gunerkaanalkim on 29/01/2017.
 */
"use strict";

(function ($) {
    $.fn.flyButtonAddon = function (options) {
        this.html("");

        //Input
        var inputClass = options.input.class;
        var inputType = options.input.type;
        var inputValue = options.input.value;
        var inputPlaceholder = options.input.placeHolder;
        var inputMin = options.input.min;
        var inputMax = options.input.max;
        var inputEvents = options.input.events;

        //Button
        var buttons = options.buttons;

        var container = jQuery("<div>", {
            "class": "input-group"
        });

        var input = jQuery("<input>", {
            "class": inputClass,
            "type": inputType,
            "min": inputMin,
            "max": inputMax,
            "value": inputValue,
            "placeholder": inputPlaceholder
        });

        for (var i in inputEvents) {
            var inputEvent = inputEvents[i];

            input.bind(i, inputEvent);
        }

        var addonContainer = jQuery("<span>", {
            "class": "input-group-btn"
        });

        for (var i in buttons) {
            var btn = buttons[i];

            var button = jQuery("<button>", {
                "class": btn.class,
                "type": btn.type
            });

            var buttonText = jQuery("<span>", {
                "text": btn.text
            });

            var buttonIcon = jQuery("<i>", {
                "class": btn.iconClass
            });

            button.append(
                buttonText,
                buttonIcon
            );

            addonContainer.append(
                button.append(
                    buttonText,
                    buttonIcon
                )
            );

            var events = btn.events;

            for (var i in events) {
                var event = events[i];

                button.bind(i, event);
            }
        }

        this.append(
            container.append(
                input,
                addonContainer
            )
        );
    };

})(jQuery);