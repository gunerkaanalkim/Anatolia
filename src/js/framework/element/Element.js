function Element() {
    this._cache = {};
}

Element.prototype.create = function (key, tagName, attributes) {
    var is = Util.is;

    var el = null;

    if(is.defined(this._cache[key]) && is.not.null(this._cache[key])) {
        el = this._cache[key];
    } else {
        el = document.createElement(tagName);

        this._cache[key] = el;
    }

    for (var i in attributes) {
        if (attributes.hasOwnProperty(i))
            i === "text" ? el.innerText = attributes[i] : el.setAttribute(i, attributes[i]);
    }

    el["on"] = Element.on;

    return el;
};

Element.on = function (event, fn) {
    this.addEventListener(event, fn);

    return this;
};

var element = new Element();
