'use strict';

function Eventbus() {
    this._eventbus = {};
    this._mute = false;
}

/**
 * Eventbus Operation
 * **/
Eventbus.prototype.listen = function () {
    return this._eventbus;
};

Eventbus.prototype.mute = function () {
    if (!this._mute) {
        this._mute = true;
    }
};

Eventbus.prototype.unmuted = function () {
    if (this._mute) {
        this._mute = false;
    }
};

Eventbus.prototype.clean = function () {
    this._eventbus = {};
};

Eventbus.prototype.getSubscriptionList = function () {
    return Object.keys(this._eventbus);
};

/**
 * Publisher Operation
 * **/
Eventbus.prototype.publisher = function () {
    return {
        register: this._registerPublisher.bind(this),
        fire: this._firePublisher.bind(this)
    }
};

Eventbus.prototype._registerPublisher = function () {
    for (var i in arguments) {
        var publisher = arguments[i];

        this._fillPublishers(publisher);
    }
};

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

Eventbus.prototype._firePublisher = function (publisher) {
    var context = this;
    var event = publisher.event();

    if (!this._eventbus[event])
        throw 'Error : Event not found.';

    var subscribers = this._eventbus[event].subscribers;

    var toFired = {};
    var state = {};
    subscribers.forEach(function (subscriber) {
        if (Array.isArray(subscriber.event())) {
            subscriber.event().forEach(function (event) {
                state[event] = context._eventbus[event].state;
                toFired[subscriber.getId()] = {
                    state: state,
                    callback: subscriber.callback()
                };
            });
        } else {
            state[event] = context._eventbus[event].state;
            toFired[subscriber.getId()] = {
                state: state[event],
                callback: subscriber.callback()
            };
        }

    });

    for (var prop in toFired) {
        if (toFired.hasOwnProperty(prop)) {
            if (!this._mute) {
                var _callback = toFired[prop].callback;
                var _state = toFired[prop].state;

                _callback(_state);
            }
        }
    }
};

/**
 * Subscriber Operation
 * **/
Eventbus.prototype.subscriber = function () {
    return {
        register: this._registerSubscriber.bind(this),
        fire: this._fireSubscriber.bind(this)
    }
};

Eventbus.prototype._registerSubscriber = function () {
    for (var i in arguments) {
        var subscriber = arguments[i];

        this._fillSubscribers(subscriber);
    }
};

Eventbus.prototype._fillSubscribers = function (subscriber) {
    var context = this;
    var states = {};

    if (Array.isArray(subscriber.event())) {
        subscriber.event().forEach(function (event, index) {
            states[event] = context._eventbus[event].state;

            if (index === (subscriber.event().length - 1)) { // one time fire
                _action(context, subscriber.event(), states);
            }
        });
    } else {
        states[subscriber.event()] = context._eventbus[subscriber.event()].state;
        _action(context, [subscriber.event()], states);
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

Eventbus.prototype._fireSubscriber = function (subscriber) {
    if (!this._mute) {
        if (Array.isArray(subscriber.event())) {
            subscriber.event().forEach(function (event) {
                subscriber.callback()(this._eventbus[event].state);
            });
        } else {
            subscriber.callback()(this._eventbus[subscriber.event()].state);
        }
    }
};

/**
 * Publisher
 * **/
function Publisher(options) {
    this._init(options);
}

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

Publisher.prototype.event = function () {
    if (arguments.length) {
        this._event = arguments[0];
    }

    return this._event;
};

Publisher.prototype.state = function () {
    if (arguments[0] instanceof Object) {
        this._state = arguments[0];
    } else if (arguments[0] === undefined) {
        return this._state;
    }
};

Publisher.prototype.toString = function () {
    return "Event : " + this._event + " " + " State : " + this._state;
};

/**
 * Subscriber
 * **/
function Subscriber(options) {
    this._init(options);
}

Subscriber.prototype._init = function (options) {
    this._id = options.id || null;
    this._event = options.event || null;

    if (options.callback instanceof Function) {
        this._callback = options.callback || null;
    } else {
        throw 'Contructor should take a callback function.'
    }
};

Subscriber.prototype.event = function () {
    if (arguments.length) {
        this._event = arguments[0];
    }

    return this._event;
};

Subscriber.prototype.callback = function () {
    if (arguments[0] instanceof Function) {
        this._callback = arguments[0];
    } else if (arguments[0] === undefined) {
        return this._callback;
    }
};

Subscriber.prototype.setId = function (id) {
    this._id = id;
};

Subscriber.prototype.getId = function () {
    return this._id;
};