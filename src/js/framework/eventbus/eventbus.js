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
        register: _register,
        multipleRegister: _multipleRegister
        // register: function () {
        //     console.log('publisher was register')
        // }
    };

    Eventbus.prototype.subscriber = {
        register: function () {
            console.log('subscriber was register');
        }
    };

    function _register() {
        for (var i in arguments) {
            var publisher = arguments[i];

            var event = publisher.event();
            var state = publisher.state();

            _fillPublishers(event, state);
        }
    }

    function _multipleRegister() {


        // debugger;
        // var publishers = arguments[0];
        //
        // publishers.forEach(function (publisher) {
        //     var event = publisher.event();
        //     var state = publisher.state();
        //
        //     _fillPublishers(event, state);
        // });
    }

    Eventbus.prototype.listen = function () {
        return _listenEventbus();
    };

    Eventbus.prototype.fire = function () {
        if (!arguments.length) {
            for (var i in eventbus) {
                var event = eventbus[i];

                event.callbacks.forEach(function (callback) {
                    callback(event.state === undefined ? {} : event.state);
                });
            }

            return;
        }

        var event = arguments[0];
        var eventState = _listenEventbus()[event].state;
        var callBacks = _listenEventbus()[event].callbacks;

        callBacks.forEach(function (callback) {
            callback(eventState === undefined ? {} : eventState)
        })
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

    function _fillPublishers(event, state) {
        if (!eventbus.hasOwnProperty(event)) {
            eventbus[event] = {};
        }

        eventbus[event].state = state;

        if (eventbus[event].callbacks === undefined) {
            eventbus[event].callbacks = [];
            return;
        }

        eventbus[event].callbacks.forEach(function (callback) {
            callback(state === undefined ? {} : state);
        });
    }

    function _fillSubscribers(event, callback) {
        if (!eventbus.hasOwnProperty(event)) {
            throw 'Event is not defined.';
        }

        var eventIndex = eventbus[event].callbacks.push(callback) - 1;

        eventbus[event].callbacks[eventIndex](eventbus[event].state);

        return {
            unsubscribe: function () {
                eventbus[event]['callbacks'].splice(eventIndex, 1);
            }
        };
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