// Shared by devruler.com and apps.devruler.com:
// - EN/TR switch, remembered in a cookie on .devruler.com so both sites open in the same language
// - videos that follow the page language
// - catalog filter and search
(function () {
  var KEY = "devruler-lang";
  function readCookie() {
    var m = document.cookie.match(/(?:^|;\s*)devruler-lang=(en|tr)/);
    return m ? m[1] : null;
  }
  function initial() {
    var c = readCookie(); if (c) return c;
    try { var s = localStorage.getItem(KEY); if (s === "en" || s === "tr") return s; } catch (e) {}
    return (navigator.language || "en").toLowerCase().indexOf("tr") === 0 ? "tr" : "en";
  }
  function save(lang) {
    var domain = /(^|\.)devruler\.com$/.test(location.hostname) ? "; domain=.devruler.com" : "";
    document.cookie = KEY + "=" + lang + "; path=/; max-age=31536000; SameSite=Lax" + domain;
    try { localStorage.setItem(KEY, lang); } catch (e) {}
  }
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  function apply(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-set-lang]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-set-lang") === lang));
    });
    // legal documents with EN/TR sections
    var secs = document.querySelectorAll(".legal .locale[data-locale]");
    if (secs.length) {
      var has = Array.prototype.some.call(secs, function (s) { return s.getAttribute("data-locale") === lang; });
      secs.forEach(function (s) { s.hidden = has ? s.getAttribute("data-locale") !== lang : s !== secs[0]; });
    }
    document.querySelectorAll("[data-ph-en]").forEach(function (i) {
      i.setAttribute("placeholder", i.getAttribute("data-ph-" + lang) || i.getAttribute("data-ph-en"));
    });
    // videos in the page language
    document.querySelectorAll("video[data-src-en]").forEach(function (v) {
      var src = v.getAttribute("data-src-" + lang) || v.getAttribute("data-src-en");
      var poster = v.getAttribute("data-poster-" + lang) || v.getAttribute("data-poster-en");
      if (v.getAttribute("src") !== src) {
        v.setAttribute("poster", poster);
        v.setAttribute("src", src);
        if (v.hasAttribute("data-autoplay") && !reduce) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
      }
    });
  }

  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-set-lang]");
    if (b) { var l = b.getAttribute("data-set-lang"); apply(l); save(l); }
  });
  apply(initial());
  if (reduce) document.querySelectorAll("video[data-autoplay]").forEach(function (v) { v.pause(); v.removeAttribute("autoplay"); });

  // catalog: filter by type + search
  var filters = document.querySelectorAll("[data-filter]");
  var search = document.getElementById("app-search");
  var items = document.querySelectorAll("[data-item]");
  if (items.length) {
    var current = "all";
    var fold = function (s) { return (s || "").toLocaleLowerCase("tr").normalize("NFD").replace(/[̀-ͯ]/g, ""); };
    var run = function () {
      var q = fold(search ? search.value.trim() : "");
      var shown = 0;
      items.forEach(function (el) {
        var ok = (current === "all" || el.getAttribute("data-cat") === current) &&
                 (!q || fold(el.getAttribute("data-text")).indexOf(q) !== -1);
        el.hidden = !ok; if (ok) shown++;
      });
      document.querySelectorAll("[data-group]").forEach(function (g) {
        g.hidden = !g.querySelector("[data-item]:not([hidden])");
      });
      var empty = document.getElementById("no-results");
      if (empty) empty.hidden = shown > 0;
    };
    filters.forEach(function (b) {
      b.addEventListener("click", function () {
        current = b.getAttribute("data-filter");
        filters.forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        run();
      });
    });
    if (search) search.addEventListener("input", run);
  }
})();
