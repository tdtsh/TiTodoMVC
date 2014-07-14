(function(tirequire,__dirname,__filename){module.id=__filename;module.loaded=false;module.filename=__filename;var require=tirequire("node_modules/ti-commonjs/lib/ti-commonjs")(__dirname,module);module.require=require;function Controller() {
    function __alloyId17(e) {
        if (e && e.fromAdapter) return;
        var opts = __alloyId17.opts || {};
        var models = doFilter(__alloyId16);
        var len = models.length;
        var __alloyId12 = [];
        for (var i = 0; len > i; i++) {
            var __alloyId13 = models[i];
            __alloyId13.__transform = doTransform(__alloyId13);
            var __alloyId15 = {
                properties: {
                    height: 44,
                    selectionStyle: Ti.UI.iPhone.ListViewCellSelectionStyle.NONE
                },
                template: "todolist",
                create: {
                    text: "undefined" != typeof __alloyId13.__transform["timestamp"] ? __alloyId13.__transform["timestamp"] : __alloyId13.get("timestamp")
                },
                done: {
                    todoId: "undefined" != typeof __alloyId13.__transform["id"] ? __alloyId13.__transform["id"] : __alloyId13.get("id"),
                    color: "undefined" != typeof __alloyId13.__transform["done"] ? __alloyId13.__transform["done"] : __alloyId13.get("done")
                },
                todo: {
                    todoId: "undefined" != typeof __alloyId13.__transform["id"] ? __alloyId13.__transform["id"] : __alloyId13.get("id"),
                    value: "undefined" != typeof __alloyId13.__transform["todo"] ? __alloyId13.__transform["todo"] : __alloyId13.get("todo")
                }
            };
            __alloyId12.push(__alloyId15);
        }
        opts.animation ? $.__views.__alloyId11.setItems(__alloyId12, opts.animation) : $.__views.__alloyId11.setItems(__alloyId12);
    }
    function todofetch() {
        var indicator = Alloy.createController("indicator", {
            message: "loading..."
        });
        indicator.trigger("show", {
            parent: $.window
        });
        todo.fetch({
            success: function(_collection) {
                var itemsleft = 0;
                toggleall = false;
                _collection.each(function(_model) {
                    var json = _model.toJSON();
                    if (0 === parseInt(json.done, 10)) {
                        itemsleft++;
                        toggleall = true;
                    }
                });
                $.toggleall.applyProperties({
                    color: toggleall ? "#d9d9d9" : "#737373"
                });
                $.window.applyProperties({
                    title: L("todos") + " - " + itemsleft + " " + L("items_left")
                });
                indicator.trigger("hide");
            },
            error: function() {
                indicator.trigger("hide");
            }
        });
    }
    function doTransform(_model) {
        var json = _model.toJSON();
        json.done = 0 === parseInt(json.done, 10) ? "#d9d9d9" : "#85ada7";
        json.timestamp = "0000/00/00 00:00" !== json.updated_at ? json.updated_at : json.created_at;
        return json;
    }
    function doFilter(_collection) {
        return _collection.filter(function(_model) {
            var json = _model.toJSON();
            if (0 === activestate) return true;
            if (1 === activestate && 0 === parseInt(json.done, 10)) return true;
            if (2 === activestate && 1 === parseInt(json.done, 10)) return true;
            return false;
        });
    }
    function doToggleall() {
        todo.each(function(_model) {
            _model.set({
                done: toggleall ? 1 : 0
            });
            _model.save();
        });
        todofetch();
    }
    function doToggle(e) {
        e.cancelBubble = true;
        var model = todo.get(e.source.todoId);
        model.set({
            done: parseInt(model.get("done"), 10) ? 0 : 1
        });
        model.save(null, {
            success: function() {
                todofetch();
            }
        });
    }
    function doEdit(e) {
        e.cancelBubble = true;
        e.source.applyProperties({
            editable: true
        });
        prevtodo = e.source.getValue();
        e.source.focus();
    }
    function doEdited(e) {
        e.cancelBubble = true;
        e.source.applyProperties({
            editable: false
        });
        e.source.blur();
        if ("" === e.source.getValue()) {
            e.source.applyProperties({
                value: prevtodo
            });
            return;
        }
        var model = todo.get(e.source.todoId);
        model.set({
            todo: e.source.getValue(),
            updated_at: moment().format("YYYY/MM/DD HH:mm")
        });
        model.save(null, {
            success: function() {
                todofetch();
            }
        });
    }
    function doDelete(e) {
        e.cancelBubble = true;
        var model = todo.get(e.source.todoId);
        model.destroy({
            success: function() {
                todofetch();
            }
        });
    }
    function doTab(e) {
        activestate = e.index;
        todofetch();
    }
    tirequire("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.window = Ti.UI.createWindow({
        backgroundColor: "#fff",
        id: "window",
        title: "todos - 0 items left"
    });
    $.__views.header = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: 44,
        backgroundColor: "#f6f6f6",
        id: "header"
    });
    $.__views.toggleall = Ti.UI.createLabel({
        top: 0,
        bottom: 0,
        left: 0,
        width: 44,
        height: 44,
        color: "#d9d9d9",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        text: "✓",
        id: "toggleall"
    });
    $.__views.header.add($.__views.toggleall);
    doToggleall ? $.__views.toggleall.addEventListener("click", doToggleall) : __defers["$.__views.toggleall!click!doToggleall"] = true;
    $.__views.inputtodo = Ti.UI.createTextField({
        top: 0,
        right: 0,
        bottom: 0,
        left: 50,
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        paddingRight: 10,
        hintText: L("what_needs_to_be_done"),
        id: "inputtodo"
    });
    $.__views.header.add($.__views.inputtodo);
    var __alloyId1 = {};
    var __alloyId4 = [];
    var __alloyId6 = {
        type: "Ti.UI.Label",
        bindId: "create",
        properties: {
            top: 0,
            right: 8,
            width: Ti.UI.SIZE,
            height: Ti.UI.SIZE,
            color: "glay",
            font: {
                fontSize: "10sp"
            },
            bindId: "create"
        }
    };
    __alloyId4.push(__alloyId6);
    var __alloyId8 = {
        type: "Ti.UI.Label",
        bindId: "done",
        properties: {
            top: 0,
            bottom: 0,
            left: 0,
            width: 44,
            height: 44,
            color: "#d9d9d9",
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
            verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
            text: "✓",
            bindId: "done"
        },
        events: {
            click: doToggle
        }
    };
    __alloyId4.push(__alloyId8);
    var __alloyId10 = {
        type: "Ti.UI.TextField",
        bindId: "todo",
        properties: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 50,
            width: Ti.UI.FILL,
            height: Ti.UI.FILL,
            paddingRight: 10,
            editable: false,
            bindId: "todo"
        },
        events: {
            dblclick: doEdit,
            swipe: doDelete,
            "return": doEdited
        }
    };
    __alloyId4.push(__alloyId10);
    var __alloyId3 = {
        properties: {
            name: "todolist"
        },
        childTemplates: __alloyId4
    };
    __alloyId1["todolist"] = __alloyId3;
    $.__views.__alloyId11 = Ti.UI.createListSection({
        id: "__alloyId11"
    });
    var __alloyId16 = Alloy.Collections["todo"] || todo;
    __alloyId16.on("fetch destroy change add remove reset", __alloyId17);
    var __alloyId18 = [];
    __alloyId18.push($.__views.__alloyId11);
    $.__views.todos = Ti.UI.createListView({
        top: 0,
        right: 0,
        bottom: 44,
        left: 0,
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        backgroundColor: "#fcfcfc",
        sections: __alloyId18,
        templates: __alloyId1,
        headerView: $.__views.header,
        id: "todos",
        defaultItemTemplate: "todolist"
    });
    $.__views.window.add($.__views.todos);
    $.__views.footer = Ti.UI.createView({
        right: 0,
        bottom: 0,
        left: 0,
        width: Ti.UI.FILL,
        height: 44,
        id: "footer"
    });
    $.__views.window.add($.__views.footer);
    var __alloyId20 = [];
    var __alloyId21 = {
        title: L("label_all"),
        ns: "Alloy.Abstract"
    };
    __alloyId20.push(__alloyId21);
    var __alloyId22 = {
        title: L("label_active"),
        ns: "Alloy.Abstract"
    };
    __alloyId20.push(__alloyId22);
    var __alloyId23 = {
        title: L("label_completed"),
        ns: "Alloy.Abstract"
    };
    __alloyId20.push(__alloyId23);
    $.__views.tab = Ti.UI.iOS.createTabbedBar({
        index: 0,
        labels: __alloyId20,
        id: "tab"
    });
    $.__views.footer.add($.__views.tab);
    doTab ? $.__views.tab.addEventListener("click", doTab) : __defers["$.__views.tab!click!doTab"] = true;
    $.__views.index = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.window,
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {
        __alloyId16.off("fetch destroy change add remove reset", __alloyId17);
    };
    _.extend($, $.__views);
    var lodash = require("lodash"), moment = require("moment");
    var todo = Alloy.Collections.todo;
    todo.comparator = function(_model) {
        return -moment(_model.get("created_at")).unix();
    };
    var activestate = 0, prevtodo = "", toggleall = false;
    $.inputtodo.addEventListener("return", lodash.debounce(function() {
        $.inputtodo.blur();
        if ("" === $.inputtodo.getValue()) return;
        var model = Alloy.createModel("todo", {
            todo: $.inputtodo.getValue(),
            created_at: moment().format("YYYY-MM-DD HH:mm:ss")
        });
        todo.add(model);
        model.save(null, {
            success: function() {
                $.inputtodo.applyProperties({
                    value: ""
                });
                todofetch();
            }
        });
    }), 1e3, true);
    $.todos.addEventListener("itemclick", lodash.debounce(function() {
        $.inputtodo.blur();
    }), 1e3, true);
    $.index.addEventListener("open", function() {
        $.index.title = L("todos") + " - o " + L("items_left");
        todofetch();
    });
    $.index.open();
    __defers["$.__views.toggleall!click!doToggleall"] && $.__views.toggleall.addEventListener("click", doToggleall);
    __defers["$.__views.tab!click!doTab"] && $.__views.tab.addEventListener("click", doTab);
    _.extend($, exports);
}

var Alloy = tirequire("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
module.loaded=true;})(require,"/alloy/controllers","/alloy/controllers/index.js");