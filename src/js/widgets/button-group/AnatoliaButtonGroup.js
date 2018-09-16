/**
 * Anatolia Button Group Component.
 * Returns button group instance.
 *
 * @summary creates a button group
 * @author Güner Kaan ALKIM <g.kaanalkim@gmail.com>
 * @version 1.0.0
 *
 * @param {object}  state                           - Contains button group's buttons and class attribute
 * @param {object}  state.class                     - Button group's class
 * @param {string}  state.buttons                   - Anatola button objects
 * @param {object}  state.buttons[0].attributes     - Attributes are define <button> element 's attribute. Ex; class, id or custom attribute
 * @param {string}  state.buttons[0].fontIcon       - Defines font icon. Ex: "fa fa-home"
 * @param {string}  state.buttons[0].text           - Defines button text. Ex: "My Button"
 * **/

'use strict';
var AnatoliaButtonGroup = function (state) {
    //  Toolkit declarations
    var create = Component.createElement;
    var is = Util.is;

    //Attribute declaration
    var buttons = state.buttons;

    //  Button Group Container
    var buttonGroupContainer = create("div", {
        "class": state.class,
        "role": "group"
    });

    if (is.defined(buttons) && is.not.null(buttons) && is.array(buttons)) {
        buttons.forEach(function (buttonObject) {
            var state = {
                attributes: buttonObject.attributes,
                text: buttonObject.text,
                fontIcon: buttonObject.fontIcon
            };


            var button = new Component({
                render: Anatolia.Widgets.Button,
                state: state
            }).render();


            buttonGroupContainer.append(button);

        })
    }

    return buttonGroupContainer;
};