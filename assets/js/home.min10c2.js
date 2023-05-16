! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).bootstrap = e()
}(this, (function() {
    "use strict";
    const t = "transitionend",
        e = t => {
            let e = t.getAttribute("data-bs-target");
            if (!e || "#" === e) {
                let n = t.getAttribute("href");
                if (!n || !n.includes("#") && !n.startsWith(".")) return null;
                n.includes("#") && !n.startsWith("#") && (n = `#${n.split("#")[1]}`), e = n && "#" !== n ? n.trim() : null
            }
            return e
        },
        n = t => {
            const n = e(t);
            return n && document.querySelector(n) ? n : null
        },
        r = t => {
            const n = e(t);
            return n ? document.querySelector(n) : null
        },
        i = e => {
            e.dispatchEvent(new Event(t))
        },
        o = t => !(!t || "object" != typeof t) && (void 0 !== t.jquery && (t = t[0]), void 0 !== t.nodeType),
        s = t => o(t) ? t.jquery ? t[0] : t : "string" == typeof t && t.length > 0 ? document.querySelector(t) : null,
        a = t => {
            if (!o(t) || 0 === t.getClientRects().length) return !1;
            const e = "visible" === getComputedStyle(t).getPropertyValue("visibility"),
                n = t.closest("details:not([open])");
            if (!n) return e;
            if (n !== t) {
                const e = t.closest("summary");
                if (e && e.parentNode !== n) return !1;
                if (null === e) return !1
            }
            return e
        },
        l = t => !t || t.nodeType !== Node.ELEMENT_NODE || !!t.classList.contains("disabled") || (void 0 !== t.disabled ? t.disabled : t.hasAttribute("disabled") && "false" !== t.getAttribute("disabled")),
        c = t => {
            if (!document.documentElement.attachShadow) return null;
            if ("function" == typeof t.getRootNode) {
                const e = t.getRootNode();
                return e instanceof ShadowRoot ? e : null
            }
            return t instanceof ShadowRoot ? t : t.parentNode ? c(t.parentNode) : null
        },
        u = () => {},
        d = t => {
            t.offsetHeight
        },
        f = () => window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null,
        h = [],
        p = () => "rtl" === document.documentElement.dir,
        g = t => {
            var e;
            e = () => {
                const e = f();
                if (e) {
                    const n = t.NAME,
                        r = e.fn[n];
                    e.fn[n] = t.jQueryInterface, e.fn[n].Constructor = t, e.fn[n].noConflict = () => (e.fn[n] = r, t.jQueryInterface)
                }
            }, "loading" === document.readyState ? (h.length || document.addEventListener("DOMContentLoaded", (() => {
                for (const t of h) t()
            })), h.push(e)) : e()
        },
        m = t => {
            "function" == typeof t && t()
        },
        _ = (e, n, r = !0) => {
            if (!r) return void m(e);
            const o = (t => {
                if (!t) return 0;
                let {
                    transitionDuration: e,
                    transitionDelay: n
                } = window.getComputedStyle(t);
                const r = Number.parseFloat(e),
                    i = Number.parseFloat(n);
                return r || i ? (e = e.split(",")[0], n = n.split(",")[0], 1e3 * (Number.parseFloat(e) + Number.parseFloat(n))) : 0
            })(n) + 5;
            let s = !1;
            const a = ({
                target: r
            }) => {
                r === n && (s = !0, n.removeEventListener(t, a), m(e))
            };
            n.addEventListener(t, a), setTimeout((() => {
                s || i(n)
            }), o)
        },
        v = (t, e, n, r) => {
            const i = t.length;
            let o = t.indexOf(e);
            return -1 === o ? !n && r ? t[i - 1] : t[0] : (o += n ? 1 : -1, r && (o = (o + i) % i), t[Math.max(0, Math.min(o, i - 1))])
        },
        y = /[^.]*(?=\..*)\.|.*/,
        b = /\..*/,
        w = /::\d+$/,
        x = {};
    let A = 1;
    const T = {
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        },
        k = new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);

    function L(t, e) {
        return e && `${e}::${A++}` || t.uidEvent || A++
    }

    function E(t) {
        const e = L(t);
        return t.uidEvent = e, x[e] = x[e] || {}, x[e]
    }

    function S(t, e, n = null) {
        return Object.values(t).find((t => t.callable === e && t.delegationSelector === n))
    }

    function C(t, e, n) {
        const r = "string" == typeof e,
            i = r ? n : e || n;
        let o = D(t);
        return k.has(o) || (o = t), [r, i, o]
    }

    function O(t, e, n, r, i) {
        if ("string" != typeof e || !t) return;
        let [o, s, a] = C(e, n, r);
        if (e in T) {
            const t = t => function(e) {
                if (!e.relatedTarget || e.relatedTarget !== e.delegateTarget && !e.delegateTarget.contains(e.relatedTarget)) return t.call(this, e)
            };
            s = t(s)
        }
        const l = E(t),
            c = l[a] || (l[a] = {}),
            u = S(c, s, o ? n : null);
        if (u) return void(u.oneOff = u.oneOff && i);
        const d = L(s, e.replace(y, "")),
            f = o ? function(t, e, n) {
                return function r(i) {
                    const o = t.querySelectorAll(e);
                    for (let {
                            target: s
                        } = i; s && s !== this; s = s.parentNode)
                        for (const a of o)
                            if (a === s) return N(i, {
                                delegateTarget: s
                            }), r.oneOff && I.off(t, i.type, e, n), n.apply(s, [i])
                }
            }(t, n, s) : function(t, e) {
                return function n(r) {
                    return N(r, {
                        delegateTarget: t
                    }), n.oneOff && I.off(t, r.type, e), e.apply(t, [r])
                }
            }(t, s);
        f.delegationSelector = o ? n : null, f.callable = s, f.oneOff = i, f.uidEvent = d, c[d] = f, t.addEventListener(a, f, o)
    }

    function M(t, e, n, r, i) {
        const o = S(e[n], r, i);
        o && (t.removeEventListener(n, o, Boolean(i)), delete e[n][o.uidEvent])
    }

    function P(t, e, n, r) {
        const i = e[n] || {};
        for (const o of Object.keys(i))
            if (o.includes(r)) {
                const r = i[o];
                M(t, e, n, r.callable, r.delegationSelector)
            }
    }

    function D(t) {
        return t = t.replace(b, ""), T[t] || t
    }
    const I = {
        on(t, e, n, r) {
            O(t, e, n, r, !1)
        },
        one(t, e, n, r) {
            O(t, e, n, r, !0)
        },
        off(t, e, n, r) {
            if ("string" != typeof e || !t) return;
            const [i, o, s] = C(e, n, r), a = s !== e, l = E(t), c = l[s] || {}, u = e.startsWith(".");
            if (void 0 === o) {
                if (u)
                    for (const n of Object.keys(l)) P(t, l, n, e.slice(1));
                for (const n of Object.keys(c)) {
                    const r = n.replace(w, "");
                    if (!a || e.includes(r)) {
                        const e = c[n];
                        M(t, l, s, e.callable, e.delegationSelector)
                    }
                }
            } else {
                if (!Object.keys(c).length) return;
                M(t, l, s, o, i ? n : null)
            }
        },
        trigger(t, e, n) {
            if ("string" != typeof e || !t) return null;
            const r = f();
            let i = null,
                o = !0,
                s = !0,
                a = !1;
            e !== D(e) && r && (i = r.Event(e, n), r(t).trigger(i), o = !i.isPropagationStopped(), s = !i.isImmediatePropagationStopped(), a = i.isDefaultPrevented());
            let l = new Event(e, {
                bubbles: o,
                cancelable: !0
            });
            return l = N(l, n), a && l.preventDefault(), s && t.dispatchEvent(l), l.defaultPrevented && i && i.preventDefault(), l
        }
    };

    function N(t, e) {
        for (const [n, r] of Object.entries(e || {})) try {
            t[n] = r
        } catch (e) {
            Object.defineProperty(t, n, {
                configurable: !0,
                get: () => r
            })
        }
        return t
    }
    const z = new Map,
        q = {
            set(t, e, n) {
                z.has(t) || z.set(t, new Map);
                const r = z.get(t);
                r.has(e) || 0 === r.size ? r.set(e, n) : console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(r.keys())[0]}.`)
            },
            get: (t, e) => z.has(t) && z.get(t).get(e) || null,
            remove(t, e) {
                if (!z.has(t)) return;
                const n = z.get(t);
                n.delete(e), 0 === n.size && z.delete(t)
            }
        };

    function R(t) {
        if ("true" === t) return !0;
        if ("false" === t) return !1;
        if (t === Number(t).toString()) return Number(t);
        if ("" === t || "null" === t) return null;
        if ("string" != typeof t) return t;
        try {
            return JSON.parse(decodeURIComponent(t))
        } catch (e) {
            return t
        }
    }

    function F(t) {
        return t.replace(/[A-Z]/g, (t => `-${t.toLowerCase()}`))
    }
    const B = {
        setDataAttribute(t, e, n) {
            t.setAttribute(`data-bs-${F(e)}`, n)
        },
        removeDataAttribute(t, e) {
            t.removeAttribute(`data-bs-${F(e)}`)
        },
        getDataAttributes(t) {
            if (!t) return {};
            const e = {},
                n = Object.keys(t.dataset).filter((t => t.startsWith("bs") && !t.startsWith("bsConfig")));
            for (const r of n) {
                let n = r.replace(/^bs/, "");
                n = n.charAt(0).toLowerCase() + n.slice(1, n.length), e[n] = R(t.dataset[r])
            }
            return e
        },
        getDataAttribute: (t, e) => R(t.getAttribute(`data-bs-${F(e)}`))
    };
    class j {
        static get Default() {
            return {}
        }
        static get DefaultType() {
            return {}
        }
        static get NAME() {
            throw new Error('You have to implement the static method "NAME", for each component!')
        }
        _getConfig(t) {
            return t = this._mergeConfigObj(t), t = this._configAfterMerge(t), this._typeCheckConfig(t), t
        }
        _configAfterMerge(t) {
            return t
        }
        _mergeConfigObj(t, e) {
            const n = o(e) ? B.getDataAttribute(e, "config") : {};
            return {
                ...this.constructor.Default,
                ..."object" == typeof n ? n : {},
                ...o(e) ? B.getDataAttributes(e) : {},
                ..."object" == typeof t ? t : {}
            }
        }
        _typeCheckConfig(t, e = this.constructor.DefaultType) {
            for (const r of Object.keys(e)) {
                const i = e[r],
                    s = t[r],
                    a = o(s) ? "element" : null == (n = s) ? `${n}` : Object.prototype.toString.call(n).match(/\s([a-z]+)/i)[1].toLowerCase();
                if (!new RegExp(i).test(a)) throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${r}" provided type "${a}" but expected type "${i}".`)
            }
            var n
        }
    }
    class H extends j {
        constructor(t, e) {
            super(), (t = s(t)) && (this._element = t, this._config = this._getConfig(e), q.set(this._element, this.constructor.DATA_KEY, this))
        }
        dispose() {
            q.remove(this._element, this.constructor.DATA_KEY), I.off(this._element, this.constructor.EVENT_KEY);
            for (const t of Object.getOwnPropertyNames(this)) this[t] = null
        }
        _queueCallback(t, e, n = !0) {
            _(t, e, n)
        }
        _getConfig(t) {
            return t = this._mergeConfigObj(t, this._element), t = this._configAfterMerge(t), this._typeCheckConfig(t), t
        }
        static getInstance(t) {
            return q.get(s(t), this.DATA_KEY)
        }
        static getOrCreateInstance(t, e = {}) {
            return this.getInstance(t) || new this(t, "object" == typeof e ? e : null)
        }
        static get VERSION() {
            return "5.2.2"
        }
        static get DATA_KEY() {
            return `bs.${this.NAME}`
        }
        static get EVENT_KEY() {
            return `.${this.DATA_KEY}`
        }
        static eventName(t) {
            return `${t}${this.EVENT_KEY}`
        }
    }
    const W = (t, e = "hide") => {
        const n = `click.dismiss${t.EVENT_KEY}`,
            i = t.NAME;
        I.on(document, n, `[data-bs-dismiss="${i}"]`, (function(n) {
            if (["A", "AREA"].includes(this.tagName) && n.preventDefault(), l(this)) return;
            const o = r(this) || this.closest(`.${i}`);
            t.getOrCreateInstance(o)[e]()
        }))
    };
    class X extends H {
        static get NAME() {
            return "alert"
        }
        close() {
            if (I.trigger(this._element, "close.bs.alert").defaultPrevented) return;
            this._element.classList.remove("show");
            const t = this._element.classList.contains("fade");
            this._queueCallback((() => this._destroyElement()), this._element, t)
        }
        _destroyElement() {
            this._element.remove(), I.trigger(this._element, "closed.bs.alert"), this.dispose()
        }
        static jQueryInterface(t) {
            return this.each((function() {
                const e = X.getOrCreateInstance(this);
                if ("string" == typeof t) {
                    if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
                    e[t](this)
                }
            }))
        }
    }
    W(X, "close"), g(X);
    const Y = '[data-bs-toggle="button"]';
    class V extends H {
        static get NAME() {
            return "button"
        }
        toggle() {
            this._element.setAttribute("aria-pressed", this._element.classList.toggle("active"))
        }
        static jQueryInterface(t) {
            return this.each((function() {
                const e = V.getOrCreateInstance(this);
                "toggle" === t && e[t]()
            }))
        }
    }
    I.on(document, "click.bs.button.data-api", Y, (t => {
        t.preventDefault();
        const e = t.target.closest(Y);
        V.getOrCreateInstance(e).toggle()
    })), g(V);
    const $ = {
            find: (t, e = document.documentElement) => [].concat(...Element.prototype.querySelectorAll.call(e, t)),
            findOne: (t, e = document.documentElement) => Element.prototype.querySelector.call(e, t),
            children: (t, e) => [].concat(...t.children).filter((t => t.matches(e))),
            parents(t, e) {
                const n = [];
                let r = t.parentNode.closest(e);
                for (; r;) n.push(r), r = r.parentNode.closest(e);
                return n
            },
            prev(t, e) {
                let n = t.previousElementSibling;
                for (; n;) {
                    if (n.matches(e)) return [n];
                    n = n.previousElementSibling
                }
                return []
            },
            next(t, e) {
                let n = t.nextElementSibling;
                for (; n;) {
                    if (n.matches(e)) return [n];
                    n = n.nextElementSibling
                }
                return []
            },
            focusableChildren(t) {
                const e = ["a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]'].map((t => `${t}:not([tabindex^="-"])`)).join(",");
                return this.find(e, t).filter((t => !l(t) && a(t)))
            }
        },
        U = {
            endCallback: null,
            leftCallback: null,
            rightCallback: null
        },
        Q = {
            endCallback: "(function|null)",
            leftCallback: "(function|null)",
            rightCallback: "(function|null)"
        };
    class G extends j {
        constructor(t, e) {
            super(), this._element = t, t && G.isSupported() && (this._config = this._getConfig(e), this._deltaX = 0, this._supportPointerEvents = Boolean(window.PointerEvent), this._initEvents())
        }
        static get Default() {
            return U
        }
        static get DefaultType() {
            return Q
        }
        static get NAME() {
            return "swipe"
        }
        dispose() {
            I.off(this._element, ".bs.swipe")
        }
        _start(t) {
            this._supportPointerEvents ? this._eventIsPointerPenTouch(t) && (this._deltaX = t.clientX) : this._deltaX = t.touches[0].clientX
        }
        _end(t) {
            this._eventIsPointerPenTouch(t) && (this._deltaX = t.clientX - this._deltaX), this._handleSwipe(), m(this._config.endCallback)
        }
        _move(t) {
            this._deltaX = t.touches && t.touches.length > 1 ? 0 : t.touches[0].clientX - this._deltaX
        }
        _handleSwipe() {
            const t = Math.abs(this._deltaX);
            if (t <= 40) return;
            const e = t / this._deltaX;
            this._deltaX = 0, e && m(e > 0 ? this._config.rightCallback : this._config.leftCallback)
        }
        _initEvents() {
            this._supportPointerEvents ? (I.on(this._element, "pointerdown.bs.swipe", (t => this._start(t))), I.on(this._element, "pointerup.bs.swipe", (t => this._end(t))), this._element.classList.add("pointer-event")) : (I.on(this._element, "touchstart.bs.swipe", (t => this._start(t))), I.on(this._element, "touchmove.bs.swipe", (t => this._move(t))), I.on(this._element, "touchend.bs.swipe", (t => this._end(t))))
        }
        _eventIsPointerPenTouch(t) {
            return this._supportPointerEvents && ("pen" === t.pointerType || "touch" === t.pointerType)
        }
        static isSupported() {
            return "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0
        }
    }
    const K = "next",
        Z = "prev",
        J = "left",
        tt = "right",
        et = "slid.bs.carousel",
        nt = "carousel",
        rt = "active",
        it = {
            ArrowLeft: tt,
            ArrowRight: J
        },
        ot = {
            interval: 5e3,
            keyboard: !0,
            pause: "hover",
            ride: !1,
            touch: !0,
            wrap: !0
        },
        st = {
            interval: "(number|boolean)",
            keyboard: "boolean",
            pause: "(string|boolean)",
            ride: "(boolean|string)",
            touch: "boolean",
            wrap: "boolean"
        };
    class at extends H {
        constructor(t, e) {
            super(t, e), this._interval = null, this._activeElement = null, this._isSliding = !1, this.touchTimeout = null, this._swipeHelper = null, this._indicatorsElement = $.findOne(".carousel-indicators", this._element), this._addEventListeners(), this._config.ride === nt && this.cycle()
        }
        static get Default() {
            return ot
        }
        static get DefaultType() {
            return st
        }
        static get NAME() {
            return "carousel"
        }
        next() {
            this._slide(K)
        }
        nextWhenVisible() {
            !document.hidden && a(this._element) && this.next()
        }
        prev() {
            this._slide(Z)
        }
        pause() {
            this._isSliding && i(this._element), this._clearInterval()
        }
        cycle() {
            this._clearInterval(), this._updateInterval(), this._interval = setInterval((() => this.nextWhenVisible()), this._config.interval)
        }
        _maybeEnableCycle() {
            this._config.ride && (this._isSliding ? I.one(this._element, et, (() => this.cycle())) : this.cycle())
        }
        to(t) {
            const e = this._getItems();
            if (t > e.length - 1 || t < 0) return;
            if (this._isSliding) return void I.one(this._element, et, (() => this.to(t)));
            const n = this._getItemIndex(this._getActive());
            if (n === t) return;
            const r = t > n ? K : Z;
            this._slide(r, e[t])
        }
        dispose() {
            this._swipeHelper && this._swipeHelper.dispose(), super.dispose()
        }
        _configAfterMerge(t) {
            return t.defaultInterval = t.interval, t
        }
        _addEventListeners() {
            this._config.keyboard && I.on(this._element, "keydown.bs.carousel", (t => this._keydown(t))), "hover" === this._config.pause && (I.on(this._element, "mouseenter.bs.carousel", (() => this.pause())), I.on(this._element, "mouseleave.bs.carousel", (() => this._maybeEnableCycle()))), this._config.touch && G.isSupported() && this._addTouchEventListeners()
        }
        _addTouchEventListeners() {
            for (const t of $.find(".carousel-item img", this._element)) I.on(t, "dragstart.bs.carousel", (t => t.preventDefault()));
            const t = {
                leftCallback: () => this._slide(this._directionToOrder(J)),
                rightCallback: () => this._slide(this._directionToOrder(tt)),
                endCallback: () => {
                    "hover" === this._config.pause && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), this.touchTimeout = setTimeout((() => this._maybeEnableCycle()), 500 + this._config.interval))
                }
            };
            this._swipeHelper = new G(this._element, t)
        }
        _keydown(t) {
            if (/input|textarea/i.test(t.target.tagName)) return;
            const e = it[t.key];
            e && (t.preventDefault(), this._slide(this._directionToOrder(e)))
        }
        _getItemIndex(t) {
            return this._getItems().indexOf(t)
        }
        _setActiveIndicatorElement(t) {
            if (!this._indicatorsElement) return;
            const e = $.findOne(".active", this._indicatorsElement);
            e.classList.remove(rt), e.removeAttribute("aria-current");
            const n = $.findOne(`[data-bs-slide-to="${t}"]`, this._indicatorsElement);
            n && (n.classList.add(rt), n.setAttribute("aria-current", "true"))
        }
        _updateInterval() {
            const t = this._activeElement || this._getActive();
            if (!t) return;
            const e = Number.parseInt(t.getAttribute("data-bs-interval"), 10);
            this._config.interval = e || this._config.defaultInterval
        }
        _slide(t, e = null) {
            if (this._isSliding) return;
            const n = this._getActive(),
                r = t === K,
                i = e || v(this._getItems(), n, r, this._config.wrap);
            if (i === n) return;
            const o = this._getItemIndex(i),
                s = e => I.trigger(this._element, e, {
                    relatedTarget: i,
                    direction: this._orderToDirection(t),
                    from: this._getItemIndex(n),
                    to: o
                });
            if (s("slide.bs.carousel").defaultPrevented) return;
            if (!n || !i) return;
            const a = Boolean(this._interval);
            this.pause(), this._isSliding = !0, this._setActiveIndicatorElement(o), this._activeElement = i;
            const l = r ? "carousel-item-start" : "carousel-item-end",
                c = r ? "carousel-item-next" : "carousel-item-prev";
            i.classList.add(c), d(i), n.classList.add(l), i.classList.add(l), this._queueCallback((() => {
                i.classList.remove(l, c), i.classList.add(rt), n.classList.remove(rt, c, l), this._isSliding = !1, s(et)
            }), n, this._isAnimated()), a && this.cycle()
        }
        _isAnimated() {
            return this._element.classList.contains("slide")
        }
        _getActive() {
            return $.findOne(".active.carousel-item", this._element)
        }
        _getItems() {
            return $.find(".carousel-item", this._element)
        }
        _clearInterval() {
            this._interval && (clearInterval(this._interval), this._interval = null)
        }
        _directionToOrder(t) {
            return p() ? t === J ? Z : K : t === J ? K : Z
        }
        _orderToDirection(t) {
            return p() ? t === Z ? J : tt : t === Z ? tt : J
        }
        static jQueryInterface(t) {
            return this.each((function() {
                const e = at.getOrCreateInstance(this, t);
                if ("number" != typeof t) {
                    if ("string" == typeof t) {
                        if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
                        e[t]()
                    }
                } else e.to(t)
            }))
        }
    }
    I.on(document, "click.bs.carousel.data-api", "[data-bs-slide], [data-bs-slide-to]", (function(t) {
        const e = r(this);
        if (!e || !e.classList.contains(nt)) return;
        t.preventDefault();
        const n = at.getOrCreateInstance(e),
            i = this.getAttribute("data-bs-slide-to");
        return i ? (n.to(i), void n._maybeEnableCycle()) : "next" === B.getDataAttribute(this, "slide") ? (n.next(), void n._maybeEnableCycle()) : (n.prev(), void n._maybeEnableCycle())
    })), I.on(window, "load.bs.carousel.data-api", (() => {
        const t = $.find('[data-bs-ride="carousel"]');
        for (const e of t) at.getOrCreateInstance(e)
    })), g(at);
    const lt = "show",
        ct = "collapse",
        ut = "collapsing",
        dt = '[data-bs-toggle="collapse"]',
        ft = {
            parent: null,
            toggle: !0
        },
        ht = {
            parent: "(null|element)",
            toggle: "boolean"
        };
    class pt extends H {
        constructor(t, e) {
            super(t, e), this._isTransitioning = !1, this._triggerArray = [];
            const r = $.find(dt);
            for (const t of r) {
                const e = n(t),
                    r = $.find(e).filter((t => t === this._element));
                null !== e && r.length && this._triggerArray.push(t)
            }
            this._initializeChildren(), this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()), this._config.toggle && this.toggle()
        }
        static get Default() {
            return ft
        }
        static get DefaultType() {
            return ht
        }
        static get NAME() {
            return "collapse"
        }
        toggle() {
            this._isShown() ? this.hide() : this.show()
        }
        show() {
            if (this._isTransitioning || this._isShown()) return;
            let t = [];
            if (this._config.parent && (t = this._getFirstLevelChildren(".collapse.show, .collapse.collapsing").filter((t => t !== this._element)).map((t => pt.getOrCreateInstance(t, {
                    toggle: !1
                })))), t.length && t[0]._isTransitioning) return;
            if (I.trigger(this._element, "show.bs.collapse").defaultPrevented) return;
            for (const e of t) e.hide();
            const e = this._getDimension();
            this._element.classList.remove(ct), this._element.classList.add(ut), this._element.style[e] = 0, this._addAriaAndCollapsedClass(this._triggerArray, !0), this._isTransitioning = !0;
            const n = `scroll${e[0].toUpperCase()+e.slice(1)}`;
            this._queueCallback((() => {
                this._isTransitioning = !1, this._element.classList.remove(ut), this._element.classList.add(ct, lt), this._element.style[e] = "", I.trigger(this._element, "shown.bs.collapse")
            }), this._element, !0), this._element.style[e] = `${this._element[n]}px`
        }
        hide() {
            if (this._isTransitioning || !this._isShown()) return;
            if (I.trigger(this._element, "hide.bs.collapse").defaultPrevented) return;
            const t = this._getDimension();
            this._element.style[t] = `${this._element.getBoundingClientRect()[t]}px`, d(this._element), this._element.classList.add(ut), this._element.classList.remove(ct, lt);
            for (const t of this._triggerArray) {
                const e = r(t);
                e && !this._isShown(e) && this._addAriaAndCollapsedClass([t], !1)
            }
            this._isTransitioning = !0, this._element.style[t] = "", this._queueCallback((() => {
                this._isTransitioning = !1, this._element.classList.remove(ut), this._element.classList.add(ct), I.trigger(this._element, "hidden.bs.collapse")
            }), this._element, !0)
        }
        _isShown(t = this._element) {
            return t.classList.contains(lt)
        }
        _configAfterMerge(t) {
            return t.toggle = Boolean(t.toggle), t.parent = s(t.parent), t
        }
        _getDimension() {
            return this._element.classList.contains("collapse-horizontal") ? "width" : "height"
        }
        _initializeChildren() {
            if (!this._config.parent) return;
            const t = this._getFirstLevelChildren(dt);
            for (const e of t) {
                const t = r(e);
                t && this._addAriaAndCollapsedClass([e], this._isShown(t))
            }
        }
        _getFirstLevelChildren(t) {
            const e = $.find(":scope .collapse .collapse", this._config.parent);
            return $.find(t, this._config.parent).filter((t => !e.includes(t)))
        }
        _addAriaAndCollapsedClass(t, e) {
            if (t.length)
                for (const n of t) n.classList.toggle("collapsed", !e), n.setAttribute("aria-expanded", e)
        }
        static jQueryInterface(t) {
            const e = {};
            return "string" == typeof t && /show|hide/.test(t) && (e.toggle = !1), this.each((function() {
                const n = pt.getOrCreateInstance(this, e);
                if ("string" == typeof t) {
                    if (void 0 === n[t]) throw new TypeError(`No method named "${t}"`);
                    n[t]()
                }
            }))
        }
    }
    I.on(document, "click.bs.collapse.data-api", dt, (function(t) {
        ("A" === t.target.tagName || t.delegateTarget && "A" === t.delegateTarget.tagName) && t.preventDefault();
        const e = n(this),
            r = $.find(e);
        for (const t of r) pt.getOrCreateInstance(t, {
            toggle: !1
        }).toggle()
    })), g(pt);
    var gt = "top",
        mt = "bottom",
        _t = "right",
        vt = "left",
        yt = "auto",
        bt = [gt, mt, _t, vt],
        wt = "start",
        xt = "end",
        At = "clippingParents",
        Tt = "viewport",
        kt = "popper",
        Lt = "reference",
        Et = bt.reduce((function(t, e) {
            return t.concat([e + "-" + wt, e + "-" + xt])
        }), []),
        St = [].concat(bt, [yt]).reduce((function(t, e) {
            return t.concat([e, e + "-" + wt, e + "-" + xt])
        }), []),
        Ct = "beforeRead",
        Ot = "read",
        Mt = "afterRead",
        Pt = "beforeMain",
        Dt = "main",
        It = "afterMain",
        Nt = "beforeWrite",
        zt = "write",
        qt = "afterWrite",
        Rt = [Ct, Ot, Mt, Pt, Dt, It, Nt, zt, qt];

    function Ft(t) {
        return t ? (t.nodeName || "").toLowerCase() : null
    }

    function Bt(t) {
        if (null == t) return window;
        if ("[object Window]" !== t.toString()) {
            var e = t.ownerDocument;
            return e && e.defaultView || window
        }
        return t
    }

    function jt(t) {
        return t instanceof Bt(t).Element || t instanceof Element
    }

    function Ht(t) {
        return t instanceof Bt(t).HTMLElement || t instanceof HTMLElement
    }

    function Wt(t) {
        return "undefined" != typeof ShadowRoot && (t instanceof Bt(t).ShadowRoot || t instanceof ShadowRoot)
    }
    const Xt = {
        name: "applyStyles",
        enabled: !0,
        phase: "write",
        fn: function(t) {
            var e = t.state;
            Object.keys(e.elements).forEach((function(t) {
                var n = e.styles[t] || {},
                    r = e.attributes[t] || {},
                    i = e.elements[t];
                Ht(i) && Ft(i) && (Object.assign(i.style, n), Object.keys(r).forEach((function(t) {
                    var e = r[t];
                    !1 === e ? i.removeAttribute(t) : i.setAttribute(t, !0 === e ? "" : e)
                })))
            }))
        },
        effect: function(t) {
            var e = t.state,
                n = {
                    popper: {
                        position: e.options.strategy,
                        left: "0",
                        top: "0",
                        margin: "0"
                    },
                    arrow: {
                        position: "absolute"
                    },
                    reference: {}
                };
            return Object.assign(e.elements.popper.style, n.popper), e.styles = n, e.elements.arrow && Object.assign(e.elements.arrow.style, n.arrow),
                function() {
                    Object.keys(e.elements).forEach((function(t) {
                        var r = e.elements[t],
                            i = e.attributes[t] || {},
                            o = Object.keys(e.styles.hasOwnProperty(t) ? e.styles[t] : n[t]).reduce((function(t, e) {
                                return t[e] = "", t
                            }), {});
                        Ht(r) && Ft(r) && (Object.assign(r.style, o), Object.keys(i).forEach((function(t) {
                            r.removeAttribute(t)
                        })))
                    }))
                }
        },
        requires: ["computeStyles"]
    };

    function Yt(t) {
        return t.split("-")[0]
    }
    var Vt = Math.max,
        $t = Math.min,
        Ut = Math.round;

    function Qt() {
        var t = navigator.userAgentData;
        return null != t && t.brands ? t.brands.map((function(t) {
            return t.brand + "/" + t.version
        })).join(" ") : navigator.userAgent
    }

    function Gt() {
        return !/^((?!chrome|android).)*safari/i.test(Qt())
    }

    function Kt(t, e, n) {
        void 0 === e && (e = !1), void 0 === n && (n = !1);
        var r = t.getBoundingClientRect(),
            i = 1,
            o = 1;
        e && Ht(t) && (i = t.offsetWidth > 0 && Ut(r.width) / t.offsetWidth || 1, o = t.offsetHeight > 0 && Ut(r.height) / t.offsetHeight || 1);
        var s = (jt(t) ? Bt(t) : window).visualViewport,
            a = !Gt() && n,
            l = (r.left + (a && s ? s.offsetLeft : 0)) / i,
            c = (r.top + (a && s ? s.offsetTop : 0)) / o,
            u = r.width / i,
            d = r.height / o;
        return {
            width: u,
            height: d,
            top: c,
            right: l + u,
            bottom: c + d,
            left: l,
            x: l,
            y: c
        }
    }

    function Zt(t) {
        var e = Kt(t),
            n = t.offsetWidth,
            r = t.offsetHeight;
        return Math.abs(e.width - n) <= 1 && (n = e.width), Math.abs(e.height - r) <= 1 && (r = e.height), {
            x: t.offsetLeft,
            y: t.offsetTop,
            width: n,
            height: r
        }
    }

    function Jt(t, e) {
        var n = e.getRootNode && e.getRootNode();
        if (t.contains(e)) return !0;
        if (n && Wt(n)) {
            var r = e;
            do {
                if (r && t.isSameNode(r)) return !0;
                r = r.parentNode || r.host
            } while (r)
        }
        return !1
    }

    function te(t) {
        return Bt(t).getComputedStyle(t)
    }

    function ee(t) {
        return ["table", "td", "th"].indexOf(Ft(t)) >= 0
    }

    function ne(t) {
        return ((jt(t) ? t.ownerDocument : t.document) || window.document).documentElement
    }

    function re(t) {
        return "html" === Ft(t) ? t : t.assignedSlot || t.parentNode || (Wt(t) ? t.host : null) || ne(t)
    }

    function ie(t) {
        return Ht(t) && "fixed" !== te(t).position ? t.offsetParent : null
    }

    function oe(t) {
        for (var e = Bt(t), n = ie(t); n && ee(n) && "static" === te(n).position;) n = ie(n);
        return n && ("html" === Ft(n) || "body" === Ft(n) && "static" === te(n).position) ? e : n || function(t) {
            var e = /firefox/i.test(Qt());
            if (/Trident/i.test(Qt()) && Ht(t) && "fixed" === te(t).position) return null;
            var n = re(t);
            for (Wt(n) && (n = n.host); Ht(n) && ["html", "body"].indexOf(Ft(n)) < 0;) {
                var r = te(n);
                if ("none" !== r.transform || "none" !== r.perspective || "paint" === r.contain || -1 !== ["transform", "perspective"].indexOf(r.willChange) || e && "filter" === r.willChange || e && r.filter && "none" !== r.filter) return n;
                n = n.parentNode
            }
            return null
        }(t) || e
    }

    function se(t) {
        return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y"
    }

    function ae(t, e, n) {
        return Vt(t, $t(e, n))
    }

    function le(t) {
        return Object.assign({}, {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }, t)
    }

    function ce(t, e) {
        return e.reduce((function(e, n) {
            return e[n] = t, e
        }), {})
    }
    const ue = {
        name: "arrow",
        enabled: !0,
        phase: "main",
        fn: function(t) {
            var e, n = t.state,
                r = t.name,
                i = t.options,
                o = n.elements.arrow,
                s = n.modifiersData.popperOffsets,
                a = Yt(n.placement),
                l = se(a),
                c = [vt, _t].indexOf(a) >= 0 ? "height" : "width";
            if (o && s) {
                var u = function(t, e) {
                        return le("number" != typeof(t = "function" == typeof t ? t(Object.assign({}, e.rects, {
                            placement: e.placement
                        })) : t) ? t : ce(t, bt))
                    }(i.padding, n),
                    d = Zt(o),
                    f = "y" === l ? gt : vt,
                    h = "y" === l ? mt : _t,
                    p = n.rects.reference[c] + n.rects.reference[l] - s[l] - n.rects.popper[c],
                    g = s[l] - n.rects.reference[l],
                    m = oe(o),
                    _ = m ? "y" === l ? m.clientHeight || 0 : m.clientWidth || 0 : 0,
                    v = p / 2 - g / 2,
                    y = u[f],
                    b = _ - d[c] - u[h],
                    w = _ / 2 - d[c] / 2 + v,
                    x = ae(y, w, b),
                    A = l;
                n.modifiersData[r] = ((e = {})[A] = x, e.centerOffset = x - w, e)
            }
        },
        effect: function(t) {
            var e = t.state,
                n = t.options.element,
                r = void 0 === n ? "[data-popper-arrow]" : n;
            null != r && ("string" != typeof r || (r = e.elements.popper.querySelector(r))) && Jt(e.elements.popper, r) && (e.elements.arrow = r)
        },
        requires: ["popperOffsets"],
        requiresIfExists: ["preventOverflow"]
    };

    function de(t) {
        return t.split("-")[1]
    }
    var fe = {
        top: "auto",
        right: "auto",
        bottom: "auto",
        left: "auto"
    };

    function he(t) {
        var e, n = t.popper,
            r = t.popperRect,
            i = t.placement,
            o = t.variation,
            s = t.offsets,
            a = t.position,
            l = t.gpuAcceleration,
            c = t.adaptive,
            u = t.roundOffsets,
            d = t.isFixed,
            f = s.x,
            h = void 0 === f ? 0 : f,
            p = s.y,
            g = void 0 === p ? 0 : p,
            m = "function" == typeof u ? u({
                x: h,
                y: g
            }) : {
                x: h,
                y: g
            };
        h = m.x, g = m.y;
        var _ = s.hasOwnProperty("x"),
            v = s.hasOwnProperty("y"),
            y = vt,
            b = gt,
            w = window;
        if (c) {
            var x = oe(n),
                A = "clientHeight",
                T = "clientWidth";
            x === Bt(n) && "static" !== te(x = ne(n)).position && "absolute" === a && (A = "scrollHeight", T = "scrollWidth"), (i === gt || (i === vt || i === _t) && o === xt) && (b = mt, g -= (d && x === w && w.visualViewport ? w.visualViewport.height : x[A]) - r.height, g *= l ? 1 : -1), i !== vt && (i !== gt && i !== mt || o !== xt) || (y = _t, h -= (d && x === w && w.visualViewport ? w.visualViewport.width : x[T]) - r.width, h *= l ? 1 : -1)
        }
        var k, L = Object.assign({
                position: a
            }, c && fe),
            E = !0 === u ? function(t) {
                var e = t.x,
                    n = t.y,
                    r = window.devicePixelRatio || 1;
                return {
                    x: Ut(e * r) / r || 0,
                    y: Ut(n * r) / r || 0
                }
            }({
                x: h,
                y: g
            }) : {
                x: h,
                y: g
            };
        return h = E.x, g = E.y, l ? Object.assign({}, L, ((k = {})[b] = v ? "0" : "", k[y] = _ ? "0" : "", k.transform = (w.devicePixelRatio || 1) <= 1 ? "translate(" + h + "px, " + g + "px)" : "translate3d(" + h + "px, " + g + "px, 0)", k)) : Object.assign({}, L, ((e = {})[b] = v ? g + "px" : "", e[y] = _ ? h + "px" : "", e.transform = "", e))
    }
    const pe = {
        name: "computeStyles",
        enabled: !0,
        phase: "beforeWrite",
        fn: function(t) {
            var e = t.state,
                n = t.options,
                r = n.gpuAcceleration,
                i = void 0 === r || r,
                o = n.adaptive,
                s = void 0 === o || o,
                a = n.roundOffsets,
                l = void 0 === a || a,
                c = {
                    placement: Yt(e.placement),
                    variation: de(e.placement),
                    popper: e.elements.popper,
                    popperRect: e.rects.popper,
                    gpuAcceleration: i,
                    isFixed: "fixed" === e.options.strategy
                };
            null != e.modifiersData.popperOffsets && (e.styles.popper = Object.assign({}, e.styles.popper, he(Object.assign({}, c, {
                offsets: e.modifiersData.popperOffsets,
                position: e.options.strategy,
                adaptive: s,
                roundOffsets: l
            })))), null != e.modifiersData.arrow && (e.styles.arrow = Object.assign({}, e.styles.arrow, he(Object.assign({}, c, {
                offsets: e.modifiersData.arrow,
                position: "absolute",
                adaptive: !1,
                roundOffsets: l
            })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {
                "data-popper-placement": e.placement
            })
        },
        data: {}
    };
    var ge = {
        passive: !0
    };
    const me = {
        name: "eventListeners",
        enabled: !0,
        phase: "write",
        fn: function() {},
        effect: function(t) {
            var e = t.state,
                n = t.instance,
                r = t.options,
                i = r.scroll,
                o = void 0 === i || i,
                s = r.resize,
                a = void 0 === s || s,
                l = Bt(e.elements.popper),
                c = [].concat(e.scrollParents.reference, e.scrollParents.popper);
            return o && c.forEach((function(t) {
                    t.addEventListener("scroll", n.update, ge)
                })), a && l.addEventListener("resize", n.update, ge),
                function() {
                    o && c.forEach((function(t) {
                        t.removeEventListener("scroll", n.update, ge)
                    })), a && l.removeEventListener("resize", n.update, ge)
                }
        },
        data: {}
    };
    var _e = {
        left: "right",
        right: "left",
        bottom: "top",
        top: "bottom"
    };

    function ve(t) {
        return t.replace(/left|right|bottom|top/g, (function(t) {
            return _e[t]
        }))
    }
    var ye = {
        start: "end",
        end: "start"
    };

    function be(t) {
        return t.replace(/start|end/g, (function(t) {
            return ye[t]
        }))
    }

    function we(t) {
        var e = Bt(t);
        return {
            scrollLeft: e.pageXOffset,
            scrollTop: e.pageYOffset
        }
    }

    function xe(t) {
        return Kt(ne(t)).left + we(t).scrollLeft
    }

    function Ae(t) {
        var e = te(t),
            n = e.overflow,
            r = e.overflowX,
            i = e.overflowY;
        return /auto|scroll|overlay|hidden/.test(n + i + r)
    }

    function Te(t) {
        return ["html", "body", "#document"].indexOf(Ft(t)) >= 0 ? t.ownerDocument.body : Ht(t) && Ae(t) ? t : Te(re(t))
    }

    function ke(t, e) {
        var n;
        void 0 === e && (e = []);
        var r = Te(t),
            i = r === (null == (n = t.ownerDocument) ? void 0 : n.body),
            o = Bt(r),
            s = i ? [o].concat(o.visualViewport || [], Ae(r) ? r : []) : r,
            a = e.concat(s);
        return i ? a : a.concat(ke(re(s)))
    }

    function Le(t) {
        return Object.assign({}, t, {
            left: t.x,
            top: t.y,
            right: t.x + t.width,
            bottom: t.y + t.height
        })
    }

    function Ee(t, e, n) {
        return e === Tt ? Le(function(t, e) {
            var n = Bt(t),
                r = ne(t),
                i = n.visualViewport,
                o = r.clientWidth,
                s = r.clientHeight,
                a = 0,
                l = 0;
            if (i) {
                o = i.width, s = i.height;
                var c = Gt();
                (c || !c && "fixed" === e) && (a = i.offsetLeft, l = i.offsetTop)
            }
            return {
                width: o,
                height: s,
                x: a + xe(t),
                y: l
            }
        }(t, n)) : jt(e) ? function(t, e) {
            var n = Kt(t, !1, "fixed" === e);
            return n.top = n.top + t.clientTop, n.left = n.left + t.clientLeft, n.bottom = n.top + t.clientHeight, n.right = n.left + t.clientWidth, n.width = t.clientWidth, n.height = t.clientHeight, n.x = n.left, n.y = n.top, n
        }(e, n) : Le(function(t) {
            var e, n = ne(t),
                r = we(t),
                i = null == (e = t.ownerDocument) ? void 0 : e.body,
                o = Vt(n.scrollWidth, n.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0),
                s = Vt(n.scrollHeight, n.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0),
                a = -r.scrollLeft + xe(t),
                l = -r.scrollTop;
            return "rtl" === te(i || n).direction && (a += Vt(n.clientWidth, i ? i.clientWidth : 0) - o), {
                width: o,
                height: s,
                x: a,
                y: l
            }
        }(ne(t)))
    }

    function Se(t) {
        var e, n = t.reference,
            r = t.element,
            i = t.placement,
            o = i ? Yt(i) : null,
            s = i ? de(i) : null,
            a = n.x + n.width / 2 - r.width / 2,
            l = n.y + n.height / 2 - r.height / 2;
        switch (o) {
            case gt:
                e = {
                    x: a,
                    y: n.y - r.height
                };
                break;
            case mt:
                e = {
                    x: a,
                    y: n.y + n.height
                };
                break;
            case _t:
                e = {
                    x: n.x + n.width,
                    y: l
                };
                break;
            case vt:
                e = {
                    x: n.x - r.width,
                    y: l
                };
                break;
            default:
                e = {
                    x: n.x,
                    y: n.y
                }
        }
        var c = o ? se(o) : null;
        if (null != c) {
            var u = "y" === c ? "height" : "width";
            switch (s) {
                case wt:
                    e[c] = e[c] - (n[u] / 2 - r[u] / 2);
                    break;
                case xt:
                    e[c] = e[c] + (n[u] / 2 - r[u] / 2)
            }
        }
        return e
    }

    function Ce(t, e) {
        void 0 === e && (e = {});
        var n = e,
            r = n.placement,
            i = void 0 === r ? t.placement : r,
            o = n.strategy,
            s = void 0 === o ? t.strategy : o,
            a = n.boundary,
            l = void 0 === a ? At : a,
            c = n.rootBoundary,
            u = void 0 === c ? Tt : c,
            d = n.elementContext,
            f = void 0 === d ? kt : d,
            h = n.altBoundary,
            p = void 0 !== h && h,
            g = n.padding,
            m = void 0 === g ? 0 : g,
            _ = le("number" != typeof m ? m : ce(m, bt)),
            v = f === kt ? Lt : kt,
            y = t.rects.popper,
            b = t.elements[p ? v : f],
            w = function(t, e, n, r) {
                var i = "clippingParents" === e ? function(t) {
                        var e = ke(re(t)),
                            n = ["absolute", "fixed"].indexOf(te(t).position) >= 0 && Ht(t) ? oe(t) : t;
                        return jt(n) ? e.filter((function(t) {
                            return jt(t) && Jt(t, n) && "body" !== Ft(t)
                        })) : []
                    }(t) : [].concat(e),
                    o = [].concat(i, [n]),
                    s = o[0],
                    a = o.reduce((function(e, n) {
                        var i = Ee(t, n, r);
                        return e.top = Vt(i.top, e.top), e.right = $t(i.right, e.right), e.bottom = $t(i.bottom, e.bottom), e.left = Vt(i.left, e.left), e
                    }), Ee(t, s, r));
                return a.width = a.right - a.left, a.height = a.bottom - a.top, a.x = a.left, a.y = a.top, a
            }(jt(b) ? b : b.contextElement || ne(t.elements.popper), l, u, s),
            x = Kt(t.elements.reference),
            A = Se({
                reference: x,
                element: y,
                strategy: "absolute",
                placement: i
            }),
            T = Le(Object.assign({}, y, A)),
            k = f === kt ? T : x,
            L = {
                top: w.top - k.top + _.top,
                bottom: k.bottom - w.bottom + _.bottom,
                left: w.left - k.left + _.left,
                right: k.right - w.right + _.right
            },
            E = t.modifiersData.offset;
        if (f === kt && E) {
            var S = E[i];
            Object.keys(L).forEach((function(t) {
                var e = [_t, mt].indexOf(t) >= 0 ? 1 : -1,
                    n = [gt, mt].indexOf(t) >= 0 ? "y" : "x";
                L[t] += S[n] * e
            }))
        }
        return L
    }
    const Oe = {
        name: "flip",
        enabled: !0,
        phase: "main",
        fn: function(t) {
            var e = t.state,
                n = t.options,
                r = t.name;
            if (!e.modifiersData[r]._skip) {
                for (var i = n.mainAxis, o = void 0 === i || i, s = n.altAxis, a = void 0 === s || s, l = n.fallbackPlacements, c = n.padding, u = n.boundary, d = n.rootBoundary, f = n.altBoundary, h = n.flipVariations, p = void 0 === h || h, g = n.allowedAutoPlacements, m = e.options.placement, _ = Yt(m), v = l || (_ !== m && p ? function(t) {
                        if (Yt(t) === yt) return [];
                        var e = ve(t);
                        return [be(t), e, be(e)]
                    }(m) : [ve(m)]), y = [m].concat(v).reduce((function(t, n) {
                        return t.concat(Yt(n) === yt ? function(t, e) {
                            void 0 === e && (e = {});
                            var n = e,
                                r = n.placement,
                                i = n.boundary,
                                o = n.rootBoundary,
                                s = n.padding,
                                a = n.flipVariations,
                                l = n.allowedAutoPlacements,
                                c = void 0 === l ? St : l,
                                u = de(r),
                                d = u ? a ? Et : Et.filter((function(t) {
                                    return de(t) === u
                                })) : bt,
                                f = d.filter((function(t) {
                                    return c.indexOf(t) >= 0
                                }));
                            0 === f.length && (f = d);
                            var h = f.reduce((function(e, n) {
                                return e[n] = Ce(t, {
                                    placement: n,
                                    boundary: i,
                                    rootBoundary: o,
                                    padding: s
                                })[Yt(n)], e
                            }), {});
                            return Object.keys(h).sort((function(t, e) {
                                return h[t] - h[e]
                            }))
                        }(e, {
                            placement: n,
                            boundary: u,
                            rootBoundary: d,
                            padding: c,
                            flipVariations: p,
                            allowedAutoPlacements: g
                        }) : n)
                    }), []), b = e.rects.reference, w = e.rects.popper, x = new Map, A = !0, T = y[0], k = 0; k < y.length; k++) {
                    var L = y[k],
                        E = Yt(L),
                        S = de(L) === wt,
                        C = [gt, mt].indexOf(E) >= 0,
                        O = C ? "width" : "height",
                        M = Ce(e, {
                            placement: L,
                            boundary: u,
                            rootBoundary: d,
                            altBoundary: f,
                            padding: c
                        }),
                        P = C ? S ? _t : vt : S ? mt : gt;
                    b[O] > w[O] && (P = ve(P));
                    var D = ve(P),
                        I = [];
                    if (o && I.push(M[E] <= 0), a && I.push(M[P] <= 0, M[D] <= 0), I.every((function(t) {
                            return t
                        }))) {
                        T = L, A = !1;
                        break
                    }
                    x.set(L, I)
                }
                if (A)
                    for (var N = function(t) {
                            var e = y.find((function(e) {
                                var n = x.get(e);
                                if (n) return n.slice(0, t).every((function(t) {
                                    return t
                                }))
                            }));
                            if (e) return T = e, "break"
                        }, z = p ? 3 : 1; z > 0 && "break" !== N(z); z--);
                e.placement !== T && (e.modifiersData[r]._skip = !0, e.placement = T, e.reset = !0)
            }
        },
        requiresIfExists: ["offset"],
        data: {
            _skip: !1
        }
    };

    function Me(t, e, n) {
        return void 0 === n && (n = {
            x: 0,
            y: 0
        }), {
            top: t.top - e.height - n.y,
            right: t.right - e.width + n.x,
            bottom: t.bottom - e.height + n.y,
            left: t.left - e.width - n.x
        }
    }

    function Pe(t) {
        return [gt, _t, mt, vt].some((function(e) {
            return t[e] >= 0
        }))
    }
    const De = {
            name: "hide",
            enabled: !0,
            phase: "main",
            requiresIfExists: ["preventOverflow"],
            fn: function(t) {
                var e = t.state,
                    n = t.name,
                    r = e.rects.reference,
                    i = e.rects.popper,
                    o = e.modifiersData.preventOverflow,
                    s = Ce(e, {
                        elementContext: "reference"
                    }),
                    a = Ce(e, {
                        altBoundary: !0
                    }),
                    l = Me(s, r),
                    c = Me(a, i, o),
                    u = Pe(l),
                    d = Pe(c);
                e.modifiersData[n] = {
                    referenceClippingOffsets: l,
                    popperEscapeOffsets: c,
                    isReferenceHidden: u,
                    hasPopperEscaped: d
                }, e.attributes.popper = Object.assign({}, e.attributes.popper, {
                    "data-popper-reference-hidden": u,
                    "data-popper-escaped": d
                })
            }
        },
        Ie = {
            name: "offset",
            enabled: !0,
            phase: "main",
            requires: ["popperOffsets"],
            fn: function(t) {
                var e = t.state,
                    n = t.options,
                    r = t.name,
                    i = n.offset,
                    o = void 0 === i ? [0, 0] : i,
                    s = St.reduce((function(t, n) {
                        return t[n] = function(t, e, n) {
                            var r = Yt(t),
                                i = [vt, gt].indexOf(r) >= 0 ? -1 : 1,
                                o = "function" == typeof n ? n(Object.assign({}, e, {
                                    placement: t
                                })) : n,
                                s = o[0],
                                a = o[1];
                            return s = s || 0, a = (a || 0) * i, [vt, _t].indexOf(r) >= 0 ? {
                                x: a,
                                y: s
                            } : {
                                x: s,
                                y: a
                            }
                        }(n, e.rects, o), t
                    }), {}),
                    a = s[e.placement],
                    l = a.x,
                    c = a.y;
                null != e.modifiersData.popperOffsets && (e.modifiersData.popperOffsets.x += l, e.modifiersData.popperOffsets.y += c), e.modifiersData[r] = s
            }
        },
        Ne = {
            name: "popperOffsets",
            enabled: !0,
            phase: "read",
            fn: function(t) {
                var e = t.state,
                    n = t.name;
                e.modifiersData[n] = Se({
                    reference: e.rects.reference,
                    element: e.rects.popper,
                    strategy: "absolute",
                    placement: e.placement
                })
            },
            data: {}
        },
        ze = {
            name: "preventOverflow",
            enabled: !0,
            phase: "main",
            fn: function(t) {
                var e = t.state,
                    n = t.options,
                    r = t.name,
                    i = n.mainAxis,
                    o = void 0 === i || i,
                    s = n.altAxis,
                    a = void 0 !== s && s,
                    l = n.boundary,
                    c = n.rootBoundary,
                    u = n.altBoundary,
                    d = n.padding,
                    f = n.tether,
                    h = void 0 === f || f,
                    p = n.tetherOffset,
                    g = void 0 === p ? 0 : p,
                    m = Ce(e, {
                        boundary: l,
                        rootBoundary: c,
                        padding: d,
                        altBoundary: u
                    }),
                    _ = Yt(e.placement),
                    v = de(e.placement),
                    y = !v,
                    b = se(_),
                    w = "x" === b ? "y" : "x",
                    x = e.modifiersData.popperOffsets,
                    A = e.rects.reference,
                    T = e.rects.popper,
                    k = "function" == typeof g ? g(Object.assign({}, e.rects, {
                        placement: e.placement
                    })) : g,
                    L = "number" == typeof k ? {
                        mainAxis: k,
                        altAxis: k
                    } : Object.assign({
                        mainAxis: 0,
                        altAxis: 0
                    }, k),
                    E = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null,
                    S = {
                        x: 0,
                        y: 0
                    };
                if (x) {
                    if (o) {
                        var C, O = "y" === b ? gt : vt,
                            M = "y" === b ? mt : _t,
                            P = "y" === b ? "height" : "width",
                            D = x[b],
                            I = D + m[O],
                            N = D - m[M],
                            z = h ? -T[P] / 2 : 0,
                            q = v === wt ? A[P] : T[P],
                            R = v === wt ? -T[P] : -A[P],
                            F = e.elements.arrow,
                            B = h && F ? Zt(F) : {
                                width: 0,
                                height: 0
                            },
                            j = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : {
                                top: 0,
                                right: 0,
                                bottom: 0,
                                left: 0
                            },
                            H = j[O],
                            W = j[M],
                            X = ae(0, A[P], B[P]),
                            Y = y ? A[P] / 2 - z - X - H - L.mainAxis : q - X - H - L.mainAxis,
                            V = y ? -A[P] / 2 + z + X + W + L.mainAxis : R + X + W + L.mainAxis,
                            $ = e.elements.arrow && oe(e.elements.arrow),
                            U = $ ? "y" === b ? $.clientTop || 0 : $.clientLeft || 0 : 0,
                            Q = null != (C = null == E ? void 0 : E[b]) ? C : 0,
                            G = D + V - Q,
                            K = ae(h ? $t(I, D + Y - Q - U) : I, D, h ? Vt(N, G) : N);
                        x[b] = K, S[b] = K - D
                    }
                    if (a) {
                        var Z, J = "x" === b ? gt : vt,
                            tt = "x" === b ? mt : _t,
                            et = x[w],
                            nt = "y" === w ? "height" : "width",
                            rt = et + m[J],
                            it = et - m[tt],
                            ot = -1 !== [gt, vt].indexOf(_),
                            st = null != (Z = null == E ? void 0 : E[w]) ? Z : 0,
                            at = ot ? rt : et - A[nt] - T[nt] - st + L.altAxis,
                            lt = ot ? et + A[nt] + T[nt] - st - L.altAxis : it,
                            ct = h && ot ? function(t, e, n) {
                                var r = ae(t, e, n);
                                return r > n ? n : r
                            }(at, et, lt) : ae(h ? at : rt, et, h ? lt : it);
                        x[w] = ct, S[w] = ct - et
                    }
                    e.modifiersData[r] = S
                }
            },
            requiresIfExists: ["offset"]
        };

    function qe(t, e, n) {
        void 0 === n && (n = !1);
        var r, i, o = Ht(e),
            s = Ht(e) && function(t) {
                var e = t.getBoundingClientRect(),
                    n = Ut(e.width) / t.offsetWidth || 1,
                    r = Ut(e.height) / t.offsetHeight || 1;
                return 1 !== n || 1 !== r
            }(e),
            a = ne(e),
            l = Kt(t, s, n),
            c = {
                scrollLeft: 0,
                scrollTop: 0
            },
            u = {
                x: 0,
                y: 0
            };
        return (o || !o && !n) && (("body" !== Ft(e) || Ae(a)) && (c = (r = e) !== Bt(r) && Ht(r) ? {
            scrollLeft: (i = r).scrollLeft,
            scrollTop: i.scrollTop
        } : we(r)), Ht(e) ? ((u = Kt(e, !0)).x += e.clientLeft, u.y += e.clientTop) : a && (u.x = xe(a))), {
            x: l.left + c.scrollLeft - u.x,
            y: l.top + c.scrollTop - u.y,
            width: l.width,
            height: l.height
        }
    }

    function Re(t) {
        var e = new Map,
            n = new Set,
            r = [];

        function i(t) {
            n.add(t.name), [].concat(t.requires || [], t.requiresIfExists || []).forEach((function(t) {
                if (!n.has(t)) {
                    var r = e.get(t);
                    r && i(r)
                }
            })), r.push(t)
        }
        return t.forEach((function(t) {
            e.set(t.name, t)
        })), t.forEach((function(t) {
            n.has(t.name) || i(t)
        })), r
    }
    var Fe = {
        placement: "bottom",
        modifiers: [],
        strategy: "absolute"
    };

    function Be() {
        for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
        return !e.some((function(t) {
            return !(t && "function" == typeof t.getBoundingClientRect)
        }))
    }

    function je(t) {
        void 0 === t && (t = {});
        var e = t,
            n = e.defaultModifiers,
            r = void 0 === n ? [] : n,
            i = e.defaultOptions,
            o = void 0 === i ? Fe : i;
        return function(t, e, n) {
            void 0 === n && (n = o);
            var i, s, a = {
                    placement: "bottom",
                    orderedModifiers: [],
                    options: Object.assign({}, Fe, o),
                    modifiersData: {},
                    elements: {
                        reference: t,
                        popper: e
                    },
                    attributes: {},
                    styles: {}
                },
                l = [],
                c = !1,
                u = {
                    state: a,
                    setOptions: function(n) {
                        var i = "function" == typeof n ? n(a.options) : n;
                        d(), a.options = Object.assign({}, o, a.options, i), a.scrollParents = {
                            reference: jt(t) ? ke(t) : t.contextElement ? ke(t.contextElement) : [],
                            popper: ke(e)
                        };
                        var s, c, f = function(t) {
                            var e = Re(t);
                            return Rt.reduce((function(t, n) {
                                return t.concat(e.filter((function(t) {
                                    return t.phase === n
                                })))
                            }), [])
                        }((s = [].concat(r, a.options.modifiers), c = s.reduce((function(t, e) {
                            var n = t[e.name];
                            return t[e.name] = n ? Object.assign({}, n, e, {
                                options: Object.assign({}, n.options, e.options),
                                data: Object.assign({}, n.data, e.data)
                            }) : e, t
                        }), {}), Object.keys(c).map((function(t) {
                            return c[t]
                        }))));
                        return a.orderedModifiers = f.filter((function(t) {
                            return t.enabled
                        })), a.orderedModifiers.forEach((function(t) {
                            var e = t.name,
                                n = t.options,
                                r = void 0 === n ? {} : n,
                                i = t.effect;
                            if ("function" == typeof i) {
                                var o = i({
                                    state: a,
                                    name: e,
                                    instance: u,
                                    options: r
                                });
                                l.push(o || function() {})
                            }
                        })), u.update()
                    },
                    forceUpdate: function() {
                        if (!c) {
                            var t = a.elements,
                                e = t.reference,
                                n = t.popper;
                            if (Be(e, n)) {
                                a.rects = {
                                    reference: qe(e, oe(n), "fixed" === a.options.strategy),
                                    popper: Zt(n)
                                }, a.reset = !1, a.placement = a.options.placement, a.orderedModifiers.forEach((function(t) {
                                    return a.modifiersData[t.name] = Object.assign({}, t.data)
                                }));
                                for (var r = 0; r < a.orderedModifiers.length; r++)
                                    if (!0 !== a.reset) {
                                        var i = a.orderedModifiers[r],
                                            o = i.fn,
                                            s = i.options,
                                            l = void 0 === s ? {} : s,
                                            d = i.name;
                                        "function" == typeof o && (a = o({
                                            state: a,
                                            options: l,
                                            name: d,
                                            instance: u
                                        }) || a)
                                    } else a.reset = !1, r = -1
                            }
                        }
                    },
                    update: (i = function() {
                        return new Promise((function(t) {
                            u.forceUpdate(), t(a)
                        }))
                    }, function() {
                        return s || (s = new Promise((function(t) {
                            Promise.resolve().then((function() {
                                s = void 0, t(i())
                            }))
                        }))), s
                    }),
                    destroy: function() {
                        d(), c = !0
                    }
                };
            if (!Be(t, e)) return u;

            function d() {
                l.forEach((function(t) {
                    return t()
                })), l = []
            }
            return u.setOptions(n).then((function(t) {
                !c && n.onFirstUpdate && n.onFirstUpdate(t)
            })), u
        }
    }
    var He = je(),
        We = je({
            defaultModifiers: [me, Ne, pe, Xt]
        }),
        Xe = je({
            defaultModifiers: [me, Ne, pe, Xt, Ie, Oe, ze, ue, De]
        });
    const Ye = Object.freeze(Object.defineProperty({
            __proto__: null,
            popperGenerator: je,
            detectOverflow: Ce,
            createPopperBase: He,
            createPopper: Xe,
            createPopperLite: We,
            top: gt,
            bottom: mt,
            right: _t,
            left: vt,
            auto: yt,
            basePlacements: bt,
            start: wt,
            end: xt,
            clippingParents: At,
            viewport: Tt,
            popper: kt,
            reference: Lt,
            variationPlacements: Et,
            placements: St,
            beforeRead: Ct,
            read: Ot,
            afterRead: Mt,
            beforeMain: Pt,
            main: Dt,
            afterMain: It,
            beforeWrite: Nt,
            write: zt,
            afterWrite: qt,
            modifierPhases: Rt,
            applyStyles: Xt,
            arrow: ue,
            computeStyles: pe,
            eventListeners: me,
            flip: Oe,
            hide: De,
            offset: Ie,
            popperOffsets: Ne,
            preventOverflow: ze
        }, Symbol.toStringTag, {
            value: "Module"
        })),
        Ve = "dropdown",
        $e = "ArrowUp",
        Ue = "ArrowDown",
        Qe = "click.bs.dropdown.data-api",
        Ge = "keydown.bs.dropdown.data-api",
        Ke = "show",
        Ze = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',
        Je = `${Ze}.show`,
        tn = ".dropdown-menu",
        en = p() ? "top-end" : "top-start",
        nn = p() ? "top-start" : "top-end",
        rn = p() ? "bottom-end" : "bottom-start",
        on = p() ? "bottom-start" : "bottom-end",
        sn = p() ? "left-start" : "right-start",
        an = p() ? "right-start" : "left-start",
        ln = {
            autoClose: !0,
            boundary: "clippingParents",
            display: "dynamic",
            offset: [0, 2],
            popperConfig: null,
            reference: "toggle"
        },
        cn = {
            autoClose: "(boolean|string)",
            boundary: "(string|element)",
            display: "string",
            offset: "(array|string|function)",
            popperConfig: "(null|object|function)",
            reference: "(string|element|object)"
        };
    class un extends H {
        constructor(t, e) {
            super(t, e), this._popper = null, this._parent = this._element.parentNode, this._menu = $.next(this._element, tn)[0] || $.prev(this._element, tn)[0] || $.findOne(tn, this._parent), this._inNavbar = this._detectNavbar()
        }
        static get Default() {
            return ln
        }
        static get DefaultType() {
            return cn
        }
        static get NAME() {
            return Ve
        }
        toggle() {
            return this._isShown() ? this.hide() : this.show()
        }
        show() {
            if (l(this._element) || this._isShown()) return;
            const t = {
                relatedTarget: this._element
            };
            if (!I.trigger(this._element, "show.bs.dropdown", t).defaultPrevented) {
                if (this._createPopper(), "ontouchstart" in document.documentElement && !this._parent.closest(".navbar-nav"))
                    for (const t of [].concat(...document.body.children)) I.on(t, "mouseover", u);
                this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.add(Ke), this._element.classList.add(Ke), I.trigger(this._element, "shown.bs.dropdown", t)
            }
        }
        hide() {
            if (l(this._element) || !this._isShown()) return;
            const t = {
                relatedTarget: this._element
            };
            this._completeHide(t)
        }
        dispose() {
            this._popper && this._popper.destroy(), super.dispose()
        }
        update() {
            this._inNavbar = this._detectNavbar(), this._popper && this._popper.update()
        }
        _completeHide(t) {
            if (!I.trigger(this._element, "hide.bs.dropdown", t).defaultPrevented) {
                if ("ontouchstart" in document.documentElement)
                    for (const t of [].concat(...document.body.children)) I.off(t, "mouseover", u);
                this._popper && this._popper.destroy(), this._menu.classList.remove(Ke), this._element.classList.remove(Ke), this._element.setAttribute("aria-expanded", "false"), B.removeDataAttribute(this._menu, "popper"), I.trigger(this._element, "hidden.bs.dropdown", t)
            }
        }
        _getConfig(t) {
            if ("object" == typeof(t = super._getConfig(t)).reference && !o(t.reference) && "function" != typeof t.reference.getBoundingClientRect) throw new TypeError(`${Ve.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
            return t
        }
        _createPopper() {
            if (void 0 === Ye) throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
            let t = this._element;
            "parent" === this._config.reference ? t = this._parent : o(this._config.reference) ? t = s(this._config.reference) : "object" == typeof this._config.reference && (t = this._config.reference);
            const e = this._getPopperConfig();
            this._popper = Xe(t, this._menu, e)
        }
        _isShown() {
            return this._menu.classList.contains(Ke)
        }
        _getPlacement() {
            const t = this._parent;
            if (t.classList.contains("dropend")) return sn;
            if (t.classList.contains("dropstart")) return an;
            if (t.classList.contains("dropup-center")) return "top";
            if (t.classList.contains("dropdown-center")) return "bottom";
            const e = "end" === getComputedStyle(this._menu).getPropertyValue("--bs-position").trim();
            return t.classList.contains("dropup") ? e ? nn : en : e ? on : rn
        }
        _detectNavbar() {
            return null !== this._element.closest(".navbar")
        }
        _getOffset() {
            const {
                offset: t
            } = this._config;
            return "string" == typeof t ? t.split(",").map((t => Number.parseInt(t, 10))) : "function" == typeof t ? e => t(e, this._element) : t
        }
        _getPopperConfig() {
            const t = {
                placement: this._getPlacement(),
                modifiers: [{
                    name: "preventOverflow",
                    options: {
                        boundary: this._config.boundary
                    }
                }, {
                    name: "offset",
                    options: {
                        offset: this._getOffset()
                    }
                }]
            };
            return (this._inNavbar || "static" === this._config.display) && (B.setDataAttribute(this._menu, "popper", "static"), t.modifiers = [{
                name: "applyStyles",
                enabled: !1
            }]), {
                ...t,
                ..."function" == typeof this._config.popperConfig ? this._config.popperConfig(t) : this._config.popperConfig
            }
        }
        _selectMenuItem({
            key: t,
            target: e
        }) {
            const n = $.find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", this._menu).filter((t => a(t)));
            n.length && v(n, e, t === Ue, !n.includes(e)).focus()
        }
        static jQueryInterface(t) {
            return this.each((function() {
                const e = un.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                    e[t]()
                }
            }))
        }
        static clearMenus(t) {
            if (2 === t.button || "keyup" === t.type && "Tab" !== t.key) return;
            const e = $.find(Je);
            for (const n of e) {
                const e = un.getInstance(n);
                if (!e || !1 === e._config.autoClose) continue;
                const r = t.composedPath(),
                    i = r.includes(e._menu);
                if (r.includes(e._element) || "inside" === e._config.autoClose && !i || "outside" === e._config.autoClose && i) continue;
                if (e._menu.contains(t.target) && ("keyup" === t.type && "Tab" === t.key || /input|select|option|textarea|form/i.test(t.target.tagName))) continue;
                const o = {
                    relatedTarget: e._element
                };
                "click" === t.type && (o.clickEvent = t), e._completeHide(o)
            }
        }
        static dataApiKeydownHandler(t) {
            const e = /input|textarea/i.test(t.target.tagName),
                n = "Escape" === t.key,
                r = [$e, Ue].includes(t.key);
            if (!r && !n) return;
            if (e && !n) return;
            t.preventDefault();
            const i = this.matches(Ze) ? this : $.prev(this, Ze)[0] || $.next(this, Ze)[0] || $.findOne(Ze, t.delegateTarget.parentNode),
                o = un.getOrCreateInstance(i);
            if (r) return t.stopPropagation(), o.show(), void o._selectMenuItem(t);
            o._isShown() && (t.stopPropagation(), o.hide(), i.focus())
        }
    }
    I.on(document, Ge, Ze, un.dataApiKeydownHandler), I.on(document, Ge, tn, un.dataApiKeydownHandler), I.on(document, Qe, un.clearMenus), I.on(document, "keyup.bs.dropdown.data-api", un.clearMenus), I.on(document, Qe, Ze, (function(t) {
        t.preventDefault(), un.getOrCreateInstance(this).toggle()
    })), g(un);
    const dn = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
        fn = ".sticky-top",
        hn = "padding-right",
        pn = "margin-right";
    class gn {
        constructor() {
            this._element = document.body
        }
        getWidth() {
            const t = document.documentElement.clientWidth;
            return Math.abs(window.innerWidth - t)
        }
        hide() {
            const t = this.getWidth();
            this._disableOverFlow(), this._setElementAttributes(this._element, hn, (e => e + t)), this._setElementAttributes(dn, hn, (e => e + t)), this._setElementAttributes(fn, pn, (e => e - t))
        }
        reset() {
            this._resetElementAttributes(this._element, "overflow"), this._resetElementAttributes(this._element, hn), this._resetElementAttributes(dn, hn), this._resetElementAttributes(fn, pn)
        }
        isOverflowing() {
            return this.getWidth() > 0
        }
        _disableOverFlow() {
            this._saveInitialAttribute(this._element, "overflow"), this._element.style.overflow = "hidden"
        }
        _setElementAttributes(t, e, n) {
            const r = this.getWidth();
            this._applyManipulationCallback(t, (t => {
                if (t !== this._element && window.innerWidth > t.clientWidth + r) return;
                this._saveInitialAttribute(t, e);
                const i = window.getComputedStyle(t).getPropertyValue(e);
                t.style.setProperty(e, `${n(Number.parseFloat(i))}px`)
            }))
        }
        _saveInitialAttribute(t, e) {
            const n = t.style.getPropertyValue(e);
            n && B.setDataAttribute(t, e, n)
        }
        _resetElementAttributes(t, e) {
            this._applyManipulationCallback(t, (t => {
                const n = B.getDataAttribute(t, e);
                null !== n ? (B.removeDataAttribute(t, e), t.style.setProperty(e, n)) : t.style.removeProperty(e)
            }))
        }
        _applyManipulationCallback(t, e) {
            if (o(t)) e(t);
            else
                for (const n of $.find(t, this._element)) e(n)
        }
    }
    const mn = "show",
        _n = "mousedown.bs.backdrop",
        vn = {
            className: "modal-backdrop",
            clickCallback: null,
            isAnimated: !1,
            isVisible: !0,
            rootElement: "body"
        },
        yn = {
            className: "string",
            clickCallback: "(function|null)",
            isAnimated: "boolean",
            isVisible: "boolean",
            rootElement: "(element|string)"
        };
    class bn extends j {
        constructor(t) {
            super(), this._config = this._getConfig(t), this._isAppended = !1, this._element = null
        }
        static get Default() {
            return vn
        }
        static get DefaultType() {
            return yn
        }
        static get NAME() {
            return "backdrop"
        }
        show(t) {
            if (!this._config.isVisible) return void m(t);
            this._append();
            const e = this._getElement();
            this._config.isAnimated && d(e), e.classList.add(mn), this._emulateAnimation((() => {
                m(t)
            }))
        }
        hide(t) {
            this._config.isVisible ? (this._getElement().classList.remove(mn), this._emulateAnimation((() => {
                this.dispose(), m(t)
            }))) : m(t)
        }
        dispose() {
            this._isAppended && (I.off(this._element, _n), this._element.remove(), this._isAppended = !1)
        }
        _getElement() {
            if (!this._element) {
                const t = document.createElement("div");
                t.className = this._config.className, this._config.isAnimated && t.classList.add("fade"), this._element = t
            }
            return this._element
        }
        _configAfterMerge(t) {
            return t.rootElement = s(t.rootElement), t
        }
        _append() {
            if (this._isAppended) return;
            const t = this._getElement();
            this._config.rootElement.append(t), I.on(t, _n, (() => {
                m(this._config.clickCallback)
            })), this._isAppended = !0
        }
        _emulateAnimation(t) {
            _(t, this._getElement(), this._config.isAnimated)
        }
    }
    const wn = ".bs.focustrap",
        xn = "backward",
        An = {
            autofocus: !0,
            trapElement: null
        },
        Tn = {
            autofocus: "boolean",
            trapElement: "element"
        };
    class kn extends j {
        constructor(t) {
            super(), this._config = this._getConfig(t), this._isActive = !1, this._lastTabNavDirection = null
        }
        static get Default() {
            return An
        }
        static get DefaultType() {
            return Tn
        }
        static get NAME() {
            return "focustrap"
        }
        activate() {
            this._isActive || (this._config.autofocus && this._config.trapElement.focus(), I.off(document, wn), I.on(document, "focusin.bs.focustrap", (t => this._handleFocusin(t))), I.on(document, "keydown.tab.bs.focustrap", (t => this._handleKeydown(t))), this._isActive = !0)
        }
        deactivate() {
            this._isActive && (this._isActive = !1, I.off(document, wn))
        }
        _handleFocusin(t) {
            const {
                trapElement: e
            } = this._config;
            if (t.target === document || t.target === e || e.contains(t.target)) return;
            const n = $.focusableChildren(e);
            0 === n.length ? e.focus() : this._lastTabNavDirection === xn ? n[n.length - 1].focus() : n[0].focus()
        }
        _handleKeydown(t) {
            "Tab" === t.key && (this._lastTabNavDirection = t.shiftKey ? xn : "forward")
        }
    }
    const Ln = "hidden.bs.modal",
        En = "show.bs.modal",
        Sn = "modal-open",
        Cn = "show",
        On = "modal-static",
        Mn = {
            backdrop: !0,
            focus: !0,
            keyboard: !0
        },
        Pn = {
            backdrop: "(boolean|string)",
            focus: "boolean",
            keyboard: "boolean"
        };
    class Dn extends H {
        constructor(t, e) {
            super(t, e), this._dialog = $.findOne(".modal-dialog", this._element), this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._isShown = !1, this._isTransitioning = !1, this._scrollBar = new gn, this._addEventListeners()
        }
        static get Default() {
            return Mn
        }
        static get DefaultType() {
            return Pn
        }
        static get NAME() {
            return "modal"
        }
        toggle(t) {
            return this._isShown ? this.hide() : this.show(t)
        }
        show(t) {
            this._isShown || this._isTransitioning || I.trigger(this._element, En, {
                relatedTarget: t
            }).defaultPrevented || (this._isShown = !0, this._isTransitioning = !0, this._scrollBar.hide(), document.body.classList.add(Sn), this._adjustDialog(), this._backdrop.show((() => this._showElement(t))))
        }
        hide() {
            this._isShown && !this._isTransitioning && (I.trigger(this._element, "hide.bs.modal").defaultPrevented || (this._isShown = !1, this._isTransitioning = !0, this._focustrap.deactivate(), this._element.classList.remove(Cn), this._queueCallback((() => this._hideModal()), this._element, this._isAnimated())))
        }
        dispose() {
            for (const t of [window, this._dialog]) I.off(t, ".bs.modal");
            this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose()
        }
        handleUpdate() {
            this._adjustDialog()
        }
        _initializeBackDrop() {
            return new bn({
                isVisible: Boolean(this._config.backdrop),
                isAnimated: this._isAnimated()
            })
        }
        _initializeFocusTrap() {
            return new kn({
                trapElement: this._element
            })
        }
        _showElement(t) {
            document.body.contains(this._element) || document.body.append(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.scrollTop = 0;
            const e = $.findOne(".modal-body", this._dialog);
            e && (e.scrollTop = 0), d(this._element), this._element.classList.add(Cn), this._queueCallback((() => {
                this._config.focus && this._focustrap.activate(), this._isTransitioning = !1, I.trigger(this._element, "shown.bs.modal", {
                    relatedTarget: t
                })
            }), this._dialog, this._isAnimated())
        }
        _addEventListeners() {
            I.on(this._element, "keydown.dismiss.bs.modal", (t => {
                if ("Escape" === t.key) return this._config.keyboard ? (t.preventDefault(), void this.hide()) : void this._triggerBackdropTransition()
            })), I.on(window, "resize.bs.modal", (() => {
                this._isShown && !this._isTransitioning && this._adjustDialog()
            })), I.on(this._element, "mousedown.dismiss.bs.modal", (t => {
                I.one(this._element, "click.dismiss.bs.modal", (e => {
                    this._element === t.target && this._element === e.target && ("static" !== this._config.backdrop ? this._config.backdrop && this.hide() : this._triggerBackdropTransition())
                }))
            }))
        }
        _hideModal() {
            this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._isTransitioning = !1, this._backdrop.hide((() => {
                document.body.classList.remove(Sn), this._resetAdjustments(), this._scrollBar.reset(), I.trigger(this._element, Ln)
            }))
        }
        _isAnimated() {
            return this._element.classList.contains("fade")
        }
        _triggerBackdropTransition() {
            if (I.trigger(this._element, "hidePrevented.bs.modal").defaultPrevented) return;
            const t = this._element.scrollHeight > document.documentElement.clientHeight,
                e = this._element.style.overflowY;
            "hidden" === e || this._element.classList.contains(On) || (t || (this._element.style.overflowY = "hidden"), this._element.classList.add(On), this._queueCallback((() => {
                this._element.classList.remove(On), this._queueCallback((() => {
                    this._element.style.overflowY = e
                }), this._dialog)
            }), this._dialog), this._element.focus())
        }
        _adjustDialog() {
            const t = this._element.scrollHeight > document.documentElement.clientHeight,
                e = this._scrollBar.getWidth(),
                n = e > 0;
            if (n && !t) {
                const t = p() ? "paddingLeft" : "paddingRight";
                this._element.style[t] = `${e}px`
            }
            if (!n && t) {
                const t = p() ? "paddingRight" : "paddingLeft";
                this._element.style[t] = `${e}px`
            }
        }
        _resetAdjustments() {
            this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
        }
        static jQueryInterface(t, e) {
            return this.each((function() {
                const n = Dn.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === n[t]) throw new TypeError(`No method named "${t}"`);
                    n[t](e)
                }
            }))
        }
    }
    I.on(document, "click.bs.modal.data-api", '[data-bs-toggle="modal"]', (function(t) {
        const e = r(this);
        ["A", "AREA"].includes(this.tagName) && t.preventDefault(), I.one(e, En, (t => {
            t.defaultPrevented || I.one(e, Ln, (() => {
                a(this) && this.focus()
            }))
        }));
        const n = $.findOne(".modal.show");
        n && Dn.getInstance(n).hide(), Dn.getOrCreateInstance(e).toggle(this)
    })), W(Dn), g(Dn);
    const In = "show",
        Nn = "showing",
        zn = "hiding",
        qn = ".offcanvas.show",
        Rn = "hidePrevented.bs.offcanvas",
        Fn = "hidden.bs.offcanvas",
        Bn = {
            backdrop: !0,
            keyboard: !0,
            scroll: !1
        },
        jn = {
            backdrop: "(boolean|string)",
            keyboard: "boolean",
            scroll: "boolean"
        };
    class Hn extends H {
        constructor(t, e) {
            super(t, e), this._isShown = !1, this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._addEventListeners()
        }
        static get Default() {
            return Bn
        }
        static get DefaultType() {
            return jn
        }
        static get NAME() {
            return "offcanvas"
        }
        toggle(t) {
            return this._isShown ? this.hide() : this.show(t)
        }
        show(t) {
            this._isShown || I.trigger(this._element, "show.bs.offcanvas", {
                relatedTarget: t
            }).defaultPrevented || (this._isShown = !0, this._backdrop.show(), this._config.scroll || (new gn).hide(), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.classList.add(Nn), this._queueCallback((() => {
                this._config.scroll && !this._config.backdrop || this._focustrap.activate(), this._element.classList.add(In), this._element.classList.remove(Nn), I.trigger(this._element, "shown.bs.offcanvas", {
                    relatedTarget: t
                })
            }), this._element, !0))
        }
        hide() {
            this._isShown && (I.trigger(this._element, "hide.bs.offcanvas").defaultPrevented || (this._focustrap.deactivate(), this._element.blur(), this._isShown = !1, this._element.classList.add(zn), this._backdrop.hide(), this._queueCallback((() => {
                this._element.classList.remove(In, zn), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._config.scroll || (new gn).reset(), I.trigger(this._element, Fn)
            }), this._element, !0)))
        }
        dispose() {
            this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose()
        }
        _initializeBackDrop() {
            const t = Boolean(this._config.backdrop);
            return new bn({
                className: "offcanvas-backdrop",
                isVisible: t,
                isAnimated: !0,
                rootElement: this._element.parentNode,
                clickCallback: t ? () => {
                    "static" !== this._config.backdrop ? this.hide() : I.trigger(this._element, Rn)
                } : null
            })
        }
        _initializeFocusTrap() {
            return new kn({
                trapElement: this._element
            })
        }
        _addEventListeners() {
            I.on(this._element, "keydown.dismiss.bs.offcanvas", (t => {
                "Escape" === t.key && (this._config.keyboard ? this.hide() : I.trigger(this._element, Rn))
            }))
        }
        static jQueryInterface(t) {
            return this.each((function() {
                const e = Hn.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
                    e[t](this)
                }
            }))
        }
    }
    I.on(document, "click.bs.offcanvas.data-api", '[data-bs-toggle="offcanvas"]', (function(t) {
        const e = r(this);
        if (["A", "AREA"].includes(this.tagName) && t.preventDefault(), l(this)) return;
        I.one(e, Fn, (() => {
            a(this) && this.focus()
        }));
        const n = $.findOne(qn);
        n && n !== e && Hn.getInstance(n).hide(), Hn.getOrCreateInstance(e).toggle(this)
    })), I.on(window, "load.bs.offcanvas.data-api", (() => {
        for (const t of $.find(qn)) Hn.getOrCreateInstance(t).show()
    })), I.on(window, "resize.bs.offcanvas", (() => {
        for (const t of $.find("[aria-modal][class*=show][class*=offcanvas-]")) "fixed" !== getComputedStyle(t).position && Hn.getOrCreateInstance(t).hide()
    })), W(Hn), g(Hn);
    const Wn = new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]),
        Xn = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i,
        Yn = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i,
        Vn = (t, e) => {
            const n = t.nodeName.toLowerCase();
            return e.includes(n) ? !Wn.has(n) || Boolean(Xn.test(t.nodeValue) || Yn.test(t.nodeValue)) : e.filter((t => t instanceof RegExp)).some((t => t.test(n)))
        },
        $n = {
            "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
            a: ["target", "href", "title", "rel"],
            area: [],
            b: [],
            br: [],
            col: [],
            code: [],
            div: [],
            em: [],
            hr: [],
            h1: [],
            h2: [],
            h3: [],
            h4: [],
            h5: [],
            h6: [],
            i: [],
            img: ["src", "srcset", "alt", "title", "width", "height"],
            li: [],
            ol: [],
            p: [],
            pre: [],
            s: [],
            small: [],
            span: [],
            sub: [],
            sup: [],
            strong: [],
            u: [],
            ul: []
        },
        Un = {
            allowList: $n,
            content: {},
            extraClass: "",
            html: !1,
            sanitize: !0,
            sanitizeFn: null,
            template: "<div></div>"
        },
        Qn = {
            allowList: "object",
            content: "object",
            extraClass: "(string|function)",
            html: "boolean",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            template: "string"
        },
        Gn = {
            entry: "(string|element|function|null)",
            selector: "(string|element)"
        };
    class Kn extends j {
        constructor(t) {
            super(), this._config = this._getConfig(t)
        }
        static get Default() {
            return Un
        }
        static get DefaultType() {
            return Qn
        }
        static get NAME() {
            return "TemplateFactory"
        }
        getContent() {
            return Object.values(this._config.content).map((t => this._resolvePossibleFunction(t))).filter(Boolean)
        }
        hasContent() {
            return this.getContent().length > 0
        }
        changeContent(t) {
            return this._checkContent(t), this._config.content = {
                ...this._config.content,
                ...t
            }, this
        }
        toHtml() {
            const t = document.createElement("div");
            t.innerHTML = this._maybeSanitize(this._config.template);
            for (const [e, n] of Object.entries(this._config.content)) this._setContent(t, n, e);
            const e = t.children[0],
                n = this._resolvePossibleFunction(this._config.extraClass);
            return n && e.classList.add(...n.split(" ")), e
        }
        _typeCheckConfig(t) {
            super._typeCheckConfig(t), this._checkContent(t.content)
        }
        _checkContent(t) {
            for (const [e, n] of Object.entries(t)) super._typeCheckConfig({
                selector: e,
                entry: n
            }, Gn)
        }
        _setContent(t, e, n) {
            const r = $.findOne(n, t);
            r && ((e = this._resolvePossibleFunction(e)) ? o(e) ? this._putElementInTemplate(s(e), r) : this._config.html ? r.innerHTML = this._maybeSanitize(e) : r.textContent = e : r.remove())
        }
        _maybeSanitize(t) {
            return this._config.sanitize ? function(t, e, n) {
                if (!t.length) return t;
                if (n && "function" == typeof n) return n(t);
                const r = (new window.DOMParser).parseFromString(t, "text/html"),
                    i = [].concat(...r.body.querySelectorAll("*"));
                for (const t of i) {
                    const n = t.nodeName.toLowerCase();
                    if (!Object.keys(e).includes(n)) {
                        t.remove();
                        continue
                    }
                    const r = [].concat(...t.attributes),
                        i = [].concat(e["*"] || [], e[n] || []);
                    for (const e of r) Vn(e, i) || t.removeAttribute(e.nodeName)
                }
                return r.body.innerHTML
            }(t, this._config.allowList, this._config.sanitizeFn) : t
        }
        _resolvePossibleFunction(t) {
            return "function" == typeof t ? t(this) : t
        }
        _putElementInTemplate(t, e) {
            if (this._config.html) return e.innerHTML = "", void e.append(t);
            e.textContent = t.textContent
        }
    }
    const Zn = new Set(["sanitize", "allowList", "sanitizeFn"]),
        Jn = "fade",
        tr = "show",
        er = ".modal",
        nr = "hide.bs.modal",
        rr = "hover",
        ir = "focus",
        or = {
            AUTO: "auto",
            TOP: "top",
            RIGHT: p() ? "left" : "right",
            BOTTOM: "bottom",
            LEFT: p() ? "right" : "left"
        },
        sr = {
            allowList: $n,
            animation: !0,
            boundary: "clippingParents",
            container: !1,
            customClass: "",
            delay: 0,
            fallbackPlacements: ["top", "right", "bottom", "left"],
            html: !1,
            offset: [0, 0],
            placement: "top",
            popperConfig: null,
            sanitize: !0,
            sanitizeFn: null,
            selector: !1,
            template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            title: "",
            trigger: "hover focus"
        },
        ar = {
            allowList: "object",
            animation: "boolean",
            boundary: "(string|element)",
            container: "(string|element|boolean)",
            customClass: "(string|function)",
            delay: "(number|object)",
            fallbackPlacements: "array",
            html: "boolean",
            offset: "(array|string|function)",
            placement: "(string|function)",
            popperConfig: "(null|object|function)",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            selector: "(string|boolean)",
            template: "string",
            title: "(string|element|function)",
            trigger: "string"
        };
    class lr extends H {
        constructor(t, e) {
            if (void 0 === Ye) throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
            super(t, e), this._isEnabled = !0, this._timeout = 0, this._isHovered = null, this._activeTrigger = {}, this._popper = null, this._templateFactory = null, this._newContent = null, this.tip = null, this._setListeners(), this._config.selector || this._fixTitle()
        }
        static get Default() {
            return sr
        }
        static get DefaultType() {
            return ar
        }
        static get NAME() {
            return "tooltip"
        }
        enable() {
            this._isEnabled = !0
        }
        disable() {
            this._isEnabled = !1
        }
        toggleEnabled() {
            this._isEnabled = !this._isEnabled
        }
        toggle() {
            this._isEnabled && (this._activeTrigger.click = !this._activeTrigger.click, this._isShown() ? this._leave() : this._enter())
        }
        dispose() {
            clearTimeout(this._timeout), I.off(this._element.closest(er), nr, this._hideModalHandler), this.tip && this.tip.remove(), this._element.getAttribute("data-bs-original-title") && this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title")), this._disposePopper(), super.dispose()
        }
        show() {
            if ("none" === this._element.style.display) throw new Error("Please use show on visible elements");
            if (!this._isWithContent() || !this._isEnabled) return;
            const t = I.trigger(this._element, this.constructor.eventName("show")),
                e = (c(this._element) || this._element.ownerDocument.documentElement).contains(this._element);
            if (t.defaultPrevented || !e) return;
            this.tip && (this.tip.remove(), this.tip = null);
            const n = this._getTipElement();
            this._element.setAttribute("aria-describedby", n.getAttribute("id"));
            const {
                container: r
            } = this._config;
            if (this._element.ownerDocument.documentElement.contains(this.tip) || (r.append(n), I.trigger(this._element, this.constructor.eventName("inserted"))), this._popper ? this._popper.update() : this._popper = this._createPopper(n), n.classList.add(tr), "ontouchstart" in document.documentElement)
                for (const t of [].concat(...document.body.children)) I.on(t, "mouseover", u);
            this._queueCallback((() => {
                I.trigger(this._element, this.constructor.eventName("shown")), !1 === this._isHovered && this._leave(), this._isHovered = !1
            }), this.tip, this._isAnimated())
        }
        hide() {
            if (!this._isShown()) return;
            if (I.trigger(this._element, this.constructor.eventName("hide")).defaultPrevented) return;
            const t = this._getTipElement();
            if (t.classList.remove(tr), "ontouchstart" in document.documentElement)
                for (const t of [].concat(...document.body.children)) I.off(t, "mouseover", u);
            this._activeTrigger.click = !1, this._activeTrigger.focus = !1, this._activeTrigger.hover = !1, this._isHovered = null, this._queueCallback((() => {
                this._isWithActiveTrigger() || (this._isHovered || t.remove(), this._element.removeAttribute("aria-describedby"), I.trigger(this._element, this.constructor.eventName("hidden")), this._disposePopper())
            }), this.tip, this._isAnimated())
        }
        update() {
            this._popper && this._popper.update()
        }
        _isWithContent() {
            return Boolean(this._getTitle())
        }
        _getTipElement() {
            return this.tip || (this.tip = this._createTipElement(this._newContent || this._getContentForTemplate())), this.tip
        }
        _createTipElement(t) {
            const e = this._getTemplateFactory(t).toHtml();
            if (!e) return null;
            e.classList.remove(Jn, tr), e.classList.add(`bs-${this.constructor.NAME}-auto`);
            const n = (t => {
                do {
                    t += Math.floor(1e6 * Math.random())
                } while (document.getElementById(t));
                return t
            })(this.constructor.NAME).toString();
            return e.setAttribute("id", n), this._isAnimated() && e.classList.add(Jn), e
        }
        setContent(t) {
            this._newContent = t, this._isShown() && (this._disposePopper(), this.show())
        }
        _getTemplateFactory(t) {
            return this._templateFactory ? this._templateFactory.changeContent(t) : this._templateFactory = new Kn({
                ...this._config,
                content: t,
                extraClass: this._resolvePossibleFunction(this._config.customClass)
            }), this._templateFactory
        }
        _getContentForTemplate() {
            return {
                ".tooltip-inner": this._getTitle()
            }
        }
        _getTitle() {
            return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute("data-bs-original-title")
        }
        _initializeOnDelegatedTarget(t) {
            return this.constructor.getOrCreateInstance(t.delegateTarget, this._getDelegateConfig())
        }
        _isAnimated() {
            return this._config.animation || this.tip && this.tip.classList.contains(Jn)
        }
        _isShown() {
            return this.tip && this.tip.classList.contains(tr)
        }
        _createPopper(t) {
            const e = "function" == typeof this._config.placement ? this._config.placement.call(this, t, this._element) : this._config.placement,
                n = or[e.toUpperCase()];
            return Xe(this._element, t, this._getPopperConfig(n))
        }
        _getOffset() {
            const {
                offset: t
            } = this._config;
            return "string" == typeof t ? t.split(",").map((t => Number.parseInt(t, 10))) : "function" == typeof t ? e => t(e, this._element) : t
        }
        _resolvePossibleFunction(t) {
            return "function" == typeof t ? t.call(this._element) : t
        }
        _getPopperConfig(t) {
            const e = {
                placement: t,
                modifiers: [{
                    name: "flip",
                    options: {
                        fallbackPlacements: this._config.fallbackPlacements
                    }
                }, {
                    name: "offset",
                    options: {
                        offset: this._getOffset()
                    }
                }, {
                    name: "preventOverflow",
                    options: {
                        boundary: this._config.boundary
                    }
                }, {
                    name: "arrow",
                    options: {
                        element: `.${this.constructor.NAME}-arrow`
                    }
                }, {
                    name: "preSetPlacement",
                    enabled: !0,
                    phase: "beforeMain",
                    fn: t => {
                        this._getTipElement().setAttribute("data-popper-placement", t.state.placement)
                    }
                }]
            };
            return {
                ...e,
                ..."function" == typeof this._config.popperConfig ? this._config.popperConfig(e) : this._config.popperConfig
            }
        }
        _setListeners() {
            const t = this._config.trigger.split(" ");
            for (const e of t)
                if ("click" === e) I.on(this._element, this.constructor.eventName("click"), this._config.selector, (t => {
                    this._initializeOnDelegatedTarget(t).toggle()
                }));
                else if ("manual" !== e) {
                const t = e === rr ? this.constructor.eventName("mouseenter") : this.constructor.eventName("focusin"),
                    n = e === rr ? this.constructor.eventName("mouseleave") : this.constructor.eventName("focusout");
                I.on(this._element, t, this._config.selector, (t => {
                    const e = this._initializeOnDelegatedTarget(t);
                    e._activeTrigger["focusin" === t.type ? ir : rr] = !0, e._enter()
                })), I.on(this._element, n, this._config.selector, (t => {
                    const e = this._initializeOnDelegatedTarget(t);
                    e._activeTrigger["focusout" === t.type ? ir : rr] = e._element.contains(t.relatedTarget), e._leave()
                }))
            }
            this._hideModalHandler = () => {
                this._element && this.hide()
            }, I.on(this._element.closest(er), nr, this._hideModalHandler)
        }
        _fixTitle() {
            const t = this._element.getAttribute("title");
            t && (this._element.getAttribute("aria-label") || this._element.textContent.trim() || this._element.setAttribute("aria-label", t), this._element.setAttribute("data-bs-original-title", t), this._element.removeAttribute("title"))
        }
        _enter() {
            this._isShown() || this._isHovered ? this._isHovered = !0 : (this._isHovered = !0, this._setTimeout((() => {
                this._isHovered && this.show()
            }), this._config.delay.show))
        }
        _leave() {
            this._isWithActiveTrigger() || (this._isHovered = !1, this._setTimeout((() => {
                this._isHovered || this.hide()
            }), this._config.delay.hide))
        }
        _setTimeout(t, e) {
            clearTimeout(this._timeout), this._timeout = setTimeout(t, e)
        }
        _isWithActiveTrigger() {
            return Object.values(this._activeTrigger).includes(!0)
        }
        _getConfig(t) {
            const e = B.getDataAttributes(this._element);
            for (const t of Object.keys(e)) Zn.has(t) && delete e[t];
            return t = {
                ...e,
                ..."object" == typeof t && t ? t : {}
            }, t = this._mergeConfigObj(t), t = this._configAfterMerge(t), this._typeCheckConfig(t), t
        }
        _configAfterMerge(t) {
            return t.container = !1 === t.container ? document.body : s(t.container), "number" == typeof t.delay && (t.delay = {
                show: t.delay,
                hide: t.delay
            }), "number" == typeof t.title && (t.title = t.title.toString()), "number" == typeof t.content && (t.content = t.content.toString()), t
        }
        _getDelegateConfig() {
            const t = {};
            for (const e in this._config) this.constructor.Default[e] !== this._config[e] && (t[e] = this._config[e]);
            return t.selector = !1, t.trigger = "manual", t
        }
        _disposePopper() {
            this._popper && (this._popper.destroy(), this._popper = null)
        }
        static jQueryInterface(t) {
            return this.each((function() {
                const e = lr.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                    e[t]()
                }
            }))
        }
    }
    g(lr);
    const cr = {
            ...lr.Default,
            content: "",
            offset: [0, 8],
            placement: "right",
            template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
            trigger: "click"
        },
        ur = {
            ...lr.DefaultType,
            content: "(null|string|element|function)"
        };
    class dr extends lr {
        static get Default() {
            return cr
        }
        static get DefaultType() {
            return ur
        }
        static get NAME() {
            return "popover"
        }
        _isWithContent() {
            return this._getTitle() || this._getContent()
        }
        _getContentForTemplate() {
            return {
                ".popover-header": this._getTitle(),
                ".popover-body": this._getContent()
            }
        }
        _getContent() {
            return this._resolvePossibleFunction(this._config.content)
        }
        static jQueryInterface(t) {
            return this.each((function() {
                const e = dr.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                    e[t]()
                }
            }))
        }
    }
    g(dr);
    const fr = "click.bs.scrollspy",
        hr = "active",
        pr = "[href]",
        gr = {
            offset: null,
            rootMargin: "0px 0px -25%",
            smoothScroll: !1,
            target: null,
            threshold: [.1, .5, 1]
        },
        mr = {
            offset: "(number|null)",
            rootMargin: "string",
            smoothScroll: "boolean",
            target: "element",
            threshold: "array"
        };
    class _r extends H {
        constructor(t, e) {
            super(t, e), this._targetLinks = new Map, this._observableSections = new Map, this._rootElement = "visible" === getComputedStyle(this._element).overflowY ? null : this._element, this._activeTarget = null, this._observer = null, this._previousScrollData = {
                visibleEntryTop: 0,
                parentScrollTop: 0
            }, this.refresh()
        }
        static get Default() {
            return gr
        }
        static get DefaultType() {
            return mr
        }
        static get NAME() {
            return "scrollspy"
        }
        refresh() {
            this._initializeTargetsAndObservables(), this._maybeEnableSmoothScroll(), this._observer ? this._observer.disconnect() : this._observer = this._getNewObserver();
            for (const t of this._observableSections.values()) this._observer.observe(t)
        }
        dispose() {
            this._observer.disconnect(), super.dispose()
        }
        _configAfterMerge(t) {
            return t.target = s(t.target) || document.body, t.rootMargin = t.offset ? `${t.offset}px 0px -30%` : t.rootMargin, "string" == typeof t.threshold && (t.threshold = t.threshold.split(",").map((t => Number.parseFloat(t)))), t
        }
        _maybeEnableSmoothScroll() {
            this._config.smoothScroll && (I.off(this._config.target, fr), I.on(this._config.target, fr, pr, (t => {
                const e = this._observableSections.get(t.target.hash);
                if (e) {
                    t.preventDefault();
                    const n = this._rootElement || window,
                        r = e.offsetTop - this._element.offsetTop;
                    if (n.scrollTo) return void n.scrollTo({
                        top: r,
                        behavior: "smooth"
                    });
                    n.scrollTop = r
                }
            })))
        }
        _getNewObserver() {
            const t = {
                root: this._rootElement,
                threshold: this._config.threshold,
                rootMargin: this._config.rootMargin
            };
            return new IntersectionObserver((t => this._observerCallback(t)), t)
        }
        _observerCallback(t) {
            const e = t => this._targetLinks.get(`#${t.target.id}`),
                n = t => {
                    this._previousScrollData.visibleEntryTop = t.target.offsetTop, this._process(e(t))
                },
                r = (this._rootElement || document.documentElement).scrollTop,
                i = r >= this._previousScrollData.parentScrollTop;
            this._previousScrollData.parentScrollTop = r;
            for (const o of t) {
                if (!o.isIntersecting) {
                    this._activeTarget = null, this._clearActiveClass(e(o));
                    continue
                }
                const t = o.target.offsetTop >= this._previousScrollData.visibleEntryTop;
                if (i && t) {
                    if (n(o), !r) return
                } else i || t || n(o)
            }
        }
        _initializeTargetsAndObservables() {
            this._targetLinks = new Map, this._observableSections = new Map;
            const t = $.find(pr, this._config.target);
            for (const e of t) {
                if (!e.hash || l(e)) continue;
                const t = $.findOne(e.hash, this._element);
                a(t) && (this._targetLinks.set(e.hash, e), this._observableSections.set(e.hash, t))
            }
        }
        _process(t) {
            this._activeTarget !== t && (this._clearActiveClass(this._config.target), this._activeTarget = t, t.classList.add(hr), this._activateParents(t), I.trigger(this._element, "activate.bs.scrollspy", {
                relatedTarget: t
            }))
        }
        _activateParents(t) {
            if (t.classList.contains("dropdown-item")) $.findOne(".dropdown-toggle", t.closest(".dropdown")).classList.add(hr);
            else
                for (const e of $.parents(t, ".nav, .list-group"))
                    for (const t of $.prev(e, ".nav-link, .nav-item > .nav-link, .list-group-item")) t.classList.add(hr)
        }
        _clearActiveClass(t) {
            t.classList.remove(hr);
            const e = $.find("[href].active", t);
            for (const t of e) t.classList.remove(hr)
        }
        static jQueryInterface(t) {
            return this.each((function() {
                const e = _r.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
                    e[t]()
                }
            }))
        }
    }
    I.on(window, "load.bs.scrollspy.data-api", (() => {
        for (const t of $.find('[data-bs-spy="scroll"]')) _r.getOrCreateInstance(t)
    })), g(_r);
    const vr = "ArrowLeft",
        yr = "ArrowRight",
        br = "ArrowUp",
        wr = "ArrowDown",
        xr = "active",
        Ar = "fade",
        Tr = "show",
        kr = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',
        Lr = `.nav-link:not(.dropdown-toggle), .list-group-item:not(.dropdown-toggle), [role="tab"]:not(.dropdown-toggle), ${kr}`;
    class Er extends H {
        constructor(t) {
            super(t), this._parent = this._element.closest('.list-group, .nav, [role="tablist"]'), this._parent && (this._setInitialAttributes(this._parent, this._getChildren()), I.on(this._element, "keydown.bs.tab", (t => this._keydown(t))))
        }
        static get NAME() {
            return "tab"
        }
        show() {
            const t = this._element;
            if (this._elemIsActive(t)) return;
            const e = this._getActiveElem(),
                n = e ? I.trigger(e, "hide.bs.tab", {
                    relatedTarget: t
                }) : null;
            I.trigger(t, "show.bs.tab", {
                relatedTarget: e
            }).defaultPrevented || n && n.defaultPrevented || (this._deactivate(e, t), this._activate(t, e))
        }
        _activate(t, e) {
            t && (t.classList.add(xr), this._activate(r(t)), this._queueCallback((() => {
                "tab" === t.getAttribute("role") ? (t.removeAttribute("tabindex"), t.setAttribute("aria-selected", !0), this._toggleDropDown(t, !0), I.trigger(t, "shown.bs.tab", {
                    relatedTarget: e
                })) : t.classList.add(Tr)
            }), t, t.classList.contains(Ar)))
        }
        _deactivate(t, e) {
            t && (t.classList.remove(xr), t.blur(), this._deactivate(r(t)), this._queueCallback((() => {
                "tab" === t.getAttribute("role") ? (t.setAttribute("aria-selected", !1), t.setAttribute("tabindex", "-1"), this._toggleDropDown(t, !1), I.trigger(t, "hidden.bs.tab", {
                    relatedTarget: e
                })) : t.classList.remove(Tr)
            }), t, t.classList.contains(Ar)))
        }
        _keydown(t) {
            if (![vr, yr, br, wr].includes(t.key)) return;
            t.stopPropagation(), t.preventDefault();
            const e = [yr, wr].includes(t.key),
                n = v(this._getChildren().filter((t => !l(t))), t.target, e, !0);
            n && (n.focus({
                preventScroll: !0
            }), Er.getOrCreateInstance(n).show())
        }
        _getChildren() {
            return $.find(Lr, this._parent)
        }
        _getActiveElem() {
            return this._getChildren().find((t => this._elemIsActive(t))) || null
        }
        _setInitialAttributes(t, e) {
            this._setAttributeIfNotExists(t, "role", "tablist");
            for (const t of e) this._setInitialAttributesOnChild(t)
        }
        _setInitialAttributesOnChild(t) {
            t = this._getInnerElement(t);
            const e = this._elemIsActive(t),
                n = this._getOuterElement(t);
            t.setAttribute("aria-selected", e), n !== t && this._setAttributeIfNotExists(n, "role", "presentation"), e || t.setAttribute("tabindex", "-1"), this._setAttributeIfNotExists(t, "role", "tab"), this._setInitialAttributesOnTargetPanel(t)
        }
        _setInitialAttributesOnTargetPanel(t) {
            const e = r(t);
            e && (this._setAttributeIfNotExists(e, "role", "tabpanel"), t.id && this._setAttributeIfNotExists(e, "aria-labelledby", `#${t.id}`))
        }
        _toggleDropDown(t, e) {
            const n = this._getOuterElement(t);
            if (!n.classList.contains("dropdown")) return;
            const r = (t, r) => {
                const i = $.findOne(t, n);
                i && i.classList.toggle(r, e)
            };
            r(".dropdown-toggle", xr), r(".dropdown-menu", Tr), n.setAttribute("aria-expanded", e)
        }
        _setAttributeIfNotExists(t, e, n) {
            t.hasAttribute(e) || t.setAttribute(e, n)
        }
        _elemIsActive(t) {
            return t.classList.contains(xr)
        }
        _getInnerElement(t) {
            return t.matches(Lr) ? t : $.findOne(Lr, t)
        }
        _getOuterElement(t) {
            return t.closest(".nav-item, .list-group-item") || t
        }
        static jQueryInterface(t) {
            return this.each((function() {
                const e = Er.getOrCreateInstance(this);
                if ("string" == typeof t) {
                    if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
                    e[t]()
                }
            }))
        }
    }
    I.on(document, "click.bs.tab", kr, (function(t) {
        ["A", "AREA"].includes(this.tagName) && t.preventDefault(), l(this) || Er.getOrCreateInstance(this).show()
    })), I.on(window, "load.bs.tab", (() => {
        for (const t of $.find('.active[data-bs-toggle="tab"], .active[data-bs-toggle="pill"], .active[data-bs-toggle="list"]')) Er.getOrCreateInstance(t)
    })), g(Er);
    const Sr = "hide",
        Cr = "show",
        Or = "showing",
        Mr = {
            animation: "boolean",
            autohide: "boolean",
            delay: "number"
        },
        Pr = {
            animation: !0,
            autohide: !0,
            delay: 5e3
        };
    class Dr extends H {
        constructor(t, e) {
            super(t, e), this._timeout = null, this._hasMouseInteraction = !1, this._hasKeyboardInteraction = !1, this._setListeners()
        }
        static get Default() {
            return Pr
        }
        static get DefaultType() {
            return Mr
        }
        static get NAME() {
            return "toast"
        }
        show() {
            I.trigger(this._element, "show.bs.toast").defaultPrevented || (this._clearTimeout(), this._config.animation && this._element.classList.add("fade"), this._element.classList.remove(Sr), d(this._element), this._element.classList.add(Cr, Or), this._queueCallback((() => {
                this._element.classList.remove(Or), I.trigger(this._element, "shown.bs.toast"), this._maybeScheduleHide()
            }), this._element, this._config.animation))
        }
        hide() {
            this.isShown() && (I.trigger(this._element, "hide.bs.toast").defaultPrevented || (this._element.classList.add(Or), this._queueCallback((() => {
                this._element.classList.add(Sr), this._element.classList.remove(Or, Cr), I.trigger(this._element, "hidden.bs.toast")
            }), this._element, this._config.animation)))
        }
        dispose() {
            this._clearTimeout(), this.isShown() && this._element.classList.remove(Cr), super.dispose()
        }
        isShown() {
            return this._element.classList.contains(Cr)
        }
        _maybeScheduleHide() {
            this._config.autohide && (this._hasMouseInteraction || this._hasKeyboardInteraction || (this._timeout = setTimeout((() => {
                this.hide()
            }), this._config.delay)))
        }
        _onInteraction(t, e) {
            switch (t.type) {
                case "mouseover":
                case "mouseout":
                    this._hasMouseInteraction = e;
                    break;
                case "focusin":
                case "focusout":
                    this._hasKeyboardInteraction = e
            }
            if (e) return void this._clearTimeout();
            const n = t.relatedTarget;
            this._element === n || this._element.contains(n) || this._maybeScheduleHide()
        }
        _setListeners() {
            I.on(this._element, "mouseover.bs.toast", (t => this._onInteraction(t, !0))), I.on(this._element, "mouseout.bs.toast", (t => this._onInteraction(t, !1))), I.on(this._element, "focusin.bs.toast", (t => this._onInteraction(t, !0))), I.on(this._element, "focusout.bs.toast", (t => this._onInteraction(t, !1)))
        }
        _clearTimeout() {
            clearTimeout(this._timeout), this._timeout = null
        }
        static jQueryInterface(t) {
            return this.each((function() {
                const e = Dr.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                    e[t](this)
                }
            }))
        }
    }
    return W(Dr), g(Dr), {
        Alert: X,
        Button: V,
        Carousel: at,
        Collapse: pt,
        Dropdown: un,
        Modal: Dn,
        Offcanvas: Hn,
        Popover: dr,
        ScrollSpy: _r,
        Tab: Er,
        Toast: Dr,
        Tooltip: lr
    }
})),
function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e((t = t || self).window = t.window || {})
}(this, (function(t) {
    "use strict";

    function e(t, e) {
        t.prototype = Object.create(e.prototype), (t.prototype.constructor = t).__proto__ = e
    }

    function n(t) {
        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t
    }

    function r(t) {
        return "string" == typeof t
    }

    function i(t) {
        return "function" == typeof t
    }

    function o(t) {
        return "number" == typeof t
    }

    function s(t) {
        return void 0 === t
    }

    function a(t) {
        return "object" == typeof t
    }

    function l(t) {
        return !1 !== t
    }

    function c() {
        return "undefined" != typeof window
    }

    function u(t) {
        return i(t) || r(t)
    }

    function d(t) {
        return (Tt = xe(t, ue)) && qn
    }

    function f(t, e) {
        return console.warn("Invalid property", t, "set to", e, "Missing plugin? gsap.registerPlugin()")
    }

    function h(t, e) {
        return !e && console.warn(t)
    }

    function p(t, e) {
        return t && (ue[t] = e) && Tt && (Tt[t] = e) || ue
    }

    function g() {
        return 0
    }

    function m(t) {
        var e, n, r = t[0];
        if (a(r) || i(r) || (t = [t]), !(e = (r._gsap || {}).harness)) {
            for (n = be.length; n-- && !be[n].targetTest(r););
            e = be[n]
        }
        for (n = t.length; n--;) t[n] && (t[n]._gsap || (t[n]._gsap = new Ve(t[n], e))) || t.splice(n, 1);
        return t
    }

    function _(t) {
        return t._gsap || m(Ce(t))[0]._gsap
    }

    function v(t, e, n) {
        return (n = t[e]) && i(n) ? t[e]() : s(n) && t.getAttribute && t.getAttribute(e) || n
    }

    function y(t, e) {
        return (t = t.split(",")).forEach(e) || t
    }

    function b(t) {
        return Math.round(1e5 * t) / 1e5 || 0
    }

    function w(t) {
        return Math.round(1e7 * t) / 1e7 || 0
    }

    function x(t, e) {
        var n = e.charAt(0),
            r = parseFloat(e.substr(2));
        return t = parseFloat(t), "+" === n ? t + r : "-" === n ? t - r : "*" === n ? t * r : t / r
    }

    function A(t, e) {
        for (var n = e.length, r = 0; t.indexOf(e[r]) < 0 && ++r < n;);
        return r < n
    }

    function T() {
        var t, e, n = ge.length,
            r = ge.slice(0);
        for (me = {}, t = ge.length = 0; t < n; t++)(e = r[t]) && e._lazy && (e.render(e._lazy[0], e._lazy[1], !0)._lazy = 0)
    }

    function k(t, e, n, r) {
        ge.length && T(), t.render(e, n, r || vt && e < 0 && (t._initted || t._startAt)), ge.length && T()
    }

    function L(t) {
        var e = parseFloat(t);
        return (e || 0 === e) && (t + "").match(le).length < 2 ? e : r(t) ? t.trim() : t
    }

    function E(t) {
        return t
    }

    function S(t, e) {
        for (var n in e) n in t || (t[n] = e[n]);
        return t
    }

    function C(t, e) {
        for (var n in e) "__proto__" !== n && "constructor" !== n && "prototype" !== n && (t[n] = a(e[n]) ? C(t[n] || (t[n] = {}), e[n]) : e[n]);
        return t
    }

    function O(t, e) {
        var n, r = {};
        for (n in t) n in e || (r[n] = t[n]);
        return r
    }

    function M(t) {
        var e = t.parent || bt,
            n = t.keyframes ? function(t) {
                return function(e, n) {
                    for (var r in n) r in e || "duration" === r && t || "ease" === r || (e[r] = n[r])
                }
            }(ne(t.keyframes)) : S;
        if (l(t.inherit))
            for (; e;) n(t, e.vars.defaults), e = e.parent || e._dp;
        return t
    }

    function P(t, e, n, r, i) {
        void 0 === n && (n = "_first"), void 0 === r && (r = "_last");
        var o, s = t[r];
        if (i)
            for (o = e[i]; s && s[i] > o;) s = s._prev;
        return s ? (e._next = s._next, s._next = e) : (e._next = t[n], t[n] = e), e._next ? e._next._prev = e : t[r] = e, e._prev = s, e.parent = e._dp = t, e
    }

    function D(t, e, n, r) {
        void 0 === n && (n = "_first"), void 0 === r && (r = "_last");
        var i = e._prev,
            o = e._next;
        i ? i._next = o : t[n] === e && (t[n] = o), o ? o._prev = i : t[r] === e && (t[r] = i), e._next = e._prev = e.parent = null
    }

    function I(t, e) {
        !t.parent || e && !t.parent.autoRemoveChildren || t.parent.remove(t), t._act = 0
    }

    function N(t, e) {
        if (t && (!e || e._end > t._dur || e._start < 0))
            for (var n = t; n;) n._dirty = 1, n = n.parent;
        return t
    }

    function z(t, e, n, r) {
        return t._startAt && (vt ? t._startAt.revert(fe) : t.vars.immediateRender && !t.vars.autoRevert || t._startAt.render(e, !0, r))
    }

    function q(t) {
        return t._repeat ? Ae(t._tTime, t = t.duration() + t._rDelay) * t : 0
    }

    function R(t, e) {
        return (t - e._start) * e._ts + (0 <= e._ts ? 0 : e._dirty ? e.totalDuration() : e._tDur)
    }

    function F(t) {
        return t._end = w(t._start + (t._tDur / Math.abs(t._ts || t._rts || Ut) || 0))
    }

    function B(t, e) {
        var n = t._dp;
        return n && n.smoothChildTiming && t._ts && (t._start = w(n._time - (0 < t._ts ? e / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)), F(t), n._dirty || N(n, t)), t
    }

    function j(t, e) {
        var n;
        if ((e._time || e._initted && !e._dur) && (n = R(t.rawTime(), e), (!e._dur || Ee(0, e.totalDuration(), n) - e._tTime > Ut) && e.render(n, !0)), N(t, e)._dp && t._initted && t._time >= t._dur && t._ts) {
            if (t._dur < t.duration())
                for (n = t; n._dp;) 0 <= n.rawTime() && n.totalTime(n._tTime), n = n._dp;
            t._zTime = -Ut
        }
    }

    function H(t, e, n, r) {
        return e.parent && I(e), e._start = w((o(n) ? n : n || t !== bt ? Le(t, n, e) : t._time) + e._delay), e._end = w(e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)), P(t, e, "_first", "_last", t._sort ? "_start" : 0), Te(e) || (t._recent = e), r || j(t, e), t._ts < 0 && B(t, t._tTime), t
    }

    function W(t, e) {
        return (ue.ScrollTrigger || f("scrollTrigger", e)) && ue.ScrollTrigger.create(e, t)
    }

    function X(t, e, n, r, i) {
        return en(t, e, i), t._initted ? !n && t._pt && !vt && (t._dur && !1 !== t.vars.lazy || !t._dur && t.vars.lazy) && Lt !== ze.frame ? (ge.push(t), t._lazy = [i, r], 1) : void 0 : 1
    }

    function Y(t, e, n, r) {
        var i = t._repeat,
            o = w(e) || 0,
            s = t._tTime / t._tDur;
        return s && !r && (t._time *= o / t._dur), t._dur = o, t._tDur = i ? i < 0 ? 1e10 : w(o * (i + 1) + t._rDelay * i) : o, 0 < s && !r && B(t, t._tTime = t._tDur * s), t.parent && F(t), n || N(t.parent, t), t
    }

    function V(t) {
        return t instanceof Qe ? N(t) : Y(t, t._dur)
    }

    function $(t, e, n) {
        var r, i, s = o(e[1]),
            a = (s ? 2 : 1) + (t < 2 ? 0 : 1),
            c = e[a];
        if (s && (c.duration = e[1]), c.parent = n, t) {
            for (r = c, i = n; i && !("immediateRender" in r);) r = i.vars.defaults || {}, i = l(i.vars.inherit) && i.parent;
            c.immediateRender = l(r.immediateRender), t < 2 ? c.runBackwards = 1 : c.startAt = e[a - 1]
        }
        return new sn(e[0], c, e[1 + a])
    }

    function U(t, e) {
        return t || 0 === t ? e(t) : e
    }

    function Q(t, e) {
        return r(t) && (e = ce.exec(t)) ? e[1] : ""
    }

    function G(t, e) {
        return t && a(t) && "length" in t && (!e && !t.length || t.length - 1 in t && a(t[0])) && !t.nodeType && t !== wt
    }

    function K(t) {
        return t = Ce(t)[0] || h("Invalid scope") || {},
            function(e) {
                var n = t.current || t.nativeElement || t;
                return Ce(e, n.querySelectorAll ? n : n === t ? h("Invalid scope") || At.createElement("div") : t)
            }
    }

    function Z(t) {
        return t.sort((function() {
            return .5 - Math.random()
        }))
    }

    function J(t) {
        if (i(t)) return t;
        var e = a(t) ? t : {
                each: t
            },
            n = He(e.ease),
            o = e.from || 0,
            s = parseFloat(e.base) || 0,
            l = {},
            c = 0 < o && o < 1,
            u = isNaN(o) || c,
            d = e.axis,
            f = o,
            h = o;
        return r(o) ? f = h = {
                center: .5,
                edges: .5,
                end: 1
            } [o] || 0 : !c && u && (f = o[0], h = o[1]),
            function(t, r, i) {
                var a, c, p, g, m, _, v, y, b, x = (i || e).length,
                    A = l[x];
                if (!A) {
                    if (!(b = "auto" === e.grid ? 0 : (e.grid || [1, $t])[1])) {
                        for (v = -$t; v < (v = i[b++].getBoundingClientRect().left) && b < x;);
                        b--
                    }
                    for (A = l[x] = [], a = u ? Math.min(b, x) * f - .5 : o % b, c = b === $t ? 0 : u ? x * h / b - .5 : o / b | 0, y = $t, _ = v = 0; _ < x; _++) p = _ % b - a, g = c - (_ / b | 0), A[_] = m = d ? Math.abs("y" === d ? g : p) : Zt(p * p + g * g), v < m && (v = m), m < y && (y = m);
                    "random" === o && Z(A), A.max = v - y, A.min = y, A.v = x = (parseFloat(e.amount) || parseFloat(e.each) * (x < b ? x - 1 : d ? "y" === d ? x / b : b : Math.max(b, x / b)) || 0) * ("edges" === o ? -1 : 1), A.b = x < 0 ? s - x : s, A.u = Q(e.amount || e.each) || 0, n = n && x < 0 ? je(n) : n
                }
                return x = (A[t] - A.min) / A.max || 0, w(A.b + (n ? n(x) : x) * A.v) + A.u
            }
    }

    function tt(t) {
        var e = Math.pow(10, ((t + "").split(".")[1] || "").length);
        return function(n) {
            var r = w(Math.round(parseFloat(n) / t) * t * e);
            return (r - r % 1) / e + (o(n) ? 0 : Q(n))
        }
    }

    function et(t, e) {
        var n, r, s = ne(t);
        return !s && a(t) && (n = s = t.radius || $t, t.values ? (t = Ce(t.values), (r = !o(t[0])) && (n *= n)) : t = tt(t.increment)), U(e, s ? i(t) ? function(e) {
            return r = t(e), Math.abs(r - e) <= n ? r : e
        } : function(e) {
            for (var i, s, a = parseFloat(r ? e.x : e), l = parseFloat(r ? e.y : 0), c = $t, u = 0, d = t.length; d--;)(i = r ? (i = t[d].x - a) * i + (s = t[d].y - l) * s : Math.abs(t[d] - a)) < c && (c = i, u = d);
            return u = !n || c <= n ? t[u] : e, r || u === e || o(e) ? u : u + Q(e)
        } : tt(t))
    }

    function nt(t, e, n, r) {
        return U(ne(t) ? !e : !0 === n ? !!(n = 0) : !r, (function() {
            return ne(t) ? t[~~(Math.random() * t.length)] : (n = n || 1e-5) && (r = n < 1 ? Math.pow(10, (n + "").length - 2) : 1) && Math.floor(Math.round((t - n / 2 + Math.random() * (e - t + .99 * n)) / n) * n * r) / r
        }))
    }

    function rt(t, e, n) {
        return U(n, (function(n) {
            return t[~~e(n)]
        }))
    }

    function it(t) {
        for (var e, n, r, i, o = 0, s = ""; ~(e = t.indexOf("random(", o));) r = t.indexOf(")", e), i = "[" === t.charAt(e + 7), n = t.substr(e + 7, r - e - 7).match(i ? le : re), s += t.substr(o, e - o) + nt(i ? n : +n[0], i ? 0 : +n[1], +n[2] || 1e-5), o = r + 1;
        return s + t.substr(o, t.length - o)
    }

    function ot(t, e, n) {
        var r, i, o, s = t.labels,
            a = $t;
        for (r in s)(i = s[r] - e) < 0 == !!n && i && a > (i = Math.abs(i)) && (o = r, a = i);
        return o
    }

    function st(t) {
        return I(t), t.scrollTrigger && t.scrollTrigger.kill(!!vt), t.progress() < 1 && Me(t, "onInterrupt"), t
    }

    function at(t, e, n) {
        return (6 * (t += t < 0 ? 1 : 1 < t ? -1 : 0) < 1 ? e + (n - e) * t * 6 : t < .5 ? n : 3 * t < 2 ? e + (n - e) * (2 / 3 - t) * 6 : e) * Pe + .5 | 0
    }

    function lt(t, e, n) {
        var r, i, s, a, l, c, u, d, f, h, p = t ? o(t) ? [t >> 16, t >> 8 & Pe, t & Pe] : 0 : De.black;
        if (!p) {
            if ("," === t.substr(-1) && (t = t.substr(0, t.length - 1)), De[t]) p = De[t];
            else if ("#" === t.charAt(0)) {
                if (t.length < 6 && (t = "#" + (r = t.charAt(1)) + r + (i = t.charAt(2)) + i + (s = t.charAt(3)) + s + (5 === t.length ? t.charAt(4) + t.charAt(4) : "")), 9 === t.length) return [(p = parseInt(t.substr(1, 6), 16)) >> 16, p >> 8 & Pe, p & Pe, parseInt(t.substr(7), 16) / 255];
                p = [(t = parseInt(t.substr(1), 16)) >> 16, t >> 8 & Pe, t & Pe]
            } else if ("hsl" === t.substr(0, 3))
                if (p = h = t.match(re), e) {
                    if (~t.indexOf("=")) return p = t.match(ie), n && p.length < 4 && (p[3] = 1), p
                } else a = +p[0] % 360 / 360, l = p[1] / 100, r = 2 * (c = p[2] / 100) - (i = c <= .5 ? c * (l + 1) : c + l - c * l), 3 < p.length && (p[3] *= 1), p[0] = at(a + 1 / 3, r, i), p[1] = at(a, r, i), p[2] = at(a - 1 / 3, r, i);
            else p = t.match(re) || De.transparent;
            p = p.map(Number)
        }
        return e && !h && (r = p[0] / Pe, i = p[1] / Pe, s = p[2] / Pe, c = ((u = Math.max(r, i, s)) + (d = Math.min(r, i, s))) / 2, u === d ? a = l = 0 : (f = u - d, l = .5 < c ? f / (2 - u - d) : f / (u + d), a = u === r ? (i - s) / f + (i < s ? 6 : 0) : u === i ? (s - r) / f + 2 : (r - i) / f + 4, a *= 60), p[0] = ~~(a + .5), p[1] = ~~(100 * l + .5), p[2] = ~~(100 * c + .5)), n && p.length < 4 && (p[3] = 1), p
    }

    function ct(t) {
        var e = [],
            n = [],
            r = -1;
        return t.split(Ie).forEach((function(t) {
            var i = t.match(oe) || [];
            e.push.apply(e, i), n.push(r += i.length + 1)
        })), e.c = n, e
    }

    function ut(t, e, n) {
        var r, i, o, s, a = "",
            l = (t + a).match(Ie),
            c = e ? "hsla(" : "rgba(",
            u = 0;
        if (!l) return t;
        if (l = l.map((function(t) {
                return (t = lt(t, e, 1)) && c + (e ? t[0] + "," + t[1] + "%," + t[2] + "%," + t[3] : t.join(",")) + ")"
            })), n && (o = ct(t), (r = n.c).join(a) !== o.c.join(a)))
            for (s = (i = t.replace(Ie, "1").split(oe)).length - 1; u < s; u++) a += i[u] + (~r.indexOf(u) ? l.shift() || c + "0,0,0,0)" : (o.length ? o : l.length ? l : n).shift());
        if (!i)
            for (s = (i = t.split(Ie)).length - 1; u < s; u++) a += i[u] + l[u];
        return a + i[s]
    }

    function dt(t) {
        var e, n = t.join(" ");
        if (Ie.lastIndex = 0, Ie.test(n)) return e = Ne.test(n), t[1] = ut(t[1], e), t[0] = ut(t[0], e, ct(t[1])), !0
    }

    function ft(t, e) {
        for (var n, r = t._first; r;) r instanceof Qe ? ft(r, e) : !r.vars.yoyoEase || r._yoyo && r._repeat || r._yoyo === e || (r.timeline ? ft(r.timeline, e) : (n = r._ease, r._ease = r._yEase, r._yEase = n, r._yoyo = e)), r = r._next
    }

    function ht(t, e, n, r) {
        void 0 === n && (n = function(t) {
            return 1 - e(1 - t)
        }), void 0 === r && (r = function(t) {
            return t < .5 ? e(2 * t) / 2 : 1 - e(2 * (1 - t)) / 2
        });
        var i, o = {
            easeIn: e,
            easeOut: n,
            easeInOut: r
        };
        return y(t, (function(t) {
            for (var e in Re[t] = ue[t] = o, Re[i = t.toLowerCase()] = n, o) Re[i + ("easeIn" === e ? ".in" : "easeOut" === e ? ".out" : ".inOut")] = Re[t + "." + e] = o[e]
        })), o
    }

    function pt(t) {
        return function(e) {
            return e < .5 ? (1 - t(1 - 2 * e)) / 2 : .5 + t(2 * (e - .5)) / 2
        }
    }

    function gt(t, e, n) {
        function r(t) {
            return 1 === t ? 1 : i * Math.pow(2, -10 * t) * te((t - s) * o) + 1
        }
        var i = 1 <= e ? e : 1,
            o = (n || (t ? .3 : .45)) / (e < 1 ? e : 1),
            s = o / Qt * (Math.asin(1 / i) || 0),
            a = "out" === t ? r : "in" === t ? function(t) {
                return 1 - r(1 - t)
            } : pt(r);
        return o = Qt / o, a.config = function(e, n) {
            return gt(t, e, n)
        }, a
    }

    function mt(t, e) {
        function n(t) {
            return t ? --t * t * ((e + 1) * t + e) + 1 : 0
        }
        void 0 === e && (e = 1.70158);
        var r = "out" === t ? n : "in" === t ? function(t) {
            return 1 - n(1 - t)
        } : pt(n);
        return r.config = function(e) {
            return mt(t, e)
        }, r
    }
    var _t, vt, yt, bt, wt, xt, At, Tt, kt, Lt, Et, St, Ct, Ot, Mt, Pt, Dt, It, Nt, zt, qt, Rt, Ft, Bt, jt, Ht, Wt, Xt, Yt = {
            autoSleep: 120,
            force3D: "auto",
            nullTargetWarn: 1,
            units: {
                lineHeight: ""
            }
        },
        Vt = {
            duration: .5,
            overwrite: !1,
            delay: 0
        },
        $t = 1e8,
        Ut = 1 / $t,
        Qt = 2 * Math.PI,
        Gt = Qt / 4,
        Kt = 0,
        Zt = Math.sqrt,
        Jt = Math.cos,
        te = Math.sin,
        ee = "function" == typeof ArrayBuffer && ArrayBuffer.isView || function() {},
        ne = Array.isArray,
        re = /(?:-?\.?\d|\.)+/gi,
        ie = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
        oe = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
        se = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
        ae = /[+-]=-?[.\d]+/,
        le = /[^,'"\[\]\s]+/gi,
        ce = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
        ue = {},
        de = {
            suppressEvents: !0,
            isStart: !0,
            kill: !1
        },
        fe = {
            suppressEvents: !0,
            kill: !1
        },
        he = {
            suppressEvents: !0
        },
        pe = {},
        ge = [],
        me = {},
        _e = {},
        ve = {},
        ye = 30,
        be = [],
        we = "",
        xe = function(t, e) {
            for (var n in e) t[n] = e[n];
            return t
        },
        Ae = function(t, e) {
            var n = Math.floor(t /= e);
            return t && n === t ? n - 1 : n
        },
        Te = function(t) {
            var e = t.data;
            return "isFromStart" === e || "isStart" === e
        },
        ke = {
            _start: 0,
            endTime: g,
            totalDuration: g
        },
        Le = function t(e, n, i) {
            var o, s, a, l = e.labels,
                c = e._recent || ke,
                u = e.duration() >= $t ? c.endTime(!1) : e._dur;
            return r(n) && (isNaN(n) || n in l) ? (s = n.charAt(0), a = "%" === n.substr(-1), o = n.indexOf("="), "<" === s || ">" === s ? (0 <= o && (n = n.replace(/=/, "")), ("<" === s ? c._start : c.endTime(0 <= c._repeat)) + (parseFloat(n.substr(1)) || 0) * (a ? (o < 0 ? c : i).totalDuration() / 100 : 1)) : o < 0 ? (n in l || (l[n] = u), l[n]) : (s = parseFloat(n.charAt(o - 1) + n.substr(o + 1)), a && i && (s = s / 100 * (ne(i) ? i[0] : i).totalDuration()), 1 < o ? t(e, n.substr(0, o - 1), i) + s : u + s)) : null == n ? u : +n
        },
        Ee = function(t, e, n) {
            return n < t ? t : e < n ? e : n
        },
        Se = [].slice,
        Ce = function(t, e, n) {
            return yt && !e && yt.selector ? yt.selector(t) : !r(t) || n || !xt && qe() ? ne(t) ? function(t, e, n) {
                return void 0 === n && (n = []), t.forEach((function(t) {
                    return r(t) && !e || G(t, 1) ? n.push.apply(n, Ce(t)) : n.push(t)
                })) || n
            }(t, n) : G(t) ? Se.call(t, 0) : t ? [t] : [] : Se.call((e || At).querySelectorAll(t), 0)
        },
        Oe = function(t, e, n, r, i) {
            var o = e - t,
                s = r - n;
            return U(i, (function(e) {
                return n + ((e - t) / o * s || 0)
            }))
        },
        Me = function(t, e, n) {
            var r, i, o, s = t.vars,
                a = s[e],
                l = yt,
                c = t._ctx;
            if (a) return r = s[e + "Params"], i = s.callbackScope || t, n && ge.length && T(), c && (yt = c), o = r ? a.apply(i, r) : a.call(i), yt = l, o
        },
        Pe = 255,
        De = {
            aqua: [0, Pe, Pe],
            lime: [0, Pe, 0],
            silver: [192, 192, 192],
            black: [0, 0, 0],
            maroon: [128, 0, 0],
            teal: [0, 128, 128],
            blue: [0, 0, Pe],
            navy: [0, 0, 128],
            white: [Pe, Pe, Pe],
            olive: [128, 128, 0],
            yellow: [Pe, Pe, 0],
            orange: [Pe, 165, 0],
            gray: [128, 128, 128],
            purple: [128, 0, 128],
            green: [0, 128, 0],
            red: [Pe, 0, 0],
            pink: [Pe, 192, 203],
            cyan: [0, Pe, Pe],
            transparent: [Pe, Pe, Pe, 0]
        },
        Ie = function() {
            var t, e = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";
            for (t in De) e += "|" + t + "\\b";
            return new RegExp(e + ")", "gi")
        }(),
        Ne = /hsl[a]?\(/,
        ze = (Nt = Date.now, zt = 500, qt = 33, Rt = Nt(), Ft = Rt, jt = Bt = 1e3 / 240, Pt = {
            time: 0,
            frame: 0,
            tick: function() {
                We(!0)
            },
            deltaRatio: function(t) {
                return Dt / (1e3 / (t || 60))
            },
            wake: function() {
                kt && (!xt && c() && (wt = xt = window, At = wt.document || {}, ue.gsap = qn, (wt.gsapVersions || (wt.gsapVersions = [])).push(qn.version), d(Tt || wt.GreenSockGlobals || !wt.gsap && wt || {}), Mt = wt.requestAnimationFrame), Ct && Pt.sleep(), Ot = Mt || function(t) {
                    return setTimeout(t, jt - 1e3 * Pt.time + 1 | 0)
                }, St = 1, We(2))
            },
            sleep: function() {
                (Mt ? wt.cancelAnimationFrame : clearTimeout)(Ct), St = 0, Ot = g
            },
            lagSmoothing: function(t, e) {
                zt = t || 1e8, qt = Math.min(e, zt, 0)
            },
            fps: function(t) {
                Bt = 1e3 / (t || 240), jt = 1e3 * Pt.time + Bt
            },
            add: function(t, e, n) {
                var r = e ? function(e, n, i, o) {
                    t(e, n, i, o), Pt.remove(r)
                } : t;
                return Pt.remove(t), Ht[n ? "unshift" : "push"](r), qe(), r
            },
            remove: function(t, e) {
                ~(e = Ht.indexOf(t)) && Ht.splice(e, 1) && e <= It && It--
            },
            _listeners: Ht = []
        }),
        qe = function() {
            return !St && ze.wake()
        },
        Re = {},
        Fe = /^[\d.\-M][\d.\-,\s]/,
        Be = /["']/g,
        je = function(t) {
            return function(e) {
                return 1 - t(1 - e)
            }
        },
        He = function(t, e) {
            return t && (i(t) ? t : Re[t] || function(t) {
                var e = (t + "").split("("),
                    n = Re[e[0]];
                return n && 1 < e.length && n.config ? n.config.apply(null, ~t.indexOf("{") ? [function(t) {
                    for (var e, n, r, i = {}, o = t.substr(1, t.length - 3).split(":"), s = o[0], a = 1, l = o.length; a < l; a++) n = o[a], e = a !== l - 1 ? n.lastIndexOf(",") : n.length, r = n.substr(0, e), i[s] = isNaN(r) ? r.replace(Be, "").trim() : +r, s = n.substr(e + 1).trim();
                    return i
                }(e[1])] : function(t) {
                    var e = t.indexOf("(") + 1,
                        n = t.indexOf(")"),
                        r = t.indexOf("(", e);
                    return t.substring(e, ~r && r < n ? t.indexOf(")", n + 1) : n)
                }(t).split(",").map(L)) : Re._CE && Fe.test(t) ? Re._CE("", t) : n
            }(t)) || e
        };

    function We(t) {
        var e, n, r, i, o = Nt() - Ft,
            s = !0 === t;
        if (zt < o && (Rt += o - qt), (0 < (e = (r = (Ft += o) - Rt) - jt) || s) && (i = ++Pt.frame, Dt = r - 1e3 * Pt.time, Pt.time = r /= 1e3, jt += e + (Bt <= e ? 4 : Bt - e), n = 1), s || (Ct = Ot(We)), n)
            for (It = 0; It < Ht.length; It++) Ht[It](r, Dt, i, t)
    }

    function Xe(t) {
        return t < Xt ? Wt * t * t : t < .7272727272727273 ? Wt * Math.pow(t - 1.5 / 2.75, 2) + .75 : t < .9090909090909092 ? Wt * (t -= 2.25 / 2.75) * t + .9375 : Wt * Math.pow(t - 2.625 / 2.75, 2) + .984375
    }
    y("Linear,Quad,Cubic,Quart,Quint,Strong", (function(t, e) {
        var n = e < 5 ? e + 1 : e;
        ht(t + ",Power" + (n - 1), e ? function(t) {
            return Math.pow(t, n)
        } : function(t) {
            return t
        }, (function(t) {
            return 1 - Math.pow(1 - t, n)
        }), (function(t) {
            return t < .5 ? Math.pow(2 * t, n) / 2 : 1 - Math.pow(2 * (1 - t), n) / 2
        }))
    })), Re.Linear.easeNone = Re.none = Re.Linear.easeIn, ht("Elastic", gt("in"), gt("out"), gt()), Wt = 7.5625, Xt = 1 / 2.75, ht("Bounce", (function(t) {
        return 1 - Xe(1 - t)
    }), Xe), ht("Expo", (function(t) {
        return t ? Math.pow(2, 10 * (t - 1)) : 0
    })), ht("Circ", (function(t) {
        return -(Zt(1 - t * t) - 1)
    })), ht("Sine", (function(t) {
        return 1 === t ? 1 : 1 - Jt(t * Gt)
    })), ht("Back", mt("in"), mt("out"), mt()), Re.SteppedEase = Re.steps = ue.SteppedEase = {
        config: function(t, e) {
            void 0 === t && (t = 1);
            var n = 1 / t,
                r = t + (e ? 0 : 1),
                i = e ? 1 : 0;
            return function(t) {
                return ((r * Ee(0, .99999999, t) | 0) + i) * n
            }
        }
    }, Vt.ease = Re["quad.out"], y("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", (function(t) {
        return we += t + "," + t + "Params,"
    }));
    var Ye, Ve = function(t, e) {
            this.id = Kt++, (t._gsap = this).target = t, this.harness = e, this.get = e ? e.get : v, this.set = e ? e.getSetter : fn
        },
        $e = ((Ye = Ue.prototype).delay = function(t) {
            return t || 0 === t ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + t - this._delay), this._delay = t, this) : this._delay
        }, Ye.duration = function(t) {
            return arguments.length ? this.totalDuration(0 < this._repeat ? t + (t + this._rDelay) * this._repeat : t) : this.totalDuration() && this._dur
        }, Ye.totalDuration = function(t) {
            return arguments.length ? (this._dirty = 0, Y(this, this._repeat < 0 ? t : (t - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur
        }, Ye.totalTime = function(t, e) {
            if (qe(), !arguments.length) return this._tTime;
            var n = this._dp;
            if (n && n.smoothChildTiming && this._ts) {
                for (B(this, t), !n._dp || n.parent || j(n, this); n && n.parent;) n.parent._time !== n._start + (0 <= n._ts ? n._tTime / n._ts : (n.totalDuration() - n._tTime) / -n._ts) && n.totalTime(n._tTime, !0), n = n.parent;
                !this.parent && this._dp.autoRemoveChildren && (0 < this._ts && t < this._tDur || this._ts < 0 && 0 < t || !this._tDur && !t) && H(this._dp, this, this._start - this._delay)
            }
            return (this._tTime !== t || !this._dur && !e || this._initted && Math.abs(this._zTime) === Ut || !t && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = t), k(this, t, e)), this
        }, Ye.time = function(t, e) {
            return arguments.length ? this.totalTime(Math.min(this.totalDuration(), t + q(this)) % (this._dur + this._rDelay) || (t ? this._dur : 0), e) : this._time
        }, Ye.totalProgress = function(t, e) {
            return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio
        }, Ye.progress = function(t, e) {
            return arguments.length ? this.totalTime(this.duration() * (!this._yoyo || 1 & this.iteration() ? t : 1 - t) + q(this), e) : this.duration() ? Math.min(1, this._time / this._dur) : this.ratio
        }, Ye.iteration = function(t, e) {
            var n = this.duration() + this._rDelay;
            return arguments.length ? this.totalTime(this._time + (t - 1) * n, e) : this._repeat ? Ae(this._tTime, n) + 1 : 1
        }, Ye.timeScale = function(t) {
            if (!arguments.length) return this._rts === -Ut ? 0 : this._rts;
            if (this._rts === t) return this;
            var e = this.parent && this._ts ? R(this.parent._time, this) : this._tTime;
            return this._rts = +t || 0, this._ts = this._ps || t === -Ut ? 0 : this._rts, this.totalTime(Ee(-this._delay, this._tDur, e), !0), F(this),
                function(t) {
                    for (var e = t.parent; e && e.parent;) e._dirty = 1, e.totalDuration(), e = e.parent;
                    return t
                }(this)
        }, Ye.paused = function(t) {
            return arguments.length ? (this._ps !== t && ((this._ps = t) ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (qe(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, 1 === this.progress() && Math.abs(this._zTime) !== Ut && (this._tTime -= Ut)))), this) : this._ps
        }, Ye.startTime = function(t) {
            if (arguments.length) {
                this._start = t;
                var e = this.parent || this._dp;
                return !e || !e._sort && this.parent || H(e, this, t - this._delay), this
            }
            return this._start
        }, Ye.endTime = function(t) {
            return this._start + (l(t) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1)
        }, Ye.rawTime = function(t) {
            var e = this.parent || this._dp;
            return e ? t && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? R(e.rawTime(t), this) : this._tTime : this._tTime
        }, Ye.revert = function(t) {
            void 0 === t && (t = he);
            var e = vt;
            return vt = t, (this._initted || this._startAt) && (this.timeline && this.timeline.revert(t), this.totalTime(-.01, t.suppressEvents)), "nested" !== this.data && !1 !== t.kill && this.kill(), vt = e, this
        }, Ye.globalTime = function(t) {
            for (var e = this, n = arguments.length ? t : e.rawTime(); e;) n = e._start + n / (e._ts || 1), e = e._dp;
            return !this.parent && this.vars.immediateRender ? -1 : n
        }, Ye.repeat = function(t) {
            return arguments.length ? (this._repeat = t === 1 / 0 ? -2 : t, V(this)) : -2 === this._repeat ? 1 / 0 : this._repeat
        }, Ye.repeatDelay = function(t) {
            if (arguments.length) {
                var e = this._time;
                return this._rDelay = t, V(this), e ? this.time(e) : this
            }
            return this._rDelay
        }, Ye.yoyo = function(t) {
            return arguments.length ? (this._yoyo = t, this) : this._yoyo
        }, Ye.seek = function(t, e) {
            return this.totalTime(Le(this, t), l(e))
        }, Ye.restart = function(t, e) {
            return this.play().totalTime(t ? -this._delay : 0, l(e))
        }, Ye.play = function(t, e) {
            return null != t && this.seek(t, e), this.reversed(!1).paused(!1)
        }, Ye.reverse = function(t, e) {
            return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1)
        }, Ye.pause = function(t, e) {
            return null != t && this.seek(t, e), this.paused(!0)
        }, Ye.resume = function() {
            return this.paused(!1)
        }, Ye.reversed = function(t) {
            return arguments.length ? (!!t !== this.reversed() && this.timeScale(-this._rts || (t ? -Ut : 0)), this) : this._rts < 0
        }, Ye.invalidate = function() {
            return this._initted = this._act = 0, this._zTime = -Ut, this
        }, Ye.isActive = function() {
            var t, e = this.parent || this._dp,
                n = this._start;
            return !(e && !(this._ts && this._initted && e.isActive() && (t = e.rawTime(!0)) >= n && t < this.endTime(!0) - Ut))
        }, Ye.eventCallback = function(t, e, n) {
            var r = this.vars;
            return 1 < arguments.length ? (e ? (r[t] = e, n && (r[t + "Params"] = n), "onUpdate" === t && (this._onUpdate = e)) : delete r[t], this) : r[t]
        }, Ye.then = function(t) {
            var e = this;
            return new Promise((function(n) {
                function r() {
                    var t = e.then;
                    e.then = null, i(o) && (o = o(e)) && (o.then || o === e) && (e.then = t), n(o), e.then = t
                }
                var o = i(t) ? t : E;
                e._initted && 1 === e.totalProgress() && 0 <= e._ts || !e._tTime && e._ts < 0 ? r() : e._prom = r
            }))
        }, Ye.kill = function() {
            st(this)
        }, Ue);

    function Ue(t) {
        this.vars = t, this._delay = +t.delay || 0, (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) && (this._rDelay = t.repeatDelay || 0, this._yoyo = !!t.yoyo || !!t.yoyoEase), this._ts = 1, Y(this, +t.duration, 1, 1), this.data = t.data, yt && (this._ctx = yt).data.push(this), St || ze.wake()
    }
    S($e.prototype, {
        _time: 0,
        _start: 0,
        _end: 0,
        _tTime: 0,
        _tDur: 0,
        _dirty: 0,
        _repeat: 0,
        _yoyo: !1,
        parent: null,
        _initted: !1,
        _rDelay: 0,
        _ts: 1,
        _dp: 0,
        ratio: 0,
        _zTime: -Ut,
        _prom: 0,
        _ps: !1,
        _rts: 1
    });
    var Qe = function(t) {
        function s(e, r) {
            var i;
            return void 0 === e && (e = {}), (i = t.call(this, e) || this).labels = {}, i.smoothChildTiming = !!e.smoothChildTiming, i.autoRemoveChildren = !!e.autoRemoveChildren, i._sort = l(e.sortChildren), bt && H(e.parent || bt, n(i), r), e.reversed && i.reverse(), e.paused && i.paused(!0), e.scrollTrigger && W(n(i), e.scrollTrigger), i
        }
        e(s, t);
        var a = s.prototype;
        return a.to = function(t, e, n) {
            return $(0, arguments, this), this
        }, a.from = function(t, e, n) {
            return $(1, arguments, this), this
        }, a.fromTo = function(t, e, n, r) {
            return $(2, arguments, this), this
        }, a.set = function(t, e, n) {
            return e.duration = 0, e.parent = this, M(e).repeatDelay || (e.repeat = 0), e.immediateRender = !!e.immediateRender, new sn(t, e, Le(this, n), 1), this
        }, a.call = function(t, e, n) {
            return H(this, sn.delayedCall(0, t, e), n)
        }, a.staggerTo = function(t, e, n, r, i, o, s) {
            return n.duration = e, n.stagger = n.stagger || r, n.onComplete = o, n.onCompleteParams = s, n.parent = this, new sn(t, n, Le(this, i)), this
        }, a.staggerFrom = function(t, e, n, r, i, o, s) {
            return n.runBackwards = 1, M(n).immediateRender = l(n.immediateRender), this.staggerTo(t, e, n, r, i, o, s)
        }, a.staggerFromTo = function(t, e, n, r, i, o, s, a) {
            return r.startAt = n, M(r).immediateRender = l(r.immediateRender), this.staggerTo(t, e, r, i, o, s, a)
        }, a.render = function(t, e, n) {
            var r, i, o, s, a, l, c, u, d, f, h, p, g = this._time,
                m = this._dirty ? this.totalDuration() : this._tDur,
                _ = this._dur,
                v = t <= 0 ? 0 : w(t),
                y = this._zTime < 0 != t < 0 && (this._initted || !_);
            if (this !== bt && m < v && 0 <= t && (v = m), v !== this._tTime || n || y) {
                if (g !== this._time && _ && (v += this._time - g, t += this._time - g), r = v, d = this._start, l = !(u = this._ts), y && (_ || (g = this._zTime), !t && e || (this._zTime = t)), this._repeat) {
                    if (h = this._yoyo, a = _ + this._rDelay, this._repeat < -1 && t < 0) return this.totalTime(100 * a + t, e, n);
                    if (r = w(v % a), v === m ? (s = this._repeat, r = _) : ((s = ~~(v / a)) && s === v / a && (r = _, s--), _ < r && (r = _)), f = Ae(this._tTime, a), !g && this._tTime && f !== s && (f = s), h && 1 & s && (r = _ - r, p = 1), s !== f && !this._lock) {
                        var b = h && 1 & f,
                            x = b === (h && 1 & s);
                        if (s < f && (b = !b), g = b ? 0 : _, this._lock = 1, this.render(g || (p ? 0 : w(s * a)), e, !_)._lock = 0, this._tTime = v, !e && this.parent && Me(this, "onRepeat"), this.vars.repeatRefresh && !p && (this.invalidate()._lock = 1), g && g !== this._time || l != !this._ts || this.vars.onRepeat && !this.parent && !this._act) return this;
                        if (_ = this._dur, m = this._tDur, x && (this._lock = 2, g = b ? _ : -1e-4, this.render(g, !0), this.vars.repeatRefresh && !p && this.invalidate()), this._lock = 0, !this._ts && !l) return this;
                        ft(this, p)
                    }
                }
                if (this._hasPause && !this._forcing && this._lock < 2 && (c = function(t, e, n) {
                        var r;
                        if (e < n)
                            for (r = t._first; r && r._start <= n;) {
                                if ("isPause" === r.data && r._start > e) return r;
                                r = r._next
                            } else
                                for (r = t._last; r && r._start >= n;) {
                                    if ("isPause" === r.data && r._start < e) return r;
                                    r = r._prev
                                }
                    }(this, w(g), w(r))) && (v -= r - (r = c._start)), this._tTime = v, this._time = r, this._act = !u, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = t, g = 0), !g && r && !e && (Me(this, "onStart"), this._tTime !== v)) return this;
                if (g <= r && 0 <= t)
                    for (i = this._first; i;) {
                        if (o = i._next, (i._act || r >= i._start) && i._ts && c !== i) {
                            if (i.parent !== this) return this.render(t, e, n);
                            if (i.render(0 < i._ts ? (r - i._start) * i._ts : (i._dirty ? i.totalDuration() : i._tDur) + (r - i._start) * i._ts, e, n), r !== this._time || !this._ts && !l) {
                                c = 0, o && (v += this._zTime = -Ut);
                                break
                            }
                        }
                        i = o
                    } else {
                        i = this._last;
                        for (var A = t < 0 ? t : r; i;) {
                            if (o = i._prev, (i._act || A <= i._end) && i._ts && c !== i) {
                                if (i.parent !== this) return this.render(t, e, n);
                                if (i.render(0 < i._ts ? (A - i._start) * i._ts : (i._dirty ? i.totalDuration() : i._tDur) + (A - i._start) * i._ts, e, n || vt && (i._initted || i._startAt)), r !== this._time || !this._ts && !l) {
                                    c = 0, o && (v += this._zTime = A ? -Ut : Ut);
                                    break
                                }
                            }
                            i = o
                        }
                    }
                if (c && !e && (this.pause(), c.render(g <= r ? 0 : -Ut)._zTime = g <= r ? 1 : -1, this._ts)) return this._start = d, F(this), this.render(t, e, n);
                this._onUpdate && !e && Me(this, "onUpdate", !0), (v === m && this._tTime >= this.totalDuration() || !v && g) && (d !== this._start && Math.abs(u) === Math.abs(this._ts) || this._lock || (!t && _ || !(v === m && 0 < this._ts || !v && this._ts < 0) || I(this, 1), e || t < 0 && !g || !v && !g && m || (Me(this, v === m && 0 <= t ? "onComplete" : "onReverseComplete", !0), !this._prom || v < m && 0 < this.timeScale() || this._prom())))
            }
            return this
        }, a.add = function(t, e) {
            var n = this;
            if (o(e) || (e = Le(this, e, t)), !(t instanceof $e)) {
                if (ne(t)) return t.forEach((function(t) {
                    return n.add(t, e)
                })), this;
                if (r(t)) return this.addLabel(t, e);
                if (!i(t)) return this;
                t = sn.delayedCall(0, t)
            }
            return this !== t ? H(this, t, e) : this
        }, a.getChildren = function(t, e, n, r) {
            void 0 === t && (t = !0), void 0 === e && (e = !0), void 0 === n && (n = !0), void 0 === r && (r = -$t);
            for (var i = [], o = this._first; o;) o._start >= r && (o instanceof sn ? e && i.push(o) : (n && i.push(o), t && i.push.apply(i, o.getChildren(!0, e, n)))), o = o._next;
            return i
        }, a.getById = function(t) {
            for (var e = this.getChildren(1, 1, 1), n = e.length; n--;)
                if (e[n].vars.id === t) return e[n]
        }, a.remove = function(t) {
            return r(t) ? this.removeLabel(t) : i(t) ? this.killTweensOf(t) : (D(this, t), t === this._recent && (this._recent = this._last), N(this))
        }, a.totalTime = function(e, n) {
            return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = w(ze.time - (0 < this._ts ? e / this._ts : (this.totalDuration() - e) / -this._ts))), t.prototype.totalTime.call(this, e, n), this._forcing = 0, this) : this._tTime
        }, a.addLabel = function(t, e) {
            return this.labels[t] = Le(this, e), this
        }, a.removeLabel = function(t) {
            return delete this.labels[t], this
        }, a.addPause = function(t, e, n) {
            var r = sn.delayedCall(0, e || g, n);
            return r.data = "isPause", this._hasPause = 1, H(this, r, Le(this, t))
        }, a.removePause = function(t) {
            var e = this._first;
            for (t = Le(this, t); e;) e._start === t && "isPause" === e.data && I(e), e = e._next
        }, a.killTweensOf = function(t, e, n) {
            for (var r = this.getTweensOf(t, n), i = r.length; i--;) Ze !== r[i] && r[i].kill(t, e);
            return this
        }, a.getTweensOf = function(t, e) {
            for (var n, r = [], i = Ce(t), s = this._first, a = o(e); s;) s instanceof sn ? A(s._targets, i) && (a ? (!Ze || s._initted && s._ts) && s.globalTime(0) <= e && s.globalTime(s.totalDuration()) > e : !e || s.isActive()) && r.push(s) : (n = s.getTweensOf(i, e)).length && r.push.apply(r, n), s = s._next;
            return r
        }, a.tweenTo = function(t, e) {
            e = e || {};
            var n, r = this,
                i = Le(r, t),
                o = e.startAt,
                s = e.onStart,
                a = e.onStartParams,
                l = e.immediateRender,
                c = sn.to(r, S({
                    ease: e.ease || "none",
                    lazy: !1,
                    immediateRender: !1,
                    time: i,
                    overwrite: "auto",
                    duration: e.duration || Math.abs((i - (o && "time" in o ? o.time : r._time)) / r.timeScale()) || Ut,
                    onStart: function() {
                        if (r.pause(), !n) {
                            var t = e.duration || Math.abs((i - (o && "time" in o ? o.time : r._time)) / r.timeScale());
                            c._dur !== t && Y(c, t, 0, 1).render(c._time, !0, !0), n = 1
                        }
                        s && s.apply(c, a || [])
                    }
                }, e));
            return l ? c.render(0) : c
        }, a.tweenFromTo = function(t, e, n) {
            return this.tweenTo(e, S({
                startAt: {
                    time: Le(this, t)
                }
            }, n))
        }, a.recent = function() {
            return this._recent
        }, a.nextLabel = function(t) {
            return void 0 === t && (t = this._time), ot(this, Le(this, t))
        }, a.previousLabel = function(t) {
            return void 0 === t && (t = this._time), ot(this, Le(this, t), 1)
        }, a.currentLabel = function(t) {
            return arguments.length ? this.seek(t, !0) : this.previousLabel(this._time + Ut)
        }, a.shiftChildren = function(t, e, n) {
            void 0 === n && (n = 0);
            for (var r, i = this._first, o = this.labels; i;) i._start >= n && (i._start += t, i._end += t), i = i._next;
            if (e)
                for (r in o) o[r] >= n && (o[r] += t);
            return N(this)
        }, a.invalidate = function(e) {
            var n = this._first;
            for (this._lock = 0; n;) n.invalidate(e), n = n._next;
            return t.prototype.invalidate.call(this, e)
        }, a.clear = function(t) {
            void 0 === t && (t = !0);
            for (var e, n = this._first; n;) e = n._next, this.remove(n), n = e;
            return this._dp && (this._time = this._tTime = this._pTime = 0), t && (this.labels = {}), N(this)
        }, a.totalDuration = function(t) {
            var e, n, r, i = 0,
                o = this,
                s = o._last,
                a = $t;
            if (arguments.length) return o.timeScale((o._repeat < 0 ? o.duration() : o.totalDuration()) / (o.reversed() ? -t : t));
            if (o._dirty) {
                for (r = o.parent; s;) e = s._prev, s._dirty && s.totalDuration(), a < (n = s._start) && o._sort && s._ts && !o._lock ? (o._lock = 1, H(o, s, n - s._delay, 1)._lock = 0) : a = n, n < 0 && s._ts && (i -= n, (!r && !o._dp || r && r.smoothChildTiming) && (o._start += n / o._ts, o._time -= n, o._tTime -= n), o.shiftChildren(-n, !1, -1 / 0), a = 0), s._end > i && s._ts && (i = s._end), s = e;
                Y(o, o === bt && o._time > i ? o._time : i, 1, 1), o._dirty = 0
            }
            return o._tDur
        }, s.updateRoot = function(t) {
            if (bt._ts && (k(bt, R(t, bt)), Lt = ze.frame), ze.frame >= ye) {
                ye += Yt.autoSleep || 120;
                var e = bt._first;
                if ((!e || !e._ts) && Yt.autoSleep && ze._listeners.length < 2) {
                    for (; e && !e._ts;) e = e._next;
                    e || ze.sleep()
                }
            }
        }, s
    }($e);

    function Ge(t, e, n, o, s, l) {
        var c, u, d, f;
        if (_e[t] && !1 !== (c = new _e[t]).init(s, c.rawVars ? e[t] : function(t, e, n, o, s) {
                if (i(t) && (t = nn(t, s, e, n, o)), !a(t) || t.style && t.nodeType || ne(t) || ee(t)) return r(t) ? nn(t, s, e, n, o) : t;
                var l, c = {};
                for (l in t) c[l] = nn(t[l], s, e, n, o);
                return c
            }(e[t], o, s, l, n), n, o, l) && (n._pt = u = new bn(n._pt, s, t, 0, 1, c.render, c, 0, c.priority), n !== Et))
            for (d = n._ptLookup[n._targets.indexOf(s)], f = c._props.length; f--;) d[c._props[f]] = u;
        return c
    }

    function Ke(t, e, n, r) {
        var i, o, s = e.ease || r || "power1.inOut";
        if (ne(e)) o = n[t] || (n[t] = []), e.forEach((function(t, n) {
            return o.push({
                t: n / (e.length - 1) * 100,
                v: t,
                e: s
            })
        }));
        else
            for (i in e) o = n[i] || (n[i] = []), "ease" === i || o.push({
                t: parseFloat(t),
                v: e[i],
                e: s
            })
    }
    S(Qe.prototype, {
        _lock: 0,
        _hasPause: 0,
        _forcing: 0
    });
    var Ze, Je, tn = function(t, e, n, o, s, a, l, c, u, d) {
            i(o) && (o = o(s || 0, t, a));
            var h, p = t[e],
                g = "get" !== n ? n : i(p) ? u ? t[e.indexOf("set") || !i(t["get" + e.substr(3)]) ? e : "get" + e.substr(3)](u) : t[e]() : p,
                m = i(p) ? u ? dn : un : cn;
            if (r(o) && (~o.indexOf("random(") && (o = it(o)), "=" === o.charAt(1) && (!(h = x(g, o) + (Q(g) || 0)) && 0 !== h || (o = h))), !d || g !== o || Je) return isNaN(g * o) || "" === o ? (p || e in t || f(e, o), function(t, e, n, r, i, o, s) {
                var a, l, c, u, d, f, h, p, g = new bn(this._pt, t, e, 0, 1, gn, null, i),
                    m = 0,
                    _ = 0;
                for (g.b = n, g.e = r, n += "", (h = ~(r += "").indexOf("random(")) && (r = it(r)), o && (o(p = [n, r], t, e), n = p[0], r = p[1]), l = n.match(se) || []; a = se.exec(r);) u = a[0], d = r.substring(m, a.index), c ? c = (c + 1) % 5 : "rgba(" === d.substr(-5) && (c = 1), u !== l[_++] && (f = parseFloat(l[_ - 1]) || 0, g._pt = {
                    _next: g._pt,
                    p: d || 1 === _ ? d : ",",
                    s: f,
                    c: "=" === u.charAt(1) ? x(f, u) - f : parseFloat(u) - f,
                    m: c && c < 4 ? Math.round : 0
                }, m = se.lastIndex);
                return g.c = m < r.length ? r.substring(m, r.length) : "", g.fp = s, (ae.test(r) || h) && (g.e = 0), this._pt = g
            }.call(this, t, e, g, o, m, c || Yt.stringFilter, u)) : (h = new bn(this._pt, t, e, +g || 0, o - (g || 0), "boolean" == typeof p ? pn : hn, 0, m), u && (h.fp = u), l && h.modifier(l, this, t), this._pt = h)
        },
        en = function t(e, n, r) {
            var i, o, s, a, c, u, d, f, h, p, g, v, y, b = e.vars,
                w = b.ease,
                x = b.startAt,
                A = b.immediateRender,
                k = b.lazy,
                L = b.onUpdate,
                E = b.onUpdateParams,
                C = b.callbackScope,
                M = b.runBackwards,
                P = b.yoyoEase,
                D = b.keyframes,
                N = b.autoRevert,
                z = e._dur,
                q = e._startAt,
                R = e._targets,
                F = e.parent,
                B = F && "nested" === F.data ? F.vars.targets : R,
                j = "auto" === e._overwrite && !_t,
                H = e.timeline;
            if (!H || D && w || (w = "none"), e._ease = He(w, Vt.ease), e._yEase = P ? je(He(!0 === P ? w : P, Vt.ease)) : 0, P && e._yoyo && !e._repeat && (P = e._yEase, e._yEase = e._ease, e._ease = P), e._from = !H && !!b.runBackwards, !H || D && !b.stagger) {
                if (v = (f = R[0] ? _(R[0]).harness : 0) && b[f.prop], i = O(b, pe), q && (q._zTime < 0 && q.progress(1), n < 0 && M && A && !N ? q.render(-1, !0) : q.revert(M && z ? fe : de), q._lazy = 0), x) {
                    if (I(e._startAt = sn.set(R, S({
                            data: "isStart",
                            overwrite: !1,
                            parent: F,
                            immediateRender: !0,
                            lazy: l(k),
                            startAt: null,
                            delay: 0,
                            onUpdate: L,
                            onUpdateParams: E,
                            callbackScope: C,
                            stagger: 0
                        }, x))), n < (e._startAt._dp = 0) && (vt || !A && !N) && e._startAt.revert(fe), A && z && n <= 0 && r <= 0) return void(n && (e._zTime = n))
                } else if (M && z && !q)
                    if (n && (A = !1), s = S({
                            overwrite: !1,
                            data: "isFromStart",
                            lazy: A && l(k),
                            immediateRender: A,
                            stagger: 0,
                            parent: F
                        }, i), v && (s[f.prop] = v), I(e._startAt = sn.set(R, s)), n < (e._startAt._dp = 0) && (vt ? e._startAt.revert(fe) : e._startAt.render(-1, !0)), e._zTime = n, A) {
                        if (!n) return
                    } else t(e._startAt, Ut, Ut);
                for (e._pt = e._ptCache = 0, k = z && l(k) || k && !z, o = 0; o < R.length; o++) {
                    if (d = (c = R[o])._gsap || m(R)[o]._gsap, e._ptLookup[o] = p = {}, me[d.id] && ge.length && T(), g = B === R ? o : B.indexOf(c), f && !1 !== (h = new f).init(c, v || i, e, g, B) && (e._pt = a = new bn(e._pt, c, h.name, 0, 1, h.render, h, 0, h.priority), h._props.forEach((function(t) {
                            p[t] = a
                        })), h.priority && (u = 1)), !f || v)
                        for (s in i) _e[s] && (h = Ge(s, i, e, g, c, B)) ? h.priority && (u = 1) : p[s] = a = tn.call(e, c, s, "get", i[s], g, B, 0, b.stringFilter);
                    e._op && e._op[o] && e.kill(c, e._op[o]), j && e._pt && (Ze = e, bt.killTweensOf(c, p, e.globalTime(n)), y = !e.parent, Ze = 0), e._pt && k && (me[d.id] = 1)
                }
                u && yn(e), e._onInit && e._onInit(e)
            }
            e._onUpdate = L, e._initted = (!e._op || e._pt) && !y, D && n <= 0 && H.render($t, !0, !0)
        },
        nn = function(t, e, n, o, s) {
            return i(t) ? t.call(e, n, o, s) : r(t) && ~t.indexOf("random(") ? it(t) : t
        },
        rn = we + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",
        on = {};
    y(rn + ",id,stagger,delay,duration,paused,scrollTrigger", (function(t) {
        return on[t] = 1
    }));
    var sn = function(t) {
        function i(e, r, i, s) {
            var c;
            "number" == typeof r && (i.duration = r, r = i, i = null);
            var d, f, p, g, _, v, y, b, x = (c = t.call(this, s ? r : M(r)) || this).vars,
                A = x.duration,
                T = x.delay,
                k = x.immediateRender,
                L = x.stagger,
                E = x.overwrite,
                C = x.keyframes,
                P = x.defaults,
                D = x.scrollTrigger,
                I = x.yoyoEase,
                N = r.parent || bt,
                z = (ne(e) || ee(e) ? o(e[0]) : "length" in r) ? [e] : Ce(e);
            if (c._targets = z.length ? m(z) : h("GSAP target " + e + " not found. https://greensock.com", !Yt.nullTargetWarn) || [], c._ptLookup = [], c._overwrite = E, C || L || u(A) || u(T)) {
                if (r = c.vars, (d = c.timeline = new Qe({
                        data: "nested",
                        defaults: P || {},
                        targets: N && "nested" === N.data ? N.vars.targets : z
                    })).kill(), d.parent = d._dp = n(c), d._start = 0, L || u(A) || u(T)) {
                    if (g = z.length, y = L && J(L), a(L))
                        for (_ in L) ~rn.indexOf(_) && ((b = b || {})[_] = L[_]);
                    for (f = 0; f < g; f++)(p = O(r, on)).stagger = 0, I && (p.yoyoEase = I), b && xe(p, b), v = z[f], p.duration = +nn(A, n(c), f, v, z), p.delay = (+nn(T, n(c), f, v, z) || 0) - c._delay, !L && 1 === g && p.delay && (c._delay = T = p.delay, c._start += T, p.delay = 0), d.to(v, p, y ? y(f, v, z) : 0), d._ease = Re.none;
                    d.duration() ? A = T = 0 : c.timeline = 0
                } else if (C) {
                    M(S(d.vars.defaults, {
                        ease: "none"
                    })), d._ease = He(C.ease || r.ease || "none");
                    var q, R, F, B = 0;
                    if (ne(C)) C.forEach((function(t) {
                        return d.to(z, t, ">")
                    })), d.duration();
                    else {
                        for (_ in p = {}, C) "ease" === _ || "easeEach" === _ || Ke(_, C[_], p, C.easeEach);
                        for (_ in p)
                            for (q = p[_].sort((function(t, e) {
                                    return t.t - e.t
                                })), f = B = 0; f < q.length; f++)(F = {
                                ease: (R = q[f]).e,
                                duration: (R.t - (f ? q[f - 1].t : 0)) / 100 * A
                            })[_] = R.v, d.to(z, F, B), B += F.duration;
                        d.duration() < A && d.to({}, {
                            duration: A - d.duration()
                        })
                    }
                }
                A || c.duration(A = d.duration())
            } else c.timeline = 0;
            return !0 !== E || _t || (Ze = n(c), bt.killTweensOf(z), Ze = 0), H(N, n(c), i), r.reversed && c.reverse(), r.paused && c.paused(!0), (k || !A && !C && c._start === w(N._time) && l(k) && function t(e) {
                return !e || e._ts && t(e.parent)
            }(n(c)) && "nested" !== N.data) && (c._tTime = -Ut, c.render(Math.max(0, -T) || 0)), D && W(n(c), D), c
        }
        e(i, t);
        var s = i.prototype;
        return s.render = function(t, e, n) {
            var r, i, o, s, a, l, c, u, d, f = this._time,
                h = this._tDur,
                p = this._dur,
                g = t < 0,
                m = h - Ut < t && !g ? h : t < Ut ? 0 : t;
            if (p) {
                if (m !== this._tTime || !t || n || !this._initted && this._tTime || this._startAt && this._zTime < 0 != g) {
                    if (r = m, u = this.timeline, this._repeat) {
                        if (s = p + this._rDelay, this._repeat < -1 && g) return this.totalTime(100 * s + t, e, n);
                        if (r = w(m % s), m === h ? (o = this._repeat, r = p) : ((o = ~~(m / s)) && o === m / s && (r = p, o--), p < r && (r = p)), (l = this._yoyo && 1 & o) && (d = this._yEase, r = p - r), a = Ae(this._tTime, s), r === f && !n && this._initted) return this._tTime = m, this;
                        o !== a && (u && this._yEase && ft(u, l), !this.vars.repeatRefresh || l || this._lock || (this._lock = n = 1, this.render(w(s * o), !0).invalidate()._lock = 0))
                    }
                    if (!this._initted) {
                        if (X(this, g ? t : r, n, e, m)) return this._tTime = 0, this;
                        if (f !== this._time) return this;
                        if (p !== this._dur) return this.render(t, e, n)
                    }
                    if (this._tTime = m, this._time = r, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = c = (d || this._ease)(r / p), this._from && (this.ratio = c = 1 - c), r && !f && !e && (Me(this, "onStart"), this._tTime !== m)) return this;
                    for (i = this._pt; i;) i.r(c, i.d), i = i._next;
                    u && u.render(t < 0 ? t : !r && l ? -Ut : u._dur * u._ease(r / this._dur), e, n) || this._startAt && (this._zTime = t), this._onUpdate && !e && (g && z(this, t, 0, n), Me(this, "onUpdate")), this._repeat && o !== a && this.vars.onRepeat && !e && this.parent && Me(this, "onRepeat"), m !== this._tDur && m || this._tTime !== m || (g && !this._onUpdate && z(this, t, 0, !0), !t && p || !(m === this._tDur && 0 < this._ts || !m && this._ts < 0) || I(this, 1), e || g && !f || !(m || f || l) || (Me(this, m === h ? "onComplete" : "onReverseComplete", !0), !this._prom || m < h && 0 < this.timeScale() || this._prom()))
                }
            } else ! function(t, e, n, r) {
                var i, o, s, a = t.ratio,
                    l = e < 0 || !e && (!t._start && function t(e) {
                        var n = e.parent;
                        return n && n._ts && n._initted && !n._lock && (n.rawTime() < 0 || t(n))
                    }(t) && (t._initted || !Te(t)) || (t._ts < 0 || t._dp._ts < 0) && !Te(t)) ? 0 : 1,
                    c = t._rDelay,
                    u = 0;
                if (c && t._repeat && (u = Ee(0, t._tDur, e), o = Ae(u, c), t._yoyo && 1 & o && (l = 1 - l), o !== Ae(t._tTime, c) && (a = 1 - l, t.vars.repeatRefresh && t._initted && t.invalidate())), l !== a || vt || r || t._zTime === Ut || !e && t._zTime) {
                    if (!t._initted && X(t, e, r, n, u)) return;
                    for (s = t._zTime, t._zTime = e || (n ? Ut : 0), n = n || e && !s, t.ratio = l, t._from && (l = 1 - l), t._time = 0, t._tTime = u, i = t._pt; i;) i.r(l, i.d), i = i._next;
                    e < 0 && z(t, e, 0, !0), t._onUpdate && !n && Me(t, "onUpdate"), u && t._repeat && !n && t.parent && Me(t, "onRepeat"), (e >= t._tDur || e < 0) && t.ratio === l && (l && I(t, 1), n || vt || (Me(t, l ? "onComplete" : "onReverseComplete", !0), t._prom && t._prom()))
                } else t._zTime || (t._zTime = e)
            }(this, t, e, n);
            return this
        }, s.targets = function() {
            return this._targets
        }, s.invalidate = function(e) {
            return e && this.vars.runBackwards || (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(e), t.prototype.invalidate.call(this, e)
        }, s.resetTo = function(t, e, n, r) {
            St || ze.wake(), this._ts || this.play();
            var i = Math.min(this._dur, (this._dp._time - this._start) * this._ts);
            return this._initted || en(this, i),
                function(t, e, n, r, i, o, s) {
                    var a, l, c, u, d = (t._pt && t._ptCache || (t._ptCache = {}))[e];
                    if (!d)
                        for (d = t._ptCache[e] = [], c = t._ptLookup, u = t._targets.length; u--;) {
                            if ((a = c[u][e]) && a.d && a.d._pt)
                                for (a = a.d._pt; a && a.p !== e && a.fp !== e;) a = a._next;
                            if (!a) return Je = 1, t.vars[e] = "+=0", en(t, s), Je = 0, 1;
                            d.push(a)
                        }
                    for (u = d.length; u--;)(a = (l = d[u])._pt || l).s = !r && 0 !== r || i ? a.s + (r || 0) + o * a.c : r, a.c = n - a.s, l.e && (l.e = b(n) + Q(l.e)), l.b && (l.b = a.s + Q(l.b))
                }(this, t, e, n, r, this._ease(i / this._dur), i) ? this.resetTo(t, e, n, r) : (B(this, 0), this.parent || P(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0))
        }, s.kill = function(t, e) {
            if (void 0 === e && (e = "all"), !(t || e && "all" !== e)) return this._lazy = this._pt = 0, this.parent ? st(this) : this;
            if (this.timeline) {
                var n = this.timeline.totalDuration();
                return this.timeline.killTweensOf(t, e, Ze && !0 !== Ze.vars.overwrite)._first || st(this), this.parent && n !== this.timeline.totalDuration() && Y(this, this._dur * this.timeline._tDur / n, 0, 1), this
            }
            var i, o, s, a, l, c, u, d = this._targets,
                f = t ? Ce(t) : d,
                h = this._ptLookup,
                p = this._pt;
            if ((!e || "all" === e) && function(t, e) {
                    for (var n = t.length, r = n === e.length; r && n-- && t[n] === e[n];);
                    return n < 0
                }(d, f)) return "all" === e && (this._pt = 0), st(this);
            for (i = this._op = this._op || [], "all" !== e && (r(e) && (l = {}, y(e, (function(t) {
                    return l[t] = 1
                })), e = l), e = function(t, e) {
                    var n, r, i, o, s = t[0] ? _(t[0]).harness : 0,
                        a = s && s.aliases;
                    if (!a) return e;
                    for (r in n = xe({}, e), a)
                        if (r in n)
                            for (i = (o = a[r].split(",")).length; i--;) n[o[i]] = n[r];
                    return n
                }(d, e)), u = d.length; u--;)
                if (~f.indexOf(d[u]))
                    for (l in o = h[u], "all" === e ? (i[u] = e, a = o, s = {}) : (s = i[u] = i[u] || {}, a = e), a)(c = o && o[l]) && ("kill" in c.d && !0 !== c.d.kill(l) || D(this, c, "_pt"), delete o[l]), "all" !== s && (s[l] = 1);
            return this._initted && !this._pt && p && st(this), this
        }, i.to = function(t, e, n) {
            return new i(t, e, n)
        }, i.from = function(t, e) {
            return $(1, arguments)
        }, i.delayedCall = function(t, e, n, r) {
            return new i(e, 0, {
                immediateRender: !1,
                lazy: !1,
                overwrite: !1,
                delay: t,
                onComplete: e,
                onReverseComplete: e,
                onCompleteParams: n,
                onReverseCompleteParams: n,
                callbackScope: r
            })
        }, i.fromTo = function(t, e, n) {
            return $(2, arguments)
        }, i.set = function(t, e) {
            return e.duration = 0, e.repeatDelay || (e.repeat = 0), new i(t, e)
        }, i.killTweensOf = function(t, e, n) {
            return bt.killTweensOf(t, e, n)
        }, i
    }($e);

    function an(t, e, n) {
        return t.setAttribute(e, n)
    }

    function ln(t, e, n, r) {
        r.mSet(t, e, r.m.call(r.tween, n, r.mt), r)
    }
    S(sn.prototype, {
        _targets: [],
        _lazy: 0,
        _startAt: 0,
        _op: 0,
        _onInit: 0
    }), y("staggerTo,staggerFrom,staggerFromTo", (function(t) {
        sn[t] = function() {
            var e = new Qe,
                n = Se.call(arguments, 0);
            return n.splice("staggerFromTo" === t ? 5 : 4, 0, 0), e[t].apply(e, n)
        }
    }));
    var cn = function(t, e, n) {
            return t[e] = n
        },
        un = function(t, e, n) {
            return t[e](n)
        },
        dn = function(t, e, n, r) {
            return t[e](r.fp, n)
        },
        fn = function(t, e) {
            return i(t[e]) ? un : s(t[e]) && t.setAttribute ? an : cn
        },
        hn = function(t, e) {
            return e.set(e.t, e.p, Math.round(1e6 * (e.s + e.c * t)) / 1e6, e)
        },
        pn = function(t, e) {
            return e.set(e.t, e.p, !!(e.s + e.c * t), e)
        },
        gn = function(t, e) {
            var n = e._pt,
                r = "";
            if (!t && e.b) r = e.b;
            else if (1 === t && e.e) r = e.e;
            else {
                for (; n;) r = n.p + (n.m ? n.m(n.s + n.c * t) : Math.round(1e4 * (n.s + n.c * t)) / 1e4) + r, n = n._next;
                r += e.c
            }
            e.set(e.t, e.p, r, e)
        },
        mn = function(t, e) {
            for (var n = e._pt; n;) n.r(t, n.d), n = n._next
        },
        _n = function(t, e, n, r) {
            for (var i, o = this._pt; o;) i = o._next, o.p === r && o.modifier(t, e, n), o = i
        },
        vn = function(t) {
            for (var e, n, r = this._pt; r;) n = r._next, r.p === t && !r.op || r.op === t ? D(this, r, "_pt") : r.dep || (e = 1), r = n;
            return !e
        },
        yn = function(t) {
            for (var e, n, r, i, o = t._pt; o;) {
                for (e = o._next, n = r; n && n.pr > o.pr;) n = n._next;
                (o._prev = n ? n._prev : i) ? o._prev._next = o: r = o, (o._next = n) ? n._prev = o : i = o, o = e
            }
            t._pt = r
        },
        bn = (wn.prototype.modifier = function(t, e, n) {
            this.mSet = this.mSet || this.set, this.set = ln, this.m = t, this.mt = n, this.tween = e
        }, wn);

    function wn(t, e, n, r, i, o, s, a, l) {
        this.t = e, this.s = r, this.c = i, this.p = n, this.r = o || hn, this.d = s || this, this.set = a || cn, this.pr = l || 0, (this._next = t) && (t._prev = this)
    }

    function xn(t) {
        return (Ln[t] || En).map((function(t) {
            return t()
        }))
    }

    function An() {
        var t = Date.now(),
            e = [];
        2 < t - Sn && (xn("matchMediaInit"), kn.forEach((function(t) {
            var n, r, i, o, s = t.queries,
                a = t.conditions;
            for (r in s)(n = wt.matchMedia(s[r]).matches) && (i = 1), n !== a[r] && (a[r] = n, o = 1);
            o && (t.revert(), i && e.push(t))
        })), xn("matchMediaRevert"), e.forEach((function(t) {
            return t.onMatch(t)
        })), Sn = t, xn("matchMedia"))
    }
    y(we + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", (function(t) {
        return pe[t] = 1
    })), ue.TweenMax = ue.TweenLite = sn, ue.TimelineLite = ue.TimelineMax = Qe, bt = new Qe({
        sortChildren: !1,
        defaults: Vt,
        autoRemoveChildren: !0,
        id: "root",
        smoothChildTiming: !0
    }), Yt.stringFilter = dt;
    var Tn, kn = [],
        Ln = {},
        En = [],
        Sn = 0,
        Cn = ((Tn = On.prototype).add = function(t, e, n) {
            function r() {
                var t, r = yt,
                    s = o.selector;
                return r && r !== o && r.data.push(o), n && (o.selector = K(n)), yt = o, i(t = e.apply(o, arguments)) && o._r.push(t), yt = r, o.selector = s, o.isReverted = !1, t
            }
            i(t) && (n = e, e = t, t = i);
            var o = this;
            return o.last = r, t === i ? r(o) : t ? o[t] = r : r
        }, Tn.ignore = function(t) {
            var e = yt;
            yt = null, t(this), yt = e
        }, Tn.getTweens = function() {
            var t = [];
            return this.data.forEach((function(e) {
                return e instanceof On ? t.push.apply(t, e.getTweens()) : e instanceof sn && !(e.parent && "nested" === e.parent.data) && t.push(e)
            })), t
        }, Tn.clear = function() {
            this._r.length = this.data.length = 0
        }, Tn.kill = function(t, e) {
            var n = this;
            if (t) {
                var r = this.getTweens();
                this.data.forEach((function(t) {
                    "isFlip" === t.data && (t.revert(), t.getChildren(!0, !0, !1).forEach((function(t) {
                        return r.splice(r.indexOf(t), 1)
                    })))
                })), r.map((function(t) {
                    return {
                        g: t.globalTime(0),
                        t: t
                    }
                })).sort((function(t, e) {
                    return e.g - t.g || -1
                })).forEach((function(e) {
                    return e.t.revert(t)
                })), this.data.forEach((function(e) {
                    return !(e instanceof $e) && e.revert && e.revert(t)
                })), this._r.forEach((function(e) {
                    return e(t, n)
                })), this.isReverted = !0
            } else this.data.forEach((function(t) {
                return t.kill && t.kill()
            }));
            if (this.clear(), e) {
                var i = kn.indexOf(this);
                ~i && kn.splice(i, 1)
            }
        }, Tn.revert = function(t) {
            this.kill(t || {})
        }, On);

    function On(t, e) {
        this.selector = e && K(e), this.data = [], this._r = [], this.isReverted = !1, t && this.add(t)
    }
    var Mn, Pn = ((Mn = Dn.prototype).add = function(t, e, n) {
        a(t) || (t = {
            matches: t
        });
        var r, i, o, s = new Cn(0, n || this.scope),
            l = s.conditions = {};
        for (i in this.contexts.push(s), e = s.add("onMatch", e), s.queries = t) "all" === i ? o = 1 : (r = wt.matchMedia(t[i])) && (kn.indexOf(s) < 0 && kn.push(s), (l[i] = r.matches) && (o = 1), r.addListener ? r.addListener(An) : r.addEventListener("change", An));
        return o && e(s), this
    }, Mn.revert = function(t) {
        this.kill(t || {})
    }, Mn.kill = function(t) {
        this.contexts.forEach((function(e) {
            return e.kill(t, !0)
        }))
    }, Dn);

    function Dn(t) {
        this.contexts = [], this.scope = t
    }
    var In = {
        registerPlugin: function() {
            for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
            e.forEach((function(t) {
                return function(t) {
                    var e = (t = !t.name && t.default || t).name,
                        n = i(t),
                        r = e && !n && t.init ? function() {
                            this._props = []
                        } : t,
                        o = {
                            init: g,
                            render: mn,
                            add: tn,
                            kill: vn,
                            modifier: _n,
                            rawVars: 0
                        },
                        s = {
                            targetTest: 0,
                            get: 0,
                            getSetter: fn,
                            aliases: {},
                            register: 0
                        };
                    if (qe(), t !== r) {
                        if (_e[e]) return;
                        S(r, S(O(t, o), s)), xe(r.prototype, xe(o, O(t, s))), _e[r.prop = e] = r, t.targetTest && (be.push(r), pe[e] = 1), e = ("css" === e ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin"
                    }
                    p(e, r), t.register && t.register(qn, r, bn)
                }(t)
            }))
        },
        timeline: function(t) {
            return new Qe(t)
        },
        getTweensOf: function(t, e) {
            return bt.getTweensOf(t, e)
        },
        getProperty: function(t, e, n, i) {
            r(t) && (t = Ce(t)[0]);
            var o = _(t || {}).get,
                s = n ? E : L;
            return "native" === n && (n = ""), t ? e ? s((_e[e] && _e[e].get || o)(t, e, n, i)) : function(e, n, r) {
                return s((_e[e] && _e[e].get || o)(t, e, n, r))
            } : t
        },
        quickSetter: function(t, e, n) {
            if (1 < (t = Ce(t)).length) {
                var r = t.map((function(t) {
                        return qn.quickSetter(t, e, n)
                    })),
                    i = r.length;
                return function(t) {
                    for (var e = i; e--;) r[e](t)
                }
            }
            t = t[0] || {};
            var o = _e[e],
                s = _(t),
                a = s.harness && (s.harness.aliases || {})[e] || e,
                l = o ? function(e) {
                    var r = new o;
                    Et._pt = 0, r.init(t, n ? e + n : e, Et, 0, [t]), r.render(1, r), Et._pt && mn(1, Et)
                } : s.set(t, a);
            return o ? l : function(e) {
                return l(t, a, n ? e + n : e, s, 1)
            }
        },
        quickTo: function(t, e, n) {
            function r(t, n, r) {
                return o.resetTo(e, t, n, r)
            }
            var i, o = qn.to(t, xe(((i = {})[e] = "+=0.1", i.paused = !0, i), n || {}));
            return r.tween = o, r
        },
        isTweening: function(t) {
            return 0 < bt.getTweensOf(t, !0).length
        },
        defaults: function(t) {
            return t && t.ease && (t.ease = He(t.ease, Vt.ease)), C(Vt, t || {})
        },
        config: function(t) {
            return C(Yt, t || {})
        },
        registerEffect: function(t) {
            var e = t.name,
                n = t.effect,
                r = t.plugins,
                i = t.defaults,
                o = t.extendTimeline;
            (r || "").split(",").forEach((function(t) {
                return t && !_e[t] && !ue[t] && h(e + " effect requires " + t + " plugin.")
            })), ve[e] = function(t, e, r) {
                return n(Ce(t), S(e || {}, i), r)
            }, o && (Qe.prototype[e] = function(t, n, r) {
                return this.add(ve[e](t, a(n) ? n : (r = n) && {}, this), r)
            })
        },
        registerEase: function(t, e) {
            Re[t] = He(e)
        },
        parseEase: function(t, e) {
            return arguments.length ? He(t, e) : Re
        },
        getById: function(t) {
            return bt.getById(t)
        },
        exportRoot: function(t, e) {
            void 0 === t && (t = {});
            var n, r, i = new Qe(t);
            for (i.smoothChildTiming = l(t.smoothChildTiming), bt.remove(i), i._dp = 0, i._time = i._tTime = bt._time, n = bt._first; n;) r = n._next, !e && !n._dur && n instanceof sn && n.vars.onComplete === n._targets[0] || H(i, n, n._start - n._delay), n = r;
            return H(bt, i, 0), i
        },
        context: function(t, e) {
            return t ? new Cn(t, e) : yt
        },
        matchMedia: function(t) {
            return new Pn(t)
        },
        matchMediaRefresh: function() {
            return kn.forEach((function(t) {
                var e, n, r = t.conditions;
                for (n in r) r[n] && (r[n] = !1, e = 1);
                e && t.revert()
            })) || An()
        },
        addEventListener: function(t, e) {
            var n = Ln[t] || (Ln[t] = []);
            ~n.indexOf(e) || n.push(e)
        },
        removeEventListener: function(t, e) {
            var n = Ln[t],
                r = n && n.indexOf(e);
            0 <= r && n.splice(r, 1)
        },
        utils: {
            wrap: function t(e, n, r) {
                var i = n - e;
                return ne(e) ? rt(e, t(0, e.length), n) : U(r, (function(t) {
                    return (i + (t - e) % i) % i + e
                }))
            },
            wrapYoyo: function t(e, n, r) {
                var i = n - e,
                    o = 2 * i;
                return ne(e) ? rt(e, t(0, e.length - 1), n) : U(r, (function(t) {
                    return e + (i < (t = (o + (t - e) % o) % o || 0) ? o - t : t)
                }))
            },
            distribute: J,
            random: nt,
            snap: et,
            normalize: function(t, e, n) {
                return Oe(t, e, 0, 1, n)
            },
            getUnit: Q,
            clamp: function(t, e, n) {
                return U(n, (function(n) {
                    return Ee(t, e, n)
                }))
            },
            splitColor: lt,
            toArray: Ce,
            selector: K,
            mapRange: Oe,
            pipe: function() {
                for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
                return function(t) {
                    return e.reduce((function(t, e) {
                        return e(t)
                    }), t)
                }
            },
            unitize: function(t, e) {
                return function(n) {
                    return t(parseFloat(n)) + (e || Q(n))
                }
            },
            interpolate: function t(e, n, i, o) {
                var s = isNaN(e + n) ? 0 : function(t) {
                    return (1 - t) * e + t * n
                };
                if (!s) {
                    var a, l, c, u, d, f = r(e),
                        h = {};
                    if (!0 === i && (o = 1) && (i = null), f) e = {
                        p: e
                    }, n = {
                        p: n
                    };
                    else if (ne(e) && !ne(n)) {
                        for (c = [], u = e.length, d = u - 2, l = 1; l < u; l++) c.push(t(e[l - 1], e[l]));
                        u--, s = function(t) {
                            t *= u;
                            var e = Math.min(d, ~~t);
                            return c[e](t - e)
                        }, i = n
                    } else o || (e = xe(ne(e) ? [] : {}, e));
                    if (!c) {
                        for (a in n) tn.call(h, e, a, "get", n[a]);
                        s = function(t) {
                            return mn(t, h) || (f ? e.p : e)
                        }
                    }
                }
                return U(i, s)
            },
            shuffle: Z
        },
        install: d,
        effects: ve,
        ticker: ze,
        updateRoot: Qe.updateRoot,
        plugins: _e,
        globalTimeline: bt,
        core: {
            PropTween: bn,
            globals: p,
            Tween: sn,
            Timeline: Qe,
            Animation: $e,
            getCache: _,
            _removeLinkedListItem: D,
            reverting: function() {
                return vt
            },
            context: function(t) {
                return t && yt && (yt.data.push(t), t._ctx = yt), yt
            },
            suppressOverwrites: function(t) {
                return _t = t
            }
        }
    };

    function Nn(t, e) {
        for (var n = t._pt; n && n.p !== e && n.op !== e && n.fp !== e;) n = n._next;
        return n
    }

    function zn(t, e) {
        return {
            name: t,
            rawVars: 1,
            init: function(t, n, i) {
                i._onInit = function(t) {
                    var i, o;
                    if (r(n) && (i = {}, y(n, (function(t) {
                            return i[t] = 1
                        })), n = i), e) {
                        for (o in i = {}, n) i[o] = e(n[o]);
                        n = i
                    }! function(t, e) {
                        var n, r, i, o = t._targets;
                        for (n in e)
                            for (r = o.length; r--;)(i = (i = t._ptLookup[r][n]) && i.d) && (i._pt && (i = Nn(i, n)), i && i.modifier && i.modifier(e[n], t, o[r], n))
                    }(t, n)
                }
            }
        }
    }
    y("to,from,fromTo,delayedCall,set,killTweensOf", (function(t) {
        return In[t] = sn[t]
    })), ze.add(Qe.updateRoot), Et = In.to({}, {
        duration: 0
    });
    var qn = In.registerPlugin({
        name: "attr",
        init: function(t, e, n, r, i) {
            var o, s, a;
            for (o in this.tween = n, e) a = t.getAttribute(o) || "", (s = this.add(t, "setAttribute", (a || 0) + "", e[o], r, i, 0, 0, o)).op = o, s.b = a, this._props.push(o)
        },
        render: function(t, e) {
            for (var n = e._pt; n;) vt ? n.set(n.t, n.p, n.b, n) : n.r(t, n.d), n = n._next
        }
    }, {
        name: "endArray",
        init: function(t, e) {
            for (var n = e.length; n--;) this.add(t, n, t[n] || 0, e[n], 0, 0, 0, 0, 0, 1)
        }
    }, zn("roundProps", tt), zn("modifiers"), zn("snap", et)) || In;

    function Rn(t, e) {
        return e.set(e.t, e.p, Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u, e)
    }

    function Fn(t, e) {
        return e.set(e.t, e.p, 1 === t ? e.e : Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u, e)
    }

    function Bn(t, e) {
        return e.set(e.t, e.p, t ? Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u : e.b, e)
    }

    function jn(t, e) {
        var n = e.s + e.c * t;
        e.set(e.t, e.p, ~~(n + (n < 0 ? -.5 : .5)) + e.u, e)
    }

    function Hn(t, e) {
        return e.set(e.t, e.p, t ? e.e : e.b, e)
    }

    function Wn(t, e) {
        return e.set(e.t, e.p, 1 !== t ? e.b : e.e, e)
    }

    function Xn(t, e, n) {
        return t.style[e] = n
    }

    function Yn(t, e, n) {
        return t.style.setProperty(e, n)
    }

    function Vn(t, e, n) {
        return t._gsap[e] = n
    }

    function $n(t, e, n) {
        return t._gsap.scaleX = t._gsap.scaleY = n
    }

    function Un(t, e, n, r, i) {
        var o = t._gsap;
        o.scaleX = o.scaleY = n, o.renderTransform(i, o)
    }

    function Qn(t, e, n, r, i) {
        var o = t._gsap;
        o[e] = n, o.renderTransform(i, o)
    }

    function Gn(t, e) {
        var n = this,
            r = this.target,
            i = r.style;
        if (t in $r) {
            if (this.tfm = this.tfm || {}, "transform" !== t && (~(t = ti[t] || t).indexOf(",") ? t.split(",").forEach((function(t) {
                    return n.tfm[t] = ai(r, t)
                })) : this.tfm[t] = r._gsap.x ? r._gsap[t] : ai(r, t)), 0 <= this.props.indexOf(ei)) return;
            r._gsap.svg && (this.svgo = r.getAttribute("data-svg-origin"), this.props.push(ni, e, "")), t = ei
        }(i || e) && this.props.push(t, e, i[t])
    }

    function Kn(t) {
        t.translate && (t.removeProperty("translate"), t.removeProperty("scale"), t.removeProperty("rotate"))
    }

    function Zn() {
        var t, e, n = this.props,
            r = this.target,
            i = r.style,
            o = r._gsap;
        for (t = 0; t < n.length; t += 3) n[t + 1] ? r[n[t]] = n[t + 2] : n[t + 2] ? i[n[t]] = n[t + 2] : i.removeProperty(n[t].replace(Kr, "-$1").toLowerCase());
        if (this.tfm) {
            for (e in this.tfm) o[e] = this.tfm[e];
            o.svg && (o.renderTransform(), r.setAttribute("data-svg-origin", this.svgo || "")), !(t = Er()) || t.isStart || i[ei] || (Kn(i), o.uncache = 1)
        }
    }

    function Jn(t, e) {
        var n = {
            target: t,
            props: [],
            revert: Zn,
            save: Gn
        };
        return e && e.split(",").forEach((function(t) {
            return n.save(t)
        })), n
    }

    function tr(t, e) {
        var n = xr.createElementNS ? xr.createElementNS((e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : xr.createElement(t);
        return n.style ? n : xr.createElement(t)
    }

    function er(t, e, n) {
        var r = getComputedStyle(t);
        return r[e] || r.getPropertyValue(e.replace(Kr, "-$1").toLowerCase()) || r.getPropertyValue(e) || !n && er(t, ii(e) || e, 1) || ""
    }

    function nr() {
        "undefined" != typeof window && window.document && (wr = window, xr = wr.document, Ar = xr.documentElement, kr = tr("div") || {
            style: {}
        }, tr("div"), ei = ii(ei), ni = ei + "Origin", kr.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", Sr = !!ii("perspective"), Er = qn.core.reverting, Tr = 1)
    }

    function rr(t) {
        var e, n = tr("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
            r = this.parentNode,
            i = this.nextSibling,
            o = this.style.cssText;
        if (Ar.appendChild(n), n.appendChild(this), this.style.display = "block", t) try {
            e = this.getBBox(), this._gsapBBox = this.getBBox, this.getBBox = rr
        } catch (t) {} else this._gsapBBox && (e = this._gsapBBox());
        return r && (i ? r.insertBefore(this, i) : r.appendChild(this)), Ar.removeChild(n), this.style.cssText = o, e
    }

    function ir(t, e) {
        for (var n = e.length; n--;)
            if (t.hasAttribute(e[n])) return t.getAttribute(e[n])
    }

    function or(t) {
        var e;
        try {
            e = t.getBBox()
        } catch (n) {
            e = rr.call(t, !0)
        }
        return e && (e.width || e.height) || t.getBBox === rr || (e = rr.call(t, !0)), !e || e.width || e.x || e.y ? e : {
            x: +ir(t, ["x", "cx", "x1"]) || 0,
            y: +ir(t, ["y", "cy", "y1"]) || 0,
            width: 0,
            height: 0
        }
    }

    function sr(t) {
        return !(!t.getCTM || t.parentNode && !t.ownerSVGElement || !or(t))
    }

    function ar(t, e) {
        if (e) {
            var n = t.style;
            e in $r && e !== ni && (e = ei), n.removeProperty ? ("ms" !== e.substr(0, 2) && "webkit" !== e.substr(0, 6) || (e = "-" + e), n.removeProperty(e.replace(Kr, "-$1").toLowerCase())) : n.removeAttribute(e)
        }
    }

    function lr(t, e, n, r, i, o) {
        var s = new bn(t._pt, e, n, 0, 1, o ? Wn : Hn);
        return (t._pt = s).b = r, s.e = i, t._props.push(n), s
    }

    function cr(t, e, n, r) {
        var i, o, s, a, l = parseFloat(n) || 0,
            c = (n + "").trim().substr((l + "").length) || "px",
            u = kr.style,
            d = Zr.test(e),
            f = "svg" === t.tagName.toLowerCase(),
            h = (f ? "client" : "offset") + (d ? "Width" : "Height"),
            p = "px" === r,
            g = "%" === r;
        return r === c || !l || oi[r] || oi[c] ? l : ("px" === c || p || (l = cr(t, e, n, "px")), a = t.getCTM && sr(t), !g && "%" !== c || !$r[e] && !~e.indexOf("adius") ? (u[d ? "width" : "height"] = 100 + (p ? c : r), o = ~e.indexOf("adius") || "em" === r && t.appendChild && !f ? t : t.parentNode, a && (o = (t.ownerSVGElement || {}).parentNode), o && o !== xr && o.appendChild || (o = xr.body), (s = o._gsap) && g && s.width && d && s.time === ze.time && !s.uncache ? b(l / s.width * 100) : (!g && "%" !== c || si[er(o, "display")] || (u.position = er(t, "position")), o === t && (u.position = "static"), o.appendChild(kr), i = kr[h], o.removeChild(kr), u.position = "absolute", d && g && ((s = _(o)).time = ze.time, s.width = o[h]), b(p ? i * l / 100 : i && l ? 100 / i * l : 0))) : (i = a ? t.getBBox()[d ? "width" : "height"] : t[h], b(g ? l / i * 100 : l / 100 * i)))
    }

    function ur(t, e, n, r) {
        if (!n || "none" === n) {
            var i = ii(e, t, 1),
                o = i && er(t, i, 1);
            o && o !== n ? (e = i, n = o) : "borderColor" === e && (n = er(t, "borderTopColor"))
        }
        var s, a, l, c, u, d, f, h, p, g, m, _ = new bn(this._pt, t.style, e, 0, 1, gn),
            v = 0,
            y = 0;
        if (_.b = n, _.e = r, n += "", "auto" == (r += "") && (t.style[e] = r, r = er(t, e) || r, t.style[e] = n), dt(s = [n, r]), r = s[1], l = (n = s[0]).match(oe) || [], (r.match(oe) || []).length) {
            for (; a = oe.exec(r);) f = a[0], p = r.substring(v, a.index), u ? u = (u + 1) % 5 : "rgba(" !== p.substr(-5) && "hsla(" !== p.substr(-5) || (u = 1), f !== (d = l[y++] || "") && (c = parseFloat(d) || 0, m = d.substr((c + "").length), "=" === f.charAt(1) && (f = x(c, f) + m), h = parseFloat(f), g = f.substr((h + "").length), v = oe.lastIndex - g.length, g || (g = g || Yt.units[e] || m, v === r.length && (r += g, _.e += g)), m !== g && (c = cr(t, e, d, g) || 0), _._pt = {
                _next: _._pt,
                p: p || 1 === y ? p : ",",
                s: c,
                c: h - c,
                m: u && u < 4 || "zIndex" === e ? Math.round : 0
            });
            _.c = v < r.length ? r.substring(v, r.length) : ""
        } else _.r = "display" === e && "none" === r ? Wn : Hn;
        return ae.test(r) && (_.e = 0), this._pt = _
    }

    function dr(t) {
        var e = t.split(" "),
            n = e[0],
            r = e[1] || "50%";
        return "top" !== n && "bottom" !== n && "left" !== r && "right" !== r || (t = n, n = r, r = t), e[0] = li[n] || n, e[1] = li[r] || r, e.join(" ")
    }

    function fr(t, e) {
        if (e.tween && e.tween._time === e.tween._dur) {
            var n, r, i, o = e.t,
                s = o.style,
                a = e.u,
                l = o._gsap;
            if ("all" === a || !0 === a) s.cssText = "", r = 1;
            else
                for (i = (a = a.split(",")).length; - 1 < --i;) n = a[i], $r[n] && (r = 1, n = "transformOrigin" === n ? ni : ei), ar(o, n);
            r && (ar(o, ei), l && (l.svg && o.removeAttribute("transform"), fi(o, 1), l.uncache = 1, Kn(s)))
        }
    }

    function hr(t) {
        return "matrix(1, 0, 0, 1, 0, 0)" === t || "none" === t || !t
    }

    function pr(t) {
        var e = er(t, ei);
        return hr(e) ? ui : e.substr(7).match(ie).map(b)
    }

    function gr(t, e) {
        var n, r, i, o, s = t._gsap || _(t),
            a = t.style,
            l = pr(t);
        return s.svg && t.getAttribute("transform") ? "1,0,0,1,0,0" === (l = [(i = t.transform.baseVal.consolidate().matrix).a, i.b, i.c, i.d, i.e, i.f]).join(",") ? ui : l : (l !== ui || t.offsetParent || t === Ar || s.svg || (i = a.display, a.display = "block", (n = t.parentNode) && t.offsetParent || (o = 1, r = t.nextElementSibling, Ar.appendChild(t)), l = pr(t), i ? a.display = i : ar(t, "display"), o && (r ? n.insertBefore(t, r) : n ? n.appendChild(t) : Ar.removeChild(t))), e && 6 < l.length ? [l[0], l[1], l[4], l[5], l[12], l[13]] : l)
    }

    function mr(t, e, n, r, i, o) {
        var s, a, l, c = t._gsap,
            u = i || gr(t, !0),
            d = c.xOrigin || 0,
            f = c.yOrigin || 0,
            h = c.xOffset || 0,
            p = c.yOffset || 0,
            g = u[0],
            m = u[1],
            _ = u[2],
            v = u[3],
            y = u[4],
            b = u[5],
            w = e.split(" "),
            x = parseFloat(w[0]) || 0,
            A = parseFloat(w[1]) || 0;
        n ? u !== ui && (a = g * v - m * _) && (l = x * (-m / a) + A * (g / a) - (g * b - m * y) / a, x = x * (v / a) + A * (-_ / a) + (_ * b - v * y) / a, A = l) : (x = (s = or(t)).x + (~w[0].indexOf("%") ? x / 100 * s.width : x), A = s.y + (~(w[1] || w[0]).indexOf("%") ? A / 100 * s.height : A)), r || !1 !== r && c.smooth ? (y = x - d, b = A - f, c.xOffset = h + (y * g + b * _) - y, c.yOffset = p + (y * m + b * v) - b) : c.xOffset = c.yOffset = 0, c.xOrigin = x, c.yOrigin = A, c.smooth = !!r, c.origin = e, c.originIsAbsolute = !!n, t.style[ni] = "0px 0px", o && (lr(o, c, "xOrigin", d, x), lr(o, c, "yOrigin", f, A), lr(o, c, "xOffset", h, c.xOffset), lr(o, c, "yOffset", p, c.yOffset)), t.setAttribute("data-svg-origin", x + " " + A)
    }

    function _r(t, e, n) {
        var r = Q(e);
        return b(parseFloat(e) + parseFloat(cr(t, "x", n + "px", r))) + r
    }

    function vr(t, e, n, i, o) {
        var s, a, l = 360,
            c = r(o),
            u = parseFloat(o) * (c && ~o.indexOf("rad") ? Ur : 1) - i,
            d = i + u + "deg";
        return c && ("short" === (s = o.split("_")[1]) && (u %= l) != u % 180 && (u += u < 0 ? l : -l), "cw" === s && u < 0 ? u = (u + 36e9) % l - ~~(u / l) * l : "ccw" === s && 0 < u && (u = (u - 36e9) % l - ~~(u / l) * l)), t._pt = a = new bn(t._pt, e, n, i, u, Fn), a.e = d, a.u = "deg", t._props.push(n), a
    }

    function yr(t, e) {
        for (var n in e) t[n] = e[n];
        return t
    }

    function br(t, e, n) {
        var r, i, o, s, a, l, c, u = yr({}, n._gsap),
            d = n.style;
        for (i in u.svg ? (o = n.getAttribute("transform"), n.setAttribute("transform", ""), d[ei] = e, r = fi(n, 1), ar(n, ei), n.setAttribute("transform", o)) : (o = getComputedStyle(n)[ei], d[ei] = e, r = fi(n, 1), d[ei] = o), $r)(o = u[i]) !== (s = r[i]) && "perspective,force3D,transformOrigin,svgOrigin".indexOf(i) < 0 && (a = Q(o) !== (c = Q(s)) ? cr(n, i, o, c) : parseFloat(o), l = parseFloat(s), t._pt = new bn(t._pt, r, i, a, l - a, Rn), t._pt.u = c || 0, t._props.push(i));
        yr(r, u)
    }
    sn.version = Qe.version = qn.version = "3.11.3", kt = 1, c() && qe();
    var wr, xr, Ar, Tr, kr, Lr, Er, Sr, Cr = Re.Power0,
        Or = Re.Power1,
        Mr = Re.Power2,
        Pr = Re.Power3,
        Dr = Re.Power4,
        Ir = Re.Linear,
        Nr = Re.Quad,
        zr = Re.Cubic,
        qr = Re.Quart,
        Rr = Re.Quint,
        Fr = Re.Strong,
        Br = Re.Elastic,
        jr = Re.Back,
        Hr = Re.SteppedEase,
        Wr = Re.Bounce,
        Xr = Re.Sine,
        Yr = Re.Expo,
        Vr = Re.Circ,
        $r = {},
        Ur = 180 / Math.PI,
        Qr = Math.PI / 180,
        Gr = Math.atan2,
        Kr = /([A-Z])/g,
        Zr = /(left|right|width|margin|padding|x)/i,
        Jr = /[\s,\(]\S/,
        ti = {
            autoAlpha: "opacity,visibility",
            scale: "scaleX,scaleY",
            alpha: "opacity"
        },
        ei = "transform",
        ni = ei + "Origin",
        ri = "O,Moz,ms,Ms,Webkit".split(","),
        ii = function(t, e, n) {
            var r = (e || kr).style,
                i = 5;
            if (t in r && !n) return t;
            for (t = t.charAt(0).toUpperCase() + t.substr(1); i-- && !(ri[i] + t in r););
            return i < 0 ? null : (3 === i ? "ms" : 0 <= i ? ri[i] : "") + t
        },
        oi = {
            deg: 1,
            rad: 1,
            turn: 1
        },
        si = {
            grid: 1,
            flex: 1
        },
        ai = function(t, e, n, r) {
            var i;
            return Tr || nr(), e in ti && "transform" !== e && ~(e = ti[e]).indexOf(",") && (e = e.split(",")[0]), $r[e] && "transform" !== e ? (i = fi(t, r), i = "transformOrigin" !== e ? i[e] : i.svg ? i.origin : hi(er(t, ni)) + " " + i.zOrigin + "px") : (i = t.style[e]) && "auto" !== i && !r && !~(i + "").indexOf("calc(") || (i = ci[e] && ci[e](t, e, n) || er(t, e) || v(t, e) || ("opacity" === e ? 1 : 0)), n && !~(i + "").trim().indexOf(" ") ? cr(t, e, i, n) + n : i
        },
        li = {
            top: "0%",
            bottom: "100%",
            left: "0%",
            right: "100%",
            center: "50%"
        },
        ci = {
            clearProps: function(t, e, n, r, i) {
                if ("isFromStart" !== i.data) {
                    var o = t._pt = new bn(t._pt, e, n, 0, 0, fr);
                    return o.u = r, o.pr = -10, o.tween = i, t._props.push(n), 1
                }
            }
        },
        ui = [1, 0, 0, 1, 0, 0],
        di = {},
        fi = function(t, e) {
            var n = t._gsap || new Ve(t);
            if ("x" in n && !e && !n.uncache) return n;
            var r, i, o, s, a, l, c, u, d, f, h, p, g, m, _, v, y, w, x, A, T, k, L, E, S, C, O, M, P, D, I, N, z = t.style,
                q = n.scaleX < 0,
                R = "deg",
                F = getComputedStyle(t),
                B = er(t, ni) || "0";
            return r = i = o = l = c = u = d = f = h = 0, s = a = 1, n.svg = !(!t.getCTM || !sr(t)), F.translate && ("none" === F.translate && "none" === F.scale && "none" === F.rotate || (z[ei] = ("none" !== F.translate ? "translate3d(" + (F.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + ("none" !== F.rotate ? "rotate(" + F.rotate + ") " : "") + ("none" !== F.scale ? "scale(" + F.scale.split(" ").join(",") + ") " : "") + ("none" !== F[ei] ? F[ei] : "")), z.scale = z.rotate = z.translate = "none"), m = gr(t, n.svg), n.svg && (E = n.uncache ? (S = t.getBBox(), B = n.xOrigin - S.x + "px " + (n.yOrigin - S.y) + "px", "") : !e && t.getAttribute("data-svg-origin"), mr(t, E || B, !!E || n.originIsAbsolute, !1 !== n.smooth, m)), p = n.xOrigin || 0, g = n.yOrigin || 0, m !== ui && (w = m[0], x = m[1], A = m[2], T = m[3], r = k = m[4], i = L = m[5], 6 === m.length ? (s = Math.sqrt(w * w + x * x), a = Math.sqrt(T * T + A * A), l = w || x ? Gr(x, w) * Ur : 0, (d = A || T ? Gr(A, T) * Ur + l : 0) && (a *= Math.abs(Math.cos(d * Qr))), n.svg && (r -= p - (p * w + g * A), i -= g - (p * x + g * T))) : (N = m[6], D = m[7], O = m[8], M = m[9], P = m[10], I = m[11], r = m[12], i = m[13], o = m[14], c = (_ = Gr(N, P)) * Ur, _ && (E = k * (v = Math.cos(-_)) + O * (y = Math.sin(-_)), S = L * v + M * y, C = N * v + P * y, O = k * -y + O * v, M = L * -y + M * v, P = N * -y + P * v, I = D * -y + I * v, k = E, L = S, N = C), u = (_ = Gr(-A, P)) * Ur, _ && (v = Math.cos(-_), I = T * (y = Math.sin(-_)) + I * v, w = E = w * v - O * y, x = S = x * v - M * y, A = C = A * v - P * y), l = (_ = Gr(x, w)) * Ur, _ && (E = w * (v = Math.cos(_)) + x * (y = Math.sin(_)), S = k * v + L * y, x = x * v - w * y, L = L * v - k * y, w = E, k = S), c && 359.9 < Math.abs(c) + Math.abs(l) && (c = l = 0, u = 180 - u), s = b(Math.sqrt(w * w + x * x + A * A)), a = b(Math.sqrt(L * L + N * N)), _ = Gr(k, L), d = 2e-4 < Math.abs(_) ? _ * Ur : 0, h = I ? 1 / (I < 0 ? -I : I) : 0), n.svg && (E = t.getAttribute("transform"), n.forceCSS = t.setAttribute("transform", "") || !hr(er(t, ei)), E && t.setAttribute("transform", E))), 90 < Math.abs(d) && Math.abs(d) < 270 && (q ? (s *= -1, d += l <= 0 ? 180 : -180, l += l <= 0 ? 180 : -180) : (a *= -1, d += d <= 0 ? 180 : -180)), e = e || n.uncache, n.x = r - ((n.xPercent = r && (!e && n.xPercent || (Math.round(t.offsetWidth / 2) === Math.round(-r) ? -50 : 0))) ? t.offsetWidth * n.xPercent / 100 : 0) + "px", n.y = i - ((n.yPercent = i && (!e && n.yPercent || (Math.round(t.offsetHeight / 2) === Math.round(-i) ? -50 : 0))) ? t.offsetHeight * n.yPercent / 100 : 0) + "px", n.z = o + "px", n.scaleX = b(s), n.scaleY = b(a), n.rotation = b(l) + R, n.rotationX = b(c) + R, n.rotationY = b(u) + R, n.skewX = d + R, n.skewY = f + R, n.transformPerspective = h + "px", (n.zOrigin = parseFloat(B.split(" ")[2]) || 0) && (z[ni] = hi(B)), n.xOffset = n.yOffset = 0, n.force3D = Yt.force3D, n.renderTransform = n.svg ? yi : Sr ? vi : pi, n.uncache = 0, n
        },
        hi = function(t) {
            return (t = t.split(" "))[0] + " " + t[1]
        },
        pi = function(t, e) {
            e.z = "0px", e.rotationY = e.rotationX = "0deg", e.force3D = 0, vi(t, e)
        },
        gi = "0deg",
        mi = "0px",
        _i = ") ",
        vi = function(t, e) {
            var n = e || this,
                r = n.xPercent,
                i = n.yPercent,
                o = n.x,
                s = n.y,
                a = n.z,
                l = n.rotation,
                c = n.rotationY,
                u = n.rotationX,
                d = n.skewX,
                f = n.skewY,
                h = n.scaleX,
                p = n.scaleY,
                g = n.transformPerspective,
                m = n.force3D,
                _ = n.target,
                v = n.zOrigin,
                y = "",
                b = "auto" === m && t && 1 !== t || !0 === m;
            if (v && (u !== gi || c !== gi)) {
                var w, x = parseFloat(c) * Qr,
                    A = Math.sin(x),
                    T = Math.cos(x);
                x = parseFloat(u) * Qr, o = _r(_, o, A * (w = Math.cos(x)) * -v), s = _r(_, s, -Math.sin(x) * -v), a = _r(_, a, T * w * -v + v)
            }
            g !== mi && (y += "perspective(" + g + _i), (r || i) && (y += "translate(" + r + "%, " + i + "%) "), !b && o === mi && s === mi && a === mi || (y += a !== mi || b ? "translate3d(" + o + ", " + s + ", " + a + ") " : "translate(" + o + ", " + s + _i), l !== gi && (y += "rotate(" + l + _i), c !== gi && (y += "rotateY(" + c + _i), u !== gi && (y += "rotateX(" + u + _i), d === gi && f === gi || (y += "skew(" + d + ", " + f + _i), 1 === h && 1 === p || (y += "scale(" + h + ", " + p + _i), _.style[ei] = y || "translate(0, 0)"
        },
        yi = function(t, e) {
            var n, r, i, o, s, a = e || this,
                l = a.xPercent,
                c = a.yPercent,
                u = a.x,
                d = a.y,
                f = a.rotation,
                h = a.skewX,
                p = a.skewY,
                g = a.scaleX,
                m = a.scaleY,
                _ = a.target,
                v = a.xOrigin,
                y = a.yOrigin,
                w = a.xOffset,
                x = a.yOffset,
                A = a.forceCSS,
                T = parseFloat(u),
                k = parseFloat(d);
            f = parseFloat(f), h = parseFloat(h), (p = parseFloat(p)) && (h += p = parseFloat(p), f += p), f || h ? (f *= Qr, h *= Qr, n = Math.cos(f) * g, r = Math.sin(f) * g, i = Math.sin(f - h) * -m, o = Math.cos(f - h) * m, h && (p *= Qr, s = Math.tan(h - p), i *= s = Math.sqrt(1 + s * s), o *= s, p && (s = Math.tan(p), n *= s = Math.sqrt(1 + s * s), r *= s)), n = b(n), r = b(r), i = b(i), o = b(o)) : (n = g, o = m, r = i = 0), (T && !~(u + "").indexOf("px") || k && !~(d + "").indexOf("px")) && (T = cr(_, "x", u, "px"), k = cr(_, "y", d, "px")), (v || y || w || x) && (T = b(T + v - (v * n + y * i) + w), k = b(k + y - (v * r + y * o) + x)), (l || c) && (T = b(T + l / 100 * (s = _.getBBox()).width), k = b(k + c / 100 * s.height)), s = "matrix(" + n + "," + r + "," + i + "," + o + "," + T + "," + k + ")", _.setAttribute("transform", s), A && (_.style[ei] = s)
        };
    y("padding,margin,Width,Radius", (function(t, e) {
        var n = "Right",
            r = "Bottom",
            i = "Left",
            o = (e < 3 ? ["Top", n, r, i] : ["Top" + i, "Top" + n, r + n, r + i]).map((function(n) {
                return e < 2 ? t + n : "border" + n + t
            }));
        ci[1 < e ? "border" + t : t] = function(t, e, n, r, i) {
            var s, a;
            if (arguments.length < 4) return s = o.map((function(e) {
                return ai(t, e, n)
            })), 5 === (a = s.join(" ")).split(s[0]).length ? s[0] : a;
            s = (r + "").split(" "), a = {}, o.forEach((function(t, e) {
                return a[t] = s[e] = s[e] || s[(e - 1) / 2 | 0]
            })), t.init(e, a, i)
        }
    }));
    var bi, wi, xi = {
        name: "css",
        register: nr,
        targetTest: function(t) {
            return t.style && t.nodeType
        },
        init: function(t, e, n, i, o) {
            var s, a, l, c, u, d, h, p, g, m, _, v, y, b, w, A, T = this._props,
                k = t.style,
                L = n.vars.startAt;
            for (h in Tr || nr(), this.styles = this.styles || Jn(t), A = this.styles.props, this.tween = n, e)
                if ("autoRound" !== h && (a = e[h], !_e[h] || !Ge(h, e, n, i, t, o)))
                    if (u = typeof a, d = ci[h], "function" === u && (u = typeof(a = a.call(n, i, t, o))), "string" === u && ~a.indexOf("random(") && (a = it(a)), d) d(this, t, h, a, n) && (w = 1);
                    else if ("--" === h.substr(0, 2)) s = (getComputedStyle(t).getPropertyValue(h) + "").trim(), a += "", Ie.lastIndex = 0, Ie.test(s) || (p = Q(s), g = Q(a)), g ? p !== g && (s = cr(t, h, s, g) + g) : p && (a += p), this.add(k, "setProperty", s, a, i, o, 0, 0, h), T.push(h), A.push(h, 0, k[h]);
            else if ("undefined" !== u) {
                if (L && h in L ? (r(s = "function" == typeof L[h] ? L[h].call(n, i, t, o) : L[h]) && ~s.indexOf("random(") && (s = it(s)), Q(s + "") || (s += Yt.units[h] || Q(ai(t, h)) || ""), "=" === (s + "").charAt(1) && (s = ai(t, h))) : s = ai(t, h), c = parseFloat(s), (m = "string" === u && "=" === a.charAt(1) && a.substr(0, 2)) && (a = a.substr(2)), l = parseFloat(a), h in ti && ("autoAlpha" === h && (1 === c && "hidden" === ai(t, "visibility") && l && (c = 0), A.push("visibility", 0, k.visibility), lr(this, k, "visibility", c ? "inherit" : "hidden", l ? "inherit" : "hidden", !l)), "scale" !== h && "transform" !== h && ~(h = ti[h]).indexOf(",") && (h = h.split(",")[0])), _ = h in $r)
                    if (this.styles.save(h), v || ((y = t._gsap).renderTransform && !e.parseTransform || fi(t, e.parseTransform), b = !1 !== e.smoothOrigin && y.smooth, (v = this._pt = new bn(this._pt, k, ei, 0, 1, y.renderTransform, y, 0, -1)).dep = 1), "scale" === h) this._pt = new bn(this._pt, y, "scaleY", c, (m ? x(c, m + l) : l) - c || 0, Rn), this._pt.u = 0, T.push("scaleY", h), h += "X";
                    else {
                        if ("transformOrigin" === h) {
                            A.push(ni, 0, k[ni]), a = dr(a), y.svg ? mr(t, a, 0, b, 0, this) : ((g = parseFloat(a.split(" ")[2]) || 0) !== y.zOrigin && lr(this, y, "zOrigin", y.zOrigin, g), lr(this, k, h, hi(s), hi(a)));
                            continue
                        }
                        if ("svgOrigin" === h) {
                            mr(t, a, 1, b, 0, this);
                            continue
                        }
                        if (h in di) {
                            vr(this, y, h, c, m ? x(c, m + a) : a);
                            continue
                        }
                        if ("smoothOrigin" === h) {
                            lr(this, y, "smooth", y.smooth, a);
                            continue
                        }
                        if ("force3D" === h) {
                            y[h] = a;
                            continue
                        }
                        if ("transform" === h) {
                            br(this, a, t);
                            continue
                        }
                    }
                else h in k || (h = ii(h) || h);
                if (_ || (l || 0 === l) && (c || 0 === c) && !Jr.test(a) && h in k) l = l || 0, (p = (s + "").substr((c + "").length)) !== (g = Q(a) || (h in Yt.units ? Yt.units[h] : p)) && (c = cr(t, h, s, g)), this._pt = new bn(this._pt, _ ? y : k, h, c, (m ? x(c, m + l) : l) - c, _ || "px" !== g && "zIndex" !== h || !1 === e.autoRound ? Rn : jn), this._pt.u = g || 0, p !== g && "%" !== g && (this._pt.b = s, this._pt.r = Bn);
                else if (h in k) ur.call(this, t, h, s, m ? m + a : a);
                else {
                    if (!(h in t)) {
                        f(h, a);
                        continue
                    }
                    this.add(t, h, s || t[h], m ? m + a : a, i, o)
                }
                _ || (h in k ? A.push(h, 0, k[h]) : A.push(h, 1, s || t[h])), T.push(h)
            }
            w && yn(this)
        },
        render: function(t, e) {
            if (e.tween._time || !Er())
                for (var n = e._pt; n;) n.r(t, n.d), n = n._next;
            else e.styles.revert()
        },
        get: ai,
        aliases: ti,
        getSetter: function(t, e, n) {
            var r = ti[e];
            return r && r.indexOf(",") < 0 && (e = r), e in $r && e !== ni && (t._gsap.x || ai(t, "x")) ? n && Lr === n ? "scale" === e ? $n : Vn : (Lr = n || {}) && ("scale" === e ? Un : Qn) : t.style && !s(t.style[e]) ? Xn : ~e.indexOf("-") ? Yn : fn(t, e)
        },
        core: {
            _removeProperty: ar,
            _getMatrix: gr
        }
    };
    qn.utils.checkPrefix = ii, qn.core.getStyleSaver = Jn, wi = y("x,y,z,scale,scaleX,scaleY,xPercent,yPercent" + "," + (bi = "rotation,rotationX,rotationY,skewX,skewY") + ",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", (function(t) {
        $r[t] = 1
    })), y(bi, (function(t) {
        Yt.units[t] = "deg", di[t] = 1
    })), ti[wi[13]] = "x,y,z,scale,scaleX,scaleY,xPercent,yPercent," + bi, y("0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY", (function(t) {
        var e = t.split(":");
        ti[e[1]] = wi[e[0]]
    })), y("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", (function(t) {
        Yt.units[t] = "px"
    })), qn.registerPlugin(xi);
    var Ai = qn.registerPlugin(xi) || qn,
        Ti = Ai.core.Tween;
    t.Back = jr, t.Bounce = Wr, t.CSSPlugin = xi, t.Circ = Vr, t.Cubic = zr, t.Elastic = Br, t.Expo = Yr, t.Linear = Ir, t.Power0 = Cr, t.Power1 = Or, t.Power2 = Mr, t.Power3 = Pr, t.Power4 = Dr, t.Quad = Nr, t.Quart = qr, t.Quint = Rr, t.Sine = Xr, t.SteppedEase = Hr, t.Strong = Fr, t.TimelineLite = Qe, t.TimelineMax = Qe, t.TweenLite = sn, t.TweenMax = Ti, t.default = Ai, t.gsap = Ai, "undefined" == typeof window || window !== t ? Object.defineProperty(t, "__esModule", {
        value: !0
    }) : delete t.default
})),
function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e((t = t || self).window = t.window || {})
}(this, (function(t) {
    "use strict";

    function e(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
        }
    }

    function n() {
        return m || "undefined" != typeof window && (m = window.gsap) && m.registerPlugin && m
    }

    function r(t, e) {
        return ~M.indexOf(t) && M[M.indexOf(t) + 1][e]
    }

    function i(t) {
        return !!~k.indexOf(t)
    }

    function o(t, e, n, r, i) {
        return t.addEventListener(e, n, {
            passive: !r,
            capture: !!i
        })
    }

    function s(t, e, n, r) {
        return t.removeEventListener(e, n, !!r)
    }

    function a() {
        return L && L.isPressed || O.cache++
    }

    function l(t, e) {
        function n(r) {
            if (r || 0 === r) {
                S && (v.history.scrollRestoration = "manual");
                var i = L && L.isPressed;
                r = n.v = Math.round(r) || (L && L.iOS ? 1 : 0), t(r), n.cacheID = O.cache, i && D("ss", r)
            } else(e || O.cache !== n.cacheID || D("ref")) && (n.cacheID = O.cache, n.v = t());
            return n.v + n.offset
        }
        return n.offset = 0, t && n
    }

    function c(t) {
        return m.utils.toArray(t)[0] || ("string" == typeof t && !1 !== m.config().nullTargetWarn ? console.warn("Element not found:", t) : null)
    }

    function u(t, e) {
        var n = e.s,
            o = e.sc;
        i(t) && (t = y.scrollingElement || b);
        var s = O.indexOf(t),
            c = o === q.sc ? 1 : 2;
        ~s || (s = O.push(t) - 1), O[s + c] || t.addEventListener("scroll", a);
        var u = O[s + c],
            d = u || (O[s + c] = l(r(t, n), !0) || (i(t) ? o : l((function(e) {
                return arguments.length ? t[n] = e : t[n]
            }))));
        return d.target = t, u || (d.smooth = "smooth" === m.getProperty(t, "scrollBehavior")), d
    }

    function d(t, e, n) {
        function r(t, e) {
            var r = P();
            e || l < r - s ? (o = i, i = t, a = s, s = r) : n ? i += t : i = o + (t - o) / (r - a) * (s - a)
        }
        var i = t,
            o = t,
            s = P(),
            a = s,
            l = e || 50,
            c = Math.max(500, 3 * l);
        return {
            update: r,
            reset: function() {
                o = i = n ? 0 : i, a = s = 0
            },
            getVelocity: function(t) {
                var e = a,
                    l = o,
                    u = P();
                return !t && 0 !== t || t === i || r(t), s === a || c < u - a ? 0 : (i + (n ? l : -l)) / ((n ? u : s) - e) * 1e3
            }
        }
    }

    function f(t, e) {
        return e && !t._gsapAllow && t.preventDefault(), t.changedTouches ? t.changedTouches[0] : t
    }

    function h(t) {
        var e = Math.max.apply(Math, t),
            n = Math.min.apply(Math, t);
        return Math.abs(e) >= Math.abs(n) ? e : n
    }

    function p() {
        (T = m.core.globals().ScrollTrigger) && T.core && function() {
            var t = T.core,
                e = t.bridge || {},
                n = t._scrollers,
                r = t._proxies;
            n.push.apply(n, O), r.push.apply(r, M), O = n, M = r, D = function(t, n) {
                return e[t](n)
            }
        }()
    }

    function g(t) {
        return (m = t || n()) && "undefined" != typeof document && document.body && (v = window, b = (y = document).documentElement, w = y.body, k = [v, y, b, w], m.utils.clamp, A = "onpointerenter" in w ? "pointer" : "mouse", x = R.isTouch = v.matchMedia && v.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in v || 0 < navigator.maxTouchPoints || 0 < navigator.msMaxTouchPoints ? 2 : 0, E = R.eventTypes = ("ontouchstart" in b ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in b ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout((function() {
            return S = 0
        }), 500), p(), _ = 1), _
    }
    var m, _, v, y, b, w, x, A, T, k, L, E, S = 1,
        C = [],
        O = [],
        M = [],
        P = Date.now,
        D = function(t, e) {
            return e
        },
        I = "scrollLeft",
        N = "scrollTop",
        z = {
            s: I,
            p: "left",
            p2: "Left",
            os: "right",
            os2: "Right",
            d: "width",
            d2: "Width",
            a: "x",
            sc: l((function(t) {
                return arguments.length ? v.scrollTo(t, q.sc()) : v.pageXOffset || y[I] || b[I] || w[I] || 0
            }))
        },
        q = {
            s: N,
            p: "top",
            p2: "Top",
            os: "bottom",
            os2: "Bottom",
            d: "height",
            d2: "Height",
            a: "y",
            op: z,
            sc: l((function(t) {
                return arguments.length ? v.scrollTo(z.sc(), t) : v.pageYOffset || y[N] || b[N] || w[N] || 0
            }))
        };
    z.op = q, O.cache = 0;
    var R = (F.prototype.init = function(t) {
        _ || g(m) || console.warn("Please gsap.registerPlugin(Observer)"), T || p();
        var e = t.tolerance,
            n = t.dragMinimum,
            r = t.type,
            l = t.target,
            k = t.lineHeight,
            S = t.debounce,
            O = t.preventDefault,
            M = t.onStop,
            D = t.onStopDelay,
            I = t.ignore,
            N = t.wheelSpeed,
            R = t.event,
            F = t.onDragStart,
            B = t.onDragEnd,
            j = t.onDrag,
            H = t.onPress,
            W = t.onRelease,
            X = t.onRight,
            Y = t.onLeft,
            V = t.onUp,
            $ = t.onDown,
            U = t.onChangeX,
            Q = t.onChangeY,
            G = t.onChange,
            K = t.onToggleX,
            Z = t.onToggleY,
            J = t.onHover,
            tt = t.onHoverEnd,
            et = t.onMove,
            nt = t.ignoreCheck,
            rt = t.isNormalizer,
            it = t.onGestureStart,
            ot = t.onGestureEnd,
            st = t.onWheel,
            at = t.onEnable,
            lt = t.onDisable,
            ct = t.onClick,
            ut = t.scrollSpeed,
            dt = t.capture,
            ft = t.allowClicks,
            ht = t.lockAxis,
            pt = t.onLockAxis;

        function gt() {
            return Qt = P()
        }

        function mt(t, e) {
            return (qt.event = t) && I && ~I.indexOf(t.target) || e && Xt && "touch" !== t.pointerType || nt && nt(t, e)
        }

        function _t() {
            var t = qt.deltaX = h($t),
                n = qt.deltaY = h(Ut),
                r = Math.abs(t) >= e,
                i = Math.abs(n) >= e;
            G && (r || i) && G(qt, t, n, $t, Ut), r && (X && 0 < qt.deltaX && X(qt), Y && qt.deltaX < 0 && Y(qt), U && U(qt), K && qt.deltaX < 0 != Rt < 0 && K(qt), Rt = qt.deltaX, $t[0] = $t[1] = $t[2] = 0), i && ($ && 0 < qt.deltaY && $(qt), V && qt.deltaY < 0 && V(qt), Q && Q(qt), Z && qt.deltaY < 0 != Ft < 0 && Z(qt), Ft = qt.deltaY, Ut[0] = Ut[1] = Ut[2] = 0), (Dt || Pt) && (et && et(qt), Pt && (j(qt), Pt = !1), Dt = !1), Nt && !(Nt = !1) && pt && pt(qt), It && (st(qt), It = !1), Ot = 0
        }

        function vt(t, e, n) {
            $t[n] += t, Ut[n] += e, qt._vx.update(t), qt._vy.update(e), S ? Ot = Ot || requestAnimationFrame(_t) : _t()
        }

        function yt(t, e) {
            ht && !zt && (qt.axis = zt = Math.abs(t) > Math.abs(e) ? "x" : "y", Nt = !0), "y" !== zt && ($t[2] += t, qt._vx.update(t, !0)), "x" !== zt && (Ut[2] += e, qt._vy.update(e, !0)), S ? Ot = Ot || requestAnimationFrame(_t) : _t()
        }

        function bt(t) {
            if (!mt(t, 1)) {
                var e = (t = f(t, O)).clientX,
                    r = t.clientY,
                    i = e - qt.x,
                    o = r - qt.y,
                    s = qt.isDragging;
                qt.x = e, qt.y = r, (s || Math.abs(qt.startX - e) >= n || Math.abs(qt.startY - r) >= n) && (j && (Pt = !0), s || (qt.isDragging = !0), yt(i, o), s || F && F(qt))
            }
        }

        function wt(t) {
            if (!mt(t, 1)) {
                s(rt ? l : Vt, E[1], bt, !0);
                var e = qt.isDragging && (3 < Math.abs(qt.x - qt.startX) || 3 < Math.abs(qt.y - qt.startY)),
                    n = f(t);
                e || (qt._vx.reset(), qt._vy.reset(), O && ft && m.delayedCall(.08, (function() {
                    if (300 < P() - Qt && !t.defaultPrevented)
                        if (t.target.click) t.target.click();
                        else if (Vt.createEvent) {
                        var e = Vt.createEvent("MouseEvents");
                        e.initMouseEvent("click", !0, !0, v, 1, n.screenX, n.screenY, n.clientX, n.clientY, !1, !1, !1, !1, 0, null), t.target.dispatchEvent(e)
                    }
                }))), qt.isDragging = qt.isGesturing = qt.isPressed = !1, M && !rt && Mt.restart(!0), B && e && B(qt), W && W(qt, e)
            }
        }

        function xt(t) {
            return t.touches && 1 < t.touches.length && (qt.isGesturing = !0) && it(t, qt.isDragging)
        }

        function At() {
            return (qt.isGesturing = !1) || ot(qt)
        }

        function Tt(t) {
            if (!mt(t)) {
                var e = Bt(),
                    n = jt();
                vt((e - Ht) * ut, (n - Wt) * ut, 1), Ht = e, Wt = n, M && Mt.restart(!0)
            }
        }

        function kt(t) {
            if (!mt(t)) {
                t = f(t, O), st && (It = !0);
                var e = (1 === t.deltaMode ? k : 2 === t.deltaMode ? v.innerHeight : 1) * N;
                vt(t.deltaX * e, t.deltaY * e, 0), M && !rt && Mt.restart(!0)
            }
        }

        function Lt(t) {
            if (!mt(t)) {
                var e = t.clientX,
                    n = t.clientY,
                    r = e - qt.x,
                    i = n - qt.y;
                qt.x = e, qt.y = n, Dt = !0, (r || i) && yt(r, i)
            }
        }

        function Et(t) {
            qt.event = t, J(qt)
        }

        function St(t) {
            qt.event = t, tt(qt)
        }

        function Ct(t) {
            return mt(t) || f(t, O) && ct(qt)
        }
        this.target = l = c(l) || b, this.vars = t, I = I && m.utils.toArray(I), e = e || 1e-9, n = n || 0, N = N || 1, ut = ut || 1, r = r || "wheel,touch,pointer", S = !1 !== S, k = k || parseFloat(v.getComputedStyle(w).lineHeight) || 22;
        var Ot, Mt, Pt, Dt, It, Nt, zt, qt = this,
            Rt = 0,
            Ft = 0,
            Bt = u(l, z),
            jt = u(l, q),
            Ht = Bt(),
            Wt = jt(),
            Xt = ~r.indexOf("touch") && !~r.indexOf("pointer") && "pointerdown" === E[0],
            Yt = i(l),
            Vt = l.ownerDocument || y,
            $t = [0, 0, 0],
            Ut = [0, 0, 0],
            Qt = 0,
            Gt = qt.onPress = function(t) {
                mt(t, 1) || (qt.axis = zt = null, Mt.pause(), qt.isPressed = !0, t = f(t), Rt = Ft = 0, qt.startX = qt.x = t.clientX, qt.startY = qt.y = t.clientY, qt._vx.reset(), qt._vy.reset(), o(rt ? l : Vt, E[1], bt, O, !0), qt.deltaX = qt.deltaY = 0, H && H(qt))
            };
        Mt = qt._dc = m.delayedCall(D || .25, (function() {
            qt._vx.reset(), qt._vy.reset(), Mt.pause(), M && M(qt)
        })).pause(), qt.deltaX = qt.deltaY = 0, qt._vx = d(0, 50, !0), qt._vy = d(0, 50, !0), qt.scrollX = Bt, qt.scrollY = jt, qt.isDragging = qt.isGesturing = qt.isPressed = !1, qt.enable = function(t) {
            return qt.isEnabled || (o(Yt ? Vt : l, "scroll", a), 0 <= r.indexOf("scroll") && o(Yt ? Vt : l, "scroll", Tt, O, dt), 0 <= r.indexOf("wheel") && o(l, "wheel", kt, O, dt), (0 <= r.indexOf("touch") && x || 0 <= r.indexOf("pointer")) && (o(l, E[0], Gt, O, dt), o(Vt, E[2], wt), o(Vt, E[3], wt), ft && o(l, "click", gt, !1, !0), ct && o(l, "click", Ct), it && o(Vt, "gesturestart", xt), ot && o(Vt, "gestureend", At), J && o(l, A + "enter", Et), tt && o(l, A + "leave", St), et && o(l, A + "move", Lt)), qt.isEnabled = !0, t && t.type && Gt(t), at && at(qt)), qt
        }, qt.disable = function() {
            qt.isEnabled && (C.filter((function(t) {
                return t !== qt && i(t.target)
            })).length || s(Yt ? Vt : l, "scroll", a), qt.isPressed && (qt._vx.reset(), qt._vy.reset(), s(rt ? l : Vt, E[1], bt, !0)), s(Yt ? Vt : l, "scroll", Tt, dt), s(l, "wheel", kt, dt), s(l, E[0], Gt, dt), s(Vt, E[2], wt), s(Vt, E[3], wt), s(l, "click", gt, !0), s(l, "click", Ct), s(Vt, "gesturestart", xt), s(Vt, "gestureend", At), s(l, A + "enter", Et), s(l, A + "leave", St), s(l, A + "move", Lt), qt.isEnabled = qt.isPressed = qt.isDragging = !1, lt && lt(qt))
        }, qt.kill = function() {
            qt.disable();
            var t = C.indexOf(qt);
            0 <= t && C.splice(t, 1), L === qt && (L = 0)
        }, C.push(qt), rt && i(l) && (L = qt), qt.enable(R)
    }, function(t, n, r) {
        n && e(t.prototype, n), r && e(t, r)
    }(F, [{
        key: "velocityX",
        get: function() {
            return this._vx.getVelocity()
        }
    }, {
        key: "velocityY",
        get: function() {
            return this._vy.getVelocity()
        }
    }]), F);

    function F(t) {
        this.init(t)
    }

    function B() {
        return Ft = 1
    }

    function j() {
        return Ft = 0
    }

    function H(t) {
        return t
    }

    function W(t) {
        return Math.round(1e5 * t) / 1e5 || 0
    }

    function X() {
        return "undefined" != typeof window
    }

    function Y() {
        return Lt || X() && (Lt = window.gsap) && Lt.registerPlugin && Lt
    }

    function V(t) {
        return !!~Pt.indexOf(t)
    }

    function $(t) {
        return r(t, "getBoundingClientRect") || (V(t) ? function() {
            return Xe.width = St.innerWidth, Xe.height = St.innerHeight, Xe
        } : function() {
            return Te(t)
        })
    }

    function U(t, e) {
        var n = e.s,
            i = e.d2,
            o = e.d,
            s = e.a;
        return (n = "scroll" + i) && (s = r(t, n)) ? s() - $(t)()[o] : V(t) ? (Ot[n] || Mt[n]) - (St["inner" + i] || Ot["client" + i] || Mt["client" + i]) : t[n] - t["offset" + i]
    }

    function Q(t, e) {
        for (var n = 0; n < Xt.length; n += 3) e && !~e.indexOf(Xt[n + 1]) || t(Xt[n], Xt[n + 1], Xt[n + 2])
    }

    function G(t) {
        return "string" == typeof t
    }

    function K(t) {
        return "function" == typeof t
    }

    function Z(t) {
        return "number" == typeof t
    }

    function J(t) {
        return "object" == typeof t
    }

    function tt(t, e, n) {
        return t && t.progress(e ? 0 : 1) && n && t.pause()
    }

    function et(t, e) {
        if (t.enabled) {
            var n = e(t);
            n && n.totalTime && (t.callbackAnimation = n)
        }
    }

    function nt(t) {
        return St.getComputedStyle(t)
    }

    function rt(t, e) {
        for (var n in e) n in t || (t[n] = e[n]);
        return t
    }

    function it(t, e) {
        var n = e.d2;
        return t["offset" + n] || t["client" + n] || 0
    }

    function ot(t) {
        var e, n = [],
            r = t.labels,
            i = t.duration();
        for (e in r) n.push(r[e] / i);
        return n
    }

    function st(t) {
        var e = Lt.utils.snap(t),
            n = Array.isArray(t) && t.slice(0).sort((function(t, e) {
                return t - e
            }));
        return n ? function(t, r, i) {
            var o;
            if (void 0 === i && (i = .001), !r) return e(t);
            if (0 < r) {
                for (t -= i, o = 0; o < n.length; o++)
                    if (n[o] >= t) return n[o];
                return n[o - 1]
            }
            for (o = n.length, t += i; o--;)
                if (n[o] <= t) return n[o];
            return n[0]
        } : function(n, r, i) {
            void 0 === i && (i = .001);
            var o = e(n);
            return !r || Math.abs(o - n) < i || o - n < 0 == r < 0 ? o : e(r < 0 ? n - t : n + t)
        }
    }

    function at(t, e, n, r) {
        return n.split(",").forEach((function(n) {
            return t(e, n, r)
        }))
    }

    function lt(t, e, n, r, i) {
        return t.addEventListener(e, n, {
            passive: !r,
            capture: !!i
        })
    }

    function ct(t, e, n, r) {
        return t.removeEventListener(e, n, !!r)
    }

    function ut(t, e, n) {
        return n && n.wheelHandler && t(e, "wheel", n)
    }

    function dt(t, e) {
        if (G(t)) {
            var n = t.indexOf("="),
                r = ~n ? (t.charAt(n - 1) + 1) * parseFloat(t.substr(n + 1)) : 0;
            ~n && (t.indexOf("%") > n && (r *= e / 100), t = t.substr(0, n - 1)), t = r + (t in Ee ? Ee[t] * e : ~t.indexOf("%") ? parseFloat(t) * e / 100 : parseFloat(t) || 0)
        }
        return t
    }

    function ft(t, e, n, i, o, s, a, l) {
        var c = o.startColor,
            u = o.endColor,
            d = o.fontSize,
            f = o.indent,
            h = o.fontWeight,
            p = Ct.createElement("div"),
            g = V(n) || "fixed" === r(n, "pinType"),
            m = -1 !== t.indexOf("scroller"),
            _ = g ? Mt : n,
            v = -1 !== t.indexOf("start"),
            y = v ? c : u,
            b = "border-color:" + y + ";font-size:" + d + ";color:" + y + ";font-weight:" + h + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
        return b += "position:" + ((m || l) && g ? "fixed;" : "absolute;"), !m && !l && g || (b += (i === q ? fe : he) + ":" + (s + parseFloat(f)) + "px;"), a && (b += "box-sizing:border-box;text-align:left;width:" + a.offsetWidth + "px;"), p._isStart = v, p.setAttribute("class", "gsap-marker-" + t + (e ? " marker-" + e : "")), p.style.cssText = b, p.innerText = e || 0 === e ? t + "-" + e : t, _.children[0] ? _.insertBefore(p, _.children[0]) : _.appendChild(p), p._offset = p["offset" + i.op.d2], Se(p, 0, i, v), p
    }

    function ht() {
        return 34 < ae() - ce && (ne = ne || requestAnimationFrame(Fe))
    }

    function pt() {
        Ut && Ut.isPressed && !(Ut.startX > Mt.clientWidth) || (O.cache++, Ut ? ne = ne || requestAnimationFrame(Fe) : Fe(), ce || De("scrollStart"), ce = ae())
    }

    function gt() {
        Kt = St.innerWidth, Gt = St.innerHeight
    }

    function mt() {
        O.cache++, Rt || $t || Ct.fullscreenElement || Ct.webkitFullscreenElement || Qt && Kt === St.innerWidth && !(Math.abs(St.innerHeight - Gt) > .25 * St.innerHeight) || Dt.restart(!0)
    }

    function _t() {
        return ct(Ve, "scrollEnd", _t) || ze(!0)
    }

    function vt(t) {
        for (var e = 0; e < Ie.length; e += 5)(!t || Ie[e + 4] && Ie[e + 4].query === t) && (Ie[e].style.cssText = Ie[e + 1], Ie[e].getBBox && Ie[e].setAttribute("transform", Ie[e + 2] || ""), Ie[e + 3].uncache = 1)
    }

    function yt(t, e) {
        var n;
        for (jt = 0; jt < Ce.length; jt++) !(n = Ce[jt]) || e && n._ctx !== e || (t ? n.kill(1) : n.revert(!0, !0));
        e && vt(e), e || De("revert")
    }

    function bt(t, e) {
        O.cache++, !e && re || O.forEach((function(t) {
            return K(t) && t.cacheID++ && (t.rec = 0)
        })), G(t) && (St.history.scrollRestoration = te = t)
    }

    function wt(t, e, n, r) {
        if (!t._gsap.swappedIn) {
            for (var i, o = Be.length, s = e.style, a = t.style; o--;) s[i = Be[o]] = n[i];
            s.position = "absolute" === n.position ? "absolute" : "relative", "inline" === n.display && (s.display = "inline-block"), a[he] = a[fe] = "auto", s.flexBasis = n.flexBasis || "auto", s.overflow = "visible", s.boxSizing = "border-box", s[pe] = it(t, z) + Ae, s[ge] = it(t, q) + Ae, s[be] = a[we] = a.top = a.left = "0", We(r), a[pe] = a.maxWidth = n[pe], a[ge] = a.maxHeight = n[ge], a[be] = n[be], t.parentNode !== e && (t.parentNode.insertBefore(e, t), e.appendChild(t)), t._gsap.swappedIn = !0
        }
    }

    function xt(t) {
        for (var e = je.length, n = t.style, r = [], i = 0; i < e; i++) r.push(je[i], n[je[i]]);
        return r.t = t, r
    }

    function At(t, e, n, r, i, o, s, a, l, u, d, f, h) {
        K(t) && (t = t(a)), G(t) && "max" === t.substr(0, 3) && (t = f + ("=" === t.charAt(4) ? dt("0" + t.substr(3), n) : 0));
        var p, g, m, _ = h ? h.time() : 0;
        if (h && h.seek(0), Z(t)) s && Se(s, n, r, !0);
        else {
            K(e) && (e = e(a));
            var v, y, b, w, x = (t || "0").split(" ");
            m = c(e) || Mt, (v = Te(m) || {}) && (v.left || v.top) || "none" !== nt(m).display || (w = m.style.display, m.style.display = "block", v = Te(m), w ? m.style.display = w : m.style.removeProperty("display")), y = dt(x[0], v[r.d]), b = dt(x[1] || "0", n), t = v[r.p] - l[r.p] - u + y + i - b, s && Se(s, b, r, n - b < 20 || s._isStart && 20 < b), n -= n - b
        }
        if (o) {
            var A = t + n,
                T = o._isStart;
            p = "scroll" + r.d2, Se(o, A, r, T && 20 < A || !T && (d ? Math.max(Mt[p], Ot[p]) : o.parentNode[p]) <= A + 1), d && (l = Te(s), d && (o.style[r.op.p] = l[r.op.p] - r.op.m - o._offset + Ae))
        }
        return h && m && (p = Te(m), h.seek(f), g = Te(m), h._caScrollDist = p[r.p] - g[r.p], t = t / h._caScrollDist * f), h && h.seek(_), h ? t : Math.round(t)
    }

    function Tt(t, e, n, r) {
        if (t.parentNode !== e) {
            var i, o, s = t.style;
            if (e === Mt) {
                for (i in t._stOrig = s.cssText, o = nt(t)) + i || Ye.test(i) || !o[i] || "string" != typeof s[i] || "0" === i || (s[i] = o[i]);
                s.top = n, s.left = r
            } else s.cssText = t._stOrig;
            Lt.core.getCache(t).uncache = 1, e.appendChild(t)
        }
    }

    function kt(t, e) {
        function n(e, a, l, c, u) {
            var d = n.tween,
                f = a.onComplete;
            return l = l || o(), u = c && u || 0, c = c || e - l, d && d.kill(), r = Math.round(l), a[s] = e, (a.modifiers = {})[s] = function(t) {
                return (t = Math.round(o())) !== r && t !== i && 3 < Math.abs(t - r) && 3 < Math.abs(t - i) ? (d.kill(), n.tween = 0) : t = l + c * d.ratio + u * d.ratio * d.ratio, i = r, r = Math.round(t)
            }, a.onComplete = function() {
                n.tween = 0, f && f.call(d)
            }, d = n.tween = Lt.to(t, a)
        }
        var r, i, o = u(t, e),
            s = "_scroll" + e.p2;
        return (t[s] = o).wheelHandler = function() {
            return n.tween && n.tween.kill() && (n.tween = 0)
        }, lt(t, "wheel", o.wheelHandler), n
    }
    R.version = "3.11.3", R.create = function(t) {
        return new R(t)
    }, R.register = g, R.getAll = function() {
        return C.slice()
    }, R.getById = function(t) {
        return C.filter((function(e) {
            return e.vars.id === t
        }))[0]
    }, n() && m.registerPlugin(R);
    var Lt, Et, St, Ct, Ot, Mt, Pt, Dt, It, Nt, zt, qt, Rt, Ft, Bt, jt, Ht, Wt, Xt, Yt, Vt, $t, Ut, Qt, Gt, Kt, Zt, Jt, te, ee, ne, re, ie, oe, se = 1,
        ae = Date.now,
        le = ae(),
        ce = 0,
        ue = 0,
        de = Math.abs,
        fe = "right",
        he = "bottom",
        pe = "width",
        ge = "height",
        me = "Right",
        _e = "Left",
        ve = "Top",
        ye = "Bottom",
        be = "padding",
        we = "margin",
        xe = "Width",
        Ae = "px",
        Te = function(t, e) {
            var n = e && "matrix(1, 0, 0, 1, 0, 0)" !== nt(t)[Bt] && Lt.to(t, {
                    x: 0,
                    y: 0,
                    xPercent: 0,
                    yPercent: 0,
                    rotation: 0,
                    rotationX: 0,
                    rotationY: 0,
                    scale: 1,
                    skewX: 0,
                    skewY: 0
                }).progress(1),
                r = t.getBoundingClientRect();
            return n && n.progress(0).kill(), r
        },
        ke = {
            startColor: "green",
            endColor: "red",
            indent: 0,
            fontSize: "16px",
            fontWeight: "normal"
        },
        Le = {
            toggleActions: "play",
            anticipatePin: 0
        },
        Ee = {
            top: 0,
            left: 0,
            center: .5,
            bottom: 1,
            right: 1
        },
        Se = function(t, e, n, r) {
            var i = {
                    display: "block"
                },
                o = n[r ? "os2" : "p2"],
                s = n[r ? "p2" : "os2"];
            t._isFlipped = r, i[n.a + "Percent"] = r ? -100 : 0, i[n.a] = r ? "1px" : 0, i["border" + o + xe] = 1, i["border" + s + xe] = 0, i[n.p] = e + "px", Lt.set(t, i)
        },
        Ce = [],
        Oe = {},
        Me = {},
        Pe = [],
        De = function(t) {
            return Me[t] && Me[t].map((function(t) {
                return t()
            })) || Pe
        },
        Ie = [],
        Ne = 0,
        ze = function(t, e) {
            if (!ce || t) {
                re = Ve.isRefreshing = !0, O.forEach((function(t) {
                    return K(t) && t.cacheID++ && (t.rec = t())
                }));
                var n = De("refreshInit");
                Yt && Ve.sort(), e || yt(), O.forEach((function(t) {
                    K(t) && (t.smooth && (t.target.style.scrollBehavior = "auto"), t(0))
                })), Ce.slice(0).forEach((function(t) {
                    return t.refresh()
                })), Ce.forEach((function(t, e) {
                    if (t._subPinOffset && t.pin) {
                        var n = t.vars.horizontal ? "offsetWidth" : "offsetHeight",
                            r = t.pin[n];
                        t.revert(!0, 1), t.adjustPinSpacing(t.pin[n] - r), t.revert(!1, 1)
                    }
                })), Ce.forEach((function(t) {
                    return "max" === t.vars.end && t.setPositions(t.start, Math.max(t.start + 1, U(t.scroller, t._dir)))
                })), n.forEach((function(t) {
                    return t && t.render && t.render(-1)
                })), O.forEach((function(t) {
                    K(t) && (t.smooth && requestAnimationFrame((function() {
                        return t.target.style.scrollBehavior = "smooth"
                    })), t.rec && t(t.rec))
                })), bt(te, 1), Dt.pause(), Ne++, Fe(2), Ce.forEach((function(t) {
                    return K(t.vars.onRefresh) && t.vars.onRefresh(t)
                })), re = Ve.isRefreshing = !1, De("refresh")
            } else lt(Ve, "scrollEnd", _t)
        },
        qe = 0,
        Re = 1,
        Fe = function(t) {
            if (!re || 2 === t) {
                Ve.isUpdating = !0, oe && oe.update(0);
                var e = Ce.length,
                    n = ae(),
                    r = 50 <= n - le,
                    i = e && Ce[0].scroll();
                if (Re = i < qe ? -1 : 1, qe = i, r && (ce && !Ft && 200 < n - ce && (ce = 0, De("scrollEnd")), zt = le, le = n), Re < 0) {
                    for (jt = e; 0 < jt--;) Ce[jt] && Ce[jt].update(0, r);
                    Re = 1
                } else
                    for (jt = 0; jt < e; jt++) Ce[jt] && Ce[jt].update(0, r);
                Ve.isUpdating = !1
            }
            ne = 0
        },
        Be = ["left", "top", he, fe, we + ye, we + me, we + ve, we + _e, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"],
        je = Be.concat([pe, ge, "boxSizing", "max" + xe, "maxHeight", "position", we, be, be + ve, be + me, be + ye, be + _e]),
        He = /([A-Z])/g,
        We = function(t) {
            if (t) {
                var e, n, r = t.t.style,
                    i = t.length,
                    o = 0;
                for ((t.t._gsap || Lt.core.getCache(t.t)).uncache = 1; o < i; o += 2) n = t[o + 1], e = t[o], n ? r[e] = n : r[e] && r.removeProperty(e.replace(He, "-$1").toLowerCase())
            }
        },
        Xe = {
            left: 0,
            top: 0
        },
        Ye = /(webkit|moz|length|cssText|inset)/i,
        Ve = ($e.prototype.init = function(t, e) {
            if (this.progress = this.start = 0, this.vars && this.kill(!0, !0), ue) {
                var n, i, o, s, a, l, d, f, h, p, g, m, _, v, y, b, w, x, A, T, k, L, E, S, C, P, D, I, N, R, F, B, j, X, Y, Q, at, ut, ht = (t = rt(G(t) || Z(t) || t.nodeType ? {
                        trigger: t
                    } : t, Le)).onUpdate,
                    gt = t.toggleClass,
                    vt = t.id,
                    yt = t.onToggle,
                    bt = t.onRefresh,
                    Et = t.scrub,
                    Pt = t.trigger,
                    Dt = t.pin,
                    qt = t.pinSpacing,
                    Bt = t.invalidateOnRefresh,
                    Ht = t.anticipatePin,
                    Wt = t.onScrubComplete,
                    Xt = t.onSnapComplete,
                    $t = t.once,
                    Ut = t.snap,
                    Qt = t.pinReparent,
                    Gt = t.pinSpacer,
                    Kt = t.containerAnimation,
                    Zt = t.fastScrollEnd,
                    te = t.preventOverlaps,
                    ne = t.horizontal || t.containerAnimation && !1 !== t.horizontal ? z : q,
                    le = !Et && 0 !== Et,
                    fe = c(t.scroller || St),
                    he = Lt.core.getCache(fe),
                    Ee = V(fe),
                    Se = "fixed" === ("pinType" in t ? t.pinType : r(fe, "pinType") || Ee && "fixed"),
                    Me = [t.onEnter, t.onLeave, t.onEnterBack, t.onLeaveBack],
                    Pe = le && t.toggleActions.split(" "),
                    De = "markers" in t ? t.markers : Le.markers,
                    Ie = Ee ? 0 : parseFloat(nt(fe)["border" + ne.p2 + xe]) || 0,
                    qe = this,
                    Fe = t.onRefreshInit && function() {
                        return t.onRefreshInit(qe)
                    },
                    Be = function(t, e, n) {
                        var i = n.d,
                            o = n.d2,
                            s = n.a;
                        return (s = r(t, "getBoundingClientRect")) ? function() {
                            return s()[i]
                        } : function() {
                            return (e ? St["inner" + o] : t["client" + o]) || 0
                        }
                    }(fe, Ee, ne),
                    je = function(t, e) {
                        return !e || ~M.indexOf(t) ? $(t) : function() {
                            return Xe
                        }
                    }(fe, Ee),
                    He = 0,
                    Ye = 0,
                    Ve = u(fe, ne);
                if (Jt(qe), qe._dir = ne, Ht *= 45, qe.scroller = fe, qe.scroll = Kt ? Kt.time.bind(Kt) : Ve, s = Ve(), qe.vars = t, e = e || t.animation, "refreshPriority" in t && (Yt = 1, -9999 === t.refreshPriority && (oe = qe)), he.tweenScroll = he.tweenScroll || {
                        top: kt(fe, q),
                        left: kt(fe, z)
                    }, qe.tweenTo = n = he.tweenScroll[ne.p], qe.scrubDuration = function(t) {
                        (F = Z(t) && t) ? R ? R.duration(t) : R = Lt.to(e, {
                            ease: "expo",
                            totalProgress: "+=0.001",
                            duration: F,
                            paused: !0,
                            onComplete: function() {
                                return Wt && Wt(qe)
                            }
                        }): (R && R.progress(1).kill(), R = 0)
                    }, e && (e.vars.lazy = !1, e._initted || !1 !== e.vars.immediateRender && !1 !== t.immediateRender && e.duration() && e.render(0, !0, !0), qe.animation = e.pause(), (e.scrollTrigger = qe).scrubDuration(Et), I = 0, vt = vt || e.vars.id), Ce.push(qe), Ut && (J(Ut) && !Ut.push || (Ut = {
                        snapTo: Ut
                    }), "scrollBehavior" in Mt.style && Lt.set(Ee ? [Mt, Ot] : fe, {
                        scrollBehavior: "auto"
                    }), O.forEach((function(t) {
                        return K(t) && t.target === (Ee ? Ct.scrollingElement || Ot : fe) && (t.smooth = !1)
                    })), o = K(Ut.snapTo) ? Ut.snapTo : "labels" === Ut.snapTo ? function(t) {
                        return function(e) {
                            return Lt.utils.snap(ot(t), e)
                        }
                    }(e) : "labelsDirectional" === Ut.snapTo ? function(t) {
                        return function(e, n) {
                            return st(ot(t))(e, n.direction)
                        }
                    }(e) : !1 !== Ut.directional ? function(t, e) {
                        return st(Ut.snapTo)(t, ae() - Ye < 500 ? 0 : e.direction)
                    } : Lt.utils.snap(Ut.snapTo), B = J(B = Ut.duration || {
                        min: .1,
                        max: 2
                    }) ? Nt(B.min, B.max) : Nt(B, B), j = Lt.delayedCall(Ut.delay || F / 2 || .1, (function() {
                        var t = Ve(),
                            r = ae() - Ye < 500,
                            i = n.tween;
                        if (!(r || Math.abs(qe.getVelocity()) < 10) || i || Ft || He === t) qe.isActive && He !== t && j.restart(!0);
                        else {
                            var s = (t - l) / _,
                                a = e && !le ? e.totalProgress() : s,
                                c = r ? 0 : (a - N) / (ae() - zt) * 1e3 || 0,
                                u = Lt.utils.clamp(-s, 1 - s, de(c / 2) * c / .185),
                                f = s + (!1 === Ut.inertia ? 0 : u),
                                h = Nt(0, 1, o(f, qe)),
                                p = Math.round(l + h * _),
                                g = Ut.onStart,
                                m = Ut.onInterrupt,
                                v = Ut.onComplete;
                            if (t <= d && l <= t && p !== t) {
                                if (i && !i._initted && i.data <= de(p - t)) return;
                                !1 === Ut.inertia && (u = h - s), n(p, {
                                    duration: B(de(.185 * Math.max(de(f - a), de(h - a)) / c / .05 || 0)),
                                    ease: Ut.ease || "power3",
                                    data: de(p - t),
                                    onInterrupt: function() {
                                        return j.restart(!0) && m && m(qe)
                                    },
                                    onComplete: function() {
                                        qe.update(), He = Ve(), I = N = e && !le ? e.totalProgress() : qe.progress, Xt && Xt(qe), v && v(qe)
                                    }
                                }, t, u * _, p - t - u * _), g && g(qe, n.tween)
                            }
                        }
                    })).pause()), vt && (Oe[vt] = qe), ut = (ut = (Pt = qe.trigger = c(Pt || Dt)) && Pt._gsap && Pt._gsap.stRevert) && ut(qe), Dt = !0 === Dt ? Pt : c(Dt), G(gt) && (gt = {
                        targets: Pt,
                        className: gt
                    }), Dt && (!1 === qt || qt === we || (qt = !(!qt && Dt.parentNode && Dt.parentNode.style && "flex" === nt(Dt.parentNode).display) && be), qe.pin = Dt, (i = Lt.core.getCache(Dt)).spacer ? v = i.pinState : (Gt && ((Gt = c(Gt)) && !Gt.nodeType && (Gt = Gt.current || Gt.nativeElement), i.spacerIsNative = !!Gt, Gt && (i.spacerState = xt(Gt))), i.spacer = w = Gt || Ct.createElement("div"), w.classList.add("pin-spacer"), vt && w.classList.add("pin-spacer-" + vt), i.pinState = v = xt(Dt)), !1 !== t.force3D && Lt.set(Dt, {
                        force3D: !0
                    }), qe.spacer = w = i.spacer, D = nt(Dt), E = D[qt + ne.os2], A = Lt.getProperty(Dt), T = Lt.quickSetter(Dt, ne.a, Ae), wt(Dt, w, D), b = xt(Dt)), De) {
                    m = J(De) ? rt(De, ke) : ke, p = ft("scroller-start", vt, fe, ne, m, 0), g = ft("scroller-end", vt, fe, ne, m, 0, p), x = p["offset" + ne.op.d2];
                    var Ue = c(r(fe, "content") || fe);
                    f = this.markerStart = ft("start", vt, Ue, ne, m, x, 0, Kt), h = this.markerEnd = ft("end", vt, Ue, ne, m, x, 0, Kt), Kt && (at = Lt.quickSetter([f, h], ne.a, Ae)), Se || M.length && !0 === r(fe, "fixedMarkers") || (function(t) {
                        var e = nt(t).position;
                        t.style.position = "absolute" === e || "fixed" === e ? e : "relative"
                    }(Ee ? Mt : fe), Lt.set([p, g], {
                        force3D: !0
                    }), C = Lt.quickSetter(p, ne.a, Ae), P = Lt.quickSetter(g, ne.a, Ae))
                }
                if (Kt) {
                    var Qe = Kt.vars.onUpdate,
                        Ge = Kt.vars.onUpdateParams;
                    Kt.eventCallback("onUpdate", (function() {
                        qe.update(0, 0, 1), Qe && Qe.apply(Ge || [])
                    }))
                }
                qe.previous = function() {
                    return Ce[Ce.indexOf(qe) - 1]
                }, qe.next = function() {
                    return Ce[Ce.indexOf(qe) + 1]
                }, qe.revert = function(t, n) {
                    if (!n) return qe.kill(!0);
                    var r = !1 !== t || !qe.enabled,
                        i = Rt;
                    r !== qe.isReverted && (r && (Y = Math.max(Ve(), qe.scroll.rec || 0), X = qe.progress, Q = e && e.progress()), f && [f, h, p, g].forEach((function(t) {
                        return t.style.display = r ? "none" : "block"
                    })), r && (Rt = 1, qe.update(r)), Dt && (r ? function(t, e, n) {
                        We(n);
                        var r = t._gsap;
                        if (r.spacerIsNative) We(r.spacerState);
                        else if (t._gsap.swappedIn) {
                            var i = e.parentNode;
                            i && (i.insertBefore(t, e), i.removeChild(e))
                        }
                        t._gsap.swappedIn = !1
                    }(Dt, w, v) : Qt && qe.isActive || wt(Dt, w, nt(Dt), S)), r || qe.update(r), Rt = i, qe.isReverted = r)
                }, qe.refresh = function(r, i) {
                    if (!Rt && qe.enabled || i)
                        if (Dt && r && ce) lt($e, "scrollEnd", _t);
                        else {
                            !re && Fe && Fe(qe), Rt = 1, Ye = ae(), n.tween && (n.tween.kill(), n.tween = 0), R && R.pause(), Bt && e && e.revert({
                                kill: !1
                            }).invalidate(), qe.isReverted || qe.revert(!0, !0), qe._subPinOffset = !1;
                            for (var o, m, x, T, E, C, O, M, P, D, I = Be(), N = je(), F = Kt ? Kt.duration() : U(fe, ne), B = 0, H = 0, W = t.end, V = t.endTrigger || Pt, $ = t.start || (0 !== t.start && Pt ? Dt ? "0 0" : "0 100%" : 0), J = qe.pinnedContainer = t.pinnedContainer && c(t.pinnedContainer), tt = Pt && Math.max(0, Ce.indexOf(qe)) || 0, et = tt; et--;)(C = Ce[et]).end || C.refresh(0, 1) || (Rt = 1), !(O = C.pin) || O !== Pt && O !== Dt || C.isReverted || ((D = D || []).unshift(C), C.revert(!0, !0)), C !== Ce[et] && (tt--, et--);
                            for (K($) && ($ = $(qe)), l = At($, Pt, I, ne, Ve(), f, p, qe, N, Ie, Se, F, Kt) || (Dt ? -.001 : 0), K(W) && (W = W(qe)), G(W) && !W.indexOf("+=") && (~W.indexOf(" ") ? W = (G($) ? $.split(" ")[0] : "") + W : (B = dt(W.substr(2), I), W = G($) ? $ : l + B, V = Pt)), d = Math.max(l, At(W || (V ? "100% 0" : F), V, I, ne, Ve() + B, h, g, qe, N, Ie, Se, F, Kt)) || -.001, _ = d - l || (l -= .01) && .001, B = 0, et = tt; et--;)(O = (C = Ce[et]).pin) && C.start - C._pinPush <= l && !Kt && 0 < C.end && (o = C.end - C.start, (O === Pt && C.start - C._pinPush < l || O === J) && !Z($) && (B += o * (1 - C.progress)), O === Dt && (H += o));
                            if (l += B, d += B, qe._pinPush = H, f && B && ((o = {})[ne.a] = "+=" + B, J && (o[ne.p] = "-=" + Ve()), Lt.set([f, h], o)), Dt) o = nt(Dt), T = ne === q, x = Ve(), k = parseFloat(A(ne.a)) + H, !F && 1 < d && ((Ee ? Mt : fe).style["overflow-" + ne.a] = "scroll"), wt(Dt, w, o), b = xt(Dt), m = Te(Dt, !0), M = Se && u(fe, T ? z : q)(), qt && ((S = [qt + ne.os2, _ + H + Ae]).t = w, (et = qt === be ? it(Dt, ne) + _ + H : 0) && S.push(ne.d, et + Ae), We(S), J && Ce.forEach((function(t) {
                                t.pin === J && !1 !== t.vars.pinSpacing && (t._subPinOffset = !0)
                            })), Se && Ve(Y)), Se && ((E = {
                                top: m.top + (T ? x - l : M) + Ae,
                                left: m.left + (T ? M : x - l) + Ae,
                                boxSizing: "border-box",
                                position: "fixed"
                            })[pe] = E.maxWidth = Math.ceil(m.width) + Ae, E[ge] = E.maxHeight = Math.ceil(m.height) + Ae, E[we] = E[we + ve] = E[we + me] = E[we + ye] = E[we + _e] = "0", E[be] = o[be], E[be + ve] = o[be + ve], E[be + me] = o[be + me], E[be + ye] = o[be + ye], E[be + _e] = o[be + _e], y = function(t, e, n) {
                                for (var r, i = [], o = t.length, s = n ? 8 : 0; s < o; s += 2) r = t[s], i.push(r, r in e ? e[r] : t[s + 1]);
                                return i.t = t.t, i
                            }(v, E, Qt), re && Ve(0)), e ? (P = e._initted, Vt(1), e.render(e.duration(), !0, !0), L = A(ne.a) - k + _ + H, _ !== L && Se && y.splice(y.length - 2, 2), e.render(0, !0, !0), P || e.invalidate(!0), e.parent || e.totalTime(e.totalTime()), Vt(0)) : L = _;
                            else if (Pt && Ve() && !Kt)
                                for (m = Pt.parentNode; m && m !== Mt;) m._pinOffset && (l -= m._pinOffset, d -= m._pinOffset), m = m.parentNode;
                            D && D.forEach((function(t) {
                                return t.revert(!1, !0)
                            })), qe.start = l, qe.end = d, s = a = re ? Y : Ve(), Kt || re || (s < Y && Ve(Y), qe.scroll.rec = 0), qe.revert(!1, !0), j && (He = -1, qe.isActive && Ve(l + _ * X), j.restart(!0)), Rt = 0, e && le && (e._initted || Q) && e.progress() !== Q && e.progress(Q, !0).render(e.time(), !0, !0), X === qe.progress && !Kt || (e && !le && e.totalProgress(X, !0), qe.progress = (s - l) / _ === X ? 0 : X), Dt && qt && (w._pinOffset = Math.round(qe.progress * L)), bt && !re && bt(qe)
                        }
                }, qe.getVelocity = function() {
                    return (Ve() - a) / (ae() - zt) * 1e3 || 0
                }, qe.endAnimation = function() {
                    tt(qe.callbackAnimation), e && (R ? R.progress(1) : e.paused() ? le || tt(e, qe.direction < 0, 1) : tt(e, e.reversed()))
                }, qe.labelToScroll = function(t) {
                    return e && e.labels && (l || qe.refresh() || l) + e.labels[t] / e.duration() * _ || 0
                }, qe.getTrailing = function(t) {
                    var e = Ce.indexOf(qe),
                        n = 0 < qe.direction ? Ce.slice(0, e).reverse() : Ce.slice(e + 1);
                    return (G(t) ? n.filter((function(e) {
                        return e.vars.preventOverlaps === t
                    })) : n).filter((function(t) {
                        return 0 < qe.direction ? t.end <= l : t.start >= d
                    }))
                }, qe.update = function(t, r, i) {
                    if (!Kt || i || t) {
                        var o, c, u, f, h, g, m, v = re ? Y : qe.scroll(),
                            x = t ? 0 : (v - l) / _,
                            A = x < 0 ? 0 : 1 < x ? 1 : x || 0,
                            S = qe.progress;
                        if (r && (a = s, s = Kt ? Ve() : v, Ut && (N = I, I = e && !le ? e.totalProgress() : A)), Ht && !A && Dt && !Rt && !se && ce && l < v + (v - a) / (ae() - zt) * Ht && (A = 1e-4), A !== S && qe.enabled) {
                            if (f = (h = (o = qe.isActive = !!A && A < 1) != (!!S && S < 1)) || !!A != !!S, qe.direction = S < A ? 1 : -1, qe.progress = A, f && !Rt && (c = A && !S ? 0 : 1 === A ? 1 : 1 === S ? 2 : 3, le && (u = !h && "none" !== Pe[c + 1] && Pe[c + 1] || Pe[c], m = e && ("complete" === u || "reset" === u || u in e))), te && (h || m) && (m || Et || !e) && (K(te) ? te(qe) : qe.getTrailing(te).forEach((function(t) {
                                    return t.endAnimation()
                                }))), le || (!R || Rt || se ? e && e.totalProgress(A, !!Rt) : ((Kt || oe && oe !== qe) && R.render(R._dp._time - R._start), R.resetTo ? R.resetTo("totalProgress", A, e._tTime / e._tDur) : (R.vars.totalProgress = A, R.invalidate().restart()))), Dt)
                                if (t && qt && (w.style[qt + ne.os2] = E), Se) {
                                    if (f) {
                                        if (g = !t && S < A && v < d + 1 && v + 1 >= U(fe, ne), Qt)
                                            if (t || !o && !g) Tt(Dt, w);
                                            else {
                                                var O = Te(Dt, !0),
                                                    M = v - l;
                                                Tt(Dt, Mt, O.top + (ne === q ? M : 0) + Ae, O.left + (ne === q ? 0 : M) + Ae)
                                            } We(o || g ? y : b), L !== _ && A < 1 && o || T(k + (1 !== A || g ? 0 : L))
                                    }
                                } else T(W(k + L * A));
                            !Ut || n.tween || Rt || se || j.restart(!0), gt && (h || $t && A && (A < 1 || !ee)) && It(gt.targets).forEach((function(t) {
                                return t.classList[o || $t ? "add" : "remove"](gt.className)
                            })), !ht || le || t || ht(qe), f && !Rt ? (le && (m && ("complete" === u ? e.pause().totalProgress(1) : "reset" === u ? e.restart(!0).pause() : "restart" === u ? e.restart(!0) : e[u]()), ht && ht(qe)), !h && ee || (yt && h && et(qe, yt), Me[c] && et(qe, Me[c]), $t && (1 === A ? qe.kill(!1, 1) : Me[c] = 0), h || Me[c = 1 === A ? 1 : 3] && et(qe, Me[c])), Zt && !o && Math.abs(qe.getVelocity()) > (Z(Zt) ? Zt : 2500) && (tt(qe.callbackAnimation), R ? R.progress(1) : tt(e, "reverse" === u ? 1 : !A, 1))) : le && ht && !Rt && ht(qe)
                        }
                        if (P) {
                            var D = Kt ? v / Kt.duration() * (Kt._caScrollDist || 0) : v;
                            C(D + (p._isFlipped ? 1 : 0)), P(D)
                        }
                        at && at(-v / Kt.duration() * (Kt._caScrollDist || 0))
                    }
                }, qe.enable = function(t, e) {
                    qe.enabled || (qe.enabled = !0, lt(fe, "resize", mt), lt(Ee ? Ct : fe, "scroll", pt), Fe && lt($e, "refreshInit", Fe), !1 !== t && (qe.progress = X = 0, s = a = He = Ve()), !1 !== e && qe.refresh())
                }, qe.getTween = function(t) {
                    return t && n ? n.tween : R
                }, qe.setPositions = function(t, e) {
                    Dt && (k += t - l, L += e - t - _, qt === be && qe.adjustPinSpacing(e - t - _)), qe.start = l = t, qe.end = d = e, _ = e - t, qe.update()
                }, qe.adjustPinSpacing = function(t) {
                    if (S) {
                        var e = S.indexOf(ne.d) + 1;
                        S[e] = parseFloat(S[e]) + t + Ae, S[1] = parseFloat(S[1]) + t + Ae, We(S)
                    }
                }, qe.disable = function(t, e) {
                    if (qe.enabled && (!1 !== t && qe.revert(!0, !0), qe.enabled = qe.isActive = !1, e || R && R.pause(), Y = 0, i && (i.uncache = 1), Fe && ct($e, "refreshInit", Fe), j && (j.pause(), n.tween && n.tween.kill() && (n.tween = 0)), !Ee)) {
                        for (var r = Ce.length; r--;)
                            if (Ce[r].scroller === fe && Ce[r] !== qe) return;
                        ct(fe, "resize", mt), ct(fe, "scroll", pt)
                    }
                }, qe.kill = function(n, r) {
                    qe.disable(n, r), R && !r && R.kill(), vt && delete Oe[vt];
                    var o = Ce.indexOf(qe);
                    0 <= o && Ce.splice(o, 1), o === jt && 0 < Re && jt--, o = 0, Ce.forEach((function(t) {
                        return t.scroller === qe.scroller && (o = 1)
                    })), o || re || (qe.scroll.rec = 0), e && (e.scrollTrigger = null, n && e.revert({
                        kill: !1
                    }), r || e.kill()), f && [f, h, p, g].forEach((function(t) {
                        return t.parentNode && t.parentNode.removeChild(t)
                    })), oe === qe && (oe = 0), Dt && (i && (i.uncache = 1), o = 0, Ce.forEach((function(t) {
                        return t.pin === Dt && o++
                    })), o || (i.spacer = 0)), t.onKill && t.onKill(qe)
                }, qe.enable(!1, !1), ut && ut(qe), e && e.add && !_ ? Lt.delayedCall(.01, (function() {
                    return l || d || qe.refresh()
                })) && (_ = .01) && (l = d = 0) : qe.refresh(), Dt && function() {
                    if (ie !== Ne) {
                        var t = ie = Ne;
                        requestAnimationFrame((function() {
                            return t === Ne && ze(!0)
                        }))
                    }
                }()
            } else this.update = this.refresh = this.kill = H
        }, $e.register = function(t) {
            return Et || (Lt = t || Y(), X() && window.document && $e.enable(), Et = ue), Et
        }, $e.defaults = function(t) {
            if (t)
                for (var e in t) Le[e] = t[e];
            return Le
        }, $e.disable = function(t, e) {
            ue = 0, Ce.forEach((function(n) {
                return n[e ? "kill" : "disable"](t)
            })), ct(St, "wheel", pt), ct(Ct, "scroll", pt), clearInterval(qt), ct(Ct, "touchcancel", H), ct(Mt, "touchstart", H), at(ct, Ct, "pointerdown,touchstart,mousedown", B), at(ct, Ct, "pointerup,touchend,mouseup", j), Dt.kill(), Q(ct);
            for (var n = 0; n < O.length; n += 3) ut(ct, O[n], O[n + 1]), ut(ct, O[n], O[n + 2])
        }, $e.enable = function() {
            if (St = window, Ct = document, Ot = Ct.documentElement, Mt = Ct.body, Lt && (It = Lt.utils.toArray, Nt = Lt.utils.clamp, Jt = Lt.core.context || H, Vt = Lt.core.suppressOverwrites || H, te = St.history.scrollRestoration || "auto", Lt.core.globals("ScrollTrigger", $e), Mt)) {
                ue = 1, R.register(Lt), $e.isTouch = R.isTouch, Zt = R.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), lt(St, "wheel", pt), Pt = [St, Ct, Ot, Mt], Lt.matchMedia ? ($e.matchMedia = function(t) {
                    var e, n = Lt.matchMedia();
                    for (e in t) n.add(e, t[e]);
                    return n
                }, Lt.addEventListener("matchMediaInit", (function() {
                    return yt()
                })), Lt.addEventListener("matchMediaRevert", (function() {
                    return vt()
                })), Lt.addEventListener("matchMedia", (function() {
                    ze(0, 1), De("matchMedia")
                })), Lt.matchMedia("(orientation: portrait)", (function() {
                    return gt(), gt
                }))) : console.warn("Requires GSAP 3.11.0 or later"), gt(), lt(Ct, "scroll", pt);
                var t, e, n = Mt.style,
                    r = n.borderTopStyle,
                    i = Lt.core.Animation.prototype;
                for (i.revert || Object.defineProperty(i, "revert", {
                        value: function() {
                            return this.time(-.01, !0)
                        }
                    }), n.borderTopStyle = "solid", t = Te(Mt), q.m = Math.round(t.top + q.sc()) || 0, z.m = Math.round(t.left + z.sc()) || 0, r ? n.borderTopStyle = r : n.removeProperty("border-top-style"), qt = setInterval(ht, 250), Lt.delayedCall(.5, (function() {
                        return se = 0
                    })), lt(Ct, "touchcancel", H), lt(Mt, "touchstart", H), at(lt, Ct, "pointerdown,touchstart,mousedown", B), at(lt, Ct, "pointerup,touchend,mouseup", j), Bt = Lt.utils.checkPrefix("transform"), je.push(Bt), Et = ae(), Dt = Lt.delayedCall(.2, ze).pause(), Xt = [Ct, "visibilitychange", function() {
                        var t = St.innerWidth,
                            e = St.innerHeight;
                        Ct.hidden ? (Ht = t, Wt = e) : Ht === t && Wt === e || mt()
                    }, Ct, "DOMContentLoaded", ze, St, "load", ze, St, "resize", mt], Q(lt), Ce.forEach((function(t) {
                        return t.enable(0, 1)
                    })), e = 0; e < O.length; e += 3) ut(ct, O[e], O[e + 1]), ut(ct, O[e], O[e + 2])
            }
        }, $e.config = function(t) {
            "limitCallbacks" in t && (ee = !!t.limitCallbacks);
            var e = t.syncInterval;
            e && clearInterval(qt) || (qt = e) && setInterval(ht, e), "ignoreMobileResize" in t && (Qt = 1 === $e.isTouch && t.ignoreMobileResize), "autoRefreshEvents" in t && (Q(ct) || Q(lt, t.autoRefreshEvents || "none"), $t = -1 === (t.autoRefreshEvents + "").indexOf("resize"))
        }, $e.scrollerProxy = function(t, e) {
            var n = c(t),
                r = O.indexOf(n),
                i = V(n);
            ~r && O.splice(r, i ? 6 : 2), e && (i ? M.unshift(St, e, Mt, e, Ot, e) : M.unshift(n, e))
        }, $e.clearMatchMedia = function(t) {
            Ce.forEach((function(e) {
                return e._ctx && e._ctx.query === t && e._ctx.kill(!0, !0)
            }))
        }, $e.isInViewport = function(t, e, n) {
            var r = (G(t) ? c(t) : t).getBoundingClientRect(),
                i = r[n ? pe : ge] * e || 0;
            return n ? 0 < r.right - i && r.left + i < St.innerWidth : 0 < r.bottom - i && r.top + i < St.innerHeight
        }, $e.positionInViewport = function(t, e, n) {
            G(t) && (t = c(t));
            var r = t.getBoundingClientRect(),
                i = r[n ? pe : ge],
                o = null == e ? i / 2 : e in Ee ? Ee[e] * i : ~e.indexOf("%") ? parseFloat(e) * i / 100 : parseFloat(e) || 0;
            return n ? (r.left + o) / St.innerWidth : (r.top + o) / St.innerHeight
        }, $e.killAll = function(t) {
            if (Ce.forEach((function(t) {
                    return "ScrollSmoother" !== t.vars.id && t.kill()
                })), !0 !== t) {
                var e = Me.killAll || [];
                Me = {}, e.forEach((function(t) {
                    return t()
                }))
            }
        }, $e);

    function $e(t, e) {
        Et || $e.register(Lt) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), this.init(t, e)
    }

    function Ue(t, e, n, r) {
        return r < e ? t(r) : e < 0 && t(0), r < n ? (r - e) / (n - e) : n < 0 ? e / (e - n) : 1
    }

    function Qe(t, e) {
        !0 === e ? t.style.removeProperty("touch-action") : t.style.touchAction = !0 === e ? "auto" : e ? "pan-" + e + (R.isTouch ? " pinch-zoom" : "") : "none", t === Ot && Qe(Mt, e)
    }

    function Ge(t) {
        var e, n = t.event,
            r = t.target,
            i = t.axis,
            o = (n.changedTouches ? n.changedTouches[0] : n).target,
            s = o._gsap || Lt.core.getCache(o),
            a = ae();
        if (!s._isScrollT || 2e3 < a - s._isScrollT) {
            for (; o && o.scrollHeight <= o.clientHeight;) o = o.parentNode;
            s._isScroll = o && !V(o) && o !== r && (Je[(e = nt(o)).overflowY] || Je[e.overflowX]), s._isScrollT = a
        }!s._isScroll && "x" !== i || (n.stopPropagation(), n._gsapAllow = !0)
    }

    function Ke(t, e, n, r) {
        return R.create({
            target: t,
            capture: !0,
            debounce: !1,
            lockAxis: !0,
            type: e,
            onWheel: r = r && Ge,
            onPress: r,
            onDrag: r,
            onScroll: r,
            onEnable: function() {
                return n && lt(Ct, R.eventTypes[0], en, !1, !0)
            },
            onDisable: function() {
                return ct(Ct, R.eventTypes[0], en, !0)
            }
        })
    }
    Ve.version = "3.11.3", Ve.saveStyles = function(t) {
        return t ? It(t).forEach((function(t) {
            if (t && t.style) {
                var e = Ie.indexOf(t);
                0 <= e && Ie.splice(e, 5), Ie.push(t, t.style.cssText, t.getBBox && t.getAttribute("transform"), Lt.core.getCache(t), Jt())
            }
        })) : Ie
    }, Ve.revert = function(t, e) {
        return yt(!t, e)
    }, Ve.create = function(t, e) {
        return new Ve(t, e)
    }, Ve.refresh = function(t) {
        return t ? mt() : (Et || Ve.register()) && ze(!0)
    }, Ve.update = Fe, Ve.clearScrollMemory = bt, Ve.maxScroll = function(t, e) {
        return U(t, e ? z : q)
    }, Ve.getScrollFunc = function(t, e) {
        return u(c(t), e ? z : q)
    }, Ve.getById = function(t) {
        return Oe[t]
    }, Ve.getAll = function() {
        return Ce.filter((function(t) {
            return "ScrollSmoother" !== t.vars.id
        }))
    }, Ve.isScrolling = function() {
        return !!ce
    }, Ve.snapDirectional = st, Ve.addEventListener = function(t, e) {
        var n = Me[t] || (Me[t] = []);
        ~n.indexOf(e) || n.push(e)
    }, Ve.removeEventListener = function(t, e) {
        var n = Me[t],
            r = n && n.indexOf(e);
        0 <= r && n.splice(r, 1)
    }, Ve.batch = function(t, e) {
        function n(t, e) {
            var n = [],
                r = [],
                i = Lt.delayedCall(s, (function() {
                    e(n, r), n = [], r = []
                })).pause();
            return function(t) {
                n.length || i.restart(!0), n.push(t.trigger), r.push(t), a <= n.length && i.progress(1)
            }
        }
        var r, i = [],
            o = {},
            s = e.interval || .016,
            a = e.batchMax || 1e9;
        for (r in e) o[r] = "on" === r.substr(0, 2) && K(e[r]) && "onRefreshInit" !== r ? n(0, e[r]) : e[r];
        return K(a) && (a = a(), lt(Ve, "refresh", (function() {
            return a = e.batchMax()
        }))), It(t).forEach((function(t) {
            var e = {};
            for (r in o) e[r] = o[r];
            e.trigger = t, i.push(Ve.create(e))
        })), i
    };
    var Ze, Je = {
            auto: 1,
            scroll: 1
        },
        tn = /(input|label|select|textarea)/i,
        en = function(t) {
            var e = tn.test(t.target.tagName);
            (e || Ze) && (t._gsapAllow = !0, Ze = e)
        };
    Ve.sort = function(t) {
        return Ce.sort(t || function(t, e) {
            return -1e6 * (t.vars.refreshPriority || 0) + t.start - (e.start + -1e6 * (e.vars.refreshPriority || 0))
        })
    }, Ve.observe = function(t) {
        return new R(t)
    }, Ve.normalizeScroll = function(t) {
        if (void 0 === t) return Ut;
        if (!0 === t && Ut) return Ut.enable();
        if (!1 === t) return Ut && Ut.kill();
        var e = t instanceof R ? t : function(t) {
            function e() {
                return l = !1
            }

            function n() {
                s = U(v, q), M = Nt(Zt ? 1 : 0, s), g && (C = Nt(0, U(v, z))), a = Ne
            }

            function r() {
                w._gsap.y = W(parseFloat(w._gsap.y) + x.offset) + "px", w.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(w._gsap.y) + ", 0, 1)", x.offset = x.cacheID = 0
            }

            function i() {
                n(), d.isActive() && d.vars.scrollY > s && (x() > s ? d.progress(1) && x(s) : d.resetTo("scrollY", s))
            }
            J(t) || (t = {}), t.preventDefault = t.isNormalizer = t.allowClicks = !0, t.type || (t.type = "wheel,touch"), t.debounce = !!t.debounce, t.id = t.id || "normalizer";
            var o, s, a, l, d, f, h, p, g = t.normalizeScrollX,
                m = t.momentum,
                _ = t.allowNestedScroll,
                v = c(t.target) || Ot,
                y = Lt.core.globals().ScrollSmoother,
                b = y && y.get(),
                w = Zt && (t.content && c(t.content) || b && !1 !== t.content && !b.smooth() && b.content()),
                x = u(v, q),
                A = u(v, z),
                T = 1,
                k = (R.isTouch && St.visualViewport ? St.visualViewport.scale * St.visualViewport.width : St.outerWidth) / St.innerWidth,
                L = 0,
                E = K(m) ? function() {
                    return m(o)
                } : function() {
                    return m || 2.8
                },
                S = Ke(v, t.type, !0, _),
                C = H,
                M = H;
            return w && Lt.set(w, {
                y: "+=0"
            }), t.ignoreCheck = function(t) {
                return Zt && "touchmove" === t.type && function() {
                    if (l) {
                        requestAnimationFrame(e);
                        var t = W(o.deltaY / 2),
                            n = M(x.v - t);
                        if (w && n !== x.v + x.offset) {
                            x.offset = n - x.v;
                            var i = W((parseFloat(w && w._gsap.y) || 0) - x.offset);
                            w.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + i + ", 0, 1)", w._gsap.y = i + "px", x.cacheID = O.cache, Fe()
                        }
                        return !0
                    }
                    x.offset && r(), l = !0
                }() || 1.05 < T && "touchstart" !== t.type || o.isGesturing || t.touches && 1 < t.touches.length
            }, t.onPress = function() {
                var t = T;
                T = W((St.visualViewport && St.visualViewport.scale || 1) / k), d.pause(), t !== T && Qe(v, 1.01 < T || !g && "x"), f = A(), h = x(), n(), a = Ne
            }, t.onRelease = t.onGestureStart = function(t, e) {
                if (x.offset && r(), e) {
                    O.cache++;
                    var n, o, a = E();
                    g && (o = (n = A()) + .05 * a * -t.velocityX / .227, a *= Ue(A, n, o, U(v, z)), d.vars.scrollX = C(o)), o = (n = x()) + .05 * a * -t.velocityY / .227, a *= Ue(x, n, o, U(v, q)), d.vars.scrollY = M(o), d.invalidate().duration(a).play(.01), (Zt && d.vars.scrollY >= s || s - 1 <= n) && Lt.to({}, {
                        onUpdate: i,
                        duration: a
                    })
                } else p.restart(!0)
            }, t.onWheel = function() {
                d._ts && d.pause(), 1e3 < ae() - L && (a = 0, L = ae())
            }, t.onChange = function(t, e, i, o, s) {
                if (Ne !== a && n(), e && g && A(C(o[2] === e ? f + (t.startX - t.x) : A() + e - o[1])), i) {
                    x.offset && r();
                    var l = s[2] === i,
                        c = l ? h + t.startY - t.y : x() + i - s[1],
                        u = M(c);
                    l && c !== u && (h += u - c), x(u)
                }(i || e) && Fe()
            }, t.onEnable = function() {
                Qe(v, !g && "x"), Ve.addEventListener("refresh", i), lt(St, "resize", i), x.smooth && (x.target.style.scrollBehavior = "auto", x.smooth = A.smooth = !1), S.enable()
            }, t.onDisable = function() {
                Qe(v, !0), ct(St, "resize", i), Ve.removeEventListener("refresh", i), S.kill()
            }, t.lockAxis = !1 !== t.lockAxis, ((o = new R(t)).iOS = Zt) && !x() && x(1), Zt && Lt.ticker.add(H), p = o._dc, d = Lt.to(o, {
                ease: "power4",
                paused: !0,
                scrollX: g ? "+=0.1" : "+=0",
                scrollY: "+=0.1",
                onComplete: p.vars.onComplete
            }), o
        }(t);
        return Ut && Ut.target === e.target && Ut.kill(), V(e.target) && (Ut = e), e
    }, Ve.core = {
        _getVelocityProp: d,
        _inputObserver: Ke,
        _scrollers: O,
        _proxies: M,
        bridge: {
            ss: function() {
                ce || De("scrollStart"), ce = ae()
            },
            ref: function() {
                return Rt
            }
        }
    }, Y() && Lt.registerPlugin(Ve), t.ScrollTrigger = Ve, t.default = Ve, "undefined" == typeof window || window !== t ? Object.defineProperty(t, "__esModule", {
        value: !0
    }) : delete t.default
})),
function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.anime = e()
}(this, (function() {
    "use strict";
    var t = {
            update: null,
            begin: null,
            loopBegin: null,
            changeBegin: null,
            change: null,
            changeComplete: null,
            loopComplete: null,
            complete: null,
            loop: 1,
            direction: "normal",
            autoplay: !0,
            timelineOffset: 0
        },
        e = {
            duration: 1e3,
            delay: 0,
            endDelay: 0,
            easing: "easeOutElastic(1, .5)",
            round: 0
        },
        n = ["translateX", "translateY", "translateZ", "rotate", "rotateX", "rotateY", "rotateZ", "scale", "scaleX", "scaleY", "scaleZ", "skew", "skewX", "skewY", "perspective", "matrix", "matrix3d"],
        r = {
            CSS: {},
            springs: {}
        };

    function i(t, e, n) {
        return Math.min(Math.max(t, e), n)
    }

    function o(t, e) {
        return t.indexOf(e) > -1
    }

    function s(t, e) {
        return t.apply(null, e)
    }
    var a = {
        arr: function(t) {
            return Array.isArray(t)
        },
        obj: function(t) {
            return o(Object.prototype.toString.call(t), "Object")
        },
        pth: function(t) {
            return a.obj(t) && t.hasOwnProperty("totalLength")
        },
        svg: function(t) {
            return t instanceof SVGElement
        },
        inp: function(t) {
            return t instanceof HTMLInputElement
        },
        dom: function(t) {
            return t.nodeType || a.svg(t)
        },
        str: function(t) {
            return "string" == typeof t
        },
        fnc: function(t) {
            return "function" == typeof t
        },
        und: function(t) {
            return void 0 === t
        },
        nil: function(t) {
            return a.und(t) || null === t
        },
        hex: function(t) {
            return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(t)
        },
        rgb: function(t) {
            return /^rgb/.test(t)
        },
        hsl: function(t) {
            return /^hsl/.test(t)
        },
        col: function(t) {
            return a.hex(t) || a.rgb(t) || a.hsl(t)
        },
        key: function(n) {
            return !t.hasOwnProperty(n) && !e.hasOwnProperty(n) && "targets" !== n && "keyframes" !== n
        }
    };

    function l(t) {
        var e = /\(([^)]+)\)/.exec(t);
        return e ? e[1].split(",").map((function(t) {
            return parseFloat(t)
        })) : []
    }

    function c(t, e) {
        var n = l(t),
            o = i(a.und(n[0]) ? 1 : n[0], .1, 100),
            s = i(a.und(n[1]) ? 100 : n[1], .1, 100),
            c = i(a.und(n[2]) ? 10 : n[2], .1, 100),
            u = i(a.und(n[3]) ? 0 : n[3], .1, 100),
            d = Math.sqrt(s / o),
            f = c / (2 * Math.sqrt(s * o)),
            h = f < 1 ? d * Math.sqrt(1 - f * f) : 0,
            p = f < 1 ? (f * d - u) / h : -u + d;

        function g(t) {
            var n = e ? e * t / 1e3 : t;
            return n = f < 1 ? Math.exp(-n * f * d) * (1 * Math.cos(h * n) + p * Math.sin(h * n)) : (1 + p * n) * Math.exp(-n * d), 0 === t || 1 === t ? t : 1 - n
        }
        return e ? g : function() {
            var e = r.springs[t];
            if (e) return e;
            for (var n = 0, i = 0;;)
                if (1 === g(n += 1 / 6)) {
                    if (++i >= 16) break
                } else i = 0;
            var o = n * (1 / 6) * 1e3;
            return r.springs[t] = o, o
        }
    }

    function u(t) {
        return void 0 === t && (t = 10),
            function(e) {
                return Math.ceil(i(e, 1e-6, 1) * t) * (1 / t)
            }
    }
    var d, f, h = function() {
            var t = .1;

            function e(t, e) {
                return 1 - 3 * e + 3 * t
            }

            function n(t, e) {
                return 3 * e - 6 * t
            }

            function r(t) {
                return 3 * t
            }

            function i(t, i, o) {
                return ((e(i, o) * t + n(i, o)) * t + r(i)) * t
            }

            function o(t, i, o) {
                return 3 * e(i, o) * t * t + 2 * n(i, o) * t + r(i)
            }
            return function(e, n, r, s) {
                if (0 <= e && e <= 1 && 0 <= r && r <= 1) {
                    var a = new Float32Array(11);
                    if (e !== n || r !== s)
                        for (var l = 0; l < 11; ++l) a[l] = i(l * t, e, r);
                    return function(t) {
                        return e === n && r === s || 0 === t || 1 === t ? t : i(c(t), n, s)
                    }
                }

                function c(n) {
                    for (var s = 0, l = 1; 10 !== l && a[l] <= n; ++l) s += t;
                    var c = s + (n - a[--l]) / (a[l + 1] - a[l]) * t,
                        u = o(c, e, r);
                    return u >= .001 ? function(t, e, n, r) {
                        for (var s = 0; s < 4; ++s) {
                            var a = o(e, n, r);
                            if (0 === a) return e;
                            e -= (i(e, n, r) - t) / a
                        }
                        return e
                    }(n, c, e, r) : 0 === u ? c : function(t, e, n, r, o) {
                        for (var s, a, l = 0;
                            (s = i(a = e + (n - e) / 2, r, o) - t) > 0 ? n = a : e = a, Math.abs(s) > 1e-7 && ++l < 10;);
                        return a
                    }(n, s, s + t, e, r)
                }
            }
        }(),
        p = (d = {
            linear: function() {
                return function(t) {
                    return t
                }
            }
        }, f = {
            Sine: function() {
                return function(t) {
                    return 1 - Math.cos(t * Math.PI / 2)
                }
            },
            Circ: function() {
                return function(t) {
                    return 1 - Math.sqrt(1 - t * t)
                }
            },
            Back: function() {
                return function(t) {
                    return t * t * (3 * t - 2)
                }
            },
            Bounce: function() {
                return function(t) {
                    for (var e, n = 4; t < ((e = Math.pow(2, --n)) - 1) / 11;);
                    return 1 / Math.pow(4, 3 - n) - 7.5625 * Math.pow((3 * e - 2) / 22 - t, 2)
                }
            },
            Elastic: function(t, e) {
                void 0 === t && (t = 1), void 0 === e && (e = .5);
                var n = i(t, 1, 10),
                    r = i(e, .1, 2);
                return function(t) {
                    return 0 === t || 1 === t ? t : -n * Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1 - r / (2 * Math.PI) * Math.asin(1 / n)) * (2 * Math.PI) / r)
                }
            }
        }, ["Quad", "Cubic", "Quart", "Quint", "Expo"].forEach((function(t, e) {
            f[t] = function() {
                return function(t) {
                    return Math.pow(t, e + 2)
                }
            }
        })), Object.keys(f).forEach((function(t) {
            var e = f[t];
            d["easeIn" + t] = e, d["easeOut" + t] = function(t, n) {
                return function(r) {
                    return 1 - e(t, n)(1 - r)
                }
            }, d["easeInOut" + t] = function(t, n) {
                return function(r) {
                    return r < .5 ? e(t, n)(2 * r) / 2 : 1 - e(t, n)(-2 * r + 2) / 2
                }
            }, d["easeOutIn" + t] = function(t, n) {
                return function(r) {
                    return r < .5 ? (1 - e(t, n)(1 - 2 * r)) / 2 : (e(t, n)(2 * r - 1) + 1) / 2
                }
            }
        })), d);

    function g(t, e) {
        if (a.fnc(t)) return t;
        var n = t.split("(")[0],
            r = p[n],
            i = l(t);
        switch (n) {
            case "spring":
                return c(t, e);
            case "cubicBezier":
                return s(h, i);
            case "steps":
                return s(u, i);
            default:
                return s(r, i)
        }
    }

    function m(t) {
        try {
            return document.querySelectorAll(t)
        } catch (t) {
            return
        }
    }

    function _(t, e) {
        for (var n = t.length, r = arguments.length >= 2 ? arguments[1] : void 0, i = [], o = 0; o < n; o++)
            if (o in t) {
                var s = t[o];
                e.call(r, s, o, t) && i.push(s)
            } return i
    }

    function v(t) {
        return t.reduce((function(t, e) {
            return t.concat(a.arr(e) ? v(e) : e)
        }), [])
    }

    function y(t) {
        return a.arr(t) ? t : (a.str(t) && (t = m(t) || t), t instanceof NodeList || t instanceof HTMLCollection ? [].slice.call(t) : [t])
    }

    function b(t, e) {
        return t.some((function(t) {
            return t === e
        }))
    }

    function w(t) {
        var e = {};
        for (var n in t) e[n] = t[n];
        return e
    }

    function x(t, e) {
        var n = w(t);
        for (var r in t) n[r] = e.hasOwnProperty(r) ? e[r] : t[r];
        return n
    }

    function A(t, e) {
        var n = w(t);
        for (var r in e) n[r] = a.und(t[r]) ? e[r] : t[r];
        return n
    }

    function T(t) {
        var e = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(t);
        if (e) return e[1]
    }

    function k(t, e) {
        return a.fnc(t) ? t(e.target, e.id, e.total) : t
    }

    function L(t, e) {
        return t.getAttribute(e)
    }

    function E(t, e, n) {
        if (b([n, "deg", "rad", "turn"], T(e))) return e;
        var i = r.CSS[e + n];
        if (!a.und(i)) return i;
        var o = document.createElement(t.tagName),
            s = t.parentNode && t.parentNode !== document ? t.parentNode : document.body;
        s.appendChild(o), o.style.position = "absolute", o.style.width = 100 + n;
        var l = 100 / o.offsetWidth;
        s.removeChild(o);
        var c = l * parseFloat(e);
        return r.CSS[e + n] = c, c
    }

    function S(t, e, n) {
        if (e in t.style) {
            var r = e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
                i = t.style[e] || getComputedStyle(t).getPropertyValue(r) || "0";
            return n ? E(t, i, n) : i
        }
    }

    function C(t, e) {
        return a.dom(t) && !a.inp(t) && (!a.nil(L(t, e)) || a.svg(t) && t[e]) ? "attribute" : a.dom(t) && b(n, e) ? "transform" : a.dom(t) && "transform" !== e && S(t, e) ? "css" : null != t[e] ? "object" : void 0
    }

    function O(t) {
        if (a.dom(t)) {
            for (var e, n = t.style.transform || "", r = /(\w+)\(([^)]*)\)/g, i = new Map; e = r.exec(n);) i.set(e[1], e[2]);
            return i
        }
    }

    function M(t, e, n, r) {
        switch (C(t, e)) {
            case "transform":
                return function(t, e, n, r) {
                    var i, s = o(e, "scale") ? 1 : 0 + (o(i = e, "translate") || "perspective" === i ? "px" : o(i, "rotate") || o(i, "skew") ? "deg" : void 0),
                        a = O(t).get(e) || s;
                    return n && (n.transforms.list.set(e, a), n.transforms.last = e), r ? E(t, a, r) : a
                }(t, e, r, n);
            case "css":
                return S(t, e, n);
            case "attribute":
                return L(t, e);
            default:
                return t[e] || 0
        }
    }

    function P(t, e) {
        var n = /^(\*=|\+=|-=)/.exec(t);
        if (!n) return t;
        var r = T(t) || 0,
            i = parseFloat(e),
            o = parseFloat(t.replace(n[0], ""));
        switch (n[0][0]) {
            case "+":
                return i + o + r;
            case "-":
                return i - o + r;
            case "*":
                return i * o + r
        }
    }

    function D(t, e) {
        if (a.col(t)) return function(t) {
            return a.rgb(t) ? (n = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(e = t)) ? "rgba(" + n[1] + ",1)" : e : a.hex(t) ? (r = t.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (function(t, e, n, r) {
                return e + e + n + n + r + r
            })), i = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(r), "rgba(" + parseInt(i[1], 16) + "," + parseInt(i[2], 16) + "," + parseInt(i[3], 16) + ",1)") : a.hsl(t) ? function(t) {
                var e, n, r, i = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(t) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(t),
                    o = parseInt(i[1], 10) / 360,
                    s = parseInt(i[2], 10) / 100,
                    a = parseInt(i[3], 10) / 100,
                    l = i[4] || 1;

                function c(t, e, n) {
                    return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? t + 6 * (e - t) * n : n < .5 ? e : n < 2 / 3 ? t + (e - t) * (2 / 3 - n) * 6 : t
                }
                if (0 == s) e = n = r = a;
                else {
                    var u = a < .5 ? a * (1 + s) : a + s - a * s,
                        d = 2 * a - u;
                    e = c(d, u, o + 1 / 3), n = c(d, u, o), r = c(d, u, o - 1 / 3)
                }
                return "rgba(" + 255 * e + "," + 255 * n + "," + 255 * r + "," + l + ")"
            }(t) : void 0;
            var e, n, r, i
        }(t);
        if (/\s/g.test(t)) return t;
        var n = T(t),
            r = n ? t.substr(0, t.length - n.length) : t;
        return e ? r + e : r
    }

    function I(t, e) {
        return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2))
    }

    function N(t) {
        for (var e, n = t.points, r = 0, i = 0; i < n.numberOfItems; i++) {
            var o = n.getItem(i);
            i > 0 && (r += I(e, o)), e = o
        }
        return r
    }

    function z(t) {
        if (t.getTotalLength) return t.getTotalLength();
        switch (t.tagName.toLowerCase()) {
            case "circle":
                return o = t, 2 * Math.PI * L(o, "r");
            case "rect":
                return 2 * L(i = t, "width") + 2 * L(i, "height");
            case "line":
                return I({
                    x: L(r = t, "x1"),
                    y: L(r, "y1")
                }, {
                    x: L(r, "x2"),
                    y: L(r, "y2")
                });
            case "polyline":
                return N(t);
            case "polygon":
                return n = (e = t).points, N(e) + I(n.getItem(n.numberOfItems - 1), n.getItem(0))
        }
        var e, n, r, i, o
    }

    function q(t, e) {
        var n = e || {},
            r = n.el || function(t) {
                for (var e = t.parentNode; a.svg(e) && a.svg(e.parentNode);) e = e.parentNode;
                return e
            }(t),
            i = r.getBoundingClientRect(),
            o = L(r, "viewBox"),
            s = i.width,
            l = i.height,
            c = n.viewBox || (o ? o.split(" ") : [0, 0, s, l]);
        return {
            el: r,
            viewBox: c,
            x: c[0] / 1,
            y: c[1] / 1,
            w: s,
            h: l,
            vW: c[2],
            vH: c[3]
        }
    }

    function R(t, e, n) {
        function r(n) {
            void 0 === n && (n = 0);
            var r = e + n >= 1 ? e + n : 0;
            return t.el.getPointAtLength(r)
        }
        var i = q(t.el, t.svg),
            o = r(),
            s = r(-1),
            a = r(1),
            l = n ? 1 : i.w / i.vW,
            c = n ? 1 : i.h / i.vH;
        switch (t.property) {
            case "x":
                return (o.x - i.x) * l;
            case "y":
                return (o.y - i.y) * c;
            case "angle":
                return 180 * Math.atan2(a.y - s.y, a.x - s.x) / Math.PI
        }
    }

    function F(t, e) {
        var n = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g,
            r = D(a.pth(t) ? t.totalLength : t, e) + "";
        return {
            original: r,
            numbers: r.match(n) ? r.match(n).map(Number) : [0],
            strings: a.str(t) || e ? r.split(n) : []
        }
    }

    function B(t) {
        return _(t ? v(a.arr(t) ? t.map(y) : y(t)) : [], (function(t, e, n) {
            return n.indexOf(t) === e
        }))
    }

    function j(t) {
        var e = B(t);
        return e.map((function(t, n) {
            return {
                target: t,
                id: n,
                total: e.length,
                transforms: {
                    list: O(t)
                }
            }
        }))
    }

    function H(t, e) {
        var n = w(e);
        if (/^spring/.test(n.easing) && (n.duration = c(n.easing)), a.arr(t)) {
            var r = t.length;
            2 !== r || a.obj(t[0]) ? a.fnc(e.duration) || (n.duration = e.duration / r) : t = {
                value: t
            }
        }
        var i = a.arr(t) ? t : [t];
        return i.map((function(t, n) {
            var r = a.obj(t) && !a.pth(t) ? t : {
                value: t
            };
            return a.und(r.delay) && (r.delay = n ? 0 : e.delay), a.und(r.endDelay) && (r.endDelay = n === i.length - 1 ? e.endDelay : 0), r
        })).map((function(t) {
            return A(t, n)
        }))
    }

    function W(t, e) {
        var n = [],
            r = e.keyframes;
        for (var i in r && (e = A(function(t) {
                for (var e = _(v(t.map((function(t) {
                        return Object.keys(t)
                    }))), (function(t) {
                        return a.key(t)
                    })).reduce((function(t, e) {
                        return t.indexOf(e) < 0 && t.push(e), t
                    }), []), n = {}, r = function(r) {
                        var i = e[r];
                        n[i] = t.map((function(t) {
                            var e = {};
                            for (var n in t) a.key(n) ? n == i && (e.value = t[n]) : e[n] = t[n];
                            return e
                        }))
                    }, i = 0; i < e.length; i++) r(i);
                return n
            }(r), e)), e) a.key(i) && n.push({
            name: i,
            tweens: H(e[i], t)
        });
        return n
    }
    var X = {
        css: function(t, e, n) {
            return t.style[e] = n
        },
        attribute: function(t, e, n) {
            return t.setAttribute(e, n)
        },
        object: function(t, e, n) {
            return t[e] = n
        },
        transform: function(t, e, n, r, i) {
            if (r.list.set(e, n), e === r.last || i) {
                var o = "";
                r.list.forEach((function(t, e) {
                    o += e + "(" + t + ") "
                })), t.style.transform = o
            }
        }
    };

    function Y(t, e) {
        j(t).forEach((function(t) {
            for (var n in e) {
                var r = k(e[n], t),
                    i = t.target,
                    o = T(r),
                    s = M(i, n, o, t),
                    a = P(D(r, o || T(s)), s),
                    l = C(i, n);
                X[l](i, n, a, t.transforms, !0)
            }
        }))
    }

    function V(t, e) {
        return _(v(t.map((function(t) {
            return e.map((function(e) {
                return function(t, e) {
                    var n = C(t.target, e.name);
                    if (n) {
                        var r = function(t, e) {
                                var n;
                                return t.tweens.map((function(r) {
                                    var i = function(t, e) {
                                            var n = {};
                                            for (var r in t) {
                                                var i = k(t[r], e);
                                                a.arr(i) && 1 === (i = i.map((function(t) {
                                                    return k(t, e)
                                                }))).length && (i = i[0]), n[r] = i
                                            }
                                            return n.duration = parseFloat(n.duration), n.delay = parseFloat(n.delay), n
                                        }(r, e),
                                        o = i.value,
                                        s = a.arr(o) ? o[1] : o,
                                        l = T(s),
                                        c = M(e.target, t.name, l, e),
                                        u = n ? n.to.original : c,
                                        d = a.arr(o) ? o[0] : u,
                                        f = T(d) || T(c),
                                        h = l || f;
                                    return a.und(s) && (s = u), i.from = F(d, h), i.to = F(P(s, d), h), i.start = n ? n.end : 0, i.end = i.start + i.delay + i.duration + i.endDelay, i.easing = g(i.easing, i.duration), i.isPath = a.pth(o), i.isPathTargetInsideSVG = i.isPath && a.svg(e.target), i.isColor = a.col(i.from.original), i.isColor && (i.round = 1), n = i, i
                                }))
                            }(e, t),
                            i = r[r.length - 1];
                        return {
                            type: n,
                            property: e.name,
                            animatable: t,
                            tweens: r,
                            duration: i.end,
                            delay: r[0].delay,
                            endDelay: i.endDelay
                        }
                    }
                }(t, e)
            }))
        }))), (function(t) {
            return !a.und(t)
        }))
    }

    function $(t, e) {
        var n = t.length,
            r = function(t) {
                return t.timelineOffset ? t.timelineOffset : 0
            },
            i = {};
        return i.duration = n ? Math.max.apply(Math, t.map((function(t) {
            return r(t) + t.duration
        }))) : e.duration, i.delay = n ? Math.min.apply(Math, t.map((function(t) {
            return r(t) + t.delay
        }))) : e.delay, i.endDelay = n ? i.duration - Math.max.apply(Math, t.map((function(t) {
            return r(t) + t.duration - t.endDelay
        }))) : e.endDelay, i
    }
    var U = 0,
        Q = [],
        G = function() {
            var t;

            function e(n) {
                for (var r = Q.length, i = 0; i < r;) {
                    var o = Q[i];
                    o.paused ? (Q.splice(i, 1), r--) : (o.tick(n), i++)
                }
                t = i > 0 ? requestAnimationFrame(e) : void 0
            }
            return "undefined" != typeof document && document.addEventListener("visibilitychange", (function() {
                    Z.suspendWhenDocumentHidden && (K() ? t = cancelAnimationFrame(t) : (Q.forEach((function(t) {
                        return t._onDocumentVisibility()
                    })), G()))
                })),
                function() {
                    t || K() && Z.suspendWhenDocumentHidden || !(Q.length > 0) || (t = requestAnimationFrame(e))
                }
        }();

    function K() {
        return !!document && document.hidden
    }

    function Z(n) {
        void 0 === n && (n = {});
        var r, o = 0,
            s = 0,
            a = 0,
            l = 0,
            c = null;

        function u(t) {
            var e = window.Promise && new Promise((function(t) {
                return c = t
            }));
            return t.finished = e, e
        }
        var d, f, h, p, g, m, v, y, b = (f = x(t, d = n), p = W(h = x(e, d), d), v = $(m = V(g = j(d.targets), p), h), y = U, U++, A(f, {
            id: y,
            children: [],
            animatables: g,
            animations: m,
            duration: v.duration,
            delay: v.delay,
            endDelay: v.endDelay
        }));

        function w() {
            var t = b.direction;
            "alternate" !== t && (b.direction = "normal" !== t ? "normal" : "reverse"), b.reversed = !b.reversed, r.forEach((function(t) {
                return t.reversed = b.reversed
            }))
        }

        function T(t) {
            return b.reversed ? b.duration - t : t
        }

        function k() {
            o = 0, s = T(b.currentTime) * (1 / Z.speed)
        }

        function L(t, e) {
            e && e.seek(t - e.timelineOffset)
        }

        function E(t) {
            for (var e = 0, n = b.animations, r = n.length; e < r;) {
                var o = n[e],
                    s = o.animatable,
                    a = o.tweens,
                    l = a.length - 1,
                    c = a[l];
                l && (c = _(a, (function(e) {
                    return t < e.end
                }))[0] || c);
                for (var u = i(t - c.start - c.delay, 0, c.duration) / c.duration, d = isNaN(u) ? 1 : c.easing(u), f = c.to.strings, h = c.round, p = [], g = c.to.numbers.length, m = void 0, v = 0; v < g; v++) {
                    var y = void 0,
                        w = c.to.numbers[v],
                        x = c.from.numbers[v] || 0;
                    y = c.isPath ? R(c.value, d * w, c.isPathTargetInsideSVG) : x + d * (w - x), h && (c.isColor && v > 2 || (y = Math.round(y * h) / h)), p.push(y)
                }
                var A = f.length;
                if (A) {
                    m = f[0];
                    for (var T = 0; T < A; T++) {
                        f[T];
                        var k = f[T + 1],
                            L = p[T];
                        isNaN(L) || (m += k ? L + k : L + " ")
                    }
                } else m = p[0];
                X[o.type](s.target, o.property, m, s.transforms), o.currentValue = m, e++
            }
        }

        function S(t) {
            b[t] && !b.passThrough && b[t](b)
        }

        function C(t) {
            var e = b.duration,
                n = b.delay,
                d = e - b.endDelay,
                f = T(t);
            b.progress = i(f / e * 100, 0, 100), b.reversePlayback = f < b.currentTime, r && function(t) {
                if (b.reversePlayback)
                    for (var e = l; e--;) L(t, r[e]);
                else
                    for (var n = 0; n < l; n++) L(t, r[n])
            }(f), !b.began && b.currentTime > 0 && (b.began = !0, S("begin")), !b.loopBegan && b.currentTime > 0 && (b.loopBegan = !0, S("loopBegin")), f <= n && 0 !== b.currentTime && E(0), (f >= d && b.currentTime !== e || !e) && E(e), f > n && f < d ? (b.changeBegan || (b.changeBegan = !0, b.changeCompleted = !1, S("changeBegin")), S("change"), E(f)) : b.changeBegan && (b.changeCompleted = !0, b.changeBegan = !1, S("changeComplete")), b.currentTime = i(f, 0, e), b.began && S("update"), t >= e && (s = 0, b.remaining && !0 !== b.remaining && b.remaining--, b.remaining ? (o = a, S("loopComplete"), b.loopBegan = !1, "alternate" === b.direction && w()) : (b.paused = !0, b.completed || (b.completed = !0, S("loopComplete"), S("complete"), !b.passThrough && "Promise" in window && (c(), u(b)))))
        }
        return u(b), b.reset = function() {
            var t = b.direction;
            b.passThrough = !1, b.currentTime = 0, b.progress = 0, b.paused = !0, b.began = !1, b.loopBegan = !1, b.changeBegan = !1, b.completed = !1, b.changeCompleted = !1, b.reversePlayback = !1, b.reversed = "reverse" === t, b.remaining = b.loop, r = b.children;
            for (var e = l = r.length; e--;) b.children[e].reset();
            (b.reversed && !0 !== b.loop || "alternate" === t && 1 === b.loop) && b.remaining++, E(b.reversed ? b.duration : 0)
        }, b._onDocumentVisibility = k, b.set = function(t, e) {
            return Y(t, e), b
        }, b.tick = function(t) {
            a = t, o || (o = a), C((a + (s - o)) * Z.speed)
        }, b.seek = function(t) {
            C(T(t))
        }, b.pause = function() {
            b.paused = !0, k()
        }, b.play = function() {
            b.paused && (b.completed && b.reset(), b.paused = !1, Q.push(b), k(), G())
        }, b.reverse = function() {
            w(), b.completed = !b.reversed, k()
        }, b.restart = function() {
            b.reset(), b.play()
        }, b.remove = function(t) {
            tt(B(t), b)
        }, b.reset(), b.autoplay && b.play(), b
    }

    function J(t, e) {
        for (var n = e.length; n--;) b(t, e[n].animatable.target) && e.splice(n, 1)
    }

    function tt(t, e) {
        var n = e.animations,
            r = e.children;
        J(t, n);
        for (var i = r.length; i--;) {
            var o = r[i],
                s = o.animations;
            J(t, s), s.length || o.children.length || r.splice(i, 1)
        }
        n.length || r.length || e.pause()
    }
    return Z.version = "3.2.1", Z.speed = 1, Z.suspendWhenDocumentHidden = !0, Z.running = Q, Z.remove = function(t) {
        for (var e = B(t), n = Q.length; n--;) tt(e, Q[n])
    }, Z.get = M, Z.set = Y, Z.convertPx = E, Z.path = function(t, e) {
        var n = a.str(t) ? m(t)[0] : t,
            r = e || 100;
        return function(t) {
            return {
                property: t,
                el: n,
                svg: q(n),
                totalLength: z(n) * (r / 100)
            }
        }
    }, Z.setDashoffset = function(t) {
        var e = z(t);
        return t.setAttribute("stroke-dasharray", e), e
    }, Z.stagger = function(t, e) {
        void 0 === e && (e = {});
        var n = e.direction || "normal",
            r = e.easing ? g(e.easing) : null,
            i = e.grid,
            o = e.axis,
            s = e.from || 0,
            l = "first" === s,
            c = "center" === s,
            u = "last" === s,
            d = a.arr(t),
            f = d ? parseFloat(t[0]) : parseFloat(t),
            h = d ? parseFloat(t[1]) : 0,
            p = T(d ? t[1] : t) || 0,
            m = e.start || 0 + (d ? f : 0),
            _ = [],
            v = 0;
        return function(t, e, a) {
            if (l && (s = 0), c && (s = (a - 1) / 2), u && (s = a - 1), !_.length) {
                for (var g = 0; g < a; g++) {
                    if (i) {
                        var y = c ? (i[0] - 1) / 2 : s % i[0],
                            b = c ? (i[1] - 1) / 2 : Math.floor(s / i[0]),
                            w = y - g % i[0],
                            x = b - Math.floor(g / i[0]),
                            A = Math.sqrt(w * w + x * x);
                        "x" === o && (A = -w), "y" === o && (A = -x), _.push(A)
                    } else _.push(Math.abs(s - g));
                    v = Math.max.apply(Math, _)
                }
                r && (_ = _.map((function(t) {
                    return r(t / v) * v
                }))), "reverse" === n && (_ = _.map((function(t) {
                    return o ? t < 0 ? -1 * t : -t : Math.abs(v - t)
                })))
            }
            return m + (d ? (h - f) / v : f) * (Math.round(100 * _[e]) / 100) + p
        }
    }, Z.timeline = function(t) {
        void 0 === t && (t = {});
        var n = Z(t);
        return n.duration = 0, n.add = function(r, i) {
            var o = Q.indexOf(n),
                s = n.children;

            function l(t) {
                t.passThrough = !0
            }
            o > -1 && Q.splice(o, 1);
            for (var c = 0; c < s.length; c++) l(s[c]);
            var u = A(r, x(e, t));
            u.targets = u.targets || t.targets;
            var d = n.duration;
            u.autoplay = !1, u.direction = n.direction, u.timelineOffset = a.und(i) ? d : P(i, d), l(n), n.seek(u.timelineOffset);
            var f = Z(u);
            l(f), s.push(f);
            var h = $(s, t);
            return n.delay = h.delay, n.endDelay = h.endDelay, n.duration = h.duration, n.seek(0), n.reset(), n.autoplay && n.play(), n
        }, n
    }, Z.easing = g, Z.penner = p, Z.random = function(t, e) {
        return Math.floor(Math.random() * (e - t + 1)) + t
    }, Z
})), window.lazySizesConfig = window.lazySizesConfig || {}, window.lazySizesConfig.lazyClass = "lazy",
    function(t, e) {
        var n = function(t, e, n) {
            "use strict";
            var r, i;
            if (function() {
                    var e, n = {
                        lazyClass: "lazyload",
                        loadedClass: "lazyloaded",
                        loadingClass: "lazyloading",
                        preloadClass: "lazypreload",
                        errorClass: "lazyerror",
                        autosizesClass: "lazyautosizes",
                        fastLoadedClass: "ls-is-cached",
                        iframeLoadMode: 0,
                        srcAttr: "data-src",
                        srcsetAttr: "data-srcset",
                        sizesAttr: "data-sizes",
                        minSize: 40,
                        customMedia: {},
                        init: !0,
                        expFactor: 1.5,
                        hFac: .8,
                        loadMode: 2,
                        loadHidden: !0,
                        ricTimeout: 0,
                        throttleDelay: 125
                    };
                    for (e in i = t.lazySizesConfig || t.lazysizesConfig || {}, n) e in i || (i[e] = n[e])
                }(), !e || !e.getElementsByClassName) return {
                init: function() {},
                cfg: i,
                noSupport: !0
            };
            var o = e.documentElement,
                s = t.HTMLPictureElement,
                a = "addEventListener",
                l = "getAttribute",
                c = t[a].bind(t),
                u = t.setTimeout,
                d = t.requestAnimationFrame || u,
                f = t.requestIdleCallback,
                h = /^picture$/i,
                p = ["load", "error", "lazyincluded", "_lazyloaded"],
                g = {},
                m = Array.prototype.forEach,
                _ = function(t, e) {
                    return g[e] || (g[e] = new RegExp("(\\s|^)" + e + "(\\s|$)")), g[e].test(t[l]("class") || "") && g[e]
                },
                v = function(t, e) {
                    _(t, e) || t.setAttribute("class", (t[l]("class") || "").trim() + " " + e)
                },
                y = function(t, e) {
                    var n;
                    (n = _(t, e)) && t.setAttribute("class", (t[l]("class") || "").replace(n, " "))
                },
                b = function(t, e, n) {
                    var r = n ? a : "removeEventListener";
                    n && b(t, e), p.forEach((function(n) {
                        t[r](n, e)
                    }))
                },
                w = function(t, n, i, o, s) {
                    var a = e.createEvent("Event");
                    return i || (i = {}), i.instance = r, a.initEvent(n, !o, !s), a.detail = i, t.dispatchEvent(a), a
                },
                x = function(e, n) {
                    var r;
                    !s && (r = t.picturefill || i.pf) ? (n && n.src && !e[l]("srcset") && e.setAttribute("srcset", n.src), r({
                        reevaluate: !0,
                        elements: [e]
                    })) : n && n.src && (e.src = n.src)
                },
                A = function(t, e) {
                    return (getComputedStyle(t, null) || {})[e]
                },
                T = function(t, e, n) {
                    for (n = n || t.offsetWidth; n < i.minSize && e && !t._lazysizesWidth;) n = e.offsetWidth, e = e.parentNode;
                    return n
                },
                k = (vt = [], yt = [], bt = vt, wt = function() {
                    var t = bt;
                    for (bt = vt.length ? yt : vt, mt = !0, _t = !1; t.length;) t.shift()();
                    mt = !1
                }, xt = function(t, n) {
                    mt && !n ? t.apply(this, arguments) : (bt.push(t), _t || (_t = !0, (e.hidden ? u : d)(wt)))
                }, xt._lsFlush = wt, xt),
                L = function(t, e) {
                    return e ? function() {
                        k(t)
                    } : function() {
                        var e = this,
                            n = arguments;
                        k((function() {
                            t.apply(e, n)
                        }))
                    }
                },
                E = function(t) {
                    var e, r = 0,
                        o = i.throttleDelay,
                        s = i.ricTimeout,
                        a = function() {
                            e = !1, r = n.now(), t()
                        },
                        l = f && s > 49 ? function() {
                            f(a, {
                                timeout: s
                            }), s !== i.ricTimeout && (s = i.ricTimeout)
                        } : L((function() {
                            u(a)
                        }), !0);
                    return function(t) {
                        var i;
                        (t = !0 === t) && (s = 33), e || (e = !0, (i = o - (n.now() - r)) < 0 && (i = 0), t || i < 9 ? l() : u(l, i))
                    }
                },
                S = function(t) {
                    var e, r, i = 99,
                        o = function() {
                            e = null, t()
                        },
                        s = function() {
                            var t = n.now() - r;
                            t < i ? u(s, i - t) : (f || o)(o)
                        };
                    return function() {
                        r = n.now(), e || (e = u(s, i))
                    }
                },
                C = (U = /^img$/i, Q = /^iframe$/i, G = "onscroll" in t && !/(gle|ing)bot/.test(navigator.userAgent), K = 0, Z = 0, J = 0, tt = -1, et = function(t) {
                    J--, (!t || J < 0 || !t.target) && (J = 0)
                }, nt = function(t) {
                    return null == $ && ($ = "hidden" == A(e.body, "visibility")), $ || !("hidden" == A(t.parentNode, "visibility") && "hidden" == A(t, "visibility"))
                }, rt = function(t, n) {
                    var r, i = t,
                        s = nt(t);
                    for (W -= n, V += n, X -= n, Y += n; s && (i = i.offsetParent) && i != e.body && i != o;)(s = (A(i, "opacity") || 1) > 0) && "visible" != A(i, "overflow") && (r = i.getBoundingClientRect(), s = Y > r.left && X < r.right && V > r.top - 1 && W < r.bottom + 1);
                    return s
                }, it = function() {
                    var t, n, s, a, c, u, d, f, h, p, g, m, _ = r.elements;
                    if ((F = i.loadMode) && J < 8 && (t = _.length)) {
                        for (n = 0, tt++; n < t; n++)
                            if (_[n] && !_[n]._lazyRace)
                                if (!G || r.prematureUnveil && r.prematureUnveil(_[n])) ft(_[n]);
                                else if ((f = _[n][l]("data-expand")) && (u = 1 * f) || (u = Z), p || (p = !i.expand || i.expand < 1 ? o.clientHeight > 500 && o.clientWidth > 500 ? 500 : 370 : i.expand, r._defEx = p, g = p * i.expFactor, m = i.hFac, $ = null, Z < g && J < 1 && tt > 2 && F > 2 && !e.hidden ? (Z = g, tt = 0) : Z = F > 1 && tt > 1 && J < 6 ? p : K), h !== u && (j = innerWidth + u * m, H = innerHeight + u, d = -1 * u, h = u), s = _[n].getBoundingClientRect(), (V = s.bottom) >= d && (W = s.top) <= H && (Y = s.right) >= d * m && (X = s.left) <= j && (V || Y || X || W) && (i.loadHidden || nt(_[n])) && (q && J < 3 && !f && (F < 3 || tt < 4) || rt(_[n], u))) {
                            if (ft(_[n]), c = !0, J > 9) break
                        } else !c && q && !a && J < 4 && tt < 4 && F > 2 && (z[0] || i.preloadAfterLoad) && (z[0] || !f && (V || Y || X || W || "auto" != _[n][l](i.sizesAttr))) && (a = z[0] || _[n]);
                        a && !c && ft(a)
                    }
                }, ot = E(it), st = function(t) {
                    var e = t.target;
                    e._lazyCache ? delete e._lazyCache : (et(t), v(e, i.loadedClass), y(e, i.loadingClass), b(e, lt), w(e, "lazyloaded"))
                }, at = L(st), lt = function(t) {
                    at({
                        target: t.target
                    })
                }, ct = function(t, e) {
                    var n = t.getAttribute("data-load-mode") || i.iframeLoadMode;
                    0 == n ? t.contentWindow.location.replace(e) : 1 == n && (t.src = e)
                }, ut = function(t) {
                    var e, n = t[l](i.srcsetAttr);
                    (e = i.customMedia[t[l]("data-media") || t[l]("media")]) && t.setAttribute("media", e), n && t.setAttribute("srcset", n)
                }, dt = L((function(t, e, n, r, o) {
                    var s, a, c, d, f, p;
                    (f = w(t, "lazybeforeunveil", e)).defaultPrevented || (r && (n ? v(t, i.autosizesClass) : t.setAttribute("sizes", r)), a = t[l](i.srcsetAttr), s = t[l](i.srcAttr), o && (d = (c = t.parentNode) && h.test(c.nodeName || "")), p = e.firesLoad || "src" in t && (a || s || d), f = {
                        target: t
                    }, v(t, i.loadingClass), p && (clearTimeout(R), R = u(et, 2500), b(t, lt, !0)), d && m.call(c.getElementsByTagName("source"), ut), a ? t.setAttribute("srcset", a) : s && !d && (Q.test(t.nodeName) ? ct(t, s) : t.src = s), o && (a || d) && x(t, {
                        src: s
                    })), t._lazyRace && delete t._lazyRace, y(t, i.lazyClass), k((function() {
                        var e = t.complete && t.naturalWidth > 1;
                        p && !e || (e && v(t, i.fastLoadedClass), st(f), t._lazyCache = !0, u((function() {
                            "_lazyCache" in t && delete t._lazyCache
                        }), 9)), "lazy" == t.loading && J--
                    }), !0)
                })), ft = function(t) {
                    if (!t._lazyRace) {
                        var e, n = U.test(t.nodeName),
                            r = n && (t[l](i.sizesAttr) || t[l]("sizes")),
                            o = "auto" == r;
                        (!o && q || !n || !t[l]("src") && !t.srcset || t.complete || _(t, i.errorClass) || !_(t, i.lazyClass)) && (e = w(t, "lazyunveilread").detail, o && O.updateElem(t, !0, t.offsetWidth), t._lazyRace = !0, J++, dt(t, e, o, r, n))
                    }
                }, ht = S((function() {
                    i.loadMode = 3, ot()
                })), pt = function() {
                    3 == i.loadMode && (i.loadMode = 2), ht()
                }, gt = function() {
                    q || (n.now() - B < 999 ? u(gt, 999) : (q = !0, i.loadMode = 3, ot(), c("scroll", pt, !0)))
                }, {
                    _: function() {
                        B = n.now(), r.elements = e.getElementsByClassName(i.lazyClass), z = e.getElementsByClassName(i.lazyClass + " " + i.preloadClass), c("scroll", ot, !0), c("resize", ot, !0), c("pageshow", (function(t) {
                            if (t.persisted) {
                                var n = e.querySelectorAll("." + i.loadingClass);
                                n.length && n.forEach && d((function() {
                                    n.forEach((function(t) {
                                        t.complete && ft(t)
                                    }))
                                }))
                            }
                        })), t.MutationObserver ? new MutationObserver(ot).observe(o, {
                            childList: !0,
                            subtree: !0,
                            attributes: !0
                        }) : (o[a]("DOMNodeInserted", ot, !0), o[a]("DOMAttrModified", ot, !0), setInterval(ot, 999)), c("hashchange", ot, !0), ["focus", "mouseover", "click", "load", "transitionend", "animationend"].forEach((function(t) {
                            e[a](t, ot, !0)
                        })), /d$|^c/.test(e.readyState) ? gt() : (c("load", gt), e[a]("DOMContentLoaded", ot), u(gt, 2e4)), r.elements.length ? (it(), k._lsFlush()) : ot()
                    },
                    checkElems: ot,
                    unveil: ft,
                    _aLSL: pt
                }),
                O = (D = L((function(t, e, n, r) {
                    var i, o, s;
                    if (t._lazysizesWidth = r, r += "px", t.setAttribute("sizes", r), h.test(e.nodeName || ""))
                        for (o = 0, s = (i = e.getElementsByTagName("source")).length; o < s; o++) i[o].setAttribute("sizes", r);
                    n.detail.dataAttr || x(t, n.detail)
                })), I = function(t, e, n) {
                    var r, i = t.parentNode;
                    i && (n = T(t, i, n), (r = w(t, "lazybeforesizes", {
                        width: n,
                        dataAttr: !!e
                    })).defaultPrevented || (n = r.detail.width) && n !== t._lazysizesWidth && D(t, i, r, n))
                }, N = S((function() {
                    var t, e = P.length;
                    if (e)
                        for (t = 0; t < e; t++) I(P[t])
                })), {
                    _: function() {
                        P = e.getElementsByClassName(i.autosizesClass), c("resize", N)
                    },
                    checkElems: N,
                    updateElem: I
                }),
                M = function() {
                    !M.i && e.getElementsByClassName && (M.i = !0, O._(), C._())
                };
            var P, D, I, N;
            var z, q, R, F, B, j, H, W, X, Y, V, $, U, Q, G, K, Z, J, tt, et, nt, rt, it, ot, st, at, lt, ct, ut, dt, ft, ht, pt, gt;
            var mt, _t, vt, yt, bt, wt, xt;
            return u((function() {
                i.init && M()
            })), r = {
                cfg: i,
                autoSizer: O,
                loader: C,
                init: M,
                uP: x,
                aC: v,
                rC: y,
                hC: _,
                fire: w,
                gW: T,
                rAF: k
            }
        }(t, t.document, Date);
        t.lazySizes = n, "object" == typeof module && module.exports && (module.exports = n)
    }("undefined" != typeof window ? window : {}), document.addEventListener("lazybeforeunveil", (function(t) {
        var e = t.target.getAttribute("data-bg");
        e && (t.target.style.backgroundImage = "url(" + e + ")")
    }));
var Layout = {
    Status: {
        isInit: !0
    },
    Actions: {
        init: function() {
            Layout.Actions.checkTheme(), Layout.Actions.setHeader(), Layout.Actions.listenModals(), Layout.Actions.phoneActions.listenDropdownItems(), Layout.Actions.countryActions.listenDropdownItems(), Layout.Actions.checkConfirmationSuccess(), Layout.Actions.handleSubmissionFormSubmit(), Layout.Actions.checkCookies(), Layout.Status.isInit = !1, window.onscroll = function() {
                Layout.Actions.initScrollTopButton(), Layout.Actions.observeItems()
            }
        },
        initScrollTopButton: function() {
            var t = document.getElementById("scroll-top");
            window.scrollY > window.innerHeight ? t.style.display = "block" : t.style.display = "none", t.addEventListener("click", (t => {
                t.preventDefault(), document.body.scrollTop = 0, document.documentElement.scrollTop = 0
            }))
        },
        observeItems: function() {
            var observingItems = document.querySelectorAll("[data-observe-scroll]");
            for (let i = 0; i < observingItems.length; i++) {
                const element = observingItems[i];
                var top = element.getBoundingClientRect().top;
                if (top <= window.innerHeight) {
                    element.classList.add("on-screen");
                    var triggerOnscreenFunc = element.getAttribute("data-onscreen-func");
                    triggerOnscreenFunc && eval(triggerOnscreenFunc + "()")
                } else element.classList.remove("on-screen")
            }
        },
        checkCookies: function() {
            "true" !== localStorage.getItem("cookie") && document.querySelector(".cookie-container").classList.remove("d-none")
        },
        acceptCookies: function() {
            localStorage.setItem("cookie", "true"), document.querySelector(".cookie-container").style.opacity = "0", setTimeout((function() {
                document.querySelector(".cookie-container").classList.add("d-none")
            }), 550)
        },
        checkTheme: function() {
            var t = document.querySelector("html"),
                e = localStorage.getItem("theme");
            if (e) "dark" === e ? (t.classList.remove("theme-light"), t.classList.add("theme-dark"), Layout.Actions.changeTheme()) : (t.classList.remove("theme-dark"), t.classList.add("theme-light"), Layout.Actions.changeTheme());
            else {
                var n = t.classList.contains("theme-dark");
                localStorage.setItem("theme", n ? "dark" : "light"), Layout.Actions.changeTheme()
            }
        },
        toggleTheme: function() {
            var t = localStorage.getItem("theme");
            localStorage.setItem("theme", "dark" === t ? "light" : "dark");
            var e = document.querySelector("html"),
                n = "dark" === t ? "theme-dark" : "theme-light",
                r = "dark" === t ? "theme-light" : "theme-dark";
            e.classList.remove(n), e.classList.add(r), Layout.Actions.changeTheme()
        },
        changeTheme: function() {
            for (var t = "dark" === localStorage.getItem("theme"), e = t ? "data-dark-src" : "data-light-src", n = document.querySelectorAll("img[data-light-src][data-dark-src]"), r = document.querySelectorAll("[data-light-bg][data-dark-bg]"), i = 0; i < n.length; i++) {
                var o = n[i];
                Layout.Status.isInit ? o.setAttribute("data-src", o.getAttribute(e)) : (o.setAttribute("data-src", o.getAttribute(e)), o.setAttribute("src", o.getAttribute(e)))
            }
            e = t ? "data-dark-bg" : "data-light-bg";
            for (i = 0; i < r.length; i++) {
                o = r[i];
                Layout.Status.isInit ? (o.setAttribute("data-bg", o.getAttribute(e)), "A" === o.tagName && (o.style.backgroundImage = "url('" + o.getAttribute(e) + "')")) : (o.setAttribute("data-bg", o.getAttribute(e)), o.style.backgroundImage = "url('" + o.getAttribute(e) + "')")
            }
            var s = document.querySelectorAll("[data-theme-hidden='dark']"),
                a = document.querySelectorAll("[data-theme-hidden='light']");
            for (i = 0; i < s.length; i++) {
                o = s[i];
                t ? o.classList.remove("d-none") : o.classList.add("d-none")
            }
            for (i = 0; i < a.length; i++) {
                o = a[i];
                t ? o.classList.add("d-none") : o.classList.remove("d-none")
            }
        },
        setHeader: function() {
            document.querySelectorAll(".navbar-toggler").forEach((function(t) {
                t.addEventListener("click", (function(e) {
                    t.classList.toggle("focused"), t.classList.toggle("collapsed"), document.querySelector(".toggle-menu").classList.toggle("focused"), document.querySelector("#navbar-overlay").classList.toggle("show"), document.body.classList.toggle("no-scroll");
                    window.matchMedia("(max-width: 1200px)").matches && ( document.querySelector(".product-menu").classList.remove("focused"), document.querySelector("#navbar-overlay-2").classList.remove("show"), document.body.classList.remove("no-scroll-menu"))
                }))
             }))
            //document.querySelectorAll(".navbar-app-toggler").forEach((function(t) {
            //     t.addEventListener("click", (function(e) {
            //         t.classList.toggle("collapsed"), document.querySelector(".product-menu").classList.toggle("focused"), document.querySelector("#navbar-overlay-2").classList.toggle("show"), document.body.classList.toggle("no-scroll-menu");
            //         window.matchMedia("(max-width: 1200px)").matches && (document.querySelector(".navbar-toggler").classList.remove("collapsed"), document.querySelector(".toggle-menu").classList.remove("focused"), document.querySelector(".navbar-collapse").classList.remove("show"), document.querySelector("#navbar-overlay").classList.remove("show"), document.body.classList.remove("no-scroll"))
            //     }))
            // }))
            , document.querySelector("#navbar-overlay") && document.querySelector("#navbar-overlay").addEventListener("click", (function(t) {
                document.querySelector(".collapsed").click()
            })), document.querySelector("#navbar-overlay-2") && document.querySelector("#navbar-overlay-2").addEventListener("click", (function(t) {
                document.querySelector(".collapsed").click()
            })), document.querySelectorAll(".header .dropdown-menu").forEach((function(t) {
                t.addEventListener("click", (function(t) {
                    t.stopPropagation()
                }))
            })), window.innerWidth < 992 && (document.querySelectorAll(".navbar .dropdown").forEach((function(t) {
                t.addEventListener("hidden.bs.dropdown", (function() {
                    this.querySelectorAll(".submenu").forEach((function(t) {
                        t.style.display = "none"
                    }))
                }))
            })), document.querySelectorAll(".header .dropdown-menu a").forEach((function(t) {
                t.addEventListener("click", (function(t) {
                    let e = this.nextElementSibling;
                    e && e.classList.contains("submenu") && (t.preventDefault(), "block" == e.style.display ? e.style.display = "none" : e.style.display = "block")
                }))
            })))
        },
        listenModals: function() {
            var t = document.querySelectorAll(".modal");
            for (let n = 0; n < t.length; n++) {
                var e = t[n];
                e.addEventListener("hidden.bs.modal", (t => {
                    document.querySelector("html").classList.remove("noscroll"), document.querySelector(".modal .was-validated") && document.querySelector(".modal .was-validated").classList.remove("was-validated")
                })), e.addEventListener("shown.bs.modal", (t => {
                    document.querySelector("html").classList.add("noscroll")
                }))
            }
        },
        checkConfirmationSuccess: function() {
            const t = new URLSearchParams(window.location.search);
            t.get("confirmation"), t.get("h")
        },
        handleSubmissionFormSubmit: function() {
            const t = document.querySelectorAll("#subscribe_form");
            t.length > 0 && t.forEach((t => {
                t.addEventListener("submit", (function(e) {
                    if (t.classList.add("was-validated"), e.preventDefault(), e.stopPropagation(), t.checkValidity()) {
                        const e = window.location.pathname,
                            n = new XMLHttpRequest;
                        n.open("POST", t.getAttribute("data-action-url"), !0), n.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), n.setRequestHeader("X-CSRF-Token", document.querySelector('meta[name="csrf-token"]').getAttribute("content")), n.send("_token=" + document.querySelector('meta[name="csrf-token"]').getAttribute("content") + "&email=" + document.getElementById("subscribe_email").value + "&page=" + e), n.onload = function() {
                            var e = JSON.parse(n.response);
                            200 === n.status && (showModal(e.title, e.message, e.className), t.classList.remove("was-validated"), document.getElementById("subscribe_email").value = "")
                        }
                    }
                }), !1)
            }))
        },
        phoneActions: {
            listenDropdownItems: function() {
                document.querySelectorAll(".input-group-phone-dropdown .dropdown-item").forEach((function(t) {
                    t.addEventListener("click", (function(t) {
                        var e = findAncestor(t.target, ".dropdown"),
                            n = e.querySelector(".dropdown-toggle img"),
                            r = e.querySelector(".dropdown-toggle span"),
                            i = e.querySelector("input[name='countryCode']");
                        n.setAttribute("src", findAncestor(t.target, "[data-flag]").getAttribute("data-flag")), r.innerText = findAncestor(t.target, "[data-code]").getAttribute("data-code"), i.value = findAncestor(t.target, "[data-code]").getAttribute("data-code")
                    }))
                }))
            },
            checkPhoneValidation: function(t) {
                var e = findAncestor(t, ".phone-dropdown-container");
                t.value ? e.classList.remove("invalid") : e.classList.add("invalid")
            },
            countrySearch: function(t) {
                var e = findAncestor(t, ".dropdown-menu").querySelectorAll("[data-country]");
                for (let s = 0; s < e.length; s++) {
                    var n = e[s],
                        r = n.getAttribute("data-country").toLocaleLowerCase(),
                        i = n.getAttribute("data-code").toLocaleLowerCase(),
                        o = t.value.toLocaleLowerCase().trim();
                    "" === o || r.includes(o) || i.includes(o) ? n.classList.remove("d-none") : n.classList.add("d-none")
                }
            }
        },
        countryActions: {
            listenDropdownItems: function() {
                document.querySelectorAll(".input-group-country-select .dropdown-item").forEach((function(t) {
                    t.addEventListener("click", (function(t) {
                        var e = findAncestor(t.target, ".input-group-country-select");
                        e.querySelector(".selected-country-name").innerText = findAncestor(t.target, "[data-country]").getAttribute("data-country"), e.querySelector("input[data-dropdown-hidden]").value = findAncestor(t.target, "[data-country]").getAttribute("data-id"), Layout.Actions.countryActions.checkValidation(findAncestor(t.target, "form"))
                    }))
                }))
            },
            countrySearch: function(t) {
                var e = findAncestor(t, ".dropdown-menu").querySelectorAll("[data-country]");
                for (let o = 0; o < e.length; o++) {
                    var n = e[o],
                        r = n.getAttribute("data-country").toLocaleLowerCase(),
                        i = t.value.toLocaleLowerCase().trim();
                    "" === i || r.includes(i) ? n.classList.remove("d-none") : n.classList.add("d-none")
                }
            },
            checkValidation: function(t) {
                var e = t.querySelectorAll("[data-dropdown-hidden]");
                for (let t = 0; t < e.length; t++) {
                    const r = e[t];
                    var n = findAncestor(r, ".input-group-country-select");
                    r.value ? n.classList.remove("invalid") : n.classList.add("invalid")
                }
            }
        },
        guide: {
            status: {
                scrolling: null,
                typing: null,
                getNextPage: !1,
                fetching: !1,
                filtering: null
            },
            filter: {
                currentPage: 1,
                isLastPage: !1,
                searchParam: "",
                tags: ""
            },
            handleSearch: function() {
                null !== Layout.Actions.guide.status.typing && clearTimeout(Layout.Actions.guide.status.typing), Layout.Actions.guide.status.typing = setTimeout((function() {
                    var t = document.getElementById("guide-search-input");
                    if (t.setAttribute("value", t.value), Layout.Actions.guide.filter.searchParam = t.value, t.value.length > 1 || 0 === t.value.length) {
                        Layout.Actions.guide.filter.currentPage = 1, Layout.Actions.guide.getSearchResults();
                        var e = document.querySelector(".all-topic-title"),
                            n = document.querySelector(".results-title"),
                            r = document.querySelector(".tab-menu-wrapper");
                        t.value ? (e.classList.add("d-none"), n.classList.remove("d-none"), r.classList.add("d-none")) : (e.classList.remove("d-none"), n.classList.add("d-none"), r.classList.remove("d-none"))
                    }
                }), 1e3)
            },
            clearSearch: function() {
                document.getElementById("guide-search-input").value = "", Layout.Actions.guide.handleSearch()
            },
            getSearchResults: function() {
                if (!Layout.Actions.guide.status.fetching) {
                    Layout.Actions.guide.status.fetching = !0;
                    var t = document.querySelector("#guide-results"),
                        e = document.querySelector("#spinner div");
                    t.style.opacity = "0.8", e.classList.remove("d-none");
                    var n = t.getAttribute("data-action-url") + "?q=" + Layout.Actions.guide.filter.searchParam + "&p=" + Layout.Actions.guide.filter.currentPage;
                    Layout.Actions.guide.filter.tags && (n = n + "&tags=" + Layout.Actions.guide.filter.tags), setTimeout((function() {
                        const r = new XMLHttpRequest;
                        r.open("GET", n, !0), r.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), r.setRequestHeader("X-CSRF-Token", document.querySelector('meta[name="csrf-token"]').getAttribute("content")), r.send(), r.onload = function() {
                            Layout.Actions.guide.status.fetching = !1, t.style.opacity = "1", e.classList.add("d-none");
                            var n = JSON.parse(r.response);
                            if (n.status) {
                                var i = document.querySelector(".result-count"),
                                    o = document.querySelector(".not-result-section");
                                i.innerText = n.total, Layout.Actions.guide.filter.isLastPage = n.isLastPage, Layout.Actions.guide.filter.currentPage = n.currentPage, Layout.Actions.guide.status.getNextPage ? t.innerHTML += n.htmlContent : t.innerHTML = n.htmlContent, n.htmlContent ? o.classList.add("d-none") : o.classList.remove("d-none"), Layout.Actions.changeTheme(), Layout.Actions.guide.status.getNextPage = !1
                            }
                        }
                    }), 1e3)
                }
            },
            getNextPage: function() {
                null !== Layout.Actions.guide.status.scrolling && clearTimeout(Layout.Actions.guide.status.scrolling), Layout.Actions.guide.status.scrolling = setTimeout((function() {
                    Layout.Actions.guide.status.getNextPage = !0, Layout.Actions.guide.filter.currentPage += 1, Layout.Actions.guide.getSearchResults()
                }), 50)
            },
            selectAll: function() {
                var t = document.querySelectorAll('#tags-container input[type="checkbox"]:not(#all)');
                for (let e = 0; e < t.length; e++) t[e].checked = document.getElementById("all").checked;
                Layout.Actions.guide.handleFilter()
            },
            handleFilter: function() {
                null !== Layout.Actions.guide.status.filtering && clearTimeout(Layout.Actions.guide.status.filtering), Layout.Actions.guide.status.filtering = setTimeout((function() {
                    Layout.Actions.guide.filter.currentPage = 1;
                    var t = [],
                        e = document.querySelectorAll('#tags-container input[type="checkbox"]:checked:not(#all)');
                    for (let n = 0; n < e.length; n++) t.push(e[n].value);
                    var n = document.querySelectorAll('#tags-container input[type="checkbox"]:not(#all)');
                    document.getElementById("all").checked = n.length === e.length, Layout.Actions.guide.filter.tags = t.join(","), Layout.Actions.guide.getSearchResults()
                }), 50)
            },
            onScroll: function() {
                window.onscroll = function() {
                    var t = document.querySelector("#spinner");
                    Layout.Actions.guide.status.fetching || Layout.Actions.guide.filter.isLastPage || !isScrolledIntoView(t) || Layout.Actions.guide.getNextPage()
                }
            }
        },
        news: {
            status: {
                scrolling: null,
                typing: null,
                getNextPage: !1,
                fetching: !1,
                filtering: null
            },
            filter: {
                currentPage: 1,
                isLastPage: !1,
                searchParam: "",
                tags: ""
            },
            handleSearch: function() {
                null !== Layout.Actions.news.status.typing && clearTimeout(Layout.Actions.news.status.typing), Layout.Actions.news.status.typing = setTimeout((function() {
                    var t = document.getElementById("news-search-input");
                    t.setAttribute("value", t.value), Layout.Actions.news.filter.searchParam = t.value, (t.value.length > 1 || 0 === t.value.length) && (Layout.Actions.news.filter.currentPage = 1, Layout.Actions.news.getSearchResults())
                }), 1e3)
            },
            clearSearch: function() {
                document.getElementById("news-search-input").value = "", Layout.Actions.news.handleSearch()
            },
            getSearchResults: function() {
                if (!Layout.Actions.news.status.fetching) {
                    Layout.Actions.news.status.fetching = !0;
                    var t = document.querySelector("#news-results"),
                        e = document.querySelector("#spinner div");
                    t.style.opacity = "0.8", e.classList.remove("d-none");
                    var n = t.getAttribute("data-action-url") + "?q=" + Layout.Actions.news.filter.searchParam + "&p=" + Layout.Actions.news.filter.currentPage + "&s=5";
                    Layout.Actions.news.filter.tags && (n = n + "&tags=" + Layout.Actions.news.filter.tags), setTimeout((function() {
                        const r = new XMLHttpRequest;
                        r.open("GET", n, !0), r.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), r.setRequestHeader("X-CSRF-Token", document.querySelector('meta[name="csrf-token"]').getAttribute("content")), r.send(), r.onload = function() {
                            Layout.Actions.news.status.fetching = !1, t.style.opacity = "1", e.classList.add("d-none");
                            var n = JSON.parse(r.response);
                            if (n.status) {
                                var i = document.querySelector(".not-result-section");
                                Layout.Actions.news.filter.isLastPage = n.isLastPage, Layout.Actions.news.filter.currentPage = n.currentPage, Layout.Actions.news.status.getNextPage ? t.innerHTML += n.htmlContent : t.innerHTML = n.htmlContent, n.htmlContent ? i.classList.add("d-none") : i.classList.remove("d-none"), Layout.Actions.changeTheme(), Layout.Actions.news.status.getNextPage = !n.isLastPage
                            }
                        }
                    }), 1e3)
                }
            },
            getNextPage: function() {
                null !== Layout.Actions.news.status.scrolling && clearTimeout(Layout.Actions.news.status.scrolling), Layout.Actions.news.status.scrolling = setTimeout((function() {
                    Layout.Actions.news.status.getNextPage = !0, Layout.Actions.news.filter.currentPage += 1, Layout.Actions.news.getSearchResults()
                }), 50)
            },
            selectAll: function() {
                var t = document.querySelectorAll('#tags-container input[type="checkbox"]:not(#all)');
                for (let e = 0; e < t.length; e++) t[e].checked = document.getElementById("all").checked;
                Layout.Actions.news.handleFilter()
            },
            handleFilter: function() {
                null !== Layout.Actions.news.status.filtering && clearTimeout(Layout.Actions.news.status.filtering), Layout.Actions.news.status.filtering = setTimeout((function() {
                    Layout.Actions.news.filter.currentPage = 1;
                    var t = [],
                        e = document.querySelectorAll('#tags-container input[type="checkbox"]:checked:not(#all)');
                    for (let n = 0; n < e.length; n++) t.push(e[n].value);
                    var n = document.querySelectorAll('#tags-container input[type="checkbox"]:not(#all)');
                    document.getElementById("all").checked = n.length === e.length, Layout.Actions.news.filter.tags = t.join(","), Layout.Actions.news.getSearchResults()
                }), 50)
            },
            onScroll: function() {
                window.onscroll = function() {
                    var t = document.querySelector("#spinner");
                    !Layout.Actions.news.status.fetching && !Layout.Actions.news.filter.isLastPage && Layout.Actions.news.status.getNextPage && isScrolledIntoView(t) && Layout.Actions.news.getNextPage()
                }
            }
        },
        blog: {
            status: {
                scrolling: null,
                typing: null,
                getNextPage: !1,
                fetching: !1,
                filtering: null
            },
            filter: {
                currentPage: 1,
                isLastPage: !1,
                searchParam: "",
                tags: ""
            },
            handleSearch: function() {
                null !== Layout.Actions.blog.status.typing && clearTimeout(Layout.Actions.blog.status.typing), Layout.Actions.blog.status.typing = setTimeout((function() {
                    var t = document.getElementById("blog-search-input");
                    if (t.setAttribute("value", t.value), Layout.Actions.blog.filter.searchParam = t.value, t.value.length > 1 || 0 === t.value.length) {
                        Layout.Actions.blog.filter.currentPage = 1, Layout.Actions.blog.getSearchResults();
                        var e = document.querySelector(".all-topic-title"),
                            n = document.querySelector(".results-title");
                        t.value ? (e.classList.add("d-none"), n.classList.remove("d-none")) : (e.classList.remove("d-none"), n.classList.add("d-none"))
                    }
                }), 1e3)
            },
            clearSearch: function() {
                document.getElementById("blog-search-input").value = "", Layout.Actions.blog.handleSearch()
            },
            getSearchResults: function() {
                if (!Layout.Actions.blog.status.fetching) {
                    Layout.Actions.blog.status.fetching = !0;
                    var t = document.querySelector("#blog-results"),
                        e = document.querySelector("#spinner div");
                    t.style.opacity = "0.8", e.classList.remove("d-none");
                    var n = t.getAttribute("data-action-url") + "?q=" + Layout.Actions.blog.filter.searchParam + "&p=" + Layout.Actions.blog.filter.currentPage;
                    Layout.Actions.blog.filter.tags && (n = n + "&tags=" + Layout.Actions.blog.filter.tags), setTimeout((function() {
                        const r = new XMLHttpRequest;
                        r.open("GET", n, !0), r.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), r.setRequestHeader("X-CSRF-Token", document.querySelector('meta[name="csrf-token"]').getAttribute("content")), r.send(), r.onload = function() {
                            Layout.Actions.blog.status.fetching = !1, t.style.opacity = "1", e.classList.add("d-none");
                            var n = JSON.parse(r.response);
                            if (n.status) {
                                var i = document.querySelector(".result-count"),
                                    o = document.querySelector(".not-result-section");
                                i.innerText = n.total, Layout.Actions.blog.filter.isLastPage = n.isLastPage, Layout.Actions.blog.filter.currentPage = n.currentPage, Layout.Actions.blog.status.getNextPage ? t.innerHTML += n.htmlContent : t.innerHTML = n.htmlContent, n.htmlContent ? o.classList.add("d-none") : o.classList.remove("d-none"), Layout.Actions.changeTheme(), Layout.Actions.blog.status.getNextPage = !1
                            }
                        }
                    }), 1e3)
                }
            },
            getNextPage: function() {
                null !== Layout.Actions.blog.status.scrolling && clearTimeout(Layout.Actions.blog.status.scrolling), Layout.Actions.blog.status.scrolling = setTimeout((function() {
                    Layout.Actions.blog.status.getNextPage = !0, Layout.Actions.blog.filter.currentPage += 1, Layout.Actions.blog.getSearchResults()
                }), 50)
            },
            selectAll: function() {
                var t = document.querySelectorAll('#tags-container input[type="checkbox"]:not(#all)');
                for (let e = 0; e < t.length; e++) t[e].checked = document.getElementById("all").checked;
                Layout.Actions.blog.handleFilter()
            },
            handleFilter: function() {
                null !== Layout.Actions.blog.status.filtering && clearTimeout(Layout.Actions.blog.status.filtering), Layout.Actions.blog.status.filtering = setTimeout((function() {
                    Layout.Actions.blog.filter.currentPage = 1;
                    var t = [],
                        e = document.querySelectorAll('#tags-container input[type="checkbox"]:checked:not(#all)');
                    for (let n = 0; n < e.length; n++) t.push(e[n].value);
                    var n = document.querySelectorAll('#tags-container input[type="checkbox"]:not(#all)');
                    document.getElementById("all").checked = n.length === e.length, Layout.Actions.blog.filter.tags = t.join(","), Layout.Actions.blog.getSearchResults()
                }), 50)
            },
            onScroll: function() {
                window.onscroll = function() {
                    var t = document.querySelector("#spinner");
                    Layout.Actions.blog.status.fetching || Layout.Actions.blog.filter.isLastPage || !isScrolledIntoView(t) || Layout.Actions.blog.getNextPage()
                }
            }
        }
    }
};

function findAncestor(t, e) {
    for (Element.prototype.matches || (Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function(t) {
            for (var e = (this.document || this.ownerDocument).querySelectorAll(t), n = e.length; --n >= 0 && e.item(n) !== this;) return n > -1
        }); t && t !== document; t = t.parentNode)
        if (t.matches(e)) return t;
    return null
}

function isScrolledIntoView(t) {
    var e = t.getBoundingClientRect(),
        n = e.top,
        r = e.bottom;
    return n >= 0 && r <= window.innerHeight
}

function showModal(t, e, n) {
    const r = new bootstrap.Modal(document.getElementById("response-modal"));
    document.querySelector("#response-modal .title").innerText = t, document.querySelector("#response-modal .desc").innerText = e, document.querySelector("#response-modal .modal-content").setAttribute("class", "modal-content " + n), r.show()
}

function animateFrom(t, e) {
    var n = 0,
        r = 100 * (e = e || 1),
        i = 1;
    t.classList.contains("anim_reveal_left") ? (n = -100, r = 0) : t.classList.contains("anim_reveal_right") ? (n = 100, r = 0) : t.classList.contains("anim_reveal_zoom") && (i = 0), t.style.transform = "translate(" + n + "px, " + r + "px)", t.style.opacity = "0", gsap.fromTo(t, {
        x: n,
        y: r,
        scale: i,
        autoAlpha: 0
    }, {
        duration: 3,
        x: 0,
        y: 0,
        scale: 1,
        autoAlpha: 1,
        ease: "expo",
        overwrite: "auto"
    })
}

function hide(t) {
    gsap.set(t, {
        autoAlpha: 0
    })
}

function checkSafari() {
    var t = navigator.userAgent.toLowerCase(); - 1 != t.indexOf("safari") && (t.indexOf("chrome") > -1 || document.querySelector("body").classList.add("safari"))
}
Layout.Actions.init(), window.addEventListener("load", (t => {
    gsap.utils.toArray(".anim_reveal").forEach((function(t) {
        hide(t), ScrollTrigger.create({
            trigger: t,
            start: "top bottom-=20%",
            once: !0,
            onEnter: function(e) {
                animateFrom(t)
            }
        })
    })), ScrollTrigger.create({
        trigger: "[data-count-up]",
        start: "top bottom-=20%",
        once: !0,
        onEnter: function(t) {
            runCountUpAnimations()
        }
    })
})), checkSafari();
const animationDuration = 2500,
    frameDuration = 1e3 / 60,
    totalFrames = Math.round(animationDuration / frameDuration),
    easeOutQuad = t => t * (2 - t);

function animateCountUp(t) {
    let e = 0;
    const n = parseInt(t.getAttribute("data-count-up"), 10),
        r = setInterval((() => {
            e++;
            const i = easeOutQuad(e / totalFrames),
                o = Math.round(n * i);
            parseInt(t.innerHTML, 10) !== o && (t.innerHTML = o.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")), e === totalFrames && clearInterval(r)
        }), frameDuration)
}

function runCountUpAnimations() {
    const t = document.querySelectorAll("[data-count-up]");
    for (let e = 0; e < t.length; e++) {
        animateCountUp(t[e])
    }
}

function animateFrom(t, e) {
    var n = 0,
        r = 100 * (e = e || 1),
        i = 1;
    t.classList.contains("anim_reveal_left") ? (n = -100, r = 0) : t.classList.contains("anim_reveal_right") ? (n = 100, r = 0) : t.classList.contains("anim_reveal_zoom") && (i = 0), t.style.transform = "translate(" + n + "px, " + r + "px)", t.style.opacity = "0", gsap.fromTo(t, {
        x: n,
        y: r,
        scale: i,
        autoAlpha: 0
    }, {
        duration: 3,
        x: 0,
        y: 0,
        scale: 1,
        autoAlpha: 1,
        ease: "expo",
        overwrite: "auto"
    })
}

function hide(t) {
    gsap.set(t, {
        autoAlpha: 0
    })
}
gsap.registerPlugin(ScrollTrigger), window.addEventListener("load", (t => {
    const e = gsap.timeline();
    e.from(".hero-card-2-new", {
        y: 50
    }, "-=0.5"), e.from(".hero-card-2", {
        y: 100
    }, "-=0.3"), ScrollTrigger.create({
        trigger: ".hero-card-2-new",
        animation: e,
        start: "center bottom-=30%",
        end: "bottom top",
        scrub: 1
    }), gsap.timeline({
        scrollTrigger: {
            trigger: ".hero-section-3",
            start: "top bottom-=50%",
            once: !0
        }
    }).from(".hero-card-3", {
        x: 50,
        y: 50,
        opacity: 0
    });
    const n = gsap.timeline();
    gsap.set(".rect", {
        backdropFilter: "blur(10px)"
    }), n.from(".block-1,.block-2,.block-3,.tower-rects,.hero-tower-shape", {
        y: 80,
        opacity: 1,
        duration: 2
    }), n.to(".block-1,.block-2,.block-3,.tower-rects,.hero-tower-shape", {
        y: 30,
        duration: 2,
        repeat: -1,
        yoyo: !0
    }), n.from(".hero-form > *", {
        y: 50,
        duration: 2,
        opacity: 0,
        repeat: 0,
        stagger: {
            from: "start",
            each: .2
        }
    }, "0.3"), gsap.matchMedia().add("(min-width: 768px)", (() => {
        gsap.timeline({
            scrollTrigger: {
                trigger: ".hero-left",
                start: "top bottom-=100px",
                once: !0
            }
        }).to(".hero-press-btn", {
            x: 113,
            y: 63
        }).from(".hero-left-shadows, .hero-left-light", {
            duration: 1,
            opacity: 0
        })
    }));
    gsap.timeline({
        scrollTrigger: {
            trigger: ".hero-section-3",
            start: "top bottom",
            end: "end-=60%",
            scrub: .5
        }
    }), gsap.timeline({
        scrollTrigger: {
            trigger: ".hero-section-3",
            start: "top bottom-=20%",
            scrub: 1
        }
    });
    let r = gsap.timeline({
        scrollTrigger: {
            trigger: ".hero-spotlight-inner",
            start: "top bottom-=30%",
            once: !0
        }
    });
    r.from(".hero-spotlight-btns", {
        x: -50,
        opacity: 0
    }), r.from(".hero-spotlight-search", {
        x: -50,
        y: 50,
        opacity: 0
    }, "-=0.3"), r.from(".hero-spotlight-results", {
        x: -50,
        opacity: 0,
        y: 50
    });
    let i = gsap.timeline({
        scrollTrigger: {
            trigger: ".hero-card-2-inner",
            start: "top bottom-=30%",
            once: !0
        }
    });
    i.from(".hero-card-2-back", {
        y: 100,
        opacity: 0
    }), i.from(".hero-card-2-front", {
        opacity: 0,
        y: 50
    }, "-=0.3"), i.from(".hero-card-2-avatar", {
        opacity: 0,
        x: 50,
        scale: .5
    }, "-=0.3");
    let o = gsap.timeline({
        scrollTrigger: {
            trigger: ".mobile-cta",
            start: "top bottom-=40%",
            end: "bottom center",
            scrub: 1
        }
    }, "-=0.3");
    o.from(".mobile-store-lights", {
        opacity: 0
    }, "<+=0.1"), o.from(".mobile-block", {
        x: -180,
        y: 90
    }), o.from(".apple-store-lights", {
        opacity: 0
    }, "-=0.7");
    let s = gsap.timeline();
    s.from(".mobile-center-img", {
        y: 30,
        opacity: 1,
        duration: 2
    }), s.to(".mobile-center-img", {
        y: 30,
        duration: 2,
        repeat: -1,
        yoyo: !0,
        ease: "sine.inOut"
    });
    let a = gsap.timeline({
        scrollTrigger: {
            trigger: ".airdrop-cta",
            start: "top bottom",
            end: "bottom top",
            scrub: 1
        }
    });
    a.fromTo(".airdrop-cta-bg", {
        x: 200,
        y: 200
    }, {
        x: 400,
        y: -200
    }), a.to(".coin-top", {
        ease: "power1.inOut",
        x: 50,
        y: 850,
        rotation: 360
    }, "<"), a.to(".coin-left", {
        x: 150,
        y: 440,
        rotation: -180,
        ease: "power1.inOut"
    }, "<"), a.to(".coin-right", {
        ease: "power1.inOut",
        xPercent: -25,
        yPercent: -269,
        rotation: 90
    }, "<"), gsap.utils.toArray(".anim_reveal").forEach((function(t) {
        hide(t), ScrollTrigger.create({
            trigger: t,
            start: "top bottom-=20%",
            once: !0,
            onEnter: function(e) {
                animateFrom(t)
            }
        })
    }))
}));