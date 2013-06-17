/* Copyright 2011 Google Inc. All Rights Reserved. */

(function () {
    var audio = document.createElement("audio");

    var b = null,
        c = 0,
        d = b,
        e = b,
        f = b,
        h = b,
        k = b,
        l = b,
        m = function (a) {
            a.target = "_blank";
            a.addEventListener("click", function () {
                window.close()
            }, !1)
        }, q = function () {
            var a;
            if (a = e.value.replace(/^\s+|\s+$/g, "")) e.blur(), f.innerHTML = "Searching...", f.style.display = "block", h.style.display = "none", k.style.display = "none", l.style.display = "none", d.disabled = !0, c++, chrome.extension.sendMessage(
                {
                    type: "fetch_html",
                    eventKey: c,
                    query: a
                }, n)
        }, n = function (a) {
            if (a.eventKey == c) {
                if (a.html) {
                    l.innerHTML = a.html;
                    var p = l.getElementsByTagName("span");
                    a = 0;
                    for (var g; g =
                        p[a]; a++) ("dct-lnk" == g.className || "dct-rlnk" == g.className) && g.addEventListener("click", function () {
                            e.value = this.title ? this.title : this.innerHTML;
                            q()
                        }, !1);
                    p = l.getElementsByTagName("a");
                    for (a = 0; g = p[a]; a++) m(g);
                    f.style.display = "none";
                    l.style.display = "block";

                    var audioBt = document.getElementsByClassName("translate-audio")[0];

                    if (audioBt) {
                        audio.src = audioBt.getAttribute("data-audio");
                        chrome.storage.sync.get("options", function (data) {
                            if (data.options.autoAudio == "true") {
                                audio.play();
                            }
                        });
                        audioBt.onclick = function () {
                            audio.play();
                        };
                    }
                }
                else f.innerHTML = "No definition found.", f.style.display = "block", h.href = "http://www.google.com/search?q=" + a.sanitizedQuery, h.innerHTML = 'Search the web for "' + a.sanitizedQuery + '" »', h.style.display = "block";
                d.disabled = !1
                l.scrollTop = 0;
            }
        }, d = document.getElementById("button"),
        e = document.getElementById("query-field");
    e.focus();

    e.addEventListener("mousedown", function (ev) {
        if (document.activeElement != e) {
            ev.preventDefault();
            e.focus();
        }
    });

    e.addEventListener("focus", function (ev) {
        e.select();
    });

    document.addEventListener("keydown", function (ev) {
        if (document.activeElement == e) {
            return;
        }

        if (ev.keyCode == 13 && document.activeElement != d) {
            //e.value = "";
            e.focus();
        }
        else if (ev.keyCode == 8) {
            e.focus();
            var l = e.value.length;
            e.setSelectionRange(l, l);
        }
        else if (!ev.ctrlKey && !ev.metaKey || ev.keyCode == 86) {
            e.focus();
        }
    }, true);

    f = document.getElementById("lookup-status");
    h = document.getElementById("web-search-link");
    m(h);
    k = document.getElementById("usage-tip");
    l = document.getElementById("meaning");
    m(document.getElementById("options-link"));
    d.addEventListener("click", q, !1);
    e.addEventListener("keydown", function (a) {
        13 == a.keyCode && q()
    }, true);
    k.innerHTML = "Tip: Select text on any webpage, then click the A+ Dictionary button to view the definition of your selection.";
    k.style.display = "block";
    chrome.tabs.getSelected(b, function (a) {
        chrome.tabs.sendMessage(a.id,
            {
                type: "get_selection"
            }, function (a) {
                a.selection && (e.value = a.selection, q())
            })
    });
})();