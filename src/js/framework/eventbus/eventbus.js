'use strict';

/**
 * Anatolia Eventbus
 * Returns observable object
 *
 * @summary Observable event-bus object
 * @author Güner Kaan ALKIM <g.kaanalkim@gmail.com>
 *
 * @constructor
 * @version 1.0.0
 * @function   Eventbus
 * @return     Eventbus instance
 * **/
function Eventbus() {
    this._eventbus = {};
    this._mute = false;
}

/**
 *  @summary    Listen to Evenbus object
 *
 *  @public
 *  @function   listen
 *
 *  @return     eventbus instance
 *
 * **/
Eventbus.prototype.listen = function () {
    return this._eventbus;
};

/**
 *  @summary    Stops all events
 *
 *  @public
 *  @function   mute
 *
 * **/
Eventbus.prototype.mute = function () {
    if (!this._mute) {
        this._mute = true;
    }
};

/**
 *  @summary    Starts all events
 *
 *  @public
 *  @function   unmuted
 *
 * **/
Eventbus.prototype.unmuted = function () {
    if (this._mute) {
        this._mute = false;
    }
};

/**
 *  @summary    Removes all publisher and their subscriber
 *
 *  @public
 *  @function   clean
 *
 * **/
Eventbus.prototype.clean = function () {
    this._eventbus = {};
};

/**
 *  @summary    Gets all subscribable events
 *
 *  @public
 *  @function   getSubscriptionList
 *
 * **/
Eventbus.prototype.getSubscriptionList = function () {
    return Object.keys(this._eventbus);
};

/**
 *  @function           publisher
 *
 *  @public
 *  @return {object}    Return value contains two function; register and fire.
 *
 * **/
Eventbus.prototype.publisher = function () {
    return {
        register: this._registerPublisher.bind(this),
        fire: this._firePublisher.bind(this)
    }
};

/**
 *  @summary    Used to register publishers to eventbus
 *
 *
 *  @function   _registerPublisher
 *
 * **/
Eventbus.prototype._registerPublisher = function () {
    for (var i in arguments) {
        var publisher = arguments[i];

        this._fillPublishers(publisher);
    }
};

/**
 *  @summary    Used to fill a publisher to eventbus
 *
 *
 *  @function   _fillPublishers
 *
 *  @param      {object}    Publisher
 *
 * **/
Eventbus.prototype._fillPublishers = function (publisher) {
    var event = publisher.event();
    var state = publisher.state();

    if (!this._eventbus.hasOwnProperty(event)) {
        this._eventbus[event] = {};
    }

    this._eventbus[event].state = state;

    if (this._eventbus[event].subscribers === undefined) {
        this._eventbus[event].subscribers = [];
        return;
    }

    this._firePublisher(publisher);
};

/**
 *  @summary    Used to trigger publisher's subscribers
 *
 *
 *  @function   _firePublisher
 *
 *  @param  {object}    Publisher
 *
 * **/
Eventbus.prototype._firePublisher = function (publisher) {
    var context = this;

    var event = publisher.event();

    var subscribers = context._eventbus[event].subscribers;

    var toFireds = [];
    var state = null;

    subscribers.forEach(function (subscriber) {
        var events = subscriber.event();

        if (Array.isArray(events)) {
            state = {};

            events.forEach(function (event) {
                state[event] = context._eventbus[event].state;
            });

            toFireds.push({
                state: state,
                callback: subscriber.callback()
            });
        } else {
            state = context._eventbus[events].state;
            toFireds.push({
                state: state,
                callback: subscriber.callback()
            });
        }

    });

    toFireds.forEach(function (toFired) {
        toFired.callback(toFired.state);
    });
};

/**
 *  @function           subscriber
 *
 *  @public
 *  @return {object}    Return value contains two function; register and fire.
 *
 * **/
Eventbus.prototype.subscriber = function () {
    return {
        register: this._registerSubscriber.bind(this),
        fire: this._fireSubscriber.bind(this)
    }
};

/**
 *  @summary    Used to register subscribers to publisher
 *
 *
 *  @function   _registerSubscriber
 *
 * **/
Eventbus.prototype._registerSubscriber = function () {
    for (var i in arguments) {
        var subscriber = arguments[i];

        this._fillSubscribers(subscriber);
    }
};

/**
 *  @summary    Used to fill a subscriber to publisher
 *
 *
 *  @function   _fillSubscribers
 *
 *  @param      {object}    Subscriber
 *
 * **/
Eventbus.prototype._fillSubscribers = function (subscriber) {
    var context = this;
    var states = {};

    if (Array.isArray(subscriber.event())) {
        subscriber.event().forEach(function (event, index) {
            if (context._isEvent(event)) {
                states[event] = context._eventbus[event].state;

                if (index === (subscriber.event().length - 1)) { // one time fire
                    _action(context, subscriber.event(), states);
                }
            }
        });
    } else {
        if (context._isEvent(subscriber.event())) {
            states[subscriber.event()] = context._eventbus[subscriber.event()].state;
            _action(context, [subscriber.event()], states);
        }
    }

    function _action(context, events, states) {
        var eventIndex = null;
        var _event = null;

        events.forEach(function (event) {
            if (!context._eventbus.hasOwnProperty(event)) {
                throw 'Event is not defined.';
            }

            eventIndex = context._eventbus[event].subscribers.push(subscriber) - 1;
            _event = event
        });


        context._eventbus[_event].subscribers[eventIndex]._callback(states);
    }
};

/**
 *  @summary    Used to trigger a subscribers
 *
 *
 *  @function   _firePublisher
 *
 *  @param  {object}    Publisher
 *
 * **/
Eventbus.prototype._fireSubscriber = function (subscriber) {
    if (!this._mute) {
        var context = this;

        var toFireds = [];
        var state = null;

        var events = subscriber.event();

        if (Array.isArray(events)) {
            state = {};

            events.forEach(function (event) {
                state[event] = context._eventbus[event].state;
            });

            toFireds.push({
                state: state,
                callback: subscriber.callback()
            });
        } else {
            state = context._eventbus[events].state;
            toFireds.push({
                state: state,
                callback: subscriber.callback()
            });
        }

        toFireds.forEach(function (toFired) {
            toFired.callback(toFired.state);
        });
    }
};

/**
 *  @summary    Eventbus contains this event returns true
 *
 *
 *  @function   _isEvent
 *
 *  @param  {boolean}   if eventbus contains this event
 *
 * **/
Eventbus.prototype._isEvent = function (eventName) {
    if (this._eventbus.hasOwnProperty(eventName)) {
        return true;
    }

    throw "Anatolia Error : Unknown event!"
};

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