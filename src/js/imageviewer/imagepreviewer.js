(function ($) {
    "use strict";

    $.fn.flyImagePreviewer = function (options) {
        this.html("");

        var clazz = options.class;
        var path = options.path;
        var image = options.image;
        var style = options.style;
        var emptyImagesAlert = options.emptyImagesAlert;

        if (image != null && image != "" && typeof image != "undefined") {
            var img = jQuery("<img>", {
                "class": clazz,
                "src": path + "/" + image,
                "style": style
            });

            this.append(img);
        } else {
            var alert = jQuery("<div>", {
                "class": "alert alert-info",
                "text": emptyImagesAlert
            });

            this.append(alert);
        }
    };
})(jQuery);