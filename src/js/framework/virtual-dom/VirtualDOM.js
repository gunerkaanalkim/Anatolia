/**
 * Anatolia Virtual DOM class.
 *
 * @summary A new implementation for Virtual DOM
 * @author Güner Kaan ALKIM <g.kaanalkim@gmail.com>
 * @version 1.0.0
 *
 * **/
function VirtualDOM() {
}

/**
 * @summary Creates a vNode from given HTML template
 *
 * @function vDOM
 *
 * @param {object}  templateContainerElement -  HTML template
 *
 * @return {object} vDOM
 * **/
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

/**
 * @summary Creates a HTML Element from given vNODE
 *
 * @function toHTML
 *
 * @param {object}  vNODE
 *
 * @return {object} HTML Element
 * **/
VirtualDOM.toHTML = function (vNODE) {
    if (!vNODE) return;

    var attributes = vNODE.attributes;
    var element = null;

    if (vNODE.nodeType === 1) {
        element = document.createElement(vNODE.nodeName);
    } else if (vNODE.nodeType === 3) {
        element = document.createTextNode(vNODE.nodeValue);
    }

    for (var attr in attributes) {
        var value = attributes[attr];

        element.setAttribute(attr, value);
    }

    if (vNODE.nodeType === 1 && !attributes.hasOwnProperty("vuid")) {
        element.setAttribute("vuid", VirtualNode.vuid());
    }

    if (vNODE.child.length !== 0) {
        vNODE.child.forEach(function (vNode) {
            element.append(VirtualDOM.toHTML(vNode));
        });
    }

    return element;
};

/**
 * @summary Compares two vNODE by node name, attribute and node value
 *
 * @function compare
 *
 * @param {object}  originalVDOM
 * @param {object}  dirtyVDOM
 * @param {number}  index
 * @param {array}   originalVDOMCollections
 * @param {object}  parentNode
 *
 * @return nothing
 * **/
VirtualDOM.compare = function (originalVDOM, dirtyVDOM, index, originalVDOMCollections, parentNode) {
    var is = VirtualNode.is;

    var nodeComparator = VirtualNode.nodeComparator(originalVDOM, dirtyVDOM, index, originalVDOMCollections, parentNode);

    if (!nodeComparator.hasChanges()) {
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
        // TODO : re-render component
        // console.log("re-render component");
        DOMProcessor.applyChanging(nodeComparator.getChanges());
    }
};

/**
 * Anatolia Virtual NODE class.
 *
 * @summary A new implementation for Virtual Node
 * @author Güner Kaan ALKIM <g.kaanalkim@gmail.com>
 *
 * **/
function VirtualNode() {
}

/**
 * @summary Compares two vNODE by node name, attribute and node value.
 *
 * @function nodeComparator
 *
 * @param {object}  originalVDOM
 * @param {object}  dirtyVDOM
 * @param {number}  index
 * @param {array}   originalVDOMCollections
 * @param {object}  parentNode
 *
 * @return {object} Return value contains two method, hasChange and getChanges.
 * <pre> <code>hasChanges</code> method returns true if passed two vNode is different.</pre>
 * <pre> <code>getChanges</code> method returns object with changes if passed two vNode is different.</pre>
 * **/
VirtualNode.nodeComparator = function (originalVDOM, dirtyVDOM, index, originalVDOMCollections, parentNode) {
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

/**
 * @summary Compares two vNODE by node name, attribute and node value.
 *
 * @function hasChild
 *
 * @param {object}  vNode
 *
 * @return {boolean} Returns true if vNODE has child node
 * **/
VirtualNode.hasChild = function (vNode) {
    return vNode.child.length > 0;
};

/**
 * @summary Returns child nodes array
 *
 * @function hasChild
 *
 * @param {object}  vNode
 *
 * @return {array}
 * **/
VirtualNode.childNodes = function (vNode) {
    return vNode.child;
};

/**
 * @summary Returns vNode changes
 *
 * @function setChange
 *
 * @param {object}  vNode
 * @param {string}  cause
 * @param {string}  from
 * @param {string}  to
 * @param {number}  index
 * @param {array}  originalVDOMCollections
 * @param {object}  parentNode
 *
 * @return {object}
 * **/
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
        }
    };
};

/**
 * See {@link Util}
 * **/
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

/**
 * @summary virtual unique id
 *
 * @function vuid
 *
 * @return {string}
 * **/
VirtualNode.vuid = function () {
    return Math.random().toString(36).substr(2, 9);
};

/**
 * @summary Anatolia DOMProcessor for DOM and vDOM manipulation
 * @author Güner Kaan ALKIM <g.kaanalkim@gmail.com>
 *
 * **/
function DOMProcessor() {

}

/**
 * @summary virtual unique id
 *
 * @function vuid
 * @param {object}  changes - nodeComparator function return value
 *
 * @return nothing
 * **/
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

/**
 * @summary finds element by vuid
 *
 * @function getByVuid
 * @param {string}  vuid
 *
 * @return {object} HTMLElement
 * **/
DOMProcessor.getByVuid = function (vuid) {
    return document.querySelector("[vuid='" + vuid + "']");
};

/**
 * @summary adds new node to DOM and component's vDOM
 *
 * @function addNode
 * @param {object}  change
 *
 * @return nothing
 * **/
DOMProcessor.addNode = function (change) {
    var newNode = VirtualDOM.toHTML(change.change.to);

    change.originalVDOMCollections[change.index] = VirtualDOM.vDOM(newNode);

    var referenceNode = null;

    if (change.index === 0) { // insert first node to emtpy parent node
        parentNode = DOMProcessor.getByVuid(change.parentNode.vuid);
        parentNode.append(newNode);
    } else {
        referenceNode = DOMProcessor.getByVuid(change.originalVDOMCollections[change.index - 1].vuid);
        var parentNode = referenceNode.parentNode;
        parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
};

/**
 * @summary removes existing node from DOM and component's vDOM
 *
 * @function removeNode
 * @param {object}  change
 *
 * @return nothing
 * **/
DOMProcessor.removeNode = function (change) {
    DOMProcessor.getByVuid(change.vNode.vuid).remove();
    change.parentNode.child.splice(change.index, 1);
};

/**
 * @summary re-creates DOM and vDOM object
 *
 * @function replaceNodeName
 * @param {object}  change
 *
 * @return nothing
 * **/
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

/**
 * @summary resets existing node value on DOM and component's vDOM
 *
 * @function replaceNodeValue
 * @param {object}  change
 *
 * @return nothing
 * **/
DOMProcessor.replaceNodeValue = function (change) {
    var oldNode = DOMProcessor.getByVuid(change.parentNode.vuid);
    oldNode.firstChild.nodeValue = change.change.to;
    change.vNode.nodeValue = change.change.to;
};

/**
 * @summary resets existing node attribute on DOM and component's vDOM
 *
 * @function replaceNodeAttribute
 * @param {object}  change
 *
 * @return nothing
 * **/
DOMProcessor.replaceNodeAttribute = function (change) {
    var oldNode = DOMProcessor.getByVuid(change.vNode.vuid);

    for (var i in change.change.to) {
        var attributeName = i;
        var attributeValue = change.change.to[i];
        oldNode.setAttribute(attributeName, attributeValue);

        change.vNode.attributes[attributeName] = attributeValue;
    }
};

module.exports = VirtualDOM;