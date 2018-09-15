/**
 * Created by gunerkaanalkim on 20/01/2017.
 */
var Util = (function () {
    function Util() {
    }

    Util.prototype.formSerializer = function (formContainer) {
        var formElements = $("#" + formContainer + " [fly-serializable]");

        var serializedObject = new Object();

        for (var i = 0; i < formElements.length; i++) {
            var element = formElements[i];

            if (element.getAttribute("type") == "checkbox") {
                serializedObject[element.getAttribute("name")] = element.checked;
            } else {
                serializedObject[element.getAttribute("name")] = element.value;
            }
        }

        return serializedObject;
    };

    Util.prototype.formCleaner = function (formContainer) {
        var formElements = $("#" + formContainer + " [fly-serializable]");

        var serializedObject = new Object();

        for (var i = 0; i < formElements.length; i++) {
            var element = formElements[i];

            if (element.nodeName == "SELECT") {
                $(element).find("[disabled]").prop("selected", true)
            } else if (element.nodeName == "INPUT") {
                if (element.getAttribute("type") == "checkbox") {
                    $(element).prop("checked", false)
                } else {
                    element.value = "";
                }
            } else if (element.nodeName == "TEXTAREA") {
                element.value = "";
            }
        }

        return serializedObject;
    };

    Util.prototype.printScreen = function (container) {
        $(container).print();
    };

    Util.prototype.guid = function () {
        var d = new Date().getTime();
        if (window.performance && typeof window.performance.now === "function") {
            d += performance.now(); //use high-precision timer if available
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };

    return Util;
})();
