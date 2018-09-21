/**
 * Anatolia Component Class
 * Returns a html collection.
 *
 * @summary creates a component
 * @author Güner Kaan ALKIM <g.kaanalkim@gmail.com>
 * @version 1.1.2
 *
 * @param {object}      options                             -   Component 's html container, state etc...
 * @param {string}      options.container                   -   Knowledge of where to append. Ex; #myContainer, .myContainer
 * @param {string}      options.state                       -   Data source object
 * @param {function}    options.render                      -   Render function
 * @param {string}      options.event                       -   If using pub/sub, component subscribe an event via the attribute
 * @param {object}      options.actions                     -   Component's and child element's JS events
 * @param {object}      options.actions.self                -   Component's own events
 * @param {string}      options.actions.self.*              -   JS event name. Ex: click, dblclick, mouseenter etc...
 * @param {object}      options.actions.querySelector       -   Component's child element's events
 * @param {object}      options.actions.querySelector.*     -   JS event name. Ex: click, dblclick, mouseenter etc...
 * **/

'use strict';

/**
 * @class
 * @classdesc Creates a component
 * @constructor
 *
 * @param {object}  options
 *
 * @return nothing
 * **/
function Component(options) {
    this._options = options;

    this._initialize(options);
}

/**
 * @summary Sets component's attributes
 *
 * @function _initialize
 *
 * @return nothing
 * **/
Component.prototype._initialize = function () {
    this._subscriber = null;
    this._container = this._options.container;
    this._state = this._options.state || {};
    this._renderMethod = this._options.render;
    this._event = this._options.event;
    this._actions = this._options.actions;
    this._template = null;
    this._vDOM = null;
    this.__firstRender__ = true;

    this._handleStateChanging(this._state);
};

/**
 * @summary Prepares HMTL template by given state object
 *
 * @function _render
 *
 * @return HTML template
 * **/
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

/**
 * @summary Prepares HMTL template by given state object
 *
 * @function _renderedHTML
 *
 * @param {object}  context  Component's context
 * @param {object}  state    Component's state
 *
 * @return HTML template
 * **/
Component.prototype._renderedHTML = function (context, state) {
    this._template = context._renderMethod(state);
    var vDOM = null;

    if (this.__firstRender__ && (context._container !== undefined)) {
        vDOM = VirtualDOM.vDOM(this._template);

        this._vDOM = vDOM;

        var container = document.querySelector(context._container);
        context._toEmpty(container);
        container.append(this._template);

        this.__firstRender__ = false;
    } else if (context._container !== undefined) {
        vDOM = VirtualDOM.vDOM(this._template);

        VirtualDOM.compare(this._vDOM, vDOM, this._vDOM);
    }

    if (context._actions) context._bindEventToTemplate(context._actions, this._template, state);

    return this._template;
};

/**
 * @summary Calls component's subscriber
 *
 * @function fire
 *
 * @return nothing
 * **/
Component.prototype.fire = function () {
    this._eventbus.subscriber().fire(this._subscriber);
};

/**
 * @summary Resets component container element's innerHTML
 *
 * @function _toEmpty
 *
 * @return nothing
 * **/
Component.prototype._toEmpty = function (component) {
    while (component.firstChild) {
        component.removeChild(component.firstChild);
    }
};

/**
 * @summary Calls component's private render method and re-render component by given state
 *
 * @function render
 *
 * @return HTML template
 * **/
Component.prototype.render = function () {
    return this._render();
};

/**
 * @summary Binds events to component's template with custom context
 *
 * @function _bindEventToTemplate
 *
 * @return nothing
 * **/
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

/**
 * @summary Apply observer pattern to component's state
 *
 * @function _handleStateChanging
 *
 * @return nothing
 * **/
Component.prototype._handleStateChanging = function () {
    var context = this;

    Observer.watch(context._state, function (key, oldValue, newValue) {
        context._render();
    });
};

