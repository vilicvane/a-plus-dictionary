/* Copyright 2011 Google Inc. All Rights Reserved. */
(function () {
    var d = !1,
        e, f, g, h, k, l, m, n, p, autoAudioCheckbox, r = function () {
            var a = {};
            a.language = g.options[g.selectedIndex].value;
            a.autoAudio = autoAudioCheckbox.checked ? "true" : "false";
            a.popupDblclick = h.checked ? "true" : "false";
            a.popupSelect = m.checked ? "true" : "false";
            a.popupDblclickKey = l.options[l.selectedIndex].value;
            a.popupSelectKey = p.options[p.selectedIndex].value;
            a.enableHttps = "true";
            chrome.storage.sync.set({ options: a });
            var b = document.getElementById("save_status");
            b.style.setProperty("-webkit-transition", "opacity 0s ease-in");
            b.style.opacity = 1;
            window.setTimeout(function () {
                b.style.setProperty("-webkit-transition",
                    "opacity 0.5s ease-in");
                b.style.opacity = 0
            }, 1E3);
            q(d);
            chrome.extension.getBackgroundPage()["gdx.updateOptions"]()
        }, v = function () {
            q(d);
            chrome.storage.sync.get("options", function (data) {
                var a = data.options || JSON.parse(window.localStorage.options);

                s(g, a.language);
                h.checked = "true" == a.popupDblclick;
                t();
                m.checked = "true" == a.popupSelect;
                u();
                autoAudioCheckbox.checked = "true" == a.autoAudio;
                s(l, a.popupDblclickKey);
                s(p, a.popupSelectKey)
            });
        }, s = function (a, b) {
            for (var c = 0, x = a.options.length; c < x; c++)
                if (a.options[c].value == b) {
                    a.options[c].selected = !0;
                    break
                }
        }, q = function (a) {
            e.disabled = !a;
            f.disabled = !a
        }, w = function () {
            q(!0)
        }, t = function () {
            var a =
                h.checked;
            l.disabled = !a;
            k.className = a ? "" : "text_disabled"
        }, u = function () {
            var a = m.checked;
            p.disabled = !a;
            n.className = a ? "" : "text_disabled"
        };
    (function () {
        e = document.getElementById("save_button");
        f = document.getElementById("reset_button");
        g = document.getElementById("language_selector");
        autoAudioCheckbox = document.getElementById("auto_audio_checkbox")
        h = document.getElementById("popup_dblclick_checkbox");
        k = document.getElementById("popup_dblclick_text");
        l = document.getElementById("popup_dblclick_key");
        m = document.getElementById("popup_select_checkbox");
        n = document.getElementById("popup_select_text");
        p = document.getElementById("popup_select_key");
        e.addEventListener("click", r, d);
        f.addEventListener("click", v, d);
        h.addEventListener("change", function () {
            t()
        }, d);
        m.addEventListener("change", function () {
            u()
        }, d);
        for (var a = document.getElementsByTagName("input"), b = 0, c; c = a[b]; b++) c.addEventListener("change", w, d);
        a = document.getElementsByTagName("select");
        for (b = 0; c = a[b]; b++) c.addEventListener("change", w, d); -1 != window.navigator.platform.toLowerCase().indexOf("mac") && (document.getElementById("popup_dblclick_key_ctrl").innerHTML = "Command", document.getElementById("popup_select_key_ctrl").innerHTML = "Command");
        v()
    })();
})();