/* Copyright 2011 Google Inc. All Rights Reserved. */
(function () {
    var d = !0,
        e = null,
        g = !1,
        l, m = function (a) {
            return a.replace(/^\s+|\s+$/g, "")
        }, r = function (a, b) {
            return function () {
                return b.apply(a, arguments)
            }
        }, s = function (a) {
            if (a && a.tagName) {
                var b = a.tagName.toLowerCase();
                if ("input" == b || "textarea" == b) return d
            }
            if (document.designMode && "on" == document.designMode.toLowerCase()) return d;
            for (; a; a = a.parentNode)
                if (a.isContentEditable) return d;
            return g
        }, u = /[0-9A-Za-z]/,
        D = function () {
            chrome.extension.sendMessage({
                type: "initialize"
            }, r(this, function (a) {
                this.C = a.instanceId;
                a = document.createElement("div");
                var b = document.createElement("a");
                b.target = "_blank";
                this.s = a.cloneNode(g);
                this.p = document.createElement("audio");
                this.p.M = d;
                this.c = a.cloneNode(g);
                this.c.id = "gdx-bubble-container";
                this.a = a.cloneNode(g);
                this.a.id = "gdx-bubble-main";
                this.c.appendChild(this.a);
                this.b = a.cloneNode(g);
                this.b.id = "gdx-bubble-query-container";
                this.q = a.cloneNode(g);
                this.q.id = "gdx-bubble-query";
                this.l = a.cloneNode(g);
                this.l.id = "gdx-bubble-audio-icon";
                var c = a.cloneNode(g);
                c.id = "gdx-bubble-query-container-end";
                this.b.appendChild(this.q);
                this.b.appendChild(this.l);
                this.b.appendChild(c);
                this.h = a.cloneNode(g);
                this.h.id = "gdx-bubble-meaning";
                this.e = a.cloneNode(g);
                this.e.id = "gdx-bubble-options-tip";
                this.e.innerHTML = y;
                this.i = a.cloneNode(g);
                this.i.id = "gdx-bubble-more";
                this.g = b.cloneNode(g);
                this.i.appendChild(this.g);
                this.d = a.cloneNode(g);
                this.d.id = "gdx-bubble-attribution";
                this.k = b.cloneNode(g);
                this.o = a.cloneNode(g);
                this.d.appendChild(this.k);
                this.d.appendChild(this.o);
                this.r = a.cloneNode(g);
                this.r.id = "gdx-bubble-close";
                this.a.appendChild(this.r);
                this.a.appendChild(this.b);
                this.a.appendChild(this.h);
                this.a.appendChild(this.e);
                this.a.appendChild(this.d);
                this.a.appendChild(this.i);
                this.n = a.cloneNode(g);
                this.n.id = "gdx-arrow-container";
                this.c.appendChild(this.n);
                this.F = z(a, "up");
                this.D = z(a, "down");
                this.B = r(this, this.K);
                this.t = r(this, this.G);
                this.u = r(this, this.H);
                this.w = r(this, this.f);
                this.A = r(this, this.J);
                this.v = r(this, this.I);
                A("mouseup", this.B, document);
                A("click", this.t, document);
                A("dblclick", this.u, document);
                A("resize", this.w, window);
                A("keydown",
                    this.A, document);
                A("click", r(this.p, this.p.play), this.l);
                chrome.extension.onMessage.addListener(C);
                chrome.extension.onMessage.addListener(this.v)
            }))
        }, E = [],
        y = "Tip: Didn't want this definition pop-up? Try setting a trigger key in <a href=\"" + chrome.extension.getURL("options.html") + '" target="_blank">Extension Options</a>.';
    l = D.prototype;
    l.m = 0;
    l.s = e;
    l.p = e;
    l.c = e;
    l.a = e;
    l.b = e;
    l.q = e;
    l.l = e;
    l.h = e;
    l.e = e;
    l.r = e;
    l.i = e;
    l.g = e;
    l.d = e;
    l.k = e;
    l.o = e;
    l.n = e;
    l.F = e;
    l.D = e;
    l.j = e;
    l.B = e;
    l.t = e;
    l.u = e;
    l.w = e;
    l.A = e;
    l.v = e;
    var A = function (a, b, c) {
        document.addEventListener ? c.addEventListener(a, b, g) : c.attachEvent("on" + a, b)
    }, F = function (a, b, c) {
        document.removeEventListener ? c.removeEventListener(a, b, g) : c.detachEvent("on" + a, b)
    }, G = function (a) {
        F("mouseup", a.B, document);
        F("click", a.t, document);
        F("dblclick", a.u, document);
        F("resize", a.w, window);
        F("keydown", a.A, document);
        chrome.extension.onMessage.removeListener(C);
        chrome.extension.onMessage.removeListener(a.v);
        a.f()
    }, z = function (a, b) {
        var c = a.cloneNode(g),
            h = a.cloneNode(g),
            f = a.cloneNode(g);
        c.id = "gdx-arrow-main";
        "up" == b ? (h.id = "gdx-bubble-arrow-inner-up", f.id = "gdx-bubble-arrow-outer-up") : (h.id = "gdx-bubble-arrow-inner-down", f.id = "gdx-bubble-arrow-outer-down");
        c.appendChild(h);
        c.appendChild(f);
        return c
    }, H = function (a, b, c, h) {
        this.left = a;
        this.top = b;
        this.right = c;
        this.bottom = h
    }, J = function (a) {
        a.a.style.left = "0";
        a.a.style.top = "0";
        var b = a.a.offsetWidth,
            c = a.a.offsetHeight,
            h = [self.pageXOffset, self.pageYOffset],
            f = [a.j.left + h[0], a.j.top + h[1]],
            k = a.j.bottom - a.j.top,
            t = f[0] + (a.j.right - a.j.left) / 2,
            h = document.documentElement.offsetWidth +
                document.body.scrollLeft,
            B = document.body.scrollLeft,
            p = t - b / 2;
        p + b > h && (p = h - b);
        p < B && (p = B);
        var w = f[1] - c - 12 + 2,
            q = f[1] + k + 12 - 2;
        a: if (b = new H(p, w, p + b, w + c), b.top < document.body.scrollTop) b = g;
        else {
            for (var c = document.getElementsByTagName("embed"), I = document.getElementsByTagName("object"), x = [self.pageXOffset, self.pageYOffset], v = 0, N = c.length + I.length; v < N; v++) {
                var n = (v < c.length ? c[v] : I[v - c.length]).getBoundingClientRect(),
                    n = new H(n.left + x[0], n.top + x[1], n.right + x[0], n.bottom + x[1]);
                if (b.bottom > n.top && n.bottom > b.top &&
                    b.left < n.right && n.left < b.right) {
                    b = g;
                    break a
                }
            }
            b = d
        }
        b ? (q = a.D, q.style.top = f[1] - 12 + "px") : (w = q, q = a.F, q.style.top = f[1] + k + "px");
        f = t - 12;
        q.style.left = f + "px";
        f - 5 > B && f + 24 + 5 < h && a.n.appendChild(q);
        a.a.style.top = w + "px";
        a.a.style.left = p + "px"
    };
    D.prototype.L = function (a) {
        if (a.eventKey == this.m) {
            this.f();
            this.l.className = "gdx-display-none";
            this.e.className = "gdx-display-none";
            this.i.className = "gdx-display-block";
            this.d.className = "gdx-display-none";
            this.c.className = "gdx-status-loaded";
            if (a.meaningObj) {
                var b = a.meaningObj;
                this.b.className = "gdx-display-block";
                this.q.innerHTML = b.prettyQuery;
                this.h.innerHTML = b.meaningText;
                b.audio && (this.p.src = b.audio, this.l.className = "gdx-display-block");
                this.g.href = b.moreUrl;
                this.g.innerHTML = "More »";
                b.attribution && ("translation" == b.type ? (this.o.innerHTML =
                        b.attribution, this.k.className = "gdx-display-none", this.o.className = "gdx-display-inline") : (this.s.innerHTML = b.attribution, b = this.s.getElementsByTagName("a")[0], this.k.href = b.href, this.k.innerHTML = b.innerHTML.replace("http://", ""), this.k.className = "gdx-display-inline", this.o.className = "gdx-display-none"), this.d.className = "gdx-display-block")
            }
            else this.b.className = "gdx-display-none", this.h.innerHTML = "No definition found.", this.g.href = "http://www.google.com/search?q=" + encodeURIComponent(a.sanitizedQuery),
            this.g.innerHTML = 'Search »';
            a.showOptionsTip && (this.e.className = "gdx-display-block");
            document.documentElement.appendChild(this.c);
            J(this)
        }
    };
    var K = function (a, b) {
        b == a.m && (a.h.innerHTML = "Dictionary is disabled for https pages.", a.g.href = "http://support.google.com/TODO", a.g.innerHTML = "More information »", a.i.className = "gdx-display-block", a.b.className = "gdx-display-none", a.e.className = "gdx-display-none", a.d.className = "gdx-display-none", document.documentElement.appendChild(a.c), J(a))
    }, L = function (a, b) {
        var c = b.getBoundingClientRect();
        a.j = new H(c.left, c.top, c.right, c.bottom)
    };
    D.prototype.f = function () {
        this.m++;
        var a = this.c;
        a && a.parentNode && a.parentNode.removeChild(a);
        for (a = this.n; a && a.hasChildNodes() ;) a.removeChild(a.childNodes[0])
    };
    D.prototype.J = function (a) {
        27 == a.keyCode && this.f()
    };
    var M = function (a, b) {
        return "none" == b || "alt" == b && a.altKey || "ctrl" == b && (-1 != window.navigator.platform.toLowerCase().indexOf("mac") ? a.metaKey : a.ctrlKey) || "shift" == b && a.shiftKey
    }, O = function (a, b) {
        for (var c = b.target; c; c = c.parentNode)
            if (c == a.c) return d;
        return g
    }, P = function (a, b, c, h) {
        var f;
        "mouseup" == c ? f = "true" == h.popupSelect && M(b, h.popupSelectKey) : "dblclick" == c ? f = "true" == h.popupSelect && M(b, h.popupSelectKey) ? g : "true" == h.popupDblclick && M(b, h.popupDblclickKey) : (console.log("Unexpected eventType: " + c), f = g);
        if (f) {
            f =
                0;
            for (var k = E.length; f < k; f++)
                if (location.href.match(E[f])) return;
            if (!s(b.target) && (f = e, k = "", window.getSelection ? (k = window.getSelection(), f = k.getRangeAt(0), k = m(k.toString())) : document.selection && (f = document.selection.createRange(), k = m(f.text)), k && !(1 == k.length && 127 >= k.charCodeAt(0) && !k.match(u)) && !("dblclick" == c && -1 != k.indexOf(" ")))) {
                a.m++;
                var t = a.m;
                O(a, b) || L(a, f);
                "false" == h.enableHttps && 0 == location.href.lastIndexOf("https", 0) ? K(a, t) : (window.setTimeout(r(a, function () {
                    t == this.m && (this.h.innerHTML =
                        "Searching...", this.c.className = "", this.b.className = "gdx-display-none", this.e.className = "gdx-display-none", this.i.className = "gdx-display-none", this.d.className = "gdx-display-none", document.documentElement.appendChild(this.c), J(this))
                }), 300), chrome.extension.sendMessage({
                    type: "fetch_raw",
                    eventKey: t,
                    instanceId: a.C,
                    query: k
                }, r(a, a.L)))
            }
        }
    };
    D.prototype.K = function (a) {
        var b = a.target;
        if (O(this, a))
            if (b == this.r) this.f();
            else {
                if ("a" == b.tagName.toLowerCase()) return
            }
        else this.f();
        chrome.extension.sendMessage({
            type: "options"
        }, r(this, function (b) {
            P(this, a, "mouseup", b.options)
        }))
    };
    D.prototype.G = function (a) {
        var b = a.target;
        O(this, a) && "a" == b.tagName.toLowerCase() && this.f()
    };
    D.prototype.H = function (a) {
        chrome.extension.sendMessage({
            type: "options"
        }, r(this, function (b) {
            P(this, a, "dblclick", b.options)
        }))
    };
    var C = function (a, b, c) {
        "get_selection" == a.type && (a = m(window.getSelection().toString())) && c({
            selection: a
        })
    };
    D.prototype.I = function (a) {
        "hide" == a.type && a.instanceId == this.C && this.f()
    };
    window._dictBubbleInstance && G(window._dictBubbleInstance);
    window._gdxBubbleInstance && G(window._gdxBubbleInstance);
    window.gdxBubbleInstance && G(window.gdxBubbleInstance);
    window.gdxBubbleInstance = new D;
})();