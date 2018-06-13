var Component = (function () {
    function Component(name, options) {
        this._subscriber = null;
        this._name = name;
        this._options = options;

        this._container = this._options.container;
        this._template = this._options.template;
        this._eventbus = this._options.eventbus;
        this._methods = this._options.methods;

        this._render(this._name, this._template, this._container, this._methods);
    }

    Component.prototype._render = function (componentName, rawTemplate, container, methods) {
        window.fon.components[componentName] = {};
        window.fon.components[componentName] = {};

        this._subscriber = new Subscriber('event1', function (state) {
            var component = document.createElement(componentName);

            var template = rawTemplate;

            var expressionRegex = /{{\s*([^}]+)\s*}}/g;
            var expression;

            while (expression = expressionRegex.exec(template)) {
                var replacedExpression = expression[0].trim();
                var searchedExpression = expression[1].trim();

                if (state.hasOwnProperty(searchedExpression)) {
                    template = template.replace(replacedExpression, state[searchedExpression]);
                }
            }

            var methodsRegex = /f-on:(\S+)\s*=\s*([']|["])\s*([\W\w]*?)\s*\2/g;

            while (method = methodsRegex.exec(template)) {
                var replacedMethod = method[0].trim();
                var searchedMethod = method[1].trim();
                var event = method[3].trim();
                var eventKey = method[3].trim().split('(')[0];

                if (methods.hasOwnProperty(method[3].trim().split('(')[0])) {
                    template = template.replace(replacedMethod, 'on' + searchedMethod + '=\'window.fon.components.' + componentName + '.' + event + '\'');
                }

                window.fon.components[componentName][eventKey] = methods[eventKey];
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