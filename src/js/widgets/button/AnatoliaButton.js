/**
 * Anatolia Button 's render method. Returns <button> instance.
 *
 * @summary Anatolia Button
 * @author Güner Kaan ALKIM <g.kaanalkim@gmail.com>
 * @version 0.1.0
 *
 * @param {object}  attributes  - Attributes are define <button> element 's attribute. Ex; class, id or custom attribute
 * @param {object}  fontIcon    - Defines font icon. Ex: "fa fa-home"
 * @param {object}  text        - Defines button text. Ex: "My Button"
 * **/

var AnatoliaButton = {
    render: function (state) {
        /**
         * Toolkit declarations
         * **/
        var create = Component.createElement;
        var is = Util.is;

        /**
         * Attributes declarations
         * **/
        var attributes = state.attributes;
        var buttonIcon = state.fontIcon;
        var buttonText = state.text;

        /**
         * DOM Element declarations
         * **/
        var button = create("button", {type: "button"});

        /**
         * Attribute assignment
         * **/
        if (is.defined(attributes) && is.not.null(attributes) && is.object(attributes)) {
            for (var name in attributes) {
                button.setAttribute(name, attributes[name])
            }
        }

        /**
         * Button Icon
         * **/
        if (is.defined(buttonIcon) && is.not.null(buttonIcon) && is.string(buttonIcon)) {
            var icon = create("i", {class: buttonIcon});

            button.append(icon);
        }

        /**
         * Button Text
         * **/
        if (is.defined(buttonIcon) && is.not.null(buttonIcon) && is.string(buttonIcon)) {
            var text = create("span", {text: buttonText});

            button.append(text);
        }

        return button;
    }
};