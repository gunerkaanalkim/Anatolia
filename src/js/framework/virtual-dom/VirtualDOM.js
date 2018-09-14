/**
 * Virtual DOM
 * **/
function VirtualDOM() {
}

VirtualDOM.vDOM = function (templateContainerElement) {
    var is = VirtualNode.is;

    if (!templateContainerElement) return;

    var attributes = templateContainerElement.attributes;
    var attributeObjects = {};

    for (var prop in attributes) {
        if (attributes.hasOwnProperty(prop)) {
            attributeObjects[attributes[prop].name] = attributes[prop].value;
        }
    }

    var vuid = VirtualNode.vuid();

    var vDOM = {
        nodeName: templateContainerElement.nodeName,
        nodeType: templateContainerElement.nodeType,
        nodeValue: templateContainerElement.nodeValue,
        attributes: attributeObjects,
        child: []
    };

    if (is.notEqual(templateContainerElement.nodeType, 3)) {
        vuid = templateContainerElement.getAttribute("vuid") || vuid;

        templateContainerElement.setAttribute("vuid", vuid);
        vDOM["vuid"] = vuid;
    }

    if (templateContainerElement.hasChildNodes()) {
        templateContainerElement.childNodes.forEach(function (childNode) {
            vDOM.child.push(VirtualDOM.vDOM(childNode));
        });
    }

    return vDOM;
};

VirtualDOM.toHTML = function (vDOM) {
    if (!vDOM) return;

    var attributes = vDOM.attributes;
    var element = null;

    if (vDOM.nodeType === 1) {
        element = document.createElement(vDOM.nodeName);
    } else if (vDOM.nodeType === 3) {
        element = document.createTextNode(vDOM.nodeValue);
    }

    for (var attr in attributes) {
        var value = attributes[attr];

        element.setAttribute(attr, value);
    }

    if (vDOM.nodeType === 1 && !attributes.hasOwnProperty("vuid")) {
        element.setAttribute("vuid", VirtualNode.vuid());
    }

    if (vDOM.child.length !== 0) {
        vDOM.child.forEach(function (vNode) {
            element.append(VirtualDOM.toHTML(vNode));
        });
    }

    return element;
};

VirtualDOM.compare = function (originalVDOM, dirtyVDOM, index, originalVDOMCollections, parentNode) {
    var has = VirtualNode.has;
    var is = VirtualNode.is;

    var nodeComparator = VirtualNode.nodeComparator(originalVDOM, dirtyVDOM, index, originalVDOMCollections, parentNode);

    if (!nodeComparator.hasChanges()) {
        if (has.child(dirtyVDOM) && has.child(originalVDOM)) {
            var dirtyVDOMChildNodes = VirtualNode.childNodes(dirtyVDOM);
            var originalVDOMChildNodes = VirtualNode.childNodes(originalVDOM);

            var masterNode = null;

            if (is.greaterThen(dirtyVDOMChildNodes.length, originalVDOMChildNodes.length)) {
                masterNode = dirtyVDOMChildNodes;
            } else if (is.lowerThen(dirtyVDOMChildNodes.length, originalVDOMChildNodes.length)) {
                masterNode = originalVDOMChildNodes;
            } else {
                masterNode = dirtyVDOMChildNodes;
            }

            for (var i = 0; i < masterNode.length; i++) {
                var dirtyVDOMChildNode = dirtyVDOMChildNodes[i];
                var originalVDOMChildNode = originalVDOMChildNodes[i];

                VirtualDOM.compare(originalVDOMChildNode, dirtyVDOMChildNode, i, originalVDOMChildNodes, originalVDOM);
            }
        } else {
            // TODO : append child node to DOM
            // console.log("append child node to DOM");
        }
    } else {
        // TODO : re-render component
        // console.log("re-render component");
        DOMProcessor.applyChanging(nodeComparator.getChanges());
    }
};

