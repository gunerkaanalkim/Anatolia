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