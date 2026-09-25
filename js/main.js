(function () {
  "use strict";
  var S = window.SITE || {};
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* ---------- Mobile menu ---------- */
  var toggle = $(".nav-toggle");
  var nav = $("#site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    $$("a", nav).forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Settings-driven text ---------- */
  var email = S.email || "";
  $$("[data-email-link]").forEach(function (a) {
    a.textContent = email;
    a.href = "mailto:" + email;
  });
  ["instagram", "facebook"].forEach(function (key) {
    var li = $('[data-social="' + key + '"]');
    if (li && S[key]) {
      $("a", li).href = S[key];
      li.hidden = false;
    }
  });
  if (S.donateUrl) {
    $$("[data-donate-link]").forEach(function (a) {
      a.href = S.donateUrl;
      a.target = "_blank";
      a.rel = "noopener";
    });
  }
  var year = $("#year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Impact stats ---------- */
  var statsSection = $("#stats");
  if (statsSection && S.showStats && S.stats) {
    statsSection.hidden = false;
    var nums = $$("[data-stat]", statsSection);
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var countUp = function (el) {
      var target = Number(S.stats[el.getAttribute("data-stat")]) || 0;
      if (reduce || target === 0) { el.textContent = target.toLocaleString(); return; }
      var start = null;
      var step = function (t) {
        if (!start) start = t;
        var p = Math.min((t - start) / 1200, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))).toLocaleString();
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        if (entries.some(function (e) { return e.isIntersecting; })) {
          nums.forEach(countUp);
          io.disconnect();
        }
      }, { threshold: 0.4 });
      io.observe(statsSection);
    } else {
      nums.forEach(countUp);
    }
  }

  /* ---------- Events ---------- */
  var list = $("#event-list");
  var empty = $("#no-events");
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var parseDate = function (str) {
    var m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(String(str || "").trim());
    return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : null;
  };
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  var upcoming = (S.events || [])
    .map(function (e) { return { e: e, d: parseDate(e.date) }; })
    .filter(function (x) { return x.d && x.d >= today; })
    .sort(function (a, b) { return a.d - b.d; });

  var el = function (tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  };

  if (list) {
    upcoming.forEach(function (x) {
      var e = x.e;
      var isSale = e.type === "sale";
      var card = el("article", "card event " + (isSale ? "sale" : "workshop"));
      var date = el("div", "event-date");
      date.appendChild(el("span", "event-month", MONTHS[x.d.getMonth()]));
      date.appendChild(el("span", "event-day", String(x.d.getDate())));
      var body = el("div");
      body.appendChild(el("span", "event-type", isSale ? "Bike sale" : "Free workshop"));
      body.appendChild(el("h3", "", e.title || (isSale ? "Bike Sale" : "Workshop")));
      var meta = [x.d.toLocaleDateString(undefined, { weekday: "long" }), e.time, e.place].filter(Boolean).join(" · ");
      body.appendChild(el("p", "event-meta", meta));
      if (e.details) body.appendChild(el("p", "", e.details));
      card.appendChild(date);
      card.appendChild(body);
      list.appendChild(card);
    });
    if (empty) empty.hidden = upcoming.length > 0;
  }

  /* ---------- Forms (open the visitor's email app, no server needed) ---------- */
  var SUBJECTS = {
    give: "Bike donation",
    get: "Bike request",
    contact: "Message from the website",
  };

  $$("form[data-form]").forEach(function (form) {
    var status = $(".form-status", form);
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      status.className = "form-status";
      status.textContent = "";

      var missing = [];
      $$("[required]", form).forEach(function (f) {
        var bad = !f.value.trim();
        f.classList.toggle("invalid", bad);
        f.setAttribute("aria-invalid", String(bad));
        if (bad) missing.push(f);
      });
      if (missing.length) {
        status.classList.add("err");
        status.textContent = "Please fill in the highlighted boxes.";
        missing[0].focus();
        return;
      }

      var lines = [];
      $$("input, select, textarea", form).forEach(function (f) {
        if (!f.name) return;
        if (f.type === "checkbox" && !f.checked) return;
        var v = f.value.trim();
        if (v) lines.push(f.name + ": " + v);
      });

      var subject = "Pedal It Forward: " + (SUBJECTS[form.getAttribute("data-form")] || "Website message");
      var href = "mailto:" + encodeURIComponent(email).replace(/%40/g, "@") +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(lines.join("\n") + "\n");
      window.location.href = href;

      status.classList.add("ok");
      status.textContent = "Your email app should open with your message ready. Just press send! If nothing opened, email us at " + email + ".";
    });

    $$("[required]", form).forEach(function (f) {
      f.addEventListener("input", function () {
        if (f.value.trim()) { f.classList.remove("invalid"); f.setAttribute("aria-invalid", "false"); }
      });
    });
  });
})();
