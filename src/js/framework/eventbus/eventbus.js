'use strict';

var Eventbus = (function () {
    var eventbus;

    function Eventbus() {
        eventbus = {};
    }

    /*
    * TODO Take subsscibe ID for multiple subscribing
    * */
    Eventbus.prototype.subscribe = function (event, callback) {
        if (arguments.length === 2) {
            var event = arguments[0];
            var callback = arguments[1];

            return _fillSubscribers(event, callback);

        } else if (arguments.length === 1) {
            var subscriberList = arguments[0];

            var _subscribers = [];

            subscriberList.forEach(function (subscriber) {
                var event = subscriber.event;
                var listener = subscriber.listener;

                _subscribers.push(_fillSubscribers(event, listener));
            });

            return _subscribers;
        } else {
            throw 'Error : Event parameter can not be null.'
        }
    };

    /*
    * TODO 1 : Trigger order of events(round robin algorithm ? Order or weight properties?)
    * */
    Eventbus.prototype.publisher = {
        register: _registerPublisher,
        fire: _fire
    };

    Eventbus.prototype.subscriber = {
        register: _registerSubscriber
    };

    function _registerPublisher() {
        for (var i in arguments) {
            var publisher = arguments[i];

            _fillPublishers(publisher);
        }
    }

    function _registerSubscriber() {
        for (var i in arguments) {
            var subscriber = arguments[i];

            _fillSubscribers(subscriber);
        }
    }

    function _fire(publisher) {
        var event = publisher.event();

        var subscribers = eventbus[event].subscribers;
        var state = eventbus[event].state;

        subscribers.forEach(function (subscriber) {
            subscriber.callback()(state === undefined ? {} : state);
        });
    }

    Eventbus.prototype.listen = function () {
        return _listenEventbus();
    };

    Eventbus.prototype.mute = function () {
        if (!arguments.length) {
            for (var i in eventbus) {
                var event = eventbus[i];

                event.callbacks = [];
            }
        }
    };

    Eventbus.prototype.clean = function () {
        eventbus = {};
    };

    function _fillPublishers(publisher) {
        var event = publisher.event();
        var state = publisher.state();

        if (!eventbus.hasOwnProperty(event)) {
            eventbus[event] = {};
        }

        eventbus[event].state = state;

        if (eventbus[event].subscribers === undefined) {
            eventbus[event].subscribers = [];
            return;
        }

        _fire(publisher);
    }

    function _fillSubscribers(subscriber) {
        var event = subscriber.event();

        if (!eventbus.hasOwnProperty(event)) {
            throw 'Event is not defined.';
        }

        var eventIndex = eventbus[event].subscribers.push(subscriber) - 1;

        eventbus[event].subscribers[eventIndex]._callback(eventbus[event].state);
    }

    function _listenEventbus() {
        return eventbus;
    }

    return Eventbus;
})();

var Publisher = (function () {
    function Publisher(event, state) {
        this._event = event || null;
        this._state = state || null;
    }

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

    return Publisher;
})();

var Subscriber = (function () {
    function Subscriber(event, callback) {
        this._event = event || null;

        if (callback instanceof Function) {
            this._callback = callback || null;
        } else {
            throw 'Contructor should take a callback function.'
        }
    }

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

    return Subscriber;
})();