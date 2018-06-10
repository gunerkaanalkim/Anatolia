var eventbus = null;
var sub = null;
var pub = null;
var component = null;

var Comp = (function () {
    function Comp() {

    }

    Comp.prototype.usage = function () {
        eventbus = new Eventbus();

        pub = new Publisher('event1', {
            from: 'kaan.alkim@foreks.com',
            to: 'master.everyone',
            message: 'Hello World!',
            clazz: 'alert'
        });

        eventbus.publisher().register(pub);

        component = new Component('myComponent', {
            container: '#component',
            eventbus: eventbus,
            event: 'event1',
            template: "<div><span>{{from}}</span> <span>{{to}}</span> <span>{{message}}</span> </div><div class='{{clazz}}'></div>"
        });
    };

    return Comp;
})();