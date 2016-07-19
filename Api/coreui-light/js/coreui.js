var commonPrefix = '.';
//import "plugin.js"
//import "stateEnum.js"

(function($, doc) {
    'use strict';

    var pluginName = 'btnRadio';
    var eventType = commonPrefix + pluginName;
    var selector = '.btn-group';
    var btnSelector = '.btn';

    var ButtonRadio = function (element) {
        this.$elem = $(element);
        this.$elem.prop('value', this.$elem.children(btnSelector + '.' + stateEnum.checked).data('val'));
        this.oldHtml = null;
    };

    defineConstructorPlugin(pluginName, ButtonRadio);

    $(document).on('click.' + eventType, selector + " " + btnSelector, function (e) {
        var $btn = $(e.target);
        var $sw = $btn.parent(selector);
        $sw.children(btnSelector + '.' + stateEnum.checked).button('check', false);
        $btn.button('check', true);
        $sw.prop('value', $btn.data('val'));
        $sw.trigger('change.' + eventType);
    });

})(jQuery, document);

//import "plugin.js"
//import "stateEnum.js"

(function($, doc) {
    'use strict';

    var pluginName = 'button';
    
    var Button = function(element) {
        this.$elem = $(element);
    };

    Button.prototype.val = function(value) {
        if (value) {
            this.$elem.text(value);
        }
    };

    Button.prototype.check = function (value) {
        this.setState(stateEnum.checked, value === undefined ? true : value);
    };

    Button.prototype.active = function (value) {
        this.setState(stateEnum.active, value === undefined ? true : value);
    };

    Button.prototype.disabled = function(value) {
        if (value === undefined)
            value = true;

        this.setState(stateEnum.disabled, value);
        this.$elem.prop(stateEnum.disabled, value);
    };

    Button.prototype.busy = function(value) {
        if (value === undefined)
            value = true;

        this.setState(stateEnum.busy, value);

        if (value) {
            this.$elem.prop(stateEnum.disabled, value);
            this.oldHtml = this.$elem.html();
            this.$elem.width(this.$elem.width());
            this.$elem.html('<div class="loader">&nbsp;</div>');
        }
        else {
            if (this.oldHtml) 
                this.$elem.html(this.oldHtml);
        }
    };

    Button.prototype.setState = function(state, value) {
        this.$elem.toggleClass(state, value);
    };

    defineConstructorPlugin(pluginName, Button);
    
})(jQuery, document);

//import "jquery.mousewheel.js"