/**
 * Virtual Node
 * **/
function VirtualNode() {
}

VirtualNode.nodeComparator = function (originalVDOM, dirtyVDOM, index, originalVDOMCollections, parentNode) {
    var has = VirtualNode.has;
    var is = VirtualNode.is;

    var change;
    var changeList = [];

    if (is.undefined(originalVDOM) && is.defined(dirtyVDOM)) {
        change = VirtualNode.setChange(originalVDOM, "addNode", null, dirtyVDOM, index, originalVDOMCollections, parentNode);

        changeList.push(change);
    } else if (is.defined(originalVDOM) && is.undefined(dirtyVDOM)) {
        change = VirtualNode.setChange(originalVDOM, "removeNode", originalVDOM, null, index, originalVDOMCollections, parentNode);

        changeList.push(change);
    } else if (is.definedAndNotNull(originalVDOM) && is.definedAndNotNull(dirtyVDOM)) {
        /**
         * Node Type Comparison
         * **/
        if (is.notEqual(dirtyVDOM.nodeType, originalVDOM.nodeType)) {
            change = VirtualNode.setChange(originalVDOM, "nodeType", originalVDOM.nodeType, dirtyVDOM.nodeType, index, originalVDOMCollections, parentNode);

            changeList.push(change);
        }

        /**
         * Node Name Comparison
         * **/
        if (is.notEqual(dirtyVDOM.nodeName, originalVDOM.nodeName)) {
            change = VirtualNode.setChange(originalVDOM, "nodeName", originalVDOM.nodeName, dirtyVDOM.nodeName, index, originalVDOMCollections, parentNode);

            changeList.push(change);
        }

        /**
         * Node value Comparison
         * **/
        if (is.equal(dirtyVDOM.nodeType, 3)) {
            if (is.notEqual(dirtyVDOM.nodeValue, originalVDOM.nodeValue)) {
                change = VirtualNode.setChange(originalVDOM, "nodeValue", originalVDOM.nodeValue, dirtyVDOM.nodeValue, index, originalVDOMCollections, parentNode);

                changeList.push(change);
            }
        }

        /**
         * Attributes Comparison
         * **/
        var dirtyVDOMAttributes = dirtyVDOM.attributes;
        var originalVDOMAttributes = originalVDOM.attributes;

        for (var attr in dirtyVDOMAttributes) {
            if (originalVDOMAttributes.hasOwnProperty(attr) && is.notEqual(originalVDOMAttributes[attr], dirtyVDOMAttributes[attr])) {
                change = VirtualNode.setChange(originalVDOM, "updateAttribute", originalVDOMAttributes, dirtyVDOMAttributes, index, originalVDOMCollections, parentNode);

                changeList.push(change);
            }
        }
    }

    function hasChanges() {
        return is.greaterThen(changeList.length, 0);
    }

    function getChanges() {
        return changeList;
    }

    return {
        hasChanges: hasChanges,
        getChanges: getChanges
    };
};

VirtualNode.hasChild = function (vNode) {
    return vNode.child.length > 0;
};

VirtualNode.childNodes = function (vNode) {
    return vNode.child;
};

VirtualNode.isEqual = function (val1, val2) {
    return val1 === val2;
};

VirtualNode.setChange = function (vNode, cause, from, to, index, originalVDOMCollections, parentNode) {
    var is = VirtualNode.is;

    return {
        parentNode: parentNode,
        originalVDOMCollections: originalVDOMCollections,
        index: index,
        vNode: vNode,
        change: {
            cause: cause,
            from: from,
            to: to
        },
        findLocation: function () {
            return this.originalVDOMCollections[this.index];
        }
    };
};

