/**
 *  @constructor
 *
 *  @function   Subscriber
 *
 *  @param  {object}    options
 *  @return {object}    Subscriber instance
 *
 * **/
function Subscriber(options) {
    this._init(options);
}

/**
 *  @summary    private constructor's member
 *
 *
 *  @function   _init
 *
 *  @param      {object}    options
 *  @param      {string}    options.id                  -   Unique subscriber identity
 *  @param      {string}    options.event               -   Eventbus's event name
 *  @param      {function}  options.callback            -   Calls after publisher' state set
 *
 * **/
Subscriber.prototype._init = function (options) {
    this._id = options.id || null;
    this._event = options.event || null;

    if (options.callback instanceof Function) {
        this._callback = options.callback || null;
    } else {
        throw 'Contructor should take a callback function.'
    }
};

/**
 *  @summary    Subsciber's event name set/get accessor
 *
 *  @public
 *  @function   event
 *
 * **/
Subscriber.prototype.event = function () {
    if (arguments.length) {
        this._event = arguments[0];
    }

    return this._event;
};

/**
 *  @summary    Calls after publisher' state set
 *
 *  @public
 *  @function   callback
 *
 * **/
Subscriber.prototype.callback = function () {
    if (arguments[0] instanceof Function) {
        this._callback = arguments[0];
    } else if (arguments[0] === undefined) {
        return this._callback;
    }
};

/**
 *  @summary    Subsciber's identity set accessor
 *
 *  @public
 *  @function   setId
 *
 * **/
Subscriber.prototype.setId = function (id) {
    this._id = id;
};

/**
 *  @summary    Subsciber's identity get accessor
 *
 *  @public
 *  @function   getId
 *
 * **/
Subscriber.prototype.getId = function () {
    return this._id;
};