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

    Eventbus.prototype.publish = function (event, state) {
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
    };

    Eventbus.prototype.listen = function () {
        return eventbus;
    };

    return Eventbus;
})();