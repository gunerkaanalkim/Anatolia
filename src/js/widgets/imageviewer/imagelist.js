(function ($) {
    "use strict";

    $.fn.flyImageList = function (options) {
        this.html("");

        var clazz = options.imageClass;
        var path = options.path;
        var images = options.images;

        for (var i in images) {
            var image = images[i];

            var img = jQuery("<img>", {
                "class": "clazz",
                "src": path + "/" + image
            });

            this.append(img);
        }
    };

    $.fn.flyImage = function (options) {
        this.html("");

        var clazz = options.imageClass;
        var path = options.path;
        var images = options.images;


        var img = jQuery("<img>", {
            "class": "clazz",
            "src": path + "/" + images
        });

        this.append(img);

    };

})(jQuery);