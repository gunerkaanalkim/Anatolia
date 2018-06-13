'use strict';

function Anatolia(options) {
    this._options = options;
    this._appName = options.appName;
    this._eventbus = options.eventbus;
    this._components = options.components;
}

Anatolia.prototype.constructor = Anatolia;

Anatolia.prototype.listen = function () {
    console.table(this._options);
};

Anatolia.prototype.render = function () {
    for (var i in this._components) {
        var componentContainer = i;
        var component = this._components[i];

        component.setContainer(componentContainer);
        component.setEventbus(this._eventbus);

        console.log(component._render());
    }

    return this;
};