var Component = (function () {
    function Component(name, options) {
        this._options = options;
        this._name = name;

        this._initialize(options);
    }

    Component.prototype._initialize = function () {
        this._subscriber = null;
        this._template = this._options.template;
        this._methods = this._options.methods;
    };

    Component.prototype._render = function () {
        var context = this;
        // window.fon.components[this._name] = {};
        if (!this._globalSetting.components.hasOwnProperty(this._name)) {
            this._globalSetting.components[this._name] = {};
            this._globalSetting.components[this._name]['methods'] = {};
        }

        this._subscriber = new Subscriber('event1', function (state) {
            var component = document.createElement(context._name);

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

            var methodsRegex = /f-on:(\S+)\s*=\s*([']|["])\s*([\W\w]*?)\s*\2/g;

            while (method = methodsRegex.exec(template)) {
                var replacedMethod = method[0].trim();
                var searchedMethod = method[1].trim();
                var event = method[3].trim();
                var eventKey = method[3].trim().split('(')[0];

                //Setting event in global anatolia object
                context._globalSetting.components[context._name]['methods'][eventKey] = context._methods[eventKey];


                if (context._methods.hasOwnProperty(method[3].trim().split('(')[0])) {
                    template = template.replace(replacedMethod, 'on' + searchedMethod + '=\'window._anatolia.components.' + context._name + '.methods.' + event + '\'');
                }

                // window.fon.components[context._name][eventKey] = context._methods[eventKey];
            }

            if (context._container !== undefined) {
                document.querySelector(context._container).innerHTML = template;
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

    return Component;
})();