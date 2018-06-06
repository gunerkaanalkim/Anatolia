var Pager = (function () {
    "use strict";

    function FlyPagination(options) {
        this._entryPerPage = options.entryPerPage;
        this._buttonCount = options.buttonCount;
        this._class = options.class;
        this._dataLength = null;

        this._totalPageSize = 10;

        this._currentPage = 1;
        this._minPageSize = 1;
    }

    FlyPagination.prototype.createPagination = function () {
        var paginationContainer = jQuery("<nav>");

        var paginationList = jQuery("<ul>", {
            "class": "fly-pagination pagination " + this._class
        });

        paginationContainer.append(
            paginationList
        );

        var previousButtonElement = jQuery("<li>");
        var previousButtonAnchor = jQuery("<a>", {
            "aria-label": "Previous",
            "class": "fly-pagination-button"
        });
        var previousButtonText = jQuery("<span>", {
            "aria-hidden": "true",
            "html": "&laquo;"
        });

        paginationList.append(
            previousButtonElement.append(
                previousButtonAnchor.append(previousButtonText)
            )
        );

        previousButtonElement.on("click", jQuery.proxy(this._onClickPrevious, this));

        var pageCounter = 0;
        if (this._totalPageSize <= this._buttonCount) {
            pageCounter = this._totalPageSize;
        }

        if (this._totalPageSize > this._buttonCount) {
            pageCounter = this._buttonCount;
        }

        if (this._totalPageSize == null) {
            pageCounter = this._buttonCount;
        }

        for (var i = 0; i < pageCounter; i++) {
            var paginationElement = jQuery("<li>", {
                "class": "fly-pagination-button-container"
            });

            if ((i + 1) == this._currentPage) {
                paginationElement.addClass("active");
            }

            var paginationElementText = jQuery("<a>", {
                "text": i + 1,
                "page-no": i + 1,
                "class": "fly-pagination-button"
            });

            paginationList.append(
                paginationElement.append(
                    paginationElementText
                )
            );
            paginationElement.on("click", jQuery.proxy(this.onClickPageButton, this));
        }

        var nextButtonElement = jQuery("<li>");
        var nextButtonAnchor = jQuery("<a>", {
            "aria-label": "Previous",
            "class": "fly-pagination-button"
        });
        var nextButtonText = jQuery("<span>", {
            "aria-hidden": "true",
            "html": "&raquo;"
        });

        nextButtonElement.on("click", jQuery.proxy(this._onClickNext, this));

        paginationList.append(
            nextButtonElement.append(
                nextButtonAnchor.append(nextButtonText)
            )
        );

        return paginationList;
    };

    FlyPagination.prototype.onClickPageButton = function (e) {
        var pageNo = e.target.getAttribute("page-no");

        this._currentPage = parseInt(pageNo);

        this._setActive(pageNo);

        this._onPageButtonClickCallback(this);
    };

    FlyPagination.prototype._setActive = function (pageNo) {
        $(".fly-pagination-button-container").removeClass("active");
        $("a[page-no=" + pageNo + "]").parent().addClass("active");
    };

    FlyPagination.prototype.getCurrentPage = function () {
        return this._currentPage;
    };

    FlyPagination.prototype.setDataLength = function (dataLength) {
        this._dataLength = dataLength;

        if (this._dataLength != null) {
            this._totalPageSize = Math.ceil(this._dataLength / this._entryPerPage);
        } else {
            throw "Undefined flying dataLength attribute...";
        }
    };

    FlyPagination.prototype.getDataLength = function () {
        return this._dataLength;
    };

    FlyPagination.prototype._onClickNext = function (e) {
        if (this._currentPage < this._totalPageSize) {
            this._currentPage += 1;

            var buttons = $(e.target.parentElement.parentElement.children).find("a[page-no]");
            var lastElement = $("a[page-no=" + this._totalPageSize + "]");

            for (var i = 0; i < buttons.length; i++) {
                var btn = buttons[i];

                var pageNo = parseInt(btn.getAttribute("page-no"));

                if (pageNo < this._totalPageSize && lastElement.length == 0) {
                    pageNo += 1;

                    btn.setAttribute("page-no", pageNo);
                    btn.textContent = pageNo;
                }
            }
        }
        this._setActive(this._currentPage);
        this._onPageButtonClickCallback(this);
    };

    FlyPagination.prototype._onClickPrevious = function (e) {
        if (this._currentPage != 1) {
            this._currentPage -= 1;

            var buttons = $(e.target.parentElement.parentElement.children).find("a[page-no]");
            var firstElement = $("a[page-no=1]");

            for (var i = 0; i < buttons.length; i++) {
                var btn = buttons[i];

                var pageNo = parseInt(btn.getAttribute("page-no"));

                if (pageNo != this._minPageSize && firstElement.length == 0) {
                    pageNo -= 1;

                    btn.setAttribute("page-no", pageNo);
                    btn.textContent = pageNo;
                }
            }
        }

        this._setActive(this._currentPage);
        this._onPageButtonClickCallback(this);
    };

    FlyPagination.prototype.getEntryPerPage = function () {
        return this._entryPerPage;
    };

    return FlyPagination;
})();
