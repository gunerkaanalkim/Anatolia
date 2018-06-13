'use strict';

function Component(name, options) {
    this._options = options;
    this._name = name;

    this._initialize(options);
}

Component.prototype._initialize = function () {
    this._subscriber = null;
    this._template = this._options.template;
    this._event = this._options.event;
    this._methods = this._options.methods;
};

Component.prototype._render = function () {
    var context = this;
    if (!this._globalSetting.components.hasOwnProperty(this._name)) {
        this._globalSetting.components[this._name] = {};
    }

    this._subscriber = new Subscriber(this._event, function (state) {
        var template = context._template;

        var expressionRegex = /{{\s*([^}]+)\s*}}/g;
        var expression;

        while (expression = expressionRegex.exec(template)) {
            var replacedExpression = expression[0].trim();
            var searchedExpression = expression[1].trim();

            if (state.hasOwnProperty(searchedExpression)) {
                template = template.replace(replacedExpression, state[searchedExpression]);
            }
        }

        var component = document.createElement('template');
        component.innerHTML = template;

        for (var i in context._methods) {
            var methods = context._methods[i];

            for (var j in methods) {
                var fn = methods[j];

                var targetElements = component.content.querySelectorAll(i);

                targetElements.forEach(function (element) {
                    element.addEventListener(j, fn);
                });
            }
        }

        if (context._container !== undefined) {
            document.querySelector(context._container).append(component.content);
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