VirtualNode.is = {
    defined: function (value) {
        return typeof value !== "undefined"
    },
    undefined: function (value) {
        return typeof value === 'undefined';
    },
    null: function (value) {
        return value === null;
    },
    notNull: function (value) {
        return value !== null;
    },
    equal: function (val1, val2) {
        return val1 === val2;
    },
    notEqual: function (val1, val2) {
        return val1 !== val2;
    },
    greaterThen: function (value, criteria) {
        return value > criteria;
    },
    lowerThen: function (value, criteria) {
        return value < criteria;
    },
    definedAndNotNull: function (value) {
        return (typeof value !== "undefined" && value !== null);
    },
    undefinedOrNull: function (value) {
        return (typeof value === "undefined" || value === null);
    }
};

VirtualNode.has = {
    child: function (vNode) {
        if (VirtualNode.is.definedAndNotNull(vNode)) {
            return VirtualNode.is.greaterThen(vNode.child.length, 0);
        }
    }
};

VirtualNode.vuid = function () {
    return Math.random().toString(36).substr(2, 9);
};

/**
 * DOM Processor
 * **/
function DOMProcessor() {

}

DOMProcessor.applyChanging = function (changes) {
    var is = VirtualNode.is;

    changes.forEach(function (change) {
        if (is.equal(change.change.cause, "addNode")) {
            DOMProcessor.addNode(change);
        } else if (is.equal(change.change.cause, "removeNode")) {
            DOMProcessor.removeNode(change);
        } else if (is.equal(change.change.cause, "nodeType") || is.equal(change.change.cause, "nodeName")) {
            DOMProcessor.replaceNodeName(change);
        } else if (is.equal(change.change.cause, "nodeValue")) {
            DOMProcessor.replaceNodeValue(change);
        } else if (is.equal(change.change.cause, "updateAttribute")) {
            DOMProcessor.replaceNodeAttribute(change);
        }
    });
};

DOMProcessor.getByVuid = function (vuid) {
    return document.querySelector("[vuid='" + vuid + "']");
};

DOMProcessor.addNode = function (change) {
    var is = VirtualNode.is;

    var location = change.findLocation();

    if (is.undefinedOrNull(location)) {
        var newNode = VirtualDOM.toHTML(change.change.to);

        change.originalVDOMCollections[change.index] = VirtualDOM.vDOM(newNode);

        var referenceNode = DOMProcessor.getByVuid(change.originalVDOMCollections[change.index - 1].vuid);
        var parentNode = referenceNode.parentNode;
        parentNode.insertBefore(newNode, referenceNode.nextSibling);

    }
};

DOMProcessor.removeNode = function (change) {
    DOMProcessor.getByVuid(change.vNode.vuid).remove();
    change.parentNode.child.splice(change.index, 1);
};

DOMProcessor.replaceNodeName = function (change) {
    var oldNode = DOMProcessor.getByVuid(change.vNode.vuid);
    var newNode = VirtualDOM.toHTML(change.vNode);

    oldNode.replaceWith(newNode);

    var newNodeVDOM = VirtualDOM.vDOM(newNode);

    change.vNode.attributes = newNodeVDOM.attributes;
    change.vNode.child = newNodeVDOM.child;
    change.vNode.nodeName = newNodeVDOM.nodeName;
    change.vNode.nodeType = newNodeVDOM.nodeType;
    change.vNode.nodeValue = newNodeVDOM.nodeValue;
    change.vNode.vuid = newNodeVDOM.vuid;
};

DOMProcessor.replaceNodeValue = function (change) {
    var oldNode = DOMProcessor.getByVuid(change.parentNode.vuid);
    oldNode.firstChild.nodeValue = change.change.to;
    change.vNode.nodeValue = change.change.to;
};

DOMProcessor.replaceNodeAttribute = function (change) {
    var oldNode = DOMProcessor.getByVuid(change.vNode.vuid);

    for (var i in change.change.to) {
        var attributeName = i;
        var attributeValue = change.change.to[i];
        oldNode.setAttribute(attributeName, attributeValue);

        change.vNode.attributes[attributeName] = attributeValue;
    }
};