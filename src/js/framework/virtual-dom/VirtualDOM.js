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

    vDOM.attributes.forEach(function (attribute) {
        element.setAttribute(attribute.name, attribute.value);
    });

    if (vDOM.child.length !== 0) {
        vDOM.child.forEach(function (vNode) {
            element.append(VirtualDOM.toHTML(vNode));
        });
    }

    return element;
};

VirtualDOM.compare = function (originalVDOM, dirtyVDOM) {
    if (originalVDOM) {
        var nodeComparator = VirtualNode.nodeComparator(originalVDOM, dirtyVDOM);

        if (!nodeComparator.hasChanges()) {
            // element create, update, delete
            if (VirtualNode.hasChild(dirtyVDOM) && VirtualNode.hasChild(originalVDOM)) {
                var dirtyVDOMChildNodes = VirtualNode.childNodes(dirtyVDOM);
                var originalVDOMChildNodes = VirtualNode.childNodes(originalVDOM);

                for (var i = 0; i < dirtyVDOMChildNodes.length; i++) {
                    var dirtyVDOMChildNode = dirtyVDOMChildNodes[i];
                    var originalVDOMChildNode = originalVDOMChildNodes[i];

                    VirtualDOM.compare(originalVDOMChildNode, dirtyVDOMChildNode);
                }
            } else {
                // TODO : append child node to DOM
                console.log("append child node to DOM");
            }
        } else {
            // TODO : re-render component
            console.log("re-render component");
            var resultSet = nodeComparator.getChanges();
            console.log(resultSet);
        }
    }
};

/**
 * Virtual Node
 * **/
function VirtualNode() {
}

VirtualNode.nodeComparator = function isEqual(originalVDOM, dirtyVDOM) {
    var changing;

    var changeList = [];

    /**
     * Node Type Comparison
     * **/
    if (!VirtualNode.isEqual(dirtyVDOM.nodeType, originalVDOM.nodeType)) {
        changing = VirtualNode.setCause(originalVDOM, "nodeType", originalVDOM.nodeType, dirtyVDOM.nodeType);

        changeList.push(changing);
    }

    /**
     * Node Name Comparison
     * **/
    if (!VirtualNode.isEqual(dirtyVDOM.nodeName, originalVDOM.nodeName)) {
        changing = VirtualNode.setCause(originalVDOM, "nodeName", originalVDOM.nodeName, dirtyVDOM.nodeName);

        changeList.push(changing);
    }

    /**
     * Node value Comparison
     * **/
    if (VirtualNode.isEqual(dirtyVDOM.nodeType, 3)) {
        if (!VirtualNode.isEqual(dirtyVDOM.nodeValue, originalVDOM.nodeValue)) {
            changing = VirtualNode.setCause(originalVDOM, "nodeValue", originalVDOM.nodeValue, dirtyVDOM.nodeValue);

            changeList.push(changing);
        }
    }

    /**
     * Attributes Comparison
     * **/
    var dirtyVDOMAttributes = dirtyVDOM.attributes;
    var originalVDOMAttributes = originalVDOM.attributes;

    for (var attr in dirtyVDOMAttributes) {
        if (!originalVDOMAttributes.hasOwnProperty(attr) && !VirtualNode.isEqual(originalVDOMAttributes[attr], dirtyVDOMAttributes[attr])) {
            changing = VirtualNode.setCause(originalVDOM, "attributes", originalVDOMAttributes, dirtyVDOMAttributes);

            changeList.push(changing);
        }
    }

    function hasChanges() {
        return changeList.length > 0;
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

VirtualNode.setCause = function (originalVNode, cause, from, to) {
    return {
        vNode: originalVNode,
        changing: {
            cause: cause,
            from: from,
            to: to
        }
    };
};