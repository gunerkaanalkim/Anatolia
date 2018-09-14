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
    this._template = null;
    this._vDOM = null;
    this.__firstRender__ = true;

    this._handleStateChanging(this._state);
};

Component.prototype._render = function () {
    //Component's context binding
    var context = this;
    /**
     * for subscribe a publisher
     * **/
    if (this._event) {
        this._subscriber = new Subscriber({
            id: context._name,
            event: this._event,
            callback: function (state) {
                context._state = state;

                context._template = context._renderedHTML(context, state);
            }
        });

        this._eventbus.subscriber().register(this._subscriber);
    }
    /**
     * parent child data transfer
     * **/
    else if (this._state) {
        this._template = context._renderedHTML(context, this._state);
    }
    /**
     * non-data components
     * **/
    else {
        this._template = context._renderedHTML(context, {});
    }

    return this._template;
};

Component.prototype._renderedHTML = function (context, state) {
    this._template = context._renderMethod(state);
    var vDOM = VirtualDOM.vDOM(this._template);

    if (this.__firstRender__ && (context._container !== undefined)) {
        this._vDOM = vDOM;

        var container = document.querySelector(context._container);
        context._toEmpty(container);
        container.append(this._template);

        this.__firstRender__ = false;
    } else {
        VirtualDOM.compare(this._vDOM, vDOM, this._vDOM);
    }

    //TODO event binding
    if (context._actions) context._bindEventToTemplate(context._actions, this._template, state);

    return this._template;
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

Component.prototype._bindEventToTemplate = function (componentActions, template, state) {
    var context = this;

    /**
     * Methods for template itself
     * **/
    if (componentActions.hasOwnProperty("self")) {
        var methodsForSelf = componentActions.self;

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
    if (componentActions.hasOwnProperty("querySelector")) {
        /**
         * Methods for template's inner html
         * **/
        var querySelectors = componentActions.querySelector;

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

    Observer.watch(context._state, function (key, oldValue, newValue) {
        context._render();
    });
};

Component.prototype._publisToEventbus = function (event, state) {
    var publisherOfComponent = new Publisher({
        event: event,
        state: state
    });

    this._eventbus.publisher().register(publisherOfComponent);
};

Component.prototype.addActions = function (componentActions) {
    if (this._actions) {
        this._bindEventToTemplate(componentActions, this._template, this._state);
    } else {
        this._actions = componentActions;
    }
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
