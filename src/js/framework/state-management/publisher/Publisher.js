/**
 *  @constructor
 *
 *  @function   Publisher
 *
 *  @param  {object}    options
 *  @return {object}    Publisher instance
 *
 * **/
function Publisher(options) {
    this._init(options);
}

/**
 *  @summary    private constructor's member
 *
 *
 *  @function   _init
 *
 *  @param      {object}    options
 *  @param      {string}    options.event               -   Knowledge where to publish state object
 *  @param      {string}    options.state               -   Pure JS object
 *  @param      {function}  options.propertyHandler     -   Handler method runs after property setting
 *  @param      {function}  options.computedProperties  -   New property method
 *
 * **/
Publisher.prototype._init = function (options) {
    this._event = options.event || null;
    this._state = options.state || null;
    this._propertyHandler = options.propertyHandler || null;
    this._computedProperties = options.computedProperties || null;
    this._mutations = options.mutations || null;

    //Property handler
    this.propertyHandlerMethod();

    //New computed property
    this.computedPropertiesMethod();
};

/**
 *  @summary    Handler method runs after property setting
 *
 *  @public
 *  @function   propertyHandlerMethod
 *
 * **/
Publisher.prototype.propertyHandlerMethod = function () {
    var bundle = {context: this, state: this._state};

    if (this._propertyHandler && this._state) {
        for (var property in this._state) {
            if (this._state.hasOwnProperty(property) && this._propertyHandler.hasOwnProperty(property)) {
                this._propertyHandler[property].call(bundle, property, this._state[property]);
            }
        }
    }
};

/**
 *  @summary    New property method
 *
 *  @public
 *  @function   computedPropertiesMethod
 *
 * **/
Publisher.prototype.computedPropertiesMethod = function () {
    var bundle = {context: this, state: this._state};

    if (this._computedProperties && this._state) {
        for (var newProperty in this._computedProperties) {
            if (this._computedProperties.hasOwnProperty(newProperty)) {

                this._state[newProperty] = this._computedProperties[newProperty].call(bundle, this._state);
            }
        }
    }
};

/**
 *  @summary    Publisher's event name set/get accessor
 *
 *  @public
 *  @function   event
 *
 * **/
Publisher.prototype.event = function () {
    if (arguments.length) {
        this._event = arguments[0];
    }

    return this._event;
};

/**
 *  @summary    Publisher's state set/get accessor
 *
 *  @public
 *  @function   state
 *
 * **/
Publisher.prototype.state = function () {
    if (arguments[0] instanceof Object) {
        this._state = arguments[0];
    } else if (arguments[0] === undefined) {
        return this._state;
    }
};

/**
 *  @summary    toString
 *
 *  @public
 *  @override
 *  @function   toString
 *
 *  @return {object}
 * **/
Publisher.prototype.toString = function () {
    return "Event : " + this._event + " " + " State : " + this._state;
};

Publisher.prototype.mutate = function (mutationName) {
    if (this._mutations.hasOwnProperty(mutationName)) {
        this._mutations[mutationName].call(this, this._state);
    }
};
