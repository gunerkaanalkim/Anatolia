'use strict';
//TODO re-render containerless components when subscriber fired
// TODO  Component.createElement("table.table.table-condensed.table-striped > thead - tbody")
function Component(name, options) {
    this._options = options;
    this._name = name;

    this._initialize(options);
}

Component.prototype._initialize = function () {
    this._subscriber = null;
    this._renderMethod = this._options.render;
    this._event = this._options.event;
    this._methods = this._options.methods;
};

Component.prototype._render = function () {
    //Component's context binding
    var context = this;
    var el = null;

    if (this._event) {

        this._subscriber = new Subscriber(this._event, function (state) {
            el = context._renderMethod(state);
            if (context._methods) context._bindEventToTemplate(context._methods, el, state);

            if (context._container !== undefined) {
                var container = document.querySelector(context._container);
                context._toEmpty(container);
                container.append(el);
            }
        });

        this._eventbus.subscriber().register(this._subscriber);

        return el;
    } else {
        var state = {};
        el = context._renderMethod(state);
        if (context._methods) context._bindEventToTemplate(context._methods, el, state);

        if (context._container !== undefined) {
            var container = document.querySelector(context._container);
            context._toEmpty(container);
            container.append(el);
        }

        return el;
    }
};

Component.prototype.fire = function () {
    this._eventbus.subscriber().fire(this._subscriber);
};

Component.prototype.setContainer = function (componentContainer) {
    this._container = componentContainer;
};

Component.prototype.setEventbus = function (eventbus) {
    this._eventbus = eventbus;

    return this;
};

Component.prototype.setGlobalSetting = function (anatoliaGlobalSetting) {
    this._globalSetting = anatoliaGlobalSetting;
};

Component.prototype._toEmpty = function (component) {
    while (component.firstChild) {
        component.removeChild(component.firstChild);
    }
};

Component.prototype.render = function () {
    var el = this._render();
    return el;
};

Component.prototype.setEvent = function (event) {
    this._event = event;

    return this;
};

Component.createElement = function (tag, option) {
    var el = document.createElement(tag);

    for (var i in option) {
        if (option.hasOwnProperty(i))
            i === "text" ? el.innerText = option[i] : el.setAttribute(i, option[i]);
    }

    el.on = Component.on;

    return el;
};

Component.createElementFromObject = function (element) {
    var tag = null;

    for (var attribute in element) {
        if (element.hasOwnProperty(attribute)) {
            var attributeValue = element[attribute];

            if (attribute === "tagName") {
                tag = document.createElement(attributeValue);
            } else if (attribute !== "child" && attribute !== "text") {
                tag.setAttribute(attribute, attributeValue);
            } else if (attribute === "text") {
                tag.innerText = attributeValue;
            }

            if (attribute === "child") {
                attributeValue.forEach(function (childElementObject) {
                    var childElement = Component.createElementFromObject(childElementObject);
                    tag.append(childElement);
                })
            }
        }
    }

    return tag;
};

Component.on = function (event, fn) {
    this.addEventListener(event, fn);

    return this;
};

Component.prototype._bindEventToTemplate = function (componentMethods, template, state) {
    for (var i in componentMethods) {
        if (componentMethods.hasOwnProperty(i)) {
            var selector = i;
            var methods = componentMethods[i];

            var elements = template.querySelectorAll(selector);

            elements.forEach(function (element) {
                var bundle = {
                    state: state,
                    targetElement: element,
                    parentElement: element.parentElement
                };

                for (var i in methods) {
                    if (methods.hasOwnProperty(i)) {
                        element.addEventListener(i, methods[i].bind(bundle));
                    }
                }
            });
        }
    }
};