/**
 * Virtual DOM
 * **/
function VirtualDOM() {
}

VirtualDOM.vDOM = function (templateContainerElement) {
    if (!templateContainerElement) return;

    var attributes = templateContainerElement.attributes;
    var attributeObjects = {};

    for (var prop in attributes) {
        if (attributes.hasOwnProperty(prop)) {
            attributeObjects[attributes[prop].name] = attributes[prop].value;
        }
    }

    var vDOM = {
        nodeName: templateContainerElement.nodeName,
        nodeType: templateContainerElement.nodeType,
        nodeValue: templateContainerElement.nodeValue,
        attributes: attributeObjects,
        child: []
    };

    if (templateContainerElement.hasChildNodes()) {
        templateContainerElement.childNodes.forEach(function (childNode) {
            vDOM.child.push(VirtualDOM.vDOM(childNode));
        });
    }

    return vDOM;
};

VirtualDOM.toHTML = function (vDOM) {
    if (!vDOM) return;

    var element = null;

    if (vDOM.nodeType === 1) {
        element = document.createElement(vDOM.nodeName);
    } else if (vDOM.nodeType === 3) {
        element = document.createTextNode(vDOM.nodeValue);
    }

    for (var i in vDOM.attributes) {
        var attribute = attributes[i];

        element.setAttribute(attribute.name, attribute.value);
    }

    if (vDOM.child.length !== 0) {
        vDOM.child.forEach(function (vNode) {
            element.append(VirtualDOM.toHTML(vNode));
        });
    }

    return element;
};

VirtualDOM.compare = function (originalVDOM, dirtyVDOM) {
    var has = VirtualNode.has;
    var is = VirtualNode.is;

    var nodeComparator = VirtualNode.nodeComparator(originalVDOM, dirtyVDOM);

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

                VirtualDOM.compare(originalVDOMChildNode, dirtyVDOMChildNode);
            }
        } else {
            // TODO : append child node to DOM
            // console.log("append child node to DOM");
        }
    } else {
        // TODO : re-render component
        // console.log("re-render component");
        nodeComparator.getChanges().forEach(function (change) {
            console.table(change.change);
        });
    }
};

/**
 * Virtual Node
 * **/
function VirtualNode() {
}

VirtualNode.nodeComparator = function (originalVDOM, dirtyVDOM) {
    var has = VirtualNode.has;
    var is = VirtualNode.is;

    var change;
    var changeList = [];

    if (is.undefined(originalVDOM) && is.defined(dirtyVDOM)) {
        change = VirtualNode.setChange(originalVDOM, "addNode", null, dirtyVDOM);

        changeList.push(change);
    } else if (is.defined(originalVDOM) && is.undefined(dirtyVDOM)) {
        change = VirtualNode.setChange(originalVDOM, "removeNode", originalVDOM, null);

        changeList.push(change);
    } else if (is.definedAndNotNull(originalVDOM) && is.definedAndNotNull(dirtyVDOM)) {
        /**
         * Node Type Comparison
         * **/
        if (is.notEqual(dirtyVDOM.nodeType, originalVDOM.nodeType)) {
            change = VirtualNode.setChange(originalVDOM, "nodeType", originalVDOM.nodeType, dirtyVDOM.nodeType);

            changeList.push(change);
        }

        /**
         * Node Name Comparison
         * **/
        if (is.notEqual(dirtyVDOM.nodeName, originalVDOM.nodeName)) {
            change = VirtualNode.setChange(originalVDOM, "nodeName", originalVDOM.nodeName, dirtyVDOM.nodeName);

            changeList.push(change);
        }

        /**
         * Node value Comparison
         * **/
        if (is.equal(dirtyVDOM.nodeType, 3)) {
            if (is.notEqual(dirtyVDOM.nodeValue, originalVDOM.nodeValue)) {
                change = VirtualNode.setChange(originalVDOM, "nodeValue", originalVDOM.nodeValue, dirtyVDOM.nodeValue);

                changeList.push(change);
            }
        }

        /**
         * Attributes Comparison
         * **/
        var dirtyVDOMAttributes = dirtyVDOM.attributes;
        var originalVDOMAttributes = originalVDOM.attributes;

        for (var attr in dirtyVDOMAttributes) {
            if (!originalVDOMAttributes.hasOwnProperty(attr) && is.notEqual(originalVDOMAttributes[attr], dirtyVDOMAttributes[attr])) {
                change = VirtualNode.setChange(originalVDOM, "attributes", originalVDOMAttributes, dirtyVDOMAttributes);

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

VirtualNode.setChange = function (vNode, cause, from, to) {
    return {
        vNode: vNode,
        change: {
            cause: cause,
            from: from,
            to: to
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
    }
};

VirtualNode.has = {
    child: function (vNode) {
        if (VirtualNode.is.definedAndNotNull(vNode)) {
            return VirtualNode.is.greaterThen(vNode.child.length, 0);
        }
    }
};