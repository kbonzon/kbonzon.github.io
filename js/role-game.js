// Role-playing game engine for build pages.
// Game data lives in js/games/*.js and registers itself on window.GAMES.
(function () {
  var ICONS = {
    ship: '<path d="M3 17l2 3h14l2-3z"/><path d="M12 3v14"/><path d="M12 4l6 9h-6"/><path d="M11 6l-5 7h5"/>',
    estate: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-5h4v5"/>',
    crown: '<path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5z"/>',
    tools: '<path d="M14.5 3.5l6 6-3 3-6-6z"/><path d="M11.5 6.5l-8 8 3 3 8-8"/>',
    wheat: '<path d="M12 22V5"/><path d="M12 9L8.5 6"/><path d="M12 9l3.5-3"/><path d="M12 13.5L8.5 10.5"/><path d="M12 13.5l3.5-3"/><path d="M12 18l-3.5-3"/><path d="M12 18l3.5-3"/>',
    factory: '<path d="M3 21V11l6 4v-4l6 4V5h4v16z"/><path d="M3 21h18"/>',
    worker: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0116 0"/>',
    book: '<path d="M2 5h7a3 3 0 013 3v13a2 2 0 00-2-2H2z"/><path d="M22 5h-7a3 3 0 00-3 3v13a2 2 0 012-2h8z"/>'
  };

  var ORDER = ["mercantile", "smith"];
  var tabsEl = document.getElementById("game-tabs");
  var root = document.getElementById("game-area");
  var game, role, step, meter, results;

  // ---------- helpers ----------
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function add(parent, children) {
    children.forEach(function (c) { if (c) parent.appendChild(c); });
    return parent;
  }
  function button(cls, text, onClick) {
    var b = el("button", cls, text);
    b.type = "button";
    b.addEventListener("click", onClick);
    return b;
  }
  function badge(name) {
    var b = el("span", "badge");
    b.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || ICONS.worker) + "</svg>";
    return b;
  }
  function paragraphs(list) {
    var box = el("div", "prose");
    list.forEach(function (t) { box.appendChild(el("p", null, t)); });
    return box;
  }
  function stars(correct, total) {
    var n = correct === total ? 3 : correct >= total * 0.6 ? 2 : correct > 0 ? 1 : 0;
    var s = el("span", "stars");
    s.setAttribute("aria-label", n + " of 3 stars");
    for (var i = 0; i < 3; i++) s.appendChild(el("span", i < n ? null : "off", "★"));
    return s;
  }
  function shuffle(list) {
    var a = list.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function fmt(m, v) { return (m.prefix || "") + v + (m.suffix || ""); }

  var store = {
    get: function (k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { window.localStorage.setItem(k, v); } catch (e) { /* storage unavailable */ } }
  };
  function bestKey(r) { return "het:" + game.id + ":" + r.id; }
  function best(r) { var v = store.get(bestKey(r)); return v == null ? null : Number(v); }

  function show(nodes, scroll) {
    root.innerHTML = "";
    add(root, nodes);
    if (scroll) {
      var top = root.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: top, behavior: "smooth" });
    }
  }

  // ---------- tabs ----------
  function renderTabs() {
    tabsEl.innerHTML = "";
    ORDER.forEach(function (id, i) {
      var g = window.GAMES[id];
      var t = button("tab", null, function () { selectGame(id, true); });
      t.setAttribute("role", "tab");
      t.setAttribute("aria-selected", String(game && game.id === id));
      t.appendChild(document.createTextNode("Game " + (i + 1) + ": " + g.title));
      t.appendChild(el("small", null, g.years));
      tabsEl.appendChild(t);
    });
  }

  function selectGame(id, scroll) {
    game = window.GAMES[id];
    store.set("het:tab", id);
    renderTabs();
    renderRoles(scroll);
  }

  // ---------- role picker ----------
  function renderRoles(scroll) {
    var done = game.roles.filter(function (r) { return best(r) != null; }).length;

    var head = add(el("div", "era-head"), [
      el("p", "eyebrow", game.years + " · " + game.place),
      el("h2", null, game.title),
      paragraphs(game.intro)
    ]);

    var fill = el("div", "progress-fill");
    fill.style.width = (done / game.roles.length) * 100 + "%";
    var progress = add(el("div", "progress-line"), [
      add(el("div", "progress-track"), [fill]),
      el("span", null, done + " of " + game.roles.length + " roles played")
    ]);

    var grid = el("div", "role-grid");
    game.roles.forEach(function (r) {
      var b = best(r);
      var card = button("role-card" + (b != null ? " done" : ""), null, function () { startRole(r); });
      var text = add(el("div"), [
        el("h3", null, r.name),
        el("div", "role-meta", r.year + " · " + r.place),
        el("div", "role-status", b != null ? "✓ Best: " + b + " of " + r.tasks.length + " period-true" : "Not played yet")
      ]);
      add(card, [badge(r.icon), text]);
      grid.appendChild(card);
    });

    var nodes = [head, progress, grid];
    if (done === game.roles.length) {
      nodes.push(add(el("div", "finale"), [el("h3", null, game.finale.title), el("p", null, game.finale.text)]));
    }
    show(nodes, scroll);
  }

  // ---------- a role ----------
  function startRole(r) {
    role = r;
    show([
      button("link-btn", "← All roles", function () { renderRoles(true); }),
      add(el("div", "panel"), [
        add(el("div", "role-title"), [badge(r.icon), add(el("div"), [el("h2", null, r.name), el("div", "role-meta", r.year + " · " + r.place)])]),
        el("p", "section-label", "Your world"),
        paragraphs(r.world),
        add(el("div", "actions"), [button("btn", "Begin your first task →", function () {
          step = 0;
          meter = r.meter.start;
          results = [];
          renderTask();
        })])
      ])
    ], true);
  }

  function hud(delta) {
    var steps = el("div", "steps");
    role.tasks.forEach(function (t, i) {
      var cls = i < results.length ? (results[i] ? "good" : "miss") : i === step ? "now" : "";
      steps.appendChild(el("span", cls));
    });
    var m = add(el("span", "meter"), [el("span", null, role.meter.label + ": " + fmt(role.meter, meter))]);
    if (delta) m.appendChild(el("span", "delta " + (delta > 0 ? "up" : "down"), (delta > 0 ? "+" : "−") + Math.abs(delta)));
    return add(el("div", "hud"), [
      add(el("div"), [el("div", null, role.name + " · Task " + (step + 1) + " of " + role.tasks.length), steps]),
      m
    ]);
  }

  function renderTask() {
    var task = role.tasks[step];
    var hudSlot = el("div");
    hudSlot.appendChild(hud());
    var after = el("div");
    var choiceBox = el("div", "choices");

    var buttons = shuffle(task.choices).map(function (c) {
      var b = button("choice", c.label, function () { pick(c); });
      b._choice = c;
      return b;
    });
    add(choiceBox, buttons);

    function pick(c) {
      results.push(!!c.correct);
      meter = Math.max(0, meter + (c.delta || 0));
      buttons.forEach(function (b) {
        b.disabled = true;
        if (b._choice.correct) b.classList.add("correct");
        else if (b._choice === c) b.classList.add("wrong");
        else b.classList.add("faded");
      });
      hudSlot.innerHTML = "";
      hudSlot.appendChild(hud(c.delta));

      var last = step === role.tasks.length - 1;
      var next = button("btn", last ? "See how you did →" : "Next task →", function () {
        step++;
        if (last) renderSummary(); else renderTask();
      });
      add(after, [
        add(el("div", "result " + (c.correct ? "good" : "bad")), [
          el("strong", null, c.correct ? "True to the period!" : "Not quite what they'd have done."),
          el("span", null, c.result)
        ]),
        add(el("div", "lesson"), [el("p", "section-label", "From the text"), el("p", null, task.lesson)]),
        add(el("div", "actions"), [next])
      ]);
      next.focus({ preventScroll: true });
    }

    show([
      button("link-btn", "← All roles", function () { renderRoles(true); }),
      add(el("div", "panel"), [
        hudSlot,
        el("h2", "task-title", task.title),
        el("p", null, task.text),
        choiceBox,
        after
      ])
    ], true);
  }

  function renderSummary() {
    var correct = results.filter(Boolean).length;
    var total = role.tasks.length;
    var prev = best(role);
    if (prev == null || correct > prev) store.set(bestKey(role), String(correct));

    show([
      button("link-btn", "← All roles", function () { renderRoles(true); }),
      add(el("div", "panel"), [
        add(el("div", "role-title"), [badge(role.icon), add(el("div"), [el("h2", null, role.name + ": complete"), el("div", "role-meta", role.year + " · " + role.place)])]),
        add(el("div", "score-row"), [
          add(el("div", "score-box"), [el("div", "big", correct + " / " + total), el("div", "small", "choices true to the period"), stars(correct, total)]),
          add(el("div", "score-box"), [el("div", "big", fmt(role.meter, meter)), el("div", "small", "final " + role.meter.label.toLowerCase())])
        ]),
        el("p", "section-label", "Why they thought this way"),
        paragraphs(role.takeaway),
        add(el("div", "actions"), [
          button("btn", "Choose another role", function () { renderRoles(true); }),
          button("btn ghost", "Replay this role", function () { startRole(role); })
        ])
      ])
    ], true);
  }

  // ---------- start ----------
  var saved = store.get("het:tab");
  selectGame(ORDER.indexOf(saved) >= 0 ? saved : ORDER[0], false);
})();
