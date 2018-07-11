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