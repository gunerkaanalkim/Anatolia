/**
 * Created by gunerkaanalkim on 23/01/2017.
 */
"use strict";

(function ($) {
    $.fn.flyDetailViewer = function (options) {
        this.html("");

        var clazz = options.class;
        var style = options.style;
        var data = options.data;

        var table = jQuery("<table>", {
            "class": clazz,
            "style": style
        });

        var thead = jQuery("<thead>");
        var theadRow = jQuery("<tr>");

        var tbody = jQuery("<thead>");
        var tbodyRow = jQuery("<tr>");

        for (var k in data) {
            var dt = data[k];

            var keyCell = jQuery("<th>", {
                "text": dt.key
            });

            table.append(
                thead.append(
                    theadRow.append(
                        keyCell
                    )
                )
            );

            var valueCell = jQuery("<td>");
            var valueCellText;

            if (dt.type == "html") {
                valueCellText = jQuery("<span>", {
                    "html": dt.value
                });
            } else if (dt.type == "QR") {
                valueCellText = jQuery("<span>", {
                    "id": "QrCodeGeneration"
                });
                valueCellText.kendoQRCode({
                    value: dt.value,
                    size: 60,
                    padding: 0
                });
            } else {
                valueCellText = jQuery("<span>", {
                    "text": dt.value
                });
            }

            tbody.append(
                tbodyRow.append(
                    valueCell.append(
                        valueCellText
                    )
                )
            );
        }

        this.append(
            table.append(
                thead,
                tbody
            )
        );


    };

})(jQuery);