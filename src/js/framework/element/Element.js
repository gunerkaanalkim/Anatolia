function Element() {
}

Element.create = function (tagName, attributes) {
    var element = document.createElement(tagName);

    for (var i in attributes) {
        if (attributes.hasOwnProperty(i)) {
            element.setAttribute(i, attributes[i]);
        }
    }

    return element;
};