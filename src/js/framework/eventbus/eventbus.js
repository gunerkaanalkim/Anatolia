'use strict';

var Eventbus = (function () {
    var eventbus;

    function Eventbus() {
        eventbus = {};
    }

    Eventbus.prototype.subscribe = function (event, callback) {
        if (arguments.length === 2) {
            var event = arguments[0];
            var callback = arguments[1];

            return _fillSubscribers(event, callback);

        } else if (arguments.length === 1) {
            var subscriberList = arguments[0];

            subscriberList.forEach(function (subscriber) {
                var event = subscriber.event;
                var listener = subscriber.listener;

                return _fillSubscribers(event, listener);
            });
        } else {
            throw 'Error : Event parameter can not be null.'
        }
    };

    /*
    * TODO 1 : Trigger order of events(round robin algorithm ? Order or weight properties?)
    * */
    Eventbus.prototype.publish = function () {
        if (arguments.length === 2) {
            var event = arguments[0];
            var state = arguments[1];

            _fillPublishers(event, state);

        } else if (arguments.length === 1) {
            var publisherList = arguments[0];

            publisherList.forEach(function (publisher) {
                var event = publisher.event;
                var state = publisher.state;

                _fillPublishers(event, state);
            });

        } else {
            throw 'Error : Event parameter can not be null.'
        }
    };

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