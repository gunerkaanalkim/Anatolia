function benchmark() {
    var suite = new Benchmark.Suite;

    suite
        .add('Anatolia_1', function () {
            var state1 = {
                value: Math.random()
            };

            new MemoizeComponent({
                container: "#component_1",
                state: state1,
                render: function (state) {
                    var button = Component.createElement("a", {
                        class: "btn btn-warning",
                        text: state.value
                    });

                    return button;
                }
            }).render();
        })
        // .add('Anatolia_2', function () {
        //     var state2 = {
        //         value: Math.random()
        //     };
        //
        //     new Component({
        //         container: "#component_2",
        //         state: state2,
        //         render: function (state) {
        //             var button = Component.createElement("a", {
        //                 class: "btn btn-warning",
        //                 text: state.value
        //             });
        //
        //             return button;
        //         }
        //     }).render();
        // })
        // .add('Vue', function () {
        //     var value = Math.random();
        //
        //     Vue.component('my_component', {
        //         data: function () {
        //             return {
        //                 value: value
        //             }
        //         },
        //         template: '<a class="btn btn-default">{{value}}</a>'
        //     });
        //
        //     new Vue({el: "#component_3"})
        // })
        // .add('React', function () {
        //     class Sample extends React.Component {
        //         render() {
        //             return React.createElement("a", null, Math.random())
        //         }
        //     }
        //
        //     ReactDOM.render(
        //         React.createElement(Sample, null, null),
        //         document.getElementById('component_4')
        //     );
        // })
        // add listeners
        .on('cycle', function (event) {
            console.log(String(event.target));
        })
        .on('complete', function () {
            console.log('Fastest is ' + this.filter('fastest').map('name'));
        })
        // run async
        .run({'async': true});
}

benchmark();

// function sum(a, b) {
//     return a + b;
// }
//
// var memoizeSum = Memoization(sum);
// console.log(memoizeSum(1, 2));
// console.log(memoizeSum(3, 4));
//
//
// function sum2(options) {
//     return options.val1 + options.val2;
// }
//
// var memoizedSum2 = Memoization(sum2);
// console.log(memoizedSum2({val1: 3, val2: 4}));
// console.log(memoizedSum2({val1: 5, val2: 8}));
// console.log(memoizedSum2({val1: 5, val2: 8}));