(function () {
    var ie8 = window.attachEvent && !window.addEventListener;

    function isUndefined(a) {
        return "undefined" == typeof a
    }

    function destroy(a) {
        for (var b in a) delete a[b]
    };
    var StringInsertLeadingZero = function (a, b) {
        for (var a = a.toString(), c = [], d = 0; d < b - a.length; ++d) c[c.length] = "0";
        c[c.length] = a;
        return c.join("")
    };
    var StringInsertDecimalLeadingZero = function (a) {
        return 10 > parseInt(a) ? StringInsertLeadingZero(a, 2) : a
    };
    var StringCutLeadingZero = function (a) {
        return /^0{1,}$/.test(a) ? "0" : a.replace(/^0{1,}/, "")
    };
    var Base = function () { };
    Base.extend = function (a, b) {
        var c = Base.prototype.extend;
        Base._prototyping = !0;
        var d = new this;
        c.call(d, a);
        d.base = function () { };
        delete Base._prototyping;
        var e = d.constructor,
            f = d.constructor = function () {
                if (!Base._prototyping)
                    if (this._constructing || this.constructor == f) this._constructing = !0, e.apply(this, arguments), delete this._constructing;
                    else if (null != arguments[0]) return (arguments[0].extend || c).call(arguments[0], d)
            };
        f.ancestor = this;
        f.extend = this.extend;
        f.forEach = this.forEach;
        f.implement = this.implement;
        f.prototype =
            d;
        f.toString = this.toString;
        f.valueOf = function (a) {
            return "object" == a ? f : e.valueOf()
        };
        c.call(f, b);
        "function" == typeof f.init && f.init();
        return f
    };
    Base.prototype = {
        extend: function (a, b) {
            if (1 < arguments.length) {
                var c = this[a];
                if (c && "function" == typeof b && (!c.valueOf || c.valueOf() != b.valueOf()) && /\bbase\b/.test(b)) {
                    var d = b.valueOf(),
                        b = function () {
                            var a = this.base || Base.prototype.base;
                            this.base = c;
                            var b = d.apply(this, arguments);
                            this.base = a;
                            return b
                        };
                    b.valueOf = function (a) {
                        return "object" == a ? b : d
                    };
                    b.toString = Base.toString
                }
                this[a] = b
            } else if (a) {
                var e = Base.prototype.extend;
                !Base._prototyping && "function" != typeof this && (e = this.extend || e);
                for (var f = {
                    toSource: null
                },
                        g = ["constructor", "toString", "valueOf"], h = Base._prototyping ? 0 : 1; i = g[h++];) a[i] != f[i] && e.call(this, i, a[i]);
                for (var i in a) f[i] || e.call(this, i, a[i])
            }
            return this
        }
    };
    Base = Base.extend({
        constructor: function (a) {
            this.extend(a)
        }
    }, {
        ancestor: Object,
        version: "1.1",
        forEach: function (a, b, c) {
            for (var d in a) void 0 === this.prototype[d] && b.call(c, a[d], d, a)
        },
        implement: function () {
            for (var a = 0; a < arguments.length; a++)
                if ("function" == typeof arguments[a]) arguments[a](this.prototype);
                else this.prototype.extend(arguments[a]);
            return this
        },
        toString: function () {
            return "" + this.valueOf()
        }
    });

    function clone(a) {
        if (null == a || "object" != typeof a) return a;
        if (a instanceof Date) {
            var b = new Date;
            b.setTime(a.getTime());
            return b
        }
        if (a instanceof Array) {
            for (var b = [], c = a.length, d = 0; d < c; ++d) b[d] = clone(a[d]);
            return b
        }
        if (a instanceof Object) {
            b = {};
            for (c in a) a.hasOwnProperty(c) && (b[c] = clone(a[c]));
            return b
        }
        throw Error("Unable to copy obj! Its type isn't supported.");
    };
    var Drag = Base.extend({
        constructor: function (a) {
            this._ismd = !1;
            this._object = a.object;
            this._viewPort = a.viewPort;
            this._delayX = "number" == typeof a.delayX ? a.delayX : 10;
            this._delayX = "number" == typeof a.delayX ? a.delayX : 10;
            this._delayY = "number" == typeof a.delayY ? a.delayY : 10;
            var b = this;
            this._move = "function" == typeof a.move ? function () {
                a.move(b.getDir())
            } : function () { };
            this._end = "function" == typeof a.end ? function () {
                a.end(b.getDir())
            } : function () { };
            this._start = "function" == typeof a.start ? function () {
                a.start(b.getDir())
            } :
                function () { };
            this._directionY = this._directionX = this._newY = this._newX = this._oldY = this._oldX = this._startY = this._startX = 0;
            this._dragAllow = !1;
            this.registerHandlers()
        },
        registerHandlers: function () {
            var a = this;
            this._object.mousedown(function (b, c) {
                a.down(void 0 == c || null == c ? b : c)
            });
            Screen.mouseMove(function (b, c) {
                a.move(void 0 == c || null == c ? b : c)
            });
            Screen.mouseUp(function (b, c) {
                a.up(void 0 == c || null == c ? b : c)
            });
            Screen.mouseLeave(function (b, c) {
                a.up(void 0 == c || null == c ? b : c)
            })
        },
        down: function (a) {
            this._ismd = !0;
            this.setOld(a.pageX,
                a.pageY);
            this._startX = a.pageX;
            this._startY = a.pageY;
            a.stopPropagation();
            a.preventDefault && a.preventDefault();
            return !1
        },
        move: function (a) {
            if (this._ismd) {
                if (this.isDragSquare(a.pageX, a.pageY)) {
                    var b = this._dragAllow;
                    this.setNew(a.pageX, a.pageY);
                    this.setDir();
                    this.setOld(a.pageX, a.pageY);
                    !b && this._dragAllow && this._start();
                    this._dragAllow && this._move()
                }
                a.stopPropagation();
                a.preventDefault && a.preventDefault();
                return !1
            }
        },
        up: function (a) {
            if (this._ismd) {
                this._ismd = !1;
                if (this._dragAllow) {
                    var b = this;
                    setTimeout(function () {
                        b._end();
                        b._directionX = 0;
                        b._directionY = 0;
                        b._startX = 0;
                        b._startY = 0
                    }, 0)
                }
                this._dragAllow = !1;
                a.stopPropagation();
                a.preventDefault && a.preventDefault();
                return !1
            }
        },
        setOld: function (a, b) {
            this._oldX = a;
            this._oldY = b
        },
        setNew: function (a, b) {
            if (Math.abs(a - this._startX) > this._delayX || Math.abs(b - this._startY) > this._delayY || this._dragAllow) this._dragAllow = !0, this._newX = a, this._newY = b
        },
        setDir: function () {
            this._directionX = this._oldX - this._newX;
            this._directionY = this._oldY - this._newY
        },
        isDragSquare: function (a, b) {
            var c = this.getSquare(),
                d = !1;
            b > c.y1 - 50 && b < c.y2 + 150 && (d = !0);
            return d
        },
        getSquare: function () {
            var a = this._viewPort.offset().left,
                b = this._viewPort.offset().top,
                c = a + this._viewPort.width(),
                d = b + this._viewPort.height();
            return {
                x1: a,
                y1: b,
                x2: c,
                y2: d
            }
        },
        getDir: function () {
            return {
                left: 0 < this._directionX,
                right: 0 > this._directionX,
                up: 0 < this._directionY,
                down: 0 > this._directionY,
                deltaX: this._directionX,
                deltaY: this._directionY,
                shiftX: this._startX - this._newX,
                shiftY: this._startY - this._newY
            }
        }
    });
    var Screen = Base.extend({}, {
        getWidth: function () {
            return Screen.getWindow().width()
        },
        getHeight: function () {
            return Screen.getWindow().height()
        },
        getSize: function () {
            return {
                width: Screen.getWidth(),
                height: Screen.getHeight()
            }
        },
        getScrollTop: function () {
            return Screen.getWindow().scrollTop()
        },
        getScrollLeft: function () {
            return Screen.getWindow().scrollLeft()
        },
        getScroll: function () {
            return {
                top: Screen.getScrollTop(),
                left: Screen.getScrollLeft()
            }
        },
        setScrollTop: function (a) {
            Screen.getWindow().scrollTop(a);
        },
        setScrollLeft: function (a) {
            Screen.getWindow().scrollLeft(a);
        },
        setScroll: function (a) {
            Screen.getScrollTop(a.top);
            Screen.getScrollLeft(a.left);
        },
        resize: function (a) {
            Screen.getWindow().resize(function () {
                a();
            })
        },
        scroll: function (a) {
            Screen.getWindow().scroll(function () {
                a();
            })
        },
        click: function (a) {
            var b = this.browserScreen();
            isUndefined(a) ? b.click() : b.click(function () {
                a();
            })
        },
        mouseUp: function (a) {
            this.browserScreen().mouseup(function (b) {
                a(b);
            })
        },
        mouseDown: function (a) {
            this.browserScreen().mousedown(function (b) {
                a(b);
            })
        },
        mouseMove: function (a) {
            this.browserScreen().mousemove(function(b, c) {
                a(b, c);
            })
        },
        mouseLeave: function (a) {
            var b = this.browserScreen();
            Screen.getBody().mouseleave(function (a) {
                a.stopPropagation();
            });
            b.mouseleave(function (b) {
                a(b);
            })
        },
        mouseUpFire: function (a) {
            this.browserScreen().trigger("mouseup", a);
        },
        mouseMoveFire: function (a) {
            this.browserScreen().trigger("mousemove", a);
        },
        browserScreen: function () {
            return ie8 ? Screen.getBody() : Screen.getDocument();
        },
        getWindow: function () {
            return $(window);
        },
        getDocument: function () {
            return $(document);
        },
        getBody: function () {
            return $(document.body);
        }
    });
    var Scroll = Base.extend({
        constructor: function (a) {
            this._params = a;
            this.registerParams();
            this.registerHandlers();
        },
        registerParams: function () {
            this._viewPort = this._params.viewPort;
            var a = this;
            this._Up = function () {
                a._params.up();
            };
            this._Down = function () {
                a._params.down();
            };
            this._validUp = function () {
                return a._params.validUp();
            };
            this._validDown = function () {
                return a._params.validDown();
            }
        },
        registerHandlers: function () {
            var a = this;
            this._viewPort.mousewheel(function (b, c) {
                0 < c ? a._validUp() && a._Up() : a._validDown() && a._Down();
                b.stopPropagation();
                b.preventDefault && b.preventDefault()
            })
        }
    });
    var Time = Base.extend({}, {
        getCurrentDate: function () {
            var a = this.__getCurrentDay(),
                b = this.__getCurrentMonth(),
                c = this.__getCurrentYear(),
                d = this.__getCurrentCentury();
            return {
                day: a,
                month: b,
                year: c,
                century: d
            }
        },
        __getCurrentYear: function () {
            return (new Date).getFullYear();
        },
        __getCurrentMonth: function () {
            return (new Date).getMonth();
        },
        __getCurrentDay: function () {
            return (new Date).getDate();
        },
        __getCurrentCentury: function () {
            return parseInt(this.__getCurrentYear().toString().substr(0, 2));
        },
        getCentury: function () {
            return this.__getCurrentCentury();
        },
        getPrevCentury: function () {
            return this.__getCurrentCentury() - 1;
        },
        getNextCentury: function () {
            return this.__getCurrentCentury() + 1;
        },
        isCurrentDate: function (a, b, c) {
            var d = this.getCurrentDate();
            return a == d.day && b == d.month && c == d.year;
        },
        getWeekDay: function (a, b, c) {
            a = (new Date(b + 1 + "/" + a + "/" + c)).getDay();
            return 0 == a ? 7 : a;
        },
        getMonths: function () {
            return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        },
        getYears: function (a, b) {
            for (var c = [], d = a; d <= b; ++d) c[c.length] = d;
            return c;
        },
        getFarWeek: function (a, b, c, d, e) {
            if (0 < e)
                for (var f = 0; f < Math.abs(e) ; ++f) c =
                    this.getNextWeek(a, b, c, d), a = c.week, b = c.month, c = c.year;
            if (0 > e)
                for (f = 0; f < Math.abs(e) ; ++f) c = this.getPrevWeek(a, b, c, d), a = c.week, b = c.month, c = c.year;
            return {
                week: a,
                month: b,
                year: c
            }
        },
        getPrevWeek: function (a, b, c, d) {
            b = 1 < a ? b : this.getPrevMonth(b);
            c = 1 < a ? c : this.getPrevYear(b, c);
            a = 1 < a ? a - 1 : this.getMonthWeeksCount(b, c, d);
            return {
                week: a,
                month: b,
                year: c
            };
        },
        getNextWeek: function (a, b, c, d) {
            d = this.getMonthWeeksCount(b, c, d);
            b = a < d ? b : this.getNextMonth(b);
            c = a < d ? c : this.getNextYear(b, c);
            return {
                week: a < d ? a + 1 : 1,
                month: b,
                year: c
            };
        },
        getLastWeekInMonth: function (a,
            b) {
            for (var c = this.getMonthDaysCount(a, b), d = this.getWeekDay(c, a, b), e = [], f = 0; f < d; ++f) e[f] = c - (d - 1) + f;
            return e
        },
        getAllButLastWeekInMonth: function (a, b) {
            for (var c = this.getMonthDaysCount(a, b), d = this.getLastWeekInMonth(a, b).length, e = [], f = 0; f < c - d; ++f) e[f] = f + 1;
            return e
        },
        getFirstWeekInMonth: function (a, b) {
            for (var c = this.getWeekDay(1, a, b), d = [], e = 0; e <= 7 - c; ++e) d[e] = e + 1;
            return d
        },
        getPrevMonth: function (a) {
            a = parseInt(a);
            return 0 == a ? 11 : a - 1
        },
        getNextMonth: function (a) {
            a = parseInt(a);
            return 11 == a ? 0 : a + 1
        },
        getPrevYear: function (a,
            b) {
            b = parseInt(b);
            return 11 == a ? b - 1 : b
        },
        getNextYear: function (a, b) {
            b = parseInt(b);
            return 0 == a ? b + 1 : b
        },
        getMonthDaysCount: function (a, b) {
            var c = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            return 1 == a && 0 == b % 4 && (0 != b % 100 || 0 == b % 400) ? 29 : c[a]
        },
        getMonthWeeksCount: function (a, b, c) {
            var d = this.getAllButLastWeekInMonth(a, b).length,
                e = this.getLastWeekInMonth(a, b).length;
            if (b == c && 11 == a || 0 == e % 7) d += e;
            return Math.ceil(d / 7)
        },
        getYearCenturyLimit: function (a) {
            a = void 0 == a || null == a ? this.__getCurrentYear() : a;
            return parseInt(a.toString().substr(2,
                2)) + 10
        }
    });
    var Calendar = Base.extend({
        constructor: function (a, b) {
            b.container = isUndefined(b.container) ? $("body") : b.container;
            this._objects = a;
            this._config = b;
            this._container = b.container;
            this._shadow = this._link = this._calendar = null;
            this._config.offsetX = isUndefined(this._config.offsetX) ? 0 : this._config.offsetX;
            this._config.offsetY = isUndefined(this._config.offsetY) ? 0 : this._config.offsetY
        },
        buildLayout: function (a) {
            this._calendar.html(a)
        },
        createObject: function (a) {
            this._calendar = $("<div id='calendar_" + a + "' class='" + CalendarSelectConstants.calendarClass +"'></div>");
            return this._calendar.appendTo(this._container)
        },
        getControlsObjects: function () {
            var a = $("#" + CalendarContentConstants.calendarDaysClass + "_" + this._config.hash),
                b = $("#" + CalendarSelectConstants.monthSelectControlClass + "_" + this._config.hash),
                c = $("#" + CalendarSelectConstants.yearSelectControlClass + "_" + this._config.hash);
            this._link = $("#" + CalendarSelectConstants.dateIconClass + "_" + this._config.hash);
            this._shadow = $("#" + CalendarSelectConstants.shadowClass + "_" + this._config.hash);
            return {
                content: a,
                month: b,
                year: c
            }
        },
        getLink: function () {
            return this._link
        },
        getShadow: function () {
            return this._shadow
        },
        getConfig: function () {
            return this._config
        },
        setConfig: function (a) {
            this._config = a
        },
        getCalendar: function () {
            return this._calendar
        },
        getObjects: function () {
            return this._objects
        },
        getId: function () {
            return this._calendar.attr("id")
        },
        displayOn: function () {
            this._calendar.css("display", "block")
        },
        disableSelect: function () {
            //this._calendar.disableTextSelect() todo mackler do it with css
        },
        doShow: function () {
            ie8 ? this._calendar.css("display",
                "block") : this._calendar.fadeIn(CalendarConstants.fadeInDuration)
        },
        setPosition: function (a, b) {
            this._calendar.css({
                left: a,
                top: b
            })
        },
        doHide: function () {
            this._calendar.hide()
        },
        setRevert: function () {
            this._calendar.addClass(CalendarConstants.calendarRevertClass)
        },
        unsetRevert: function () {
            this._calendar.removeClass(CalendarConstants.calendarRevertClass)
        },
        isDisplay: function () {
            return "block" == this._calendar.css("display")
        }
    });
    var CalendarArea = Base.extend({
        constructor: function () {
            var a = this;
            this._stackStarted = !1;
            this._controlsCount = this._stackTimer = 0;
            Screen.click(function () {
                setTimeout(function () {
                    a.hideAllCalendars()
                }, 0)
            })
        },
        initialize: function (a) {
            this._controlsCount++;
            a.area = this;
            var b = a.createCalendarObject(this._controlsCount),
                c = CalendarArea.registerHash(a);
            a.initialize(c);
            this.registerHandlers(a);
            this.registerCallHandlers(a);
            return b
        },
        destructField: function (a) {
            var b = CalendarArea.hashControls,
                c;
            for (c in b) b[c].destructField(a)
        },
        registerHandlers: function (a) {
            var b = a.getCalendar(),
                c = a.getLink(),
                d = a.getShadow(),
                e = a.getSelectLinks(),
                f = a.getSelectItems(),
                g = a.getSelectDirections().month,
                h = a.getSelectDirections().year,
                i = a.getHolder(),
                m = a.getContent(),
                j = e.month,
                k = f.month,
                e = e.year,
                f = f.year,
                l = g.up,
                g = g.down,
                n = h.up,
                h = h.down;
            b.click(function (b) {
                a.hideAllPopup();
                b.stopPropagation()
            });
            c.click(function (b) {
                a.hideAllPopup();
                a.doHide();
                b.stopPropagation();
                return !1
            });
            j[0].click(function (b) {
                a.showMonthPopup();
                b.stopPropagation()
            });
            j[1].click(function (b) {
                a.showMonthPopup();
                b.stopPropagation()
            });
            e[0].click(function (b) {
                a.showYearPopup();
                b.stopPropagation()
            });
            e[1].click(function (b) {
                a.showYearPopup();
                b.stopPropagation()
            });
            k.click(function (b) {
                var c = CalendarHelper.getHrefNumber($(this));
                a.monthClickItem(c);
                b.stopPropagation();
                return !1
            });
            f.click(function (b) {
                var c = CalendarHelper.getHrefNumber($(this));
                a.yearClickItem(c);
                b.stopPropagation();
                return !1
            });
            this.registerDirectionsPress(l, function () {
                a.monthClickUp()
            }, function () {
                return a.monthIsDrag()
            });
            this.registerDirectionsPress(g,
                function () {
                    a.monthClickDown()
                }, function () {
                    return a.monthIsDrag()
                });
            this.registerDirectionsPress(n, function () {
                a.yearClickUp()
            }, function () {
                return a.yearIsDrag()
            });
            this.registerDirectionsPress(h, function () {
                a.yearClickDown()
            }, function () {
                return a.yearIsDrag()
            });
            Screen.click(function () {
                a.hideAllPopup()
            });
            i.mousedown(function (a) {
                m.trigger("mousedown", a)
            });
            d.mousedown(function (a) {
                m.trigger("mousedown", a)
            })
        },
        registerDirectionsPress: function (a, b, c) {
            var d = 0,
                e = CalendarSelectConstants.pressInterval;
            a.mousedown(function () {
                c() ||
                    (b(), d = setInterval(function () {
                        b()
                    }, e))
            }).mouseup(function () {
                clearInterval(d)
            }).mouseleave(function () {
                clearInterval(d)
            }).click(function () {
                return !1
            })
        },
        registerCallHandlers: function (a) {
            this.addFields(a, a.getObjects());
            Screen.resize(function () {
                a.setPosition()
            })
        },
        addFields: function (a, b) {
            var c = this,
                d = a.getConfig(),
                e = a.getUniqueMark();
            b.each(function () {
                var b = $(this);
                if (!a.isRegistered(b)) {
                    b.attr(CalendarFieldConstants.hashAttribute, e).addClass(CalendarFieldConstants.registeredClass);
                    var g = a.registerField(new CalendarFieldControl(new CalendarField($(this),
                        d))),
                        h = g.getField(),
                        i = g.getLink(),
                        m = function () {
                            (!a.isField(g) || !a.isDisplay()) && c.__showStack(function () {
                                setTimeout(function () {
                                    a.setField(g);
                                    c.filterShow(a);
                                    a.refreshValue()
                                }, 0)
                            })
                        }, j = function () {
                            a.isField(g) && a.isDisplay() && (a.hideAllPopup(), a.doHide())
                        }, k = function (c) {
                            if (a.isRegistered(b)) return a.isDisplay() && (a.hideAllPopup(), a.doHide()), m(), c.stopPropagation(), !1
                        }, l = function (a) {
                            a.stopPropagation()
                        }, n = function () {
                            setTimeout(function () {
                                a.doHide()
                            }, 0)
                        }, p = 0,
                        q = CalendarContentConstants.rollingDuration +
                            50,
                        o = 0,
                        r = function (b) {
                            a.isDisplay() && (13 == b.keyCode || 9 == b.keyCode ? (a.isSymbolPressed() && (o = q), setTimeout(function () {
                                a.refreshValue();
                                a.insertValue();
                                a.doHide();
                                o = 0
                            }, o)) : (a.setSymbolPressed(), clearTimeout(p), p = setTimeout(function () {
                                !a.isDisplay() && 0 == o && c.filterShow(a);
                                a.refreshValue();
                                a.unsetSymbolPressed()
                            }, q)))
                        }, s = function () {
                            if (a.isDisplay()) return a.doHide(), !1
                        };
                    b.bind(CalendarConstants.hideEvent, j);
                    b.bind(CalendarConstants.showEvent, m);
                    i.bind("click", k);
                    h.bind("click", l);
                    h.bind("blur", n);
                    h.bind("keypress",
                        r);
                    h.parents("form").bind("submit", s);
                    var t = function () {
                        b.unbind(CalendarConstants.hideEvent, j);
                        b.unbind(CalendarConstants.showEvent, m);
                        i.unbind("click", k);
                        h.unbind("click", l);
                        h.unbind("blur", n);
                        h.unbind("keypress", r);
                        h.parents("form").unbind("submit", s);
                        b.unbind(CalendarFieldConstants.destruct, t)
                    };
                    b.bind(CalendarFieldConstants.destruct, t)
                }
            })
        },
        destructFields: function (a, b) {
            b.each(function () {
                a.destructField($(this))
            })
        },
        filterShow: function (a) {
            this.hideAllCalendars();
            a.doShow()
        },
        hideAllCalendars: function () {
            var a =
                CalendarArea.hashControls,
                b;
            for (b in a) a[b].doHide()
        },
        __showStack: function (a) {
            var b = this,
                c = 2 * CalendarConstants.fadeInDuration,
                d = 2 * CalendarContentConstants.rollingDuration;
            this._stackStarted ? (clearTimeout(this._stackTimer), this._stackTimer = setTimeout(function () {
                a();
                b._stackTimer = setTimeout(function () {
                    b._stackStarted = !1
                }, d)
            }, c)) : (this._stackStarted = !0, a(), this._stackTimer = setTimeout(function () {
                b._stackStarted = !1
            }, d))
        }
    }, {
        hashControls: {},
        registerHash: function (a) {
            var b = a.getUniqueMark();
            CalendarArea.hashControls[b] =
                a;
            return b
        },
        getHashControl: function (a) {
            return isUndefined(CalendarArea.hashControls[a]) ? null : CalendarArea.hashControls[a]
        }
    });
    var CalendarConstants = Base.extend({}, {
        calendarClass: "calendar",
        calendarRevertClass: "calendar__revert",
        calendarHeight: 217,
        containerPortClass: "calendar_center",
        defaultFormat: "dd.mm.yyyy",
        fadeInDuration: 300,
        hideEvent: "calendar_hide",
        showEvent: "calendar_show"
    }),
        CalendarHtml = Base.extend({}, {
            getLayout: function (a) {
                var a = "_" + a,
                    b = CalendarContentHtml.getLayout(a),
                    c = CalendarSelectHtml.getLayout(a),
                    d = CalendarConstants.containerPortClass;
                return "<div id='" + d + a + "' class='" + d + "'>" + b + c + "</div>"
            }
        });
    var CalendarControl = Base.extend({
        constructor: function (a) {
            this._calendar = a;
            this._currentDate = Time.getCurrentDate();
            this._selectedDate = clone(this._currentDate);
            this._selectedDate.week = 1;
            this._selectedDate.day = 0;
            this._fieldControl = null;
            this._valueDate = {
                day: null,
                month: null,
                year: null
            };
            this._formatter = null;
            this._config = {};
            this._fieldStorage = []
        },
        initialize: function (a) {
            this.__configure(a);
            this.__buildLayout();
            this.__createControls();
            this.__configureControls();
            this.__registerObjects();
            this.__buildControls();
            this.__registerScroll();
            !ie8 && this.__registerDrag();
//            (!$.browser.msie || $.browser.msie && 9 <= $.browser.version) && this.__registerDrag();
            this.__refreshValues()
        },
        registerField: function (a) {
            this._fieldStorage.push(a);
            return a
        },
        isRegistered: function (a) {
            for (var b = 0; b < this._fieldStorage.length; ++b)
                if (this._fieldStorage[b].compareMe(a)) return !0;
            return !1
        },
        destructField: function (a) {
            for (var b = [], c = 0; c < this._fieldStorage.length; ++c) this._fieldStorage[c].destructField(a) || b.push(this._fieldStorage[c]);
            this._fieldStorage = b
        },
        createCalendarObject: function (a) {
            return this._calendar.createObject(a)
        },
        __configure: function (a) {
            this._config = this._calendar.getConfig();
            this._config.minYear = CalendarHelper.setIsNull(this._config.minYear, this._currentDate.year - 60);
            this._config.maxYear = CalendarHelper.setIsNull(this._config.maxYear, this._currentDate.year + 10);
            this._config.maxItems = CalendarHelper.setIsNull(this._config.maxItems, CalendarSelectConstants.defaultMaxItems);
            this._config.hash = a;
            this._config.language = CalendarHelper.setIsNull(this._config.language, "EN");
            this._config.format = CalendarHelper.setIsNull(this._config.format,
                CalendarConstants.defaultFormat);
            this._config.language = new CalendarLanguage(this._config.language);
            this._formatter = new DateFormatter(this._config.format);
            this._config.years = Time.getYears(this._config.minYear, this._config.maxYear);
            this._config.months = Time.getMonths();
            this._config.textMonths = this._config.language.getNormalMonths();
            this._calendar.setConfig(this._config)
        },
        __buildLayout: function () {
            this._calendar.buildLayout(CalendarHtml.getLayout(this._config.hash))
        },
        __createControls: function () {
            var a =
                this._calendar.getControlsObjects();
            this._contentControl = new CalendarContentControl(new CalendarContent(a.content));
            this._monthControl = new CalendarSelectControl(new CalendarSelect(a.month));
            this._yearControl = new CalendarSelectControl(new CalendarSelect(a.year))
        },
        __configureControls: function () {
            this._contentControl.configure(this._config);
            this._monthControl.configure(this._config, this._config.textMonths, this._config.months);
            this._yearControl.configure(this._config, this._config.years, this._config.years)
        },
        __registerObjects: function () {
            this._contentControl.registerObjects();
            this._monthControl.registerObjects(this._config.hash, "month");
            this._yearControl.registerObjects(this._config.hash, "year")
        },
        __buildControls: function () {
            this._monthControl.build();
            this._yearControl.build();
            this._calendar.disableSelect()
        },
        __registerScroll: function () {
            var a = this;
            this._contentControl.registerScroll(function () {
                a.scrollUp()
            }, function () {
                a.scrollDown()
            }, function () {
                return a.validUp()
            }, function () {
                return a.validDown()
            });
            this._monthControl.registerScroll();
            this._yearControl.registerScroll()
        },
        __registerDrag: function () {
            var a = this;
            this._contentControl.registerDrag(function (b) {
                a.__contentDrag(b)
            });
            this._monthControl.registerDrag();
            this._yearControl.registerDrag()
        },
        __refreshValues: function () {
            this._monthControl.selectValue(this._selectedDate.month);
            this._yearControl.selectValue(this._selectedDate.year);
            this._contentControl.showContent(this._selectedDate)
        },
        showMonthPopup: function () {
            this._yearControl.hidePopup();
            this._monthControl.showPopup()
        },
        showYearPopup: function () {
            this._monthControl.hidePopup();
            this._yearControl.showPopup()
        },
        hideAllPopup: function () {
            this._monthControl.hidePopup();
            this._yearControl.hidePopup()
        },
        monthClickUp: function () {
            this._monthControl.clickUp()
        },
        monthClickDown: function () {
            this._monthControl.clickDown()
        },
        yearClickUp: function () {
            this._yearControl.clickUp()
        },
        yearClickDown: function () {
            this._yearControl.clickDown()
        },
        monthIsDrag: function () {
            return this._monthControl.isDrag()
        },
        yearIsDrag: function () {
            return this._yearControl.isDrag()
        },
        monthClickItem: function (a) {
            if (!this._monthControl.isDrag()) {
                var b =
                    this._formatter.parse(this._fieldControl.getValue());
                this._selectedDate.month = a;
                b && b.day == this._valueDate.day && b.year == this._valueDate.year && (this._valueDate.month = this._selectedDate.month, this._contentControl.setValue(this._valueDate), this.insertValue());
                this.__refreshValues();
                this._monthControl.hidePopup()
            }
        },
        yearClickItem: function (a) {
            if (!this._yearControl.isDrag()) {
                var b = this._formatter.parse(this._fieldControl.getValue());
                this._selectedDate.year = a;
                b && b.day == this._valueDate.day && b.month == this._valueDate.month &&
                    (29 == this._valueDate.day && 1 == this._valueDate.month && 0 == this._valueDate.year % 4 && 0 != this._selectedDate.year % 4 && (this._selectedDate.month = this._valueDate.month = 2, this._selectedDate.day = this._valueDate.day = 1), this._valueDate.year = this._selectedDate.year, this._contentControl.setValue(this._valueDate), this.insertValue());
                this.__refreshValues();
                this._yearControl.hidePopup()
            }
        },
        __contentDrag: function (a) {
            this._selectedDate = clone(a);
            this._monthControl.selectValue(this._selectedDate.month);
            this._yearControl.selectValue(this._selectedDate.year)
        },
        scrollUp: function () {
            var a = Time.getPrevWeek(this._selectedDate.week, this._selectedDate.month, this._selectedDate.year, this._config.minYear);
            this._selectedDate.week = a.week;
            this._selectedDate.month = a.month;
            this._selectedDate.year = a.year;
            this._monthControl.selectValue(this._selectedDate.month);
            this._yearControl.selectValue(this._selectedDate.year);
            this._contentControl.scrollUp(this._selectedDate)
        },
        scrollDown: function () {
            var a = Time.getNextWeek(this._selectedDate.week, this._selectedDate.month, this._selectedDate.year,
                this._config.minYear);
            this._selectedDate.week = a.week;
            this._selectedDate.month = a.month;
            this._selectedDate.year = a.year;
            this._monthControl.selectValue(this._selectedDate.month);
            this._yearControl.selectValue(this._selectedDate.year);
            this._contentControl.scrollDown(this._selectedDate)
        },
        validUp: function () {
            return !(this._selectedDate.year == this._config.minYear && 0 == this._selectedDate.month && 1 == this._selectedDate.week)
        },
        validDown: function () {
            return !(this._selectedDate.year == this._config.maxYear && 11 == this._selectedDate.month &&
                1 == this._selectedDate.week)
        },
        setDate: function (a) {
            if (!this._contentControl.isDrag() && (a = this._formatter.parse(CalendarHelper.getHrefDate(a)))) this._selectedDate.day = this._valueDate.day = a.day, this._selectedDate.month = this._valueDate.month = a.month, this._selectedDate.year = this._valueDate.year = this.validYear(a.year), this._contentControl.setValue(this._valueDate), this.__refreshValues(), this.insertValue(), this.doHide()
        },
        setField: function (a) {
            this._fieldControl = a
        },
        isField: function (a) {
            return this._fieldControl ==
                a
        },
        doShow: function () {
            this.setPosition();
            this._calendar.doShow()
        },
        setPosition: function () {
            if (null != this._fieldControl) { 
                var a = this.getPosition(this._fieldControl.getParams());
                document.documentMode == 8 && (a.top += $('html').scrollTop());
                this._calendar.setPosition(a.left, a.top)
            }
        },
        doHide: function () {
            this._contentControl.setNotReady();
            this._calendar.doHide();
            this.valueToNull()
        },
        doFocus: function () {
            this._fieldControl.doFocus()
        },
        doBlur: function () {
            this._fieldControl.doBlur()
        },
        getPosition: function (a) {
            var b = a.left + this._config.offsetX,
                c = a.top + a.height,
                d = Screen.getHeight() -
                    (a.clearTop - Screen.getScrollTop() + a.height + CalendarConstants.calendarHeight),
                e = a.clearTop - Screen.getScrollTop() - this._config.offsetY - CalendarConstants.calendarHeight;
            0 < d || 0 > e ? (this._calendar.unsetRevert(), c += this._config.offsetY + (0 < d ? 0 : d)) : (this._calendar.setRevert(), c = a.top - CalendarConstants.calendarHeight, c -= this._config.offsetY + (0 < e ? 0 : e));
            return {
                left: b,
                top: c
            }
        },
        refreshValue: function () {
            var a = this._fieldControl.getValue();
            (a = "" == a ? this._currentDate : this._formatter.parse(a)) ? (this._selectedDate.day =
                this._valueDate.day = a.day, this._selectedDate.month = this._valueDate.month = a.month, this._selectedDate.year = this._valueDate.year = a.year) : this.valueToNull();
            this._contentControl.setValue(this._valueDate);
            this.__refreshValues()
        },
        valueToNull: function () {
            this._valueDate.day = null;
            this._valueDate.month = null;
            this._valueDate.year = null
        },
        insertValue: function () {
            null != this._valueDate.day && this._fieldControl.setDate(this._formatter.assemble(this._valueDate))
        },
        setSymbolPressed: function () {
            this._fieldControl.setSymbolPressed()
        },
        unsetSymbolPressed: function () {
            this._fieldControl.unsetSymbolPressed()
        },
        isSymbolPressed: function () {
            return this._fieldControl.isSymbolPressed()
        },
        isDisplay: function () {
            return this._calendar.isDisplay()
        },
        getCalendar: function () {
            return this._calendar.getCalendar()
        },
        getLink: function () {
            return this._calendar.getLink()
        },
        getShadow: function () {
            return this._calendar.getShadow()
        },
        getObjects: function () {
            return this._calendar.getObjects()
        },
        getSelectItems: function () {
            var a = this._monthControl.getItems(),
                b = this._yearControl.getItems();
            return {
                month: a,
                year: b
            }
        },
        getSelectLinks: function () {
            var a = this._monthControl.getLink(),
                b = this._yearControl.getLink();
            return {
                month: a,
                year: b
            }
        },
        getSelectDirections: function () {
            var a = this._monthControl.getDir(),
                b = this._yearControl.getDir();
            return {
                month: a,
                year: b
            }
        },
        getUniqueMark: function () {
            return this._calendar.getId()
        },
        getHolder: function () {
            return this._contentControl.getHolder()
        },
        getContent: function () {
            return this._contentControl.getContent()
        },
        getConfig: function () {
            return this._calendar.getConfig()
        },
        __validDate: function (a,
            b) {
            b < this._config.minYear && (b = this._config.minYear, a = 0);
            b > this._config.maxYear && (b = this._config.maxYear, a = 11);
            return {
                month: a,
                year: b
            }
        },
        validYear: function (a) {
            return a > this._config.maxYear ? this._config.maxYear : a < this._config.minYear ? this._config.minYear : a
        }
    });
    var CalendarHelper = Base.extend({}, {
        setIsNull: function (a, b) {
            return null == a || void 0 == a ? b : a
        },
        appendHtmlTo: function (a, b) {
            $(a).appendTo(b)
        },
        prependHtmlTo: function (a, b) {
            $(a).prependTo(b)
        },
        wrapStyleTag: function (a) {
            return "<style type='text/css'>" + a + "</style>"
        },
        mergeArrays: function (a, b) {
            for (var c = [], d = 0; d < a.length; ++d) c[c.length] = a[d];
            for (d = 0; d < b.length; ++d) c[c.length] = b[d];
            return c
        },
        removeNullItems: function (a) {
            for (var b = [], c = 0; c < a.length; ++c) null != a[c] && (b[b.length] = a[c]);
            return b
        },
        joinEnter: function (a) {
            return a.join("\n")
        },
        joinSpace: function (a) {
            return a.join(" ")
        },
        disableSelect: function (a) {
            a.disableTextSelect()
        },
        getRel: function (a) {
            return a.attr("rel")
        },
        getHrefNumber: function (a) {
            return parseInt(/\d{1,}$/.exec(a.attr("href"))[0])
        },
        getHrefDate: function (a) {
            return /\d{2}\.\d{2}\.\d{4}$/.exec(a.attr("date"))[0]
        }
    });
    var CalendarLanguage = Base.extend({
        constructor: function (a) {
            this.language = CalendarLanguage.language_EN;
            "RU" == a && (this.language = CalendarLanguage.language_RU)
        },
        getNormalMonths: function () {
            return this.language.normalMonths
        },
        getShortMonths: function () {
            return this.language.shortMonths
        },
        getNormalWeekDays: function () {
            return this.language.normalWeekDays
        },
        getShortWeekDays: function () {
            return this.language.shortWeekDays
        }
    }, {
        language_EN: {
            normalMonths: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
            shortMonths: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
            normalWeekDays: "Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday".split(","),
            shortWeekDays: "Mon,Tue,Wed,Thu,Fri,Sat,Sun".split(",")
        },
        language_RU: {
            normalMonths: "\u042f\u043d\u0432\u0430\u0440\u044c,\u0424\u0435\u0432\u0440\u0430\u043b\u044c,\u041c\u0430\u0440\u0442,\u0410\u043f\u0440\u0435\u043b\u044c,\u041c\u0430\u0439,\u0418\u044e\u043d\u044c,\u0418\u044e\u043b\u044c,\u0410\u0432\u0433\u0443\u0441\u0442,\u0421\u0435\u043d\u0442\u044f\u0431\u0440\u044c,\u041e\u043a\u0442\u044f\u0431\u0440\u044c,\u041d\u043e\u044f\u0431\u0440\u044c,\u0414\u0435\u043a\u0430\u0431\u0440\u044c".split(","),
            shortMonths: "\u042f\u043d\u0432,\u0424\u0435\u0432,\u041c\u0430\u0440,\u0410\u043f\u0440,\u041c\u0430\u0439,\u0418\u044e\u043d,\u0418\u044e\u043b,\u0410\u0432\u0433,\u0421\u0435\u043d,\u041e\u043a\u0442,\u041d\u043e\u044f,\u0414\u0435\u043a".split(","),
            normalWeekDays: "\u041f\u043e\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0438\u043a,\u0412\u0442\u043e\u0440\u043d\u0438\u043a,\u0421\u0440\u0435\u0434\u0430,\u0427\u0435\u0442\u0432\u0435\u0440\u0433,\u041f\u044f\u0442\u043d\u0438\u0446\u0430,\u0421\u0443\u0431\u0431\u043e\u0442\u0430,\u0412\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u044c\u0435".split(","),
            shortWeekDays: "\u041f\u043d,\u0412\u0442,\u0421\u0440,\u0427\u0442,\u041f\u0442,\u0421\u0431,\u0412\u0441".split(",")
        },
        getAllMonths: function () {
            var a = CalendarLanguage.language_RU,
                b = CalendarLanguage.language_EN,
                a = CalendarHelper.mergeArrays(a.normalMonths, a.shortMonths),
                b = CalendarHelper.mergeArrays(b.normalMonths, b.shortMonths);
            return CalendarHelper.mergeArrays(a, b)
        }
    });
    var CalendarContent = Base.extend({
        constructor: function (a) {
            this._content = a;
            this._viewPort = null
        },
        registerObjects: function () {
            this._viewPort = this._content.parent()
        },
        getContent: function () {
            return this._content
        },
        getViewPort: function () {
            return this._viewPort
        },
        setContent: function (a) {
            this._content.html(a)
        },
        setTop: function (a) {
            this._content.css("top", a + "px")
        },
        getTop: function () {
            var a = "" == this._content.css("top") ? 0 : this._content.css("top");
            return parseInt(a)
        },
        setAnimateTop: function (a, b, c, d) {
            var d = void 0 == d || null == d ? CalendarContentConstants.rollingEasing : d,
                e = this;
            this._content.animate({
                top: a
            }, {
                duration: b,
                complete: function () {
                    c();
                    e.setReady()
                }
            })
        },
        removeHolderClass: function (a, b, c) {
            $("#month_" + a + "_" + b + "_" + c).removeClass(CalendarContentConstants.monthHolderClass)
        },
        addHolderClass: function (a, b, c) {
            a = $("#month_" + a + "_" + b + "_" + c);
            a.addClass(CalendarContentConstants.monthHolderClass);
            return a.find(".calendar_month_title").html()
        },
        showMonthHolder: function (a, b) {
            $("#" + CalendarContentConstants.holderMonthClass + "_" +
                a).css("display", "block").html(b).removeClass(CalendarContentConstants.hideYearHolderClass)
        },
        hideMonthHolder: function (a) {
            $("#" + CalendarContentConstants.holderMonthClass + "_" + a).css("display", "none")
        },
        removeYearHolder: function (a) {
            $("#" + CalendarContentConstants.holderMonthClass + "_" + a).addClass(CalendarContentConstants.hideYearHolderClass)
        },
        getHolder: function (a) {
            return $("#" + CalendarContentConstants.holderMonthClass + "_" + a)
        },
        setReady: function () {
            $("#" + CalendarContentConstants.readyBlockClass + "_" + this._hash__tmp).addClass(CalendarContentConstants.readyClass)
        },
        setNotReady: function (a) {
            this._hash__tmp = a;
            $("#" + CalendarContentConstants.readyBlockClass + "_" + a).removeClass(CalendarContentConstants.readyClass)
        },
        addDragClass: function () {
            $("body").addClass(CalendarSelectConstants.dragClass)
        },
        removeDragClass: function () {
            $("body").removeClass(CalendarSelectConstants.dragClass)
        },
        hasDragClass: function () {
            return $("body").hasClass(CalendarSelectConstants.dragClass)
        }
    });
    var CalendarContentConstants = Base.extend({}, {
        calendarDaysClass: "calendar_days",
        calendarViewPortClass: "calendar_days_viewPort",
        weekClass: "calendar_week",
        monthClass: "calendar_month",
        monthHolderClass: "calendar_month__hold",
        holderMonthClass: "calendar_monthHolder",
        hideYearHolderClass: "calendar_hideYearHolder",
        monthTitleClass: "calendar_month_title",
        dayClass: "calendar_day",
        dayGrayClass: "calendar_day__gray",
        daySelectedClass: "calendar_day__selected",
        todayDayClass: "calendar_day__today",
        weekendDayClass: "calendar_day__weekend",
        lastDayClass: "calendar_day__last",
        monthTitleValueClass: "calendar_month_title_monthValue",
        yearTitleValueClass: "calendar_month_title_yearValue",
        readyBlockClass: "calendar_ready",
        readyClass: "ready_to_test",
        firstMonthDayClass: "calendar_day__firstInMonth",
        lastMonthDayClass: "calendar_day__lastInMonth",
        monthIdPrefix: "month_",
        dayIdPrefix: "day_",
        dragClass: "isDrag",
        dragAccuracy: 1,
        dragDelayX: 10,
        dragDelayY: 10,
        weekHeight: 25,
        viewPortHeight: 175,
        rollingDuration: 600,
        rollingEasing: "easeOutQuint",
        dragEasing: "easeInOutQuart"
    }),
        CalendarContentHtml = Base.extend({}, {
            getLayout: function (a) {
                var b = CalendarContentConstants.calendarViewPortClass,
                    c = CalendarContentConstants.calendarDaysClass,
                    d = CalendarContentConstants.holderMonthClass,
                    e = CalendarContentConstants.readyBlockClass;
                return ["<div id='", b, a, "' class='", b, "'><div id='", c, a, "' class='", c, "'></div><div id='", d, a, "' class='", d, "'></div><div id='", e, a, "' class='", e, " ", CalendarContentConstants.readyClass, "'></div></div>"].join("")
            },
            getMonthLayout: function (a, b, c, d, e) {
                var f = CalendarContentConstants.monthTitleValueClass,
                    g = CalendarContentConstants.yearTitleValueClass,
                    g = 0 == b || 11 == b ? ["<br/><span id='", g, "_", b, "_", c, "_", e, "' class='", g, "'>", c, "</span>"].join("") : "";
                return ["<div id='", CalendarContentConstants.monthIdPrefix, b, "_", c, "_", e, "' class='", CalendarContentConstants.monthClass, "'><div class='", CalendarContentConstants.monthTitleClass, "'><span id='", f, "_", b, "_", c, "_", e, "' class='", f, "'>", a, "</span>", g, "</div>", d, "</div>"].join("")
            },
            getWeekLayout: function (a) {
                return "<div class='" + CalendarContentConstants.weekClass +
                    "'>" + a + "</div>"
            },
            getDayLayout: function (a, b, c, d, e) {
                var f = StringInsertDecimalLeadingZero(b + 1),
                    g = StringInsertDecimalLeadingZero(a),
                    h = [CalendarContentConstants.dayIdPrefix, a, "_", b, "_", c, "_", e].join(""),
                    i = [];
                i[i.length] = CalendarContentConstants.monthIdPrefix;
                i[i.length] = b;
                i[i.length] = "_";
                i[i.length] = c;
                i[i.length] = "_";
                i[i.length] = e;
                i = i.join("");
                b = [g, ".", f, ".", c].join("");
                c = h + "_link";
                return ["<div id='", h, "' class='", CalendarContentConstants.dayClass, " ", d, " ", i, "'><a id='", c, "' href=\"javascript:$('#" + c +
                    "').calendarClick();\"", " date='" + b + "'", " rel='", e, "'>", a, "</a></div>"].join("")
            }
        });
    var CalendarContentControl = Base.extend({
        constructor: function (a) {
            this._content = a;
            this._currentDate = Time.getCurrentDate();
            this._config = {};
            this._viewPortHeight = CalendarContentConstants.viewPortHeight;
            this._contentHeight = 0;
            this._oldDate = this._selectedDate = null;
            this._contentElements = [];
            this._scroll = this._drag = null;
            this._valueDate = {
                day: null,
                month: null,
                year: null,
                week: null
            };
            this._dragStop = !1;
            this._dragAllow = !0
        },
        configure: function (a) {
            this._config.hash = a.hash;
            this._config.shortMonths = a.language.getShortMonths();
            this._config.minYear = a.minYear;
            this._config.maxYear = a.maxYear;
            this._config.years = a.years;
            this._config.months = a.months
        },
        registerObjects: function () {
            this._content.registerObjects()
        },
        registerScroll: function (a, b, c, d) {
            this._scroll = new Scroll({
                viewPort: this._content.getViewPort(),
                up: function () {
                    a()
                },
                down: function () {
                    b()
                },
                validUp: function () {
                    return c()
                },
                validDown: function () {
                    return d()
                }
            })
        },
        scrollUp: function (a) {
            if (this._selectedDate != a) {
                var b = this._selectedDate.month,
                    c = this._selectedDate.year;
                this._selectedDate =
                    clone(a);
                var a = 0,
                    d = "";
                this.__refreshHolder(b, c);
                b == this._selectedDate.month ? a = this._content.getTop() + CalendarContentConstants.weekHeight : (d = this.__generateBlock(this._selectedDate.month, this._selectedDate.year), a = this.__getTop(b, c) + CalendarContentConstants.weekHeight, this._content.setContent(d));
                this._content.setTop(a)
            }
        },
        scrollDown: function (a) {
            if (this._selectedDate != a) {
                var b = this._selectedDate.month,
                    c = this._selectedDate.year;
                this._selectedDate = clone(a);
                var a = 0,
                    d = "";
                this.__refreshHolder(b, c);
                b == this._selectedDate.month ?
                    a = this._content.getTop() - CalendarContentConstants.weekHeight : (d = this.__generateBlock(this._selectedDate.month, this._selectedDate.year), a = this.__getTop(this._selectedDate.month, this._selectedDate.year), this._content.setContent(d));
                this._content.setTop(a)
            }
        },
        __refreshHolder: function (a, b) {
            1 == this._selectedDate.week ? (this.removeMonthHolder(a, b), this.removeMonthHolder(this._selectedDate.month, this._selectedDate.year)) : (this.__addMonthHolder(this._selectedDate.month, this._selectedDate.year), this._selectedDate.week ==
                Time.getMonthWeeksCount(this._selectedDate.month, this._selectedDate.year, this._config.minYear) && this._content.removeYearHolder(this._config.hash))
        },
        removeMonthHolder: function (a, b) {
            this._content.removeHolderClass(a, b, this._config.hash);
            this._content.hideMonthHolder(this._config.hash)
        },
        __addMonthHolder: function (a, b) {
            this._content.showMonthHolder(this._config.hash, this._content.addHolderClass(a, b, this._config.hash))
        },
        registerDrag: function (a) {
            var b = this;
            this._drag = new Drag({
                object: b._content.getContent(),
                viewPort: b._content.getViewPort(),
                delayX: CalendarContentConstants.dragDelayX,
                delayY: CalendarContentConstants.dragDelayY,
                start: function (a) {
                    b.dragStart(a)
                },
                move: function (a) {
                    b._dragAllow && b.drag(a)
                },
                end: function (c) {
                    b.dragEnd(c, function (b) {
                        a(b)
                    })
                }
            })
        },
        dragStart: function () {
            this._dragAllow ? (this.removeMonthHolder(this._selectedDate.month, this._selectedDate.year), this._content.addDragClass(), this._oldWeek = this._selectedDate.week, this._oldMonth = this._selectedDate.month, this._oldYear = this._selectedDate.year,
                this._dragStop = !1, this.removeMonthHolder(this._oldMonth, this._oldYear), this.removeMonthHolder(this._selectedDate.month, this._selectedDate.year)) : this._dragAllowProcessing = !0
        },
        drag: function (a) {
            if (!this._dragAllowProcessing) {
                var b = this._content.getTop() - a.deltaY,
                    a = Math.floor(Math.abs(a.shiftY) / 25) * (0 > a.shiftY ? -1 : 1),
                    a = Time.getFarWeek(this._selectedDate.week, this._selectedDate.month, this._selectedDate.year, this._config.minYear, a);
                !(a.year < this._config.minYear) && !(1 < a.week && 11 == a.month && a.year == this._config.maxYear) && !(a.year > this._config.maxYear) ? (this._dragStop = !1, this._content.setTop(b)) : this._dragStop = !0
            }
        },
        dragEnd: function (a, b) {
            if (this._dragAllow && !this._dragAllowProcessing) {
                var c = 0,
                    c = "";
                this._content.removeDragClass();
                var d = this;
                if (this._dragStop) this._selectedDate.year >= this._config.maxYear && 10 <= this._selectedDate.month && (this._selectedDate.week = 1, this._selectedDate.month = 11), this._selectedDate.year <= this._config.minYear && 1 >= this._selectedDate.month && (this._selectedDate.week = 1, this._selectedDate.month = 0),
                c = this.__getTop(this._selectedDate.month, this._selectedDate.year) - CalendarContentConstants.weekHeight * (this._selectedDate.week - 1);
                else {
                    var e = Math.floor(Math.abs(a.shiftY) / 25) * (0 > a.shiftY ? -1 : 1),
                        c = Time.getFarWeek(this._selectedDate.week, this._selectedDate.month, this._selectedDate.year, this._config.minYear, e);
                    this._selectedDate.week = c.week;
                    this._selectedDate.month = c.month;
                    this._selectedDate.year = c.year;
                    this._oldMonth != this._selectedDate.month && (c = this.__generateBlock(this._selectedDate.month, this._selectedDate.year),
                        this._content.setContent(c));
                    c = this.__getTop(this._selectedDate.month, this._selectedDate.year) - CalendarContentConstants.weekHeight * (this._selectedDate.week - 1);
                    this._content.setTop(c - (a.shiftY - 25 * e + CalendarContentConstants.dragDelayY * (0 > a.shiftY ? 1 : -1)))
                }
                var e = this.__getDuration(2),
                    f = CalendarContentConstants.dragEasing;
                this._dragAllow = !1;
                this._content.setAnimateTop(c, e, function () {
                    d._dragAllow = !0;
                    d.__refreshHolder(d._oldMonth, d._oldYear)
                }, f);
                b(this._selectedDate)
            } else this._dragAllowProcessing = !1
        },
        isDrag: function () {
            return this._content.hasDragClass()
        },
        __isLastMonth: function () {
            return this._selectedDate.year == this._config.maxYear && 11 == this._selectedDate.month
        },
        __isFirstMonth: function () {
            return this._selectedDate.year == this._config.minYear && 0 == this._selectedDate.month
        },
        toSibling: function (a) {
            if (this._selectedDate != a || allow) {
                this.removeMonthHolder(this._selectedDate.month, this._selectedDate.year);
                this._selectedDate = clone(a);
                var a = this.__getTop(this._selectedDate.month, this._selectedDate.year),
                    b = this.__getDuration(1),
                    c = this;
                this._content.setAnimateTop(a,
                    b, function () {
                        var a = c.__generateBlock(c._selectedDate.month, c._selectedDate.year),
                            b = c.__getTop(c._selectedDate.month, c._selectedDate.year);
                        c._content.setContent(a);
                        c._content.setTop(b)
                    })
            }
        },
        showContent: function (a) {
            if (this._selectedDate != a)
                if (this.setNotReady(), this._oldDate = clone(this._selectedDate), this._selectedDate = clone(a), null != this._oldDate && this.removeMonthHolder(this._oldDate.month, this._oldDate.year), null == this._oldDate || this._selectedDate.day == this._currentDate.day && this._selectedDate.month ==
                    this._currentDate.month && this._selectedDate.year == this._currentDate.year) this.__showSingle(this._selectedDate);
                else {
                    var a = this.__getPathLength(this._oldDate, this._selectedDate),
                        b = this.__getPathDirection(this._oldDate, this._selectedDate);
                    4 > a ? (0 > b && this.__showShortPathUp(this._oldDate, this._selectedDate, a), 0 < b && this.__showShortPathDown(this._oldDate, this._selectedDate, a), 0 == b && this.__showSingle(this._selectedDate)) : this.__showLongPath(this._oldDate, this._selectedDate, a)
                }
        },
        __showSingle: function (a) {
            this._content.setContent(this.__generateBlock(a.month,
                a.year));
            this.__setShowed(a.month, a.year);
            this._content.setTop(this.__getTop(a.month, a.year));
            this._content.setReady()
        },
        __showShortPathUp: function (a, b, c) {
            for (var d = Time.getNextMonth(a.month), e = Time.getNextYear(d, a.year), d = Time.getNextMonth(d), e = Time.getNextYear(d, e), f = a.month, g = a.year, h = 0; h < c + 2; ++h) f = Time.getPrevMonth(f), g = Time.getPrevYear(f, g);
            d = this.__generate({
                month: f,
                year: g
            }, {
                month: d,
                year: e
            });
            this.__goToNewMonth(a, b, d, c)
        },
        __showShortPathDown: function (a, b, c) {
            for (var d = Time.getPrevMonth(a.month),
                    e = Time.getPrevYear(d, a.year), d = Time.getPrevMonth(d), e = Time.getPrevYear(d, e), f = a.month, g = a.year, h = 0; h < c + 2; ++h) f = Time.getNextMonth(f), g = Time.getNextYear(f, g);
            d = this.__generate({
                month: d,
                year: e
            }, {
                month: f,
                year: g
            });
            this.__goToNewMonth(a, b, d, c)
        },
        __showLongPath: function (a, b, c) {
            var d = this.__generateBlock(b.month, b.year),
                e = this._contentElements,
                f = this.__generateBlock(a.month, a.year);
            this._contentElements = CalendarHelper.mergeArrays(e, this._contentElements);
            this.__goToNewMonth(a, b, d + f, c)
        },
        __goToNewMonth: function (a,
            b, c, d) {
            a = this.__getTop(a.month, a.year);
            this._content.setContent(c);
            this._content.setTop(a);
            var c = this.__getTop(b.month, b.year),
                d = this.__getDuration(d),
                e = this;
            this._content.setAnimateTop(c, d, function () {
                e.__removeExcessMonths(b.month, b.year);
                var a = e.__getHtml(),
                    c = e.__getTop(b.month, b.year);
                e._content.setContent(a);
                e._content.setTop(c)
            })
        },
        __generateBlock: function (a, b) {
            var c = Time.getPrevMonth(a),
                d = Time.getPrevYear(c, b),
                c = Time.getPrevMonth(c),
                d = Time.getPrevYear(c, d),
                c = Time.getPrevMonth(c),
                d = Time.getPrevYear(c,
                    d),
                e = Time.getNextMonth(a),
                f = Time.getNextYear(e, b),
                e = Time.getNextMonth(e),
                f = Time.getNextYear(e, f),
                e = Time.getNextMonth(e),
                f = Time.getNextYear(e, f);
            return this.__generate({
                month: c,
                year: d
            }, {
                month: e,
                year: f
            })
        },
        __generate: function (a, b) {
            var c = Time.getYears(a.year, b.year);
            this._contentElements = [];
            for (var d = 0; d < c.length; ++d)
                for (var e = 0; 12 > e; ++e) {
                    var f = c[d] == b.year && e <= b.month,
                        g = c[d] > a.year && c[d] < b.year,
                        h = a.year == b.year ? e >= a.month && e <= b.month : !0;
                    if ((c[d] == a.year && e >= a.month || g || f) && h) this._contentElements[this._contentElements.length] =
                        this.__generateMonth(e, c[d])
                }
            return this.__getHtml()
        },
        __getPathLength: function (a, b) {
            return Math.abs(a.month - b.month) + 12 * Math.abs(a.year - b.year)
        },
        __getPathDirection: function (a, b) {
            return a.year > b.year ? -1 : a.year < b.year ? 1 : a.month > b.month ? -1 : a.month < b.month ? 1 : 0
        },
        __removeExcessMonths: function (a, b) {
            for (var c = Time.getPrevMonth(a), d = Time.getPrevYear(c, b), e = Time.getNextMonth(a), f = Time.getNextYear(e, b), g = Time.getPrevMonth(c), h = Time.getPrevYear(g, d), i = Time.getNextMonth(e), m = Time.getNextYear(i, f), j = 0; j < this._contentElements.length; j++) {
                var k =
                    this._contentElements[j].month,
                    l = this._contentElements[j].year,
                    n = k == c && l == d,
                    p = k == e && l == f,
                    q = k == g && l == h,
                    o = k == i && l == m;
                !(k == a && l == b) && !n && !p && !q && !o && (this._contentElements[j] = null)
            }
            this._contentElements = CalendarHelper.removeNullItems(this._contentElements)
        },
        __getDuration: function (a) {
            var b = CalendarContentConstants.rollingDuration;
            return 4 > a ? b / 3 * a : b
        },
        __getHtml: function () {
            for (var a = "", b = 0; b < this._contentElements.length; b++) a += this._contentElements[b].html;
            return a
        },
        __getHeight: function () {
            for (var a = 0, b =
                    0; b < this._contentElements.length; b++) a += this._contentElements[b].height;
            return a * CalendarContentConstants.weekHeight
        },
        __getTop: function (a, b) {
            for (var c = 0, d = 0; d < this._contentElements.length; d++) this._contentElements[d].month == a && this._contentElements[d].year == b ? d = this._contentElements.length : c -= this._contentElements[d].height;
            return (c + 0.5) * CalendarContentConstants.weekHeight
        },
        __setShowed: function (a, b) {
            for (var c = 0; c < this._contentElements.length; c++) {
                var d = this._contentElements[c];
                d.month == a && d.year ==
                    b && (this._contentElements[c].current = !0)
            }
        },
        __generateMonth: function (a, b) {
            var c = [],
                d = Time.getAllButLastWeekInMonth(a, b),
                c = Time.getLastWeekInMonth(a, b);
            7 == c.length && (d = CalendarHelper.mergeArrays(d, c));
            for (var c = [], e = 0; e < d.length; ++e) c[e] = this.__generateDay(d[e], a, b, this._config.hash);
            var d = Time.getPrevMonth(a),
                f = Time.getPrevYear(d, b),
                g = Time.getLastWeekInMonth(d, f),
                h = [];
            if (7 != g.length)
                for (e = 0; e < g.length; ++e) h[e] = this.__generateDay(g[e], d, f, this._config.hash);
            c = CalendarHelper.mergeArrays(h, c);
            e = "";
            d =
                c.length / 7;
            for (f = 0; f < c.length / 7; ++f) e += this.__generateWeek(c, f);
            return {
                html: CalendarContentHtml.getMonthLayout(this._config.shortMonths[a], a, b, e, this._config.hash),
                height: d,
                current: !1,
                month: a,
                year: b
            }
        },
        __generateDay: function (a, b, c, d) {
            var e = Time.getWeekDay(a, b, c),
                f = [];
            0 == b % 2 && (f[f.length] = CalendarContentConstants.dayGrayClass);
            if (6 == e || 7 == e) f[f.length] = CalendarContentConstants.weekendDayClass;
            7 == e && (f[f.length] = CalendarContentConstants.lastDayClass);
            this.__isCurrentDate(a, b, c) && (f[f.length] = CalendarContentConstants.todayDayClass);
            1 == a && 1 != e && (f[f.length] = CalendarContentConstants.firstMonthDayClass);
            a == Time.getMonthDaysCount(b, c) && 7 != e && (f[f.length] = CalendarContentConstants.lastMonthDayClass);
            null != this._valueDate.day && this._valueDate.day == a && this._valueDate.month == b && this._valueDate.year == c && (f[f.length] = CalendarContentConstants.daySelectedClass);
            f = CalendarHelper.joinSpace(f);
            return CalendarContentHtml.getDayLayout(a, b, c, f, d)
        },
        __generateWeek: function (a, b) {
            for (var c = "", d = 7 * b + 1; d <= 7 * b + 7; ++d) c += a[d - 1];
            return CalendarContentHtml.getWeekLayout(c)
        },
        setValue: function (a) {
            this._valueDate = clone(a)
        },
        getHolder: function () {
            return this._content.getHolder(this._config.hash)
        },
        getContent: function () {
            return this._content.getContent()
        },
        __isCurrentDate: function (a, b, c) {
            return this._currentDate.day == a && this._currentDate.month == b && this._currentDate.year == c
        },
        setNotReady: function () {
            this._content.setNotReady(this._config.hash)
        }
    }, {
        linkClick: function (a) {
            var b = CalendarHelper.getRel(a);
            CalendarArea.getHashControl(b).setDate(a);
            return !1
        }
    });
    var DateFormatter = Base.extend({
        constructor: function (a) {
            this._format = a;
            this._formats = [new DirectNumericalDateFormat, new InverseNumericalDateFormat]
        },
        parse: function (a) {
            for (var b = !1, c = 0; c < this._formats.length; ++c) this._formats[c].canParse(a) && (b = this._formats[c].parse(a));
            return b
        },
        assemble: function (a) {
            for (var b = "", c = 0; c < this._formats.length; ++c) this._formats[c].canAssemble(this._format) && (b = this._formats[c].assemble(a));
            return b
        }
    });
    var DateFormatterHelper = Base.extend({}, {
        toNumberDate: function (a) {
            for (var b = "", c = 0; c < a.length; ++c) {
                var d = a.charAt(c);
                this.isNumber(d) && (b += d);
                this.isPunctuation(d) && (b += ".")
            }
            return b = b.replace(/\.{1,}/g, ".")
        },
        isNumber: function (a) {
            a = a.toString();
            return /^\d{1,}$/.test(a)
        },
        isText: function (a) {
            a = a.toString();
            return /[A-Z]{1,}/.test(a) || /[a-z]{1,}/.test(a) || /\s{1,}/.test(a) || /[\u0410-\u042f]{1,}/.test(a) || /[\u0430-\u044f]{1,}/.test(a)
        },
        isPunctuation: function (a) {
            a = a.toString();
            return !this.isNumber(a) && !this.isText(a)
        }
    });
    var DateFormatterValidator = Base.extend({}, {
        validDay: function (a, b, c) {
            b = Time.getMonthDaysCount(b, c);
            a = parseInt(StringCutLeadingZero(a.toString()));
            return 1 <= a && a <= b ? a : 1 > a ? 1 : b
        },
        validMonth: function (a) {
            a = parseInt(StringCutLeadingZero(a.toString()));
            a = parseInt(a);
            return 1 <= a && 12 >= a ? a - 1 : 1 > a ? 0 : 11
        },
        validYear: function (a) {
            var b = Time.getYearCenturyLimit(),
                a = parseInt(StringCutLeadingZero(a.toString()));
            100 > a && (a > b ? a = Time.getPrevCentury().toString() + a.toString() : (a = 10 > a ? "0" + a.toString() : a.toString(), a = Time.getCentury().toString() +
                a));
            return parseInt(a)
        }
    });
    var DirectNumericalDateFormat = Base.extend({
        constructor: function () {
            this._format = "dd.mm.yyyy"
        },
        canParse: function (a) {
            a = DateFormatterHelper.toNumberDate(a);
            return /^\d{1,2}\.\d{1,2}\.\d{4}$/.test(a) || /^\d{1,2}\.\d{1,2}\.\d{1,2}$/.test(a)
        },
        parse: function (a) {
            var a = DateFormatterHelper.toNumberDate(a),
                b = DateFormatterValidator.validMonth(a.match(/\.\d{1,2}\./)[0].replace(/\./g, "")),
                c = DateFormatterValidator.validYear(a.match(/\d{1,4}$/)[0]);
            return {
                day: DateFormatterValidator.validDay(a.match(/^\d{1,2}/)[0], b,
                    c),
                month: b,
                year: c
            }
        },
        canAssemble: function (a) {
            return this._format == a
        },
        assemble: function (a) {
            a = clone(a);
            a.day = StringInsertDecimalLeadingZero(a.day);
            a.month = StringInsertDecimalLeadingZero(a.month + 1);
            return a.day + "." + a.month + "." + a.year
        }
    });
    var InverseNumericalDateFormat = Base.extend({
        constructor: function () {
            this._format = "yyyy.mm.dd"
        },
        canParse: function (a) {
            a = DateFormatterHelper.toNumberDate(a);
            return /^\d{4}\.\d{1,2}\.\d{1,2}$/.test(a)
        },
        parse: function (a) {
            var a = DateFormatterHelper.toNumberDate(a),
                b = DateFormatterValidator.validMonth(a.match(/\.\d{1,2}\./)[0].replace(/\./g, "")),
                c = DateFormatterValidator.validYear(a.match(/^\d{4}/)[0]);
            return {
                day: DateFormatterValidator.validDay(a.match(/\d{1,2}$/)[0], b, c),
                month: b,
                year: c
            }
        },
        canAssemble: function (a) {
            return this._format ==
                a
        },
        assemble: function (a) {
            a = clone(a);
            a.day = StringInsertDecimalLeadingZero(a.day);
            a.month = StringInsertDecimalLeadingZero(a.month + 1);
            return a.year + "." + a.month + "." + a.day
        }
    });
    var CalendarField = Base.extend({
        constructor: function (a, b) {
            this._config = b;
            this._field = isUndefined(this._config.field) ? a.find("input") : a.find(this._config.field);
            this.id = this._field.attr("id");
            this._wrap = a;
            this._link = isUndefined(this._config.icon) ? $(CalendarFieldConstants.iconHtml).appendTo(this._wrap) : a.find(this._config.icon)
        },
        destruct: function () {
            this._field.trigger(CalendarConstants.hideEvent).trigger(CalendarFieldConstants.destruct);
            destroy(this);
        },
        compareMe: function (a) {
            return a instanceof Object ?
                a.get(0) == this._field.get(0) || a.get(0) == this._wrap.get(0) : a == this.id
        },
        addFocusClass: function () {
            this._field.addClass(CalendarFieldConstants.focusClass);
        },
        removeFocusClass: function () {
            var a = this._field;
            setTimeout(function () {
                a.removeClass(CalendarFieldConstants.focusClass)
            }, 0)
        },
        hasFocusClass: function () {
            return this._field.hasClass(CalendarFieldConstants.focusClass);
        },
        getOffsetLeft: function () {
            return this._wrap.offset().left - this._config.container.offset().left;
        },
        getOffsetTop: function () {
            return this._wrap.offset().top - this._config.container.offset().top;
        },
        getClearTop: function () {
            return this._wrap.offset().top;
        },
        getHeight: function () {
            return this._wrap.height();
        },
        getValue: function () {
            return this._field.attr("value").replace(/,/g, ".").replace(/\//g, ".").replace(/-/g, ".");
        },
        getLink: function () {
            return this._link;
        },
        getField: function () {
            return this._field;
        },
        getWrap: function () {
            return this._wrap;
        },
        setValue: function (a) {
            this._field.attr("value", a);
            this._field.trigger("pseudoChange").trigger("change");
        },
        addSymbolPressedClass: function () {
            this._field.addClass(CalendarFieldConstants.pressedClass);
        },
        removeSymbolPressedClass: function () {
            this._field.removeClass(CalendarFieldConstants.pressedClass);
        },
        hasSymbolPressedClass: function () {
            return this._field.hasClass(CalendarFieldConstants.pressedClass);
        }
    });
    var CalendarFieldConstants = Base.extend({}, {
        linkLayout: '<ins class="calendar_field_link"></ins>',
        wrapClass: "calendar_field_wrap",
        focusClass: "calendar_focus",
        pressedClass: "calendar_pressed",
        iconHeight: 18,
        iconLeft: 95,
        iconTop: -1,
        iconHtml: '<ins class="calendarIcon"></ins>',
        registeredClass: "calendarRegistered",
        hashAttribute: "calendar",
        destruct: "calendar_destruct"
    });
    var CalendarFieldControl = Base.extend({
        constructor: function (a) {
            this._field = a;
            a = Time.getCurrentDate();
            this._curDay = a.day;
            this._curMonth = a.month;
            this._curYear = a.year
        },
        destruct: function () {
            this._field.destruct();
            delete this._field;
            return !0;
        },
        destructField: function (a) {
            (a = this._field.compareMe(a) ? this.destruct() : !1) && destroy(this);
            return a
        },
        compareMe: function (a) {
            return this._field.compareMe(a)
        },
        getParams: function () {
            var a = this._field.getOffsetLeft(),
                b = this._field.getOffsetTop(),
                c = this._field.getClearTop(),
                d = this._field.getHeight();
            return {
                left: a,
                top: b,
                height: d,
                clearTop: c
            }
        },
        doFocus: function () {
            this._field.addFocusClass();
        },
        doBlur: function () {
            this._field.removeFocusClass();
        },
        isFocus: function () {
            return this._field.hasFocusClass();
        },
        getValue: function () {
            return this._field.getValue();
        },
        getLink: function () {
            return this._field.getLink();
        },
        getField: function () {
            return this._field.getField();
        },
        getPrevCentury: function () {
            return this.getCentury() - 1;
        },
        getCentury: function () {
            return parseInt(this._curYear.toString().substr(0, 2));
        },
        getYearCenturyLimit: function () {
            return parseInt(this._curYear.toString().substr(2, 2)) + 10;
        },
        setDate: function (a) {
            this._field.setValue(a);
        },
        setSymbolPressed: function () {
            this._field.addSymbolPressedClass();
        },
        unsetSymbolPressed: function () {
            this._field.removeSymbolPressedClass();
        },
        isSymbolPressed: function () {
            return this._field.hasSymbolPressedClass();
        }
    });
    var CalendarSelect = Base.extend({
        constructor: function (a) {
            this._select = a;
            this._down = this._up = this._popup = this._ins = this._value = this._viewPort = this._items = this._list = null
        },
        registerObjects: function (a, b) {
            a = "_" + a + "_" + b;
            this._list = $("#" + CalendarSelectConstants.selectListClass + a);
            this._viewPort = $("#" + CalendarSelectConstants.selectViewPortClass + a);
            this._value = $("#" + CalendarSelectConstants.selectControlValueClass + a);
            this._ins = $("#" + CalendarSelectConstants.selectValueDirectionsClass + a);
            this._popup = $("#" + CalendarSelectConstants.selectClass +
                a);
            this._up = $("#" + CalendarSelectConstants.toStartClass + a);
            this._down = $("#" + CalendarSelectConstants.toEndClass + a)
        },
        setItemsLayout: function (a) {
            this._list.html(a);
            this._items = this._list.children().children();
        },
        getList: function () {
            return this._list;
        },
        getViewPort: function () {
            return this._viewPort;
        },
        getItem: function (a) {
            return $(this._items.get(a));
        },
        addScrollClass: function () {
            this._select.addClass(CalendarSelectConstants.selectControlScrollClass);
        },
        setViewPortHeight: function (a) {
            this._viewPort.css("height", a + "px");
        },
        addDragClass: function () {
            $("body").addClass(CalendarSelectConstants.dragClass);
        },
        removeDragClass: function () {
            $("body").removeClass(CalendarSelectConstants.dragClass);
        },
        hasDragClass: function () {
            return $("body").hasClass(CalendarSelectConstants.dragClass);
        },
        popupShow: function () {
            this._popup.css("display", "block");
        },
        popupHide: function () {
            this._popup.css("display", "none");
        },
        getListTop: function () {
            var a = "" == this._list.css("top") ? 0 : this._list.css("top");
            return parseInt(a);
        },
        setListTop: function (a) {
            this._list.css("top", a + "px");
        },
        setPopupTop: function (a) {
            this._popup.css("top", a + "px");
        },
        getPopupTopBrowserDelta: function () {
            return 1;
//            return $.browser.mozilla ? 1 : 2 todo actual?
        },
        getTopFreeSpace: function () {
            return this._select.offset().top - Screen.getScrollTop();
        },
        setValueFrom: function (a) {
            this._value.text(a.text());
        },
        removeSelect: function (a) {
            a.removeClass(CalendarSelectConstants.selectItemSelectedClass);
        },
        addSelect: function (a) {
            a.addClass(CalendarSelectConstants.selectItemSelectedClass);
        },
        getItems: function () {
            return this._items;
        },
        getLink: function () {
            return [this._value, this._ins];
        },
        getDir: function () {
            return {
                up: this._up,
                down: this._down
            };
        }
    });
    var CalendarSelectConstants = Base.extend({}, {
        calendarClass: "calendar",
        selectControlClass: "calendar_selectControl",
        selectControlScrollClass: "calendar_select__scroll",
        monthSelectControlClass: "calendar_monthSelect",
        yearSelectControlClass: "calendar_yearSelect",
        selectControlValueClass: "calendar_selectControl_value",
        selectValueDirectionsClass: "calendar_select_directions",
        selectClass: "calendar_select",
        toStartClass: "calendar_select_toStart",
        toEndClass: "calendar_select_toEnd",
        selectViewPortClass: "calendar_select_viewPort",
        selectListClass: "calendar_select_list",
        selectItemClass: "calendar_select_list_item",
        selectItemSelectedClass: "calendar_select_list_item__selected",
        dateIconClass: "calendar_dateIcon",
        panelClass: "calendar_panel",
        shadowClass: "calendar_panel_shadow",
        dragClass: "isDrag",
        dragAccuracy: 1,
        dragDelayX: 10,
        dragDelayY: 10,
        noScrollDelta: 2,
        pressInterval: 30,
        selectItemHeight: 19,
        directionHeight: 14,
        defaultMaxItems: 12
    }),
        CalendarSelectHtml = Base.extend({}, {
            getLayout: function (a) {
                var b = this.getSelectLayout(a + "_month"),
                    c = this.getSelectLayout(a + "_year"),
                    d = CalendarSelectConstants.monthSelectControlClass,
                    e = CalendarSelectConstants.yearSelectControlClass,
                    f = CalendarSelectConstants.shadowClass,
                    g = CalendarSelectConstants.dateIconClass,
                    h = CalendarSelectConstants.selectControlClass;
                return "<div class='" + CalendarSelectConstants.panelClass + "'><div id='" + f + a + "' class='" + f + "'></div><div id='" + g + a + "' class='" + g + "'></div><div id='" + d + a + "' class='" + h + " " + d + "'>" + b + "</div><div id='" + e + a + "' class='" + h + " " + e + "'>" + c + "</div></div>"
            },
            getSelectLayout: function (a) {
                var b = CalendarSelectConstants.selectControlValueClass,
                    c = CalendarSelectConstants.selectClass,
                    d =
                        CalendarSelectConstants.selectValueDirectionsClass,
                    e = CalendarSelectConstants.toStartClass,
                    f = CalendarSelectConstants.selectViewPortClass,
                    g = CalendarSelectConstants.selectListClass,
                    h = CalendarSelectConstants.toEndClass;
                return "<div id='" + b + a + "' class='" + b + "'></div><div id='" + d + a + "' class='" + d + "'></div><div id='" + c + a + "' class='" + c + "'><a href='#' id='" + e + a + "' class='" + e + "'></a><div id='" + f + a + "' class='" + f + "'><ul id='" + g + a + "' class='" + g + "'></ul></div><a href='#' id='" +
                    h + a + "' class='" + h + "'></a></div>"
            },
            getItemLayout: function (a, b) {
                return "<li><a class='" + CalendarSelectConstants.selectItemClass + "' href='" + b + "'>" + a + "</a></li>"
            }
        });
    var CalendarSelectControl = Base.extend({
        constructor: function (a) {
            this._select = a;
            this._keys = [];
            this._values = [];
            this._config = {};
            this._listHeight = this._viewPortHeight = 0;
            this._isScroll = this._isDrag = !1;
            this._scroll = this._drag = null;
            this._selectedValue = 0;
            this._selectedItem = null;
            this._selectedItemNumber = 0;
        },
        configure: function (a, b, c) {
            this._config.maxItems = a.maxItems;
            this._config.hash = a.hash;
            this._keys = b;
            this._values = c;
            this._keys.length > this._config.maxItems ? (this._isScroll = this._isDrag = !0, this._viewPortHeight =
                this._config.maxItems * CalendarSelectConstants.selectItemHeight, this._listHeight = this._keys.length * CalendarSelectConstants.selectItemHeight) : this._viewPortHeight = this._listHeight = this._keys.length * CalendarSelectConstants.selectItemHeight
        },
        registerObjects: function (a, b) {
            this._select.registerObjects(a, b);
            this._isScroll && (this._select.addScrollClass(), this._select.setViewPortHeight(this._viewPortHeight));
        },
        build: function () {
            for (var a = "", b = 0; b < this._keys.length; ++b)
                a += CalendarSelectHtml.getItemLayout(this._keys[b], this._values[b]);
            this._select.setItemsLayout(a);
        },
        registerScroll: function () {
            var a = this;
            this._isScroll && (this._scroll = new Scroll({
                viewPort: a._select.getViewPort(),
                up: function () {
                    a.up();
                },
                down: function () {
                    a.down();
                },
                validUp: function () {
                    return a.validUp();
                },
                validDown: function () {
                    return a.validDown();
                }
            }))
        },
        registerDrag: function () {
            var a = this;
            this._isDrag && (this._drag = new Drag({
                object: a._select.getList(),
                viewPort: a._select.getViewPort(),
                delayX: CalendarSelectConstants.dragDelayX,
                delayY: CalendarSelectConstants.dragDelayY,
                start: function (b) {
                    a.dragStart(b);
                },
                move: function (b) {
                    a.drag(b);
                },
                end: function (b) {
                    a.dragEnd(b);
                }
            }))
        },
        up: function () {
            this._select.setListTop(this.validTop(this.getTopUp()));
        },
        down: function () {
            this._select.setListTop(this.validTop(this.getTopDown()));
        },
        dragStart: function () {
            this._select.addDragClass();
        },
        drag: function (a) {
            this._select.setListTop(this.validTop(this._select.getListTop() - a.deltaY));
        },
        dragEnd: function () {
            this._select.removeDragClass();
        },
        isDrag: function () {
            return this._select.hasDragClass();
        },
        selectValue: function (a) {
            this._selectedValue !=
                a && (null != this._selectedItem && this._select.removeSelect(this._selectedItem), this._selectedValue = a, this._selectedItem = this.__getItem(this._selectedValue).object, this._selectedItemNumber = this.__getItem(this._selectedValue).number, this._select.setValueFrom(this._selectedItem), this._select.addSelect(this._selectedItem))
        },
        __getItem: function (a) {
            for (var b = 0, c = 0; c < this._values.length; ++c) b = this._values[c] == a ? c : b;
            return {
                object: this._select.getItem(b),
                number: b
            }
        },
        showPopup: function () {
            this._select.popupShow();
            this._select.setListTop(this.validTop(this.getVerticalAlignTop()));
            this._select.setPopupTop(this.getPopupTop());
        },
        hidePopup: function () {
            this._select.popupHide();
        },
        getVerticalAlignTop: function () {
            return this.getViewPortCenterPosition() - this.getSelectedItemTop();
        },
        getViewPortCenterPosition: function () {
            return Math.floor(this._viewPortHeight / CalendarSelectConstants.selectItemHeight / 2 - 0.5) * CalendarSelectConstants.selectItemHeight;
        },
        getSelectedItemTop: function () {
            return this._selectedItemNumber * CalendarSelectConstants.selectItemHeight;
        },
        getPopupTop: function () {
            var a = this._select.getPopupTopBrowserDelta(),
                b = this._isScroll ? CalendarSelectConstants.directionHeight : CalendarSelectConstants.noScrollDelta,
                c = this.getSelectedItemTop(),
                d = this._listHeight,
                e = this._viewPortHeight,
                f = this.getViewPortCenterPosition(),
                g = Math.abs(e / CalendarSelectConstants.selectItemHeight % 2 - 1) * CalendarSelectConstants.selectItemHeight,
                h = f;
            c < f ? h = c : c + CalendarSelectConstants.selectItemHeight == d - f ? h = f + g : c >= d - f && (h = e - d + c);
            a = -1 * h - a - b;
            b = this._select.getTopFreeSpace();
            return -1 * Math.min(-1 * a, b);
        },
        clickUp: function () {
            this.validUp() && this.up();
        },
        clickDown: function () {
            this.validDown() && this.down();
        },
        getTopUp: function () {
            return this._select.getListTop() + CalendarSelectConstants.selectItemHeight;
        },
        getTopDown: function () {
            return this._select.getListTop() - CalendarSelectConstants.selectItemHeight;
        },
        getItems: function () {
            return this._select.getItems();
        },
        getLink: function () {
            return this._select.getLink();
        },
        getDir: function () {
            return this._select.getDir();
        },
        validTop: function (a) {
            a < this.getLimitTopDown() &&
                (a = this.getLimitTopDown());
            a > this.getLimitTopUp() && (a = this.getLimitTopUp());
            return a
        },
        validUp: function () {
            return this._select.getListTop() < this.getLimitTopUp();
        },
        validDown: function () {
            return this._select.getListTop() > this.getLimitTopDown();
        },
        getLimitTopUp: function () {
            return 0;
        },
        getLimitTopDown: function () {
            return this._viewPortHeight - this._listHeight;
        }
    });
    (function () {
        var a = new CalendarArea;
        jQuery.hideCalendar = function () {
            a.hideAllCalendars();
        };
        jQuery.calendar = function (b, c) {
            c = isUndefined(c) ? $() : c;
            return a.initialize(new CalendarControl(new Calendar(c, b)));
        };
        jQuery.fn.calendar = function (a) {
            if (a instanceof Object) jQuery.calendar(a, this);
            else {
                if ("isCreated" == a) return this.hasClass(CalendarFieldConstants.registeredClass);
                if ("getControl" == a) return CalendarArea.getHashControl(this.attr(CalendarFieldConstants.hashAttribute));
            }
            return this
        };
        jQuery.fn.addCalendarField =
            function (b) {
                var c = CalendarArea.getHashControl(this.attr("id"));
                c && a.addFields(c, b);
                return this
            };
        jQuery.fn.removeCalendarField = function (b) {
            var c = CalendarArea.getHashControl(this.attr("id"));
            c && a.destructFields(c, b);
            return this;
        };
        jQuery.fn.calendarClick = function () {
            CalendarContentControl.linkClick(this);
        }
    })();

    function Plugin(option, args) {
        return  $.calendar($.extend({}, {
            field: "input",
            icon: "button",
            minYear: 1940,
            maxYear: 2020,
            language: "RU",
            format: "dd.mm.yyyy",
            offsetX: 0,
            offsetY: 2
        }, option || {})).addCalendarField(this);
    }

    $.fn.calendar = Plugin;

})($);

//import "plugin.js"
//import "stateEnum.js"

(function($, doc) {
    'use strict';

    var pluginName = 'checkbox';
    var eventType = commonPrefix + pluginName;
    var selector = '.checkbox';
    
    var Checkbox = function (element) {
        var $label = $(element);

        if (!$label.is('label')) {
            $label = $label.closest('label');
            if ($label.length === 0) {
                console.log('checkbox element must be wrapped by label')
            }
        }

        this.$label = $label;
        var $checkbox = this.$checkbox = $label.find('input[type="checkbox"]');
        this.groupName = $checkbox.attr('name')
        this.isChecked = $label.hasClass(stateEnum.checked);
        this.setInitialState();

        $checkbox.on('change', $.proxy(this.onChange, this));
    };

    Checkbox.prototype.setInitialState = function() {
        var checked = this.$checkbox.prop(stateEnum.checked);
        var disabled = this.$checkbox.prop(stateEnum.disabled);

        this.setState(stateEnum.disabled, disabled);
        this.setState(stateEnum.checked, checked);
    };

    Checkbox.prototype.setState = function(prop, val) {
        var value = val !== undefined ? val : true

        this.$label.toggleClass(prop, value);
        this.$checkbox.prop(prop, value);
    };

    Checkbox.prototype.check = function() {
        this.setState(stateEnum.checked, true);
    };

    Checkbox.prototype.onChange = function() {
        var checked = this.$checkbox.prop(stateEnum.checked);

        this.setState(stateEnum.checked, checked);
    };

    Checkbox.prototype.uncheck = function() {
        this.setState(stateEnum.checked, false);
    };

    Checkbox.prototype.enable = function() {
        this.setState(stateEnum.disabled, false);
    };

    Checkbox.prototype.disable = function() {
        this.setState(stateEnum.disabled, true);
    };

    defineConstructorPlugin(pluginName, Checkbox);

    $(doc).on('ready initialize.' + eventType, function(){
        $(selector)[pluginName]();
    });
})(jQuery, document);

//import "plugin.js"
//import "keyCodeEnum.js"
//import "stateEnum.js"

(function ($, doc) {
    'use strict';

    var pluginName = 'dropdown';
    var eventType = commonPrefix + pluginName;
    var suffix = 'Dropdown';

    var selector = '.dropdown-list';
    var dividerSelector = '.divider';
    
    var scrollbarPadding = 15;

    var Dropdown = function(element) {
        this.isOpen = false;
        this.$elem = $(element);
        this.$list = $("[data-dropdown-id='" + this.$elem.data('dropdown') + "']");
        this.index = -1;

        this._setInitialState();
        this._setListWidth();
        this._attachEvents();
    };

    Dropdown.Defaults = {
        maxShowItem: 5
    };

    Dropdown.prototype._setInitialState = function() {
        var checkedItem = this.$list.find('.checked').eq(0);
        if (checkedItem.length === 0) return;
        this.$elem.text(checkedItem.text());
    };

    Dropdown.prototype._attachEvents = function() {
        var _this = this;

        $(doc).on('click.' + eventType, this.hide.bind(this));

        this.$list.on('click.' + eventType, function (e) {
            var id = $(this).data('dropdown-id');
            var $item = $(e.target);
            if (!$item.is('li'))
                $item = $item.closest('li');

            _this.selectItem($item);
        });

        this.$elem.on('click.' + eventType, function (e) {
            e.stopPropagation();
            e.preventDefault();

            $('[data-dropdown]')[pluginName]('hide');

            $(this).focus();
            _this.toggle();
        })
        this.$elem.on('keydown.' + eventType, this.keypress.bind(this));
    };

    Dropdown.prototype.show = function() {
        if (this.isOpen)
            return;
        this.$elem.trigger('show.' + eventType);
        this.isOpen = true;
        this.$list.show().offset(this._recalculateOffset());
        this.$elem.addClass(stateEnum.active);
        this.$elem.trigger('shown.' + eventType);
    };

    Dropdown.prototype.hide = function() {
        if (!this.isOpen)
            return;
        this.$elem.trigger('hide.' + eventType);
        this.isOpen = false;
        this.$list.hide();
        this.$elem.removeClass(stateEnum.active);
        this.$elem.trigger('hidden.' + eventType);
    };

    Dropdown.prototype.toggle = function() {
        if (this.isOpen)
            this.hide();
        else
            this.show();
    };

    Dropdown.prototype.keypress = function (event) {
        var kids = this.$list.children();
        switch (event.keyCode) {
            case keyCodeEnum.Up:
                kids.removeClass(stateEnum.hover);
                if (this.index > 0)--this.index;
                $(kids[this.index]).addClass(stateEnum.hover);
                break;
            case keyCodeEnum.Down:
                this.show();
                kids.removeClass(stateEnum.hover);
                if (this.index < kids.length - 1)++this.index;
                $(kids[this.index]).addClass(stateEnum.hover);
                break;
            case keyCodeEnum.Esc:
                kids.removeClass(stateEnum.hover);
                this.index = -1;
                this.hide();
                break;
            case keyCodeEnum.Enter:
                this.selectItem($(kids[this.index]));
                this.hide();
                break;
            default:
                return;
        }
        event.stopPropagation();
        event.preventDefault();
    };
    
    Dropdown.prototype.selectItem = function ($item) {
        if (!$item.is('li') || $item.is(dividerSelector))
            return;
        this._handleSelect($item);
        this.$elem.trigger('select.' + eventType, [$item]);
    };

    Dropdown.prototype._handleSelect = function ($item) { };

    Dropdown.prototype._getInitOffset = function () {
        var offset = this.$elem.offset();
        offset.top += this.$elem.outerHeight() - parseInt(this.$elem.css('borderBottomWidth'), 10);
        return offset;
    };

    Dropdown.prototype._recalculateOffset = function () {
        var offset = this._getInitOffset();
        var widthList = this.$list.outerWidth();

        var rightOverflow = offset.left + widthList - $(window).scrollLeft() - $(window).width() + scrollbarPadding;
        if (rightOverflow > 0)
            offset.left -= widthList - this.$elem.outerWidth();

        var bottomOverflow = offset.top + this.$list.outerHeight()- $(window).scrollTop() - $(window).height();
        if (bottomOverflow > 0)
            offset.top -= bottomOverflow;

        return offset;
    };

    Dropdown.prototype._setListWidth = function() {
        var widthCaller = this.$elem.outerWidth();
        var widthList = this.$list.outerWidth();
        var paddingList = widthList - this.$list.width();
        if (widthList < widthCaller)
            this.$list.width(widthCaller - paddingList);
    };

    function createDropdown(elem) {
        var $elem = $(elem);
        var pluginType = $elem.data('dropdown-type');
        var plugin = (pluginType) ? pluginType + suffix : pluginName;
        return new $.fn[plugin].Constructor(elem);
    }

    defineFactoryPlugin(pluginName, createDropdown, { Constructor: Dropdown });

    $(doc).on('ready initialize.' + eventType, function () {
        $('[data-dropdown]')[pluginName]();
    });

})(jQuery, document);

(function($) {
    'use strict';

    var pluginName = 'grid';
    var eventType = commonPrefix + pluginName;
    var selector = '.grid';
    var itemSelector = '.grid-item';
    var childSelector = '> ' + itemSelector;

    var Grid = function (element, options) {
        this.element = $(element);
        this.options = $.extend({}, Grid.Defaults, options);
        this.columns = null;
        this.rows = null;

        this.init();
    };

    Grid.Defaults = {
        columns : '1fr',
        rows : '1fr'
    };

    Grid.prototype.init = function(){
        var width = this.element.width();
        var height = this.element.height();

        this.columns = this._parseGridTemplate(this.options.columns);
        this.rows = this._parseGridTemplate(this.options.rows);
        this._setLayout(this._normalize(this.columns, width),
            this._normalize(this.rows, height));
    };

    Grid.prototype.resize = function() {
        var width = this.element.width();
        var height = this.element.height();

        this._setLayout(this._normalize(this.columns, width),
            this._normalize(this.rows, height));
    };

    Grid.prototype._setLayout = function (columns, rows) {
        this.element.find(childSelector).each(function () {
            var $this = $(this);

            var colIndex = $this.data('grid-column');
            colIndex = (!colIndex) ? 0 : colIndex - 1;
            var rowIndex = $this.data('grid-row');
            rowIndex = (!rowIndex) ? 0 : rowIndex - 1;

            var margin = $this.outerWidth(true) - $this.outerWidth();
            var padding = $this.outerWidth() - $this.width();
            $this.width(columns[colIndex] - margin - padding);

            margin = $this.outerHeight(true) - $this.outerHeight();
            padding = $this.outerHeight() - $this.height();
            if (rows[rowIndex] < 0) {
                rows[rowIndex] = $this.height() + margin + padding;
            } else
                $this.height(rows[rowIndex] - margin - padding);

            $this.css('left', sum(columns, colIndex));
            $this.css('top', sum(rows, rowIndex));
        });
        if (this.element.height() == 0)
            this.element.height(sum(rows));
    };

    Grid.prototype._parseGridTemplate = function(template) {
        var result = [];
        var re = /^(\d*\.?\d*)(.*)/;
        template.split(" ").forEach(function(value){
            var item = value.match(re);
            result.push({ value: parseInt(item[1], 10), unit: item[2] });
        });
        return result;
    };

    //������ -1, ���� ������ �� ���� ���������� ������ �������. 
    //����� �������� ���� height == 0, � ��� ������ ������ 1fr � ���� margin/padding
    //��� ������� ����� �������� ����������, ������ ��� width ��-��������� > 0 (���� ���� �� ������ �������������)
    Grid.prototype._normalize = function(values, maxValue) {
        var result = [];

        var pxSum = 0;
        var frCount = 0;
        for(var i = 0; i < values.length; ++i) { 
            if (values[i].unit == 'px')
                pxSum += values[i].value;
            if (values[i].unit == 'fr')
                frCount += values[i].value;
        }

        var rest = maxValue > pxSum ? (maxValue - pxSum) : 0;
        var oneFr = rest / frCount;
        for(var i = 0; i < values.length; ++i) {
            if (values[i].unit == 'px')
                result.push(values[i].value);
            if (values[i].unit == 'fr')
                result.push(maxValue != 0 ? oneFr * values[i].value : -1);
        }
        return result;
    };

    function sum(array, count) {
        if (count < 0 ) count = 0;
        if (count == undefined || count > array.length) count = array.length;
        var sum = 0;
        for(var i = 0; i < count; ++i) {
            sum += array[i];
        }
        return sum;
    }

    function Plugin(option) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data(eventType);

            if (!data) $this.data(eventType, (data = new Grid(this, option)));
            if (option == 'resize') data.resize();
        })
    }

    var old = $.fn[pluginName];

    $.fn[pluginName] = Plugin;
    $.fn[pluginName].Constructor = Grid;

    $.fn[pluginName].noConflict = function () {
        $.fn[pluginName] = old;
        return this;
    };

    $(window).on('resize.' + eventType, function (e) {
        $(selector).grid('resize');
    })

}(jQuery));

