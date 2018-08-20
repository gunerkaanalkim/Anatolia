'use strict';

function Component(options) {
    this._options = options;

    this._initialize(options);
}

Component.prototype._initialize = function () {
    this._subscriber = null;
    this._name = this._options.name;
    this._container = this._options.container;
    this._state = this._options.state || {};
    this._renderMethod = this._options.render;
    this._event = this._options.event;
    this._actions = this._options.actions;
    this._parentComponentContainer = [];
    this._vDOM = {};

    this._handleStateChanging();
};

Component.prototype._render = function () {
    //Component's context binding
    var context = this;
    var el = null;

    /**
     * for subscribe a publisher
     * **/
    if (this._event) {
        this._subscriber = new Subscriber({
            id: context._name,
            event: this._event,
            callback: function (state) {
                context._state = state;
                el = context._renderedHTML(context, state);
            }
        });

        this._eventbus.subscriber().register(this._subscriber);
    }
    /**
     * parent child data transfer
     * **/
    else if (this._state) {
        el = context._renderedHTML(context, this._state);
    }
    /**
     * non-data components
     * **/
    else {
        el = context._renderedHTML(context, {});
    }

    return el;
};

Component.prototype._renderedHTML = function (context, state) {
    var el = context._renderMethod(state);
    if (context._actions) context._bindEventToTemplate(context._actions, el, state);

    if (context._container !== undefined) {
        var container = document.querySelector(context._container);
        context._toEmpty(container);
        container.append(el);
    }

    return el;
};

Component.prototype.fire = function () {
    this._eventbus.subscriber().fire(this._subscriber);
};

Component.prototype._toEmpty = function (component) {
    while (component.firstChild) {
        component.removeChild(component.firstChild);
    }
};

Component.prototype.render = function (context) {
    if (context) this._setParentContainer(context);

    return this._render();
};

Component.prototype._bindEventToTemplate = function (componentMethods, template, state) {
    var context = this;

    /**
     * Methods for template itself
     * **/
    if (componentMethods.hasOwnProperty("self")) {
        var methodsForSelf = componentMethods.self;

        var bundle = {
            state: state,
            targetElement: template,
            parentElement: template.parentElement,
            publish: context._publisToEventbus.bind(context)
        };

        for (var i in methodsForSelf) {
            if (methodsForSelf.hasOwnProperty(i)) {
                template.addEventListener(i, methodsForSelf[i].bind(bundle));
            }
        }
    }

    // TODO remove parent's event for duplicate binding
    if (componentMethods.hasOwnProperty("querySelector")) {
        /**
         * Methods for template's inner html
         * **/
        var querySelectors = componentMethods.querySelector;

        for (var i in querySelectors) {
            if (querySelectors.hasOwnProperty(i)) {
                var selector = i;
                var methodsForInnerHtml = querySelectors[i];


                var elements = template.querySelectorAll(selector);

                elements.forEach(function (element) {
                    var bundle = {
                        state: state,
                        targetElement: element,
                        parentElement: element.parentElement,
                        publish: context._publisToEventbus.bind(context)
                    };

                    for (var i in methodsForInnerHtml) {
                        if (methodsForInnerHtml.hasOwnProperty(i)) {
                            element.addEventListener(i, methodsForInnerHtml[i].bind(bundle));
                        }
                    }
                });

            }
        }
    }

};

Component.prototype._handleStateChanging = function () {
    var context = this;

    Observer.watch(this._state, function (key, oldValue, newValue) {
        // console.log("key : " + key + " oldValue : " + oldValue + " newValue :" + newValue);
        context.render();
    });
};

Component.prototype._publisToEventbus = function (event, state) {
    var publisherOfComponent = new Publisher({
        event: event,
        state: state
    });

    this._eventbus.publisher().register(publisherOfComponent);
};

/**
 * Setters & Getters
 * **/
Component.prototype.setContainer = function (componentContainer) {
    this._container = componentContainer;

    return this;
};

Component.prototype.getContainer = function (componentContainer) {
    return this._container;
};

Component.prototype.setEventbus = function (eventbus) {
    this._eventbus = eventbus;

    return this;
};

Component.prototype.getEventbus = function (eventbus) {
    return this._eventbus;
};

Component.prototype.setGlobalSetting = function (anatoliaGlobalSetting) {
    this._globalSetting = anatoliaGlobalSetting;
};

Component.prototype.getGlobalSetting = function (anatoliaGlobalSetting) {
    return this._globalSetting;
};

Component.prototype.setEvent = function (event) {
    this._event = event;

    return this;
};

Component.prototype.getEvent = function (event) {
    return this._event;
};

Component.prototype._setParentContainer = function (parentComponentContext) {
    this._parentComponentContainer.push(parentComponentContext.getContainer());
};

Component.prototype._getParentContainer = function () {
    return this._parentComponentContainer;
};

Component.prototype.setState = function (state) {
    this._state = state;
    this._handleStateChanging();

    return this;
};

Component.prototype.getState = function () {
    return this._state;
};

Component.prototype.setMethods = function (methods) {
    this._actions = methods;

    return this;
};

/**
 * Static Members
 * **/
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

Component.vDOM = function (templateContainerElement) {
    if (!templateContainerElement) return;

    var attributes = templateContainerElement.attributes;
    var attributeObjects = [];

    for (var prop in attributes) {
        if (attributes.hasOwnProperty(prop)) {
            attributeObjects.push({
                name: attributes[prop].name,
                value: attributes[prop].value
            });
        }
    }

    // TODO find bounded events || rebind methods after vDOM comparation
    // TODO comparation method Intl.Collator().compare('','') || txt1.localeCompare(txt2)
    var vDOM = {
        tagName: templateContainerElement.tagName || "plainText",
        originalElement: templateContainerElement.outerHTML || templateContainerElement.textContent,
        attributes: attributeObjects,
        child: []
    };

    if (templateContainerElement.hasChildNodes()) {
        templateContainerElement.childNodes.forEach(function (childNode) {
            vDOM.child.push(Component.vDOM(childNode));
        });

    }

    return vDOM;
};