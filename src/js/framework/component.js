var Component = (function () {
    function Component(name, options) {
        this._subscriber = null;
        this._name = name;
        this._options = options;

        this._template = this._options.template;
        this._eventbus = this._options.eventbus;

        this._render(this._name, this._template, this._eventbus);
    }

    Component.prototype._render = function (componentName, template, eventbus) {
        this._subscriber = new Subscriber('event1', function (state) {
            var componentContainer = document.createElement(componentName);


            console.log(state);
        });

        eventbus.subscriber().register(this._subscriber);
    };

    Component.prototype.fire = function () {
        this._eventbus.subscriber().fire(this._subscriber);
    };

    return Component;
})();