var eventbus;
var eventbus2;

var App = (function () {
    function App() {

    }

    App.prototype.singleComponent = function () {
        eventbus = new Eventbus();

        var pub = new Publisher('event1', {
            text_1: {
                state: 'Sumer',
                year: {
                    start: 'c. 4500',
                    end: 'c. 1900 BC'
                }
            },
            text_2: 'Hitit',
            text_3: 'Hatti',
            text_4: 'Hurri',
            text_5: 'İskit',
            style: "font-size: 20px; text-align:center; padding:50px; background-color: " + '#' + Math.floor(Math.random() * 16777215).toString(16) + "; color: " + '#' + Math.floor(Math.random() * 16777215).toString(16) + "; "
        });

        var pub2 = new Publisher('event2', {
            text_1: 'Türk',
            style: "font-size: 20px; text-align:center; padding:50px; background-color: " + '#' + Math.floor(Math.random() * 16777215).toString(16) + "; color: " + '#' + Math.floor(Math.random() * 16777215).toString(16) + "; "
        });

        eventbus.publisher().register(pub, pub2);

        var component = new Component('myComponent', {
            template: "<div style='{{style}}'> <p>{{text_1.state}} ({{text_1.year.start}} - {{text_1.year.end}})</p> <p>{{text_2}}</p> <p>{{text_3}}</p> <p>{{text_4}}</p> <p my-attribute='foo'>{{text_5}}</p> </div>",
            event: 'event1',
            methods: {
                'p': {
                    click: function () {
                        console.log(this);
                    }
                },
                '[my-attribute=foo]': {
                    mouseenter: function () {
                        var myAttribute = this.getAttribute('my-attribute');

                        console.log('my-attribute : ' + myAttribute);
                    }
                }
            }
        });

        var component_2 = new Component('myComponent', {
            template: "<div style='{{style}}'> <p class='paragraf'>{{text_1}}</p> </div> <div style='{{style}}'> <p class='paragraf'>{{text_1}}</p> </div>",
            event: 'event2',
            methods: {
                '.paragraf': {
                    click: function () {
                        console.log(this);
                    }
                }
            }
        });

        //Routing
        var anatolia = new Anatolia({
            name: 'AnatoliaApp',
            eventbus: eventbus,
            components: {
                '#component_1': component
                ,
                '#component_2': component_2
            }
        });

        anatolia.render();

        // anatolia.listen();
    };

    App.prototype.nestedComponents = function () {
        eventbus2 = new Eventbus();

        var pub = new Publisher('event1', [
            {
                text: "Kadın",
                value: 'K'
            },
            {
                text: "Erkek",
                value: 'E'
            }
        ]);

        eventbus2.publisher().register(pub);

        var component = new Component('myComponent', {
            template: "",
            event: 'event1',
            methods: {
                'li': {
                    click: function () {
                        console.log(this);
                    }
                }
            }
        });

        var anatolia = new Anatolia({
            name: 'AnatoliaApp2',
            eventbus: eventbus2,
            components: {
                '#component_3': component
            }
        });

        anatolia.render();
    };

    return App;
})();