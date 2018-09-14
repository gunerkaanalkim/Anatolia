'use strict';

function Anatolia(options) {
    this._options = options;
    this._appName = options.appName;
    this._eventbus = options.eventbus;
    this._components = options.components;

    this._initialize();
}

Anatolia.prototype.constructor = Anatolia;

Anatolia.prototype._initialize = function () {
    if (!window.hasOwnProperty('_anatolia')) {
        window._anatolia = {};
        window._anatolia.components = {};
    }
};

Anatolia.prototype.listen = function () {
    return this._options;
};

Anatolia.prototype.render = function () {
    for (var i in this._components) {
        var componentContainer = i;
        var component = this._components[i];

        component.setContainer(componentContainer);
        component.setEventbus(this._eventbus);
        component.setGlobalSetting(window._anatolia);

        component._render();
    }

    return this;
};
