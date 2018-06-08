/**
 * Created by gunerkaanalkim on 14/04/16.
 */
var DataSource = (function () {
    function FlyDataSource(options) {
        this.type = options.type;
        this.url = options.url;
        this.contentType = options.contentType;
        this.data = options.data;
        this.success = options.success;
        this.beforeSend=options.beforeSend;
        this.complete=options.complete;
    }

    FlyDataSource.prototype.action = function () {
        return $.ajax({
            type: this.type,
            url: this.url,
            contentType: this.contentType,
            data: this.data,
            success: this.success,
            beforeSend:this.beforeSend,
            complete:this.complete
        });
    };

    return FlyDataSource;
})();