/**
 * @summary If uses pub/sub state management, this private method publish a state object to stated eventbus's events
 *
 * @function _publisToEventbus
 *
 * @return nothing
 * **/
Component.prototype._publisToEventbus = function (event, state) {
    var publisherOfComponent = new Publisher({
        event: event,
        state: state
    });

    this._eventbus.publisher().register(publisherOfComponent);
};

/**
 * @summary This public method add event listeners(click, dblclick, mouseenter etc.) to prepared template. If an event has not been defined before, the method sets action property.
 *
 * @function addActions
 *
 * @param {object}  componentActions
 *
 * @return nothing
 * **/
Component.prototype.addActions = function (componentActions) {
    if (this._actions) {
        this._bindEventToTemplate(componentActions, this._template, this._state);
    } else {
        this._actions = componentActions;
    }
};

/**
 * @summary Component's container attributes setter method
 *
 * @function setContainer
 *
 * @param {string}  container   -   like css selector
 *
 * @return this
 * **/
Component.prototype.setContainer = function (componentContainer) {
    this._container = componentContainer;

    return this;
};

/**
 * @summary Component's container attributes getter method
 *
 * @function getContainer
 *
 * @param {string}  container   -   like css selector
 *
 * @return {string} component's container atttibute
 * **/
Component.prototype.getContainer = function () {
    return this._container;
};

/**
 * @summary Component's eventbus setter method
 *
 * @function setEventbus
 *
 * @param {object}  eventbus   -    eventbus instance
 *
 * @return this
 * **/
Component.prototype.setEventbus = function (eventbus) {
    this._eventbus = eventbus;

    return this;
};

/**
 * @summary Component's eventbus attributes getter method
 *
 * @function getEventbus
 *
 * @return {object} component's eventbus atttibute
 * **/
Component.prototype.getEventbus = function () {
    return this._eventbus;
};

/**
 * @summary Component eventbus's event name setter
 *
 * @function setEvent
 *
 * @param {string}  event - like 'event1' etc...
 *
 * @return this
 * **/
Component.prototype.setEvent = function (event) {
    this._event = event;

    return this;
};

/**
 * @summary Component eventbus's event names getter
 *
 * @function getEvent
 *
 * @return {object} component's subscribed event name
 * **/
Component.prototype.getEvent = function () {
    return this._event;
};

/**
 * @summary Component's static state setter method. The method sets to state object to component. After set process calls handleStateChanging for observable state object
 *
 * @function setEvent
 *
 * @param {object}  state - <code>{name : 'Güner Kaan ALKIM', email:'g.kaanalkim@gmail.com'}</code>
 *
 * @return this
 * **/
Component.prototype.setState = function (state) {
    this._state = state;
    this._handleStateChanging();

    return this;
};

/**
 * @summary component's state object getter method
 *
 * @function getState
 *
 * @return {object} component's state object
 * **/
Component.prototype.getState = function () {
    return this._state;
};

/**
 * @summary This method create and return HTML element by passed parameters
 *
 * @function createElement
 *
 * @param {string}  tag     -   like div, button, a etc...
 * @param {object}  option  -   HTMLAttribute(key-value pair)
 *
 * @return {object} A Attr node
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

/**
 * @summary This method create and return HTML element by passed parameters
 *
 * @function createElementFromObject
 *
 * @param {object}  element  -   HTMLAttribute(key-value pair)
 * <code>
 * {
 *     tagName: "tfoot",
 *     class: "tfoot",
 *     id: "tfoot",
 *     myAttribute: "tfoot",
 *     child: [
 *         {
 *             tagName: "tr",
 *             child: [
 *                 {
 *                     tagName: "td",
 *                     text: "Hello"
 *                 },
 *                 {
 *                     tagName: "td",
 *                     text: "World"
 *                 }
 *             ]
 *         }
 *     ]
  }
 * </code>
 * @return {object} A Attr node
 * **/
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
