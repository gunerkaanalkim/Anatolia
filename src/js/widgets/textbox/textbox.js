/**
 * Created by gunerkaanalkim on 13/01/2017.
 */
"use strict";

(function ($) {
    $.fn.textbox = function (options) {
        this.html("");

        var value = options.value;
        var placeholder = options.placeholder;
        var clazz = options.class;
        var style = options.style;
        var events = options.events;

        var input = jQuery('<input>', {
            class: clazz,
            style: style,
            value: value,
            placeholder: placeholder
        });

        for (var i in events) {
            var event = events[i];
            input.bind(i, event);
        }

        this.append(input);
    };
})(jQuery);