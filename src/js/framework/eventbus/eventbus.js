var Eventbus = (function () {
    var eventbus;

    function Eventbus() {
        eventbus = {};
    }

    Eventbus.prototype.subscribe = function (event, callback) {
        if (!eventbus.hasOwnProperty(event)) {
            throw 'Event is not defined.';
        }

        var eventIndex = eventbus[event].callbacks.push(callback) - 1;

        eventbus[event].callbacks[eventIndex](eventbus[event].state);

        return {
            unsubscribe: function () {
                delete eventbus[event]['callbacks'].splice(eventIndex, 1);
            }
        };
    };

    /*
    * TODO 1 : Trigger order of events(round robin algorithm ? Order or weight properties?)
    * */
    Eventbus.prototype.publish = function () {
        if (arguments.length === 2) {
            var event = arguments[0];
            var state = arguments[1];

            _fillEventbus(event, state);

        } else if (arguments.length === 1) {
            var channelList = arguments[0];

            channelList.forEach(function (channel) {
                var event = channel.event;
                var state = channel.state;

                _fillEventbus(event, state);
            });

        } else {
            throw 'Error : Event parameter can not be null.'
        }
    };

    Eventbus.prototype.listen = function () {
        return eventbus;
    };

    function _fillEventbus(event, state) {
        if (!eventbus.hasOwnProperty(event)) {
            eventbus[event] = {};
        }

        eventbus[event].state = state;

        if (eventbus[event].callbacks === undefined) {
            eventbus[event].callbacks = [];
            return;
        }

        eventbus[event].callbacks.forEach(function (callback) {
            callback(state != undefined ? state : {});
        });
    }

    return Eventbus;
})();