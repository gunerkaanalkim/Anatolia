'use strict';

var Eventbus = (function () {
    var _eventbus;

    function Eventbus() {
        _eventbus = {};
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
        fire: _firePublisher
    };

    Eventbus.prototype.subscriber = {
        register: _registerSubscriber,
        fire: _fireSubscriber
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

    function _firePublisher(publisher) {
        var event = publisher.event();

        var subscribers = _eventbus[event].subscribers;
        var state = _eventbus[event].state;

        subscribers.forEach(function (subscriber) {
            subscriber.callback()(state === undefined ? {} : state);
        });
    }

    function _fireSubscriber(subscriber) {
        var event = subscriber.event();

        subscriber.callback()(_eventbus[event].state);
    }

    Eventbus.prototype.listen = function () {
        return _listenEventbus();
    };

    Eventbus.prototype.mute = function () {
        if (!arguments.length) {
            for (var i in _eventbus) {
                var event = _eventbus[i];

                event.callbacks = [];
            }
        }
    };

    Eventbus.prototype.clean = function () {
        _eventbus = {};
    };

    function _fillPublishers(publisher) {
        var event = publisher.event();
        var state = publisher.state();

        if (!_eventbus.hasOwnProperty(event)) {
            _eventbus[event] = {};
        }

        _eventbus[event].state = state;

        if (_eventbus[event].subscribers === undefined) {
            _eventbus[event].subscribers = [];
            return;
        }

        _fire(publisher);
    }

    function _fillSubscribers(subscriber) {
        var event = subscriber.event();

        if (!_eventbus.hasOwnProperty(event)) {
            throw 'Event is not defined.';
        }

        var eventIndex = _eventbus[event].subscribers.push(subscriber) - 1;

        _eventbus[event].subscribers[eventIndex]._callback(_eventbus[event].state);
    }

    function _listenEventbus() {
        return _eventbus;
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