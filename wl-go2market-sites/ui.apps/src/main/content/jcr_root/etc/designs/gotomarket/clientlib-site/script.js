/** a JS file that shall be included */
$(document).ready(function () {
    var e = {
    init: function () {
        function e(e) {
            var t = {};
                return window.location.href.replace(location.hash, "").replace(/[?&]+([^=&]+)=?([^&]*)?/gi, function (e, i, a) {
                    t[i] = void 0 !== a ? a : ""
                }), e ? t[e] ? t[e] : null : t
            }

            var t = this, i = $(window).width();

            t.cookieDisclaimer(), t.setVideoPlayer(), t.defaultSlider(), t.navTabs(), t.accordeon(), i > 768 ? t.rowEqualizer() : (t.responsiveMenu(), t.responsiveHandler()), $(window).resize(function () {
                if (i = $(window).width(), i > 768 ? t.resizeHandler() : (t.resetEqualizer(), t.responsiveMenu(), t.responsiveHandler()), $(".section__tabs").length > 0) {
                    var e = $(".section__tabs li.active").attr("data-tab"),
                        a = $("*[data-tab-content=" + e + "] .tab__content-wrapper").outerHeight(!0, !0);
                    $("*[data-tab-content=" + e + "]").css({"min-height": a})
                }
            }), $("body").bind("touchstart", function (e) {
            }), $(".header--main-search").on("mouseover", function () {
                $(".global-search--field").focus()
            }), $(".masonry").length && t.setMasonry();
        t.stickyHeader();
        t.ctaContactUs();

        }, cookieDisclaimer: function () {
            // var e = $(".cookie-policy"), t = $(".cookie-policy__accept");
            // "accepted" != Cookies.get("cookie-policy") && e.removeClass("accepted"), t.on("click", function () {
            //     Cookies.set("cookie-policy", "accepted", {expires: 365}), e.addClass("hide-disclaimer")
            // })
        }, setVideoPlayer: function () {
            $("[data-video-url]").length > 0 && $("[data-video-url]").each(function () {
                var e = $(this), t = e.attr("data-video-url"), i = e.attr("data-video-thumb");
                jwplayer($(this).attr("id")).setup({file: t, image: i})
            })
        }, navTabs: function () {
            var e = this, t = $(".section__tabs li");
            e.openTab(), $(".section__tabs li").on("click", function (i) {
                i.preventDefault();
                $(this).attr("data-tab");
                t.removeClass("active"), $(this).addClass("active"), e.openTab()
            })
        }, openTab: function () {
            var e = $(".section__tabs li.active").attr("data-tab"),
                t = $("*[data-tab-content=" + e + "] .tab__content-wrapper").outerHeight(!0, !0);
            $("*[data-tab-content], *[data-tab-content] .tab__content-wrapper").css({"min-height": 0}), $("*[data-tab-content=" + e + "]").css({"min-height": t})
        }, accordeon: function () {
            var e = $(".accordeon__section"), t = $(".accordeon__section-title"), i = $(".accordeon__section-content");
            i.each(function () {
                $(this).attr("data-height", $(this).outerHeight(!0, !0)), $(this).css({height: 0})
            }), t.on("click", function () {
                if ($(this).parent().hasClass("open")) $(this).parent().removeClass("open"), $(this).next(i).css({height: 0}); else {
                    $(this).parent().addClass("open");
                    var t = Number($(this).next(i).attr("data-height")) + 20;
                    $(this).next(i).css({height: t}), e.not($(this).parent()).removeClass("open"), e.not($(this).parent()).find(i).css({height: 0})
                }
            })
        }, rowEqualizer: function () {
            var e = $(".row-equalizer");
            e.imagesLoaded(function () {
                e.each(function () {
                    var e = $(this).find('*[class^="grid-col-"] .block--article, *[class^="grid-col-"] .block--article.h, *[class^="grid-col-"] .block--quote'),
                        t = [];
                    e.each(function () {
                        var e = $(this).outerHeight(!1);
                        t.push(e)
                    });
                    var i = Math.max.apply(Math, t);
                    e.each(function () {
                        $(this).outerHeight(!1) < i && $(this).css({height: i})
                    })
                })
            })
        }, resetEqualizer: function () {
            $(".row-equalizer").find('*[class^="grid-col-"] .block--article, *[class^="grid-col-"] .block--quote').css({height: ""})
        }, setMasonry: function () {
            var e = $(".masonry");
            e.masonry({itemSelector: ".grid-col-4"}), e.imagesLoaded().progress(function () {
                e.masonry("layout")
            }), $(document).on("click", function () {
                e.masonry("layout")
            })
        }, defaultSlider: function () {
            var e = new Swiper(".slider__default", {
                wrapperClass: "slider-wrapper",
                slideClass: "slider-slide",
                slideActiveClass: "slide-active",
                loop: !0,
                pagination: ".slider-pagination",
                paginationType: "bullets",
                bulletClass: "slider-bullet",
                bulletActiveClass: "bullet-active",
                paginationHiddenClass: "bullet-inactive",
                paginationClickable: !0,
                paginationBulletRender: function (e, t) {
                    return '<span class="' + t + '">' + (e + 1) + "</span>"
                },
                speed: 400,
                spaceBetween: 100
            });
            $(".slider-button-next").on("click", function () {
                e.slideNext()
            }), $(".slider-button-prev").on("click", function () {
                e.slidePrev()
            })
        }, responsiveMenu: function () {
            var e = $("li.megamenu");
            $(".icon--menu").unbind("click").bind("click", function (t) {
                t.preventDefault(), e.removeClass("opened"), e.find(".submenu").css({"max-height": ""}), $(".header--main-menu").hasClass("opened") ? ($(".header--main, .header--main-menu").removeClass("opened"), $(".breadcrumb, .message--warning").css({display: "block"})) : ($(".header--main, .header--main-menu").addClass("opened"), $(".breadcrumb, .message--warning").css({display: "none"}))
            }), e.unbind("click").bind("click", function (t) {
                if (t.preventDefault(), e.find(".submenu").css({"max-height": ""}), $(this).hasClass("opened")) window.location.href = $(t.target).closest("a").attr("href"); else {
                    e.removeClass("opened"), $(this).addClass("opened");
                    var i = $(this).find(".submenu li").length;
                    $(this).find(".submenu").css({"max-height": 64 * i + 40 + "px"})
                }
            }), $(document).on("click touchstart", "body", function (e) {
                !$(".header--main").is(e.target) && 0 === $(".header--main").has(e.target).length && $(".header--main-menu").hasClass("opened") && $(".header--main-menu").removeClass("opened")
            })
        }, responsiveHandler: function () {
            var e = $(".header--main-search");
            e.unbind("click").bind("click", function (t) {
                e.hasClass("opened") || (t.preventDefault(), e.addClass("opened"))
            }), $(document).on("click touchstart", "body", function (t) {
                !e.is(t.target) && 0 === e.has(t.target).length && e.hasClass("opened") && $(e).removeClass("opened")
            })
        }, resizeHandler: function () {
            var e = this;
            e.resetEqualizer(), e.rowEqualizer()
        }, ajaxNewsroom: function (e, t) {
            var i = $(".tab__content-ajax");
            i.addClass("loading"), jQuery.get(ajaxurl, {action: "newsroom_posts", cat: e, paged: t}, function (e) {
                i.empty().append(e), i.removeClass("loading")
            })
        }, ajaxPagination: function () {
            var e, t, i = this;
            $(".ajax__tabs").on("click", ".pagination__links a", function (a) {
                a.preventDefault(), e = $(this)[0].hasAttribute("data-page") ? $(this).attr("data-page") : $(this).text(), t = $(".section__tabs li.active").attr("data-category-id");
                var n = window.location.href, s = "newsroom-page=" + e, r = /newsroom-page=[0-9]+/g;
                if (r.test(n))var o = n.replace(r, s); else if (/\?/.test(n))var o = n + "&" + s; else var o = n + "?" + s;
                window.history.pushState(null, null, o), i.ajaxNewsroom(t, e)
            })
        }, ajaxOffices: function (e, t) {
            var i = $(".offices-ajax");
            i.addClass("loading"), jQuery.post(ajaxurl, {
                action: "show_offices",
                country: e,
                "country-name": t
            }, function (e) {
                i.empty().append(e), i.removeClass("loading")
            })
        },
        stickyHeader: function () {
            var e = 0;
            $(window).on("scroll", function () {
                var t = document.documentElement.scrollTop || document.body.scrollTop,
                    i = 200,
                    a = i + 50;
                    t === 0 ? $(".header--main").removeClass("hide hidden sticky") : t > e ? t > i && ($(".header--main").addClass("hidden"), setTimeout(function () {
                            $(".header--main").addClass("sticky").removeClass("hide hidden")
                        }, 400)) : t < a && $(".header--main").hasClass("sticky") && ($(".header--main").addClass("hide"), setTimeout(function () {
                            $(".header--main").removeClass("sticky hide")
                        }, 100)), e = t
            })
        },
        ctaContactUs: function () {
            var e = 0;
            $(window).on("scroll", function () {
                var t = document.documentElement.scrollTop || document.body.scrollTop,
                    i = document.body.scrollTop + $(window).outerHeight();
                0 === t ? $(".cta--contact-us").removeClass("visible") : t > e ? (document.body.scrollTop > 200 && $(".cta--contact-us").addClass("visible"), i > $(".footer--main").offset().top && $(".cta--contact-us").removeClass("visible")) : (document.body.scrollTop < 200 && $(".cta--contact-us").removeClass("visible"), i < $(".footer--main").offset().top && $(".cta--contact-us").addClass("visible")), e = t
            })
        },  articlesRowSlider: function () {
            var e = new Swiper(".articles-row--slider-container", {
                wrapperClass: "articles-row--slider-wrapper",
                slideClass: "articles-row--slider-slide",
                slideActiveClass: "slide-active",
                loop: !0,
                speed: 400
            });
            $(".articles-row--slider-nav .slider-nav.next").on("click", function () {
                e.slideNext()
            }), $(".articles-row--slider-nav .slider-nav.previous").on("click", function () {
                e.slidePrev()
            })
        }, pageFullwidthSlider: function () {
            var e = new Swiper(".page--slider-container", {
                wrapperClass: "page--slider-wrapper",
                slideClass: "page--slider-slide",
                slideActiveClass: "slide-active",
                loop: !0,
                pagination: ".page--slider-pagination",
                paginationType: "bullets",
                bulletClass: "slider-pagination-bullet",
                bulletActiveClass: "active",
                paginationHiddenClass: "inactive",
                paginationClickable: !0,
                paginationBulletRender: function (e, t, i) {
                    return '<button class="' + i + '">' + (t + 1) + "</button>"
                },
                speed: 400,
                autoplay: 4e3
            });
            $(".page--slider-nav .slider-nav.next").on("click", function () {
                e.slideNext()
            }), $(".page--slider-nav .slider-nav.previous").on("click", function () {
                e.slidePrev()
            })
        }, footerSitemap: function () {
            var e = $(".footer--sitemap-list"), t = e.find("li").length, i = Math.ceil(t / 2);
            Math.floor(t / 2);
            e.parent().append('<ul class="footer--sitemap-list col2"></ul>'), e.find("li").eq(i - 1).nextAll().appendTo(".footer--sitemap-list.col2")
        }
    };
    e.init()
}), function (e, t) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", t) : "object" == typeof module && module.exports ? module.exports = t() : e.EvEmitter = t()
}(this, function () {
    function e() {
    }

    var t = e.prototype;
    return t.on = function (e, t) {
        if (e && t) {
            var i = this._events = this._events || {}, a = i[e] = i[e] || [];
            return a.indexOf(t) == -1 && a.push(t), this
        }
    }, t.once = function (e, t) {
        if (e && t) {
            this.on(e, t);
            var i = this._onceEvents = this._onceEvents || {}, a = i[e] = i[e] || [];
            return a[t] = !0, this
        }
    }, t.off = function (e, t) {
        var i = this._events && this._events[e];
        if (i && i.length) {
            var a = i.indexOf(t);
            return a != -1 && i.splice(a, 1), this
        }
    }, t.emitEvent = function (e, t) {
        var i = this._events && this._events[e];
        if (i && i.length) {
            var a = 0, n = i[a];
            t = t || [];
            for (var s = this._onceEvents && this._onceEvents[e]; n;) {
                var r = s && s[n];
                r && (this.off(e, n), delete s[n]), n.apply(this, t), a += r ? 0 : 1, n = i[a]
            }
            return this
        }
    }, e
}), function (e, t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function (i) {
            return t(e, i)
        }) : "object" == typeof module && module.exports ? module.exports = t(e, require("ev-emitter")) : e.imagesLoaded = t(e, e.EvEmitter)
}(window, function (e, t) {
    function i(e, t) {
        for (var i in t)e[i] = t[i];
        return e
    }

    function a(e) {
        var t = [];
        if (Array.isArray(e)) t = e; else if ("number" == typeof e.length)for (var i = 0; i < e.length; i++)t.push(e[i]); else t.push(e);
        return t
    }

    function n(e, t, s) {
        return this instanceof n ? ("string" == typeof e && (e = document.querySelectorAll(e)), this.elements = a(e), this.options = i({}, this.options), "function" == typeof t ? s = t : i(this.options, t), s && this.on("always", s), this.getImages(), o && (this.jqDeferred = new o.Deferred), void setTimeout(function () {
                this.check()
            }.bind(this))) : new n(e, t, s)
    }

    function s(e) {
        this.img = e
    }

    function r(e, t) {
        this.url = e, this.element = t, this.img = new Image
    }

    var o = e.jQuery, l = e.console;
    n.prototype = Object.create(t.prototype), n.prototype.options = {}, n.prototype.getImages = function () {
        this.images = [], this.elements.forEach(this.addElementImages, this)
    }, n.prototype.addElementImages = function (e) {
        "IMG" == e.nodeName && this.addImage(e), this.options.background === !0 && this.addElementBackgroundImages(e);
        var t = e.nodeType;
        if (t && d[t]) {
            for (var i = e.querySelectorAll("img"), a = 0; a < i.length; a++) {
                var n = i[a];
                this.addImage(n)
            }
            if ("string" == typeof this.options.background) {
                var s = e.querySelectorAll(this.options.background);
                for (a = 0; a < s.length; a++) {
                    var r = s[a];
                    this.addElementBackgroundImages(r)
                }
            }
        }
    };
    var d = {1: !0, 9: !0, 11: !0};
    return n.prototype.addElementBackgroundImages = function (e) {
        var t = getComputedStyle(e);
        if (t)for (var i = /url\((['"])?(.*?)\1\)/gi, a = i.exec(t.backgroundImage); null !== a;) {
            var n = a && a[2];
            n && this.addBackground(n, e), a = i.exec(t.backgroundImage)
        }
    }, n.prototype.addImage = function (e) {
        var t = new s(e);
        this.images.push(t)
    }, n.prototype.addBackground = function (e, t) {
        var i = new r(e, t);
        this.images.push(i)
    }, n.prototype.check = function () {
        function e(e, i, a) {
            setTimeout(function () {
                t.progress(e, i, a)
            })
        }

        var t = this;
        return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function (t) {
                t.once("progress", e), t.check()
            }) : void this.complete()
    }, n.prototype.progress = function (e, t, i) {
        this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded, this.emitEvent("progress", [this, e, t]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, e), this.progressedCount == this.images.length && this.complete(), this.options.debug && l && l.log("progress: " + i, e, t)
    }, n.prototype.complete = function () {
        var e = this.hasAnyBroken ? "fail" : "done";
        if (this.isComplete = !0, this.emitEvent(e, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
            var t = this.hasAnyBroken ? "reject" : "resolve";
            this.jqDeferred[t](this)
        }
    }, s.prototype = Object.create(t.prototype), s.prototype.check = function () {
        var e = this.getIsImageComplete();
        return e ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void(this.proxyImage.src = this.img.src))
    }, s.prototype.getIsImageComplete = function () {
        return this.img.complete && void 0 !== this.img.naturalWidth
    }, s.prototype.confirm = function (e, t) {
        this.isLoaded = e, this.emitEvent("progress", [this, this.img, t])
    }, s.prototype.handleEvent = function (e) {
        var t = "on" + e.type;
        this[t] && this[t](e)
    }, s.prototype.onload = function () {
        this.confirm(!0, "onload"), this.unbindEvents()
    }, s.prototype.onerror = function () {
        this.confirm(!1, "onerror"), this.unbindEvents()
    }, s.prototype.unbindEvents = function () {
        this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, r.prototype = Object.create(s.prototype), r.prototype.check = function () {
        this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url;
        var e = this.getIsImageComplete();
        e && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
    }, r.prototype.unbindEvents = function () {
        this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, r.prototype.confirm = function (e, t) {
        this.isLoaded = e, this.emitEvent("progress", [this, this.element, t])
    }, n.makeJQueryPlugin = function (t) {
        t = t || e.jQuery, t && (o = t, o.fn.imagesLoaded = function (e, t) {
            var i = new n(this, e, t);
            return i.jqDeferred.promise(o(this))
        })
    }, n.makeJQueryPlugin(), n
}), !function (e, t) {
    "use strict";
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function (i) {
            t(e, i)
        }) : "object" == typeof module && module.exports ? module.exports = t(e, require("jquery")) : e.jQueryBridget = t(e, e.jQuery)
}(window, function (e, t) {
    "use strict";
    function i(i, s, o) {
        function l(e, t, a) {
            var n, s = "$()." + i + '("' + t + '")';
            return e.each(function (e, l) {
                var d = o.data(l, i);
                if (!d)return void r(i + " not initialized. Cannot call methods, i.e. " + s);
                var p = d[t];
                if (!p || "_" == t.charAt(0))return void r(s + " is not a valid method");
                var u = p.apply(d, a);
                n = void 0 === n ? u : n
            }), void 0 !== n ? n : e
        }

        function d(e, t) {
            e.each(function (e, a) {
                var n = o.data(a, i);
                n ? (n.option(t), n._init()) : (n = new s(a, t), o.data(a, i, n))
            })
        }

        o = o || t || e.jQuery, o && (s.prototype.option || (s.prototype.option = function (e) {
            o.isPlainObject(e) && (this.options = o.extend(!0, this.options, e))
        }), o.fn[i] = function (e) {
            if ("string" == typeof e) {
                var t = n.call(arguments, 1);
                return l(this, e, t)
            }
            return d(this, e), this
        }, a(o))
    }

    function a(e) {
        !e || e && e.bridget || (e.bridget = i)
    }

    var n = Array.prototype.slice, s = e.console, r = "undefined" == typeof s ? function () {
        } : function (e) {
            s.error(e)
        };
    return a(t || e.jQuery), i
}), function (e, t) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", t) : "object" == typeof module && module.exports ? module.exports = t() : e.EvEmitter = t()
}(this, function () {
    function e() {
    }

    var t = e.prototype;
    return t.on = function (e, t) {
        if (e && t) {
            var i = this._events = this._events || {}, a = i[e] = i[e] || [];
            return -1 == a.indexOf(t) && a.push(t), this
        }
    }, t.once = function (e, t) {
        if (e && t) {
            this.on(e, t);
            var i = this._onceEvents = this._onceEvents || {}, a = i[e] = i[e] || [];
            return a[t] = !0, this
        }
    }, t.off = function (e, t) {
        var i = this._events && this._events[e];
        if (i && i.length) {
            var a = i.indexOf(t);
            return -1 != a && i.splice(a, 1), this
        }
    }, t.emitEvent = function (e, t) {
        var i = this._events && this._events[e];
        if (i && i.length) {
            var a = 0, n = i[a];
            t = t || [];
            for (var s = this._onceEvents && this._onceEvents[e]; n;) {
                var r = s && s[n];
                r && (this.off(e, n), delete s[n]), n.apply(this, t), a += r ? 0 : 1, n = i[a]
            }
            return this
        }
    }, e
}), function (e, t) {
    "use strict";
    "function" == typeof define && define.amd ? define("get-size/get-size", [], function () {
            return t()
        }) : "object" == typeof module && module.exports ? module.exports = t() : e.getSize = t()
}(window, function () {
    "use strict";
    function e(e) {
        var t = parseFloat(e), i = -1 == e.indexOf("%") && !isNaN(t);
        return i && t
    }

    function t() {
    }

    function i() {
        for (var e = {width: 0, height: 0, innerWidth: 0, innerHeight: 0, outerWidth: 0, outerHeight: 0},
                 t = 0; d > t; t++) {
            var i = l[t];
            e[i] = 0
        }
        return e
    }

    function a(e) {
        var t = getComputedStyle(e);
        return t || o("Style returned " + t + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), t
    }

    function n() {
        if (!p) {
            p = !0;
            var t = document.createElement("div");
            t.style.width = "200px", t.style.padding = "1px 2px 3px 4px", t.style.borderStyle = "solid", t.style.borderWidth = "1px 2px 3px 4px", t.style.boxSizing = "border-box";
            var i = document.body || document.documentElement;
            i.appendChild(t);
            var n = a(t);
            s.isBoxSizeOuter = r = 200 == e(n.width), i.removeChild(t)
        }
    }

    function s(t) {
        if (n(), "string" == typeof t && (t = document.querySelector(t)), t && "object" == typeof t && t.nodeType) {
            var s = a(t);
            if ("none" == s.display)return i();
            var o = {};
            o.width = t.offsetWidth, o.height = t.offsetHeight;
            for (var p = o.isBorderBox = "border-box" == s.boxSizing, u = 0; d > u; u++) {
                var c = l[u], m = s[c], h = parseFloat(m);
                o[c] = isNaN(h) ? 0 : h
            }
            var f = o.paddingLeft + o.paddingRight, g = o.paddingTop + o.paddingBottom,
                v = o.marginLeft + o.marginRight, y = o.marginTop + o.marginBottom,
                w = o.borderLeftWidth + o.borderRightWidth, b = o.borderTopWidth + o.borderBottomWidth, x = p && r,
                T = e(s.width);
            T !== !1 && (o.width = T + (x ? 0 : f + w));
            var C = e(s.height);
            return C !== !1 && (o.height = C + (x ? 0 : g + b)), o.innerWidth = o.width - (f + w), o.innerHeight = o.height - (g + b), o.outerWidth = o.width + v, o.outerHeight = o.height + y, o
        }
    }

    var r, o = "undefined" == typeof console ? t : function (e) {
                console.error(e)
            },
        l = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
        d = l.length, p = !1;
    return s
}), function (e, t) {
    "use strict";
    "function" == typeof define && define.amd ? define("matches-selector/matches-selector", t) : "object" == typeof module && module.exports ? module.exports = t() : e.matchesSelector = t()
}(window, function () {
    "use strict";
    var e = function () {
        var e = Element.prototype;
        if (e.matches)return "matches";
        if (e.matchesSelector)return "matchesSelector";
        for (var t = ["webkit", "moz", "ms", "o"], i = 0; i < t.length; i++) {
            var a = t[i], n = a + "MatchesSelector";
            if (e[n])return n
        }
    }();
    return function (t, i) {
        return t[e](i)
    }
}), function (e, t) {
    "use strict";
    "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["matches-selector/matches-selector"], function (i) {
            return t(e, i)
        }) : "object" == typeof module && module.exports ? module.exports = t(e, require("desandro-matches-selector")) : e.fizzyUIUtils = t(e, e.matchesSelector)
}(window, function (e, t) {
    var i = {};
    i.extend = function (e, t) {
        for (var i in t)e[i] = t[i];
        return e
    }, i.modulo = function (e, t) {
        return (e % t + t) % t
    }, i.makeArray = function (e) {
        var t = [];
        if (Array.isArray(e)) t = e; else if (e && "number" == typeof e.length)for (var i = 0; i < e.length; i++)t.push(e[i]); else t.push(e);
        return t
    }, i.removeFrom = function (e, t) {
        var i = e.indexOf(t);
        -1 != i && e.splice(i, 1)
    }, i.getParent = function (e, i) {
        for (; e != document.body;)if (e = e.parentNode, t(e, i))return e
    }, i.getQueryElement = function (e) {
        return "string" == typeof e ? document.querySelector(e) : e
    }, i.handleEvent = function (e) {
        var t = "on" + e.type;
        this[t] && this[t](e)
    }, i.filterFindElements = function (e, a) {
        e = i.makeArray(e);
        var n = [];
        return e.forEach(function (e) {
            if (e instanceof HTMLElement) {
                if (!a)return void n.push(e);
                t(e, a) && n.push(e);
                for (var i = e.querySelectorAll(a), s = 0; s < i.length; s++)n.push(i[s])
            }
        }), n
    }, i.debounceMethod = function (e, t, i) {
        var a = e.prototype[t], n = t + "Timeout";
        e.prototype[t] = function () {
            var e = this[n];
            e && clearTimeout(e);
            var t = arguments, s = this;
            this[n] = setTimeout(function () {
                a.apply(s, t), delete s[n]
            }, i || 100)
        }
    }, i.docReady = function (e) {
        "complete" == document.readyState ? e() : document.addEventListener("DOMContentLoaded", e)
    }, i.toDashed = function (e) {
        return e.replace(/(.)([A-Z])/g, function (e, t, i) {
            return t + "-" + i
        }).toLowerCase()
    };
    var a = e.console;
    return i.htmlInit = function (t, n) {
        i.docReady(function () {
            var s = i.toDashed(n), r = "data-" + s, o = document.querySelectorAll("[" + r + "]"),
                l = document.querySelectorAll(".js-" + s), d = i.makeArray(o).concat(i.makeArray(l)),
                p = r + "-options", u = e.jQuery;
            d.forEach(function (e) {
                var i, s = e.getAttribute(r) || e.getAttribute(p);
                try {
                    i = s && JSON.parse(s)
                } catch (t) {
                    return void(a && a.error("Error parsing " + r + " on " + e.className + ": " + t))
                }
                var o = new t(e, i);
                u && u.data(e, n, o)
            })
        })
    }, i
}), function (e, t) {
    "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], function (i, a) {
            return t(e, i, a)
        }) : "object" == typeof module && module.exports ? module.exports = t(e, require("ev-emitter"), require("get-size")) : (e.Outlayer = {}, e.Outlayer.Item = t(e, e.EvEmitter, e.getSize))
}(window, function (e, t, i) {
    "use strict";
    function a(e) {
        for (var t in e)return !1;
        return t = null, !0
    }

    function n(e, t) {
        e && (this.element = e, this.layout = t, this.position = {x: 0, y: 0}, this._create())
    }

    function s(e) {
        return e.replace(/([A-Z])/g, function (e) {
            return "-" + e.toLowerCase()
        })
    }

    var r = document.documentElement.style, o = "string" == typeof r.transition ? "transition" : "WebkitTransition",
        l = "string" == typeof r.transform ? "transform" : "WebkitTransform",
        d = {WebkitTransition: "webkitTransitionEnd", transition: "transitionend"}[o],
        p = [l, o, o + "Duration", o + "Property"], u = n.prototype = Object.create(t.prototype);
    u.constructor = n, u._create = function () {
        this._transn = {ingProperties: {}, clean: {}, onEnd: {}}, this.css({position: "absolute"})
    }, u.handleEvent = function (e) {
        var t = "on" + e.type;
        this[t] && this[t](e)
    }, u.getSize = function () {
        this.size = i(this.element)
    }, u.css = function (e) {
        var t = this.element.style;
        for (var i in e) {
            var a = p[i] || i;
            t[a] = e[i]
        }
    }, u.getPosition = function () {
        var e = getComputedStyle(this.element), t = this.layout._getOption("originLeft"),
            i = this.layout._getOption("originTop"), a = e[t ? "left" : "right"], n = e[i ? "top" : "bottom"],
            s = this.layout.size, r = -1 != a.indexOf("%") ? parseFloat(a) / 100 * s.width : parseInt(a, 10),
            o = -1 != n.indexOf("%") ? parseFloat(n) / 100 * s.height : parseInt(n, 10);
        r = isNaN(r) ? 0 : r, o = isNaN(o) ? 0 : o, r -= t ? s.paddingLeft : s.paddingRight, o -= i ? s.paddingTop : s.paddingBottom, this.position.x = r, this.position.y = o
    }, u.layoutPosition = function () {
        var e = this.layout.size, t = {}, i = this.layout._getOption("originLeft"),
            a = this.layout._getOption("originTop"), n = i ? "paddingLeft" : "paddingRight", s = i ? "left" : "right",
            r = i ? "right" : "left", o = this.position.x + e[n];
        t[s] = this.getXValue(o), t[r] = "";
        var l = a ? "paddingTop" : "paddingBottom", d = a ? "top" : "bottom", p = a ? "bottom" : "top",
            u = this.position.y + e[l];
        t[d] = this.getYValue(u), t[p] = "", this.css(t), this.emitEvent("layout", [this])
    }, u.getXValue = function (e) {
        var t = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && !t ? e / this.layout.size.width * 100 + "%" : e + "px"
    }, u.getYValue = function (e) {
        var t = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && t ? e / this.layout.size.height * 100 + "%" : e + "px"
    }, u._transitionTo = function (e, t) {
        this.getPosition();
        var i = this.position.x, a = this.position.y, n = parseInt(e, 10), s = parseInt(t, 10),
            r = n === this.position.x && s === this.position.y;
        if (this.setPosition(e, t), r && !this.isTransitioning)return void this.layoutPosition();
        var o = e - i, l = t - a, d = {};
        d.transform = this.getTranslate(o, l), this.transition({
            to: d,
            onTransitionEnd: {transform: this.layoutPosition},
            isCleaning: !0
        })
    }, u.getTranslate = function (e, t) {
        var i = this.layout._getOption("originLeft"), a = this.layout._getOption("originTop");
        return e = i ? e : -e, t = a ? t : -t, "translate3d(" + e + "px, " + t + "px, 0)"
    }, u.goTo = function (e, t) {
        this.setPosition(e, t), this.layoutPosition()
    }, u.moveTo = u._transitionTo, u.setPosition = function (e, t) {
        this.position.x = parseInt(e, 10), this.position.y = parseInt(t, 10)
    }, u._nonTransition = function (e) {
        this.css(e.to), e.isCleaning && this._removeStyles(e.to);
        for (var t in e.onTransitionEnd)e.onTransitionEnd[t].call(this)
    }, u._transition = function (e) {
        if (!parseFloat(this.layout.options.transitionDuration))return void this._nonTransition(e);
        var t = this._transn;
        for (var i in e.onTransitionEnd)t.onEnd[i] = e.onTransitionEnd[i];
        for (i in e.to)t.ingProperties[i] = !0, e.isCleaning && (t.clean[i] = !0);
        if (e.from) {
            this.css(e.from);
            var a = this.element.offsetHeight;
            a = null
        }
        this.enableTransition(e.to), this.css(e.to), this.isTransitioning = !0
    };
    var c = "opacity," + s(p.transform || "transform");
    u.enableTransition = function () {
        this.isTransitioning || (this.css({
            transitionProperty: c,
            transitionDuration: this.layout.options.transitionDuration
        }), this.element.addEventListener(d, this, !1))
    }, u.transition = n.prototype[o ? "_transition" : "_nonTransition"], u.onwebkitTransitionEnd = function (e) {
        this.ontransitionend(e)
    }, u.onotransitionend = function (e) {
        this.ontransitionend(e)
    };
    var m = {"-webkit-transform": "transform"};
    u.ontransitionend = function (e) {
        if (e.target === this.element) {
            var t = this._transn, i = m[e.propertyName] || e.propertyName;
            if (delete t.ingProperties[i], a(t.ingProperties) && this.disableTransition(), i in t.clean && (this.element.style[e.propertyName] = "", delete t.clean[i]), i in t.onEnd) {
                var n = t.onEnd[i];
                n.call(this), delete t.onEnd[i]
            }
            this.emitEvent("transitionEnd", [this])
        }
    }, u.disableTransition = function () {
        this.removeTransitionStyles(), this.element.removeEventListener(d, this, !1), this.isTransitioning = !1
    }, u._removeStyles = function (e) {
        var t = {};
        for (var i in e)t[i] = "";
        this.css(t)
    };
    var h = {transitionProperty: "", transitionDuration: ""};
    return u.removeTransitionStyles = function () {
        this.css(h)
    }, u.removeElem = function () {
        this.element.parentNode.removeChild(this.element), this.css({display: ""}), this.emitEvent("remove", [this])
    }, u.remove = function () {
        return o && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function () {
                this.removeElem()
            }), void this.hide()) : void this.removeElem()
    }, u.reveal = function () {
        delete this.isHidden, this.css({display: ""});
        var e = this.layout.options, t = {}, i = this.getHideRevealTransitionEndProperty("visibleStyle");
        t[i] = this.onRevealTransitionEnd, this.transition({
            from: e.hiddenStyle,
            to: e.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: t
        })
    }, u.onRevealTransitionEnd = function () {
        this.isHidden || this.emitEvent("reveal")
    }, u.getHideRevealTransitionEndProperty = function (e) {
        var t = this.layout.options[e];
        if (t.opacity)return "opacity";
        for (var i in t)return i
    }, u.hide = function () {
        this.isHidden = !0, this.css({display: ""});
        var e = this.layout.options, t = {}, i = this.getHideRevealTransitionEndProperty("hiddenStyle");
        t[i] = this.onHideTransitionEnd, this.transition({
            from: e.visibleStyle,
            to: e.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: t
        })
    }, u.onHideTransitionEnd = function () {
        this.isHidden && (this.css({display: "none"}), this.emitEvent("hide"))
    }, u.destroy = function () {
        this.css({position: "", left: "", right: "", top: "", bottom: "", transition: "", transform: ""})
    }, n
}), function (e, t) {
    "use strict";
    "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function (i, a, n, s) {
            return t(e, i, a, n, s)
        }) : "object" == typeof module && module.exports ? module.exports = t(e, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : e.Outlayer = t(e, e.EvEmitter, e.getSize, e.fizzyUIUtils, e.Outlayer.Item)
}(window, function (e, t, i, a, n) {
    "use strict";
    function s(e, t) {
        var i = a.getQueryElement(e);
        if (!i)return void(o && o.error("Bad element for " + this.constructor.namespace + ": " + (i || e)));
        this.element = i, l && (this.$element = l(this.element)), this.options = a.extend({}, this.constructor.defaults), this.option(t);
        var n = ++p;
        this.element.outlayerGUID = n, u[n] = this, this._create();
        var s = this._getOption("initLayout");
        s && this.layout()
    }

    function r(e) {
        function t() {
            e.apply(this, arguments)
        }

        return t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t
    }

    var o = e.console, l = e.jQuery, d = function () {
    }, p = 0, u = {};
    s.namespace = "outlayer", s.Item = n, s.defaults = {
        containerStyle: {position: "relative"},
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: {opacity: 0, transform: "scale(0.001)"},
        visibleStyle: {opacity: 1, transform: "scale(1)"}
    };
    var c = s.prototype;
    return a.extend(c, t.prototype), c.option = function (e) {
        a.extend(this.options, e)
    }, c._getOption = function (e) {
        var t = this.constructor.compatOptions[e];
        return t && void 0 !== this.options[t] ? this.options[t] : this.options[e]
    }, s.compatOptions = {
        initLayout: "isInitLayout",
        horizontal: "isHorizontal",
        layoutInstant: "isLayoutInstant",
        originLeft: "isOriginLeft",
        originTop: "isOriginTop",
        resize: "isResizeBound",
        resizeContainer: "isResizingContainer"
    }, c._create = function () {
        this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), a.extend(this.element.style, this.options.containerStyle);
        var e = this._getOption("resize");
        e && this.bindResize()
    }, c.reloadItems = function () {
        this.items = this._itemize(this.element.children)
    }, c._itemize = function (e) {
        for (var t = this._filterFindItemElements(e), i = this.constructor.Item, a = [], n = 0; n < t.length; n++) {
            var s = t[n], r = new i(s, this);
            a.push(r)
        }
        return a
    }, c._filterFindItemElements = function (e) {
        return a.filterFindElements(e, this.options.itemSelector)
    }, c.getItemElements = function () {
        return this.items.map(function (e) {
            return e.element
        })
    }, c.layout = function () {
        this._resetLayout(), this._manageStamps();
        var e = this._getOption("layoutInstant"), t = void 0 !== e ? e : !this._isLayoutInited;
        this.layoutItems(this.items, t), this._isLayoutInited = !0
    }, c._init = c.layout, c._resetLayout = function () {
        this.getSize()
    }, c.getSize = function () {
        this.size = i(this.element)
    }, c._getMeasurement = function (e, t) {
        var a, n = this.options[e];
        n ? ("string" == typeof n ? a = this.element.querySelector(n) : n instanceof HTMLElement && (a = n), this[e] = a ? i(a)[t] : n) : this[e] = 0
    }, c.layoutItems = function (e, t) {
        e = this._getItemsForLayout(e), this._layoutItems(e, t), this._postLayout()
    }, c._getItemsForLayout = function (e) {
        return e.filter(function (e) {
            return !e.isIgnored
        })
    }, c._layoutItems = function (e, t) {
        if (this._emitCompleteOnItems("layout", e), e && e.length) {
            var i = [];
            e.forEach(function (e) {
                var a = this._getItemLayoutPosition(e);
                a.item = e, a.isInstant = t || e.isLayoutInstant, i.push(a)
            }, this), this._processLayoutQueue(i)
        }
    }, c._getItemLayoutPosition = function () {
        return {x: 0, y: 0}
    }, c._processLayoutQueue = function (e) {
        e.forEach(function (e) {
            this._positionItem(e.item, e.x, e.y, e.isInstant)
        }, this)
    }, c._positionItem = function (e, t, i, a) {
        a ? e.goTo(t, i) : e.moveTo(t, i)
    }, c._postLayout = function () {
        this.resizeContainer()
    }, c.resizeContainer = function () {
        var e = this._getOption("resizeContainer");
        if (e) {
            var t = this._getContainerSize();
            t && (this._setContainerMeasure(t.width, !0), this._setContainerMeasure(t.height, !1))
        }
    }, c._getContainerSize = d, c._setContainerMeasure = function (e, t) {
        if (void 0 !== e) {
            var i = this.size;
            i.isBorderBox && (e += t ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), e = Math.max(e, 0), this.element.style[t ? "width" : "height"] = e + "px"
        }
    }, c._emitCompleteOnItems = function (e, t) {
        function i() {
            n.dispatchEvent(e + "Complete", null, [t]);
        }

        function a() {
            r++, r == s && i()
        }

        var n = this, s = t.length;
        if (!t || !s)return void i();
        var r = 0;
        t.forEach(function (t) {
            t.once(e, a)
        })
    }, c.dispatchEvent = function (e, t, i) {
        var a = t ? [t].concat(i) : i;
        if (this.emitEvent(e, a), l)if (this.$element = this.$element || l(this.element), t) {
            var n = l.Event(t);
            n.type = e, this.$element.trigger(n, i)
        } else this.$element.trigger(e, i)
    }, c.ignore = function (e) {
        var t = this.getItem(e);
        t && (t.isIgnored = !0)
    }, c.unignore = function (e) {
        var t = this.getItem(e);
        t && delete t.isIgnored
    }, c.stamp = function (e) {
        e = this._find(e), e && (this.stamps = this.stamps.concat(e), e.forEach(this.ignore, this))
    }, c.unstamp = function (e) {
        e = this._find(e), e && e.forEach(function (e) {
            a.removeFrom(this.stamps, e), this.unignore(e)
        }, this)
    }, c._find = function (e) {
        return e ? ("string" == typeof e && (e = this.element.querySelectorAll(e)), e = a.makeArray(e)) : void 0
    }, c._manageStamps = function () {
        this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this))
    }, c._getBoundingRect = function () {
        var e = this.element.getBoundingClientRect(), t = this.size;
        this._boundingRect = {
            left: e.left + t.paddingLeft + t.borderLeftWidth,
            top: e.top + t.paddingTop + t.borderTopWidth,
            right: e.right - (t.paddingRight + t.borderRightWidth),
            bottom: e.bottom - (t.paddingBottom + t.borderBottomWidth)
        }
    }, c._manageStamp = d, c._getElementOffset = function (e) {
        var t = e.getBoundingClientRect(), a = this._boundingRect, n = i(e), s = {
            left: t.left - a.left - n.marginLeft,
            top: t.top - a.top - n.marginTop,
            right: a.right - t.right - n.marginRight,
            bottom: a.bottom - t.bottom - n.marginBottom
        };
        return s
    }, c.handleEvent = a.handleEvent, c.bindResize = function () {
        e.addEventListener("resize", this), this.isResizeBound = !0
    }, c.unbindResize = function () {
        e.removeEventListener("resize", this), this.isResizeBound = !1
    }, c.onresize = function () {
        this.resize()
    }, a.debounceMethod(s, "onresize", 100), c.resize = function () {
        this.isResizeBound && this.needsResizeLayout() && this.layout()
    }, c.needsResizeLayout = function () {
        var e = i(this.element), t = this.size && e;
        return t && e.innerWidth !== this.size.innerWidth
    }, c.addItems = function (e) {
        var t = this._itemize(e);
        return t.length && (this.items = this.items.concat(t)), t
    }, c.appended = function (e) {
        var t = this.addItems(e);
        t.length && (this.layoutItems(t, !0), this.reveal(t))
    }, c.prepended = function (e) {
        var t = this._itemize(e);
        if (t.length) {
            var i = this.items.slice(0);
            this.items = t.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(t, !0), this.reveal(t), this.layoutItems(i)
        }
    }, c.reveal = function (e) {
        this._emitCompleteOnItems("reveal", e), e && e.length && e.forEach(function (e) {
            e.reveal()
        })
    }, c.hide = function (e) {
        this._emitCompleteOnItems("hide", e), e && e.length && e.forEach(function (e) {
            e.hide()
        })
    }, c.revealItemElements = function (e) {
        var t = this.getItems(e);
        this.reveal(t)
    }, c.hideItemElements = function (e) {
        var t = this.getItems(e);
        this.hide(t)
    }, c.getItem = function (e) {
        for (var t = 0; t < this.items.length; t++) {
            var i = this.items[t];
            if (i.element == e)return i
        }
    }, c.getItems = function (e) {
        e = a.makeArray(e);
        var t = [];
        return e.forEach(function (e) {
            var i = this.getItem(e);
            i && t.push(i)
        }, this), t
    }, c.remove = function (e) {
        var t = this.getItems(e);
        this._emitCompleteOnItems("remove", t), t && t.length && t.forEach(function (e) {
            e.remove(), a.removeFrom(this.items, e)
        }, this)
    }, c.destroy = function () {
        var e = this.element.style;
        e.height = "", e.position = "", e.width = "", this.items.forEach(function (e) {
            e.destroy()
        }), this.unbindResize();
        var t = this.element.outlayerGUID;
        delete u[t], delete this.element.outlayerGUID, l && l.removeData(this.element, this.constructor.namespace)
    }, s.data = function (e) {
        e = a.getQueryElement(e);
        var t = e && e.outlayerGUID;
        return t && u[t]
    }, s.create = function (e, t) {
        var i = r(s);
        return i.defaults = a.extend({}, s.defaults), a.extend(i.defaults, t), i.compatOptions = a.extend({}, s.compatOptions), i.namespace = e, i.data = s.data, i.Item = r(n), a.htmlInit(i, e), l && l.bridget && l.bridget(e, i), i
    }, s.Item = n, s
}), function (e, t) {
    "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size"], t) : "object" == typeof module && module.exports ? module.exports = t(require("outlayer"), require("get-size")) : e.Masonry = t(e.Outlayer, e.getSize)
}(window, function (e, t) {
    var i = e.create("masonry");
    return i.compatOptions.fitWidth = "isFitWidth", i.prototype._resetLayout = function () {
        this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = [];
        for (var e = 0; e < this.cols; e++)this.colYs.push(0);
        this.maxY = 0
    }, i.prototype.measureColumns = function () {
        if (this.getContainerWidth(), !this.columnWidth) {
            var e = this.items[0], i = e && e.element;
            this.columnWidth = i && t(i).outerWidth || this.containerWidth
        }
        var a = this.columnWidth += this.gutter, n = this.containerWidth + this.gutter, s = n / a, r = a - n % a,
            o = r && 1 > r ? "round" : "floor";
        s = Math[o](s), this.cols = Math.max(s, 1)
    }, i.prototype.getContainerWidth = function () {
        var e = this._getOption("fitWidth"), i = e ? this.element.parentNode : this.element, a = t(i);
        this.containerWidth = a && a.innerWidth
    }, i.prototype._getItemLayoutPosition = function (e) {
        e.getSize();
        var t = e.size.outerWidth % this.columnWidth, i = t && 1 > t ? "round" : "ceil",
            a = Math[i](e.size.outerWidth / this.columnWidth);
        a = Math.min(a, this.cols);
        for (var n = this._getColGroup(a), s = Math.min.apply(Math, n), r = n.indexOf(s),
                 o = {x: this.columnWidth * r, y: s}, l = s + e.size.outerHeight, d = this.cols + 1 - n.length,
                 p = 0; d > p; p++)this.colYs[r + p] = l;
        return o
    }, i.prototype._getColGroup = function (e) {
        if (2 > e)return this.colYs;
        for (var t = [], i = this.cols + 1 - e, a = 0; i > a; a++) {
            var n = this.colYs.slice(a, a + e);
            t[a] = Math.max.apply(Math, n)
        }
        return t
    }, i.prototype._manageStamp = function (e) {
        var i = t(e), a = this._getElementOffset(e), n = this._getOption("originLeft"), s = n ? a.left : a.right,
            r = s + i.outerWidth, o = Math.floor(s / this.columnWidth);
        o = Math.max(0, o);
        var l = Math.floor(r / this.columnWidth);
        l -= r % this.columnWidth ? 0 : 1, l = Math.min(this.cols - 1, l);
        for (var d = this._getOption("originTop"), p = (d ? a.top : a.bottom) + i.outerHeight,
                 u = o; l >= u; u++)this.colYs[u] = Math.max(p, this.colYs[u])
    }, i.prototype._getContainerSize = function () {
        this.maxY = Math.max.apply(Math, this.colYs);
        var e = {height: this.maxY};
        return this._getOption("fitWidth") && (e.width = this._getContainerFitWidth()), e
    }, i.prototype._getContainerFitWidth = function () {
        for (var e = 0, t = this.cols; --t && 0 === this.colYs[t];)e++;
        return (this.cols - e) * this.columnWidth - this.gutter
    }, i.prototype.needsResizeLayout = function () {
        var e = this.containerWidth;
        return this.getContainerWidth(), e != this.containerWidth
    }, i
}), function () {
    "use strict";
    function e(e) {
        e.fn.swiper = function (t) {
            var a;
            return e(this).each(function () {
                var e = new i(this, t);
                a || (a = e)
            }), a
        }
    }

    var t, i = function (e, n) {
        function s(e) {
            return Math.floor(e)
        }

        function r() {
            b.autoplayTimeoutId = setTimeout(function () {
                b.params.loop ? (b.fixLoop(), b._slideNext(), b.emit("onAutoplay", b)) : b.isEnd ? n.autoplayStopOnLast ? b.stopAutoplay() : (b._slideTo(0), b.emit("onAutoplay", b)) : (b._slideNext(), b.emit("onAutoplay", b))
            }, b.params.autoplay)
        }

        function o(e, i) {
            var a = t(e.target);
            if (!a.is(i))if ("string" == typeof i) a = a.parents(i); else if (i.nodeType) {
                var n;
                return a.parents().each(function (e, t) {
                    t === i && (n = i)
                }), n ? i : void 0
            }
            if (0 !== a.length)return a[0]
        }

        function l(e, t) {
            t = t || {};
            var i = window.MutationObserver || window.WebkitMutationObserver, a = new i(function (e) {
                e.forEach(function (e) {
                    b.onResize(!0), b.emit("onObserverUpdate", b, e)
                })
            });
            a.observe(e, {
                attributes: "undefined" == typeof t.attributes || t.attributes,
                childList: "undefined" == typeof t.childList || t.childList,
                characterData: "undefined" == typeof t.characterData || t.characterData
            }), b.observers.push(a)
        }

        function d(e) {
            e.originalEvent && (e = e.originalEvent);
            var t = e.keyCode || e.charCode;
            if (!b.params.allowSwipeToNext && (b.isHorizontal() && 39 === t || !b.isHorizontal() && 40 === t))return !1;
            if (!b.params.allowSwipeToPrev && (b.isHorizontal() && 37 === t || !b.isHorizontal() && 38 === t))return !1;
            if (!(e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || document.activeElement && document.activeElement.nodeName && ("input" === document.activeElement.nodeName.toLowerCase() || "textarea" === document.activeElement.nodeName.toLowerCase()))) {
                if (37 === t || 39 === t || 38 === t || 40 === t) {
                    var i = !1;
                    if (b.container.parents(".swiper-slide").length > 0 && 0 === b.container.parents(".swiper-slide-active").length)return;
                    var a = {left: window.pageXOffset, top: window.pageYOffset}, n = window.innerWidth,
                        s = window.innerHeight, r = b.container.offset();
                    b.rtl && (r.left = r.left - b.container[0].scrollLeft);
                    for (var o = [[r.left, r.top], [r.left + b.width, r.top], [r.left, r.top + b.height], [r.left + b.width, r.top + b.height]],
                             l = 0; l < o.length; l++) {
                        var d = o[l];
                        d[0] >= a.left && d[0] <= a.left + n && d[1] >= a.top && d[1] <= a.top + s && (i = !0)
                    }
                    if (!i)return
                }
                b.isHorizontal() ? (37 !== t && 39 !== t || (e.preventDefault ? e.preventDefault() : e.returnValue = !1), (39 === t && !b.rtl || 37 === t && b.rtl) && b.slideNext(), (37 === t && !b.rtl || 39 === t && b.rtl) && b.slidePrev()) : (38 !== t && 40 !== t || (e.preventDefault ? e.preventDefault() : e.returnValue = !1), 40 === t && b.slideNext(), 38 === t && b.slidePrev())
            }
        }

        function p(e) {
            e.originalEvent && (e = e.originalEvent);
            var t = b.mousewheel.event, i = 0, a = b.rtl ? -1 : 1;
            if ("mousewheel" === t)if (b.params.mousewheelForceToAxis)if (b.isHorizontal()) {
                if (!(Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY)))return;
                i = e.wheelDeltaX * a
            } else {
                if (!(Math.abs(e.wheelDeltaY) > Math.abs(e.wheelDeltaX)))return;
                i = e.wheelDeltaY
            } else i = Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY) ? -e.wheelDeltaX * a : -e.wheelDeltaY; else if ("DOMMouseScroll" === t) i = -e.detail; else if ("wheel" === t)if (b.params.mousewheelForceToAxis)if (b.isHorizontal()) {
                if (!(Math.abs(e.deltaX) > Math.abs(e.deltaY)))return;
                i = -e.deltaX * a
            } else {
                if (!(Math.abs(e.deltaY) > Math.abs(e.deltaX)))return;
                i = -e.deltaY
            } else i = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? -e.deltaX * a : -e.deltaY;
            if (0 !== i) {
                if (b.params.mousewheelInvert && (i = -i), b.params.freeMode) {
                    var n = b.getWrapperTranslate() + i * b.params.mousewheelSensitivity, s = b.isBeginning,
                        r = b.isEnd;
                    if (n >= b.minTranslate() && (n = b.minTranslate()), n <= b.maxTranslate() && (n = b.maxTranslate()), b.setWrapperTransition(0), b.setWrapperTranslate(n), b.updateProgress(), b.updateActiveIndex(), (!s && b.isBeginning || !r && b.isEnd) && b.updateClasses(), b.params.freeModeSticky ? (clearTimeout(b.mousewheel.timeout), b.mousewheel.timeout = setTimeout(function () {
                                b.slideReset()
                            }, 300)) : b.params.lazyLoading && b.lazy && b.lazy.load(), 0 === n || n === b.maxTranslate())return
                } else {
                    if ((new window.Date).getTime() - b.mousewheel.lastScrollTime > 60)if (i < 0)if (b.isEnd && !b.params.loop || b.animating) {
                        if (b.params.mousewheelReleaseOnEdges)return !0
                    } else b.slideNext(); else if (b.isBeginning && !b.params.loop || b.animating) {
                        if (b.params.mousewheelReleaseOnEdges)return !0
                    } else b.slidePrev();
                    b.mousewheel.lastScrollTime = (new window.Date).getTime()
                }
                return b.params.autoplay && b.stopAutoplay(), e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1
            }
        }

        function u(e, i) {
            e = t(e);
            var a, n, s, r = b.rtl ? -1 : 1;
            a = e.attr("data-swiper-parallax") || "0", n = e.attr("data-swiper-parallax-x"), s = e.attr("data-swiper-parallax-y"), n || s ? (n = n || "0", s = s || "0") : b.isHorizontal() ? (n = a, s = "0") : (s = a, n = "0"), n = n.indexOf("%") >= 0 ? parseInt(n, 10) * i * r + "%" : n * i * r + "px", s = s.indexOf("%") >= 0 ? parseInt(s, 10) * i + "%" : s * i + "px", e.transform("translate3d(" + n + ", " + s + ",0px)")
        }

        function c(e) {
            return 0 !== e.indexOf("on") && (e = e[0] !== e[0].toUpperCase() ? "on" + e[0].toUpperCase() + e.substring(1) : "on" + e), e
        }

        if (!(this instanceof i))return new i(e, n);
        var m = {
            direction: "horizontal",
            touchEventsTarget: "container",
            initialSlide: 0,
            speed: 300,
            autoplay: !1,
            autoplayDisableOnInteraction: !0,
            autoplayStopOnLast: !1,
            iOSEdgeSwipeDetection: !1,
            iOSEdgeSwipeThreshold: 20,
            freeMode: !1,
            freeModeMomentum: !0,
            freeModeMomentumRatio: 1,
            freeModeMomentumBounce: !0,
            freeModeMomentumBounceRatio: 1,
            freeModeSticky: !1,
            freeModeMinimumVelocity: .02,
            autoHeight: !1,
            setWrapperSize: !1,
            virtualTranslate: !1,
            effect: "slide",
            coverflow: {rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: !0},
            flip: {slideShadows: !0, limitRotation: !0},
            cube: {slideShadows: !0, shadow: !0, shadowOffset: 20, shadowScale: .94},
            fade: {crossFade: !1},
            parallax: !1,
            scrollbar: null,
            scrollbarHide: !0,
            scrollbarDraggable: !1,
            scrollbarSnapOnRelease: !1,
            keyboardControl: !1,
            mousewheelControl: !1,
            mousewheelReleaseOnEdges: !1,
            mousewheelInvert: !1,
            mousewheelForceToAxis: !1,
            mousewheelSensitivity: 1,
            hashnav: !1,
            breakpoints: void 0,
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerColumnFill: "column",
            slidesPerGroup: 1,
            centeredSlides: !1,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            roundLengths: !1,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: !0,
            shortSwipes: !0,
            longSwipes: !0,
            longSwipesRatio: .5,
            longSwipesMs: 300,
            followFinger: !0,
            onlyExternal: !1,
            threshold: 0,
            touchMoveStopPropagation: !0,
            uniqueNavElements: !0,
            pagination: null,
            paginationElement: "span",
            paginationClickable: !1,
            paginationHide: !1,
            paginationBulletRender: null,
            paginationProgressRender: null,
            paginationFractionRender: null,
            paginationCustomRender: null,
            paginationType: "bullets",
            resistance: !0,
            resistanceRatio: .85,
            nextButton: null,
            prevButton: null,
            watchSlidesProgress: !1,
            watchSlidesVisibility: !1,
            grabCursor: !1,
            preventClicks: !0,
            preventClicksPropagation: !0,
            slideToClickedSlide: !1,
            lazyLoading: !1,
            lazyLoadingInPrevNext: !1,
            lazyLoadingInPrevNextAmount: 1,
            lazyLoadingOnTransitionStart: !1,
            preloadImages: !0,
            updateOnImagesReady: !0,
            loop: !1,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            control: void 0,
            controlInverse: !1,
            controlBy: "slide",
            allowSwipeToPrev: !0,
            allowSwipeToNext: !0,
            swipeHandler: null,
            noSwiping: !0,
            noSwipingClass: "swiper-no-swiping",
            slideClass: "swiper-slide",
            slideActiveClass: "swiper-slide-active",
            slideVisibleClass: "swiper-slide-visible",
            slideDuplicateClass: "swiper-slide-duplicate",
            slideNextClass: "swiper-slide-next",
            slidePrevClass: "swiper-slide-prev",
            wrapperClass: "swiper-wrapper",
            bulletClass: "swiper-pagination-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active",
            buttonDisabledClass: "swiper-button-disabled",
            paginationCurrentClass: "swiper-pagination-current",
            paginationTotalClass: "swiper-pagination-total",
            paginationHiddenClass: "swiper-pagination-hidden",
            paginationProgressbarClass: "swiper-pagination-progressbar",
            observer: !1,
            observeParents: !1,
            a11y: !1,
            prevSlideMessage: "Previous slide",
            nextSlideMessage: "Next slide",
            firstSlideMessage: "This is the first slide",
            lastSlideMessage: "This is the last slide",
            paginationBulletMessage: "Go to slide {{index}}",
            runCallbacksOnInit: !0
        }, h = n && n.virtualTranslate;
        n = n || {};
        var f = {};
        for (var g in n)if ("object" != typeof n[g] || null === n[g] || (n[g].nodeType || n[g] === window || n[g] === document || "undefined" != typeof a && n[g] instanceof a || "undefined" != typeof jQuery && n[g] instanceof jQuery)) f[g] = n[g]; else {
            f[g] = {};
            for (var v in n[g])f[g][v] = n[g][v]
        }
        for (var y in m)if ("undefined" == typeof n[y]) n[y] = m[y]; else if ("object" == typeof n[y])for (var w in m[y])"undefined" == typeof n[y][w] && (n[y][w] = m[y][w]);
        var b = this;
        if (b.params = n, b.originalParams = f, b.classNames = [], "undefined" != typeof t && "undefined" != typeof a && (t = a), ("undefined" != typeof t || (t = "undefined" == typeof a ? window.Dom7 || window.Zepto || window.jQuery : a)) && (b.$ = t, b.currentBreakpoint = void 0, b.getActiveBreakpoint = function () {
                if (!b.params.breakpoints)return !1;
                var e, t = !1, i = [];
                for (e in b.params.breakpoints)b.params.breakpoints.hasOwnProperty(e) && i.push(e);
                i.sort(function (e, t) {
                    return parseInt(e, 10) > parseInt(t, 10)
                });
                for (var a = 0; a < i.length; a++)e = i[a], e >= window.innerWidth && !t && (t = e);
                return t || "max"
            }, b.setBreakpoint = function () {
                var e = b.getActiveBreakpoint();
                if (e && b.currentBreakpoint !== e) {
                    var t = e in b.params.breakpoints ? b.params.breakpoints[e] : b.originalParams,
                        i = b.params.loop && t.slidesPerView !== b.params.slidesPerView;
                    for (var a in t)b.params[a] = t[a];
                    b.currentBreakpoint = e, i && b.destroyLoop && b.reLoop(!0)
                }
            }, b.params.breakpoints && b.setBreakpoint(), b.container = t(e), 0 !== b.container.length)) {
            if (b.container.length > 1) {
                var x = [];
                return b.container.each(function () {
                    x.push(new i(this, n))
                }), x
            }
            b.container[0].swiper = b, b.container.data("swiper", b), b.classNames.push("swiper-container-" + b.params.direction), b.params.freeMode && b.classNames.push("swiper-container-free-mode"), b.support.flexbox || (b.classNames.push("swiper-container-no-flexbox"), b.params.slidesPerColumn = 1), b.params.autoHeight && b.classNames.push("swiper-container-autoheight"), (b.params.parallax || b.params.watchSlidesVisibility) && (b.params.watchSlidesProgress = !0), ["cube", "coverflow", "flip"].indexOf(b.params.effect) >= 0 && (b.support.transforms3d ? (b.params.watchSlidesProgress = !0, b.classNames.push("swiper-container-3d")) : b.params.effect = "slide"), "slide" !== b.params.effect && b.classNames.push("swiper-container-" + b.params.effect), "cube" === b.params.effect && (b.params.resistanceRatio = 0, b.params.slidesPerView = 1, b.params.slidesPerColumn = 1, b.params.slidesPerGroup = 1, b.params.centeredSlides = !1, b.params.spaceBetween = 0, b.params.virtualTranslate = !0, b.params.setWrapperSize = !1), "fade" !== b.params.effect && "flip" !== b.params.effect || (b.params.slidesPerView = 1, b.params.slidesPerColumn = 1, b.params.slidesPerGroup = 1, b.params.watchSlidesProgress = !0, b.params.spaceBetween = 0, b.params.setWrapperSize = !1, "undefined" == typeof h && (b.params.virtualTranslate = !0)), b.params.grabCursor && b.support.touch && (b.params.grabCursor = !1), b.wrapper = b.container.children("." + b.params.wrapperClass), b.params.pagination && (b.paginationContainer = t(b.params.pagination), b.params.uniqueNavElements && "string" == typeof b.params.pagination && b.paginationContainer.length > 1 && 1 === b.container.find(b.params.pagination).length && (b.paginationContainer = b.container.find(b.params.pagination)), "bullets" === b.params.paginationType && b.params.paginationClickable ? b.paginationContainer.addClass("swiper-pagination-clickable") : b.params.paginationClickable = !1, b.paginationContainer.addClass("swiper-pagination-" + b.params.paginationType)), (b.params.nextButton || b.params.prevButton) && (b.params.nextButton && (b.nextButton = t(b.params.nextButton), b.params.uniqueNavElements && "string" == typeof b.params.nextButton && b.nextButton.length > 1 && 1 === b.container.find(b.params.nextButton).length && (b.nextButton = b.container.find(b.params.nextButton))), b.params.prevButton && (b.prevButton = t(b.params.prevButton), b.params.uniqueNavElements && "string" == typeof b.params.prevButton && b.prevButton.length > 1 && 1 === b.container.find(b.params.prevButton).length && (b.prevButton = b.container.find(b.params.prevButton)))), b.isHorizontal = function () {
                return "horizontal" === b.params.direction
            }, b.rtl = b.isHorizontal() && ("rtl" === b.container[0].dir.toLowerCase() || "rtl" === b.container.css("direction")), b.rtl && b.classNames.push("swiper-container-rtl"), b.rtl && (b.wrongRTL = "-webkit-box" === b.wrapper.css("display")), b.params.slidesPerColumn > 1 && b.classNames.push("swiper-container-multirow"), b.device.android && b.classNames.push("swiper-container-android"), b.container.addClass(b.classNames.join(" ")), b.translate = 0, b.progress = 0, b.velocity = 0, b.lockSwipeToNext = function () {
                b.params.allowSwipeToNext = !1
            }, b.lockSwipeToPrev = function () {
                b.params.allowSwipeToPrev = !1
            }, b.lockSwipes = function () {
                b.params.allowSwipeToNext = b.params.allowSwipeToPrev = !1
            }, b.unlockSwipeToNext = function () {
                b.params.allowSwipeToNext = !0
            }, b.unlockSwipeToPrev = function () {
                b.params.allowSwipeToPrev = !0
            }, b.unlockSwipes = function () {
                b.params.allowSwipeToNext = b.params.allowSwipeToPrev = !0
            }, b.params.grabCursor && (b.container[0].style.cursor = "move", b.container[0].style.cursor = "-webkit-grab", b.container[0].style.cursor = "-moz-grab", b.container[0].style.cursor = "grab"), b.imagesToLoad = [], b.imagesLoaded = 0, b.loadImage = function (e, t, i, a, n) {
                function s() {
                    n && n()
                }

                var r;
                e.complete && a ? s() : t ? (r = new window.Image, r.onload = s, r.onerror = s, i && (r.srcset = i), t && (r.src = t)) : s()
            }, b.preloadImages = function () {
                function e() {
                    "undefined" != typeof b && null !== b && (void 0 !== b.imagesLoaded && b.imagesLoaded++, b.imagesLoaded === b.imagesToLoad.length && (b.params.updateOnImagesReady && b.update(), b.emit("onImagesReady", b)))
                }

                b.imagesToLoad = b.container.find("img");
                for (var t = 0; t < b.imagesToLoad.length; t++)b.loadImage(b.imagesToLoad[t], b.imagesToLoad[t].currentSrc || b.imagesToLoad[t].getAttribute("src"), b.imagesToLoad[t].srcset || b.imagesToLoad[t].getAttribute("srcset"), !0, e)
            }, b.autoplayTimeoutId = void 0, b.autoplaying = !1, b.autoplayPaused = !1, b.startAutoplay = function () {
                return "undefined" == typeof b.autoplayTimeoutId && (!!b.params.autoplay && (!b.autoplaying && (b.autoplaying = !0, b.emit("onAutoplayStart", b), void r())))
            }, b.stopAutoplay = function (e) {
                b.autoplayTimeoutId && (b.autoplayTimeoutId && clearTimeout(b.autoplayTimeoutId), b.autoplaying = !1, b.autoplayTimeoutId = void 0, b.emit("onAutoplayStop", b))
            }, b.pauseAutoplay = function (e) {
                b.autoplayPaused || (b.autoplayTimeoutId && clearTimeout(b.autoplayTimeoutId), b.autoplayPaused = !0, 0 === e ? (b.autoplayPaused = !1, r()) : b.wrapper.transitionEnd(function () {
                        b && (b.autoplayPaused = !1, b.autoplaying ? r() : b.stopAutoplay())
                    }))
            }, b.minTranslate = function () {
                return -b.snapGrid[0]
            }, b.maxTranslate = function () {
                return -b.snapGrid[b.snapGrid.length - 1]
            }, b.updateAutoHeight = function () {
                var e = b.slides.eq(b.activeIndex)[0];
                if ("undefined" != typeof e) {
                    var t = e.offsetHeight;
                    t && b.wrapper.css("height", t + "px")
                }
            }, b.updateContainerSize = function () {
                var e, t;
                e = "undefined" != typeof b.params.width ? b.params.width : b.container[0].clientWidth, t = "undefined" != typeof b.params.height ? b.params.height : b.container[0].clientHeight, 0 === e && b.isHorizontal() || 0 === t && !b.isHorizontal() || (e = e - parseInt(b.container.css("padding-left"), 10) - parseInt(b.container.css("padding-right"), 10), t = t - parseInt(b.container.css("padding-top"), 10) - parseInt(b.container.css("padding-bottom"), 10), b.width = e, b.height = t, b.size = b.isHorizontal() ? b.width : b.height)
            }, b.updateSlidesSize = function () {
                b.slides = b.wrapper.children("." + b.params.slideClass), b.snapGrid = [], b.slidesGrid = [], b.slidesSizesGrid = [];
                var e, t = b.params.spaceBetween, i = -b.params.slidesOffsetBefore, a = 0, n = 0;
                if ("undefined" != typeof b.size) {
                    "string" == typeof t && t.indexOf("%") >= 0 && (t = parseFloat(t.replace("%", "")) / 100 * b.size), b.virtualSize = -t, b.rtl ? b.slides.css({
                            marginLeft: "",
                            marginTop: ""
                        }) : b.slides.css({marginRight: "", marginBottom: ""});
                    var r;
                    b.params.slidesPerColumn > 1 && (r = Math.floor(b.slides.length / b.params.slidesPerColumn) === b.slides.length / b.params.slidesPerColumn ? b.slides.length : Math.ceil(b.slides.length / b.params.slidesPerColumn) * b.params.slidesPerColumn, "auto" !== b.params.slidesPerView && "row" === b.params.slidesPerColumnFill && (r = Math.max(r, b.params.slidesPerView * b.params.slidesPerColumn)));
                    var o, l = b.params.slidesPerColumn, d = r / l,
                        p = d - (b.params.slidesPerColumn * d - b.slides.length);
                    for (e = 0; e < b.slides.length; e++) {
                        o = 0;
                        var u = b.slides.eq(e);
                        if (b.params.slidesPerColumn > 1) {
                            var c, m, h;
                            "column" === b.params.slidesPerColumnFill ? (m = Math.floor(e / l), h = e - m * l, (m > p || m === p && h === l - 1) && ++h >= l && (h = 0, m++), c = m + h * r / l, u.css({
                                    "-webkit-box-ordinal-group": c,
                                    "-moz-box-ordinal-group": c,
                                    "-ms-flex-order": c,
                                    "-webkit-order": c,
                                    order: c
                                })) : (h = Math.floor(e / d), m = e - h * d), u.css({"margin-top": 0 !== h && b.params.spaceBetween && b.params.spaceBetween + "px"}).attr("data-swiper-column", m).attr("data-swiper-row", h)
                        }
                        "none" !== u.css("display") && ("auto" === b.params.slidesPerView ? (o = b.isHorizontal() ? u.outerWidth(!0) : u.outerHeight(!0), b.params.roundLengths && (o = s(o))) : (o = (b.size - (b.params.slidesPerView - 1) * t) / b.params.slidesPerView, b.params.roundLengths && (o = s(o)), b.isHorizontal() ? b.slides[e].style.width = o + "px" : b.slides[e].style.height = o + "px"), b.slides[e].swiperSlideSize = o, b.slidesSizesGrid.push(o), b.params.centeredSlides ? (i = i + o / 2 + a / 2 + t, 0 === e && (i = i - b.size / 2 - t), Math.abs(i) < .001 && (i = 0), n % b.params.slidesPerGroup === 0 && b.snapGrid.push(i), b.slidesGrid.push(i)) : (n % b.params.slidesPerGroup === 0 && b.snapGrid.push(i), b.slidesGrid.push(i), i = i + o + t), b.virtualSize += o + t, a = o, n++)
                    }
                    b.virtualSize = Math.max(b.virtualSize, b.size) + b.params.slidesOffsetAfter;
                    var f;
                    if (b.rtl && b.wrongRTL && ("slide" === b.params.effect || "coverflow" === b.params.effect) && b.wrapper.css({width: b.virtualSize + b.params.spaceBetween + "px"}), b.support.flexbox && !b.params.setWrapperSize || (b.isHorizontal() ? b.wrapper.css({width: b.virtualSize + b.params.spaceBetween + "px"}) : b.wrapper.css({height: b.virtualSize + b.params.spaceBetween + "px"})), b.params.slidesPerColumn > 1 && (b.virtualSize = (o + b.params.spaceBetween) * r, b.virtualSize = Math.ceil(b.virtualSize / b.params.slidesPerColumn) - b.params.spaceBetween, b.wrapper.css({width: b.virtualSize + b.params.spaceBetween + "px"}), b.params.centeredSlides)) {
                        for (f = [], e = 0; e < b.snapGrid.length; e++)b.snapGrid[e] < b.virtualSize + b.snapGrid[0] && f.push(b.snapGrid[e]);
                        b.snapGrid = f
                    }
                    if (!b.params.centeredSlides) {
                        for (f = [], e = 0; e < b.snapGrid.length; e++)b.snapGrid[e] <= b.virtualSize - b.size && f.push(b.snapGrid[e]);
                        b.snapGrid = f, Math.floor(b.virtualSize - b.size) - Math.floor(b.snapGrid[b.snapGrid.length - 1]) > 1 && b.snapGrid.push(b.virtualSize - b.size)
                    }
                    0 === b.snapGrid.length && (b.snapGrid = [0]), 0 !== b.params.spaceBetween && (b.isHorizontal() ? b.rtl ? b.slides.css({marginLeft: t + "px"}) : b.slides.css({marginRight: t + "px"}) : b.slides.css({marginBottom: t + "px"})), b.params.watchSlidesProgress && b.updateSlidesOffset()
                }
            }, b.updateSlidesOffset = function () {
                for (var e = 0; e < b.slides.length; e++)b.slides[e].swiperSlideOffset = b.isHorizontal() ? b.slides[e].offsetLeft : b.slides[e].offsetTop
            }, b.updateSlidesProgress = function (e) {
                if ("undefined" == typeof e && (e = b.translate || 0), 0 !== b.slides.length) {
                    "undefined" == typeof b.slides[0].swiperSlideOffset && b.updateSlidesOffset();
                    var t = -e;
                    b.rtl && (t = e), b.slides.removeClass(b.params.slideVisibleClass);
                    for (var i = 0; i < b.slides.length; i++) {
                        var a = b.slides[i],
                            n = (t - a.swiperSlideOffset) / (a.swiperSlideSize + b.params.spaceBetween);
                        if (b.params.watchSlidesVisibility) {
                            var s = -(t - a.swiperSlideOffset), r = s + b.slidesSizesGrid[i],
                                o = s >= 0 && s < b.size || r > 0 && r <= b.size || s <= 0 && r >= b.size;
                            o && b.slides.eq(i).addClass(b.params.slideVisibleClass)
                        }
                        a.progress = b.rtl ? -n : n
                    }
                }
            }, b.updateProgress = function (e) {
                "undefined" == typeof e && (e = b.translate || 0);
                var t = b.maxTranslate() - b.minTranslate(), i = b.isBeginning, a = b.isEnd;
                0 === t ? (b.progress = 0, b.isBeginning = b.isEnd = !0) : (b.progress = (e - b.minTranslate()) / t, b.isBeginning = b.progress <= 0, b.isEnd = b.progress >= 1), b.isBeginning && !i && b.emit("onReachBeginning", b), b.isEnd && !a && b.emit("onReachEnd", b), b.params.watchSlidesProgress && b.updateSlidesProgress(e), b.emit("onProgress", b, b.progress)
            }, b.updateActiveIndex = function () {
                var e, t, i, a = b.rtl ? b.translate : -b.translate;
                for (t = 0; t < b.slidesGrid.length; t++)"undefined" != typeof b.slidesGrid[t + 1] ? a >= b.slidesGrid[t] && a < b.slidesGrid[t + 1] - (b.slidesGrid[t + 1] - b.slidesGrid[t]) / 2 ? e = t : a >= b.slidesGrid[t] && a < b.slidesGrid[t + 1] && (e = t + 1) : a >= b.slidesGrid[t] && (e = t);
                (e < 0 || "undefined" == typeof e) && (e = 0), i = Math.floor(e / b.params.slidesPerGroup), i >= b.snapGrid.length && (i = b.snapGrid.length - 1), e !== b.activeIndex && (b.snapIndex = i, b.previousIndex = b.activeIndex, b.activeIndex = e, b.updateClasses())
            }, b.updateClasses = function () {
                b.slides.removeClass(b.params.slideActiveClass + " " + b.params.slideNextClass + " " + b.params.slidePrevClass);
                var e = b.slides.eq(b.activeIndex);
                e.addClass(b.params.slideActiveClass);
                var i = e.next("." + b.params.slideClass).addClass(b.params.slideNextClass);
                b.params.loop && 0 === i.length && b.slides.eq(0).addClass(b.params.slideNextClass);
                var a = e.prev("." + b.params.slideClass).addClass(b.params.slidePrevClass);
                if (b.params.loop && 0 === a.length && b.slides.eq(-1).addClass(b.params.slidePrevClass), b.paginationContainer && b.paginationContainer.length > 0) {
                    var n,
                        s = b.params.loop ? Math.ceil((b.slides.length - 2 * b.loopedSlides) / b.params.slidesPerGroup) : b.snapGrid.length;
                    if (b.params.loop ? (n = Math.ceil((b.activeIndex - b.loopedSlides) / b.params.slidesPerGroup), n > b.slides.length - 1 - 2 * b.loopedSlides && (n -= b.slides.length - 2 * b.loopedSlides), n > s - 1 && (n -= s), n < 0 && "bullets" !== b.params.paginationType && (n = s + n)) : n = "undefined" != typeof b.snapIndex ? b.snapIndex : b.activeIndex || 0, "bullets" === b.params.paginationType && b.bullets && b.bullets.length > 0 && (b.bullets.removeClass(b.params.bulletActiveClass), b.paginationContainer.length > 1 ? b.bullets.each(function () {
                                t(this).index() === n && t(this).addClass(b.params.bulletActiveClass)
                            }) : b.bullets.eq(n).addClass(b.params.bulletActiveClass)), "fraction" === b.params.paginationType && (b.paginationContainer.find("." + b.params.paginationCurrentClass).text(n + 1), b.paginationContainer.find("." + b.params.paginationTotalClass).text(s)), "progress" === b.params.paginationType) {
                        var r = (n + 1) / s, o = r, l = 1;
                        b.isHorizontal() || (l = r, o = 1), b.paginationContainer.find("." + b.params.paginationProgressbarClass).transform("translate3d(0,0,0) scaleX(" + o + ") scaleY(" + l + ")").transition(b.params.speed)
                    }
                    "custom" === b.params.paginationType && b.params.paginationCustomRender && (b.paginationContainer.html(b.params.paginationCustomRender(b, n + 1, s)), b.emit("onPaginationRendered", b, b.paginationContainer[0]))
                }
                b.params.loop || (b.params.prevButton && b.prevButton && b.prevButton.length > 0 && (b.isBeginning ? (b.prevButton.addClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.disable(b.prevButton)) : (b.prevButton.removeClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.enable(b.prevButton))), b.params.nextButton && b.nextButton && b.nextButton.length > 0 && (b.isEnd ? (b.nextButton.addClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.disable(b.nextButton)) : (b.nextButton.removeClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.enable(b.nextButton))))
            }, b.updatePagination = function () {
                if (b.params.pagination && b.paginationContainer && b.paginationContainer.length > 0) {
                    var e = "";
                    if ("bullets" === b.params.paginationType) {
                        for (var t = b.params.loop ? Math.ceil((b.slides.length - 2 * b.loopedSlides) / b.params.slidesPerGroup) : b.snapGrid.length,
                                 i = 0; i < t; i++)e += b.params.paginationBulletRender ? b.params.paginationBulletRender(i, b.params.bulletClass) : "<" + b.params.paginationElement + ' class="' + b.params.bulletClass + '"></' + b.params.paginationElement + ">";
                        b.paginationContainer.html(e), b.bullets = b.paginationContainer.find("." + b.params.bulletClass), b.params.paginationClickable && b.params.a11y && b.a11y && b.a11y.initPagination()
                    }
                    "fraction" === b.params.paginationType && (e = b.params.paginationFractionRender ? b.params.paginationFractionRender(b, b.params.paginationCurrentClass, b.params.paginationTotalClass) : '<span class="' + b.params.paginationCurrentClass + '"></span> / <span class="' + b.params.paginationTotalClass + '"></span>', b.paginationContainer.html(e)), "progress" === b.params.paginationType && (e = b.params.paginationProgressRender ? b.params.paginationProgressRender(b, b.params.paginationProgressbarClass) : '<span class="' + b.params.paginationProgressbarClass + '"></span>', b.paginationContainer.html(e)), "custom" !== b.params.paginationType && b.emit("onPaginationRendered", b, b.paginationContainer[0])
                }
            }, b.update = function (e) {
                function t() {
                    a = Math.min(Math.max(b.translate, b.maxTranslate()), b.minTranslate()), b.setWrapperTranslate(a), b.updateActiveIndex(), b.updateClasses()
                }

                if (b.updateContainerSize(), b.updateSlidesSize(), b.updateProgress(), b.updatePagination(), b.updateClasses(), b.params.scrollbar && b.scrollbar && b.scrollbar.set(), e) {
                    var i, a;
                    b.controller && b.controller.spline && (b.controller.spline = void 0), b.params.freeMode ? (t(), b.params.autoHeight && b.updateAutoHeight()) : (i = ("auto" === b.params.slidesPerView || b.params.slidesPerView > 1) && b.isEnd && !b.params.centeredSlides ? b.slideTo(b.slides.length - 1, 0, !1, !0) : b.slideTo(b.activeIndex, 0, !1, !0), i || t())
                } else b.params.autoHeight && b.updateAutoHeight()
            }, b.onResize = function (e) {
                b.params.breakpoints && b.setBreakpoint();
                var t = b.params.allowSwipeToPrev, i = b.params.allowSwipeToNext;
                b.params.allowSwipeToPrev = b.params.allowSwipeToNext = !0, b.updateContainerSize(), b.updateSlidesSize(), ("auto" === b.params.slidesPerView || b.params.freeMode || e) && b.updatePagination(), b.params.scrollbar && b.scrollbar && b.scrollbar.set(), b.controller && b.controller.spline && (b.controller.spline = void 0);
                var a = !1;
                if (b.params.freeMode) {
                    var n = Math.min(Math.max(b.translate, b.maxTranslate()), b.minTranslate());
                    b.setWrapperTranslate(n), b.updateActiveIndex(), b.updateClasses(), b.params.autoHeight && b.updateAutoHeight()
                } else b.updateClasses(), a = ("auto" === b.params.slidesPerView || b.params.slidesPerView > 1) && b.isEnd && !b.params.centeredSlides ? b.slideTo(b.slides.length - 1, 0, !1, !0) : b.slideTo(b.activeIndex, 0, !1, !0);
                b.params.lazyLoading && !a && b.lazy && b.lazy.load(), b.params.allowSwipeToPrev = t, b.params.allowSwipeToNext = i
            };
            var T = ["mousedown", "mousemove", "mouseup"];
            window.navigator.pointerEnabled ? T = ["pointerdown", "pointermove", "pointerup"] : window.navigator.msPointerEnabled && (T = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]), b.touchEvents = {
                start: b.support.touch || !b.params.simulateTouch ? "touchstart" : T[0],
                move: b.support.touch || !b.params.simulateTouch ? "touchmove" : T[1],
                end: b.support.touch || !b.params.simulateTouch ? "touchend" : T[2]
            }, (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && ("container" === b.params.touchEventsTarget ? b.container : b.wrapper).addClass("swiper-wp8-" + b.params.direction), b.initEvents = function (e) {
                var t = e ? "off" : "on", i = e ? "removeEventListener" : "addEventListener",
                    a = "container" === b.params.touchEventsTarget ? b.container[0] : b.wrapper[0],
                    s = b.support.touch ? a : document, r = !!b.params.nested;
                b.browser.ie ? (a[i](b.touchEvents.start, b.onTouchStart, !1),
                        s[i](b.touchEvents.move, b.onTouchMove, r), s[i](b.touchEvents.end, b.onTouchEnd, !1)) : (b.support.touch && (a[i](b.touchEvents.start, b.onTouchStart, !1), a[i](b.touchEvents.move, b.onTouchMove, r), a[i](b.touchEvents.end, b.onTouchEnd, !1)), !n.simulateTouch || b.device.ios || b.device.android || (a[i]("mousedown", b.onTouchStart, !1), document[i]("mousemove", b.onTouchMove, r), document[i]("mouseup", b.onTouchEnd, !1))), window[i]("resize", b.onResize), b.params.nextButton && b.nextButton && b.nextButton.length > 0 && (b.nextButton[t]("click", b.onClickNext), b.params.a11y && b.a11y && b.nextButton[t]("keydown", b.a11y.onEnterKey)), b.params.prevButton && b.prevButton && b.prevButton.length > 0 && (b.prevButton[t]("click", b.onClickPrev), b.params.a11y && b.a11y && b.prevButton[t]("keydown", b.a11y.onEnterKey)), b.params.pagination && b.params.paginationClickable && (b.paginationContainer[t]("click", "." + b.params.bulletClass, b.onClickIndex), b.params.a11y && b.a11y && b.paginationContainer[t]("keydown", "." + b.params.bulletClass, b.a11y.onEnterKey)), (b.params.preventClicks || b.params.preventClicksPropagation) && a[i]("click", b.preventClicks, !0)
            }, b.attachEvents = function () {
                b.initEvents()
            }, b.detachEvents = function () {
                b.initEvents(!0)
            }, b.allowClick = !0, b.preventClicks = function (e) {
                b.allowClick || (b.params.preventClicks && e.preventDefault(), b.params.preventClicksPropagation && b.animating && (e.stopPropagation(), e.stopImmediatePropagation()))
            }, b.onClickNext = function (e) {
                e.preventDefault(), b.isEnd && !b.params.loop || b.slideNext()
            }, b.onClickPrev = function (e) {
                e.preventDefault(), b.isBeginning && !b.params.loop || b.slidePrev()
            }, b.onClickIndex = function (e) {
                e.preventDefault();
                var i = t(this).index() * b.params.slidesPerGroup;
                b.params.loop && (i += b.loopedSlides), b.slideTo(i)
            }, b.updateClickedSlide = function (e) {
                var i = o(e, "." + b.params.slideClass), a = !1;
                if (i)for (var n = 0; n < b.slides.length; n++)b.slides[n] === i && (a = !0);
                if (!i || !a)return b.clickedSlide = void 0, void(b.clickedIndex = void 0);
                if (b.clickedSlide = i, b.clickedIndex = t(i).index(), b.params.slideToClickedSlide && void 0 !== b.clickedIndex && b.clickedIndex !== b.activeIndex) {
                    var s, r = b.clickedIndex;
                    if (b.params.loop) {
                        if (b.animating)return;
                        s = t(b.clickedSlide).attr("data-swiper-slide-index"), b.params.centeredSlides ? r < b.loopedSlides - b.params.slidesPerView / 2 || r > b.slides.length - b.loopedSlides + b.params.slidesPerView / 2 ? (b.fixLoop(), r = b.wrapper.children("." + b.params.slideClass + '[data-swiper-slide-index="' + s + '"]:not(.swiper-slide-duplicate)').eq(0).index(), setTimeout(function () {
                                    b.slideTo(r)
                                }, 0)) : b.slideTo(r) : r > b.slides.length - b.params.slidesPerView ? (b.fixLoop(), r = b.wrapper.children("." + b.params.slideClass + '[data-swiper-slide-index="' + s + '"]:not(.swiper-slide-duplicate)').eq(0).index(), setTimeout(function () {
                                    b.slideTo(r)
                                }, 0)) : b.slideTo(r)
                    } else b.slideTo(r)
                }
            };
            var C, S, z, E, I, M, k, P, L, B, D = "input, select, textarea, button", _ = Date.now(), O = [];
            b.animating = !1, b.touches = {startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0};
            var H, A;
            if (b.onTouchStart = function (e) {
                    if (e.originalEvent && (e = e.originalEvent), H = "touchstart" === e.type, H || !("which" in e) || 3 !== e.which) {
                        if (b.params.noSwiping && o(e, "." + b.params.noSwipingClass))return void(b.allowClick = !0);
                        if (!b.params.swipeHandler || o(e, b.params.swipeHandler)) {
                            var i = b.touches.currentX = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX,
                                a = b.touches.currentY = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY;
                            if (!(b.device.ios && b.params.iOSEdgeSwipeDetection && i <= b.params.iOSEdgeSwipeThreshold)) {
                                if (C = !0, S = !1, z = !0, I = void 0, A = void 0, b.touches.startX = i, b.touches.startY = a, E = Date.now(), b.allowClick = !0, b.updateContainerSize(), b.swipeDirection = void 0, b.params.threshold > 0 && (P = !1), "touchstart" !== e.type) {
                                    var n = !0;
                                    t(e.target).is(D) && (n = !1), document.activeElement && t(document.activeElement).is(D) && document.activeElement.blur(), n && e.preventDefault()
                                }
                                b.emit("onTouchStart", b, e)
                            }
                        }
                    }
                }, b.onTouchMove = function (e) {
                    if (e.originalEvent && (e = e.originalEvent), !H || "mousemove" !== e.type) {
                        if (e.preventedByNestedSwiper)return b.touches.startX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, void(b.touches.startY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY);
                        if (b.params.onlyExternal)return b.allowClick = !1, void(C && (b.touches.startX = b.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, b.touches.startY = b.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, E = Date.now()));
                        if (H && document.activeElement && e.target === document.activeElement && t(e.target).is(D))return S = !0, void(b.allowClick = !1);
                        if (z && b.emit("onTouchMove", b, e), !(e.targetTouches && e.targetTouches.length > 1)) {
                            if (b.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, b.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, "undefined" == typeof I) {
                                var i = 180 * Math.atan2(Math.abs(b.touches.currentY - b.touches.startY), Math.abs(b.touches.currentX - b.touches.startX)) / Math.PI;
                                I = b.isHorizontal() ? i > b.params.touchAngle : 90 - i > b.params.touchAngle
                            }
                            if (I && b.emit("onTouchMoveOpposite", b, e), "undefined" == typeof A && b.browser.ieTouch && (b.touches.currentX === b.touches.startX && b.touches.currentY === b.touches.startY || (A = !0)), C) {
                                if (I)return void(C = !1);
                                if (A || !b.browser.ieTouch) {
                                    b.allowClick = !1, b.emit("onSliderMove", b, e), e.preventDefault(), b.params.touchMoveStopPropagation && !b.params.nested && e.stopPropagation(), S || (n.loop && b.fixLoop(), k = b.getWrapperTranslate(), b.setWrapperTransition(0), b.animating && b.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"), b.params.autoplay && b.autoplaying && (b.params.autoplayDisableOnInteraction ? b.stopAutoplay() : b.pauseAutoplay()), B = !1, b.params.grabCursor && (b.container[0].style.cursor = "move", b.container[0].style.cursor = "-webkit-grabbing", b.container[0].style.cursor = "-moz-grabbin", b.container[0].style.cursor = "grabbing")), S = !0;
                                    var a = b.touches.diff = b.isHorizontal() ? b.touches.currentX - b.touches.startX : b.touches.currentY - b.touches.startY;
                                    a *= b.params.touchRatio, b.rtl && (a = -a), b.swipeDirection = a > 0 ? "prev" : "next", M = a + k;
                                    var s = !0;
                                    if (a > 0 && M > b.minTranslate() ? (s = !1, b.params.resistance && (M = b.minTranslate() - 1 + Math.pow(-b.minTranslate() + k + a, b.params.resistanceRatio))) : a < 0 && M < b.maxTranslate() && (s = !1, b.params.resistance && (M = b.maxTranslate() + 1 - Math.pow(b.maxTranslate() - k - a, b.params.resistanceRatio))), s && (e.preventedByNestedSwiper = !0), !b.params.allowSwipeToNext && "next" === b.swipeDirection && M < k && (M = k), !b.params.allowSwipeToPrev && "prev" === b.swipeDirection && M > k && (M = k), b.params.followFinger) {
                                        if (b.params.threshold > 0) {
                                            if (!(Math.abs(a) > b.params.threshold || P))return void(M = k);
                                            if (!P)return P = !0, b.touches.startX = b.touches.currentX, b.touches.startY = b.touches.currentY, M = k, void(b.touches.diff = b.isHorizontal() ? b.touches.currentX - b.touches.startX : b.touches.currentY - b.touches.startY)
                                        }
                                        (b.params.freeMode || b.params.watchSlidesProgress) && b.updateActiveIndex(), b.params.freeMode && (0 === O.length && O.push({
                                            position: b.touches[b.isHorizontal() ? "startX" : "startY"],
                                            time: E
                                        }), O.push({
                                            position: b.touches[b.isHorizontal() ? "currentX" : "currentY"],
                                            time: (new window.Date).getTime()
                                        })), b.updateProgress(M), b.setWrapperTranslate(M)
                                    }
                                }
                            }
                        }
                    }
                }, b.onTouchEnd = function (e) {
                    if (e.originalEvent && (e = e.originalEvent), z && b.emit("onTouchEnd", b, e), z = !1, C) {
                        b.params.grabCursor && S && C && (b.container[0].style.cursor = "move", b.container[0].style.cursor = "-webkit-grab", b.container[0].style.cursor = "-moz-grab", b.container[0].style.cursor = "grab");
                        var i = Date.now(), a = i - E;
                        if (b.allowClick && (b.updateClickedSlide(e), b.emit("onTap", b, e), a < 300 && i - _ > 300 && (L && clearTimeout(L), L = setTimeout(function () {
                                b && (b.params.paginationHide && b.paginationContainer.length > 0 && !t(e.target).hasClass(b.params.bulletClass) && b.paginationContainer.toggleClass(b.params.paginationHiddenClass), b.emit("onClick", b, e))
                            }, 300)), a < 300 && i - _ < 300 && (L && clearTimeout(L), b.emit("onDoubleTap", b, e))), _ = Date.now(), setTimeout(function () {
                                b && (b.allowClick = !0)
                            }, 0), !C || !S || !b.swipeDirection || 0 === b.touches.diff || M === k)return void(C = S = !1);
                        C = S = !1;
                        var n;
                        if (n = b.params.followFinger ? b.rtl ? b.translate : -b.translate : -M, b.params.freeMode) {
                            if (n < -b.minTranslate())return void b.slideTo(b.activeIndex);
                            if (n > -b.maxTranslate())return void(b.slides.length < b.snapGrid.length ? b.slideTo(b.snapGrid.length - 1) : b.slideTo(b.slides.length - 1));
                            if (b.params.freeModeMomentum) {
                                if (O.length > 1) {
                                    var s = O.pop(), r = O.pop(), o = s.position - r.position, l = s.time - r.time;
                                    b.velocity = o / l, b.velocity = b.velocity / 2, Math.abs(b.velocity) < b.params.freeModeMinimumVelocity && (b.velocity = 0), (l > 150 || (new window.Date).getTime() - s.time > 300) && (b.velocity = 0)
                                } else b.velocity = 0;
                                O.length = 0;
                                var d = 1e3 * b.params.freeModeMomentumRatio, p = b.velocity * d, u = b.translate + p;
                                b.rtl && (u = -u);
                                var c, m = !1, h = 20 * Math.abs(b.velocity) * b.params.freeModeMomentumBounceRatio;
                                if (u < b.maxTranslate()) b.params.freeModeMomentumBounce ? (u + b.maxTranslate() < -h && (u = b.maxTranslate() - h), c = b.maxTranslate(), m = !0, B = !0) : u = b.maxTranslate(); else if (u > b.minTranslate()) b.params.freeModeMomentumBounce ? (u - b.minTranslate() > h && (u = b.minTranslate() + h), c = b.minTranslate(), m = !0, B = !0) : u = b.minTranslate(); else if (b.params.freeModeSticky) {
                                    var f, g = 0;
                                    for (g = 0; g < b.snapGrid.length; g += 1)if (b.snapGrid[g] > -u) {
                                        f = g;
                                        break
                                    }
                                    u = Math.abs(b.snapGrid[f] - u) < Math.abs(b.snapGrid[f - 1] - u) || "next" === b.swipeDirection ? b.snapGrid[f] : b.snapGrid[f - 1], b.rtl || (u = -u)
                                }
                                if (0 !== b.velocity) d = b.rtl ? Math.abs((-u - b.translate) / b.velocity) : Math.abs((u - b.translate) / b.velocity); else if (b.params.freeModeSticky)return void b.slideReset();
                                b.params.freeModeMomentumBounce && m ? (b.updateProgress(c), b.setWrapperTransition(d), b.setWrapperTranslate(u), b.onTransitionStart(), b.animating = !0, b.wrapper.transitionEnd(function () {
                                        b && B && (b.emit("onMomentumBounce", b), b.setWrapperTransition(b.params.speed), b.setWrapperTranslate(c), b.wrapper.transitionEnd(function () {
                                            b && b.onTransitionEnd()
                                        }))
                                    })) : b.velocity ? (b.updateProgress(u), b.setWrapperTransition(d), b.setWrapperTranslate(u), b.onTransitionStart(), b.animating || (b.animating = !0, b.wrapper.transitionEnd(function () {
                                            b && b.onTransitionEnd()
                                        }))) : b.updateProgress(u), b.updateActiveIndex()
                            }
                            return void((!b.params.freeModeMomentum || a >= b.params.longSwipesMs) && (b.updateProgress(), b.updateActiveIndex()))
                        }
                        var v, y = 0, w = b.slidesSizesGrid[0];
                        for (v = 0; v < b.slidesGrid.length; v += b.params.slidesPerGroup)"undefined" != typeof b.slidesGrid[v + b.params.slidesPerGroup] ? n >= b.slidesGrid[v] && n < b.slidesGrid[v + b.params.slidesPerGroup] && (y = v, w = b.slidesGrid[v + b.params.slidesPerGroup] - b.slidesGrid[v]) : n >= b.slidesGrid[v] && (y = v, w = b.slidesGrid[b.slidesGrid.length - 1] - b.slidesGrid[b.slidesGrid.length - 2]);
                        var x = (n - b.slidesGrid[y]) / w;
                        if (a > b.params.longSwipesMs) {
                            if (!b.params.longSwipes)return void b.slideTo(b.activeIndex);
                            "next" === b.swipeDirection && (x >= b.params.longSwipesRatio ? b.slideTo(y + b.params.slidesPerGroup) : b.slideTo(y)), "prev" === b.swipeDirection && (x > 1 - b.params.longSwipesRatio ? b.slideTo(y + b.params.slidesPerGroup) : b.slideTo(y))
                        } else {
                            if (!b.params.shortSwipes)return void b.slideTo(b.activeIndex);
                            "next" === b.swipeDirection && b.slideTo(y + b.params.slidesPerGroup), "prev" === b.swipeDirection && b.slideTo(y)
                        }
                    }
                }, b._slideTo = function (e, t) {
                    return b.slideTo(e, t, !0, !0)
                }, b.slideTo = function (e, t, i, a) {
                    "undefined" == typeof i && (i = !0), "undefined" == typeof e && (e = 0), e < 0 && (e = 0), b.snapIndex = Math.floor(e / b.params.slidesPerGroup), b.snapIndex >= b.snapGrid.length && (b.snapIndex = b.snapGrid.length - 1);
                    var n = -b.snapGrid[b.snapIndex];
                    b.params.autoplay && b.autoplaying && (a || !b.params.autoplayDisableOnInteraction ? b.pauseAutoplay(t) : b.stopAutoplay()), b.updateProgress(n);
                    for (var s = 0; s < b.slidesGrid.length; s++)-Math.floor(100 * n) >= Math.floor(100 * b.slidesGrid[s]) && (e = s);
                    return !(!b.params.allowSwipeToNext && n < b.translate && n < b.minTranslate()) && (!(!b.params.allowSwipeToPrev && n > b.translate && n > b.maxTranslate() && (b.activeIndex || 0) !== e) && ("undefined" == typeof t && (t = b.params.speed), b.previousIndex = b.activeIndex || 0, b.activeIndex = e, b.rtl && -n === b.translate || !b.rtl && n === b.translate ? (b.params.autoHeight && b.updateAutoHeight(), b.updateClasses(), "slide" !== b.params.effect && b.setWrapperTranslate(n), !1) : (b.updateClasses(), b.onTransitionStart(i), 0 === t ? (b.setWrapperTranslate(n), b.setWrapperTransition(0), b.onTransitionEnd(i)) : (b.setWrapperTranslate(n), b.setWrapperTransition(t), b.animating || (b.animating = !0, b.wrapper.transitionEnd(function () {
                                    b && b.onTransitionEnd(i)
                                }))), !0)))
                }, b.onTransitionStart = function (e) {
                    "undefined" == typeof e && (e = !0), b.params.autoHeight && b.updateAutoHeight(), b.lazy && b.lazy.onTransitionStart(), e && (b.emit("onTransitionStart", b), b.activeIndex !== b.previousIndex && (b.emit("onSlideChangeStart", b), b.activeIndex > b.previousIndex ? b.emit("onSlideNextStart", b) : b.emit("onSlidePrevStart", b)))
                }, b.onTransitionEnd = function (e) {
                    b.animating = !1, b.setWrapperTransition(0), "undefined" == typeof e && (e = !0), b.lazy && b.lazy.onTransitionEnd(), e && (b.emit("onTransitionEnd", b), b.activeIndex !== b.previousIndex && (b.emit("onSlideChangeEnd", b), b.activeIndex > b.previousIndex ? b.emit("onSlideNextEnd", b) : b.emit("onSlidePrevEnd", b))), b.params.hashnav && b.hashnav && b.hashnav.setHash()
                }, b.slideNext = function (e, t, i) {
                    if (b.params.loop) {
                        if (b.animating)return !1;
                        b.fixLoop();
                        b.container[0].clientLeft;
                        return b.slideTo(b.activeIndex + b.params.slidesPerGroup, t, e, i)
                    }
                    return b.slideTo(b.activeIndex + b.params.slidesPerGroup, t, e, i)
                }, b._slideNext = function (e) {
                    return b.slideNext(!0, e, !0)
                }, b.slidePrev = function (e, t, i) {
                    if (b.params.loop) {
                        if (b.animating)return !1;
                        b.fixLoop();
                        b.container[0].clientLeft;
                        return b.slideTo(b.activeIndex - 1, t, e, i)
                    }
                    return b.slideTo(b.activeIndex - 1, t, e, i)
                }, b._slidePrev = function (e) {
                    return b.slidePrev(!0, e, !0)
                }, b.slideReset = function (e, t, i) {
                    return b.slideTo(b.activeIndex, t, e)
                }, b.setWrapperTransition = function (e, t) {
                    b.wrapper.transition(e), "slide" !== b.params.effect && b.effects[b.params.effect] && b.effects[b.params.effect].setTransition(e), b.params.parallax && b.parallax && b.parallax.setTransition(e), b.params.scrollbar && b.scrollbar && b.scrollbar.setTransition(e), b.params.control && b.controller && b.controller.setTransition(e, t), b.emit("onSetTransition", b, e)
                }, b.setWrapperTranslate = function (e, t, i) {
                    var a = 0, n = 0, r = 0;
                    b.isHorizontal() ? a = b.rtl ? -e : e : n = e, b.params.roundLengths && (a = s(a), n = s(n)), b.params.virtualTranslate || (b.support.transforms3d ? b.wrapper.transform("translate3d(" + a + "px, " + n + "px, " + r + "px)") : b.wrapper.transform("translate(" + a + "px, " + n + "px)")), b.translate = b.isHorizontal() ? a : n;
                    var o, l = b.maxTranslate() - b.minTranslate();
                    o = 0 === l ? 0 : (e - b.minTranslate()) / l, o !== b.progress && b.updateProgress(e), t && b.updateActiveIndex(), "slide" !== b.params.effect && b.effects[b.params.effect] && b.effects[b.params.effect].setTranslate(b.translate), b.params.parallax && b.parallax && b.parallax.setTranslate(b.translate), b.params.scrollbar && b.scrollbar && b.scrollbar.setTranslate(b.translate), b.params.control && b.controller && b.controller.setTranslate(b.translate, i), b.emit("onSetTranslate", b, b.translate)
                }, b.getTranslate = function (e, t) {
                    var i, a, n, s;
                    return "undefined" == typeof t && (t = "x"), b.params.virtualTranslate ? b.rtl ? -b.translate : b.translate : (n = window.getComputedStyle(e, null), window.WebKitCSSMatrix ? (a = n.transform || n.webkitTransform, a.split(",").length > 6 && (a = a.split(", ").map(function (e) {
                                return e.replace(",", ".")
                            }).join(", ")), s = new window.WebKitCSSMatrix("none" === a ? "" : a)) : (s = n.MozTransform || n.OTransform || n.MsTransform || n.msTransform || n.transform || n.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), i = s.toString().split(",")), "x" === t && (a = window.WebKitCSSMatrix ? s.m41 : 16 === i.length ? parseFloat(i[12]) : parseFloat(i[4])), "y" === t && (a = window.WebKitCSSMatrix ? s.m42 : 16 === i.length ? parseFloat(i[13]) : parseFloat(i[5])), b.rtl && a && (a = -a), a || 0)
                }, b.getWrapperTranslate = function (e) {
                    return "undefined" == typeof e && (e = b.isHorizontal() ? "x" : "y"), b.getTranslate(b.wrapper[0], e)
                }, b.observers = [], b.initObservers = function () {
                    if (b.params.observeParents)for (var e = b.container.parents(), t = 0; t < e.length; t++)l(e[t]);
                    l(b.container[0], {childList: !1}), l(b.wrapper[0], {attributes: !1})
                }, b.disconnectObservers = function () {
                    for (var e = 0; e < b.observers.length; e++)b.observers[e].disconnect();
                    b.observers = []
                }, b.createLoop = function () {
                    b.wrapper.children("." + b.params.slideClass + "." + b.params.slideDuplicateClass).remove();
                    var e = b.wrapper.children("." + b.params.slideClass);
                    "auto" !== b.params.slidesPerView || b.params.loopedSlides || (b.params.loopedSlides = e.length), b.loopedSlides = parseInt(b.params.loopedSlides || b.params.slidesPerView, 10), b.loopedSlides = b.loopedSlides + b.params.loopAdditionalSlides, b.loopedSlides > e.length && (b.loopedSlides = e.length);
                    var i, a = [], n = [];
                    for (e.each(function (i, s) {
                        var r = t(this);
                        i < b.loopedSlides && n.push(s), i < e.length && i >= e.length - b.loopedSlides && a.push(s), r.attr("data-swiper-slide-index", i)
                    }), i = 0; i < n.length; i++)b.wrapper.append(t(n[i].cloneNode(!0)).addClass(b.params.slideDuplicateClass));
                    for (i = a.length - 1; i >= 0; i--)b.wrapper.prepend(t(a[i].cloneNode(!0)).addClass(b.params.slideDuplicateClass))
                }, b.destroyLoop = function () {
                    b.wrapper.children("." + b.params.slideClass + "." + b.params.slideDuplicateClass).remove(), b.slides.removeAttr("data-swiper-slide-index")
                }, b.reLoop = function (e) {
                    var t = b.activeIndex - b.loopedSlides;
                    b.destroyLoop(), b.createLoop(), b.updateSlidesSize(), e && b.slideTo(t + b.loopedSlides, 0, !1)
                }, b.fixLoop = function () {
                    var e;
                    b.activeIndex < b.loopedSlides ? (e = b.slides.length - 3 * b.loopedSlides + b.activeIndex, e += b.loopedSlides, b.slideTo(e, 0, !1, !0)) : ("auto" === b.params.slidesPerView && b.activeIndex >= 2 * b.loopedSlides || b.activeIndex > b.slides.length - 2 * b.params.slidesPerView) && (e = -b.slides.length + b.activeIndex + b.loopedSlides, e += b.loopedSlides, b.slideTo(e, 0, !1, !0))
                }, b.appendSlide = function (e) {
                    if (b.params.loop && b.destroyLoop(), "object" == typeof e && e.length)for (var t = 0; t < e.length; t++)e[t] && b.wrapper.append(e[t]); else b.wrapper.append(e);
                    b.params.loop && b.createLoop(), b.params.observer && b.support.observer || b.update(!0)
                }, b.prependSlide = function (e) {
                    b.params.loop && b.destroyLoop();
                    var t = b.activeIndex + 1;
                    if ("object" == typeof e && e.length) {
                        for (var i = 0; i < e.length; i++)e[i] && b.wrapper.prepend(e[i]);
                        t = b.activeIndex + e.length
                    } else b.wrapper.prepend(e);
                    b.params.loop && b.createLoop(), b.params.observer && b.support.observer || b.update(!0), b.slideTo(t, 0, !1)
                }, b.removeSlide = function (e) {
                    b.params.loop && (b.destroyLoop(), b.slides = b.wrapper.children("." + b.params.slideClass));
                    var t, i = b.activeIndex;
                    if ("object" == typeof e && e.length) {
                        for (var a = 0; a < e.length; a++)t = e[a], b.slides[t] && b.slides.eq(t).remove(), t < i && i--;
                        i = Math.max(i, 0)
                    } else t = e, b.slides[t] && b.slides.eq(t).remove(), t < i && i--, i = Math.max(i, 0);
                    b.params.loop && b.createLoop(), b.params.observer && b.support.observer || b.update(!0), b.params.loop ? b.slideTo(i + b.loopedSlides, 0, !1) : b.slideTo(i, 0, !1)
                }, b.removeAllSlides = function () {
                    for (var e = [], t = 0; t < b.slides.length; t++)e.push(t);
                    b.removeSlide(e)
                }, b.effects = {
                    fade: {
                        setTranslate: function () {
                            for (var e = 0; e < b.slides.length; e++) {
                                var t = b.slides.eq(e), i = t[0].swiperSlideOffset, a = -i;
                                b.params.virtualTranslate || (a -= b.translate);
                                var n = 0;
                                b.isHorizontal() || (n = a, a = 0);
                                var s = b.params.fade.crossFade ? Math.max(1 - Math.abs(t[0].progress), 0) : 1 + Math.min(Math.max(t[0].progress, -1), 0);
                                t.css({opacity: s}).transform("translate3d(" + a + "px, " + n + "px, 0px)")
                            }
                        }, setTransition: function (e) {
                            if (b.slides.transition(e), b.params.virtualTranslate && 0 !== e) {
                                var t = !1;
                                b.slides.transitionEnd(function () {
                                    if (!t && b) {
                                        t = !0, b.animating = !1;
                                        for (var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
                                                 i = 0; i < e.length; i++)b.wrapper.trigger(e[i])
                                    }
                                })
                            }
                        }
                    }, flip: {
                        setTranslate: function () {
                            for (var e = 0; e < b.slides.length; e++) {
                                var i = b.slides.eq(e), a = i[0].progress;
                                b.params.flip.limitRotation && (a = Math.max(Math.min(i[0].progress, 1), -1));
                                var n = i[0].swiperSlideOffset, s = -180 * a, r = s, o = 0, l = -n, d = 0;
                                if (b.isHorizontal() ? b.rtl && (r = -r) : (d = l, l = 0, o = -r, r = 0), i[0].style.zIndex = -Math.abs(Math.round(a)) + b.slides.length, b.params.flip.slideShadows) {
                                    var p = b.isHorizontal() ? i.find(".swiper-slide-shadow-left") : i.find(".swiper-slide-shadow-top"),
                                        u = b.isHorizontal() ? i.find(".swiper-slide-shadow-right") : i.find(".swiper-slide-shadow-bottom");
                                    0 === p.length && (p = t('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "left" : "top") + '"></div>'), i.append(p)), 0 === u.length && (u = t('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "right" : "bottom") + '"></div>'), i.append(u)), p.length && (p[0].style.opacity = Math.max(-a, 0)), u.length && (u[0].style.opacity = Math.max(a, 0))
                                }
                                i.transform("translate3d(" + l + "px, " + d + "px, 0px) rotateX(" + o + "deg) rotateY(" + r + "deg)")
                            }
                        }, setTransition: function (e) {
                            if (b.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), b.params.virtualTranslate && 0 !== e) {
                                var i = !1;
                                b.slides.eq(b.activeIndex).transitionEnd(function () {
                                    if (!i && b && t(this).hasClass(b.params.slideActiveClass)) {
                                        i = !0, b.animating = !1;
                                        for (var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
                                                 a = 0; a < e.length; a++)b.wrapper.trigger(e[a])
                                    }
                                })
                            }
                        }
                    }, cube: {
                        setTranslate: function () {
                            var e, i = 0;
                            b.params.cube.shadow && (b.isHorizontal() ? (e = b.wrapper.find(".swiper-cube-shadow"), 0 === e.length && (e = t('<div class="swiper-cube-shadow"></div>'), b.wrapper.append(e)), e.css({height: b.width + "px"})) : (e = b.container.find(".swiper-cube-shadow"), 0 === e.length && (e = t('<div class="swiper-cube-shadow"></div>'), b.container.append(e))));
                            for (var a = 0; a < b.slides.length; a++) {
                                var n = b.slides.eq(a), s = 90 * a, r = Math.floor(s / 360);
                                b.rtl && (s = -s, r = Math.floor(-s / 360));
                                var o = Math.max(Math.min(n[0].progress, 1), -1), l = 0, d = 0, p = 0;
                                a % 4 === 0 ? (l = 4 * -r * b.size, p = 0) : (a - 1) % 4 === 0 ? (l = 0, p = 4 * -r * b.size) : (a - 2) % 4 === 0 ? (l = b.size + 4 * r * b.size, p = b.size) : (a - 3) % 4 === 0 && (l = -b.size, p = 3 * b.size + 4 * b.size * r), b.rtl && (l = -l), b.isHorizontal() || (d = l, l = 0);
                                var u = "rotateX(" + (b.isHorizontal() ? 0 : -s) + "deg) rotateY(" + (b.isHorizontal() ? s : 0) + "deg) translate3d(" + l + "px, " + d + "px, " + p + "px)";
                                if (o <= 1 && o > -1 && (i = 90 * a + 90 * o, b.rtl && (i = 90 * -a - 90 * o)), n.transform(u), b.params.cube.slideShadows) {
                                    var c = b.isHorizontal() ? n.find(".swiper-slide-shadow-left") : n.find(".swiper-slide-shadow-top"),
                                        m = b.isHorizontal() ? n.find(".swiper-slide-shadow-right") : n.find(".swiper-slide-shadow-bottom");
                                    0 === c.length && (c = t('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "left" : "top") + '"></div>'), n.append(c)), 0 === m.length && (m = t('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "right" : "bottom") + '"></div>'), n.append(m)), c.length && (c[0].style.opacity = Math.max(-o, 0)), m.length && (m[0].style.opacity = Math.max(o, 0))
                                }
                            }
                            if (b.wrapper.css({
                                    "-webkit-transform-origin": "50% 50% -" + b.size / 2 + "px",
                                    "-moz-transform-origin": "50% 50% -" + b.size / 2 + "px",
                                    "-ms-transform-origin": "50% 50% -" + b.size / 2 + "px",
                                    "transform-origin": "50% 50% -" + b.size / 2 + "px"
                                }), b.params.cube.shadow)if (b.isHorizontal()) e.transform("translate3d(0px, " + (b.width / 2 + b.params.cube.shadowOffset) + "px, " + -b.width / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + b.params.cube.shadowScale + ")"); else {
                                var h = Math.abs(i) - 90 * Math.floor(Math.abs(i) / 90),
                                    f = 1.5 - (Math.sin(2 * h * Math.PI / 360) / 2 + Math.cos(2 * h * Math.PI / 360) / 2),
                                    g = b.params.cube.shadowScale, v = b.params.cube.shadowScale / f,
                                    y = b.params.cube.shadowOffset;
                                e.transform("scale3d(" + g + ", 1, " + v + ") translate3d(0px, " + (b.height / 2 + y) + "px, " + -b.height / 2 / v + "px) rotateX(-90deg)")
                            }
                            var w = b.isSafari || b.isUiWebView ? -b.size / 2 : 0;
                            b.wrapper.transform("translate3d(0px,0," + w + "px) rotateX(" + (b.isHorizontal() ? 0 : i) + "deg) rotateY(" + (b.isHorizontal() ? -i : 0) + "deg)")
                        }, setTransition: function (e) {
                            b.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), b.params.cube.shadow && !b.isHorizontal() && b.container.find(".swiper-cube-shadow").transition(e)
                        }
                    }, coverflow: {
                        setTranslate: function () {
                            for (var e = b.translate, i = b.isHorizontal() ? -e + b.width / 2 : -e + b.height / 2,
                                     a = b.isHorizontal() ? b.params.coverflow.rotate : -b.params.coverflow.rotate,
                                     n = b.params.coverflow.depth, s = 0, r = b.slides.length; s < r; s++) {
                                var o = b.slides.eq(s), l = b.slidesSizesGrid[s], d = o[0].swiperSlideOffset,
                                    p = (i - d - l / 2) / l * b.params.coverflow.modifier,
                                    u = b.isHorizontal() ? a * p : 0, c = b.isHorizontal() ? 0 : a * p,
                                    m = -n * Math.abs(p), h = b.isHorizontal() ? 0 : b.params.coverflow.stretch * p,
                                    f = b.isHorizontal() ? b.params.coverflow.stretch * p : 0;
                                Math.abs(f) < .001 && (f = 0), Math.abs(h) < .001 && (h = 0), Math.abs(m) < .001 && (m = 0), Math.abs(u) < .001 && (u = 0), Math.abs(c) < .001 && (c = 0);
                                var g = "translate3d(" + f + "px," + h + "px," + m + "px)  rotateX(" + c + "deg) rotateY(" + u + "deg)";
                                if (o.transform(g), o[0].style.zIndex = -Math.abs(Math.round(p)) + 1, b.params.coverflow.slideShadows) {
                                    var v = b.isHorizontal() ? o.find(".swiper-slide-shadow-left") : o.find(".swiper-slide-shadow-top"),
                                        y = b.isHorizontal() ? o.find(".swiper-slide-shadow-right") : o.find(".swiper-slide-shadow-bottom");
                                    0 === v.length && (v = t('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "left" : "top") + '"></div>'), o.append(v)), 0 === y.length && (y = t('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "right" : "bottom") + '"></div>'), o.append(y)), v.length && (v[0].style.opacity = p > 0 ? p : 0), y.length && (y[0].style.opacity = -p > 0 ? -p : 0)
                                }
                            }
                            if (b.browser.ie) {
                                var w = b.wrapper[0].style;
                                w.perspectiveOrigin = i + "px 50%"
                            }
                        }, setTransition: function (e) {
                            b.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
                        }
                    }
                }, b.lazy = {
                    initialImageLoaded: !1, loadImageInSlide: function (e, i) {
                        if ("undefined" != typeof e && ("undefined" == typeof i && (i = !0), 0 !== b.slides.length)) {
                            var a = b.slides.eq(e),
                                n = a.find(".swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)");
                            !a.hasClass("swiper-lazy") || a.hasClass("swiper-lazy-loaded") || a.hasClass("swiper-lazy-loading") || (n = n.add(a[0])), 0 !== n.length && n.each(function () {
                                var e = t(this);
                                e.addClass("swiper-lazy-loading");
                                var n = e.attr("data-background"), s = e.attr("data-src"), r = e.attr("data-srcset");
                                b.loadImage(e[0], s || n, r, !1, function () {
                                    if (n ? (e.css("background-image", 'url("' + n + '")'), e.removeAttr("data-background")) : (r && (e.attr("srcset", r), e.removeAttr("data-srcset")), s && (e.attr("src", s), e.removeAttr("data-src"))), e.addClass("swiper-lazy-loaded").removeClass("swiper-lazy-loading"), a.find(".swiper-lazy-preloader, .preloader").remove(), b.params.loop && i) {
                                        var t = a.attr("data-swiper-slide-index");
                                        if (a.hasClass(b.params.slideDuplicateClass)) {
                                            var o = b.wrapper.children('[data-swiper-slide-index="' + t + '"]:not(.' + b.params.slideDuplicateClass + ")");
                                            b.lazy.loadImageInSlide(o.index(), !1)
                                        } else {
                                            var l = b.wrapper.children("." + b.params.slideDuplicateClass + '[data-swiper-slide-index="' + t + '"]');
                                            b.lazy.loadImageInSlide(l.index(), !1)
                                        }
                                    }
                                    b.emit("onLazyImageReady", b, a[0], e[0])
                                }), b.emit("onLazyImageLoad", b, a[0], e[0])
                            })
                        }
                    }, load: function () {
                        var e;
                        if (b.params.watchSlidesVisibility) b.wrapper.children("." + b.params.slideVisibleClass).each(function () {
                            b.lazy.loadImageInSlide(t(this).index())
                        }); else if (b.params.slidesPerView > 1)for (e = b.activeIndex; e < b.activeIndex + b.params.slidesPerView; e++)b.slides[e] && b.lazy.loadImageInSlide(e); else b.lazy.loadImageInSlide(b.activeIndex);
                        if (b.params.lazyLoadingInPrevNext)if (b.params.slidesPerView > 1 || b.params.lazyLoadingInPrevNextAmount && b.params.lazyLoadingInPrevNextAmount > 1) {
                            var i = b.params.lazyLoadingInPrevNextAmount, a = b.params.slidesPerView,
                                n = Math.min(b.activeIndex + a + Math.max(i, a), b.slides.length),
                                s = Math.max(b.activeIndex - Math.max(a, i), 0);
                            for (e = b.activeIndex + b.params.slidesPerView; e < n; e++)b.slides[e] && b.lazy.loadImageInSlide(e);
                            for (e = s; e < b.activeIndex; e++)b.slides[e] && b.lazy.loadImageInSlide(e)
                        } else {
                            var r = b.wrapper.children("." + b.params.slideNextClass);
                            r.length > 0 && b.lazy.loadImageInSlide(r.index());
                            var o = b.wrapper.children("." + b.params.slidePrevClass);
                            o.length > 0 && b.lazy.loadImageInSlide(o.index())
                        }
                    }, onTransitionStart: function () {
                        b.params.lazyLoading && (b.params.lazyLoadingOnTransitionStart || !b.params.lazyLoadingOnTransitionStart && !b.lazy.initialImageLoaded) && b.lazy.load()
                    }, onTransitionEnd: function () {
                        b.params.lazyLoading && !b.params.lazyLoadingOnTransitionStart && b.lazy.load()
                    }
                }, b.scrollbar = {
                    isTouched: !1, setDragPosition: function (e) {
                        var t = b.scrollbar,
                            i = b.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY,
                            a = i - t.track.offset()[b.isHorizontal() ? "left" : "top"] - t.dragSize / 2,
                            n = -b.minTranslate() * t.moveDivider, s = -b.maxTranslate() * t.moveDivider;
                        a < n ? a = n : a > s && (a = s), a = -a / t.moveDivider, b.updateProgress(a), b.setWrapperTranslate(a, !0)
                    }, dragStart: function (e) {
                        var t = b.scrollbar;
                        t.isTouched = !0, e.preventDefault(), e.stopPropagation(), t.setDragPosition(e), clearTimeout(t.dragTimeout), t.track.transition(0), b.params.scrollbarHide && t.track.css("opacity", 1), b.wrapper.transition(100), t.drag.transition(100), b.emit("onScrollbarDragStart", b)
                    }, dragMove: function (e) {
                        var t = b.scrollbar;
                        t.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, t.setDragPosition(e), b.wrapper.transition(0), t.track.transition(0), t.drag.transition(0), b.emit("onScrollbarDragMove", b))
                    }, dragEnd: function (e) {
                        var t = b.scrollbar;
                        t.isTouched && (t.isTouched = !1, b.params.scrollbarHide && (clearTimeout(t.dragTimeout), t.dragTimeout = setTimeout(function () {
                            t.track.css("opacity", 0), t.track.transition(400)
                        }, 1e3)), b.emit("onScrollbarDragEnd", b), b.params.scrollbarSnapOnRelease && b.slideReset())
                    }, enableDraggable: function () {
                        var e = b.scrollbar, i = b.support.touch ? e.track : document;
                        t(e.track).on(b.touchEvents.start, e.dragStart), t(i).on(b.touchEvents.move, e.dragMove), t(i).on(b.touchEvents.end, e.dragEnd)
                    }, disableDraggable: function () {
                        var e = b.scrollbar, i = b.support.touch ? e.track : document;
                        t(e.track).off(b.touchEvents.start, e.dragStart), t(i).off(b.touchEvents.move, e.dragMove), t(i).off(b.touchEvents.end, e.dragEnd)
                    }, set: function () {
                        if (b.params.scrollbar) {
                            var e = b.scrollbar;
                            e.track = t(b.params.scrollbar), b.params.uniqueNavElements && "string" == typeof b.params.scrollbar && e.track.length > 1 && 1 === b.container.find(b.params.scrollbar).length && (e.track = b.container.find(b.params.scrollbar)), e.drag = e.track.find(".swiper-scrollbar-drag"), 0 === e.drag.length && (e.drag = t('<div class="swiper-scrollbar-drag"></div>'), e.track.append(e.drag)), e.drag[0].style.width = "", e.drag[0].style.height = "", e.trackSize = b.isHorizontal() ? e.track[0].offsetWidth : e.track[0].offsetHeight, e.divider = b.size / b.virtualSize, e.moveDivider = e.divider * (e.trackSize / b.size), e.dragSize = e.trackSize * e.divider, b.isHorizontal() ? e.drag[0].style.width = e.dragSize + "px" : e.drag[0].style.height = e.dragSize + "px", e.divider >= 1 ? e.track[0].style.display = "none" : e.track[0].style.display = "", b.params.scrollbarHide && (e.track[0].style.opacity = 0)
                        }
                    }, setTranslate: function () {
                        if (b.params.scrollbar) {
                            var e, t = b.scrollbar, i = (b.translate || 0, t.dragSize);
                            e = (t.trackSize - t.dragSize) * b.progress, b.rtl && b.isHorizontal() ? (e = -e, e > 0 ? (i = t.dragSize - e, e = 0) : -e + t.dragSize > t.trackSize && (i = t.trackSize + e)) : e < 0 ? (i = t.dragSize + e, e = 0) : e + t.dragSize > t.trackSize && (i = t.trackSize - e), b.isHorizontal() ? (b.support.transforms3d ? t.drag.transform("translate3d(" + e + "px, 0, 0)") : t.drag.transform("translateX(" + e + "px)"), t.drag[0].style.width = i + "px") : (b.support.transforms3d ? t.drag.transform("translate3d(0px, " + e + "px, 0)") : t.drag.transform("translateY(" + e + "px)"), t.drag[0].style.height = i + "px"), b.params.scrollbarHide && (clearTimeout(t.timeout), t.track[0].style.opacity = 1, t.timeout = setTimeout(function () {
                                t.track[0].style.opacity = 0, t.track.transition(400)
                            }, 1e3))
                        }
                    }, setTransition: function (e) {
                        b.params.scrollbar && b.scrollbar.drag.transition(e)
                    }
                }, b.controller = {
                    LinearSpline: function (e, t) {
                        this.x = e, this.y = t, this.lastIndex = e.length - 1;
                        var i, a;
                        this.x.length;
                        this.interpolate = function (e) {
                            return e ? (a = n(this.x, e), i = a - 1, (e - this.x[i]) * (this.y[a] - this.y[i]) / (this.x[a] - this.x[i]) + this.y[i]) : 0
                        };
                        var n = function () {
                            var e, t, i;
                            return function (a, n) {
                                for (t = -1, e = a.length; e - t > 1;)a[i = e + t >> 1] <= n ? t = i : e = i;
                                return e
                            }
                        }()
                    }, getInterpolateFunction: function (e) {
                        b.controller.spline || (b.controller.spline = b.params.loop ? new b.controller.LinearSpline(b.slidesGrid, e.slidesGrid) : new b.controller.LinearSpline(b.snapGrid, e.snapGrid))
                    }, setTranslate: function (e, t) {
                        function a(t) {
                            e = t.rtl && "horizontal" === t.params.direction ? -b.translate : b.translate, "slide" === b.params.controlBy && (b.controller.getInterpolateFunction(t), s = -b.controller.spline.interpolate(-e)), s && "container" !== b.params.controlBy || (n = (t.maxTranslate() - t.minTranslate()) / (b.maxTranslate() - b.minTranslate()), s = (e - b.minTranslate()) * n + t.minTranslate()), b.params.controlInverse && (s = t.maxTranslate() - s), t.updateProgress(s), t.setWrapperTranslate(s, !1, b), t.updateActiveIndex()
                        }

                        var n, s, r = b.params.control;
                        if (b.isArray(r))for (var o = 0; o < r.length; o++)r[o] !== t && r[o] instanceof i && a(r[o]); else r instanceof i && t !== r && a(r)
                    }, setTransition: function (e, t) {
                        function a(t) {
                            t.setWrapperTransition(e, b),
                            0 !== e && (t.onTransitionStart(), t.wrapper.transitionEnd(function () {
                                s && (t.params.loop && "slide" === b.params.controlBy && t.fixLoop(), t.onTransitionEnd())
                            }))
                        }

                        var n, s = b.params.control;
                        if (b.isArray(s))for (n = 0; n < s.length; n++)s[n] !== t && s[n] instanceof i && a(s[n]); else s instanceof i && t !== s && a(s)
                    }
                }, b.hashnav = {
                    init: function () {
                        if (b.params.hashnav) {
                            b.hashnav.initialized = !0;
                            var e = document.location.hash.replace("#", "");
                            if (e)for (var t = 0, i = 0, a = b.slides.length; i < a; i++) {
                                var n = b.slides.eq(i), s = n.attr("data-hash");
                                if (s === e && !n.hasClass(b.params.slideDuplicateClass)) {
                                    var r = n.index();
                                    b.slideTo(r, t, b.params.runCallbacksOnInit, !0)
                                }
                            }
                        }
                    }, setHash: function () {
                        b.hashnav.initialized && b.params.hashnav && (document.location.hash = b.slides.eq(b.activeIndex).attr("data-hash") || "")
                    }
                }, b.disableKeyboardControl = function () {
                    b.params.keyboardControl = !1, t(document).off("keydown", d)
                }, b.enableKeyboardControl = function () {
                    b.params.keyboardControl = !0, t(document).on("keydown", d)
                }, b.mousewheel = {
                    event: !1,
                    lastScrollTime: (new window.Date).getTime()
                }, b.params.mousewheelControl) {
                try {
                    new window.WheelEvent("wheel"), b.mousewheel.event = "wheel"
                } catch (e) {
                    (window.WheelEvent || b.container[0] && "wheel" in b.container[0]) && (b.mousewheel.event = "wheel")
                }
                !b.mousewheel.event && window.WheelEvent, b.mousewheel.event || void 0 === document.onmousewheel || (b.mousewheel.event = "mousewheel"), b.mousewheel.event || (b.mousewheel.event = "DOMMouseScroll")
            }
            b.disableMousewheelControl = function () {
                return !!b.mousewheel.event && (b.container.off(b.mousewheel.event, p), !0)
            }, b.enableMousewheelControl = function () {
                return !!b.mousewheel.event && (b.container.on(b.mousewheel.event, p), !0)
            }, b.parallax = {
                setTranslate: function () {
                    b.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
                        u(this, b.progress)
                    }), b.slides.each(function () {
                        var e = t(this);
                        e.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
                            var t = Math.min(Math.max(e[0].progress, -1), 1);
                            u(this, t)
                        })
                    })
                }, setTransition: function (e) {
                    "undefined" == typeof e && (e = b.params.speed), b.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
                        var i = t(this), a = parseInt(i.attr("data-swiper-parallax-duration"), 10) || e;
                        0 === e && (a = 0), i.transition(a)
                    })
                }
            }, b._plugins = [];
            for (var W in b.plugins) {
                var R = b.plugins[W](b, b.params[W]);
                R && b._plugins.push(R)
            }
            return b.callPlugins = function (e) {
                for (var t = 0; t < b._plugins.length; t++)e in b._plugins[t] && b._plugins[t][e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
            }, b.emitterEventListeners = {}, b.emit = function (e) {
                b.params[e] && b.params[e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                var t;
                if (b.emitterEventListeners[e])for (t = 0; t < b.emitterEventListeners[e].length; t++)b.emitterEventListeners[e][t](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                b.callPlugins && b.callPlugins(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
            }, b.on = function (e, t) {
                return e = c(e), b.emitterEventListeners[e] || (b.emitterEventListeners[e] = []), b.emitterEventListeners[e].push(t), b
            }, b.off = function (e, t) {
                var i;
                if (e = c(e), "undefined" == typeof t)return b.emitterEventListeners[e] = [], b;
                if (b.emitterEventListeners[e] && 0 !== b.emitterEventListeners[e].length) {
                    for (i = 0; i < b.emitterEventListeners[e].length; i++)b.emitterEventListeners[e][i] === t && b.emitterEventListeners[e].splice(i, 1);
                    return b
                }
            }, b.once = function (e, t) {
                e = c(e);
                var i = function () {
                    t(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]), b.off(e, i)
                };
                return b.on(e, i), b
            }, b.a11y = {
                makeFocusable: function (e) {
                    return e.attr("tabIndex", "0"), e
                },
                addRole: function (e, t) {
                    return e.attr("role", t), e
                },
                addLabel: function (e, t) {
                    return e.attr("aria-label", t), e
                },
                disable: function (e) {
                    return e.attr("aria-disabled", !0), e
                },
                enable: function (e) {
                    return e.attr("aria-disabled", !1), e
                },
                onEnterKey: function (e) {
                    13 === e.keyCode && (t(e.target).is(b.params.nextButton) ? (b.onClickNext(e), b.isEnd ? b.a11y.notify(b.params.lastSlideMessage) : b.a11y.notify(b.params.nextSlideMessage)) : t(e.target).is(b.params.prevButton) && (b.onClickPrev(e), b.isBeginning ? b.a11y.notify(b.params.firstSlideMessage) : b.a11y.notify(b.params.prevSlideMessage)), t(e.target).is("." + b.params.bulletClass) && t(e.target)[0].click())
                },
                liveRegion: t('<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>'),
                notify: function (e) {
                    var t = b.a11y.liveRegion;
                    0 !== t.length && (t.html(""), t.html(e))
                },
                init: function () {
                    b.params.nextButton && b.nextButton && b.nextButton.length > 0 && (b.a11y.makeFocusable(b.nextButton), b.a11y.addRole(b.nextButton, "button"), b.a11y.addLabel(b.nextButton, b.params.nextSlideMessage)), b.params.prevButton && b.prevButton && b.prevButton.length > 0 && (b.a11y.makeFocusable(b.prevButton), b.a11y.addRole(b.prevButton, "button"), b.a11y.addLabel(b.prevButton, b.params.prevSlideMessage)), t(b.container).append(b.a11y.liveRegion)
                },
                initPagination: function () {
                    b.params.pagination && b.params.paginationClickable && b.bullets && b.bullets.length && b.bullets.each(function () {
                        var e = t(this);
                        b.a11y.makeFocusable(e), b.a11y.addRole(e, "button"), b.a11y.addLabel(e, b.params.paginationBulletMessage.replace(/{{index}}/, e.index() + 1))
                    })
                },
                destroy: function () {
                    b.a11y.liveRegion && b.a11y.liveRegion.length > 0 && b.a11y.liveRegion.remove()
                }
            }, b.init = function () {
                b.params.loop && b.createLoop(), b.updateContainerSize(), b.updateSlidesSize(), b.updatePagination(), b.params.scrollbar && b.scrollbar && (b.scrollbar.set(), b.params.scrollbarDraggable && b.scrollbar.enableDraggable()), "slide" !== b.params.effect && b.effects[b.params.effect] && (b.params.loop || b.updateProgress(), b.effects[b.params.effect].setTranslate()), b.params.loop ? b.slideTo(b.params.initialSlide + b.loopedSlides, 0, b.params.runCallbacksOnInit) : (b.slideTo(b.params.initialSlide, 0, b.params.runCallbacksOnInit), 0 === b.params.initialSlide && (b.parallax && b.params.parallax && b.parallax.setTranslate(), b.lazy && b.params.lazyLoading && (b.lazy.load(), b.lazy.initialImageLoaded = !0))), b.attachEvents(), b.params.observer && b.support.observer && b.initObservers(), b.params.preloadImages && !b.params.lazyLoading && b.preloadImages(), b.params.autoplay && b.startAutoplay(), b.params.keyboardControl && b.enableKeyboardControl && b.enableKeyboardControl(), b.params.mousewheelControl && b.enableMousewheelControl && b.enableMousewheelControl(), b.params.hashnav && b.hashnav && b.hashnav.init(), b.params.a11y && b.a11y && b.a11y.init(), b.emit("onInit", b)
            }, b.cleanupStyles = function () {
                b.container.removeClass(b.classNames.join(" ")).removeAttr("style"), b.wrapper.removeAttr("style"), b.slides && b.slides.length && b.slides.removeClass([b.params.slideVisibleClass, b.params.slideActiveClass, b.params.slideNextClass, b.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"), b.paginationContainer && b.paginationContainer.length && b.paginationContainer.removeClass(b.params.paginationHiddenClass), b.bullets && b.bullets.length && b.bullets.removeClass(b.params.bulletActiveClass), b.params.prevButton && t(b.params.prevButton).removeClass(b.params.buttonDisabledClass), b.params.nextButton && t(b.params.nextButton).removeClass(b.params.buttonDisabledClass), b.params.scrollbar && b.scrollbar && (b.scrollbar.track && b.scrollbar.track.length && b.scrollbar.track.removeAttr("style"), b.scrollbar.drag && b.scrollbar.drag.length && b.scrollbar.drag.removeAttr("style"))
            }, b.destroy = function (e, t) {
                b.detachEvents(), b.stopAutoplay(), b.params.scrollbar && b.scrollbar && b.params.scrollbarDraggable && b.scrollbar.disableDraggable(), b.params.loop && b.destroyLoop(), t && b.cleanupStyles(), b.disconnectObservers(), b.params.keyboardControl && b.disableKeyboardControl && b.disableKeyboardControl(), b.params.mousewheelControl && b.disableMousewheelControl && b.disableMousewheelControl(), b.params.a11y && b.a11y && b.a11y.destroy(), b.emit("onDestroy"), e !== !1 && (b = null)
            }, b.init(), b
        }
    };
    i.prototype = {
        isSafari: function () {
            var e = navigator.userAgent.toLowerCase();
            return e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0
        }(),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),
        isArray: function (e) {
            return "[object Array]" === Object.prototype.toString.apply(e)
        },
        browser: {
            ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
            ieTouch: window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1
        },
        device: function () {
            var e = navigator.userAgent, t = e.match(/(Android);?[\s\/]+([\d.]+)?/),
                i = e.match(/(iPad).*OS\s([\d_]+)/), a = e.match(/(iPod)(.*OS\s([\d_]+))?/),
                n = !i && e.match(/(iPhone\sOS)\s([\d_]+)/);
            return {ios: i || n || a, android: t}
        }(),
        support: {
            touch: window.Modernizr && Modernizr.touch === !0 || function () {
                return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
            }(), transforms3d: window.Modernizr && Modernizr.csstransforms3d === !0 || function () {
                var e = document.createElement("div").style;
                return "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e
            }(), flexbox: function () {
                for (var e = document.createElement("div").style,
                         t = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "),
                         i = 0; i < t.length; i++)if (t[i] in e)return !0
            }(), observer: function () {
                return "MutationObserver" in window || "WebkitMutationObserver" in window
            }()
        },
        plugins: {}
    };
    for (var a = (function () {
        var e = function (e) {
            var t = this, i = 0;
            for (i = 0; i < e.length; i++)t[i] = e[i];
            return t.length = e.length, this
        }, t = function (t, i) {
            var a = [], n = 0;
            if (t && !i && t instanceof e)return t;
            if (t)if ("string" == typeof t) {
                var s, r, o = t.trim();
                if (o.indexOf("<") >= 0 && o.indexOf(">") >= 0) {
                    var l = "div";
                    for (0 === o.indexOf("<li") && (l = "ul"), 0 === o.indexOf("<tr") && (l = "tbody"), 0 !== o.indexOf("<td") && 0 !== o.indexOf("<th") || (l = "tr"), 0 === o.indexOf("<tbody") && (l = "table"), 0 === o.indexOf("<option") && (l = "select"), r = document.createElement(l), r.innerHTML = t, n = 0; n < r.childNodes.length; n++)a.push(r.childNodes[n])
                } else for (s = i || "#" !== t[0] || t.match(/[ .<>:~]/) ? (i || document).querySelectorAll(t) : [document.getElementById(t.split("#")[1])], n = 0; n < s.length; n++)s[n] && a.push(s[n])
            } else if (t.nodeType || t === window || t === document) a.push(t); else if (t.length > 0 && t[0].nodeType)for (n = 0; n < t.length; n++)a.push(t[n]);
            return new e(a)
        };
        return e.prototype = {
            addClass: function (e) {
                if ("undefined" == typeof e)return this;
                for (var t = e.split(" "),
                         i = 0; i < t.length; i++)for (var a = 0; a < this.length; a++)this[a].classList.add(t[i]);
                return this
            }, removeClass: function (e) {
                for (var t = e.split(" "),
                         i = 0; i < t.length; i++)for (var a = 0; a < this.length; a++)this[a].classList.remove(t[i]);
                return this
            }, hasClass: function (e) {
                return !!this[0] && this[0].classList.contains(e)
            }, toggleClass: function (e) {
                for (var t = e.split(" "),
                         i = 0; i < t.length; i++)for (var a = 0; a < this.length; a++)this[a].classList.toggle(t[i]);
                return this
            }, attr: function (e, t) {
                if (1 === arguments.length && "string" == typeof e)return this[0] ? this[0].getAttribute(e) : void 0;
                for (var i = 0; i < this.length; i++)if (2 === arguments.length) this[i].setAttribute(e, t); else for (var a in e)this[i][a] = e[a], this[i].setAttribute(a, e[a]);
                return this
            }, removeAttr: function (e) {
                for (var t = 0; t < this.length; t++)this[t].removeAttribute(e);
                return this
            }, data: function (e, t) {
                if ("undefined" != typeof t) {
                    for (var i = 0; i < this.length; i++) {
                        var a = this[i];
                        a.dom7ElementDataStorage || (a.dom7ElementDataStorage = {}), a.dom7ElementDataStorage[e] = t
                    }
                    return this
                }
                if (this[0]) {
                    var n = this[0].getAttribute("data-" + e);
                    return n ? n : this[0].dom7ElementDataStorage && e in this[0].dom7ElementDataStorage ? this[0].dom7ElementDataStorage[e] : void 0
                }
            }, transform: function (e) {
                for (var t = 0; t < this.length; t++) {
                    var i = this[t].style;
                    i.webkitTransform = i.MsTransform = i.msTransform = i.MozTransform = i.OTransform = i.transform = e
                }
                return this
            }, transition: function (e) {
                "string" != typeof e && (e += "ms");
                for (var t = 0; t < this.length; t++) {
                    var i = this[t].style;
                    i.webkitTransitionDuration = i.MsTransitionDuration = i.msTransitionDuration = i.MozTransitionDuration = i.OTransitionDuration = i.transitionDuration = e
                }
                return this
            }, on: function (e, i, a, n) {
                function s(e) {
                    var n = e.target;
                    if (t(n).is(i)) a.call(n, e); else for (var s = t(n).parents(),
                                                                r = 0; r < s.length; r++)t(s[r]).is(i) && a.call(s[r], e)
                }

                var r, o, l = e.split(" ");
                for (r = 0; r < this.length; r++)if ("function" == typeof i || i === !1)for ("function" == typeof i && (a = arguments[1], n = arguments[2] || !1), o = 0; o < l.length; o++)this[r].addEventListener(l[o], a, n); else for (o = 0; o < l.length; o++)this[r].dom7LiveListeners || (this[r].dom7LiveListeners = []), this[r].dom7LiveListeners.push({
                    listener: a,
                    liveListener: s
                }), this[r].addEventListener(l[o], s, n);
                return this
            }, off: function (e, t, i, a) {
                for (var n = e.split(" "),
                         s = 0; s < n.length; s++)for (var r = 0; r < this.length; r++)if ("function" == typeof t || t === !1) "function" == typeof t && (i = arguments[1], a = arguments[2] || !1), this[r].removeEventListener(n[s], i, a); else if (this[r].dom7LiveListeners)for (var o = 0; o < this[r].dom7LiveListeners.length; o++)this[r].dom7LiveListeners[o].listener === i && this[r].removeEventListener(n[s], this[r].dom7LiveListeners[o].liveListener, a);
                return this
            }, once: function (e, t, i, a) {
                function n(r) {
                    i(r), s.off(e, t, n, a)
                }

                var s = this;
                "function" == typeof t && (t = !1, i = arguments[1], a = arguments[2]), s.on(e, t, n, a)
            }, trigger: function (e, t) {
                for (var i = 0; i < this.length; i++) {
                    var a;
                    try {
                        a = new window.CustomEvent(e, {detail: t, bubbles: !0, cancelable: !0})
                    } catch (i) {
                        a = document.createEvent("Event"), a.initEvent(e, !0, !0), a.detail = t
                    }
                    this[i].dispatchEvent(a)
                }
                return this
            }, transitionEnd: function (e) {
                function t(s) {
                    if (s.target === this)for (e.call(this, s), i = 0; i < a.length; i++)n.off(a[i], t)
                }

                var i,
                    a = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
                    n = this;
                if (e)for (i = 0; i < a.length; i++)n.on(a[i], t);
                return this
            }, width: function () {
                return this[0] === window ? window.innerWidth : this.length > 0 ? parseFloat(this.css("width")) : null
            }, outerWidth: function (e) {
                return this.length > 0 ? e ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")) : this[0].offsetWidth : null
            }, height: function () {
                return this[0] === window ? window.innerHeight : this.length > 0 ? parseFloat(this.css("height")) : null
            }, outerHeight: function (e) {
                return this.length > 0 ? e ? this[0].offsetHeight + parseFloat(this.css("margin-top")) + parseFloat(this.css("margin-bottom")) : this[0].offsetHeight : null
            }, offset: function () {
                if (this.length > 0) {
                    var e = this[0], t = e.getBoundingClientRect(), i = document.body,
                        a = e.clientTop || i.clientTop || 0, n = e.clientLeft || i.clientLeft || 0,
                        s = window.pageYOffset || e.scrollTop, r = window.pageXOffset || e.scrollLeft;
                    return {top: t.top + s - a, left: t.left + r - n}
                }
                return null
            }, css: function (e, t) {
                var i;
                if (1 === arguments.length) {
                    if ("string" != typeof e) {
                        for (i = 0; i < this.length; i++)for (var a in e)this[i].style[a] = e[a];
                        return this
                    }
                    if (this[0])return window.getComputedStyle(this[0], null).getPropertyValue(e)
                }
                if (2 === arguments.length && "string" == typeof e) {
                    for (i = 0; i < this.length; i++)this[i].style[e] = t;
                    return this
                }
                return this
            }, each: function (e) {
                for (var t = 0; t < this.length; t++)e.call(this[t], t, this[t]);
                return this
            }, html: function (e) {
                if ("undefined" == typeof e)return this[0] ? this[0].innerHTML : void 0;
                for (var t = 0; t < this.length; t++)this[t].innerHTML = e;
                return this
            }, text: function (e) {
                if ("undefined" == typeof e)return this[0] ? this[0].textContent.trim() : null;
                for (var t = 0; t < this.length; t++)this[t].textContent = e;
                return this
            }, is: function (i) {
                if (!this[0])return !1;
                var a, n;
                if ("string" == typeof i) {
                    var s = this[0];
                    if (s === document)return i === document;
                    if (s === window)return i === window;
                    if (s.matches)return s.matches(i);
                    if (s.webkitMatchesSelector)return s.webkitMatchesSelector(i);
                    if (s.mozMatchesSelector)return s.mozMatchesSelector(i);
                    if (s.msMatchesSelector)return s.msMatchesSelector(i);
                    for (a = t(i), n = 0; n < a.length; n++)if (a[n] === this[0])return !0;
                    return !1
                }
                if (i === document)return this[0] === document;
                if (i === window)return this[0] === window;
                if (i.nodeType || i instanceof e) {
                    for (a = i.nodeType ? [i] : i, n = 0; n < a.length; n++)if (a[n] === this[0])return !0;
                    return !1
                }
                return !1
            }, index: function () {
                if (this[0]) {
                    for (var e = this[0], t = 0; null !== (e = e.previousSibling);)1 === e.nodeType && t++;
                    return t
                }
            }, eq: function (t) {
                if ("undefined" == typeof t)return this;
                var i, a = this.length;
                return t > a - 1 ? new e([]) : t < 0 ? (i = a + t, new e(i < 0 ? [] : [this[i]])) : new e([this[t]])
            }, append: function (t) {
                var i, a;
                for (i = 0; i < this.length; i++)if ("string" == typeof t) {
                    var n = document.createElement("div");
                    for (n.innerHTML = t; n.firstChild;)this[i].appendChild(n.firstChild)
                } else if (t instanceof e)for (a = 0; a < t.length; a++)this[i].appendChild(t[a]); else this[i].appendChild(t);
                return this
            }, prepend: function (t) {
                var i, a;
                for (i = 0; i < this.length; i++)if ("string" == typeof t) {
                    var n = document.createElement("div");
                    for (n.innerHTML = t, a = n.childNodes.length - 1; a >= 0; a--)this[i].insertBefore(n.childNodes[a], this[i].childNodes[0])
                } else if (t instanceof e)for (a = 0; a < t.length; a++)this[i].insertBefore(t[a], this[i].childNodes[0]); else this[i].insertBefore(t, this[i].childNodes[0]);
                return this
            }, insertBefore: function (e) {
                for (var i = t(e),
                         a = 0; a < this.length; a++)if (1 === i.length) i[0].parentNode.insertBefore(this[a], i[0]); else if (i.length > 1)for (var n = 0; n < i.length; n++)i[n].parentNode.insertBefore(this[a].cloneNode(!0), i[n])
            }, insertAfter: function (e) {
                for (var i = t(e),
                         a = 0; a < this.length; a++)if (1 === i.length) i[0].parentNode.insertBefore(this[a], i[0].nextSibling); else if (i.length > 1)for (var n = 0; n < i.length; n++)i[n].parentNode.insertBefore(this[a].cloneNode(!0), i[n].nextSibling)
            }, next: function (i) {
                return new e(this.length > 0 ? i ? this[0].nextElementSibling && t(this[0].nextElementSibling).is(i) ? [this[0].nextElementSibling] : [] : this[0].nextElementSibling ? [this[0].nextElementSibling] : [] : [])
            }, nextAll: function (i) {
                var a = [], n = this[0];
                if (!n)return new e([]);
                for (; n.nextElementSibling;) {
                    var s = n.nextElementSibling;
                    i ? t(s).is(i) && a.push(s) : a.push(s), n = s
                }
                return new e(a)
            }, prev: function (i) {
                return new e(this.length > 0 ? i ? this[0].previousElementSibling && t(this[0].previousElementSibling).is(i) ? [this[0].previousElementSibling] : [] : this[0].previousElementSibling ? [this[0].previousElementSibling] : [] : [])
            }, prevAll: function (i) {
                var a = [], n = this[0];
                if (!n)return new e([]);
                for (; n.previousElementSibling;) {
                    var s = n.previousElementSibling;
                    i ? t(s).is(i) && a.push(s) : a.push(s), n = s
                }
                return new e(a)
            }, parent: function (e) {
                for (var i = [],
                         a = 0; a < this.length; a++)e ? t(this[a].parentNode).is(e) && i.push(this[a].parentNode) : i.push(this[a].parentNode);
                return t(t.unique(i))
            }, parents: function (e) {
                for (var i = [],
                         a = 0; a < this.length; a++)for (var n = this[a].parentNode; n;)e ? t(n).is(e) && i.push(n) : i.push(n), n = n.parentNode;
                return t(t.unique(i))
            }, find: function (t) {
                for (var i = [], a = 0; a < this.length; a++)for (var n = this[a].querySelectorAll(t),
                                                                      s = 0; s < n.length; s++)i.push(n[s]);
                return new e(i)
            }, children: function (i) {
                for (var a = [], n = 0; n < this.length; n++)for (var s = this[n].childNodes,
                                                                      r = 0; r < s.length; r++)i ? 1 === s[r].nodeType && t(s[r]).is(i) && a.push(s[r]) : 1 === s[r].nodeType && a.push(s[r]);
                return new e(t.unique(a))
            }, remove: function () {
                for (var e = 0; e < this.length; e++)this[e].parentNode && this[e].parentNode.removeChild(this[e]);
                return this
            }, add: function () {
                var e, i, a = this;
                for (e = 0; e < arguments.length; e++) {
                    var n = t(arguments[e]);
                    for (i = 0; i < n.length; i++)a[a.length] = n[i], a.length++
                }
                return a
            }
        }, t.fn = e.prototype, t.unique = function (e) {
            for (var t = [], i = 0; i < e.length; i++)t.indexOf(e[i]) === -1 && t.push(e[i]);
            return t
        }, t
    }()), n = ["jQuery", "Zepto", "Dom7"], s = 0; s < n.length; s++)window[n[s]] && e(window[n[s]]);
    var r;
    r = "undefined" == typeof a ? window.Dom7 || window.Zepto || window.jQuery : a, r && ("transitionEnd" in r.fn || (r.fn.transitionEnd = function (e) {
        function t(s) {
            if (s.target === this)for (e.call(this, s), i = 0; i < a.length; i++)n.off(a[i], t)
        }

        var i, a = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
            n = this;
        if (e)for (i = 0; i < a.length; i++)n.on(a[i], t);
        return this
    }), "transform" in r.fn || (r.fn.transform = function (e) {
        for (var t = 0; t < this.length; t++) {
            var i = this[t].style;
            i.webkitTransform = i.MsTransform = i.msTransform = i.MozTransform = i.OTransform = i.transform = e
        }
        return this
    }), "transition" in r.fn || (r.fn.transition = function (e) {
        "string" != typeof e && (e += "ms");
        for (var t = 0; t < this.length; t++) {
            var i = this[t].style;
            i.webkitTransitionDuration = i.MsTransitionDuration = i.msTransitionDuration = i.MozTransitionDuration = i.OTransitionDuration = i.transitionDuration = e
        }
        return this
    })), window.Swiper = i
}(), "undefined" != typeof module ? module.exports = window.Swiper : "function" == typeof define && define.amd && define([], function () {
        "use strict";
        return window.Swiper
    }), +function (e, t, i) {
    "use strict";
    var a = {calc: !1};
    t.fn.rrssb = function (e) {
        var a = t.extend({
            description: i,
            emailAddress: i,
            emailBody: i,
            emailSubject: i,
            image: i,
            title: i,
            url: i
        }, e);
        a.emailSubject = a.emailSubject || a.title, a.emailBody = a.emailBody || (a.description ? a.description : "") + (a.url ? "\n\n" + a.url : "");
        for (var n in a)a.hasOwnProperty(n) && a[n] !== i && (a[n] = s(a[n]));
        a.url !== i && (t(this).find(".rrssb-facebook a").attr("href", "https://www.facebook.com/sharer/sharer.php?u=" + a.url), t(this).find(".rrssb-tumblr a").attr("href", "http://tumblr.com/share/link?url=" + a.url + (a.title !== i ? "&name=" + a.title : "") + (a.description !== i ? "&description=" + a.description : "")), t(this).find(".rrssb-linkedin a").attr("href", "http://www.linkedin.com/shareArticle?mini=true&url=" + a.url + (a.title !== i ? "&title=" + a.title : "") + (a.description !== i ? "&summary=" + a.description : "")), t(this).find(".rrssb-twitter a").attr("href", "https://twitter.com/intent/tweet?text=" + (a.description !== i ? a.description : "") + "%20" + a.url), t(this).find(".rrssb-hackernews a").attr("href", "https://news.ycombinator.com/submitlink?u=" + a.url + (a.title !== i ? "&text=" + a.title : "")), t(this).find(".rrssb-reddit a").attr("href", "http://www.reddit.com/submit?url=" + a.url + (a.description !== i ? "&text=" + a.description : "") + (a.title !== i ? "&title=" + a.title : "")), t(this).find(".rrssb-googleplus a").attr("href", "https://plus.google.com/share?url=" + (a.description !== i ? a.description : "") + "%20" + a.url), t(this).find(".rrssb-pinterest a").attr("href", "http://pinterest.com/pin/create/button/?url=" + a.url + (a.image !== i ? "&amp;media=" + a.image : "") + (a.description !== i ? "&description=" + a.description : "")), t(this).find(".rrssb-pocket a").attr("href", "https://getpocket.com/save?url=" + a.url), t(this).find(".rrssb-github a").attr("href", a.url), t(this).find(".rrssb-print a").attr("href", "javascript:window.print()"), t(this).find(".rrssb-whatsapp a").attr("href", "whatsapp://send?text=" + (a.description !== i ? a.description + "%20" : a.title !== i ? a.title + "%20" : "") + a.url)), (a.emailAddress !== i || a.emailSubject) && t(this).find(".rrssb-email a").attr("href", "mailto:" + (a.emailAddress ? a.emailAddress : "") + "?" + (a.emailSubject !== i ? "subject=" + a.emailSubject : "") + (a.emailBody !== i ? "&body=" + a.emailBody : ""))
    };
    var n = function () {
        var e = t("<div>"), i = ["calc", "-webkit-calc", "-moz-calc"];
        t("body").append(e);
        for (var n = 0; n < i.length; n++)if (e.css("width", i[n] + "(1px)"), 1 === e.width()) {
            a.calc = i[n];
            break
        }
        e.remove()
    }, s = function (e) {
        if (e !== i && null !== e) {
            if (null === e.match(/%[0-9a-f]{2}/i))return encodeURIComponent(e);
            e = decodeURIComponent(e), s(e)
        }
    }, r = function () {
        t(".rrssb-buttons").each(function (e) {
            var i = t(this), a = t("li:visible", i), n = a.length, s = 100 / n;
            a.css("width", s + "%").attr("data-initwidth", s)
        })
    }, o = function () {
        t(".rrssb-buttons").each(function (e) {
            var i = t(this), a = i.width(), n = t("li", i).not(".small").eq(0).width(), s = t("li.small", i).length;
            if (n > 170 && s < 1) {
                i.addClass("large-format");
                var r = n / 12 + "px";
                i.css("font-size", r)
            } else i.removeClass("large-format"), i.css("font-size", "");
            a < 25 * s ? i.removeClass("small-format").addClass("tiny-format") : i.removeClass("tiny-format")
        })
    }, l = function () {
        t(".rrssb-buttons").each(function (e) {
            var i = t(this), a = t("li", i), n = a.filter(".small"), s = 0, r = 0, o = n.eq(0),
                l = parseFloat(o.attr("data-size")) + 55, d = n.length;
            if (d === a.length) {
                var u = 42 * d, c = i.width();
                u + l < c && (i.removeClass("small-format"), n.eq(0).removeClass("small"), p())
            } else {
                a.not(".small").each(function (e) {
                    var i = t(this), a = parseFloat(i.attr("data-size")) + 55, n = parseFloat(i.width());
                    s += n, r += a
                });
                var m = s - r;
                l < m && (o.removeClass("small"), p())
            }
        })
    }, d = function (e) {
        t(".rrssb-buttons").each(function (e) {
            var i = t(this), a = t("li", i);
            t(a.get().reverse()).each(function (e, i) {
                var n = t(this);
                if (n.hasClass("small") === !1) {
                    var s = parseFloat(n.attr("data-size")) + 55, r = parseFloat(n.width());
                    if (s > r) {
                        var o = a.not(".small").last();
                        t(o).addClass("small"), p()
                    }
                }
                --i || l()
            })
        }), e === !0 && c(p)
    }, p = function () {
        t(".rrssb-buttons").each(function (e) {
            var i, n, s, o, l, d = t(this), p = t("li", d), u = p.filter(".small"), c = u.length;
            c > 0 && c !== p.length ? (d.removeClass("small-format"), u.css("width", "42px"), s = 42 * c, i = p.not(".small").length, n = 100 / i, l = s / i, a.calc === !1 ? (o = (d.innerWidth() - 1) / i - l, o = Math.floor(1e3 * o) / 1e3, o += "px") : o = a.calc + "(" + n + "% - " + l + "px)", p.not(".small").css("width", o)) : c === p.length ? (d.addClass("small-format"), r()) : (d.removeClass("small-format"), r())
        }), o()
    }, u = function () {
        t(".rrssb-buttons").each(function (e) {
            t(this).addClass("rrssb-" + (e + 1))
        }), n(), r(), t(".rrssb-buttons li .rrssb-text").each(function (e) {
            var i = t(this), a = i.width();
            i.closest("li").attr("data-size", a)
        }), d(!0)
    }, c = function (e) {
        t(".rrssb-buttons li.small").removeClass("small"), d(), e()
    }, m = function (t, a, n, s) {
        var r = e.screenLeft !== i ? e.screenLeft : screen.left, o = e.screenTop !== i ? e.screenTop : screen.top,
            l = e.innerWidth ? e.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width,
            d = e.innerHeight ? e.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height,
            p = l / 2 - n / 2 + r, u = d / 3 - s / 3 + o,
            c = e.open(t, a, "scrollbars=yes, width=" + n + ", height=" + s + ", top=" + u + ", left=" + p);
        c && c.focus && c.focus()
    }, h = function () {
        var e = {};
        return function (t, i, a) {
            a || (a = "Don't call this twice without a uniqueId"), e[a] && clearTimeout(e[a]), e[a] = setTimeout(t, i)
        }
    }();

}(window, jQuery), function (e) {
    if ("function" == typeof define && define.amd) define(e); else if ("object" == typeof exports) module.exports = e(); else {
        var t = window.Cookies, i = window.Cookies = e();
        i.noConflict = function () {
            return window.Cookies = t, i
        }
    }
}(function () {
    function e() {
        for (var e = 0, t = {}; e < arguments.length; e++) {
            var i = arguments[e];
            for (var a in i)t[a] = i[a]
        }
        return t
    }

    function t(i) {
        function a(t, n, s) {
            var r;
            if ("undefined" != typeof document) {
                if (arguments.length > 1) {
                    if (s = e({path: "/"}, a.defaults, s), "number" == typeof s.expires) {
                        var o = new Date;
                        o.setMilliseconds(o.getMilliseconds() + 864e5 * s.expires), s.expires = o
                    }
                    try {
                        r = JSON.stringify(n), /^[\{\[]/.test(r) && (n = r)
                    } catch (e) {
                    }
                    return n = i.write ? i.write(n, t) : encodeURIComponent(String(n)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent), t = encodeURIComponent(String(t)), t = t.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent), t = t.replace(/[\(\)]/g, escape), document.cookie = [t, "=", n, s.expires ? "; expires=" + s.expires.toUTCString() : "", s.path ? "; path=" + s.path : "", s.domain ? "; domain=" + s.domain : "", s.secure ? "; secure" : ""].join("")
                }
                t || (r = {});
                for (var l = document.cookie ? document.cookie.split("; ") : [], d = /(%[0-9A-Z]{2})+/g,
                         p = 0; p < l.length; p++) {
                    var u = l[p].split("="), c = u.slice(1).join("=");
                    '"' === c.charAt(0) && (c = c.slice(1, -1));
                    try {
                        var m = u[0].replace(d, decodeURIComponent);
                        if (c = i.read ? i.read(c, m) : i(c, m) || c.replace(d, decodeURIComponent), this.json)try {
                            c = JSON.parse(c)
                        } catch (e) {
                        }
                        if (t === m) {
                            r = c;
                            break
                        }
                        t || (r[m] = c)
                    } catch (e) {
                    }
                }
                return r
            }
        }

        return a.set = a, a.get = function (e) {
            return a(e)
        }, a.getJSON = function () {
            return a.apply({json: !0}, [].slice.call(arguments))
        }, a.defaults = {}, a.remove = function (t, i) {
            a(t, "", e(i, {expires: -1}))
        }, a.withConverter = t, a
    }

    return t(function () {
    })
}), function (e, t) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", t) : "object" == typeof module && module.exports ? module.exports = t() : e.EvEmitter = t()
}(this, function () {
    function e() {
    }

    var t = e.prototype;
    return t.on = function (e, t) {
        if (e && t) {
            var i = this._events = this._events || {}, a = i[e] = i[e] || [];
            return a.indexOf(t) == -1 && a.push(t), this
        }
    }, t.once = function (e, t) {
        if (e && t) {
            this.on(e, t);
            var i = this._onceEvents = this._onceEvents || {}, a = i[e] = i[e] || [];
            return a[t] = !0, this
        }
    }, t.off = function (e, t) {
        var i = this._events && this._events[e];
        if (i && i.length) {
            var a = i.indexOf(t);
            return a != -1 && i.splice(a, 1), this
        }
    }, t.emitEvent = function (e, t) {
        var i = this._events && this._events[e];
        if (i && i.length) {
            var a = 0, n = i[a];
            t = t || [];
            for (var s = this._onceEvents && this._onceEvents[e]; n;) {
                var r = s && s[n];
                r && (this.off(e, n), delete s[n]), n.apply(this, t), a += r ? 0 : 1, n = i[a]
            }
            return this
        }
    }, e
}), function (e, t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function (i) {
            return t(e, i)
        }) : "object" == typeof module && module.exports ? module.exports = t(e, require("ev-emitter")) : e.imagesLoaded = t(e, e.EvEmitter)
}(window, function (e, t) {
    function i(e, t) {
        for (var i in t)e[i] = t[i];
        return e
    }

    function a(e) {
        var t = [];
        if (Array.isArray(e)) t = e; else if ("number" == typeof e.length)for (var i = 0; i < e.length; i++)t.push(e[i]); else t.push(e);
        return t
    }

    function n(e, t, s) {
        return this instanceof n ? ("string" == typeof e && (e = document.querySelectorAll(e)), this.elements = a(e), this.options = i({}, this.options), "function" == typeof t ? s = t : i(this.options, t), s && this.on("always", s), this.getImages(), o && (this.jqDeferred = new o.Deferred), void setTimeout(function () {
                this.check()
            }.bind(this))) : new n(e, t, s)
    }

    function s(e) {
        this.img = e
    }

    function r(e, t) {
        this.url = e, this.element = t, this.img = new Image
    }

    var o = e.jQuery, l = e.console;
    n.prototype = Object.create(t.prototype), n.prototype.options = {}, n.prototype.getImages = function () {
        this.images = [], this.elements.forEach(this.addElementImages, this)
    }, n.prototype.addElementImages = function (e) {
        "IMG" == e.nodeName && this.addImage(e), this.options.background === !0 && this.addElementBackgroundImages(e);
        var t = e.nodeType;
        if (t && d[t]) {
            for (var i = e.querySelectorAll("img"), a = 0; a < i.length; a++) {
                var n = i[a];
                this.addImage(n)
            }
            if ("string" == typeof this.options.background) {
                var s = e.querySelectorAll(this.options.background);
                for (a = 0; a < s.length; a++) {
                    var r = s[a];
                    this.addElementBackgroundImages(r)
                }
            }
        }
    };
    var d = {1: !0, 9: !0, 11: !0};
    return n.prototype.addElementBackgroundImages = function (e) {
        var t = getComputedStyle(e);
        if (t)for (var i = /url\((['"])?(.*?)\1\)/gi, a = i.exec(t.backgroundImage); null !== a;) {
            var n = a && a[2];
            n && this.addBackground(n, e), a = i.exec(t.backgroundImage)
        }
    }, n.prototype.addImage = function (e) {
        var t = new s(e);
        this.images.push(t)
    }, n.prototype.addBackground = function (e, t) {
        var i = new r(e, t);
        this.images.push(i)
    }, n.prototype.check = function () {
        function e(e, i, a) {
            setTimeout(function () {
                t.progress(e, i, a)
            })
        }

        var t = this;
        return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function (t) {
                t.once("progress", e), t.check()
            }) : void this.complete()
    }, n.prototype.progress = function (e, t, i) {
        this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded, this.emitEvent("progress", [this, e, t]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, e), this.progressedCount == this.images.length && this.complete(), this.options.debug && l && l.log("progress: " + i, e, t)
    }, n.prototype.complete = function () {
        var e = this.hasAnyBroken ? "fail" : "done";
        if (this.isComplete = !0, this.emitEvent(e, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
            var t = this.hasAnyBroken ? "reject" : "resolve";
            this.jqDeferred[t](this)
        }
    }, s.prototype = Object.create(t.prototype), s.prototype.check = function () {
        var e = this.getIsImageComplete();
        return e ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void(this.proxyImage.src = this.img.src))
    }, s.prototype.getIsImageComplete = function () {
        return this.img.complete && void 0 !== this.img.naturalWidth
    }, s.prototype.confirm = function (e, t) {
        this.isLoaded = e, this.emitEvent("progress", [this, this.img, t])
    }, s.prototype.handleEvent = function (e) {
        var t = "on" + e.type;
        this[t] && this[t](e)
    }, s.prototype.onload = function () {
        this.confirm(!0, "onload"), this.unbindEvents()
    }, s.prototype.onerror = function () {
        this.confirm(!1, "onerror"), this.unbindEvents()
    }, s.prototype.unbindEvents = function () {
        this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, r.prototype = Object.create(s.prototype), r.prototype.check = function () {
        this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url;
        var e = this.getIsImageComplete();
        e && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"),
            this.unbindEvents())
    }, r.prototype.unbindEvents = function () {
        this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, r.prototype.confirm = function (e, t) {
        this.isLoaded = e, this.emitEvent("progress", [this, this.element, t])
    }, n.makeJQueryPlugin = function (t) {
        t = t || e.jQuery, t && (o = t, o.fn.imagesLoaded = function (e, t) {
            var i = new n(this, e, t);
            return i.jqDeferred.promise(o(this))
        })
    }, n.makeJQueryPlugin(), n
}), function (e) {
    if ("function" == typeof define && define.amd) define(e); else if ("object" == typeof exports) module.exports = e(); else {
        var t = window.Cookies, i = window.Cookies = e();
        i.noConflict = function () {
            return window.Cookies = t, i
        }
    }
}(function () {
    function e() {
        for (var e = 0, t = {}; e < arguments.length; e++) {
            var i = arguments[e];
            for (var a in i)t[a] = i[a]
        }
        return t
    }

    function t(i) {
        function a(t, n, s) {
            var r;
            if ("undefined" != typeof document) {
                if (arguments.length > 1) {
                    if (s = e({path: "/"}, a.defaults, s), "number" == typeof s.expires) {
                        var o = new Date;
                        o.setMilliseconds(o.getMilliseconds() + 864e5 * s.expires), s.expires = o
                    }
                    try {
                        r = JSON.stringify(n), /^[\{\[]/.test(r) && (n = r)
                    } catch (e) {
                    }
                    return n = i.write ? i.write(n, t) : encodeURIComponent(String(n)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent), t = encodeURIComponent(String(t)), t = t.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent), t = t.replace(/[\(\)]/g, escape), document.cookie = [t, "=", n, s.expires ? "; expires=" + s.expires.toUTCString() : "", s.path ? "; path=" + s.path : "", s.domain ? "; domain=" + s.domain : "", s.secure ? "; secure" : ""].join("")
                }
                t || (r = {});
                for (var l = document.cookie ? document.cookie.split("; ") : [], d = /(%[0-9A-Z]{2})+/g,
                         p = 0; p < l.length; p++) {
                    var u = l[p].split("="), c = u.slice(1).join("=");
                    '"' === c.charAt(0) && (c = c.slice(1, -1));
                    try {
                        var m = u[0].replace(d, decodeURIComponent);
                        if (c = i.read ? i.read(c, m) : i(c, m) || c.replace(d, decodeURIComponent), this.json)try {
                            c = JSON.parse(c)
                        } catch (e) {
                        }
                        if (t === m) {
                            r = c;
                            break
                        }
                        t || (r[m] = c)
                    } catch (e) {
                    }
                }
                return r
            }
        }

        return a.set = a, a.get = function (e) {
            return a(e)
        }, a.getJSON = function () {
            return a.apply({json: !0}, [].slice.call(arguments))
        }, a.defaults = {}, a.remove = function (t, i) {
            a(t, "", e(i, {expires: -1}))
        }, a.withConverter = t, a
    }

    return t(function () {
    })
}), !function (e, t) {
    "use strict";
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function (i) {
            t(e, i)
        }) : "object" == typeof module && module.exports ? module.exports = t(e, require("jquery")) : e.jQueryBridget = t(e, e.jQuery)
}(window, function (e, t) {
    "use strict";
    function i(i, s, o) {
        function l(e, t, a) {
            var n, s = "$()." + i + '("' + t + '")';
            return e.each(function (e, l) {
                var d = o.data(l, i);
                if (!d)return void r(i + " not initialized. Cannot call methods, i.e. " + s);
                var p = d[t];
                if (!p || "_" == t.charAt(0))return void r(s + " is not a valid method");
                var u = p.apply(d, a);
                n = void 0 === n ? u : n
            }), void 0 !== n ? n : e
        }

        function d(e, t) {
            e.each(function (e, a) {
                var n = o.data(a, i);
                n ? (n.option(t), n._init()) : (n = new s(a, t), o.data(a, i, n))
            })
        }

        o = o || t || e.jQuery, o && (s.prototype.option || (s.prototype.option = function (e) {
            o.isPlainObject(e) && (this.options = o.extend(!0, this.options, e))
        }), o.fn[i] = function (e) {
            if ("string" == typeof e) {
                var t = n.call(arguments, 1);
                return l(this, e, t)
            }
            return d(this, e), this
        }, a(o))
    }

    function a(e) {
        !e || e && e.bridget || (e.bridget = i)
    }

    var n = Array.prototype.slice, s = e.console, r = "undefined" == typeof s ? function () {
        } : function (e) {
            s.error(e)
        };
    return a(t || e.jQuery), i
}), function (e, t) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", t) : "object" == typeof module && module.exports ? module.exports = t() : e.EvEmitter = t()
}(this, function () {
    function e() {
    }

    var t = e.prototype;
    return t.on = function (e, t) {
        if (e && t) {
            var i = this._events = this._events || {}, a = i[e] = i[e] || [];
            return -1 == a.indexOf(t) && a.push(t), this
        }
    }, t.once = function (e, t) {
        if (e && t) {
            this.on(e, t);
            var i = this._onceEvents = this._onceEvents || {}, a = i[e] = i[e] || [];
            return a[t] = !0, this
        }
    }, t.off = function (e, t) {
        var i = this._events && this._events[e];
        if (i && i.length) {
            var a = i.indexOf(t);
            return -1 != a && i.splice(a, 1), this
        }
    }, t.emitEvent = function (e, t) {
        var i = this._events && this._events[e];
        if (i && i.length) {
            var a = 0, n = i[a];
            t = t || [];
            for (var s = this._onceEvents && this._onceEvents[e]; n;) {
                var r = s && s[n];
                r && (this.off(e, n), delete s[n]), n.apply(this, t), a += r ? 0 : 1, n = i[a]
            }
            return this
        }
    }, e
}), function (e, t) {
    "use strict";
    "function" == typeof define && define.amd ? define("get-size/get-size", [], function () {
            return t()
        }) : "object" == typeof module && module.exports ? module.exports = t() : e.getSize = t()
}(window, function () {
    "use strict";
    function e(e) {
        var t = parseFloat(e), i = -1 == e.indexOf("%") && !isNaN(t);
        return i && t
    }

    function t() {
    }

    function i() {
        for (var e = {width: 0, height: 0, innerWidth: 0, innerHeight: 0, outerWidth: 0, outerHeight: 0},
                 t = 0; d > t; t++) {
            var i = l[t];
            e[i] = 0
        }
        return e
    }

    function a(e) {
        var t = getComputedStyle(e);
        return t || o("Style returned " + t + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), t
    }

    function n() {
        if (!p) {
            p = !0;
            var t = document.createElement("div");
            t.style.width = "200px", t.style.padding = "1px 2px 3px 4px", t.style.borderStyle = "solid", t.style.borderWidth = "1px 2px 3px 4px", t.style.boxSizing = "border-box";
            var i = document.body || document.documentElement;
            i.appendChild(t);
            var n = a(t);
            s.isBoxSizeOuter = r = 200 == e(n.width), i.removeChild(t)
        }
    }

    function s(t) {
        if (n(), "string" == typeof t && (t = document.querySelector(t)), t && "object" == typeof t && t.nodeType) {
            var s = a(t);
            if ("none" == s.display)return i();
            var o = {};
            o.width = t.offsetWidth, o.height = t.offsetHeight;
            for (var p = o.isBorderBox = "border-box" == s.boxSizing, u = 0; d > u; u++) {
                var c = l[u], m = s[c], h = parseFloat(m);
                o[c] = isNaN(h) ? 0 : h
            }
            var f = o.paddingLeft + o.paddingRight, g = o.paddingTop + o.paddingBottom,
                v = o.marginLeft + o.marginRight, y = o.marginTop + o.marginBottom,
                w = o.borderLeftWidth + o.borderRightWidth, b = o.borderTopWidth + o.borderBottomWidth, x = p && r,
                T = e(s.width);
            T !== !1 && (o.width = T + (x ? 0 : f + w));
            var C = e(s.height);
            return C !== !1 && (o.height = C + (x ? 0 : g + b)), o.innerWidth = o.width - (f + w), o.innerHeight = o.height - (g + b), o.outerWidth = o.width + v, o.outerHeight = o.height + y, o
        }
    }

    var r, o = "undefined" == typeof console ? t : function (e) {
                console.error(e)
            },
        l = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
        d = l.length, p = !1;
    return s
}), function (e, t) {
    "use strict";
    "function" == typeof define && define.amd ? define("matches-selector/matches-selector", t) : "object" == typeof module && module.exports ? module.exports = t() : e.matchesSelector = t()
}(window, function () {
    "use strict";
    var e = function () {
        var e = Element.prototype;
        if (e.matches)return "matches";
        if (e.matchesSelector)return "matchesSelector";
        for (var t = ["webkit", "moz", "ms", "o"], i = 0; i < t.length; i++) {
            var a = t[i], n = a + "MatchesSelector";
            if (e[n])return n
        }
    }();
    return function (t, i) {
        return t[e](i)
    }
}), function (e, t) {
    "use strict";
    "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["matches-selector/matches-selector"], function (i) {
            return t(e, i)
        }) : "object" == typeof module && module.exports ? module.exports = t(e, require("desandro-matches-selector")) : e.fizzyUIUtils = t(e, e.matchesSelector)
}(window, function (e, t) {
    var i = {};
    i.extend = function (e, t) {
        for (var i in t)e[i] = t[i];
        return e
    }, i.modulo = function (e, t) {
        return (e % t + t) % t
    }, i.makeArray = function (e) {
        var t = [];
        if (Array.isArray(e)) t = e; else if (e && "number" == typeof e.length)for (var i = 0; i < e.length; i++)t.push(e[i]); else t.push(e);
        return t
    }, i.removeFrom = function (e, t) {
        var i = e.indexOf(t);
        -1 != i && e.splice(i, 1)
    }, i.getParent = function (e, i) {
        for (; e != document.body;)if (e = e.parentNode, t(e, i))return e
    }, i.getQueryElement = function (e) {
        return "string" == typeof e ? document.querySelector(e) : e
    }, i.handleEvent = function (e) {
        var t = "on" + e.type;
        this[t] && this[t](e)
    }, i.filterFindElements = function (e, a) {
        e = i.makeArray(e);
        var n = [];
        return e.forEach(function (e) {
            if (e instanceof HTMLElement) {
                if (!a)return void n.push(e);
                t(e, a) && n.push(e);
                for (var i = e.querySelectorAll(a), s = 0; s < i.length; s++)n.push(i[s])
            }
        }), n
    }, i.debounceMethod = function (e, t, i) {
        var a = e.prototype[t], n = t + "Timeout";
        e.prototype[t] = function () {
            var e = this[n];
            e && clearTimeout(e);
            var t = arguments, s = this;
            this[n] = setTimeout(function () {
                a.apply(s, t), delete s[n]
            }, i || 100)
        }
    }, i.docReady = function (e) {
        "complete" == document.readyState ? e() : document.addEventListener("DOMContentLoaded", e)
    }, i.toDashed = function (e) {
        return e.replace(/(.)([A-Z])/g, function (e, t, i) {
            return t + "-" + i
        }).toLowerCase()
    };
    var a = e.console;
    return i.htmlInit = function (t, n) {
        i.docReady(function () {
            var s = i.toDashed(n), r = "data-" + s, o = document.querySelectorAll("[" + r + "]"),
                l = document.querySelectorAll(".js-" + s), d = i.makeArray(o).concat(i.makeArray(l)),
                p = r + "-options", u = e.jQuery;
            d.forEach(function (e) {
                var i, s = e.getAttribute(r) || e.getAttribute(p);
                try {
                    i = s && JSON.parse(s)
                } catch (t) {
                    return void(a && a.error("Error parsing " + r + " on " + e.className + ": " + t))
                }
                var o = new t(e, i);
                u && u.data(e, n, o)
            })
        })
    }, i
}), function (e, t) {
    "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], function (i, a) {
            return t(e, i, a)
        }) : "object" == typeof module && module.exports ? module.exports = t(e, require("ev-emitter"), require("get-size")) : (e.Outlayer = {}, e.Outlayer.Item = t(e, e.EvEmitter, e.getSize))
}(window, function (e, t, i) {
    "use strict";
    function a(e) {
        for (var t in e)return !1;
        return t = null, !0
    }

    function n(e, t) {
        e && (this.element = e, this.layout = t, this.position = {x: 0, y: 0}, this._create())
    }

    function s(e) {
        return e.replace(/([A-Z])/g, function (e) {
            return "-" + e.toLowerCase()
        })
    }

    var r = document.documentElement.style, o = "string" == typeof r.transition ? "transition" : "WebkitTransition",
        l = "string" == typeof r.transform ? "transform" : "WebkitTransform",
        d = {WebkitTransition: "webkitTransitionEnd", transition: "transitionend"}[o],
        p = [l, o, o + "Duration", o + "Property"], u = n.prototype = Object.create(t.prototype);
    u.constructor = n, u._create = function () {
        this._transn = {ingProperties: {}, clean: {}, onEnd: {}}, this.css({position: "absolute"})
    }, u.handleEvent = function (e) {
        var t = "on" + e.type;
        this[t] && this[t](e)
    }, u.getSize = function () {
        this.size = i(this.element)
    }, u.css = function (e) {
        var t = this.element.style;
        for (var i in e) {
            var a = p[i] || i;
            t[a] = e[i]
        }
    }, u.getPosition = function () {
        var e = getComputedStyle(this.element), t = this.layout._getOption("originLeft"),
            i = this.layout._getOption("originTop"), a = e[t ? "left" : "right"], n = e[i ? "top" : "bottom"],
            s = this.layout.size, r = -1 != a.indexOf("%") ? parseFloat(a) / 100 * s.width : parseInt(a, 10),
            o = -1 != n.indexOf("%") ? parseFloat(n) / 100 * s.height : parseInt(n, 10);
        r = isNaN(r) ? 0 : r, o = isNaN(o) ? 0 : o, r -= t ? s.paddingLeft : s.paddingRight, o -= i ? s.paddingTop : s.paddingBottom, this.position.x = r, this.position.y = o
    }, u.layoutPosition = function () {
        var e = this.layout.size, t = {}, i = this.layout._getOption("originLeft"),
            a = this.layout._getOption("originTop"), n = i ? "paddingLeft" : "paddingRight", s = i ? "left" : "right",
            r = i ? "right" : "left", o = this.position.x + e[n];
        t[s] = this.getXValue(o), t[r] = "";
        var l = a ? "paddingTop" : "paddingBottom", d = a ? "top" : "bottom", p = a ? "bottom" : "top",
            u = this.position.y + e[l];
        t[d] = this.getYValue(u), t[p] = "", this.css(t), this.emitEvent("layout", [this])
    }, u.getXValue = function (e) {
        var t = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && !t ? e / this.layout.size.width * 100 + "%" : e + "px"
    }, u.getYValue = function (e) {
        var t = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && t ? e / this.layout.size.height * 100 + "%" : e + "px"
    }, u._transitionTo = function (e, t) {
        this.getPosition();
        var i = this.position.x, a = this.position.y, n = parseInt(e, 10), s = parseInt(t, 10),
            r = n === this.position.x && s === this.position.y;
        if (this.setPosition(e, t), r && !this.isTransitioning)return void this.layoutPosition();
        var o = e - i, l = t - a, d = {};
        d.transform = this.getTranslate(o, l), this.transition({
            to: d,
            onTransitionEnd: {transform: this.layoutPosition},
            isCleaning: !0
        })
    }, u.getTranslate = function (e, t) {
        var i = this.layout._getOption("originLeft"), a = this.layout._getOption("originTop");
        return e = i ? e : -e, t = a ? t : -t, "translate3d(" + e + "px, " + t + "px, 0)"
    }, u.goTo = function (e, t) {
        this.setPosition(e, t), this.layoutPosition()
    }, u.moveTo = u._transitionTo, u.setPosition = function (e, t) {
        this.position.x = parseInt(e, 10), this.position.y = parseInt(t, 10)
    }, u._nonTransition = function (e) {
        this.css(e.to), e.isCleaning && this._removeStyles(e.to);
        for (var t in e.onTransitionEnd)e.onTransitionEnd[t].call(this)
    }, u._transition = function (e) {
        if (!parseFloat(this.layout.options.transitionDuration))return void this._nonTransition(e);
        var t = this._transn;
        for (var i in e.onTransitionEnd)t.onEnd[i] = e.onTransitionEnd[i];
        for (i in e.to)t.ingProperties[i] = !0, e.isCleaning && (t.clean[i] = !0);
        if (e.from) {
            this.css(e.from);
            var a = this.element.offsetHeight;
            a = null
        }
        this.enableTransition(e.to), this.css(e.to), this.isTransitioning = !0
    };
    var c = "opacity," + s(p.transform || "transform");
    u.enableTransition = function () {
        this.isTransitioning || (this.css({
            transitionProperty: c,
            transitionDuration: this.layout.options.transitionDuration
        }), this.element.addEventListener(d, this, !1))
    }, u.transition = n.prototype[o ? "_transition" : "_nonTransition"], u.onwebkitTransitionEnd = function (e) {
        this.ontransitionend(e)
    }, u.onotransitionend = function (e) {
        this.ontransitionend(e)
    };
    var m = {"-webkit-transform": "transform"};
    u.ontransitionend = function (e) {
        if (e.target === this.element) {
            var t = this._transn, i = m[e.propertyName] || e.propertyName;
            if (delete t.ingProperties[i], a(t.ingProperties) && this.disableTransition(), i in t.clean && (this.element.style[e.propertyName] = "", delete t.clean[i]), i in t.onEnd) {
                var n = t.onEnd[i];
                n.call(this), delete t.onEnd[i]
            }
            this.emitEvent("transitionEnd", [this])
        }
    }, u.disableTransition = function () {
        this.removeTransitionStyles(), this.element.removeEventListener(d, this, !1), this.isTransitioning = !1
    }, u._removeStyles = function (e) {
        var t = {};
        for (var i in e)t[i] = "";
        this.css(t)
    };
    var h = {transitionProperty: "", transitionDuration: ""};
    return u.removeTransitionStyles = function () {
        this.css(h)
    }, u.removeElem = function () {
        this.element.parentNode.removeChild(this.element), this.css({display: ""}), this.emitEvent("remove", [this])
    }, u.remove = function () {
        return o && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function () {
                this.removeElem()
            }), void this.hide()) : void this.removeElem()
    }, u.reveal = function () {
        delete this.isHidden, this.css({display: ""});
        var e = this.layout.options, t = {}, i = this.getHideRevealTransitionEndProperty("visibleStyle");
        t[i] = this.onRevealTransitionEnd, this.transition({
            from: e.hiddenStyle,
            to: e.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: t
        })
    }, u.onRevealTransitionEnd = function () {
        this.isHidden || this.emitEvent("reveal")
    }, u.getHideRevealTransitionEndProperty = function (e) {
        var t = this.layout.options[e];
        if (t.opacity)return "opacity";
        for (var i in t)return i
    }, u.hide = function () {
        this.isHidden = !0, this.css({display: ""});
        var e = this.layout.options, t = {}, i = this.getHideRevealTransitionEndProperty("hiddenStyle");
        t[i] = this.onHideTransitionEnd, this.transition({
            from: e.visibleStyle,
            to: e.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: t
        })
    }, u.onHideTransitionEnd = function () {
        this.isHidden && (this.css({display: "none"}), this.emitEvent("hide"))
    }, u.destroy = function () {
        this.css({position: "", left: "", right: "", top: "", bottom: "", transition: "", transform: ""})
    }, n
}), function (e, t) {
    "use strict";
    "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function (i, a, n, s) {
            return t(e, i, a, n, s)
        }) : "object" == typeof module && module.exports ? module.exports = t(e, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : e.Outlayer = t(e, e.EvEmitter, e.getSize, e.fizzyUIUtils, e.Outlayer.Item)
}(window, function (e, t, i, a, n) {
    "use strict";
    function s(e, t) {
        var i = a.getQueryElement(e);
        if (!i)return void(o && o.error("Bad element for " + this.constructor.namespace + ": " + (i || e)));
        this.element = i, l && (this.$element = l(this.element)), this.options = a.extend({}, this.constructor.defaults), this.option(t);
        var n = ++p;
        this.element.outlayerGUID = n, u[n] = this, this._create();
        var s = this._getOption("initLayout");
        s && this.layout()
    }

    function r(e) {
        function t() {
            e.apply(this, arguments)
        }

        return t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t
    }

    var o = e.console, l = e.jQuery, d = function () {
    }, p = 0, u = {};
    s.namespace = "outlayer", s.Item = n, s.defaults = {
        containerStyle: {position: "relative"},
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: {opacity: 0, transform: "scale(0.001)"},
        visibleStyle: {opacity: 1, transform: "scale(1)"}
    };
    var c = s.prototype;
    return a.extend(c, t.prototype), c.option = function (e) {
        a.extend(this.options, e)
    }, c._getOption = function (e) {
        var t = this.constructor.compatOptions[e];
        return t && void 0 !== this.options[t] ? this.options[t] : this.options[e]
    }, s.compatOptions = {
        initLayout: "isInitLayout",
        horizontal: "isHorizontal",
        layoutInstant: "isLayoutInstant",
        originLeft: "isOriginLeft",
        originTop: "isOriginTop",
        resize: "isResizeBound",
        resizeContainer: "isResizingContainer"
    }, c._create = function () {
        this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), a.extend(this.element.style, this.options.containerStyle);
        var e = this._getOption("resize");
        e && this.bindResize()
    }, c.reloadItems = function () {
        this.items = this._itemize(this.element.children)
    }, c._itemize = function (e) {
        for (var t = this._filterFindItemElements(e), i = this.constructor.Item, a = [], n = 0; n < t.length; n++) {
            var s = t[n], r = new i(s, this);
            a.push(r)
        }
        return a
    }, c._filterFindItemElements = function (e) {
        return a.filterFindElements(e, this.options.itemSelector)
    }, c.getItemElements = function () {
        return this.items.map(function (e) {
            return e.element
        })
    }, c.layout = function () {
        this._resetLayout(), this._manageStamps();
        var e = this._getOption("layoutInstant"), t = void 0 !== e ? e : !this._isLayoutInited;
        this.layoutItems(this.items, t), this._isLayoutInited = !0
    }, c._init = c.layout, c._resetLayout = function () {
        this.getSize()
    }, c.getSize = function () {
        this.size = i(this.element)
    }, c._getMeasurement = function (e, t) {
        var a, n = this.options[e];
        n ? ("string" == typeof n ? a = this.element.querySelector(n) : n instanceof HTMLElement && (a = n), this[e] = a ? i(a)[t] : n) : this[e] = 0
    }, c.layoutItems = function (e, t) {
        e = this._getItemsForLayout(e), this._layoutItems(e, t), this._postLayout()
    }, c._getItemsForLayout = function (e) {
        return e.filter(function (e) {
            return !e.isIgnored
        })
    }, c._layoutItems = function (e, t) {
        if (this._emitCompleteOnItems("layout", e), e && e.length) {
            var i = [];
            e.forEach(function (e) {
                var a = this._getItemLayoutPosition(e);
                a.item = e, a.isInstant = t || e.isLayoutInstant, i.push(a)
            }, this), this._processLayoutQueue(i)
        }
    }, c._getItemLayoutPosition = function () {
        return {x: 0, y: 0}
    }, c._processLayoutQueue = function (e) {
        e.forEach(function (e) {
            this._positionItem(e.item, e.x, e.y, e.isInstant)
        }, this)
    }, c._positionItem = function (e, t, i, a) {
        a ? e.goTo(t, i) : e.moveTo(t, i)
    }, c._postLayout = function () {
        this.resizeContainer()
    }, c.resizeContainer = function () {
        var e = this._getOption("resizeContainer");
        if (e) {
            var t = this._getContainerSize();
            t && (this._setContainerMeasure(t.width, !0), this._setContainerMeasure(t.height, !1))
        }
    }, c._getContainerSize = d, c._setContainerMeasure = function (e, t) {
        if (void 0 !== e) {
            var i = this.size;
            i.isBorderBox && (e += t ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), e = Math.max(e, 0), this.element.style[t ? "width" : "height"] = e + "px"
        }
    }, c._emitCompleteOnItems = function (e, t) {
        function i() {
            n.dispatchEvent(e + "Complete", null, [t])
        }

        function a() {
            r++, r == s && i()
        }

        var n = this, s = t.length;
        if (!t || !s)return void i();
        var r = 0;
        t.forEach(function (t) {
            t.once(e, a)
        })
    }, c.dispatchEvent = function (e, t, i) {
        var a = t ? [t].concat(i) : i;
        if (this.emitEvent(e, a), l)if (this.$element = this.$element || l(this.element), t) {
            var n = l.Event(t);
            n.type = e, this.$element.trigger(n, i)
        } else this.$element.trigger(e, i)
    }, c.ignore = function (e) {
        var t = this.getItem(e);
        t && (t.isIgnored = !0)
    }, c.unignore = function (e) {
        var t = this.getItem(e);
        t && delete t.isIgnored
    }, c.stamp = function (e) {
        e = this._find(e), e && (this.stamps = this.stamps.concat(e), e.forEach(this.ignore, this))
    }, c.unstamp = function (e) {
        e = this._find(e), e && e.forEach(function (e) {
            a.removeFrom(this.stamps, e), this.unignore(e)
        }, this)
    }, c._find = function (e) {
        return e ? ("string" == typeof e && (e = this.element.querySelectorAll(e)), e = a.makeArray(e)) : void 0
    }, c._manageStamps = function () {
        this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this))
    }, c._getBoundingRect = function () {
        var e = this.element.getBoundingClientRect(), t = this.size;
        this._boundingRect = {
            left: e.left + t.paddingLeft + t.borderLeftWidth,
            top: e.top + t.paddingTop + t.borderTopWidth,
            right: e.right - (t.paddingRight + t.borderRightWidth),
            bottom: e.bottom - (t.paddingBottom + t.borderBottomWidth)
        }
    }, c._manageStamp = d, c._getElementOffset = function (e) {
        var t = e.getBoundingClientRect(), a = this._boundingRect, n = i(e), s = {
            left: t.left - a.left - n.marginLeft,
            top: t.top - a.top - n.marginTop,
            right: a.right - t.right - n.marginRight,
            bottom: a.bottom - t.bottom - n.marginBottom
        };
        return s
    }, c.handleEvent = a.handleEvent, c.bindResize = function () {
        e.addEventListener("resize", this), this.isResizeBound = !0
    }, c.unbindResize = function () {
        e.removeEventListener("resize", this), this.isResizeBound = !1
    }, c.onresize = function () {
        this.resize()
    }, a.debounceMethod(s, "onresize", 100), c.resize = function () {
        this.isResizeBound && this.needsResizeLayout() && this.layout()
    }, c.needsResizeLayout = function () {
        var e = i(this.element), t = this.size && e;
        return t && e.innerWidth !== this.size.innerWidth
    }, c.addItems = function (e) {
        var t = this._itemize(e);
        return t.length && (this.items = this.items.concat(t)), t
    }, c.appended = function (e) {
        var t = this.addItems(e);
        t.length && (this.layoutItems(t, !0), this.reveal(t))
    }, c.prepended = function (e) {
        var t = this._itemize(e);
        if (t.length) {
            var i = this.items.slice(0);
            this.items = t.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(t, !0), this.reveal(t), this.layoutItems(i)
        }
    }, c.reveal = function (e) {
        this._emitCompleteOnItems("reveal", e), e && e.length && e.forEach(function (e) {
            e.reveal()
        })
    }, c.hide = function (e) {
        this._emitCompleteOnItems("hide", e), e && e.length && e.forEach(function (e) {
            e.hide()
        })
    }, c.revealItemElements = function (e) {
        var t = this.getItems(e);
        this.reveal(t)
    }, c.hideItemElements = function (e) {
        var t = this.getItems(e);
        this.hide(t)
    }, c.getItem = function (e) {
        for (var t = 0; t < this.items.length; t++) {
            var i = this.items[t];
            if (i.element == e)return i
        }
    }, c.getItems = function (e) {
        e = a.makeArray(e);
        var t = [];
        return e.forEach(function (e) {
            var i = this.getItem(e);
            i && t.push(i)
        }, this), t
    }, c.remove = function (e) {
        var t = this.getItems(e);
        this._emitCompleteOnItems("remove", t), t && t.length && t.forEach(function (e) {
            e.remove(), a.removeFrom(this.items, e)
        }, this)
    }, c.destroy = function () {
        var e = this.element.style;
        e.height = "", e.position = "", e.width = "", this.items.forEach(function (e) {
            e.destroy()
        }), this.unbindResize();
        var t = this.element.outlayerGUID;
        delete u[t], delete this.element.outlayerGUID, l && l.removeData(this.element, this.constructor.namespace)
    }, s.data = function (e) {
        e = a.getQueryElement(e);
        var t = e && e.outlayerGUID;
        return t && u[t]
    }, s.create = function (e, t) {
        var i = r(s);
        return i.defaults = a.extend({}, s.defaults), a.extend(i.defaults, t), i.compatOptions = a.extend({}, s.compatOptions), i.namespace = e, i.data = s.data, i.Item = r(n), a.htmlInit(i, e), l && l.bridget && l.bridget(e, i), i
    }, s.Item = n, s
}), function (e, t) {
    "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size"], t) : "object" == typeof module && module.exports ? module.exports = t(require("outlayer"), require("get-size")) : e.Masonry = t(e.Outlayer, e.getSize)
}(window, function (e, t) {
    var i = e.create("masonry");
    return i.compatOptions.fitWidth = "isFitWidth", i.prototype._resetLayout = function () {
        this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = [];
        for (var e = 0; e < this.cols; e++)this.colYs.push(0);
        this.maxY = 0
    }, i.prototype.measureColumns = function () {
        if (this.getContainerWidth(), !this.columnWidth) {
            var e = this.items[0], i = e && e.element;
            this.columnWidth = i && t(i).outerWidth || this.containerWidth
        }
        var a = this.columnWidth += this.gutter, n = this.containerWidth + this.gutter, s = n / a, r = a - n % a,
            o = r && 1 > r ? "round" : "floor";
        s = Math[o](s), this.cols = Math.max(s, 1)
    }, i.prototype.getContainerWidth = function () {
        var e = this._getOption("fitWidth"), i = e ? this.element.parentNode : this.element, a = t(i);
        this.containerWidth = a && a.innerWidth
    }, i.prototype._getItemLayoutPosition = function (e) {
        e.getSize();
        var t = e.size.outerWidth % this.columnWidth, i = t && 1 > t ? "round" : "ceil",
            a = Math[i](e.size.outerWidth / this.columnWidth);
        a = Math.min(a, this.cols);
        for (var n = this._getColGroup(a), s = Math.min.apply(Math, n), r = n.indexOf(s),
                 o = {x: this.columnWidth * r, y: s}, l = s + e.size.outerHeight, d = this.cols + 1 - n.length,
                 p = 0; d > p; p++)this.colYs[r + p] = l;
        return o
    }, i.prototype._getColGroup = function (e) {
        if (2 > e)return this.colYs;
        for (var t = [], i = this.cols + 1 - e, a = 0; i > a; a++) {
            var n = this.colYs.slice(a, a + e);
            t[a] = Math.max.apply(Math, n)
        }
        return t
    }, i.prototype._manageStamp = function (e) {
        var i = t(e), a = this._getElementOffset(e), n = this._getOption("originLeft"), s = n ? a.left : a.right,
            r = s + i.outerWidth, o = Math.floor(s / this.columnWidth);
        o = Math.max(0, o);
        var l = Math.floor(r / this.columnWidth);
        l -= r % this.columnWidth ? 0 : 1, l = Math.min(this.cols - 1, l);
        for (var d = this._getOption("originTop"), p = (d ? a.top : a.bottom) + i.outerHeight,
                 u = o; l >= u; u++)this.colYs[u] = Math.max(p, this.colYs[u])
    }, i.prototype._getContainerSize = function () {
        this.maxY = Math.max.apply(Math, this.colYs);
        var e = {height: this.maxY};
        return this._getOption("fitWidth") && (e.width = this._getContainerFitWidth()), e
    }, i.prototype._getContainerFitWidth = function () {
        for (var e = 0, t = this.cols; --t && 0 === this.colYs[t];)e++;
        return (this.cols - e) * this.columnWidth - this.gutter
    }, i.prototype.needsResizeLayout = function () {
        var e = this.containerWidth;
        return this.getContainerWidth(), e != this.containerWidth
    }, i
}), function () {
    "use strict";
    function e(e) {
        e.fn.swiper = function (t) {
            var a;
            return e(this).each(function () {
                var e = new i(this, t);
                a || (a = e)
            }), a
        }
    }

    var t, i = function (e, a) {
        function n(e) {
            return Math.floor(e)
        }

        function s() {
            var e = x.params.autoplay, t = x.slides.eq(x.activeIndex);
            t.attr("data-swiper-autoplay") && (e = t.attr("data-swiper-autoplay") || x.params.autoplay), x.autoplayTimeoutId = setTimeout(function () {
                x.params.loop ? (x.fixLoop(), x._slideNext(), x.emit("onAutoplay", x)) : x.isEnd ? a.autoplayStopOnLast ? x.stopAutoplay() : (x._slideTo(0), x.emit("onAutoplay", x)) : (x._slideNext(), x.emit("onAutoplay", x))
            }, e)
        }

        function r(e, i) {
            var a = t(e.target);
            if (!a.is(i))if ("string" == typeof i) a = a.parents(i); else if (i.nodeType) {
                var n;
                return a.parents().each(function (e, t) {
                    t === i && (n = i)
                }), n ? i : void 0
            }
            if (0 !== a.length)return a[0]
        }

        function o(e, t) {
            t = t || {};
            var i = window.MutationObserver || window.WebkitMutationObserver, a = new i(function (e) {
                e.forEach(function (e) {
                    x.onResize(!0), x.emit("onObserverUpdate", x, e)
                })
            });
            a.observe(e, {
                attributes: "undefined" == typeof t.attributes || t.attributes,
                childList: "undefined" == typeof t.childList || t.childList,
                characterData: "undefined" == typeof t.characterData || t.characterData
            }), x.observers.push(a)
        }

        function l(e) {
            e.originalEvent && (e = e.originalEvent);
            var t = e.keyCode || e.charCode;
            if (!x.params.allowSwipeToNext && (x.isHorizontal() && 39 === t || !x.isHorizontal() && 40 === t))return !1;
            if (!x.params.allowSwipeToPrev && (x.isHorizontal() && 37 === t || !x.isHorizontal() && 38 === t))return !1;
            if (!(e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || document.activeElement && document.activeElement.nodeName && ("input" === document.activeElement.nodeName.toLowerCase() || "textarea" === document.activeElement.nodeName.toLowerCase()))) {
                if (37 === t || 39 === t || 38 === t || 40 === t) {
                    var i = !1;
                    if (x.container.parents("." + x.params.slideClass).length > 0 && 0 === x.container.parents("." + x.params.slideActiveClass).length)return;
                    var a = {left: window.pageXOffset, top: window.pageYOffset}, n = window.innerWidth,
                        s = window.innerHeight, r = x.container.offset();
                    x.rtl && (r.left = r.left - x.container[0].scrollLeft);
                    for (var o = [[r.left, r.top], [r.left + x.width, r.top], [r.left, r.top + x.height], [r.left + x.width, r.top + x.height]],
                             l = 0; l < o.length; l++) {
                        var d = o[l];
                        d[0] >= a.left && d[0] <= a.left + n && d[1] >= a.top && d[1] <= a.top + s && (i = !0)
                    }
                    if (!i)return
                }
                x.isHorizontal() ? (37 !== t && 39 !== t || (e.preventDefault ? e.preventDefault() : e.returnValue = !1), (39 === t && !x.rtl || 37 === t && x.rtl) && x.slideNext(), (37 === t && !x.rtl || 39 === t && x.rtl) && x.slidePrev()) : (38 !== t && 40 !== t || (e.preventDefault ? e.preventDefault() : e.returnValue = !1), 40 === t && x.slideNext(), 38 === t && x.slidePrev()), x.emit("onKeyPress", x, t)
            }
        }

        function d() {
            var e = "onwheel", t = e in document;
            if (!t) {
                var i = document.createElement("div");
                i.setAttribute(e, "return;"), t = "function" == typeof i[e]
            }
            return !t && document.implementation && document.implementation.hasFeature && document.implementation.hasFeature("", "") !== !0 && (t = document.implementation.hasFeature("Events.wheel", "3.0")), t
        }

        function p(e) {
            var t = 10, i = 40, a = 800, n = 0, s = 0, r = 0, o = 0;
            return "detail" in e && (s = e.detail), "wheelDelta" in e && (s = -e.wheelDelta / 120), "wheelDeltaY" in e && (s = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (n = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (n = s, s = 0), r = n * t, o = s * t, "deltaY" in e && (o = e.deltaY), "deltaX" in e && (r = e.deltaX), (r || o) && e.deltaMode && (1 === e.deltaMode ? (r *= i, o *= i) : (r *= a, o *= a)), r && !n && (n = r < 1 ? -1 : 1), o && !s && (s = o < 1 ? -1 : 1), {
                spinX: n,
                spinY: s,
                pixelX: r,
                pixelY: o
            }
        }

        function u(e) {
            e.originalEvent && (e = e.originalEvent);
            var t = 0, i = x.rtl ? -1 : 1, a = p(e);
            if (x.params.mousewheelForceToAxis)if (x.isHorizontal()) {
                if (!(Math.abs(a.pixelX) > Math.abs(a.pixelY)))return;
                t = a.pixelX * i
            } else {
                if (!(Math.abs(a.pixelY) > Math.abs(a.pixelX)))return;
                t = a.pixelY
            } else t = Math.abs(a.pixelX) > Math.abs(a.pixelY) ? -a.pixelX * i : -a.pixelY;
            if (0 !== t) {
                if (x.params.mousewheelInvert && (t = -t), x.params.freeMode) {
                    var n = x.getWrapperTranslate() + t * x.params.mousewheelSensitivity, s = x.isBeginning,
                        r = x.isEnd;
                    if (n >= x.minTranslate() && (n = x.minTranslate()), n <= x.maxTranslate() && (n = x.maxTranslate()), x.setWrapperTransition(0), x.setWrapperTranslate(n), x.updateProgress(), x.updateActiveIndex(), (!s && x.isBeginning || !r && x.isEnd) && x.updateClasses(), x.params.freeModeSticky ? (clearTimeout(x.mousewheel.timeout), x.mousewheel.timeout = setTimeout(function () {
                                x.slideReset()
                            }, 300)) : x.params.lazyLoading && x.lazy && x.lazy.load(), x.emit("onScroll", x, e), x.params.autoplay && x.params.autoplayDisableOnInteraction && x.stopAutoplay(), 0 === n || n === x.maxTranslate())return
                } else {
                    if ((new window.Date).getTime() - x.mousewheel.lastScrollTime > 60)if (t < 0)if (x.isEnd && !x.params.loop || x.animating) {
                        if (x.params.mousewheelReleaseOnEdges)return !0
                    } else x.slideNext(), x.emit("onScroll", x, e); else if (x.isBeginning && !x.params.loop || x.animating) {
                        if (x.params.mousewheelReleaseOnEdges)return !0
                    } else x.slidePrev(), x.emit("onScroll", x, e);
                    x.mousewheel.lastScrollTime = (new window.Date).getTime()
                }
                return e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1
            }
        }

        function c(e, i) {
            e = t(e);
            var a, n, s, r = x.rtl ? -1 : 1;
            a = e.attr("data-swiper-parallax") || "0", n = e.attr("data-swiper-parallax-x"), s = e.attr("data-swiper-parallax-y"), n || s ? (n = n || "0", s = s || "0") : x.isHorizontal() ? (n = a, s = "0") : (s = a, n = "0"), n = n.indexOf("%") >= 0 ? parseInt(n, 10) * i * r + "%" : n * i * r + "px", s = s.indexOf("%") >= 0 ? parseInt(s, 10) * i + "%" : s * i + "px", e.transform("translate3d(" + n + ", " + s + ",0px)")
        }

        function m(e) {
            return 0 !== e.indexOf("on") && (e = e[0] !== e[0].toUpperCase() ? "on" + e[0].toUpperCase() + e.substring(1) : "on" + e), e
        }

        if (!(this instanceof i))return new i(e, a);
        var h = {
            direction: "horizontal",
            touchEventsTarget: "container",
            initialSlide: 0,
            speed: 300,
            autoplay: !1,
            autoplayDisableOnInteraction: !0,
            autoplayStopOnLast: !1,
            iOSEdgeSwipeDetection: !1,
            iOSEdgeSwipeThreshold: 20,
            freeMode: !1,
            freeModeMomentum: !0,
            freeModeMomentumRatio: 1,
            freeModeMomentumBounce: !0,
            freeModeMomentumBounceRatio: 1,
            freeModeMomentumVelocityRatio: 1,
            freeModeSticky: !1,
            freeModeMinimumVelocity: .02,
            autoHeight: !1,
            setWrapperSize: !1,
            virtualTranslate: !1,
            effect: "slide",
            coverflow: {rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: !0},
            flip: {slideShadows: !0, limitRotation: !0},
            cube: {slideShadows: !0, shadow: !0, shadowOffset: 20, shadowScale: .94},
            fade: {crossFade: !1},
            parallax: !1,
            zoom: !1,
            zoomMax: 3,
            zoomMin: 1,
            zoomToggle: !0,
            scrollbar: null,
            scrollbarHide: !0,
            scrollbarDraggable: !1,
            scrollbarSnapOnRelease: !1,
            keyboardControl: !1,
            mousewheelControl: !1,
            mousewheelReleaseOnEdges: !1,
            mousewheelInvert: !1,
            mousewheelForceToAxis: !1,
            mousewheelSensitivity: 1,
            mousewheelEventsTarged: "container",
            hashnav: !1,
            hashnavWatchState: !1,
            history: !1,
            replaceState: !1,
            breakpoints: void 0,
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerColumnFill: "column",
            slidesPerGroup: 1,
            centeredSlides: !1,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            roundLengths: !1,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: !0,
            shortSwipes: !0,
            longSwipes: !0,
            longSwipesRatio: .5,
            longSwipesMs: 300,
            followFinger: !0,
            onlyExternal: !1,
            threshold: 0,
            touchMoveStopPropagation: !0,
            touchReleaseOnEdges: !1,
            uniqueNavElements: !0,
            pagination: null,
            paginationElement: "span",
            paginationClickable: !1,
            paginationHide: !1,
            paginationBulletRender: null,
            paginationProgressRender: null,
            paginationFractionRender: null,
            paginationCustomRender: null,
            paginationType: "bullets",
            resistance: !0,
            resistanceRatio: .85,
            nextButton: null,
            prevButton: null,
            watchSlidesProgress: !1,
            watchSlidesVisibility: !1,
            grabCursor: !1,
            preventClicks: !0,
            preventClicksPropagation: !0,
            slideToClickedSlide: !1,
            lazyLoading: !1,
            lazyLoadingInPrevNext: !1,
            lazyLoadingInPrevNextAmount: 1,
            lazyLoadingOnTransitionStart: !1,
            preloadImages: !0,
            updateOnImagesReady: !0,
            loop: !1,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            control: void 0,
            controlInverse: !1,
            controlBy: "slide",
            normalizeSlideIndex: !0,
            allowSwipeToPrev: !0,
            allowSwipeToNext: !0,
            swipeHandler: null,
            noSwiping: !0,
            noSwipingClass: "swiper-no-swiping",
            passiveListeners: !0,
            containerModifierClass: "swiper-container-",
            slideClass: "swiper-slide",
            slideActiveClass: "swiper-slide-active",
            slideDuplicateActiveClass: "swiper-slide-duplicate-active",
            slideVisibleClass: "swiper-slide-visible",
            slideDuplicateClass: "swiper-slide-duplicate",
            slideNextClass: "swiper-slide-next",
            slideDuplicateNextClass: "swiper-slide-duplicate-next",
            slidePrevClass: "swiper-slide-prev",
            slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
            wrapperClass: "swiper-wrapper",
            bulletClass: "swiper-pagination-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active",
            buttonDisabledClass: "swiper-button-disabled",
            paginationCurrentClass: "swiper-pagination-current",
            paginationTotalClass: "swiper-pagination-total",
            paginationHiddenClass: "swiper-pagination-hidden",
            paginationProgressbarClass: "swiper-pagination-progressbar",
            paginationClickableClass: "swiper-pagination-clickable",
            paginationModifierClass: "swiper-pagination-",
            lazyLoadingClass: "swiper-lazy",
            lazyStatusLoadingClass: "swiper-lazy-loading",
            lazyStatusLoadedClass: "swiper-lazy-loaded",
            lazyPreloaderClass: "swiper-lazy-preloader",
            notificationClass: "swiper-notification",
            preloaderClass: "preloader",
            zoomContainerClass: "swiper-zoom-container",
            observer: !1,
            observeParents: !1,
            a11y: !1,
            prevSlideMessage: "Previous slide",
            nextSlideMessage: "Next slide",
            firstSlideMessage: "This is the first slide",
            lastSlideMessage: "This is the last slide",
            paginationBulletMessage: "Go to slide {{index}}",
            runCallbacksOnInit: !0
        }, f = a && a.virtualTranslate;
        a = a || {};
        var g = {};
        for (var v in a)if ("object" != typeof a[v] || null === a[v] || (a[v].nodeType || a[v] === window || a[v] === document || "undefined" != typeof Dom7 && a[v] instanceof Dom7 || "undefined" != typeof jQuery && a[v] instanceof jQuery)) g[v] = a[v]; else {
            g[v] = {};
            for (var y in a[v])g[v][y] = a[v][y]
        }
        for (var w in h)if ("undefined" == typeof a[w]) a[w] = h[w]; else if ("object" == typeof a[w])for (var b in h[w])"undefined" == typeof a[w][b] && (a[w][b] = h[w][b]);
        var x = this;
        if (x.params = a, x.originalParams = g, x.classNames = [], "undefined" != typeof t && "undefined" != typeof Dom7 && (t = Dom7), ("undefined" != typeof t || (t = "undefined" == typeof Dom7 ? window.Dom7 || window.Zepto || window.jQuery : Dom7)) && (x.$ = t, x.currentBreakpoint = void 0, x.getActiveBreakpoint = function () {
                if (!x.params.breakpoints)return !1;
                var e, t = !1, i = [];
                for (e in x.params.breakpoints)x.params.breakpoints.hasOwnProperty(e) && i.push(e);
                i.sort(function (e, t) {
                    return parseInt(e, 10) > parseInt(t, 10)
                });
                for (var a = 0; a < i.length; a++)e = i[a], e >= window.innerWidth && !t && (t = e);
                return t || "max"
            }, x.setBreakpoint = function () {
                var e = x.getActiveBreakpoint();
                if (e && x.currentBreakpoint !== e) {
                    var t = e in x.params.breakpoints ? x.params.breakpoints[e] : x.originalParams,
                        i = x.params.loop && t.slidesPerView !== x.params.slidesPerView;
                    for (var a in t)x.params[a] = t[a];
                    x.currentBreakpoint = e, i && x.destroyLoop && x.reLoop(!0)
                }
            }, x.params.breakpoints && x.setBreakpoint(), x.container = t(e), 0 !== x.container.length)) {
            if (x.container.length > 1) {
                var T = [];
                return x.container.each(function () {
                    T.push(new i(this, a))
                }), T
            }
            x.container[0].swiper = x, x.container.data("swiper", x), x.classNames.push(x.params.containerModifierClass + x.params.direction), x.params.freeMode && x.classNames.push(x.params.containerModifierClass + "free-mode"), x.support.flexbox || (x.classNames.push(x.params.containerModifierClass + "no-flexbox"), x.params.slidesPerColumn = 1), x.params.autoHeight && x.classNames.push(x.params.containerModifierClass + "autoheight"), (x.params.parallax || x.params.watchSlidesVisibility) && (x.params.watchSlidesProgress = !0), x.params.touchReleaseOnEdges && (x.params.resistanceRatio = 0), ["cube", "coverflow", "flip"].indexOf(x.params.effect) >= 0 && (x.support.transforms3d ? (x.params.watchSlidesProgress = !0, x.classNames.push(x.params.containerModifierClass + "3d")) : x.params.effect = "slide"), "slide" !== x.params.effect && x.classNames.push(x.params.containerModifierClass + x.params.effect), "cube" === x.params.effect && (x.params.resistanceRatio = 0, x.params.slidesPerView = 1, x.params.slidesPerColumn = 1, x.params.slidesPerGroup = 1, x.params.centeredSlides = !1, x.params.spaceBetween = 0, x.params.virtualTranslate = !0), "fade" !== x.params.effect && "flip" !== x.params.effect || (x.params.slidesPerView = 1, x.params.slidesPerColumn = 1, x.params.slidesPerGroup = 1, x.params.watchSlidesProgress = !0, x.params.spaceBetween = 0, "undefined" == typeof f && (x.params.virtualTranslate = !0)), x.params.grabCursor && x.support.touch && (x.params.grabCursor = !1), x.wrapper = x.container.children("." + x.params.wrapperClass), x.params.pagination && (x.paginationContainer = t(x.params.pagination), x.params.uniqueNavElements && "string" == typeof x.params.pagination && x.paginationContainer.length > 1 && 1 === x.container.find(x.params.pagination).length && (x.paginationContainer = x.container.find(x.params.pagination)), "bullets" === x.params.paginationType && x.params.paginationClickable ? x.paginationContainer.addClass(x.params.paginationModifierClass + "clickable") : x.params.paginationClickable = !1, x.paginationContainer.addClass(x.params.paginationModifierClass + x.params.paginationType)), (x.params.nextButton || x.params.prevButton) && (x.params.nextButton && (x.nextButton = t(x.params.nextButton), x.params.uniqueNavElements && "string" == typeof x.params.nextButton && x.nextButton.length > 1 && 1 === x.container.find(x.params.nextButton).length && (x.nextButton = x.container.find(x.params.nextButton))), x.params.prevButton && (x.prevButton = t(x.params.prevButton), x.params.uniqueNavElements && "string" == typeof x.params.prevButton && x.prevButton.length > 1 && 1 === x.container.find(x.params.prevButton).length && (x.prevButton = x.container.find(x.params.prevButton)))), x.isHorizontal = function () {
                return "horizontal" === x.params.direction
            }, x.rtl = x.isHorizontal() && ("rtl" === x.container[0].dir.toLowerCase() || "rtl" === x.container.css("direction")), x.rtl && x.classNames.push(x.params.containerModifierClass + "rtl"), x.rtl && (x.wrongRTL = "-webkit-box" === x.wrapper.css("display")), x.params.slidesPerColumn > 1 && x.classNames.push(x.params.containerModifierClass + "multirow"), x.device.android && x.classNames.push(x.params.containerModifierClass + "android"), x.container.addClass(x.classNames.join(" ")), x.translate = 0, x.progress = 0, x.velocity = 0, x.lockSwipeToNext = function () {
                x.params.allowSwipeToNext = !1, x.params.allowSwipeToPrev === !1 && x.params.grabCursor && x.unsetGrabCursor()
            }, x.lockSwipeToPrev = function () {
                x.params.allowSwipeToPrev = !1, x.params.allowSwipeToNext === !1 && x.params.grabCursor && x.unsetGrabCursor()
            }, x.lockSwipes = function () {
                x.params.allowSwipeToNext = x.params.allowSwipeToPrev = !1, x.params.grabCursor && x.unsetGrabCursor()
            }, x.unlockSwipeToNext = function () {
                x.params.allowSwipeToNext = !0, x.params.allowSwipeToPrev === !0 && x.params.grabCursor && x.setGrabCursor()
            }, x.unlockSwipeToPrev = function () {
                x.params.allowSwipeToPrev = !0, x.params.allowSwipeToNext === !0 && x.params.grabCursor && x.setGrabCursor()
            }, x.unlockSwipes = function () {
                x.params.allowSwipeToNext = x.params.allowSwipeToPrev = !0, x.params.grabCursor && x.setGrabCursor()
            }, x.setGrabCursor = function (e) {
                x.container[0].style.cursor = "move", x.container[0].style.cursor = e ? "-webkit-grabbing" : "-webkit-grab", x.container[0].style.cursor = e ? "-moz-grabbin" : "-moz-grab", x.container[0].style.cursor = e ? "grabbing" : "grab"
            }, x.unsetGrabCursor = function () {
                x.container[0].style.cursor = ""
            }, x.params.grabCursor && x.setGrabCursor(), x.imagesToLoad = [], x.imagesLoaded = 0, x.loadImage = function (e, t, i, a, n, s) {
                function r() {
                    s && s()
                }

                var o;
                e.complete && n ? r() : t ? (o = new window.Image, o.onload = r, o.onerror = r, a && (o.sizes = a), i && (o.srcset = i), t && (o.src = t)) : r()
            }, x.preloadImages = function () {
                function e() {
                    "undefined" != typeof x && null !== x && x && (void 0 !== x.imagesLoaded && x.imagesLoaded++, x.imagesLoaded === x.imagesToLoad.length && (x.params.updateOnImagesReady && x.update(), x.emit("onImagesReady", x)))
                }

                x.imagesToLoad = x.container.find("img");
                for (var t = 0; t < x.imagesToLoad.length; t++)x.loadImage(x.imagesToLoad[t], x.imagesToLoad[t].currentSrc || x.imagesToLoad[t].getAttribute("src"), x.imagesToLoad[t].srcset || x.imagesToLoad[t].getAttribute("srcset"), x.imagesToLoad[t].sizes || x.imagesToLoad[t].getAttribute("sizes"), !0, e)
            }, x.autoplayTimeoutId = void 0, x.autoplaying = !1, x.autoplayPaused = !1, x.startAutoplay = function () {
                return "undefined" == typeof x.autoplayTimeoutId && (!!x.params.autoplay && (!x.autoplaying && (x.autoplaying = !0, x.emit("onAutoplayStart", x), void s())))
            }, x.stopAutoplay = function (e) {
                x.autoplayTimeoutId && (x.autoplayTimeoutId && clearTimeout(x.autoplayTimeoutId), x.autoplaying = !1, x.autoplayTimeoutId = void 0, x.emit("onAutoplayStop", x))
            }, x.pauseAutoplay = function (e) {
                x.autoplayPaused || (x.autoplayTimeoutId && clearTimeout(x.autoplayTimeoutId), x.autoplayPaused = !0, 0 === e ? (x.autoplayPaused = !1, s()) : x.wrapper.transitionEnd(function () {
                        x && (x.autoplayPaused = !1, x.autoplaying ? s() : x.stopAutoplay())
                    }))
            }, x.minTranslate = function () {
                return -x.snapGrid[0]
            }, x.maxTranslate = function () {
                return -x.snapGrid[x.snapGrid.length - 1]
            }, x.updateAutoHeight = function () {
                var e, t = [], i = 0;
                if ("auto" !== x.params.slidesPerView && x.params.slidesPerView > 1)for (e = 0; e < Math.ceil(x.params.slidesPerView); e++) {
                    var a = x.activeIndex + e;
                    if (a > x.slides.length)break;
                    t.push(x.slides.eq(a)[0])
                } else t.push(x.slides.eq(x.activeIndex)[0]);
                for (e = 0; e < t.length; e++)if ("undefined" != typeof t[e]) {
                    var n = t[e].offsetHeight;
                    i = n > i ? n : i
                }
                i && x.wrapper.css("height", i + "px")
            }, x.updateContainerSize = function () {
                var e, t;
                e = "undefined" != typeof x.params.width ? x.params.width : x.container[0].clientWidth, t = "undefined" != typeof x.params.height ? x.params.height : x.container[0].clientHeight, 0 === e && x.isHorizontal() || 0 === t && !x.isHorizontal() || (e = e - parseInt(x.container.css("padding-left"), 10) - parseInt(x.container.css("padding-right"), 10), t = t - parseInt(x.container.css("padding-top"), 10) - parseInt(x.container.css("padding-bottom"), 10), x.width = e, x.height = t, x.size = x.isHorizontal() ? x.width : x.height)
            }, x.updateSlidesSize = function () {
                x.slides = x.wrapper.children("." + x.params.slideClass), x.snapGrid = [], x.slidesGrid = [], x.slidesSizesGrid = [];
                var e, t = x.params.spaceBetween, i = -x.params.slidesOffsetBefore, a = 0, s = 0;
                if ("undefined" != typeof x.size) {
                    "string" == typeof t && t.indexOf("%") >= 0 && (t = parseFloat(t.replace("%", "")) / 100 * x.size), x.virtualSize = -t, x.rtl ? x.slides.css({
                            marginLeft: "",
                            marginTop: ""
                        }) : x.slides.css({marginRight: "", marginBottom: ""});
                    var r;
                    x.params.slidesPerColumn > 1 && (r = Math.floor(x.slides.length / x.params.slidesPerColumn) === x.slides.length / x.params.slidesPerColumn ? x.slides.length : Math.ceil(x.slides.length / x.params.slidesPerColumn) * x.params.slidesPerColumn, "auto" !== x.params.slidesPerView && "row" === x.params.slidesPerColumnFill && (r = Math.max(r, x.params.slidesPerView * x.params.slidesPerColumn)));
                    var o, l = x.params.slidesPerColumn, d = r / l,
                        p = d - (x.params.slidesPerColumn * d - x.slides.length);
                    for (e = 0; e < x.slides.length; e++) {
                        o = 0;
                        var u = x.slides.eq(e);
                        if (x.params.slidesPerColumn > 1) {
                            var c, m, h;
                            "column" === x.params.slidesPerColumnFill ? (m = Math.floor(e / l), h = e - m * l, (m > p || m === p && h === l - 1) && ++h >= l && (h = 0, m++), c = m + h * r / l, u.css({
                                    "-webkit-box-ordinal-group": c,
                                    "-moz-box-ordinal-group": c,
                                    "-ms-flex-order": c,
                                    "-webkit-order": c,
                                    order: c
                                })) : (h = Math.floor(e / d), m = e - h * d), u.css("margin-" + (x.isHorizontal() ? "top" : "left"), 0 !== h && x.params.spaceBetween && x.params.spaceBetween + "px").attr("data-swiper-column", m).attr("data-swiper-row", h)
                        }
                        "none" !== u.css("display") && ("auto" === x.params.slidesPerView ? (o = x.isHorizontal() ? u.outerWidth(!0) : u.outerHeight(!0), x.params.roundLengths && (o = n(o))) : (o = (x.size - (x.params.slidesPerView - 1) * t) / x.params.slidesPerView, x.params.roundLengths && (o = n(o)), x.isHorizontal() ? x.slides[e].style.width = o + "px" : x.slides[e].style.height = o + "px"), x.slides[e].swiperSlideSize = o, x.slidesSizesGrid.push(o), x.params.centeredSlides ? (i = i + o / 2 + a / 2 + t, 0 === a && 0 !== e && (i = i - x.size / 2 - t), 0 === e && (i = i - x.size / 2 - t), Math.abs(i) < .001 && (i = 0), s % x.params.slidesPerGroup === 0 && x.snapGrid.push(i), x.slidesGrid.push(i)) : (s % x.params.slidesPerGroup === 0 && x.snapGrid.push(i), x.slidesGrid.push(i), i = i + o + t), x.virtualSize += o + t, a = o, s++)
                    }
                    x.virtualSize = Math.max(x.virtualSize, x.size) + x.params.slidesOffsetAfter;
                    var f;
                    if (x.rtl && x.wrongRTL && ("slide" === x.params.effect || "coverflow" === x.params.effect) && x.wrapper.css({width: x.virtualSize + x.params.spaceBetween + "px"}), x.support.flexbox && !x.params.setWrapperSize || (x.isHorizontal() ? x.wrapper.css({width: x.virtualSize + x.params.spaceBetween + "px"}) : x.wrapper.css({height: x.virtualSize + x.params.spaceBetween + "px"})), x.params.slidesPerColumn > 1 && (x.virtualSize = (o + x.params.spaceBetween) * r, x.virtualSize = Math.ceil(x.virtualSize / x.params.slidesPerColumn) - x.params.spaceBetween, x.isHorizontal() ? x.wrapper.css({width: x.virtualSize + x.params.spaceBetween + "px"}) : x.wrapper.css({height: x.virtualSize + x.params.spaceBetween + "px"}), x.params.centeredSlides)) {
                        for (f = [], e = 0; e < x.snapGrid.length; e++)x.snapGrid[e] < x.virtualSize + x.snapGrid[0] && f.push(x.snapGrid[e]);
                        x.snapGrid = f
                    }
                    if (!x.params.centeredSlides) {
                        for (f = [], e = 0; e < x.snapGrid.length; e++)x.snapGrid[e] <= x.virtualSize - x.size && f.push(x.snapGrid[e]);
                        x.snapGrid = f, Math.floor(x.virtualSize - x.size) - Math.floor(x.snapGrid[x.snapGrid.length - 1]) > 1 && x.snapGrid.push(x.virtualSize - x.size)
                    }
                    0 === x.snapGrid.length && (x.snapGrid = [0]), 0 !== x.params.spaceBetween && (x.isHorizontal() ? x.rtl ? x.slides.css({marginLeft: t + "px"}) : x.slides.css({marginRight: t + "px"}) : x.slides.css({marginBottom: t + "px"})), x.params.watchSlidesProgress && x.updateSlidesOffset()
                }
            }, x.updateSlidesOffset = function () {
                for (var e = 0; e < x.slides.length; e++)x.slides[e].swiperSlideOffset = x.isHorizontal() ? x.slides[e].offsetLeft : x.slides[e].offsetTop
            }, x.currentSlidesPerView = function () {
                var e, t, i = 1;
                if (x.params.centeredSlides) {
                    var a, n = x.slides[x.activeIndex].swiperSlideSize;
                    for (e = x.activeIndex + 1; e < x.slides.length; e++)x.slides[e] && !a && (n += x.slides[e].swiperSlideSize, i++, n > x.size && (a = !0));
                    for (t = x.activeIndex - 1; t >= 0; t--)x.slides[t] && !a && (n += x.slides[t].swiperSlideSize, i++, n > x.size && (a = !0))
                } else for (e = x.activeIndex + 1; e < x.slides.length; e++)x.slidesGrid[e] - x.slidesGrid[x.activeIndex] < x.size && i++;
                return i
            }, x.updateSlidesProgress = function (e) {
                if ("undefined" == typeof e && (e = x.translate || 0), 0 !== x.slides.length) {
                    "undefined" == typeof x.slides[0].swiperSlideOffset && x.updateSlidesOffset();
                    var t = -e;
                    x.rtl && (t = e), x.slides.removeClass(x.params.slideVisibleClass);
                    for (var i = 0; i < x.slides.length; i++) {
                        var a = x.slides[i],
                            n = (t + (x.params.centeredSlides ? x.minTranslate() : 0) - a.swiperSlideOffset) / (a.swiperSlideSize + x.params.spaceBetween);
                        if (x.params.watchSlidesVisibility) {
                            var s = -(t - a.swiperSlideOffset), r = s + x.slidesSizesGrid[i],
                                o = s >= 0 && s < x.size || r > 0 && r <= x.size || s <= 0 && r >= x.size;
                            o && x.slides.eq(i).addClass(x.params.slideVisibleClass)
                        }
                        a.progress = x.rtl ? -n : n
                    }
                }
            }, x.updateProgress = function (e) {
                "undefined" == typeof e && (e = x.translate || 0);
                var t = x.maxTranslate() - x.minTranslate(), i = x.isBeginning, a = x.isEnd;
                0 === t ? (x.progress = 0, x.isBeginning = x.isEnd = !0) : (x.progress = (e - x.minTranslate()) / t, x.isBeginning = x.progress <= 0, x.isEnd = x.progress >= 1), x.isBeginning && !i && x.emit("onReachBeginning", x), x.isEnd && !a && x.emit("onReachEnd", x), x.params.watchSlidesProgress && x.updateSlidesProgress(e), x.emit("onProgress", x, x.progress)
            }, x.updateActiveIndex = function () {
                var e, t, i, a = x.rtl ? x.translate : -x.translate;
                for (t = 0; t < x.slidesGrid.length; t++)"undefined" != typeof x.slidesGrid[t + 1] ? a >= x.slidesGrid[t] && a < x.slidesGrid[t + 1] - (x.slidesGrid[t + 1] - x.slidesGrid[t]) / 2 ? e = t : a >= x.slidesGrid[t] && a < x.slidesGrid[t + 1] && (e = t + 1) : a >= x.slidesGrid[t] && (e = t);
                x.params.normalizeSlideIndex && (e < 0 || "undefined" == typeof e) && (e = 0), i = Math.floor(e / x.params.slidesPerGroup), i >= x.snapGrid.length && (i = x.snapGrid.length - 1), e !== x.activeIndex && (x.snapIndex = i, x.previousIndex = x.activeIndex, x.activeIndex = e, x.updateClasses(), x.updateRealIndex())
            }, x.updateRealIndex = function () {
                x.realIndex = parseInt(x.slides.eq(x.activeIndex).attr("data-swiper-slide-index") || x.activeIndex, 10)
            }, x.updateClasses = function () {
                x.slides.removeClass(x.params.slideActiveClass + " " + x.params.slideNextClass + " " + x.params.slidePrevClass + " " + x.params.slideDuplicateActiveClass + " " + x.params.slideDuplicateNextClass + " " + x.params.slideDuplicatePrevClass);
                var e = x.slides.eq(x.activeIndex);
                e.addClass(x.params.slideActiveClass), a.loop && (e.hasClass(x.params.slideDuplicateClass) ? x.wrapper.children("." + x.params.slideClass + ":not(." + x.params.slideDuplicateClass + ')[data-swiper-slide-index="' + x.realIndex + '"]').addClass(x.params.slideDuplicateActiveClass) : x.wrapper.children("." + x.params.slideClass + "." + x.params.slideDuplicateClass + '[data-swiper-slide-index="' + x.realIndex + '"]').addClass(x.params.slideDuplicateActiveClass));
                var i = e.next("." + x.params.slideClass).addClass(x.params.slideNextClass);
                x.params.loop && 0 === i.length && (i = x.slides.eq(0), i.addClass(x.params.slideNextClass));
                var n = e.prev("." + x.params.slideClass).addClass(x.params.slidePrevClass);
                if (x.params.loop && 0 === n.length && (n = x.slides.eq(-1), n.addClass(x.params.slidePrevClass)), a.loop && (i.hasClass(x.params.slideDuplicateClass) ? x.wrapper.children("." + x.params.slideClass + ":not(." + x.params.slideDuplicateClass + ')[data-swiper-slide-index="' + i.attr("data-swiper-slide-index") + '"]').addClass(x.params.slideDuplicateNextClass) : x.wrapper.children("." + x.params.slideClass + "." + x.params.slideDuplicateClass + '[data-swiper-slide-index="' + i.attr("data-swiper-slide-index") + '"]').addClass(x.params.slideDuplicateNextClass), n.hasClass(x.params.slideDuplicateClass) ? x.wrapper.children("." + x.params.slideClass + ":not(." + x.params.slideDuplicateClass + ')[data-swiper-slide-index="' + n.attr("data-swiper-slide-index") + '"]').addClass(x.params.slideDuplicatePrevClass) : x.wrapper.children("." + x.params.slideClass + "." + x.params.slideDuplicateClass + '[data-swiper-slide-index="' + n.attr("data-swiper-slide-index") + '"]').addClass(x.params.slideDuplicatePrevClass)), x.paginationContainer && x.paginationContainer.length > 0) {
                    var s,
                        r = x.params.loop ? Math.ceil((x.slides.length - 2 * x.loopedSlides) / x.params.slidesPerGroup) : x.snapGrid.length;
                    if (x.params.loop ? (s = Math.ceil((x.activeIndex - x.loopedSlides) / x.params.slidesPerGroup), s > x.slides.length - 1 - 2 * x.loopedSlides && (s -= x.slides.length - 2 * x.loopedSlides), s > r - 1 && (s -= r), s < 0 && "bullets" !== x.params.paginationType && (s = r + s)) : s = "undefined" != typeof x.snapIndex ? x.snapIndex : x.activeIndex || 0, "bullets" === x.params.paginationType && x.bullets && x.bullets.length > 0 && (x.bullets.removeClass(x.params.bulletActiveClass), x.paginationContainer.length > 1 ? x.bullets.each(function () {
                                t(this).index() === s && t(this).addClass(x.params.bulletActiveClass)
                            }) : x.bullets.eq(s).addClass(x.params.bulletActiveClass)), "fraction" === x.params.paginationType && (x.paginationContainer.find("." + x.params.paginationCurrentClass).text(s + 1), x.paginationContainer.find("." + x.params.paginationTotalClass).text(r)), "progress" === x.params.paginationType) {
                        var o = (s + 1) / r, l = o, d = 1;
                        x.isHorizontal() || (d = o, l = 1), x.paginationContainer.find("." + x.params.paginationProgressbarClass).transform("translate3d(0,0,0) scaleX(" + l + ") scaleY(" + d + ")").transition(x.params.speed)
                    }
                    "custom" === x.params.paginationType && x.params.paginationCustomRender && (x.paginationContainer.html(x.params.paginationCustomRender(x, s + 1, r)), x.emit("onPaginationRendered", x, x.paginationContainer[0]))
                }
                x.params.loop || (x.params.prevButton && x.prevButton && x.prevButton.length > 0 && (x.isBeginning ? (x.prevButton.addClass(x.params.buttonDisabledClass), x.params.a11y && x.a11y && x.a11y.disable(x.prevButton)) : (x.prevButton.removeClass(x.params.buttonDisabledClass), x.params.a11y && x.a11y && x.a11y.enable(x.prevButton))), x.params.nextButton && x.nextButton && x.nextButton.length > 0 && (x.isEnd ? (x.nextButton.addClass(x.params.buttonDisabledClass), x.params.a11y && x.a11y && x.a11y.disable(x.nextButton)) : (x.nextButton.removeClass(x.params.buttonDisabledClass), x.params.a11y && x.a11y && x.a11y.enable(x.nextButton))))
            }, x.updatePagination = function () {
                if (x.params.pagination && x.paginationContainer && x.paginationContainer.length > 0) {
                    var e = "";
                    if ("bullets" === x.params.paginationType) {
                        for (var t = x.params.loop ? Math.ceil((x.slides.length - 2 * x.loopedSlides) / x.params.slidesPerGroup) : x.snapGrid.length,
                                 i = 0; i < t; i++)e += x.params.paginationBulletRender ? x.params.paginationBulletRender(x, i, x.params.bulletClass) : "<" + x.params.paginationElement + ' class="' + x.params.bulletClass + '"></' + x.params.paginationElement + ">";
                        x.paginationContainer.html(e), x.bullets = x.paginationContainer.find("." + x.params.bulletClass), x.params.paginationClickable && x.params.a11y && x.a11y && x.a11y.initPagination()
                    }
                    "fraction" === x.params.paginationType && (e = x.params.paginationFractionRender ? x.params.paginationFractionRender(x, x.params.paginationCurrentClass, x.params.paginationTotalClass) : '<span class="' + x.params.paginationCurrentClass + '"></span> / <span class="' + x.params.paginationTotalClass + '"></span>', x.paginationContainer.html(e)), "progress" === x.params.paginationType && (e = x.params.paginationProgressRender ? x.params.paginationProgressRender(x, x.params.paginationProgressbarClass) : '<span class="' + x.params.paginationProgressbarClass + '"></span>', x.paginationContainer.html(e)), "custom" !== x.params.paginationType && x.emit("onPaginationRendered", x, x.paginationContainer[0])
                }
            }, x.update = function (e) {
                function t() {
                    x.rtl ? -x.translate : x.translate;
                    i = Math.min(Math.max(x.translate, x.maxTranslate()), x.minTranslate()), x.setWrapperTranslate(i), x.updateActiveIndex(), x.updateClasses()
                }

                if (x) {
                    x.updateContainerSize(), x.updateSlidesSize(), x.updateProgress(), x.updatePagination(), x.updateClasses(), x.params.scrollbar && x.scrollbar && x.scrollbar.set();
                    var i;
                    if (e) {
                        var a;
                        x.controller && x.controller.spline && (x.controller.spline = void 0), x.params.freeMode ? (t(), x.params.autoHeight && x.updateAutoHeight()) : (a = ("auto" === x.params.slidesPerView || x.params.slidesPerView > 1) && x.isEnd && !x.params.centeredSlides ? x.slideTo(x.slides.length - 1, 0, !1, !0) : x.slideTo(x.activeIndex, 0, !1, !0), a || t())
                    } else x.params.autoHeight && x.updateAutoHeight()
                }
            }, x.onResize = function (e) {
                x.params.onBeforeResize && x.params.onBeforeResize(x), x.params.breakpoints && x.setBreakpoint();
                var t = x.params.allowSwipeToPrev, i = x.params.allowSwipeToNext;
                x.params.allowSwipeToPrev = x.params.allowSwipeToNext = !0, x.updateContainerSize(), x.updateSlidesSize(), ("auto" === x.params.slidesPerView || x.params.freeMode || e) && x.updatePagination(), x.params.scrollbar && x.scrollbar && x.scrollbar.set(), x.controller && x.controller.spline && (x.controller.spline = void 0);
                var a = !1;
                if (x.params.freeMode) {
                    var n = Math.min(Math.max(x.translate, x.maxTranslate()), x.minTranslate());
                    x.setWrapperTranslate(n), x.updateActiveIndex(), x.updateClasses(), x.params.autoHeight && x.updateAutoHeight()
                } else x.updateClasses(), a = ("auto" === x.params.slidesPerView || x.params.slidesPerView > 1) && x.isEnd && !x.params.centeredSlides ? x.slideTo(x.slides.length - 1, 0, !1, !0) : x.slideTo(x.activeIndex, 0, !1, !0);
                x.params.lazyLoading && !a && x.lazy && x.lazy.load(), x.params.allowSwipeToPrev = t, x.params.allowSwipeToNext = i, x.params.onAfterResize && x.params.onAfterResize(x)
            }, x.touchEventsDesktop = {
                start: "mousedown",
                move: "mousemove",
                end: "mouseup"
            }, window.navigator.pointerEnabled ? x.touchEventsDesktop = {
                    start: "pointerdown",
                    move: "pointermove",
                    end: "pointerup"
                } : window.navigator.msPointerEnabled && (x.touchEventsDesktop = {
                    start: "MSPointerDown",
                    move: "MSPointerMove",
                    end: "MSPointerUp"
                }), x.touchEvents = {
                start: x.support.touch || !x.params.simulateTouch ? "touchstart" : x.touchEventsDesktop.start,
                move: x.support.touch || !x.params.simulateTouch ? "touchmove" : x.touchEventsDesktop.move,
                end: x.support.touch || !x.params.simulateTouch ? "touchend" : x.touchEventsDesktop.end
            }, (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && ("container" === x.params.touchEventsTarget ? x.container : x.wrapper).addClass("swiper-wp8-" + x.params.direction), x.initEvents = function (e) {
                var t = e ? "off" : "on", i = e ? "removeEventListener" : "addEventListener",
                    n = "container" === x.params.touchEventsTarget ? x.container[0] : x.wrapper[0],
                    s = x.support.touch ? n : document, r = !!x.params.nested;
                if (x.browser.ie) n[i](x.touchEvents.start, x.onTouchStart, !1), s[i](x.touchEvents.move, x.onTouchMove, r), s[i](x.touchEvents.end, x.onTouchEnd, !1); else {
                    if (x.support.touch) {
                        var o = !("touchstart" !== x.touchEvents.start || !x.support.passiveListener || !x.params.passiveListeners) && {
                                passive: !0,
                                capture: !1
                            };
                        n[i](x.touchEvents.start, x.onTouchStart, o), n[i](x.touchEvents.move, x.onTouchMove, r), n[i](x.touchEvents.end, x.onTouchEnd, o)
                    }
                    (a.simulateTouch && !x.device.ios && !x.device.android || a.simulateTouch && !x.support.touch && x.device.ios) && (n[i]("mousedown", x.onTouchStart, !1), document[i]("mousemove", x.onTouchMove, r), document[i]("mouseup", x.onTouchEnd, !1))
                }
                window[i]("resize", x.onResize), x.params.nextButton && x.nextButton && x.nextButton.length > 0 && (x.nextButton[t]("click", x.onClickNext), x.params.a11y && x.a11y && x.nextButton[t]("keydown", x.a11y.onEnterKey)), x.params.prevButton && x.prevButton && x.prevButton.length > 0 && (x.prevButton[t]("click", x.onClickPrev), x.params.a11y && x.a11y && x.prevButton[t]("keydown", x.a11y.onEnterKey)), x.params.pagination && x.params.paginationClickable && (x.paginationContainer[t]("click", "." + x.params.bulletClass, x.onClickIndex), x.params.a11y && x.a11y && x.paginationContainer[t]("keydown", "." + x.params.bulletClass, x.a11y.onEnterKey)), (x.params.preventClicks || x.params.preventClicksPropagation) && n[i]("click", x.preventClicks, !0)
            }, x.attachEvents = function () {
                x.initEvents()
            }, x.detachEvents = function () {
                x.initEvents(!0)
            }, x.allowClick = !0, x.preventClicks = function (e) {
                x.allowClick || (x.params.preventClicks && e.preventDefault(), x.params.preventClicksPropagation && x.animating && (e.stopPropagation(), e.stopImmediatePropagation()))
            }, x.onClickNext = function (e) {
                e.preventDefault(), x.isEnd && !x.params.loop || x.slideNext()
            }, x.onClickPrev = function (e) {
                e.preventDefault(), x.isBeginning && !x.params.loop || x.slidePrev()
            }, x.onClickIndex = function (e) {
                e.preventDefault();
                var i = t(this).index() * x.params.slidesPerGroup;
                x.params.loop && (i += x.loopedSlides), x.slideTo(i)
            }, x.updateClickedSlide = function (e) {
                var i = r(e, "." + x.params.slideClass), a = !1;
                if (i)for (var n = 0; n < x.slides.length; n++)x.slides[n] === i && (a = !0);
                if (!i || !a)return x.clickedSlide = void 0, void(x.clickedIndex = void 0);
                if (x.clickedSlide = i, x.clickedIndex = t(i).index(), x.params.slideToClickedSlide && void 0 !== x.clickedIndex && x.clickedIndex !== x.activeIndex) {
                    var s, o = x.clickedIndex,
                        l = "auto" === x.params.slidesPerView ? x.currentSlidesPerView() : x.params.slidesPerView;
                    if (x.params.loop) {
                        if (x.animating)return;
                        s = parseInt(t(x.clickedSlide).attr("data-swiper-slide-index"), 10), x.params.centeredSlides ? o < x.loopedSlides - l / 2 || o > x.slides.length - x.loopedSlides + l / 2 ? (x.fixLoop(), o = x.wrapper.children("." + x.params.slideClass + '[data-swiper-slide-index="' + s + '"]:not(.' + x.params.slideDuplicateClass + ")").eq(0).index(), setTimeout(function () {
                                    x.slideTo(o)
                                }, 0)) : x.slideTo(o) : o > x.slides.length - l ? (x.fixLoop(), o = x.wrapper.children("." + x.params.slideClass + '[data-swiper-slide-index="' + s + '"]:not(.' + x.params.slideDuplicateClass + ")").eq(0).index(), setTimeout(function () {
                                    x.slideTo(o)
                                }, 0)) : x.slideTo(o)
                    } else x.slideTo(o)
                }
            };
            var C, S, z, E, I, M, k, P, L, B, D = "input, select, textarea, button, video", _ = Date.now(), O = [];
            x.animating = !1, x.touches = {startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0};
            var H, A;
            x.onTouchStart = function (e) {
                if (e.originalEvent && (e = e.originalEvent), H = "touchstart" === e.type, H || !("which" in e) || 3 !== e.which) {
                    if (x.params.noSwiping && r(e, "." + x.params.noSwipingClass))return void(x.allowClick = !0);
                    if (!x.params.swipeHandler || r(e, x.params.swipeHandler)) {
                        var i = x.touches.currentX = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX,
                            a = x.touches.currentY = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY;
                        if (!(x.device.ios && x.params.iOSEdgeSwipeDetection && i <= x.params.iOSEdgeSwipeThreshold)) {
                            if (C = !0, S = !1, z = !0, I = void 0, A = void 0, x.touches.startX = i, x.touches.startY = a, E = Date.now(), x.allowClick = !0, x.updateContainerSize(), x.swipeDirection = void 0, x.params.threshold > 0 && (P = !1), "touchstart" !== e.type) {
                                var n = !0;
                                t(e.target).is(D) && (n = !1), document.activeElement && t(document.activeElement).is(D) && document.activeElement.blur(), n && e.preventDefault()
                            }
                            x.emit("onTouchStart", x, e)
                        }
                    }
                }
            }, x.onTouchMove = function (e) {
                if (e.originalEvent && (e = e.originalEvent), !H || "mousemove" !== e.type) {
                    if (e.preventedByNestedSwiper)return x.touches.startX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, void(x.touches.startY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY);
                    if (x.params.onlyExternal)return x.allowClick = !1, void(C && (x.touches.startX = x.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, x.touches.startY = x.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, E = Date.now()));
                    if (H && x.params.touchReleaseOnEdges && !x.params.loop)if (x.isHorizontal()) {
                        if (x.touches.currentX < x.touches.startX && x.translate <= x.maxTranslate() || x.touches.currentX > x.touches.startX && x.translate >= x.minTranslate())return
                    } else if (x.touches.currentY < x.touches.startY && x.translate <= x.maxTranslate() || x.touches.currentY > x.touches.startY && x.translate >= x.minTranslate())return;
                    if (H && document.activeElement && e.target === document.activeElement && t(e.target).is(D))return S = !0, void(x.allowClick = !1);
                    if (z && x.emit("onTouchMove", x, e), !(e.targetTouches && e.targetTouches.length > 1)) {
                        if (x.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, x.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, "undefined" == typeof I) {
                            var i;
                            x.isHorizontal() && x.touches.currentY === x.touches.startY || !x.isHorizontal() && x.touches.currentX === x.touches.startX ? I = !1 : (i = 180 * Math.atan2(Math.abs(x.touches.currentY - x.touches.startY), Math.abs(x.touches.currentX - x.touches.startX)) / Math.PI, I = x.isHorizontal() ? i > x.params.touchAngle : 90 - i > x.params.touchAngle)
                        }
                        if (I && x.emit("onTouchMoveOpposite", x, e), "undefined" == typeof A && (x.touches.currentX === x.touches.startX && x.touches.currentY === x.touches.startY || (A = !0)), C) {
                            if (I)return void(C = !1);
                            if (A) {
                                x.allowClick = !1, x.emit("onSliderMove", x, e), e.preventDefault(), x.params.touchMoveStopPropagation && !x.params.nested && e.stopPropagation(), S || (a.loop && x.fixLoop(), k = x.getWrapperTranslate(), x.setWrapperTransition(0), x.animating && x.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"), x.params.autoplay && x.autoplaying && (x.params.autoplayDisableOnInteraction ? x.stopAutoplay() : x.pauseAutoplay()), B = !1, !x.params.grabCursor || x.params.allowSwipeToNext !== !0 && x.params.allowSwipeToPrev !== !0 || x.setGrabCursor(!0)), S = !0;
                                var n = x.touches.diff = x.isHorizontal() ? x.touches.currentX - x.touches.startX : x.touches.currentY - x.touches.startY;
                                n *= x.params.touchRatio, x.rtl && (n = -n), x.swipeDirection = n > 0 ? "prev" : "next", M = n + k;
                                var s = !0;
                                if (n > 0 && M > x.minTranslate() ? (s = !1, x.params.resistance && (M = x.minTranslate() - 1 + Math.pow(-x.minTranslate() + k + n, x.params.resistanceRatio))) : n < 0 && M < x.maxTranslate() && (s = !1, x.params.resistance && (M = x.maxTranslate() + 1 - Math.pow(x.maxTranslate() - k - n, x.params.resistanceRatio))), s && (e.preventedByNestedSwiper = !0), !x.params.allowSwipeToNext && "next" === x.swipeDirection && M < k && (M = k), !x.params.allowSwipeToPrev && "prev" === x.swipeDirection && M > k && (M = k), x.params.threshold > 0) {
                                    if (!(Math.abs(n) > x.params.threshold || P))return void(M = k);
                                    if (!P)return P = !0, x.touches.startX = x.touches.currentX, x.touches.startY = x.touches.currentY, M = k, void(x.touches.diff = x.isHorizontal() ? x.touches.currentX - x.touches.startX : x.touches.currentY - x.touches.startY)
                                }
                                x.params.followFinger && ((x.params.freeMode || x.params.watchSlidesProgress) && x.updateActiveIndex(), x.params.freeMode && (0 === O.length && O.push({
                                    position: x.touches[x.isHorizontal() ? "startX" : "startY"],
                                    time: E
                                }), O.push({
                                    position: x.touches[x.isHorizontal() ? "currentX" : "currentY"],
                                    time: (new window.Date).getTime()
                                })), x.updateProgress(M), x.setWrapperTranslate(M))
                            }
                        }
                    }
                }
            }, x.onTouchEnd = function (e) {
                if (e.originalEvent && (e = e.originalEvent), z && x.emit("onTouchEnd", x, e), z = !1, C) {
                    x.params.grabCursor && S && C && (x.params.allowSwipeToNext === !0 || x.params.allowSwipeToPrev === !0) && x.setGrabCursor(!1);
                    var i = Date.now(), a = i - E;
                    if (x.allowClick && (x.updateClickedSlide(e), x.emit("onTap", x, e), a < 300 && i - _ > 300 && (L && clearTimeout(L), L = setTimeout(function () {
                            x && (x.params.paginationHide && x.paginationContainer.length > 0 && !t(e.target).hasClass(x.params.bulletClass) && x.paginationContainer.toggleClass(x.params.paginationHiddenClass), x.emit("onClick", x, e))
                        }, 300)), a < 300 && i - _ < 300 && (L && clearTimeout(L), x.emit("onDoubleTap", x, e))), _ = Date.now(), setTimeout(function () {
                            x && (x.allowClick = !0);
                        }, 0), !C || !S || !x.swipeDirection || 0 === x.touches.diff || M === k)return void(C = S = !1);
                    C = S = !1;
                    var n;
                    if (n = x.params.followFinger ? x.rtl ? x.translate : -x.translate : -M, x.params.freeMode) {
                        if (n < -x.minTranslate())return void x.slideTo(x.activeIndex);
                        if (n > -x.maxTranslate())return void(x.slides.length < x.snapGrid.length ? x.slideTo(x.snapGrid.length - 1) : x.slideTo(x.slides.length - 1));
                        if (x.params.freeModeMomentum) {
                            if (O.length > 1) {
                                var s = O.pop(), r = O.pop(), o = s.position - r.position, l = s.time - r.time;
                                x.velocity = o / l, x.velocity = x.velocity / 2, Math.abs(x.velocity) < x.params.freeModeMinimumVelocity && (x.velocity = 0), (l > 150 || (new window.Date).getTime() - s.time > 300) && (x.velocity = 0)
                            } else x.velocity = 0;
                            x.velocity = x.velocity * x.params.freeModeMomentumVelocityRatio, O.length = 0;
                            var d = 1e3 * x.params.freeModeMomentumRatio, p = x.velocity * d, u = x.translate + p;
                            x.rtl && (u = -u);
                            var c, m = !1, h = 20 * Math.abs(x.velocity) * x.params.freeModeMomentumBounceRatio;
                            if (u < x.maxTranslate()) x.params.freeModeMomentumBounce ? (u + x.maxTranslate() < -h && (u = x.maxTranslate() - h), c = x.maxTranslate(), m = !0, B = !0) : u = x.maxTranslate(); else if (u > x.minTranslate()) x.params.freeModeMomentumBounce ? (u - x.minTranslate() > h && (u = x.minTranslate() + h), c = x.minTranslate(), m = !0, B = !0) : u = x.minTranslate(); else if (x.params.freeModeSticky) {
                                var f, g = 0;
                                for (g = 0; g < x.snapGrid.length; g += 1)if (x.snapGrid[g] > -u) {
                                    f = g;
                                    break
                                }
                                u = Math.abs(x.snapGrid[f] - u) < Math.abs(x.snapGrid[f - 1] - u) || "next" === x.swipeDirection ? x.snapGrid[f] : x.snapGrid[f - 1], x.rtl || (u = -u)
                            }
                            if (0 !== x.velocity) d = x.rtl ? Math.abs((-u - x.translate) / x.velocity) : Math.abs((u - x.translate) / x.velocity); else if (x.params.freeModeSticky)return void x.slideReset();
                            x.params.freeModeMomentumBounce && m ? (x.updateProgress(c), x.setWrapperTransition(d), x.setWrapperTranslate(u), x.onTransitionStart(), x.animating = !0, x.wrapper.transitionEnd(function () {
                                    x && B && (x.emit("onMomentumBounce", x), x.setWrapperTransition(x.params.speed), x.setWrapperTranslate(c), x.wrapper.transitionEnd(function () {
                                        x && x.onTransitionEnd()
                                    }))
                                })) : x.velocity ? (x.updateProgress(u), x.setWrapperTransition(d), x.setWrapperTranslate(u), x.onTransitionStart(), x.animating || (x.animating = !0, x.wrapper.transitionEnd(function () {
                                        x && x.onTransitionEnd()
                                    }))) : x.updateProgress(u), x.updateActiveIndex()
                        }
                        return void((!x.params.freeModeMomentum || a >= x.params.longSwipesMs) && (x.updateProgress(), x.updateActiveIndex()))
                    }
                    var v, y = 0, w = x.slidesSizesGrid[0];
                    for (v = 0; v < x.slidesGrid.length; v += x.params.slidesPerGroup)"undefined" != typeof x.slidesGrid[v + x.params.slidesPerGroup] ? n >= x.slidesGrid[v] && n < x.slidesGrid[v + x.params.slidesPerGroup] && (y = v, w = x.slidesGrid[v + x.params.slidesPerGroup] - x.slidesGrid[v]) : n >= x.slidesGrid[v] && (y = v, w = x.slidesGrid[x.slidesGrid.length - 1] - x.slidesGrid[x.slidesGrid.length - 2]);
                    var b = (n - x.slidesGrid[y]) / w;
                    if (a > x.params.longSwipesMs) {
                        if (!x.params.longSwipes)return void x.slideTo(x.activeIndex);
                        "next" === x.swipeDirection && (b >= x.params.longSwipesRatio ? x.slideTo(y + x.params.slidesPerGroup) : x.slideTo(y)), "prev" === x.swipeDirection && (b > 1 - x.params.longSwipesRatio ? x.slideTo(y + x.params.slidesPerGroup) : x.slideTo(y))
                    } else {
                        if (!x.params.shortSwipes)return void x.slideTo(x.activeIndex);
                        "next" === x.swipeDirection && x.slideTo(y + x.params.slidesPerGroup), "prev" === x.swipeDirection && x.slideTo(y)
                    }
                }
            }, x._slideTo = function (e, t) {
                return x.slideTo(e, t, !0, !0)
            }, x.slideTo = function (e, t, i, a) {
                "undefined" == typeof i && (i = !0), "undefined" == typeof e && (e = 0), e < 0 && (e = 0), x.snapIndex = Math.floor(e / x.params.slidesPerGroup), x.snapIndex >= x.snapGrid.length && (x.snapIndex = x.snapGrid.length - 1);
                var n = -x.snapGrid[x.snapIndex];
                if (x.params.autoplay && x.autoplaying && (a || !x.params.autoplayDisableOnInteraction ? x.pauseAutoplay(t) : x.stopAutoplay()), x.updateProgress(n), x.params.normalizeSlideIndex)for (var s = 0; s < x.slidesGrid.length; s++)-Math.floor(100 * n) >= Math.floor(100 * x.slidesGrid[s]) && (e = s);
                return !(!x.params.allowSwipeToNext && n < x.translate && n < x.minTranslate()) && (!(!x.params.allowSwipeToPrev && n > x.translate && n > x.maxTranslate() && (x.activeIndex || 0) !== e) && ("undefined" == typeof t && (t = x.params.speed), x.previousIndex = x.activeIndex || 0, x.activeIndex = e, x.updateRealIndex(), x.rtl && -n === x.translate || !x.rtl && n === x.translate ? (x.params.autoHeight && x.updateAutoHeight(), x.updateClasses(), "slide" !== x.params.effect && x.setWrapperTranslate(n), !1) : (x.updateClasses(), x.onTransitionStart(i), 0 === t || x.browser.lteIE9 ? (x.setWrapperTranslate(n), x.setWrapperTransition(0), x.onTransitionEnd(i)) : (x.setWrapperTranslate(n), x.setWrapperTransition(t), x.animating || (x.animating = !0, x.wrapper.transitionEnd(function () {
                                x && x.onTransitionEnd(i)
                            }))), !0)))
            }, x.onTransitionStart = function (e) {
                "undefined" == typeof e && (e = !0), x.params.autoHeight && x.updateAutoHeight(), x.lazy && x.lazy.onTransitionStart(), e && (x.emit("onTransitionStart", x), x.activeIndex !== x.previousIndex && (x.emit("onSlideChangeStart", x), x.activeIndex > x.previousIndex ? x.emit("onSlideNextStart", x) : x.emit("onSlidePrevStart", x)))
            }, x.onTransitionEnd = function (e) {
                x.animating = !1, x.setWrapperTransition(0), "undefined" == typeof e && (e = !0), x.lazy && x.lazy.onTransitionEnd(), e && (x.emit("onTransitionEnd", x), x.activeIndex !== x.previousIndex && (x.emit("onSlideChangeEnd", x), x.activeIndex > x.previousIndex ? x.emit("onSlideNextEnd", x) : x.emit("onSlidePrevEnd", x))), x.params.history && x.history && x.history.setHistory(x.params.history, x.activeIndex), x.params.hashnav && x.hashnav && x.hashnav.setHash()
            }, x.slideNext = function (e, t, i) {
                if (x.params.loop) {
                    if (x.animating)return !1;
                    x.fixLoop();
                    x.container[0].clientLeft;
                    return x.slideTo(x.activeIndex + x.params.slidesPerGroup, t, e, i)
                }
                return x.slideTo(x.activeIndex + x.params.slidesPerGroup, t, e, i)
            }, x._slideNext = function (e) {
                return x.slideNext(!0, e, !0)
            }, x.slidePrev = function (e, t, i) {
                if (x.params.loop) {
                    if (x.animating)return !1;
                    x.fixLoop();
                    x.container[0].clientLeft;
                    return x.slideTo(x.activeIndex - 1, t, e, i)
                }
                return x.slideTo(x.activeIndex - 1, t, e, i)
            }, x._slidePrev = function (e) {
                return x.slidePrev(!0, e, !0)
            }, x.slideReset = function (e, t, i) {
                return x.slideTo(x.activeIndex, t, e)
            }, x.disableTouchControl = function () {
                return x.params.onlyExternal = !0, !0
            }, x.enableTouchControl = function () {
                return x.params.onlyExternal = !1, !0
            }, x.setWrapperTransition = function (e, t) {
                x.wrapper.transition(e), "slide" !== x.params.effect && x.effects[x.params.effect] && x.effects[x.params.effect].setTransition(e), x.params.parallax && x.parallax && x.parallax.setTransition(e), x.params.scrollbar && x.scrollbar && x.scrollbar.setTransition(e), x.params.control && x.controller && x.controller.setTransition(e, t), x.emit("onSetTransition", x, e)
            }, x.setWrapperTranslate = function (e, t, i) {
                var a = 0, s = 0, r = 0;
                x.isHorizontal() ? a = x.rtl ? -e : e : s = e, x.params.roundLengths && (a = n(a), s = n(s)), x.params.virtualTranslate || (x.support.transforms3d ? x.wrapper.transform("translate3d(" + a + "px, " + s + "px, " + r + "px)") : x.wrapper.transform("translate(" + a + "px, " + s + "px)")), x.translate = x.isHorizontal() ? a : s;
                var o, l = x.maxTranslate() - x.minTranslate();
                o = 0 === l ? 0 : (e - x.minTranslate()) / l, o !== x.progress && x.updateProgress(e), t && x.updateActiveIndex(), "slide" !== x.params.effect && x.effects[x.params.effect] && x.effects[x.params.effect].setTranslate(x.translate), x.params.parallax && x.parallax && x.parallax.setTranslate(x.translate), x.params.scrollbar && x.scrollbar && x.scrollbar.setTranslate(x.translate), x.params.control && x.controller && x.controller.setTranslate(x.translate, i), x.emit("onSetTranslate", x, x.translate)
            }, x.getTranslate = function (e, t) {
                var i, a, n, s;
                return "undefined" == typeof t && (t = "x"), x.params.virtualTranslate ? x.rtl ? -x.translate : x.translate : (n = window.getComputedStyle(e, null), window.WebKitCSSMatrix ? (a = n.transform || n.webkitTransform, a.split(",").length > 6 && (a = a.split(", ").map(function (e) {
                            return e.replace(",", ".")
                        }).join(", ")), s = new window.WebKitCSSMatrix("none" === a ? "" : a)) : (s = n.MozTransform || n.OTransform || n.MsTransform || n.msTransform || n.transform || n.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), i = s.toString().split(",")), "x" === t && (a = window.WebKitCSSMatrix ? s.m41 : 16 === i.length ? parseFloat(i[12]) : parseFloat(i[4])), "y" === t && (a = window.WebKitCSSMatrix ? s.m42 : 16 === i.length ? parseFloat(i[13]) : parseFloat(i[5])), x.rtl && a && (a = -a), a || 0)
            }, x.getWrapperTranslate = function (e) {
                return "undefined" == typeof e && (e = x.isHorizontal() ? "x" : "y"), x.getTranslate(x.wrapper[0], e)
            }, x.observers = [], x.initObservers = function () {
                if (x.params.observeParents)for (var e = x.container.parents(), t = 0; t < e.length; t++)o(e[t]);
                o(x.container[0], {childList: !1}), o(x.wrapper[0], {attributes: !1})
            }, x.disconnectObservers = function () {
                for (var e = 0; e < x.observers.length; e++)x.observers[e].disconnect();
                x.observers = []
            }, x.createLoop = function () {
                x.wrapper.children("." + x.params.slideClass + "." + x.params.slideDuplicateClass).remove();
                var e = x.wrapper.children("." + x.params.slideClass);
                "auto" !== x.params.slidesPerView || x.params.loopedSlides || (x.params.loopedSlides = e.length), x.loopedSlides = parseInt(x.params.loopedSlides || x.params.slidesPerView, 10), x.loopedSlides = x.loopedSlides + x.params.loopAdditionalSlides, x.loopedSlides > e.length && (x.loopedSlides = e.length);
                var i, a = [], n = [];
                for (e.each(function (i, s) {
                    var r = t(this);
                    i < x.loopedSlides && n.push(s), i < e.length && i >= e.length - x.loopedSlides && a.push(s), r.attr("data-swiper-slide-index", i)
                }), i = 0; i < n.length; i++)x.wrapper.append(t(n[i].cloneNode(!0)).addClass(x.params.slideDuplicateClass));
                for (i = a.length - 1; i >= 0; i--)x.wrapper.prepend(t(a[i].cloneNode(!0)).addClass(x.params.slideDuplicateClass))
            }, x.destroyLoop = function () {
                x.wrapper.children("." + x.params.slideClass + "." + x.params.slideDuplicateClass).remove(), x.slides.removeAttr("data-swiper-slide-index")
            }, x.reLoop = function (e) {
                var t = x.activeIndex - x.loopedSlides;
                x.destroyLoop(), x.createLoop(), x.updateSlidesSize(), e && x.slideTo(t + x.loopedSlides, 0, !1)
            }, x.fixLoop = function () {
                var e;
                x.activeIndex < x.loopedSlides ? (e = x.slides.length - 3 * x.loopedSlides + x.activeIndex, e += x.loopedSlides, x.slideTo(e, 0, !1, !0)) : ("auto" === x.params.slidesPerView && x.activeIndex >= 2 * x.loopedSlides || x.activeIndex > x.slides.length - 2 * x.params.slidesPerView) && (e = -x.slides.length + x.activeIndex + x.loopedSlides, e += x.loopedSlides, x.slideTo(e, 0, !1, !0))
            }, x.appendSlide = function (e) {
                if (x.params.loop && x.destroyLoop(), "object" == typeof e && e.length)for (var t = 0; t < e.length; t++)e[t] && x.wrapper.append(e[t]); else x.wrapper.append(e);
                x.params.loop && x.createLoop(), x.params.observer && x.support.observer || x.update(!0)
            }, x.prependSlide = function (e) {
                x.params.loop && x.destroyLoop();
                var t = x.activeIndex + 1;
                if ("object" == typeof e && e.length) {
                    for (var i = 0; i < e.length; i++)e[i] && x.wrapper.prepend(e[i]);
                    t = x.activeIndex + e.length
                } else x.wrapper.prepend(e);
                x.params.loop && x.createLoop(), x.params.observer && x.support.observer || x.update(!0), x.slideTo(t, 0, !1)
            }, x.removeSlide = function (e) {
                x.params.loop && (x.destroyLoop(), x.slides = x.wrapper.children("." + x.params.slideClass));
                var t, i = x.activeIndex;
                if ("object" == typeof e && e.length) {
                    for (var a = 0; a < e.length; a++)t = e[a], x.slides[t] && x.slides.eq(t).remove(), t < i && i--;
                    i = Math.max(i, 0)
                } else t = e, x.slides[t] && x.slides.eq(t).remove(), t < i && i--, i = Math.max(i, 0);
                x.params.loop && x.createLoop(), x.params.observer && x.support.observer || x.update(!0), x.params.loop ? x.slideTo(i + x.loopedSlides, 0, !1) : x.slideTo(i, 0, !1)
            }, x.removeAllSlides = function () {
                for (var e = [], t = 0; t < x.slides.length; t++)e.push(t);
                x.removeSlide(e)
            }, x.effects = {
                fade: {
                    setTranslate: function () {
                        for (var e = 0; e < x.slides.length; e++) {
                            var t = x.slides.eq(e), i = t[0].swiperSlideOffset, a = -i;
                            x.params.virtualTranslate || (a -= x.translate);
                            var n = 0;
                            x.isHorizontal() || (n = a, a = 0);
                            var s = x.params.fade.crossFade ? Math.max(1 - Math.abs(t[0].progress), 0) : 1 + Math.min(Math.max(t[0].progress, -1), 0);
                            t.css({opacity: s}).transform("translate3d(" + a + "px, " + n + "px, 0px)")
                        }
                    }, setTransition: function (e) {
                        if (x.slides.transition(e), x.params.virtualTranslate && 0 !== e) {
                            var t = !1;
                            x.slides.transitionEnd(function () {
                                if (!t && x) {
                                    t = !0, x.animating = !1;
                                    for (var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
                                             i = 0; i < e.length; i++)x.wrapper.trigger(e[i])
                                }
                            })
                        }
                    }
                }, flip: {
                    setTranslate: function () {
                        for (var e = 0; e < x.slides.length; e++) {
                            var i = x.slides.eq(e), a = i[0].progress;
                            x.params.flip.limitRotation && (a = Math.max(Math.min(i[0].progress, 1), -1));
                            var n = i[0].swiperSlideOffset, s = -180 * a, r = s, o = 0, l = -n, d = 0;
                            if (x.isHorizontal() ? x.rtl && (r = -r) : (d = l, l = 0, o = -r, r = 0), i[0].style.zIndex = -Math.abs(Math.round(a)) + x.slides.length, x.params.flip.slideShadows) {
                                var p = x.isHorizontal() ? i.find(".swiper-slide-shadow-left") : i.find(".swiper-slide-shadow-top"),
                                    u = x.isHorizontal() ? i.find(".swiper-slide-shadow-right") : i.find(".swiper-slide-shadow-bottom");
                                0 === p.length && (p = t('<div class="swiper-slide-shadow-' + (x.isHorizontal() ? "left" : "top") + '"></div>'), i.append(p)), 0 === u.length && (u = t('<div class="swiper-slide-shadow-' + (x.isHorizontal() ? "right" : "bottom") + '"></div>'), i.append(u)), p.length && (p[0].style.opacity = Math.max(-a, 0)), u.length && (u[0].style.opacity = Math.max(a, 0))
                            }
                            i.transform("translate3d(" + l + "px, " + d + "px, 0px) rotateX(" + o + "deg) rotateY(" + r + "deg)")
                        }
                    }, setTransition: function (e) {
                        if (x.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), x.params.virtualTranslate && 0 !== e) {
                            var i = !1;
                            x.slides.eq(x.activeIndex).transitionEnd(function () {
                                if (!i && x && t(this).hasClass(x.params.slideActiveClass)) {
                                    i = !0, x.animating = !1;
                                    for (var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
                                             a = 0; a < e.length; a++)x.wrapper.trigger(e[a])
                                }
                            })
                        }
                    }
                }, cube: {
                    setTranslate: function () {
                        var e, i = 0;
                        x.params.cube.shadow && (x.isHorizontal() ? (e = x.wrapper.find(".swiper-cube-shadow"), 0 === e.length && (e = t('<div class="swiper-cube-shadow"></div>'), x.wrapper.append(e)), e.css({height: x.width + "px"})) : (e = x.container.find(".swiper-cube-shadow"), 0 === e.length && (e = t('<div class="swiper-cube-shadow"></div>'), x.container.append(e))));
                        for (var a = 0; a < x.slides.length; a++) {
                            var n = x.slides.eq(a), s = 90 * a, r = Math.floor(s / 360);
                            x.rtl && (s = -s, r = Math.floor(-s / 360));
                            var o = Math.max(Math.min(n[0].progress, 1), -1), l = 0, d = 0, p = 0;
                            a % 4 === 0 ? (l = 4 * -r * x.size, p = 0) : (a - 1) % 4 === 0 ? (l = 0, p = 4 * -r * x.size) : (a - 2) % 4 === 0 ? (l = x.size + 4 * r * x.size, p = x.size) : (a - 3) % 4 === 0 && (l = -x.size, p = 3 * x.size + 4 * x.size * r), x.rtl && (l = -l), x.isHorizontal() || (d = l, l = 0);
                            var u = "rotateX(" + (x.isHorizontal() ? 0 : -s) + "deg) rotateY(" + (x.isHorizontal() ? s : 0) + "deg) translate3d(" + l + "px, " + d + "px, " + p + "px)";
                            if (o <= 1 && o > -1 && (i = 90 * a + 90 * o, x.rtl && (i = 90 * -a - 90 * o)), n.transform(u), x.params.cube.slideShadows) {
                                var c = x.isHorizontal() ? n.find(".swiper-slide-shadow-left") : n.find(".swiper-slide-shadow-top"),
                                    m = x.isHorizontal() ? n.find(".swiper-slide-shadow-right") : n.find(".swiper-slide-shadow-bottom");
                                0 === c.length && (c = t('<div class="swiper-slide-shadow-' + (x.isHorizontal() ? "left" : "top") + '"></div>'), n.append(c)), 0 === m.length && (m = t('<div class="swiper-slide-shadow-' + (x.isHorizontal() ? "right" : "bottom") + '"></div>'), n.append(m)), c.length && (c[0].style.opacity = Math.max(-o, 0)), m.length && (m[0].style.opacity = Math.max(o, 0))
                            }
                        }
                        if (x.wrapper.css({
                                "-webkit-transform-origin": "50% 50% -" + x.size / 2 + "px",
                                "-moz-transform-origin": "50% 50% -" + x.size / 2 + "px",
                                "-ms-transform-origin": "50% 50% -" + x.size / 2 + "px",
                                "transform-origin": "50% 50% -" + x.size / 2 + "px"
                            }), x.params.cube.shadow)if (x.isHorizontal()) e.transform("translate3d(0px, " + (x.width / 2 + x.params.cube.shadowOffset) + "px, " + -x.width / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + x.params.cube.shadowScale + ")"); else {
                            var h = Math.abs(i) - 90 * Math.floor(Math.abs(i) / 90),
                                f = 1.5 - (Math.sin(2 * h * Math.PI / 360) / 2 + Math.cos(2 * h * Math.PI / 360) / 2),
                                g = x.params.cube.shadowScale, v = x.params.cube.shadowScale / f,
                                y = x.params.cube.shadowOffset;
                            e.transform("scale3d(" + g + ", 1, " + v + ") translate3d(0px, " + (x.height / 2 + y) + "px, " + -x.height / 2 / v + "px) rotateX(-90deg)")
                        }
                        var w = x.isSafari || x.isUiWebView ? -x.size / 2 : 0;
                        x.wrapper.transform("translate3d(0px,0," + w + "px) rotateX(" + (x.isHorizontal() ? 0 : i) + "deg) rotateY(" + (x.isHorizontal() ? -i : 0) + "deg)")
                    }, setTransition: function (e) {
                        x.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), x.params.cube.shadow && !x.isHorizontal() && x.container.find(".swiper-cube-shadow").transition(e)
                    }
                }, coverflow: {
                    setTranslate: function () {
                        for (var e = x.translate, i = x.isHorizontal() ? -e + x.width / 2 : -e + x.height / 2,
                                 a = x.isHorizontal() ? x.params.coverflow.rotate : -x.params.coverflow.rotate,
                                 n = x.params.coverflow.depth, s = 0, r = x.slides.length; s < r; s++) {
                            var o = x.slides.eq(s), l = x.slidesSizesGrid[s], d = o[0].swiperSlideOffset,
                                p = (i - d - l / 2) / l * x.params.coverflow.modifier, u = x.isHorizontal() ? a * p : 0,
                                c = x.isHorizontal() ? 0 : a * p, m = -n * Math.abs(p),
                                h = x.isHorizontal() ? 0 : x.params.coverflow.stretch * p,
                                f = x.isHorizontal() ? x.params.coverflow.stretch * p : 0;
                            Math.abs(f) < .001 && (f = 0), Math.abs(h) < .001 && (h = 0), Math.abs(m) < .001 && (m = 0), Math.abs(u) < .001 && (u = 0), Math.abs(c) < .001 && (c = 0);
                            var g = "translate3d(" + f + "px," + h + "px," + m + "px)  rotateX(" + c + "deg) rotateY(" + u + "deg)";
                            if (o.transform(g), o[0].style.zIndex = -Math.abs(Math.round(p)) + 1, x.params.coverflow.slideShadows) {
                                var v = x.isHorizontal() ? o.find(".swiper-slide-shadow-left") : o.find(".swiper-slide-shadow-top"),
                                    y = x.isHorizontal() ? o.find(".swiper-slide-shadow-right") : o.find(".swiper-slide-shadow-bottom");
                                0 === v.length && (v = t('<div class="swiper-slide-shadow-' + (x.isHorizontal() ? "left" : "top") + '"></div>'), o.append(v)), 0 === y.length && (y = t('<div class="swiper-slide-shadow-' + (x.isHorizontal() ? "right" : "bottom") + '"></div>'), o.append(y)), v.length && (v[0].style.opacity = p > 0 ? p : 0), y.length && (y[0].style.opacity = -p > 0 ? -p : 0)
                            }
                        }
                        if (x.browser.ie) {
                            var w = x.wrapper[0].style;
                            w.perspectiveOrigin = i + "px 50%"
                        }
                    }, setTransition: function (e) {
                        x.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
                    }
                }
            }, x.lazy = {
                initialImageLoaded: !1, loadImageInSlide: function (e, i) {
                    if ("undefined" != typeof e && ("undefined" == typeof i && (i = !0), 0 !== x.slides.length)) {
                        var a = x.slides.eq(e),
                            n = a.find("." + x.params.lazyLoadingClass + ":not(." + x.params.lazyStatusLoadedClass + "):not(." + x.params.lazyStatusLoadingClass + ")");
                        !a.hasClass(x.params.lazyLoadingClass) || a.hasClass(x.params.lazyStatusLoadedClass) || a.hasClass(x.params.lazyStatusLoadingClass) || (n = n.add(a[0])), 0 !== n.length && n.each(function () {
                            var e = t(this);
                            e.addClass(x.params.lazyStatusLoadingClass);
                            var n = e.attr("data-background"), s = e.attr("data-src"), r = e.attr("data-srcset"),
                                o = e.attr("data-sizes");
                            x.loadImage(e[0], s || n, r, o, !1, function () {
                                if ("undefined" != typeof x && null !== x && x) {
                                    if (n ? (e.css("background-image", 'url("' + n + '")'), e.removeAttr("data-background")) : (r && (e.attr("srcset", r), e.removeAttr("data-srcset")), o && (e.attr("sizes", o), e.removeAttr("data-sizes")), s && (e.attr("src", s), e.removeAttr("data-src"))), e.addClass(x.params.lazyStatusLoadedClass).removeClass(x.params.lazyStatusLoadingClass), a.find("." + x.params.lazyPreloaderClass + ", ." + x.params.preloaderClass).remove(), x.params.loop && i) {
                                        var t = a.attr("data-swiper-slide-index");
                                        if (a.hasClass(x.params.slideDuplicateClass)) {
                                            var l = x.wrapper.children('[data-swiper-slide-index="' + t + '"]:not(.' + x.params.slideDuplicateClass + ")");
                                            x.lazy.loadImageInSlide(l.index(), !1)
                                        } else {
                                            var d = x.wrapper.children("." + x.params.slideDuplicateClass + '[data-swiper-slide-index="' + t + '"]');
                                            x.lazy.loadImageInSlide(d.index(), !1)
                                        }
                                    }
                                    x.emit("onLazyImageReady", x, a[0], e[0])
                                }
                            }), x.emit("onLazyImageLoad", x, a[0], e[0])
                        })
                    }
                }, load: function () {
                    var e, i = x.params.slidesPerView;
                    if ("auto" === i && (i = 0), x.lazy.initialImageLoaded || (x.lazy.initialImageLoaded = !0), x.params.watchSlidesVisibility) x.wrapper.children("." + x.params.slideVisibleClass).each(function () {
                        x.lazy.loadImageInSlide(t(this).index())
                    }); else if (i > 1)for (e = x.activeIndex; e < x.activeIndex + i; e++)x.slides[e] && x.lazy.loadImageInSlide(e); else x.lazy.loadImageInSlide(x.activeIndex);
                    if (x.params.lazyLoadingInPrevNext)if (i > 1 || x.params.lazyLoadingInPrevNextAmount && x.params.lazyLoadingInPrevNextAmount > 1) {
                        var a = x.params.lazyLoadingInPrevNextAmount, n = i,
                            s = Math.min(x.activeIndex + n + Math.max(a, n), x.slides.length),
                            r = Math.max(x.activeIndex - Math.max(n, a), 0);
                        for (e = x.activeIndex + i; e < s; e++)x.slides[e] && x.lazy.loadImageInSlide(e);
                        for (e = r; e < x.activeIndex; e++)x.slides[e] && x.lazy.loadImageInSlide(e)
                    } else {
                        var o = x.wrapper.children("." + x.params.slideNextClass);
                        o.length > 0 && x.lazy.loadImageInSlide(o.index());
                        var l = x.wrapper.children("." + x.params.slidePrevClass);
                        l.length > 0 && x.lazy.loadImageInSlide(l.index())
                    }
                }, onTransitionStart: function () {
                    x.params.lazyLoading && (x.params.lazyLoadingOnTransitionStart || !x.params.lazyLoadingOnTransitionStart && !x.lazy.initialImageLoaded) && x.lazy.load()
                }, onTransitionEnd: function () {
                    x.params.lazyLoading && !x.params.lazyLoadingOnTransitionStart && x.lazy.load()
                }
            }, x.scrollbar = {
                isTouched: !1, setDragPosition: function (e) {
                    var t = x.scrollbar,
                        i = x.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY,
                        a = i - t.track.offset()[x.isHorizontal() ? "left" : "top"] - t.dragSize / 2,
                        n = -x.minTranslate() * t.moveDivider, s = -x.maxTranslate() * t.moveDivider;
                    a < n ? a = n : a > s && (a = s), a = -a / t.moveDivider, x.updateProgress(a), x.setWrapperTranslate(a, !0)
                }, dragStart: function (e) {
                    var t = x.scrollbar;
                    t.isTouched = !0, e.preventDefault(), e.stopPropagation(), t.setDragPosition(e), clearTimeout(t.dragTimeout), t.track.transition(0), x.params.scrollbarHide && t.track.css("opacity", 1), x.wrapper.transition(100), t.drag.transition(100), x.emit("onScrollbarDragStart", x)
                }, dragMove: function (e) {
                    var t = x.scrollbar;
                    t.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, t.setDragPosition(e), x.wrapper.transition(0), t.track.transition(0), t.drag.transition(0), x.emit("onScrollbarDragMove", x))
                }, dragEnd: function (e) {
                    var t = x.scrollbar;
                    t.isTouched && (t.isTouched = !1, x.params.scrollbarHide && (clearTimeout(t.dragTimeout), t.dragTimeout = setTimeout(function () {
                        t.track.css("opacity", 0), t.track.transition(400)
                    }, 1e3)), x.emit("onScrollbarDragEnd", x), x.params.scrollbarSnapOnRelease && x.slideReset())
                }, draggableEvents: function () {
                    return x.params.simulateTouch !== !1 || x.support.touch ? x.touchEvents : x.touchEventsDesktop
                }(), enableDraggable: function () {
                    var e = x.scrollbar, i = x.support.touch ? e.track : document;
                    t(e.track).on(e.draggableEvents.start, e.dragStart), t(i).on(e.draggableEvents.move, e.dragMove), t(i).on(e.draggableEvents.end, e.dragEnd)
                }, disableDraggable: function () {
                    var e = x.scrollbar, i = x.support.touch ? e.track : document;
                    t(e.track).off(e.draggableEvents.start, e.dragStart), t(i).off(e.draggableEvents.move, e.dragMove), t(i).off(e.draggableEvents.end, e.dragEnd)
                }, set: function () {
                    if (x.params.scrollbar) {
                        var e = x.scrollbar;
                        e.track = t(x.params.scrollbar), x.params.uniqueNavElements && "string" == typeof x.params.scrollbar && e.track.length > 1 && 1 === x.container.find(x.params.scrollbar).length && (e.track = x.container.find(x.params.scrollbar)), e.drag = e.track.find(".swiper-scrollbar-drag"), 0 === e.drag.length && (e.drag = t('<div class="swiper-scrollbar-drag"></div>'), e.track.append(e.drag)), e.drag[0].style.width = "", e.drag[0].style.height = "", e.trackSize = x.isHorizontal() ? e.track[0].offsetWidth : e.track[0].offsetHeight, e.divider = x.size / x.virtualSize, e.moveDivider = e.divider * (e.trackSize / x.size), e.dragSize = e.trackSize * e.divider, x.isHorizontal() ? e.drag[0].style.width = e.dragSize + "px" : e.drag[0].style.height = e.dragSize + "px", e.divider >= 1 ? e.track[0].style.display = "none" : e.track[0].style.display = "", x.params.scrollbarHide && (e.track[0].style.opacity = 0)
                    }
                }, setTranslate: function () {
                    if (x.params.scrollbar) {
                        var e, t = x.scrollbar, i = (x.translate || 0, t.dragSize);
                        e = (t.trackSize - t.dragSize) * x.progress, x.rtl && x.isHorizontal() ? (e = -e, e > 0 ? (i = t.dragSize - e, e = 0) : -e + t.dragSize > t.trackSize && (i = t.trackSize + e)) : e < 0 ? (i = t.dragSize + e, e = 0) : e + t.dragSize > t.trackSize && (i = t.trackSize - e), x.isHorizontal() ? (x.support.transforms3d ? t.drag.transform("translate3d(" + e + "px, 0, 0)") : t.drag.transform("translateX(" + e + "px)"), t.drag[0].style.width = i + "px") : (x.support.transforms3d ? t.drag.transform("translate3d(0px, " + e + "px, 0)") : t.drag.transform("translateY(" + e + "px)"), t.drag[0].style.height = i + "px"), x.params.scrollbarHide && (clearTimeout(t.timeout), t.track[0].style.opacity = 1, t.timeout = setTimeout(function () {
                            t.track[0].style.opacity = 0, t.track.transition(400)
                        }, 1e3))
                    }
                }, setTransition: function (e) {
                    x.params.scrollbar && x.scrollbar.drag.transition(e)
                }
            }, x.controller = {
                LinearSpline: function (e, t) {
                    var i = function () {
                        var e, t, i;
                        return function (a, n) {
                            for (t = -1, e = a.length; e - t > 1;)a[i = e + t >> 1] <= n ? t = i : e = i;
                            return e
                        }
                    }();
                    this.x = e, this.y = t, this.lastIndex = e.length - 1;
                    var a, n;
                    this.x.length;
                    this.interpolate = function (e) {
                        return e ? (n = i(this.x, e), a = n - 1, (e - this.x[a]) * (this.y[n] - this.y[a]) / (this.x[n] - this.x[a]) + this.y[a]) : 0
                    }
                }, getInterpolateFunction: function (e) {
                    x.controller.spline || (x.controller.spline = x.params.loop ? new x.controller.LinearSpline(x.slidesGrid, e.slidesGrid) : new x.controller.LinearSpline(x.snapGrid, e.snapGrid))
                }, setTranslate: function (e, t) {
                    function a(t) {
                        e = t.rtl && "horizontal" === t.params.direction ? -x.translate : x.translate, "slide" === x.params.controlBy && (x.controller.getInterpolateFunction(t), s = -x.controller.spline.interpolate(-e)), s && "container" !== x.params.controlBy || (n = (t.maxTranslate() - t.minTranslate()) / (x.maxTranslate() - x.minTranslate()), s = (e - x.minTranslate()) * n + t.minTranslate()), x.params.controlInverse && (s = t.maxTranslate() - s), t.updateProgress(s), t.setWrapperTranslate(s, !1, x), t.updateActiveIndex()
                    }

                    var n, s, r = x.params.control;
                    if (Array.isArray(r))for (var o = 0; o < r.length; o++)r[o] !== t && r[o] instanceof i && a(r[o]); else r instanceof i && t !== r && a(r)
                }, setTransition: function (e, t) {
                    function a(t) {
                        t.setWrapperTransition(e, x), 0 !== e && (t.onTransitionStart(), t.wrapper.transitionEnd(function () {
                            s && (t.params.loop && "slide" === x.params.controlBy && t.fixLoop(), t.onTransitionEnd())
                        }))
                    }

                    var n, s = x.params.control;
                    if (Array.isArray(s))for (n = 0; n < s.length; n++)s[n] !== t && s[n] instanceof i && a(s[n]); else s instanceof i && t !== s && a(s)
                }
            }, x.hashnav = {
                onHashCange: function (e, t) {
                    var i = document.location.hash.replace("#", ""), a = x.slides.eq(x.activeIndex).attr("data-hash");
                    i !== a && x.slideTo(x.wrapper.children("." + x.params.slideClass + '[data-hash="' + i + '"]').index())
                }, attachEvents: function (e) {
                    var i = e ? "off" : "on";
                    t(window)[i]("hashchange", x.hashnav.onHashCange)
                }, setHash: function () {
                    if (x.hashnav.initialized && x.params.hashnav)if (x.params.replaceState && window.history && window.history.replaceState) window.history.replaceState(null, null, "#" + x.slides.eq(x.activeIndex).attr("data-hash") || ""); else {
                        var e = x.slides.eq(x.activeIndex), t = e.attr("data-hash") || e.attr("data-history");
                        document.location.hash = t || ""
                    }
                }, init: function () {
                    if (x.params.hashnav && !x.params.history) {
                        x.hashnav.initialized = !0;
                        var e = document.location.hash.replace("#", "");
                        if (e)for (var t = 0, i = 0, a = x.slides.length; i < a; i++) {
                            var n = x.slides.eq(i), s = n.attr("data-hash") || n.attr("data-history");
                            if (s === e && !n.hasClass(x.params.slideDuplicateClass)) {
                                var r = n.index();
                                x.slideTo(r, t, x.params.runCallbacksOnInit, !0)
                            }
                        }
                        x.params.hashnavWatchState && x.hashnav.attachEvents()
                    }
                }, destroy: function () {
                    x.params.hashnavWatchState && x.hashnav.attachEvents(!0)
                }
            }, x.history = {
                init: function () {
                    if (x.params.history) {
                        if (!window.history || !window.history.pushState)return x.params.history = !1, void(x.params.hashnav = !0);
                        x.history.initialized = !0, this.paths = this.getPathValues(), (this.paths.key || this.paths.value) && (this.scrollToSlide(0, this.paths.value, x.params.runCallbacksOnInit), x.params.replaceState || window.addEventListener("popstate", this.setHistoryPopState))
                    }
                }, setHistoryPopState: function () {
                    x.history.paths = x.history.getPathValues(), x.history.scrollToSlide(x.params.speed, x.history.paths.value, !1)
                }, getPathValues: function () {
                    var e = window.location.pathname.slice(1).split("/"), t = e.length, i = e[t - 2], a = e[t - 1];
                    return {key: i, value: a}
                }, setHistory: function (e, t) {
                    if (x.history.initialized && x.params.history) {
                        var i = x.slides.eq(t), a = this.slugify(i.attr("data-history"));
                        window.location.pathname.includes(e) || (a = e + "/" + a), x.params.replaceState ? window.history.replaceState(null, null, a) : window.history.pushState(null, null, a)
                    }
                }, slugify: function (e) {
                    return e.toString().toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
                }, scrollToSlide: function (e, t, i) {
                    if (t)for (var a = 0, n = x.slides.length; a < n; a++) {
                        var s = x.slides.eq(a), r = this.slugify(s.attr("data-history"));
                        if (r === t && !s.hasClass(x.params.slideDuplicateClass)) {
                            var o = s.index();
                            x.slideTo(o, e, i)
                        }
                    } else x.slideTo(0, e, i)
                }
            }, x.disableKeyboardControl = function () {
                x.params.keyboardControl = !1, t(document).off("keydown", l)
            }, x.enableKeyboardControl = function () {
                x.params.keyboardControl = !0, t(document).on("keydown", l)
            }, x.mousewheel = {
                event: !1,
                lastScrollTime: (new window.Date).getTime()
            }, x.params.mousewheelControl && (x.mousewheel.event = navigator.userAgent.indexOf("firefox") > -1 ? "DOMMouseScroll" : d() ? "wheel" : "mousewheel"), x.disableMousewheelControl = function () {
                if (!x.mousewheel.event)return !1;
                var e = x.container;
                return "container" !== x.params.mousewheelEventsTarged && (e = t(x.params.mousewheelEventsTarged)), e.off(x.mousewheel.event, u), x.params.mousewheelControl = !1, !0
            }, x.enableMousewheelControl = function () {
                if (!x.mousewheel.event)return !1;
                var e = x.container;
                return "container" !== x.params.mousewheelEventsTarged && (e = t(x.params.mousewheelEventsTarged)), e.on(x.mousewheel.event, u), x.params.mousewheelControl = !0, !0
            }, x.parallax = {
                setTranslate: function () {
                    x.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
                        c(this, x.progress)
                    }), x.slides.each(function () {
                        var e = t(this);
                        e.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
                            var t = Math.min(Math.max(e[0].progress, -1), 1);
                            c(this, t)
                        })
                    })
                }, setTransition: function (e) {
                    "undefined" == typeof e && (e = x.params.speed), x.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
                        var i = t(this), a = parseInt(i.attr("data-swiper-parallax-duration"), 10) || e;
                        0 === e && (a = 0), i.transition(a)
                    })
                }
            }, x.zoom = {
                scale: 1,
                currentScale: 1,
                isScaling: !1,
                gesture: {
                    slide: void 0,
                    slideWidth: void 0,
                    slideHeight: void 0,
                    image: void 0,
                    imageWrap: void 0,
                    zoomMax: x.params.zoomMax
                },
                image: {
                    isTouched: void 0,
                    isMoved: void 0,
                    currentX: void 0,
                    currentY: void 0,
                    minX: void 0,
                    minY: void 0,
                    maxX: void 0,
                    maxY: void 0,
                    width: void 0,
                    height: void 0,
                    startX: void 0,
                    startY: void 0,
                    touchesStart: {},
                    touchesCurrent: {}
                },
                velocity: {x: void 0, y: void 0, prevPositionX: void 0, prevPositionY: void 0, prevTime: void 0},
                getDistanceBetweenTouches: function (e) {
                    if (e.targetTouches.length < 2)return 1;
                    var t = e.targetTouches[0].pageX, i = e.targetTouches[0].pageY, a = e.targetTouches[1].pageX,
                        n = e.targetTouches[1].pageY, s = Math.sqrt(Math.pow(a - t, 2) + Math.pow(n - i, 2));
                    return s
                },
                onGestureStart: function (e) {
                    var i = x.zoom;
                    if (!x.support.gestures) {
                        if ("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2)return;
                        i.gesture.scaleStart = i.getDistanceBetweenTouches(e)
                    }
                    return i.gesture.slide && i.gesture.slide.length || (i.gesture.slide = t(this), 0 === i.gesture.slide.length && (i.gesture.slide = x.slides.eq(x.activeIndex)), i.gesture.image = i.gesture.slide.find("img, svg, canvas"), i.gesture.imageWrap = i.gesture.image.parent("." + x.params.zoomContainerClass), i.gesture.zoomMax = i.gesture.imageWrap.attr("data-swiper-zoom") || x.params.zoomMax, 0 !== i.gesture.imageWrap.length) ? (i.gesture.image.transition(0), void(i.isScaling = !0)) : void(i.gesture.image = void 0)
                },
                onGestureChange: function (e) {
                    var t = x.zoom;
                    if (!x.support.gestures) {
                        if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2)return;
                        t.gesture.scaleMove = t.getDistanceBetweenTouches(e)
                    }
                    t.gesture.image && 0 !== t.gesture.image.length && (x.support.gestures ? t.scale = e.scale * t.currentScale : t.scale = t.gesture.scaleMove / t.gesture.scaleStart * t.currentScale, t.scale > t.gesture.zoomMax && (t.scale = t.gesture.zoomMax - 1 + Math.pow(t.scale - t.gesture.zoomMax + 1, .5)), t.scale < x.params.zoomMin && (t.scale = x.params.zoomMin + 1 - Math.pow(x.params.zoomMin - t.scale + 1, .5)), t.gesture.image.transform("translate3d(0,0,0) scale(" + t.scale + ")"))
                },
                onGestureEnd: function (e) {
                    var t = x.zoom;
                    !x.support.gestures && ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2) || t.gesture.image && 0 !== t.gesture.image.length && (t.scale = Math.max(Math.min(t.scale, t.gesture.zoomMax), x.params.zoomMin), t.gesture.image.transition(x.params.speed).transform("translate3d(0,0,0) scale(" + t.scale + ")"), t.currentScale = t.scale, t.isScaling = !1, 1 === t.scale && (t.gesture.slide = void 0))
                },
                onTouchStart: function (e, t) {
                    var i = e.zoom;
                    i.gesture.image && 0 !== i.gesture.image.length && (i.image.isTouched || ("android" === e.device.os && t.preventDefault(), i.image.isTouched = !0, i.image.touchesStart.x = "touchstart" === t.type ? t.targetTouches[0].pageX : t.pageX,
                        i.image.touchesStart.y = "touchstart" === t.type ? t.targetTouches[0].pageY : t.pageY))
                },
                onTouchMove: function (e) {
                    var t = x.zoom;
                    if (t.gesture.image && 0 !== t.gesture.image.length && (x.allowClick = !1, t.image.isTouched && t.gesture.slide)) {
                        t.image.isMoved || (t.image.width = t.gesture.image[0].offsetWidth, t.image.height = t.gesture.image[0].offsetHeight, t.image.startX = x.getTranslate(t.gesture.imageWrap[0], "x") || 0, t.image.startY = x.getTranslate(t.gesture.imageWrap[0], "y") || 0, t.gesture.slideWidth = t.gesture.slide[0].offsetWidth, t.gesture.slideHeight = t.gesture.slide[0].offsetHeight, t.gesture.imageWrap.transition(0), x.rtl && (t.image.startX = -t.image.startX), x.rtl && (t.image.startY = -t.image.startY));
                        var i = t.image.width * t.scale, a = t.image.height * t.scale;
                        if (!(i < t.gesture.slideWidth && a < t.gesture.slideHeight)) {
                            if (t.image.minX = Math.min(t.gesture.slideWidth / 2 - i / 2, 0), t.image.maxX = -t.image.minX, t.image.minY = Math.min(t.gesture.slideHeight / 2 - a / 2, 0), t.image.maxY = -t.image.minY, t.image.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, t.image.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, !t.image.isMoved && !t.isScaling) {
                                if (x.isHorizontal() && Math.floor(t.image.minX) === Math.floor(t.image.startX) && t.image.touchesCurrent.x < t.image.touchesStart.x || Math.floor(t.image.maxX) === Math.floor(t.image.startX) && t.image.touchesCurrent.x > t.image.touchesStart.x)return void(t.image.isTouched = !1);
                                if (!x.isHorizontal() && Math.floor(t.image.minY) === Math.floor(t.image.startY) && t.image.touchesCurrent.y < t.image.touchesStart.y || Math.floor(t.image.maxY) === Math.floor(t.image.startY) && t.image.touchesCurrent.y > t.image.touchesStart.y)return void(t.image.isTouched = !1)
                            }
                            e.preventDefault(), e.stopPropagation(), t.image.isMoved = !0, t.image.currentX = t.image.touchesCurrent.x - t.image.touchesStart.x + t.image.startX, t.image.currentY = t.image.touchesCurrent.y - t.image.touchesStart.y + t.image.startY, t.image.currentX < t.image.minX && (t.image.currentX = t.image.minX + 1 - Math.pow(t.image.minX - t.image.currentX + 1, .8)), t.image.currentX > t.image.maxX && (t.image.currentX = t.image.maxX - 1 + Math.pow(t.image.currentX - t.image.maxX + 1, .8)), t.image.currentY < t.image.minY && (t.image.currentY = t.image.minY + 1 - Math.pow(t.image.minY - t.image.currentY + 1, .8)), t.image.currentY > t.image.maxY && (t.image.currentY = t.image.maxY - 1 + Math.pow(t.image.currentY - t.image.maxY + 1, .8)), t.velocity.prevPositionX || (t.velocity.prevPositionX = t.image.touchesCurrent.x), t.velocity.prevPositionY || (t.velocity.prevPositionY = t.image.touchesCurrent.y), t.velocity.prevTime || (t.velocity.prevTime = Date.now()), t.velocity.x = (t.image.touchesCurrent.x - t.velocity.prevPositionX) / (Date.now() - t.velocity.prevTime) / 2, t.velocity.y = (t.image.touchesCurrent.y - t.velocity.prevPositionY) / (Date.now() - t.velocity.prevTime) / 2, Math.abs(t.image.touchesCurrent.x - t.velocity.prevPositionX) < 2 && (t.velocity.x = 0), Math.abs(t.image.touchesCurrent.y - t.velocity.prevPositionY) < 2 && (t.velocity.y = 0), t.velocity.prevPositionX = t.image.touchesCurrent.x, t.velocity.prevPositionY = t.image.touchesCurrent.y, t.velocity.prevTime = Date.now(), t.gesture.imageWrap.transform("translate3d(" + t.image.currentX + "px, " + t.image.currentY + "px,0)")
                        }
                    }
                },
                onTouchEnd: function (e, t) {
                    var i = e.zoom;
                    if (i.gesture.image && 0 !== i.gesture.image.length) {
                        if (!i.image.isTouched || !i.image.isMoved)return i.image.isTouched = !1, void(i.image.isMoved = !1);
                        i.image.isTouched = !1, i.image.isMoved = !1;
                        var a = 300, n = 300, s = i.velocity.x * a, r = i.image.currentX + s, o = i.velocity.y * n,
                            l = i.image.currentY + o;
                        0 !== i.velocity.x && (a = Math.abs((r - i.image.currentX) / i.velocity.x)), 0 !== i.velocity.y && (n = Math.abs((l - i.image.currentY) / i.velocity.y));
                        var d = Math.max(a, n);
                        i.image.currentX = r, i.image.currentY = l;
                        var p = i.image.width * i.scale, u = i.image.height * i.scale;
                        i.image.minX = Math.min(i.gesture.slideWidth / 2 - p / 2, 0), i.image.maxX = -i.image.minX, i.image.minY = Math.min(i.gesture.slideHeight / 2 - u / 2, 0), i.image.maxY = -i.image.minY, i.image.currentX = Math.max(Math.min(i.image.currentX, i.image.maxX), i.image.minX), i.image.currentY = Math.max(Math.min(i.image.currentY, i.image.maxY), i.image.minY), i.gesture.imageWrap.transition(d).transform("translate3d(" + i.image.currentX + "px, " + i.image.currentY + "px,0)")
                    }
                },
                onTransitionEnd: function (e) {
                    var t = e.zoom;
                    t.gesture.slide && e.previousIndex !== e.activeIndex && (t.gesture.image.transform("translate3d(0,0,0) scale(1)"), t.gesture.imageWrap.transform("translate3d(0,0,0)"), t.gesture.slide = t.gesture.image = t.gesture.imageWrap = void 0, t.scale = t.currentScale = 1)
                },
                toggleZoom: function (e, i) {
                    var a = e.zoom;
                    if (a.gesture.slide || (a.gesture.slide = e.clickedSlide ? t(e.clickedSlide) : e.slides.eq(e.activeIndex), a.gesture.image = a.gesture.slide.find("img, svg, canvas"), a.gesture.imageWrap = a.gesture.image.parent("." + e.params.zoomContainerClass)), a.gesture.image && 0 !== a.gesture.image.length) {
                        var n, s, r, o, l, d, p, u, c, m, h, f, g, v, y, w, b, x;
                        "undefined" == typeof a.image.touchesStart.x && i ? (n = "touchend" === i.type ? i.changedTouches[0].pageX : i.pageX, s = "touchend" === i.type ? i.changedTouches[0].pageY : i.pageY) : (n = a.image.touchesStart.x, s = a.image.touchesStart.y), a.scale && 1 !== a.scale ? (a.scale = a.currentScale = 1, a.gesture.imageWrap.transition(300).transform("translate3d(0,0,0)"), a.gesture.image.transition(300).transform("translate3d(0,0,0) scale(1)"), a.gesture.slide = void 0) : (a.scale = a.currentScale = a.gesture.imageWrap.attr("data-swiper-zoom") || e.params.zoomMax, i ? (b = a.gesture.slide[0].offsetWidth, x = a.gesture.slide[0].offsetHeight, r = a.gesture.slide.offset().left, o = a.gesture.slide.offset().top, l = r + b / 2 - n, d = o + x / 2 - s, c = a.gesture.image[0].offsetWidth, m = a.gesture.image[0].offsetHeight, h = c * a.scale, f = m * a.scale, g = Math.min(b / 2 - h / 2, 0), v = Math.min(x / 2 - f / 2, 0), y = -g, w = -v, p = l * a.scale, u = d * a.scale, p < g && (p = g), p > y && (p = y), u < v && (u = v), u > w && (u = w)) : (p = 0, u = 0), a.gesture.imageWrap.transition(300).transform("translate3d(" + p + "px, " + u + "px,0)"), a.gesture.image.transition(300).transform("translate3d(0,0,0) scale(" + a.scale + ")"))
                    }
                },
                attachEvents: function (e) {
                    var i = e ? "off" : "on";
                    if (x.params.zoom) {
                        var a = (x.slides, !("touchstart" !== x.touchEvents.start || !x.support.passiveListener || !x.params.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        });
                        x.support.gestures ? (x.slides[i]("gesturestart", x.zoom.onGestureStart, a), x.slides[i]("gesturechange", x.zoom.onGestureChange, a), x.slides[i]("gestureend", x.zoom.onGestureEnd, a)) : "touchstart" === x.touchEvents.start && (x.slides[i](x.touchEvents.start, x.zoom.onGestureStart, a), x.slides[i](x.touchEvents.move, x.zoom.onGestureChange, a), x.slides[i](x.touchEvents.end, x.zoom.onGestureEnd, a)), x[i]("touchStart", x.zoom.onTouchStart), x.slides.each(function (e, a) {
                            t(a).find("." + x.params.zoomContainerClass).length > 0 && t(a)[i](x.touchEvents.move, x.zoom.onTouchMove)
                        }), x[i]("touchEnd", x.zoom.onTouchEnd), x[i]("transitionEnd", x.zoom.onTransitionEnd), x.params.zoomToggle && x.on("doubleTap", x.zoom.toggleZoom)
                    }
                },
                init: function () {
                    x.zoom.attachEvents()
                },
                destroy: function () {
                    x.zoom.attachEvents(!0)
                }
            }, x._plugins = [];
            for (var W in x.plugins) {
                var R = x.plugins[W](x, x.params[W]);
                R && x._plugins.push(R)
            }
            return x.callPlugins = function (e) {
                for (var t = 0; t < x._plugins.length; t++)e in x._plugins[t] && x._plugins[t][e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
            }, x.emitterEventListeners = {}, x.emit = function (e) {
                x.params[e] && x.params[e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                var t;
                if (x.emitterEventListeners[e])for (t = 0; t < x.emitterEventListeners[e].length; t++)x.emitterEventListeners[e][t](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                x.callPlugins && x.callPlugins(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
            }, x.on = function (e, t) {
                return e = m(e), x.emitterEventListeners[e] || (x.emitterEventListeners[e] = []), x.emitterEventListeners[e].push(t), x
            }, x.off = function (e, t) {
                var i;
                if (e = m(e), "undefined" == typeof t)return x.emitterEventListeners[e] = [], x;
                if (x.emitterEventListeners[e] && 0 !== x.emitterEventListeners[e].length) {
                    for (i = 0; i < x.emitterEventListeners[e].length; i++)x.emitterEventListeners[e][i] === t && x.emitterEventListeners[e].splice(i, 1);
                    return x
                }
            }, x.once = function (e, t) {
                e = m(e);
                var i = function () {
                    t(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]), x.off(e, i)
                };
                return x.on(e, i), x
            }, x.a11y = {
                makeFocusable: function (e) {
                    return e.attr("tabIndex", "0"), e
                },
                addRole: function (e, t) {
                    return e.attr("role", t), e
                },
                addLabel: function (e, t) {
                    return e.attr("aria-label", t), e
                },
                disable: function (e) {
                    return e.attr("aria-disabled", !0), e
                },
                enable: function (e) {
                    return e.attr("aria-disabled", !1), e
                },
                onEnterKey: function (e) {
                    13 === e.keyCode && (t(e.target).is(x.params.nextButton) ? (x.onClickNext(e), x.isEnd ? x.a11y.notify(x.params.lastSlideMessage) : x.a11y.notify(x.params.nextSlideMessage)) : t(e.target).is(x.params.prevButton) && (x.onClickPrev(e), x.isBeginning ? x.a11y.notify(x.params.firstSlideMessage) : x.a11y.notify(x.params.prevSlideMessage)), t(e.target).is("." + x.params.bulletClass) && t(e.target)[0].click())
                },
                liveRegion: t('<span class="' + x.params.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>'),
                notify: function (e) {
                    var t = x.a11y.liveRegion;
                    0 !== t.length && (t.html(""), t.html(e))
                },
                init: function () {
                    x.params.nextButton && x.nextButton && x.nextButton.length > 0 && (x.a11y.makeFocusable(x.nextButton), x.a11y.addRole(x.nextButton, "button"), x.a11y.addLabel(x.nextButton, x.params.nextSlideMessage)), x.params.prevButton && x.prevButton && x.prevButton.length > 0 && (x.a11y.makeFocusable(x.prevButton), x.a11y.addRole(x.prevButton, "button"), x.a11y.addLabel(x.prevButton, x.params.prevSlideMessage)), t(x.container).append(x.a11y.liveRegion)
                },
                initPagination: function () {
                    x.params.pagination && x.params.paginationClickable && x.bullets && x.bullets.length && x.bullets.each(function () {
                        var e = t(this);
                        x.a11y.makeFocusable(e), x.a11y.addRole(e, "button"), x.a11y.addLabel(e, x.params.paginationBulletMessage.replace(/{{index}}/, e.index() + 1))
                    })
                },
                destroy: function () {
                    x.a11y.liveRegion && x.a11y.liveRegion.length > 0 && x.a11y.liveRegion.remove()
                }
            }, x.init = function () {
                x.params.loop && x.createLoop(), x.updateContainerSize(), x.updateSlidesSize(), x.updatePagination(), x.params.scrollbar && x.scrollbar && (x.scrollbar.set(), x.params.scrollbarDraggable && x.scrollbar.enableDraggable()), "slide" !== x.params.effect && x.effects[x.params.effect] && (x.params.loop || x.updateProgress(), x.effects[x.params.effect].setTranslate()), x.params.loop ? x.slideTo(x.params.initialSlide + x.loopedSlides, 0, x.params.runCallbacksOnInit) : (x.slideTo(x.params.initialSlide, 0, x.params.runCallbacksOnInit), 0 === x.params.initialSlide && (x.parallax && x.params.parallax && x.parallax.setTranslate(), x.lazy && x.params.lazyLoading && (x.lazy.load(), x.lazy.initialImageLoaded = !0))), x.attachEvents(), x.params.observer && x.support.observer && x.initObservers(), x.params.preloadImages && !x.params.lazyLoading && x.preloadImages(), x.params.zoom && x.zoom && x.zoom.init(), x.params.autoplay && x.startAutoplay(), x.params.keyboardControl && x.enableKeyboardControl && x.enableKeyboardControl(), x.params.mousewheelControl && x.enableMousewheelControl && x.enableMousewheelControl(), x.params.hashnavReplaceState && (x.params.replaceState = x.params.hashnavReplaceState), x.params.history && x.history && x.history.init(), x.params.hashnav && x.hashnav && x.hashnav.init(), x.params.a11y && x.a11y && x.a11y.init(), x.emit("onInit", x)
            }, x.cleanupStyles = function () {
                x.container.removeClass(x.classNames.join(" ")).removeAttr("style"), x.wrapper.removeAttr("style"), x.slides && x.slides.length && x.slides.removeClass([x.params.slideVisibleClass, x.params.slideActiveClass, x.params.slideNextClass, x.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"), x.paginationContainer && x.paginationContainer.length && x.paginationContainer.removeClass(x.params.paginationHiddenClass), x.bullets && x.bullets.length && x.bullets.removeClass(x.params.bulletActiveClass), x.params.prevButton && t(x.params.prevButton).removeClass(x.params.buttonDisabledClass), x.params.nextButton && t(x.params.nextButton).removeClass(x.params.buttonDisabledClass), x.params.scrollbar && x.scrollbar && (x.scrollbar.track && x.scrollbar.track.length && x.scrollbar.track.removeAttr("style"), x.scrollbar.drag && x.scrollbar.drag.length && x.scrollbar.drag.removeAttr("style"))
            }, x.destroy = function (e, t) {
                x.detachEvents(), x.stopAutoplay(), x.params.scrollbar && x.scrollbar && x.params.scrollbarDraggable && x.scrollbar.disableDraggable(), x.params.loop && x.destroyLoop(), t && x.cleanupStyles(), x.disconnectObservers(), x.params.zoom && x.zoom && x.zoom.destroy(), x.params.keyboardControl && x.disableKeyboardControl && x.disableKeyboardControl(), x.params.mousewheelControl && x.disableMousewheelControl && x.disableMousewheelControl(), x.params.a11y && x.a11y && x.a11y.destroy(), x.params.history && !x.params.replaceState && window.removeEventListener("popstate", x.history.setHistoryPopState), x.params.hashnav && x.hashnav && x.hashnav.destroy(), x.emit("onDestroy"), e !== !1 && (x = null)
            }, x.init(), x
        }
    };
    i.prototype = {
        isSafari: function () {
            var e = window.navigator.userAgent.toLowerCase();
            return e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0
        }(),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent),
        isArray: function (e) {
            return "[object Array]" === Object.prototype.toString.apply(e)
        },
        browser: {
            ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
            ieTouch: window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1,
            lteIE9: function () {
                var e = document.createElement("div");
                return e.innerHTML = "<!--[if lte IE 9]><i></i><![endif]-->", 1 === e.getElementsByTagName("i").length
            }()
        },
        device: function () {
            var e = window.navigator.userAgent, t = e.match(/(Android);?[\s\/]+([\d.]+)?/),
                i = e.match(/(iPad).*OS\s([\d_]+)/), a = e.match(/(iPod)(.*OS\s([\d_]+))?/),
                n = !i && e.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
            return {ios: i || n || a, android: t}
        }(),
        support: {
            touch: window.Modernizr && Modernizr.touch === !0 || function () {
                return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
            }(), transforms3d: window.Modernizr && Modernizr.csstransforms3d === !0 || function () {
                var e = document.createElement("div").style;
                return "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e
            }(), flexbox: function () {
                for (var e = document.createElement("div").style,
                         t = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "),
                         i = 0; i < t.length; i++)if (t[i] in e)return !0
            }(), observer: function () {
                return "MutationObserver" in window || "WebkitMutationObserver" in window
            }(), passiveListener: function () {
                var e = !1;
                try {
                    var t = Object.defineProperty({}, "passive", {
                        get: function () {
                            e = !0
                        }
                    });
                    window.addEventListener("testPassiveListener", null, t)
                } catch (e) {
                }
                return e
            }(), gestures: function () {
                return "ongesturestart" in window
            }()
        },
        plugins: {}
    };
    for (var a = ["jQuery", "Zepto", "Dom7"], n = 0; n < a.length; n++)window[a[n]] && e(window[a[n]]);
    var s;
    s = "undefined" == typeof Dom7 ? window.Dom7 || window.Zepto || window.jQuery : Dom7, s && ("transitionEnd" in s.fn || (s.fn.transitionEnd = function (e) {
        function t(s) {
            if (s.target === this)for (e.call(this, s), i = 0; i < a.length; i++)n.off(a[i], t)
        }

        var i, a = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
            n = this;
        if (e)for (i = 0; i < a.length; i++)n.on(a[i], t);
        return this
    }), "transform" in s.fn || (s.fn.transform = function (e) {
        for (var t = 0; t < this.length; t++) {
            var i = this[t].style;
            i.webkitTransform = i.MsTransform = i.msTransform = i.MozTransform = i.OTransform = i.transform = e
        }
        return this
    }), "transition" in s.fn || (s.fn.transition = function (e) {
        "string" != typeof e && (e += "ms");
        for (var t = 0; t < this.length; t++) {
            var i = this[t].style;
            i.webkitTransitionDuration = i.MsTransitionDuration = i.msTransitionDuration = i.MozTransitionDuration = i.OTransitionDuration = i.transitionDuration = e
        }
        return this
    }), "outerWidth" in s.fn || (s.fn.outerWidth = function (e) {
        return this.length > 0 ? e ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")) : this[0].offsetWidth : null
    })), window.Swiper = i
}(), "undefined" != typeof module ? module.exports = window.Swiper : "function" == typeof define && define.amd && define([], function () {
        "use strict";
        return window.Swiper
    }), +function (e, t, i) {
    "use strict";
    var a = {calc: !1};
    t.fn.rrssb = function (e) {
        var a = t.extend({
            description: i,
            emailAddress: i,
            emailBody: i,
            emailSubject: i,
            image: i,
            title: i,
            url: i
        }, e);
        a.emailSubject = a.emailSubject || a.title, a.emailBody = a.emailBody || (a.description ? a.description : "") + (a.url ? "\n\n" + a.url : "");
        for (var n in a)a.hasOwnProperty(n) && a[n] !== i && (a[n] = s(a[n]));
        a.url !== i && (t(this).find(".rrssb-facebook a").attr("href", "https://www.facebook.com/sharer/sharer.php?u=" + a.url), t(this).find(".rrssb-tumblr a").attr("href", "http://tumblr.com/share/link?url=" + a.url + (a.title !== i ? "&name=" + a.title : "") + (a.description !== i ? "&description=" + a.description : "")), t(this).find(".rrssb-linkedin a").attr("href", "http://www.linkedin.com/shareArticle?mini=true&url=" + a.url + (a.title !== i ? "&title=" + a.title : "") + (a.description !== i ? "&summary=" + a.description : "")), t(this).find(".rrssb-twitter a").attr("href", "https://twitter.com/intent/tweet?text=" + (a.description !== i ? a.description : "") + "%20" + a.url), t(this).find(".rrssb-hackernews a").attr("href", "https://news.ycombinator.com/submitlink?u=" + a.url + (a.title !== i ? "&text=" + a.title : "")), t(this).find(".rrssb-reddit a").attr("href", "http://www.reddit.com/submit?url=" + a.url + (a.description !== i ? "&text=" + a.description : "") + (a.title !== i ? "&title=" + a.title : "")), t(this).find(".rrssb-googleplus a").attr("href", "https://plus.google.com/share?url=" + (a.description !== i ? a.description : "") + "%20" + a.url), t(this).find(".rrssb-pinterest a").attr("href", "http://pinterest.com/pin/create/button/?url=" + a.url + (a.image !== i ? "&amp;media=" + a.image : "") + (a.description !== i ? "&description=" + a.description : "")), t(this).find(".rrssb-pocket a").attr("href", "https://getpocket.com/save?url=" + a.url), t(this).find(".rrssb-github a").attr("href", a.url), t(this).find(".rrssb-print a").attr("href", "javascript:window.print()"), t(this).find(".rrssb-whatsapp a").attr("href", "whatsapp://send?text=" + (a.description !== i ? a.description + "%20" : a.title !== i ? a.title + "%20" : "") + a.url)), (a.emailAddress !== i || a.emailSubject) && t(this).find(".rrssb-email a").attr("href", "mailto:" + (a.emailAddress ? a.emailAddress : "") + "?" + (a.emailSubject !== i ? "subject=" + a.emailSubject : "") + (a.emailBody !== i ? "&body=" + a.emailBody : ""))
    };
    var n = function () {
        var e = t("<div>"), i = ["calc", "-webkit-calc", "-moz-calc"];
        t("body").append(e);
        for (var n = 0; n < i.length; n++)if (e.css("width", i[n] + "(1px)"), 1 === e.width()) {
            a.calc = i[n];
            break
        }
        e.remove()
    }, s = function (e) {
        if (e !== i && null !== e) {
            if (null === e.match(/%[0-9a-f]{2}/i))return encodeURIComponent(e);
            e = decodeURIComponent(e), s(e)
        }
    }, r = function () {
        t(".rrssb-buttons").each(function (e) {
            var i = t(this), a = t("li:visible", i), n = a.length, s = 100 / n;
            a.css("width", s + "%").attr("data-initwidth", s)
        })
    }, o = function () {
        t(".rrssb-buttons").each(function (e) {
            var i = t(this), a = i.width(), n = t("li", i).not(".small").eq(0).width(), s = t("li.small", i).length;
            if (n > 170 && s < 1) {
                i.addClass("large-format");
                var r = n / 12 + "px";
                i.css("font-size", r)
            } else i.removeClass("large-format"), i.css("font-size", "");
            a < 25 * s ? i.removeClass("small-format").addClass("tiny-format") : i.removeClass("tiny-format")
        })
    }, l = function () {
        t(".rrssb-buttons").each(function (e) {
            var i = t(this), a = t("li", i), n = a.filter(".small"), s = 0, r = 0, o = n.eq(0),
                l = parseFloat(o.attr("data-size")) + 55, d = n.length;
            if (d === a.length) {
                var u = 42 * d, c = i.width();
                u + l < c && (i.removeClass("small-format"), n.eq(0).removeClass("small"), p())
            } else {
                a.not(".small").each(function (e) {
                    var i = t(this), a = parseFloat(i.attr("data-size")) + 55, n = parseFloat(i.width());
                    s += n, r += a
                });
                var m = s - r;
                l < m && (o.removeClass("small"), p())
            }
        })
    }, d = function (e) {
        t(".rrssb-buttons").each(function (e) {
            var i = t(this), a = t("li", i);
            t(a.get().reverse()).each(function (e, i) {
                var n = t(this);
                if (n.hasClass("small") === !1) {
                    var s = parseFloat(n.attr("data-size")) + 55, r = parseFloat(n.width());
                    if (s > r) {
                        var o = a.not(".small").last();
                        t(o).addClass("small"), p()
                    }
                }
                --i || l()
            })
        }), e === !0 && c(p)
    }, p = function () {
        t(".rrssb-buttons").each(function (e) {
            var i, n, s, o, l, d = t(this), p = t("li", d), u = p.filter(".small"), c = u.length;
            c > 0 && c !== p.length ? (d.removeClass("small-format"), u.css("width", "42px"), s = 42 * c, i = p.not(".small").length, n = 100 / i, l = s / i, a.calc === !1 ? (o = (d.innerWidth() - 1) / i - l, o = Math.floor(1e3 * o) / 1e3, o += "px") : o = a.calc + "(" + n + "% - " + l + "px)", p.not(".small").css("width", o)) : c === p.length ? (d.addClass("small-format"), r()) : (d.removeClass("small-format"), r())
        }), o()
    }, u = function () {
        t(".rrssb-buttons").each(function (e) {
            t(this).addClass("rrssb-" + (e + 1))
        }), n(), r(), t(".rrssb-buttons li .rrssb-text").each(function (e) {
            var i = t(this), a = i.width();
            i.closest("li").attr("data-size", a)
        }), d(!0)
    }, c = function (e) {
        t(".rrssb-buttons li.small").removeClass("small"), d(), e()
    }, m = function (t, a, n, s) {
        var r = e.screenLeft !== i ? e.screenLeft : screen.left, o = e.screenTop !== i ? e.screenTop : screen.top,
            l = e.innerWidth ? e.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width,
            d = e.innerHeight ? e.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height,
            p = l / 2 - n / 2 + r, u = d / 3 - s / 3 + o,
            c = e.open(t, a, "scrollbars=yes, width=" + n + ", height=" + s + ", top=" + u + ", left=" + p);
        c && c.focus && c.focus()
    }, h = function () {
        var e = {};
        return function (t, i, a) {
            a || (a = "Don't call this twice without a uniqueId"), e[a] && clearTimeout(e[a]), e[a] = setTimeout(t, i)
        }
    }();




}(window, jQuery);