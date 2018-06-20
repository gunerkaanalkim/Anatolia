'use strict';

function AnatoliaTemplate(options) {
    this._template = options.template;
    this._data = options.data;
    this._methods = options.methods;
}

AnatoliaTemplate.prototype.constructor = AnatoliaTemplate;

AnatoliaTemplate.prototype.parseAndReplace = function () {
    var context = this;

    var matchList = [];
    var expressionRegex = /{{\s*([^}]+)\s*}}/g;
    var matcher;

    while (matcher = expressionRegex.exec(context._template)) {
        var obj = {};
        obj.searched = matcher[0];
        obj.replaced = matcher[1];

        matchList.push(obj);
    }

    matchList.forEach(function (matching) {
        context._template = context._template.replace(matching.searched, context._flatten(context._data)[matching.replaced]);
    });

    return context;
};

AnatoliaTemplate.prototype.bindMethods = function (bindMethods) {
    var context = this;

    var component = document.createElement('template');
    component.innerHTML = context._template;

    for (var i in bindMethods) {
        var methods = bindMethods[i];

        for (var j in methods) {
            var fn = methods[j];

            var targetElements = component.content.querySelectorAll(i);

            targetElements.forEach(function (element) {
                element.addEventListener(j, fn);
            });
        }
    }

    return component;
};

AnatoliaTemplate.prototype.listen = function () {
    return this._template;
};

AnatoliaTemplate.prototype._flatten = function (obj) {
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