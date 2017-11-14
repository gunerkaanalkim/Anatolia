/**
 * Created by gunerkaanalkim on 23/01/2017.
 */
"use strict";

(function ($) {
    $.fn.flyCarousel = function (options) {
        this.html("");
        var clazz = options.class;
        var path = options.path;
        var images = options.images;
        var buttons = options.buttons;
        var emptyImagesAlert = options.emptyImagesAlert;

        if (images != null && images != "" && images.length != 0) {
            var carouselId = this.selector.split("#")[1];

            this.removeClass("carousel slide");
            this.addClass("carousel slide");
            this.attr("data-ride", "");
            this.attr("data-ride", "carousel");

            var carouselIndicator = jQuery("<ol>", {
                "class": "carousel-indicators"
            });

            var carouselInner = jQuery("<div>", {
                "class": "carousel-inner",
                "role": "listbox"
            });

            this.append(
                carouselIndicator,
                carouselInner
            );

            for (var i = 0; i < images.length; i++) {
                var image = images[i];

                //    Indicators
                //var carouselIndicatorElement = jQuery("<li>", {
                //    "data-target": "#" + carouselId,
                //    "data-slide-to": i,
                //    "class": i == 0 ? "active" : ""
                //});
                //
                //carouselIndicator.append(
                //    carouselIndicatorElement
                //);

                var item = jQuery("<div>", {
                    "class": i == 0 ? "item active" : "item"
                });

                var img = jQuery("<img>", {
                    "src": path + "/" + image
                });

                if (typeof buttons != "undefined" && buttons.length != 0) {
                    var carouselCaption = jQuery("<div>", {
                        "class": "carousel-caption"
                    });

                    for (var j in buttons) {
                        var button = buttons[j];

                        var btn = jQuery("<button>", {
                            "class": button.class,
                            "data-key": image
                        });

                        var btnText = jQuery("<span>", {
                            "text": button.text,
                            "data-key": image
                        });

                        var btnIcon = jQuery("<i>", {
                            "class": button.iconClass,
                            "data-key": image
                        });

                        var events = button.events;

                        for (var k in events) {
                            var event = events[k];

                            btn.bind(k, event);
                        }

                        item.append(
                            carouselCaption.append(
                                btn.append(
                                    btnIcon,
                                    btnText
                                )
                            )
                        );
                    }
                }

                carouselInner.append(
                    item.append(
                        img
                    )
                );
            }

            var leftControl = jQuery("<a>", {
                "href": "#" + carouselId,
                "class": "left carousel-control",
                "role": "button",
                "data-slide": "prev"
            });

            var leftControlIcon = jQuery("<span>", {
                "class": "glyphicon glyphicon-chevron-left",
                "aria-hidden": "true"
            });

            var leftControlText = jQuery("<span>", {
                "text": "Previous",
                "class": "sr-only"
            });

            leftControl.append(leftControlIcon, leftControlText);

            var rightControl = jQuery("<a>", {
                "href": "#" + carouselId,
                "class": "right carousel-control",
                "role": "button",
                "data-slide": "next"
            });

            var rightControlIcon = jQuery("<span>", {
                "class": "glyphicon glyphicon-chevron-right",
                "aria-hidden": "true"
            });

            var rightControlText = jQuery("<span>", {
                "text": "Next",
                "class": "sr-only"
            });

            rightControl.append(rightControlIcon, rightControlText);

            this.append(leftControl, rightControl);
        } else {
            var alert = jQuery("<div>", {
                "class": "alert alert-info",
                "text": emptyImagesAlert
            });

            this.append(alert);
        }
    };

})(jQuery);