/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
* Licensed under the MIT License (LICENSE.txt).
*
* Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
* Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
* Thanks to: Seamus Leahy for adding deltaX and deltaY
*
* Version: 3.0.6
* 
* Requires: 1.2.2+
*/

(function ($) {

    var types = ['DOMMouseScroll', 'mousewheel'];

    if ($.event.fixHooks) {
        for (var i = types.length; i; ) {
            $.event.fixHooks[types[--i]] = $.event.mouseHooks;
        }
    }

    $.event.special.mousewheel = {
        setup: function () {
            if (this.addEventListener) {
                for (var i = types.length; i; ) {
                    this.addEventListener(types[--i], handler, false);
                }
            } else {
                this.onmousewheel = handler;
            }
        },

        teardown: function () {
            if (this.removeEventListener) {
                for (var i = types.length; i; ) {
                    this.removeEventListener(types[--i], handler, false);
                }
            } else {
                this.onmousewheel = null;
            }
        }
    };

    $.fn.extend({
        mousewheel: function (fn) {
            return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
        },

        unmousewheel: function (fn) {
            return this.unbind("mousewheel", fn);
        }
    });


    function handler(event) {
        var orgEvent = event || window.event, args = [].slice.call(arguments, 1), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
        event = $.event.fix(orgEvent);
        event.type = "mousewheel";

        // Old school scrollwheel delta
        if (orgEvent.wheelDelta) { delta = orgEvent.wheelDelta / 120; }
        if (orgEvent.detail) { delta = -orgEvent.detail / 3; }

        // New school multidimensional scroll (touchpads) deltas
        deltaY = delta;

        // Gecko
        if (orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
            deltaY = 0;
            deltaX = -1 * delta;
        }

        // Webkit
        if (orgEvent.wheelDeltaY !== undefined) { deltaY = orgEvent.wheelDeltaY / 120; }
        if (orgEvent.wheelDeltaX !== undefined) { deltaX = -1 * orgEvent.wheelDeltaX / 120; }

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        return ($.event.dispatch || $.event.handle).apply(this, args);
    }

})(jQuery);

