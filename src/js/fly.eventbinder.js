/**
 * Created by gunerkaanalkim on 26/01/2017.
 */
"use strict";

(function ($) {
    $.fn.flyEventBinder = function (options) {
        if (options != null && options != "" && typeof options != "undefined") {
            for (var j in options) {
                var event = options[j];

                this.bind(j, event);
            }
        } else {
            throw "Events is undefined or null!";
        }
    };

})(jQuery);