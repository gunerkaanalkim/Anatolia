var Component = (function () {
    function Component(name, options) {
        this._subscriber = null;
        this._name = name;
        this._options = options;
        this._options = options;

        this._container = this._options.container;
        this._template = this._options.template;
        this._eventbus = this._options.eventbus;

        this._render(this._name, this._template, this._container);
    }

    Component.prototype._render = function (componentName, rawTemplate, container) {
        this._subscriber = new Subscriber('event1', function (state) {
            var template = rawTemplate;

            var regex = /{{\s*([^}]+)\s*}}/g;
            var item;

            while (item = regex.exec(template)) {
                var replacedItem = item[0].trim();
                var searchedItem = item[1].trim();

                if (state.hasOwnProperty(searchedItem)) {
                    template = template.replace(replacedItem, state[searchedItem]);
                }
            }

            document.querySelector(container).innerHTML = template;
        });

        this._eventbus.subscriber().register(this._subscriber);
    };

    Component.prototype.fire = function () {
        this._eventbus.subscriber().fire(this._subscriber);
    };

    return Component;
})();