/**
* Detect Element Resize Plugin for jQuery
*
* https://github.com/sdecima/javascript-detect-element-resize
* Sebastian Decima
*
* version: 0.5.3
**/

(function ( $ ) {
	var attachEvent = document.attachEvent,
		stylesCreated = false;
	
	var jQuery_resize = $.fn.resize;
	
	$.fn.resize = function(callback) {
		return this.each(function() {
			if(this == window)
				jQuery_resize.call(jQuery(this), callback);
			else
				addResizeListener(this, callback);
		});
	}

	$.fn.removeResize = function(callback) {
		return this.each(function() {
			removeResizeListener(this, callback);
		});
	}
	
	if (!attachEvent) {
		var requestFrame = (function(){
			var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame ||
								function(fn){ return window.setTimeout(fn, 20); };
			return function(fn){ return raf(fn); };
		})();
		
		var cancelFrame = (function(){
			var cancel = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame ||
								   window.clearTimeout;
		  return function(id){ return cancel(id); };
		})();

		function resetTriggers(element){
			var triggers = element.__resizeTriggers__,
				expand = triggers.firstElementChild,
				contract = triggers.lastElementChild,
				expandChild = expand.firstElementChild;
			contract.scrollLeft = contract.scrollWidth;
			contract.scrollTop = contract.scrollHeight;
			expandChild.style.width = expand.offsetWidth + 1 + 'px';
			expandChild.style.height = expand.offsetHeight + 1 + 'px';
			expand.scrollLeft = expand.scrollWidth;
			expand.scrollTop = expand.scrollHeight;
		};

		function checkTriggers(element){
			return element.offsetWidth != element.__resizeLast__.width ||
						 element.offsetHeight != element.__resizeLast__.height;
		}
		
		function scrollListener(e){
			var element = this;
			resetTriggers(this);
			if (this.__resizeRAF__) cancelFrame(this.__resizeRAF__);
			this.__resizeRAF__ = requestFrame(function(){
				if (checkTriggers(element)) {
					element.__resizeLast__.width = element.offsetWidth;
					element.__resizeLast__.height = element.offsetHeight;
					element.__resizeListeners__.forEach(function(fn){
						fn.call(element, e);
					});
				}
			});
		};
		
		/* Detect CSS Animations support to detect element display/re-attach */
		var animation = false,
			animationstring = 'animation',
			keyframeprefix = '',
			animationstartevent = 'animationstart',
			domPrefixes = 'Webkit Moz O ms'.split(' '),
			startEvents = 'webkitAnimationStart animationstart oAnimationStart MSAnimationStart'.split(' '),
			pfx  = '';
		{
			var elm = document.createElement('fakeelement');
			if( elm.style.animationName !== undefined ) { animation = true; }    
			
			if( animation === false ) {
				for( var i = 0; i < domPrefixes.length; i++ ) {
					if( elm.style[ domPrefixes[i] + 'AnimationName' ] !== undefined ) {
						pfx = domPrefixes[ i ];
						animationstring = pfx + 'Animation';
						keyframeprefix = '-' + pfx.toLowerCase() + '-';
						animationstartevent = startEvents[ i ];
						animation = true;
						break;
					}
				}
			}
		}
		
		var animationName = 'resizeanim';
		var animationKeyframes = '@' + keyframeprefix + 'keyframes ' + animationName + ' { from { opacity: 0; } to { opacity: 0; } } ';
		var animationStyle = keyframeprefix + 'animation: 1ms ' + animationName + '; ';
	}
	
	function createStyles() {
		if (!stylesCreated) {
			//opacity:0 works around a chrome bug https://code.google.com/p/chromium/issues/detail?id=286360
			var css = (animationKeyframes ? animationKeyframes : '') +
					'.resize-triggers { ' + (animationStyle ? animationStyle : '') + 'visibility: hidden; opacity: 0; } ' +
					'.resize-triggers, .resize-triggers > div, .contract-trigger:before { content: \" \"; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; } .resize-triggers > div { background: #eee; overflow: auto; } .contract-trigger:before { width: 200%; height: 200%; }',
				head = document.head || document.getElementsByTagName('head')[0],
				style = document.createElement('style');
			
			style.type = 'text/css';
			if (style.styleSheet) {
				style.styleSheet.cssText = css;
			} else {
				style.appendChild(document.createTextNode(css));
			}

			head.appendChild(style);
			stylesCreated = true;
		}
	}
	
	window.addResizeListener = function(element, fn){
		if (attachEvent) element.attachEvent('onresize', fn);
		else {
			if (!element.__resizeTriggers__) {
				if (getComputedStyle(element).position == 'static') element.style.position = 'relative';
				createStyles();
				element.__resizeLast__ = {};
				element.__resizeListeners__ = [];
				(element.__resizeTriggers__ = document.createElement('div')).className = 'resize-triggers';
				element.__resizeTriggers__.innerHTML = '<div class="expand-trigger"><div></div></div>' +
																						'<div class="contract-trigger"></div>';
				element.appendChild(element.__resizeTriggers__);
				resetTriggers(element);
				element.addEventListener('scroll', scrollListener, true);
				
				/* Listen for a css animation to detect element display/re-attach */
				animationstartevent && element.__resizeTriggers__.addEventListener(animationstartevent, function(e) {
					if(e.animationName == animationName)
						resetTriggers(element);
				});
			}
			element.__resizeListeners__.push(fn);
		}
	};
	
	window.removeResizeListener = function(element, fn){
		if (attachEvent) element.detachEvent('onresize', fn);
		else {
			element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
			if (!element.__resizeListeners__.length) {
					element.removeEventListener('scroll', scrollListener);
					element.__resizeTriggers__ = !element.removeChild(element.__resizeTriggers__);
			}
		}
	}
}( jQuery ));
/**
 * key codes enum
 * @readonly
 * @enum {number}
 */

