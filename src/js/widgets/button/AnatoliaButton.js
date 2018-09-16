/**
 * Anatolia Button Component.
 * Returns <button> instance.
 *
 * @summary creates a <button> element
 * @author Güner Kaan ALKIM <g.kaanalkim@gmail.com>
 * @version 1.0.1
 *
 * @param {object}  state               - Attributes are define <button> element 's attribute. Ex; class, id or custom attribute
 * @param {object}  state.attributes    - Attributes are define <button> element 's attribute. Ex; class, id or custom attribute
 * @param {string}  state.fontIcon      - Defines font icon. Ex: "fa fa-home"
 * @param {string}  state.text          - Defines button text. Ex: "My Button"
 * **/

'use strict';

var AnatoliaButton = Component.setRenderMethod(function (state) {
    //  Toolkit declarations
    var create = Component.createElement;
    var is = Util.is;

    //  Attributes declarations
    var attributes = state.attributes;
    var buttonIcon = state.fontIcon;
    var buttonText = state.text;

    //  DOM Element declarations
    var button = create("button", {type: "button"});

    //  Attribute assignment
    if (is.defined(attributes) && is.not.null(attributes) && is.object(attributes)) {
        for (var name in attributes) {
            button.setAttribute(name, attributes[name])
        }
    }

    //  Button Icon
    if (is.defined(buttonIcon) && is.not.null(buttonIcon) && is.string(buttonIcon)) {
        var icon = create("i", {class: buttonIcon});

        button.append(icon);
    }

    //  Button Text
    if (is.defined(buttonIcon) && is.not.null(buttonIcon) && is.string(buttonIcon)) {
        var text = create("span", {text: buttonText});

        button.append(text);
    }

    return button;
});













