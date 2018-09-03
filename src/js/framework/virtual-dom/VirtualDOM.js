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
        console.log(originalVDOM);
        console.log(dirtyVDOM);
        // node tipleri ve node adları aynı mı ?
        if (VirtualNode.isEqualNode(originalVDOM, dirtyVDOM)) {
            // element create, update, delete
            if (VirtualNode.hasChild(dirtyVDOM)) {
                VirtualNode.childNodes.forEach(function (childNode, index) {

                });
            }
            debugger;
        } else {
            // re-render component
        }
    }
};

/**
 * Virtual Node
 * **/
function VirtualNode() {
}

VirtualNode.isEqualNode = function isEqual(originalVDOM, dirtyVDOM) {
    if (!VirtualNode.isEqual(dirtyVDOM.nodeType, originalVDOM.nodeType) && !VirtualNode.isEqual(dirtyVDOM.nodeName, originalVDOM.nodeName)) {
        return false;
    }

    if (VirtualNode.isEqual(dirtyVDOM.nodeType, 3)) {
        if (!VirtualNode.isEqual(dirtyVDOM.nodeValue, originalVDOM.nodeValue)) {
            return false;
        }
    }

    var dirtyVDOMAttributes = dirtyVDOM.attributes;
    var originalVDOMAttributes = originalVDOM.attributes;

    for (var attr in dirtyVDOMAttributes) {
        if (!originalVDOMAttributes.hasOwnProperty(attr) && !VirtualNode.isEqual(originalVDOMAttributes[attr], dirtyVDOMAttributes[attr])) {
            return false;
        }
    }

    return true;
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