var keyCodeEnum = {
    Backspace: 8,
    Comma: 188,
    Delete: 46,
    Down: 40,
    End: 35,
    Enter: 13,
    Esc: 27,
    Home: 36,
    Left: 37,
    PageDown: 34,
    PageUp: 33,
    Period: 190,
    Right: 39,
    Space: 32,
    Tab: 9,
    Up: 38
};

var isKeyCodePrintable = function(keycode){
    return ((keycode > 47 && keycode < 58)   || // number keys
        keycode == keyCodeEnum.Space || keycode == keyCodeEnum.Backspace ||
        keycode == keyCodeEnum.Delete  || keycode == keyCodeEnum.Enter || // spacebar
        (keycode > 64 && keycode < 91)      || // letter keys
        (keycode > 95 && keycode < 112)     || // numpad keys
        (keycode > 185 && keycode < 193)    || // ;=,-./` (in order)
        (keycode > 218 && keycode < 223));   // [\]' (in order)
};

//import "stateEnum.js"

(function ($, doc) {
    
    var pluginName = 'menu';
    var eventType = commonPrefix + pluginName;
    var selector = '.menu';
    var itemClass = 'menu-item';
    var itemSelector = '.' + itemClass;
    
    $(doc)
        .on('click.' + eventType, selector, function (e) {
            e.preventDefault();
            var $item = $(e.target);

            if (!$item.hasClass(itemClass))
                $item = $item.closest(itemSelector);

            $(itemSelector).removeClass(stateEnum.active);
            $item.addClass(stateEnum.active);
        })

})(jQuery, document);


