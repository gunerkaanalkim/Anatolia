var Carousel = (function () {
    function Carousel() {

    }

    Carousel.prototype.usage = function () {
        $("#crs").carousel({
            class: "",
            path: './assets',
            images: ['1.jpg', '2.jpg', '3.jpg'],
            emptyAlert: "Görüntülenecek bir görsel bulunamadı..."
            // ,
            // buttons: [
            //     {
            //         class: "btn btn-default btn-xs",
            //         text: " Varsayılan Yap",
            //         iconClass: "fa fa-check fa-lg",
            //         events: {
            //             click: function (e) {
            //
            //             }
            //         }
            //     },
            //     {
            //         class: "btn btn-danger btn-xs",
            //         text: " Sil",
            //         iconClass: "fa fa-times fa-lg",
            //         events: {
            //             click: function (e) {
            //             }
            //         }
            //     }
            // ]
        });
    };

    return Carousel;
})();