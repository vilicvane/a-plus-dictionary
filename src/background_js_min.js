/* Copyright 2011 Google Inc. All Rights Reserved. */
(function () {
    var h = !0,
        k = null,
        m = !1,
        n = RegExp("<[^>]*>", "g"),
        q = RegExp("[<>]", "g"),
        s = "\" ' ( ) , - . / 1 2 2012 : ? a about and are as be but com for from have i in is it like may more my next not of on search that the this to was when with you your".split(" "),
        t = {}, w = 0,
        x = -1,
        y = -1,
        z = function (a) {
            a = a.replace(n, "");
            a = a.replace(q, "");
            return a = a.substring(0, 100)
                .toLowerCase()
        }, A = function (a, c) {
            for (var b = 0, d = a.length; b < d; b++)
                if (c == a[b]) return true;
            return false;
        }, B = function () {
            chrome.storage.sync.get("options", function (data) {
                t = data.options;
            });
        }, C = function (a,
            c, b) {
            "initialize" == a.type && (a = {
                instanceId: w++
            }, b(a))
        }, D = function (a, c, b) {
            "options" == a.type && b({
                options: t
            })
        }, G = function (a, c, b) {
            if (!("fetch_raw" != a.type && "fetch_html" != a.type)) {
                //_gaq && _gaq.push(["_trackEvent", "lookup", a.type]);
                -1 != x && y != a.instanceId && chrome.tabs.sendMessage(x, {
                    type: "hide",
                    instanceId: y
                });
                "fetch_raw" == a.type ? (x = c.tab.id, y = a.instanceId) : y = x = -1;
                c = z(a.query);
                var d = {
                    request: a,
                    sanitizedQuery: c,
                    dictResponse: k,
                    translateResponse: k,
                    numResponses: 0,
                    callback: b
                };
                b = "pr,de";
                "fetch_html" == a.type && (b = "pr,de,sy");
                google.language.define(c, t.language, t.language, function (a) {
                    E(a, "dict", d);
                    if ("en" == t.language) {
                        var data = H(a);
                        F((data && data.prettyQuery || c).replace(/·/g, ""), function (a) {
                            E(a, "translate", d)
                        }, t.language);
                    }
                }, {
                    restricts: b
                });
                "en" != t.language && google.language.define(c, "en", "en", function (a) {
                    E(a, "enDict", d);
                    var data = H(a);
                    F((data && data.prettyQuery || c).replace(/·/g, ""), function (a) {
                        E(a, "translate", d)
                    }, d.request.type == "fetch_raw" ? t.language: "");
                }, {
                    restricts: b
                });
                chrome.tabs.getSelected(k, function (a) {
                    var b = window.setTimeout(function () {
                        E({
                            lang: "unknown"
                        }, "tabLang", d)
                    }, 800);
                    chrome.tabs.detectLanguage(a.id, function (a) {
                        window.clearTimeout(b);
                        E({
                            lang: a
                        }, "tabLang", d)
                    })
                });
                return h
            }
        }, F = function (a, c, lang) {
            var b = new XMLHttpRequest;
            b.open("GET", "https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=auto&tl=" +
                (lang || t.language) + "&q=" + encodeURIComponent(a), h);
            b.onreadystatechange = function () {
                if (4 == b.readyState) try {
                    var data = JSON.parse(b.responseText);
                    if (lang || data.src.substr(0, 2) != t.language.substr(0, 2)) {
                        c(data);
                    }
                    else {
                        F(a, c, "en");
                    }
                }
                catch (a) {
                    c(k)
                }
            };
            b.send()
        }, E = function (a, c, b) {
            //alert(JSON.stringify(a, null, "  "));
            if ("dict" == c) b.dictResponse = a;
            else if ("enDict" == c) b.enDictResponse = a;
            else if ("translate" == c) b.translateResponse = a;
            else {
                if (b.tabLang) return;
                b.tabLang = "he" == a.lang ? "iw" : a.lang
            }
            a = 3;
            "en" != t.language && (a = 4);
            b.numResponses++;

            if (b.numResponses == a) {
                var d = c = H(b.dictResponse);
                "en" != t.language && (d = H(b.enDictResponse));
                var e = I(b.translateResponse, h);

                var preMT = "";
                if (d) {
                    if (d.phonetic) {
                        preMT += '<span class="gdx-bubble-phonetic">' + d.phonetic + "</span>";
                    }
                    if (d.partOfSpeech) {
                        preMT += '<span class="gdx-bubble-part-of-speech">' + d.partOfSpeech + "</span>";
                    }
                }

                if (e) {
                    //e.meaningText = preMT + e.meaningText;
                    if ("en" != t.language && d) {
                        e.meaningText += d.meaningText;
                    }
                }

                a = null;
                if (b.translateResponse && b.translateResponse.ld_result && (a = b.translateResponse.ld_result.srclangs))
                    for (var f = 0, l = a.length; f < l; f++) a[f] = a[f].toLowerCase();

                //if ("fetch_html" == b.request.type) {
                //    l = false;
                //    if (!c || "licensedDef" != c.type) {
                //        //alert("here");

                //        var f = t.language.toLowerCase(),
                //            g = e && e.srcLang.toLowerCase() != f;
                //        if (g && a && !A(a, f) || !c && g)
                //            l = true;
                //        //alert([g, a, !A(a, f), c, g]);
                //    }
                //}
                //else {
                //    l = true;
                //}

                var query = d && d.prettyQuery || b.sanitizedQuery;

                !c && !e && (a = "none");
                //_gaq && _gaq.push(["_trackEvent", "lookup", "type_" + a]);

                a = "http://translate.google.com/translate_t?source=dict-chrome-ex&sl=auto&tl=" + t.language + "&q=" + encodeURIComponent(b.sanitizedQuery);
                f = "http://www.google.com/search?source=dict-chrome-ex&defl=" + t.language + "&hl=" + t.language + "&q=" + encodeURIComponent(b.sanitizedQuery) + "&tbo=1&tbs=dfn:1";

                var dObj = d;

                if ("fetch_html" == b.request.type) {
                    //if (true)
                    c = b.translateResponse;
                    d = I(c, m);

                    var limit = 10;

                    e = "";

                    if (c && c.dict && 0 < c.dict.length) {
                        e = '<h3 class="dct-tl">Translated Definitions</h3>';
                        f = 0;
                        for (l = c.dict.length; f < l; f++) {
                            for (var g = c.dict[f], e = e + (g.pos ? "<b>" + g.pos + "</b>" : "") + "<ol>",
                                    p = 0, r = g.terms.length; p < r && p < limit; p++) {
                                var u = g.terms[p];
                                0 < u.length && (e += "<li>" + u + "</li>")
                            }
                            e += "</ol>"
                        }
                    }
                    else if (d) {
                        e = '<h3 class="dct-tl">Translated Definitions</h3>' + d.meaningText;
                    }

                    var dR = t.language == "en" ? b.dictResponse : b.enDictResponse;

                    //if (!dR.primaries && !dR.webDefinitions) {
                    //    dR = b.dictResponse;
                    //}

                    var html = getDefinitionHtml("primaries", limit);

                    dR = b.dictResponse;

                    if (!dR.primaries && !dR.webDefinitions) {
                        dR = b.enDictResponse;
                    }

                    var webHtml = getDefinitionHtml("webDefinitions", limit);

                    function getDefinitionHtml(type, limit) {
                        if (arguments.length < 2) {
                            limit = Infinity;
                        }

                        var html = "";

                        if (!dR || !dR[type]) {
                            return html;
                        }
                        //

                        var meanings = [];

                        for (var c = 0, b; b = dR[type][c]; c++) {

                            //var phonetic;
                            //if (phonetic = J(b.terms, "phonetic")) {
                            //    meaningText += '<span class="gdx-phonetic">' + phonetic + "</span>";
                            //}

                            var meaningHtml = "";

                            var count = limit;

                            for (var d = 0, e; e = b.entries[d]; d++) {
                                if (e.terms && 0 < e.terms.length && "meaning" == e.type) {
                                    var f = J(e.terms, "text");
                                    if (f) {
                                        meaningHtml += "<li>" + f + J(e.terms, "url") + "</li>";
                                        count--;

                                        if (count <= 0) {
                                            break;
                                        }
                                    }
                                }
                            }

                            if (!meaningHtml) {
                                continue;
                            }

                            var pos = "";
                            for (var i = 0; i < b.terms.length; i++) {
                                var term = b.terms[i];
                                if (term.type == "text") {
                                    if (term.labels) {
                                        for (var j = 0; j < term.labels.length; j++) {
                                            var label = term.labels[j];
                                            if (label.title == "Part-of-speech") {
                                                //meaningText += '<span class="gdx-part-of-speech">' + label.text.toLowerCase() + "</span>";
                                                var pos = label.text.toLowerCase();
                                                break;
                                            }
                                        }
                                    }
                                    break;
                                }
                            }

                            meanings.push({
                                pos: pos,
                                html: meaningHtml
                            });
                        }

                        meanings.sort(function (a, b) {
                            return a.pos > b.pos ? 1 : a.pos < b.pos ? -1 : 0;
                        });

                        //for (var i = 1; i < meanings.length; i++) {
                        //    if (meanings[i - 1].pos == meanings[i].pos) {
                        //        meanings[i - 1].html += meanings[i].html;
                        //        meanings.splice(i, 1);
                        //    }
                        //}

                        for (var i = 0; i < meanings.length; i++) {
                            var posHtml = meanings[i].pos || (i > 0 ? "other" : "");
                            html +=
                                (posHtml ? '<b>' + posHtml + '</b>' : "") +
                                '<ol>' +
                                    meanings[i].html +
                                "</ol>";
                        }

                        return html;
                    }

                    var noDf = !(html || webHtml || e);

                    d = (noDf ? (
                        d ?
                        '<div class="translate-main">' + d.meaningText + '</div>' :
                        ""
                    ) : (
                        '<div class="translate-main">' + query + '</div>' +
                        (dObj ?
                        '<span class="translate-phonetic">' + (dObj.phonetic || "") + '</span>' +
                        (dObj.phonetic && dObj.audio ? '<span class="translate-audio" data-audio="' + dObj.audio + '"></span>' : "") :
                        "") +
                        '<div style="clear: both;"></div>'
                    )) +
                        (d && d.srcLang != "en" && d.srcLang.substr(0, 2) != t.language.substr(0, 2) ? '<div class="translate-attrib">' + d.attribution + "</div>" : "");

                    if (!d) {
                        a = "";
                    }
                    else {
                        if (html) {
                            e += '<h3 class="dct-tl">Definitions</h3>' + html;
                        }
                        if (webHtml) {
                            e += '<h3 class="dct-tl">Web Definitions</h3>' + webHtml;
                        }

                        a = d + e;
                    }
                    //else if (a = b.dictResponse, !a || a.error) a = "";
                    //else {
                    //    c = google.language.dictionary.createResultHtml(a);
                    //    a = document.createElement("div");
                    //    a.innerHTML = c;
                    //    c = a.getElementsByTagName("a");
                    //    for (d = c.length - 1; 0 <= d; d--) e = c[d], "Google Dictionary" == e.innerText && 0 == e.href.lastIndexOf("http://www.google.com/dictionary",
                    //        0) && (e.href = f);
                    //    a = a.innerHTML
                    //}
                    a = {
                        eventKey: b.request.eventKey,
                        sanitizedQuery: b.sanitizedQuery,
                        html: a
                    }
                }
                else {
                    g = k;
                    try {
                        e ? (g = e, g.moreUrl = a, d && (d.audio && "en" == e.srcLang.toLowerCase()) && (g.audio = d.audio)) : c ? (g = c, g.moreUrl = f) : t.language != "en" && d && (g = d, g.moreUrl = f);
                    } catch (e) { alert(e) }
                    if (g) {
                        if (!g.prettyQuery) {
                            g.prettyQuery = query;
                        }
                        g.meaningText = preMT + g.meaningText;
                    }

                    a = m;
                    if (("true" == t.popupDblclick && "none" == t.popupDblclickKey || "true" == t.popupSelect && "none" == t.popupSelectKey) && A(s, b.sanitizedQuery)) a = h;
                    a = {
                        eventKey: b.request.eventKey,
                        sanitizedQuery: b.sanitizedQuery,
                        meaningObj: g,
                        showOptionsTip: a
                    }
                }
                b.callback(a)
            }
        },
        I = function (a, c) {
            if (!a || a.sentences[0].orig.toLowerCase() == a.sentences[0].trans.toLowerCase()) return k;
            var b = a.sentences[0].orig.toLowerCase(),
                d = a.sentences[0].trans.toLowerCase(),
                e = d;
            if (c && a.dict && 0 < a.dict.length)
                for (var f = 0, l = a.dict.length; f < l; f++)
                    for (var g = a.dict[f], p = 0, r = 0, u = g.terms.length; r < u && 2 > p; r++) {
                        var v = g.terms[r].toLowerCase();
                        0 < v.length && (v != b && v != d) && (e += ", " + v, p++)
                    } (b = window["gdx.LANG_MAP"][a.src.toLowerCase()]) || (b = a.src);
            return {
                type: "translation",
                meaningText: "<p>" + e + "</p>",
                attribution: "Translated from " + b,
                srcLang: a.src
            }
        }, J = function (a, c) {
            for (var b = 0, d; d = a[b]; b++)
                if (d.type && d.type == c && d.text) return d.text;
            return ""
        }, K = function (a) {
            if (!a || 0 == a.length) return k;

            var pOSMap = {};
            var pOSNumber = 0;
            var pOSs = [];

            for (var c = 0, b; b = a[c]; c++) {
                for (var i = 0; i < b.terms.length; i++) {
                    var term = b.terms[i];
                    if (term.type == "text") {
                        if (term.labels) {
                            for (var j = 0; j < term.labels.length; j++) {
                                var label = term.labels[j];
                                if (label.title == "Part-of-speech") {
                                    //meaningText += '<span class="gdx-part-of-speech">' + label.text.toLowerCase() + "</span>";
                                    var pOS = label.text.toLowerCase();
                                    if (!pOSMap.hasOwnProperty(pOS)) {
                                        pOSMap[pOS] = true;
                                        pOSNumber++;
                                    }
                                    pOSs[c] = pOS;
                                    break;
                                }
                            }
                        }
                        break;
                    }
                }
            }

            for (var c = 0, b; b = a[c]; c++) {
                var o = {
                    prettyQuery: J(b.terms, "text"),
                    audio: J(b.terms, "sound").replace("http://", "https://"),
                    phonetic: J(b.terms, "phonetic")
                };

                //var phonetic;
                //if (phonetic = J(b.terms, "phonetic")) {
                //    meaningText += '<span class="gdx-phonetic">' + phonetic + "</span>";
                //}
                o.partOfSpeech = pOSs[c];

                for (var d = 0, e; e = b.entries[d]; d++) {
                    if (e.terms && 0 < e.terms.length && "meaning" == e.type) {
                        var f = J(e.terms, "text");
                        if (f) {
                            o.meaningText = "<p>" + f + "</p>";
                            o.attribution = J(e.terms, "url");
                            if (pOSNumber > 1) {
                                var morePOSs = [];
                                for (var g in pOSMap) {
                                    if (pOSMap.hasOwnProperty(g) && o.partOfSpeech != g) {
                                        morePOSs.push(g);
                                    }
                                }
                                o.partOfSpeech += ' <i title="' + morePOSs.join(", ") + '">(+' + (pOSNumber - 1) + ")</i>";
                            }
                            //alert(JSON.stringify(o, null, "  "));
                            return o;
                        }
                    }
                }
            }

            return null;
        }, H = function (a) {
            if (!a || a.error) return k;
            var c = K(a.primaries);
            c ?
            (c.attribution = "", c.type = "licensedDef") : (c = K(a.webDefinitions)) && (c.type = "webDef");
            return c
        }, M = function () {
            var a = L,
                c = {};
            c.language = a.language || "en";
            var b = function (a, b) {
                return "true" == a || "false" == a ? a : a == h ? "true" : a == m ? "false" : b
            };
            c.autoAudio = b(a.autoAudio, "false");
            c.popupDblclick = b(a.popupDblclick, "true");
            c.popupSelect = b(a.popupSelect, "false");
            c.enableHttps = b(a.enableHttps, "true");
            c.popupDblclickKey = a.popupDblclickKey || "none";
            c.popupSelectKey = a.popupSelectKey || "ctrl";
            a.popupMode && ("popup_disabled" == a.popupMode ? c.popupDblclick = "false" : "popup_key_ctrl" ==
                a.popupMode && (c.popupDblclickKey = "ctrl", c.popupSelect = "true", c.popupSelectKey = "ctrl"));
            return c
        }, N = N || m;
    if ("undefined" == typeof N || !N) {
        dict_api.load("https://clients5.google.com?client=dict-chrome-ex", "1", "en");
        var O;
        chrome.storage.sync.get("options", function (data) {
            O = data.options || window.localStorage.options
            L = {};
            O && (L = typeof O == "string" ? JSON.parse(O) : O);
            t = M();
            chrome.storage.sync.set({ options: t });
            chrome.extension.onMessage.addListener(C);
            chrome.extension.onMessage.addListener(D);
            chrome.extension.onMessage.addListener(G);
            window["gdx.updateOptions"] = B
        });
    };
})();