# Anatolia 
Understandable and production-ready JavaScript framework for amazing UI/UX

**Dev Installation** 

```
git clone https://github.com/gunerkaanalkim/Anatolia.git
cd Anatolia
rm -rf .git
bower install
//foo
//bar
//tar
```

**Sample Component**
```js
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

var component = new Component('myComponent', {
    template: "<div style='{{style}}'> <p>{{text_1}}</p> <p >{{text_2}}</p> <p>{{text_3}}</p> <p>{{text_4}}</p> <p my-attribute='foo'>{{text_5}}</p> </div>",
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
```