'use strict';

function Eventbus() {
    this._eventbus = {};
}

//TODO publisher change event with object propert set event
Eventbus.prototype.constructor = Eventbus;

/*
* TODO 1 : Trigger order of events(round robin algorithm ? Order or weight properties?)
* */
Eventbus.prototype.publisher = function () {
    return {
        register: this._registerPublisher,
        fire: this._firePublisher,
        _context: this
    }
};

Eventbus.prototype.subscriber = function () {
    return {
        register: this._registerSubscriber,
        fire: this._fireSubscriber,
        _context: this
    }
};

Eventbus.prototype.listen = function () {
    return this._eventbus;
};

Eventbus.prototype.mute = function () {
    if (!arguments.length) {
        for (var i in this._eventbus) {
            var event = this._eventbus[i];

            event.subscribers = [];
        }
    }
};

Eventbus.prototype.clean = function () {
    this._eventbus = {};
};

Eventbus.prototype._registerPublisher = function () {
    for (var i in arguments) {
        var publisher = arguments[i];

        this._context._fillPublishers(publisher);
    }
};

Eventbus.prototype._registerSubscriber = function () {
    for (var i in arguments) {
        var subscriber = arguments[i];

        this._context._fillSubscribers(subscriber);
    }
};

Eventbus.prototype._firePublisher = function (publisher) {
    var event = publisher.event();

    if (!this._context._eventbus[event])
        throw 'Error : Event not found.';

    var subscribers = this._context._eventbus[event].subscribers;
    var state = this._context._eventbus[event].state;

    subscribers.forEach(function (subscriber) {
        subscriber.callback()(state === undefined ? {} : state);
    });
};

Eventbus.prototype._fireSubscriber = function (subscriber) {
    var event = subscriber.event();

    subscriber.callback()(this._context._eventbus[event].state);
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

    this._fire(publisher);
};

Eventbus.prototype._fillSubscribers = function (subscriber) {
    var event = subscriber.event();
    var state = this._eventbus[event].state;

    if (!this._eventbus.hasOwnProperty(event)) {
        throw 'Event is not defined.';
    }

    var eventIndex = this._eventbus[event].subscribers.push(subscriber) - 1;

    this._eventbus[event].subscribers[eventIndex]._callback(state);
};

Eventbus.prototype._fire = function (publisher) {
    var event = publisher.event();

    var subscribers = this._eventbus[event].subscribers;
    var state = this._eventbus[event].state;

    subscribers.forEach(function (subscriber) {
        subscriber.callback()(state === undefined ? {} : state);
    });
};

/*
* Publisher
* */
function Publisher(options) {
    this._init(options);
}

Publisher.prototype.constructor = Publisher;

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
    if (this._propertyHandler && this._state) {
        for (var property in this._state) {
            if (this._state.hasOwnProperty(property) && this._propertyHandler.hasOwnProperty(property)) {
                this._propertyHandler[property](property, this._state[property]);
            }
        }
    }
};

Publisher.prototype.computedPropertiesMethod = function () {
    if (this._computedProperties && this._state) {
        for (var newProperty in this._computedProperties) {
            if (this._computedProperties.hasOwnProperty(newProperty)) {
                this._state[newProperty] = this._computedProperties[newProperty](this._state);
            }
        }
    }

    console.log(this._state);
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

/*
* Subsriber
* */
function Subscriber(event, callback) {
    this._event = event || null;

    if (callback instanceof Function) {
        this._callback = callback || null;
    } else {
        throw 'Contructor should take a callback function.'
    }
}

Subscriber.prototype.constructor = Subscriber;

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