(function($, doc) {
    'use strict';

    var pluginName = 'modal';
    var eventType = commonPrefix + pluginName;

    var DEFAULTS = {
        width: 600,
        onEsc: true,
        hasClose: true,
        hasBackdrop: true,
        disableBackdrop: false,
        stickyFooter: true,
        onClose: function() {},
        onOpen: function() {}
    };

    var modal;
    var _placeholder;
    var _lastElement;
    var _body;
    var shownClass = _getModalClassName('shown');

    function Modal() { //Singleton
        this.visible = false;
    }

    /* private methods */

    function _checkInstance() {
        if (!$.modal.instance) {
            modal = new Modal();
            $.modal.instance = modal;
        }
    }

    function _getModalClassName(className) {
        return _getClassName('modal-' + className);
    }

    function _getClassName(className) { //for global export
        className = '' + className; // it will be prefixed by c#
        return className;
    }

    function _getEl(tagName, className, appendTo, html, raw) { //for global export
        var el = document.createElement(tagName);
        el.className = '' + className; // it will be prefixed by c#
        if (html) {
            el.innerHTML = html
        }
        if (!raw) {
            el = $(el);
            if (appendTo) {
                el.appendTo(appendTo);
            }
        } else if (appendTo) {
            appendTo.appendChild(el);
        }
        return el;
    }

    function _getModalEl(className, appendTo, html, raw, tagName) {
        return _getEl(tagName || 'div', 'modal-' + className, appendTo, html, raw);
    }

    function _measureScrollbar() {
        var div = _getModalEl('scrollbar-measure', document.body, null, true);
        var scrollbarWidth = div.offsetWidth - div.clientWidth;
        document.body.removeChild(div);
        return scrollbarWidth;
    }

    function _checkScrollbar() {
        var fullWindowWidth = window.innerWidth
        if (!fullWindowWidth) { // for missing window.innerWidth in IE8
          var documentElementRect = document.documentElement.getBoundingClientRect()
          fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
        }
        modal.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
        modal.scrollbarWidth = _measureScrollbar()
    }

    function _setScrollbar() {
        var bodyPad = parseInt((modal.$html.css('padding-right') || 0), 10)
        modal.originalBodyPad = document.body.style.paddingRight || ''
        if (modal.bodyIsOverflowing) modal.$html.css('padding-right', bodyPad + modal.scrollbarWidth)
    }

    function _resetScrollbar() {
        modal.$html.css('padding-right', modal.originalBodyPad)
    }

    function _killScroll() {
        _checkScrollbar()
        _setScrollbar()
        modal.$html.addClass(_getModalClassName('open'));
    }

    function _enableScroll() {
        modal.$html.removeClass(_getModalClassName('open'))
        _resetScrollbar()
    }

    function  _isElement(o){
        return (
            typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
            o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
        );
    }

    /* public methods */

    Modal.prototype._init = function($el, options) {
        this.options = $.extend({}, DEFAULTS, options);
        this.$element = $el;
        this.$html = $('html');
        this.$footer = this.$element.find('.' + _getModalClassName('footer'));

        this.$element.width(this.options.width);
    };

    Modal.prototype.bind = function() {
        this.show();
    };

    Modal.prototype.show = function() {
        var opt = this.options;
        var $el = this.$element;

        if (!this._checkIsModal($el, opt)) return;

        var e = $.Event('show.' + eventType);

        this.$element.trigger(e);

        if (e.isDefaultPrevented()) return;

        $el.off('dismiss.' + eventType); // when method 'show' is invoked twice

        if (opt.hasClose) {
            this.$closeIcon = _getModalEl('close', $el, '&times')
                .on('click.dismiss.' + eventType, this.hide.bind(this));
        }

        $el.on('click.dismiss.' + eventType, '[data-modal-action=close]', this.hide.bind(this));

        $el.resize(this._adjustDialog.bind(this));

        this.options.onOpen();

        if (this.visible) {
            // if window is opened, we do not close it, but update inner
            // ignore options {hasBackdrop, onEsc}
            this._update();
            this._adjustDialog();
            return;
        }

        this.visible = true;

        _killScroll();
        this._escape();
        this._backdrop();
        this._resize();

        // build markup
        if (!this.$wrap) {
            this.$wrap = _getModalEl('wrap').on('click.' + eventType, function(e) {
                var target = e.target;
                if (!$.contains(modal.$contentContainer[0], target) && $.contains(this, target)
                    && !modal.options.disableBackdrop) {
                    modal.hide(e);
                }
            })

            this.$container = _getModalEl('container', this.$wrap)

            this.$contentContainer = _getModalEl('content-container', this.$container);
        }

        this._update();

        this.$wrap.appendTo(_body);

        this._adjustDialog();

        $el.trigger('shown.' + eventType);
    };

    Modal.prototype.hide = function(e) {
        if (e) e.preventDefault();

        e = $.Event('hide.' + eventType, {delegatedEvent: e});

        this.$element.trigger(e);

        if (!this.visible || e.isDefaultPrevented()) return;

        this.visible = false;

        $(doc).off(eventType);

        this.$element.removeResize(function(){});

        this.options.onClose();

        _enableScroll();
        this._escape();
        this._backdrop();
        this._resize();

        this._resetAdjustments()

        this.$closeIcon && this.$closeIcon.remove();

        this._clear();

        this.$wrap.detach();

        this.$element.trigger('hidden.' + eventType);
    };

    Modal.prototype.toggle = function() {
        if (this.visible)
            this.hide();
        else
            this.show();
    };

    Modal.prototype._checkIsModal = function($el, options) {
        if ($el.hasClass(_getModalClassName('window'))) {
            return true;
        }

        var targetSelector = $el.attr('data-modal-target') || $el.attr('href');
        var $target = $(targetSelector);

        $el.on('click', function(e) {
            e.preventDefault();

            this._init($target, options);

            this.show();
        }.bind(this));
    };

    Modal.prototype._clear = function() {
        var $el = this.$element;

        $el.removeClass(shownClass);

        if (!_placeholder) {
            this.$contentContainer.empty();
        } else {
            _lastElement
                .removeClass(shownClass)
                .appendTo(_placeholder);
        }

        _placeholder = $el.parent().length !== 0 ? $el.parent() : null;
        _lastElement = $el;
    };

    Modal.prototype._update = function() {
        this.$wrap.toggleClass('disabled', modal.options.disableBackdrop);

        this.$contentContainer
            .detach();

        this._clear();

        this.$element
            .appendTo(this.$contentContainer)
            .addClass(shownClass);

        this.$contentContainer.appendTo(this.$container);
    };

    Modal.prototype._escape = function() {
        if (this.visible && this.options.onEsc) {
            $(window).on('keyup.' + eventType, $.proxy(function(e) {
                e.which == 27 && this.hide();
            }, this));
        } else if (!this.visible) {
            $(window).off('keyup.' + eventType);
        }
    };

    Modal.prototype._backdrop = function() {
        if (this.visible && this.options.hasBackdrop) {
            this.$backdrop = _getModalEl('backdrop', _body)
                .on('click.' + eventType, this.hide.bind(this));
        } else if (!this.visible) {
            this.$backdrop && this.$backdrop.remove();
        }
    };

    Modal.prototype._resize = function() {
        if (this.visible) {
            $(window)
                .on('resize.' + eventType, $.proxy(this._handleUpdate, this))
        } else {
            $(window).off('resize.' + eventType);
        }
    };

    Modal.prototype._handleUpdate = function() {
        this._adjustDialog();
    };

    Modal.prototype._adjustDialog = function() {
        var modalIsOverflowing = this.$contentContainer[0].scrollHeight > document.documentElement.clientHeight

        if (modalIsOverflowing && this.options.stickyFooter) {
            if (!this._isFooterSticked) {
                this._isFooterSticked = true
                this._stickFooter();
            }
        } else {
            if (this._isFooterSticked) {
                this._isFooterSticked = false
                this._removeStickFooter();
            }
        }

        this.$contentContainer.css({
          paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
          paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
        })
    };

    Modal.prototype._resetAdjustments = function() {
        this._isFooterSticked = false
        this._removeStickFooter();

        this.$contentContainer.css({
          paddingLeft: '',
          paddingRight: ''
        })
    };

    Modal.prototype._stickFooter = function() {
        if (!this.$footer.length) return;

        this.$footer
            .css('width', this.options.width)

        this.$wrap.addClass(_getModalClassName('sticky'));
    };

    Modal.prototype._removeStickFooter = function() {
        this.$wrap.removeClass(_getModalClassName('sticky'));

        this.$footer
            .attr('style', '')
    };

    $.fn.modal = function(method, options) {
        var _method = method || 'show';
        _body = $(doc.body);
        _checkInstance();
        modal._init(this, options);
        modal[_method]();
    };

    $.modal = {
        instance: null,

        hide: function() {
            if ($.modal.instance) $.modal.instance.hide();
        },
        
        show: function(options) {
            var DEFAULT_BUTTON_TEXT = 'Закрыть';

            //get data from options
            var content; // {object | DOM | Jquery | string}
            var header, footer, expand;

            if (options && typeof options === 'object' && options.items) {
                var items = options.items;
                header = items.header;
                footer = items.footer;
                expand = items.expand;
                content = items.content || '';
            } else if (options && _isElement(options) || options instanceof jQuery 
                || /(string|number)/gi.test(typeof options)) {
                content = options;
            } else {
                this.instance && !modal.visible && this.instance.show(); //open last opened window (ignore options)
                return;
            }

            //builtin markup

            var $modal = _getModalEl('window');

            header && _getModalEl('header', $modal, header);

            var $content = _getModalEl('content', $modal);

            _getModalEl('content-inner', $content).append(content);

            var $footer = _getModalEl('footer', $modal, footer);

            // add expanded text

            if (expand) {
                var $expand = _getModalEl('expand', $content);

                var $expandText = _getModalEl('expand-text', $content, expand).hide();

                _getEl('span', 'link', $expand, 'Подробнее')
                    .click(function() {
                        $expandText.toggle()
                    })
            }

            // append buttons

            var buttons = options.buttons || [];

            if (typeof buttons === 'object' && buttons.length && buttons.length > 0) {
                buttons.forEach(function(btn){
                    var $button =  _getEl('button', 'btn', $footer, btn.text || DEFAULT_BUTTON_TEXT)
                    $button.addClass(_getClassName('btn-middle'));
                    if (btn.onClick && typeof btn.onClick === 'function') {
                        $button.click(btn.onClick);
                    }
                    if (btn.color && typeof btn.color === 'string') {
                        $button.addClass(_getClassName('btn-' + btn.color));
                    }
                });
            } else if (buttons.length === 0) {
                // create default close button 
                var $button =  _getEl('button', 'btn', $footer, DEFAULT_BUTTON_TEXT)
                $button
                    .addClass(_getClassName('btn-middle'))
                    .attr('data-modal-action', 'close');
            } else {
                console.error('[coreui modal] buttons must have to be created due to array');
            }

            // open modal with options from DEFAULTS

            var filteredOptions = {};

            for (var caption in options) {
                if (options.hasOwnProperty(caption) && DEFAULTS[caption] !== undefined)
                    filteredOptions[caption] = options[caption];
            }

            $modal.modal('show', filteredOptions);
        }
    };

})(jQuery, document);

