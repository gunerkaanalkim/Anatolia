/**
 * Anatolia List Component.
 * Returns <ul> instance.
 *
 * @summary creates a <ul> element
 * @author Güner Kaan ALKIM <g.kaanalkim@gmail.com>
 * @version 1.0.0
 *
 * @param {object}  state                           - Contains list 's items and class attribute
 * @param {string}  state.class                     - List container(ul) class attribute
 * @param {array}   state.items                     - Defines list items
 * @param {string}  state.items[0].class            - List item class
 * @param {string}  state.items[0].text             - List item text content
 * **/

'use strict';

var AnatoliaList = function (state) {
    //  Toolkit declarations
    var create = Component.createElement;
    var is = Util.is;

    //  Attributes declarations
    var parentAttributes = state.attributes.parent;
    var itemAttributes = state.attributes.item;

    //  List container declaration
    var listContainer = create("ul");

    //  Attribute assignment
    if (is.defined(parentAttributes) && is.not.null(parentAttributes) && is.object(parentAttributes)) {
        for (var name in parentAttributes) {
            listContainer.setAttribute(name, parentAttributes[name]);
        }
    }


    //  List items declarations
    var listItems = state.items;

    if (is.defined(listItems) && is.not.null(listItems) && is.array(listItems)) {
        listItems.forEach(function (listItem) {
            var listItemElement = create("li", {
                text: listItem.text
            });

            //  Attribute assignment
            if (is.defined(itemAttributes) && is.not.null(itemAttributes) && is.object(itemAttributes)) {
                for (var name in itemAttributes) {
                    listItemElement.setAttribute(name, itemAttributes[name]);
                }
            }

            listContainer.append(listItemElement);
        });
    }


    return listContainer;
};


