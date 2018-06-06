/**
 * Created by gunerkaanalkim on 13/04/16.
 */
"use strict";

(function ($) {
    var globalOptions;
    var globalElement;
    var columnSize;
    var commandSize;
    var processColumnSize;

    $.fn.flyDataTable = function (options) {
        var me = globalElement = this;
        var columns = options.columns;
        var clazz = options.class;
        var datasource = options.datasource;
        var commands = options.commands;
        var isResponsive = options.responsive;
        var pagination = options.pagination;
        var panel = options.panel;

        var ajaxAction = datasource.action();

        ajaxAction.success(function (res) {
            globalOptions = options;

            //Pagination preparing
            pagination.setDataLength(res.length);

            _createTable(me, columns, clazz, _getPagedData(pagination, res), commands, isResponsive, pagination, panel);
            _refreshTable(me, globalOptions);

            // When page button click
            pagination._onPageButtonClickCallback = function (paginationContext) {
                _createTable(me, columns, clazz, _getPagedData(paginationContext, res), commands, isResponsive, pagination, panel);
                _refreshTable(me, globalOptions);
            };
        });

        ajaxAction.error(function (e) {
            console.log(e);
        });
    };

    // Table creating
    function _createTable(element, columns, clazz, data, commands, isResponsive, pagination, panel) {
        element.html("");

        var table = jQuery("<table>", {
            "class": clazz
        });

        var thead = jQuery("<thead>");
        var theadRow = jQuery("<tr>");
        var tbody = jQuery("<tbody>");

        table.append(
            thead.append(
                theadRow
            ),
            tbody
        );

        var keyList = new Array();
        var typeList = new Array();

        // Header creating
        for (var i in columns) {
            var col = columns[i];
            keyList.push(col.key);
            typeList.push(col.type);

            var theadCell = jQuery("<th>", {
                "text": col.header,
                "style": "width:" + columnSize
            });

            theadRow.append(
                theadCell
            );
        }

        var processCell;
        if (commands.length != 0) {
            processCell = jQuery("<th>", {
                "style": "width:" + processColumnSize
            });

            theadRow.append(
                processCell
            );
        }

        // Data rows creating
        for (var i in data) {
            var dataRow = jQuery("<tr>");

            var dataElement = data[i];

            for (var j = 0; j < keyList.length; j++) {
                var key = keyList[j];
                var type = typeList[j];

                if (key.includes(".")) {
                    var text = _resolveKeys(dataElement, "" + key + "");

                    if (type == "date") {
                        text = kendo.toString(new Date(text), "dd/MM/yyyy");
                    } else if (type == "datetime") {
                        text = kendo.toString(new Date(text), "dd/MM/yyyy HH:mm:ss");
                    }

                    var dataCell = jQuery("<td>", {
                        "text": text,
                        "style": "width:" + columnSize
                    });

                    dataRow.append(
                        dataCell
                    );

                } else {
                    var text = dataElement[key];

                    if (type == "date") {
                        text = kendo.toString(new Date(text), "dd/MM/yyyy");
                    } else if (type == "datetime") {
                        text = kendo.toString(new Date(text), "dd/MM/yyyy HH:mm:ss");
                    }

                    var dataCell = jQuery("<td>", {
                        "text": text
                    });

                    dataRow.append(
                        dataCell
                    );
                }
            }

            var cmdButtonGroup = jQuery("<div>", {
                "class": "btn-group",
                "role":"group",
                "style": "width:100%"
            });

            //Commands
            for (var i in commands) {
                var cmd = commands[i];
                var handlers = cmd.handlers;

                var cmdButton;
                if (cmd.datatoggle && cmd.ariahaspopup && cmd.ariaepanded) {
                    var buttonGroupDropdown = jQuery("<ul>", {

                        "class": "dropdown-menu"
                    });

                    cmdButton = jQuery("<div>", {
                        "style": "width:" + commandSize,
                        "class": "btn-group",
                        "role":"group"
                    });
                    var buttonGroupText = jQuery("<a>", {
                        "class": cmd.class,
                        "data-key": _resolveKeys(dataElement, "" + cmd.dataKey + ""),
                        "data-toggle": cmd.datatoggle,
                        "style": "width:100%;",
                        "aria-haspopup": cmd.ariahaspopup,
                        "aria-epanded": cmd.ariaepanded
                    });
                    var dropSpan = jQuery("<span>", {
                        "class": "caret"
                    });
                    var dropTitle = jQuery("<text>", {
                        "text": cmd.text
                    });

                    buttonGroupText.append(dropSpan, dropTitle);


                    for (var j in cmd.selections) {
                        var buttonDetail = jQuery("<li>");

                        var detailElement = jQuery("<a>", {
                            "dropDownID": j,
                            "text": cmd.selections[j]
                        });
                        buttonGroupDropdown.append(buttonDetail.append(detailElement));
                    }
                    cmdButton.append(buttonGroupText, buttonGroupDropdown);
                    if (commands.length > 1) {
                        dataRow.append(
                            cmdButtonGroup.append(
                                cmdButton
                            )
                        )
                    } else {
                        dataRow.append(
                            cmdButton.append
                        );
                    }


                } else {
                    cmdButton = jQuery("<a>", {
                        "class": cmd.class,
                        "data-key": _resolveKeys(dataElement, "" + cmd.dataKey + ""),
                        "style": "width:" + commandSize
                    });


                    var cmdIcon = jQuery("<i>", {
                        "class": cmd.fontIcon,
                        "data-key": _resolveKeys(dataElement, "" + cmd.dataKey + "")
                    });

                    var cmdText = jQuery("<span>", {
                        "text": " " + cmd.text,
                        "data-key": _resolveKeys(dataElement, "" + cmd.dataKey + "")
                    });

                    if (commands.length > 1) {
                        dataRow.append(
                            cmdButtonGroup.append(
                                cmdButton.append(
                                    cmdIcon,
                                    cmdText
                                )
                            )
                        )
                    } else {
                        dataRow.append(
                            cmdButton.append(
                                cmdIcon,
                                cmdText
                            )
                        );
                    }
                }
                // CMD Handler
                for (var j in handlers) {
                    var handlerName = j;
                    var handlerFunction = handlers[j];

                    cmdButton.bind(handlerName, handlerFunction);
                }
            }


            tbody.append(
                dataRow
            );
        }

        // Responsive
        var responsiveContainer;
        if (isResponsive) {
            responsiveContainer = jQuery("<div>", {
                "class": "table-responsive"
            });
        }

        // Panel
        var tablePanel;
        var tablePanelHeader;
        var tablePanelHeaderTitle;
        var tablePanelHeaderTitleIcon;
        var tablePanelHeaderTitleText;
        var panelBody;
        if (panel != null) {
            tablePanel = jQuery("<div>", {
                "class": "panel " + panel.class
            });

            tablePanelHeader = jQuery("<div>", {
                "class": "panel-heading"
            });

            tablePanelHeaderTitle = jQuery("<div>", {
                "class": "panel-title"
            });

            tablePanelHeaderTitleIcon = jQuery("<i>", {
                "class": panel.fontIcon
            });

            tablePanelHeaderTitleText = jQuery("<span>", {
                "text": panel.header
            });

            // Default panel body
            panelBody = jQuery("<div>", {
                "class": "panel-body",
                "style": "height: " + panel.height + "px; overflow:auto; padding: 5px;"
            });

            tablePanel.append(
                tablePanelHeader.append(
                    tablePanelHeaderTitle.append(
                        tablePanelHeaderTitleIcon,
                        tablePanelHeaderTitleText
                    )
                )
            );
        } else {
            panelBody = jQuery("<div>", {
                "class": "panel-body",
                "style": "padding: 5px;"
            });
        }

        // Pagination
        var tableFooter;
        if (pagination != null) {
            tableFooter = jQuery("<div>", {
                "class": "panel-footer"
            });
            _addPagination(tableFooter, pagination.createPagination());
        }

        if (isResponsive) {
            if (panel != null) {
                if (pagination != null) {
                    element.append(
                        tablePanel.append(
                            panelBody.append(
                                responsiveContainer.append(
                                    table
                                )
                            ),
                            tableFooter
                        )
                    );
                } else {
                    element.append(
                        tablePanel.append(
                            panelBody.append(
                                responsiveContainer.append(
                                    table
                                )
                            )
                        )
                    );
                }
            } else {
                if (pagination != null) {
                    element.append(
                        panelBody.append(
                            responsiveContainer.append(
                                table
                            )
                        ),
                        tableFooter
                    );
                } else {
                    element.append(
                        panelBody.append(
                            responsiveContainer.append(
                                table
                            )
                        )
                    );
                }
            }
        } else {
            if (panel != null) {
                if (pagination != null) {
                    element.append(
                        tablePanel.append(
                            panelBody.append(
                                table
                            ),
                            tableFooter
                        )
                    )
                } else {
                    element.append(
                        tablePanel.append(
                            panelBody.append(
                                table
                            )
                        )
                    )
                }
            } else {
                if (pagination != null) {
                    element.append(
                        panelBody.append(
                            table
                        ),
                        tableFooter
                    )
                } else {
                    element.append(
                        panelBody.append(
                            table
                        )
                    )
                }
            }
        }

    }

    function _resolveKeys(dataElement, keys) {
        try {
            return eval("dataElement." + keys);
        } catch (e) {
            return undefined;
        }
    }

    function _refreshTable(context, options) {
        context.unbind("refresh");
        context.bind("refresh", {context: context, options: options}, _onRefresh);
    }

    function _onRefresh(e) {
        var me = e.data.context;

        var options = e.data.options;
        var columns = options.columns;
        var clazz = options.class;
        var datasource = options.datasource;
        var commands = options.commands;
        var isResponsive = options.responsive;
        var pagination = options.pagination;
        var panel = options.panel;

        var ajaxAction = datasource.action();

        ajaxAction.success(function (res) {
            globalOptions = options;

            //Pagination preparing
            pagination.setDataLength(res.length);

            _createTable(me, columns, clazz, _getPagedData(pagination, res), commands, isResponsive, pagination, panel);
            _refreshTable(me, globalOptions);

            // When page button click
            pagination._onPageButtonClickCallback = function (paginationContext) {
                _createTable(me, columns, clazz, _getPagedData(paginationContext, res), commands, isResponsive, pagination, panel);
                _refreshTable(me, globalOptions);
            };
        });

        ajaxAction.error(function (e) {
            console.log(e);
        });
    }

    function _addPagination(tableFooter, pagination) {
        tableFooter.append(
            pagination
        );
    }

    function _getPagedData(pagination, data) {
        var pagedData = new Array();

        for (var i = (pagination.getEntryPerPage() * pagination.getCurrentPage()) - pagination.getEntryPerPage(); i < (pagination.getEntryPerPage() * pagination.getCurrentPage()); i++) {
            if (typeof data[i] != "undefined") {
                var element = data[i];
                pagedData.push(element);
            }
        }

        return pagedData;
    }

})(jQuery);