function defineConstructorPlugin(name, Constructor) {
    defineFactoryPlugin(name, function(elem, options) { 
        return new Constructor(elem, options); 
    },
    { Constructor: Constructor });
}

function defineFactoryPlugin(name, createFunc, obj) {
    var old = $.fn[name];

    $.fn[name] = function (methodName) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.each(function () {
            var $this = $(this);
            var data = $this.data(commonPrefix + name);
            var options = args[0];

            if (!data) {
                data = createFunc(this, options);
                $this.data(commonPrefix + name, data);
            }

            var method = data[methodName];
            if (method) {
                method.apply(data, args);
            }
        })
    };
    $.fn[name].noConflict = function () {
        $.fn[name] = old;
        return this;
    };
    $.extend($.fn[name], obj);
}


(function($, doc) {
    'use strict';

    var pluginName = 'radio';
    var eventType = commonPrefix + pluginName;
    var selector = '.radio';
    
    var Radio = function (element) {
        var $label = $(element);

        if (!$label.is('label')) {
            $label = $label.closest('label');
            if ($label.length === 0) {
                console.log('radio element must be wrapped by label')
            }
        }

        this.$label = $label;
        var $radio = this.$radio = $label.find('input[type="radio"]');
        this.groupName = $radio.attr('name')
        this.isChecked = $label.hasClass(stateEnum.checked);
        this._setInitialState();

        $radio.on('change', $.proxy(this.check, this));
    };

    Radio.prototype._setInitialState = function() {
        var checked = this.$radio.prop(stateEnum.checked);
        var disabled = this.$radio.prop(stateEnum.disabled);

        this._setState(stateEnum.disabled, disabled);
        this._setState(stateEnum.checked, checked);
    };

    Radio.prototype._setState = function(prop, val) {
        var value = val !== undefined ? val : true

        this.$label.toggleClass(prop, value);
        this.$radio.prop(prop, value);
    };

    Radio.prototype._uncheckAll = function() {
        var $radios = $('input[name="'+this.groupName+'"]').closest('label');

        if ($radios.length < 2) return;

        $radios.each(function(){
            $(this).radio('uncheck');
        });
    };

    Radio.prototype.check = function() {
        this._uncheckAll();
        this._setState(stateEnum.checked, true);
    };

    Radio.prototype.uncheck = function() {
        this._setState(stateEnum.checked, false);
    };

    Radio.prototype.enable = function() {
        this._setState(stateEnum.disabled, false);
    };

    Radio.prototype.disable = function() {
        this._setState(stateEnum.disabled, true);
    };

    defineConstructorPlugin(pluginName, Radio);

    $(doc).on('ready initialize.' + eventType, function(){
        $(selector)[pluginName]();
    });
})(jQuery, document);

