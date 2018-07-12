'use strict';

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

    if (!this._globalSetting.components.hasOwnProperty(this._name)) {
        this._globalSetting.components[this._name] = {};
    }

    this._subscriber = new Subscriber(this._event, function (state) {
        if (context._container !== undefined) {
            var el = context._renderMethod(state);

            if (context._methods) context._bindEventToTemplate(context._methods, el, state);

            var container = document.querySelector(context._container);
            context._toEmpty(container);
            container.append(el);
        } else {
            throw 'Undefined container for component : ' + context._name;
        }
    });

    this._eventbus.subscriber().register(this._subscriber);
};

Component.prototype.fire = function () {
    this._eventbus.subscriber().fire(this._subscriber);
};

Component.prototype.setContainer = function (componentContainer) {
    this._container = componentContainer;
};

Component.prototype.setEventbus = function (eventbus) {
    this._eventbus = eventbus;
};

Component.prototype.setGlobalSetting = function (anatoliaGlobalSetting) {
    this._globalSetting = anatoliaGlobalSetting;
};

Component.prototype._flatten = function (obj) {
    var toReturn = {};

    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;

        if ((typeof obj[i]) == 'object') {
            var flatObject = this._flatten(obj[i]);
            for (var x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) continue;

                toReturn[i + '.' + x] = flatObject[x];
            }
        } else {
            toReturn[i] = obj[i];
        }
    }
    return toReturn;
};

Component.prototype._toEmpty = function (component) {
    while (component.firstChild) {
        component.removeChild(component.firstChild);
    }
};

Component.createElement = function (tag, option) {
    var el = document.createElement(tag);

    for (var i in option) {
        i === "text" ? el.innerText = option[i] : el.setAttribute(i, option[i]);
    }

    el.on = Component.on;

    return el;
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
                    targetElement: element
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