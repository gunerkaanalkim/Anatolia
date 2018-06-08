(function ($) {
    "use strict";

    $.fn.selection = function (options) {
        this.html("");

        var clazz = options.class;
        var serializable = options.serializable; // true | false
        var name = options.serializableName;
        var style = options.style;
        var placeHolder = options.placeHolder;
        var datasource = options.datasource;
        var dataTextField = options.dataTextField;
        var dataValueField = options.dataValueField;
        var events = options.events;
        var emptyDataAlert = options.emptyDataAlert;

        if (datasource != null && datasource != "" && typeof datasource != "undefined") {
            var select = "";

            if (serializable == true) {
                select = jQuery("<select>", {
                    "class": clazz,
                    "style": style,
                    "name": name,
                    "fly-serializable": ""
                });
            } else {
                select = jQuery("<select>", {
                    "class": clazz,
                    "style": style
                });
            }

            var placeHolderOption = jQuery("<option>", {
                "text": placeHolder,
                "disabled": "",
                "selected": ""
            });

            this.append(select.append(placeHolderOption));

            for (var i in datasource) {
                var data = datasource[i];

                var option = jQuery("<option>", {
                    "text": data[dataTextField],
                    "value": data[dataValueField]
                });

                select.append(option);
            }

            for (var j in events) {
                var event = events[j];

                select.bind(j, event);
            }
        } else {
            var alertText = "";

            if (emptyDataAlert == null || emptyDataAlert == "") {
                alertText = "Görüntülenecek bir kayıt bulunamadı...";
            } else {
                alertText = emptyDataAlert;
            }

            var alert = jQuery("<div>", {
                "class": "alert alert-warning"
            });

            var icon = jQuery("<i>", {
                "class": "fa fa-exclamation-triangle",
                "style": "margin-right: 12px;"
            });

            var text = jQuery("<span>", {
                "text": alertText
            });

            this.append(
                alert.append(
                    icon,
                    text
                )
            );
        }
    };

})(jQuery);