//import "dropdown.js";
//import "plugin.js"

(function($, doc) {

    var basePluginName = 'dropdown';
    var pluginName = 'searchDropdown';
    var Dropdown = $.fn[basePluginName].Constructor;

    function SearchDropdown(elem) {
        Dropdown.call(this, elem);
        this.searchList = this._initSearchList();
        this.search();
        this.$elem.on('keydown', $.proxy(this._handleChange, this));
    }

    SearchDropdown.prototype = Object.create(Dropdown.prototype);

    SearchDropdown.prototype._handleSelect = function ($selected) {
        this._setContent(this._transform($selected));
    };


    SearchDropdown.prototype._handleChange = function(event) {
        if (!isKeyCodePrintable(event.keyCode))
            return;

        clearTimeout(this.searching);
        this.searching = setTimeout($.proxy(function() {
            var result = this.search();
            this._renderList(this.$list, result);
            this.index = -1;
        }, this), 50);
    };
    
    SearchDropdown.prototype.search = function() {
        var searchText = this.$elem.val().toLowerCase();
        var result = [];
        for (var i = 0; i < this.searchList.length; ++i) {
            if (this._isPrefix(this.searchList[i], searchText)) {
                result.push(this.searchList[i]);
            }
        }
        return result;
    };
    
    SearchDropdown.prototype._isPrefix = function(source, prefix) {
        if (prefix.length > source.length)
            return false;

        source = source.toLowerCase();
        for (var i = 0; i < prefix.length; i++) {
            if (source[i] != prefix[i])
                return false;
        }
        return true;
    };
    
    SearchDropdown.prototype._initSearchList = function () {
        var searchList = [];
        var transform = this._transform;
        this.$list.find('>li').each(function () {
            searchList.push(transform($(this)));
        });
        return searchList;
    };

    SearchDropdown.prototype._renderList = function($list, items) {
        $list.empty();
        items.forEach(function(value){
            $list.append($('<li>' + value + '</li>'));
        });
        return $list;
    };

    SearchDropdown.prototype.setTransformer = function (format) {
        this._transform = format;
    };

    SearchDropdown.prototype._transform = function ($selected) {
        return $selected.text();
    };

    SearchDropdown.prototype._setContent = function (content) {
        if (this.$elem.is('input')) {
            this.$elem.val(content);
        } else if (this.$elem.html) {
            this.$elem.html(content);
        }
    };

    defineConstructorPlugin(pluginName, SearchDropdown);

}(jQuery, document));

//import "dropdown.js";
//import "plugin.js"
//import "stateEnum.js"

(function($, doc) {

    var basePluginName = 'dropdown';
    var pluginName = 'selectDropdown';
    var Dropdown = $.fn[basePluginName].Constructor;

    function SelectDropdown(elem) {
        Dropdown.call(this, elem);
    }

    SelectDropdown.prototype = Object.create(Dropdown.prototype);

    SelectDropdown.prototype._handleSelect = function ($selected) {
        this._setContent(this._transform($selected));
        this._setChecked($selected);
    };

    SelectDropdown.prototype.setTransformer = function(format) {
        this._transform = format;
    };

    SelectDropdown.prototype._transform = function ($selected) {
        return $selected.text();
    };

    SelectDropdown.prototype._setContent = function (content) {
        if (this.$elem.is('input')) {
            this.$elem.val(content);
        } else if (this.$elem.html) {
            this.$elem.html(content);
        }
    };

    SelectDropdown.prototype._setChecked = function ($item) {
        this.$list.find('>.' + stateEnum.checked).removeClass(stateEnum.checked);
        $item.addClass(stateEnum.checked);
    };

    defineConstructorPlugin(pluginName, SelectDropdown);

}(jQuery, document));

var stateEnum = {
    hover: 'hover',
    active: 'active',
    checked: 'checked',
    disabled: 'disabled',
    busy: 'busy'
};

+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var pluginName = 'tooltip';
  var eventType = commonPrefix + pluginName;

  var Tooltip = function (element, options) {
    this.type       = eventType
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.6'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: false,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('coreui.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('coreui.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('coreui.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('coreui.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('coreui.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element
        .removeAttr('aria-describedby')
        .trigger('hidden.' + that.type)
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset()
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('coreui.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('coreui.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('coreui.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('coreui.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('coreui.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);