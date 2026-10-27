// Step-by-step workbook engine for model lessons (used by build-2.html).
// A lesson is a list of steps. Each step has a title, body paragraphs, an
// optional figure, and questions that must be answered before moving on.
// A step can also be a function that returns a fresh step (for random numbers).
(function () {
  const LAB = (window.LAB = window.LAB || {});

  // ---------- helpers ----------
  function el(tag, cls, html) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function text(tag, cls, s) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    n.textContent = s;
    return n;
  }
  function button(cls, label, onClick) {
    const b = text("button", cls, label);
    b.type = "button";
    b.addEventListener("click", onClick);
    return b;
  }
  function shuffle(list) {
    const a = list.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  const store = {
    get(k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { window.localStorage.setItem(k, v); } catch (e) { /* storage unavailable */ } }
  };

  LAB.fmt = (v, d = 2) => Number(v).toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
  LAB.pick = (min, max, step = 1) => min + step * Math.floor(Math.random() * ((max - min) / step + 1));
  const decimals = (v) => (Number.isInteger(v) ? 0 : 2);
  const parse = (s) => {
    const v = parseFloat(String(s).replace(/[$£%,\s]/g, ""));
    return isNaN(v) ? null : v;
  };

  // ---------- question widgets ----------
  function numberQuestion(q, onDone) {
    const card = el("div", "q-card");
    card.appendChild(el("p", "q-prompt", q.prompt));
    const row = el("div", "q-row");
    const input = document.createElement("input");
    input.className = "q-input";
    input.inputMode = "decimal";
    input.autocomplete = "off";
    input.setAttribute("aria-label", q.prompt.replace(/<[^>]+>/g, ""));
    if (q.prefix) row.appendChild(text("span", "q-unit", q.prefix));
    row.appendChild(input);
    if (q.unit) row.appendChild(text("span", "q-unit", q.unit));
    const check = button("btn small", "Check", submit);
    const reveal = button("btn small ghost", "Show answer", () => finish(false, true));
    reveal.hidden = true;
    row.appendChild(check);
    row.appendChild(reveal);
    card.appendChild(row);
    const fb = el("div", "q-feedback");
    card.appendChild(fb);

    const tol = q.tol != null ? q.tol : Math.max(0.005, Math.abs(q.answer) * 0.002);
    let tries = 0;
    let done = false;

    function finish(firstTry, revealed) {
      done = true;
      input.disabled = true;
      check.hidden = true;
      reveal.hidden = true;
      input.value = LAB.fmt(q.answer, q.dp != null ? q.dp : decimals(q.answer));
      card.classList.add("done");
      fb.className = "q-feedback";
      fb.innerHTML = "<strong>" + (revealed ? "Answer: " : "Correct! ") + "</strong>" + (q.explain || "");
      onDone(firstTry);
    }
    function submit() {
      if (done) return;
      const v = parse(input.value);
      if (v == null) {
        fb.className = "q-feedback bad";
        fb.textContent = "Type a number first.";
        return;
      }
      tries++;
      if (Math.abs(v - q.answer) <= tol) return finish(tries === 1, false);
      fb.className = "q-feedback bad";
      fb.innerHTML = "Not quite. " + (q.hint || "Try again.");
      card.classList.remove("shake");
      void card.offsetWidth;
      card.classList.add("shake");
      if (tries >= 2) reveal.hidden = false;
    }
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") submit(); });
    return card;
  }

  function choiceQuestion(q, onDone) {
    const card = el("div", "q-card");
    card.appendChild(el("p", "q-prompt", q.prompt));
    const box = el("div", "choices");
    const fb = el("div", "q-feedback");
    let tries = 0;
    const order = q.keepOrder ? q.options.map((_, i) => i) : shuffle(q.options.map((_, i) => i));
    const buttons = order.map((i) => {
      const b = el("button", "choice", q.options[i]);
      b.type = "button";
      b.addEventListener("click", () => {
        if (i === q.answer) {
          buttons.forEach((x) => (x.disabled = true));
          b.classList.add("correct");
          card.classList.add("done");
          fb.className = "q-feedback";
          fb.innerHTML = "<strong>Correct! </strong>" + (q.explain || "");
          onDone(tries === 0);
        } else {
          tries++;
          b.disabled = true;
          b.classList.add("wrong");
          fb.className = "q-feedback bad";
          fb.innerHTML = "Not quite. " + (q.hint || "Try another answer.");
        }
      });
      return b;
    });
    buttons.forEach((b) => box.appendChild(b));
    card.appendChild(box);
    card.appendChild(fb);
    return card;
  }

  // ---------- engine ----------
  LAB.start = function (selector, lessons, key, opts) {
    const home = Object.assign(
      {
        eyebrow: lessons.length + " lessons · about 10 minutes each",
        heading: "Work through the model",
        intro: "Go in order the first time: each lesson builds on the one before."
      },
      opts || {}
    );
    const root = document.querySelector(selector);
    let lesson, stepIdx, results;

    const scoreKey = (l) => "het:" + key + ":" + l.id;
    const show = (nodes, scroll) => {
      root.innerHTML = "";
      nodes.forEach((n) => n && root.appendChild(n));
      if (scroll) {
        const top = root.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
    };

    function renderHome(scroll) {
      const head = el("div", "era-head");
      head.appendChild(text("p", "eyebrow", home.eyebrow));
      head.appendChild(text("h2", null, home.heading));
      head.appendChild(el("p", null, home.intro));

      const done = lessons.filter((l) => store.get(scoreKey(l)) != null).length;
      const fill = el("div", "progress-fill");
      fill.style.width = (done / lessons.length) * 100 + "%";
      const track = el("div", "progress-track");
      track.appendChild(fill);
      const progress = el("div", "progress-line");
      progress.appendChild(track);
      progress.appendChild(text("span", null, done + " of " + lessons.length + " lessons done"));

      const grid = el("div", "role-grid");
      lessons.forEach((l, i) => {
        const saved = store.get(scoreKey(l));
        const card = el("button", "role-card" + (saved ? " done" : ""));
        card.type = "button";
        card.addEventListener("click", () => openLesson(l));
        card.appendChild(text("span", "badge num", String(i + 1)));
        const t = el("div");
        t.appendChild(text("h3", null, l.title));
        t.appendChild(text("div", "role-meta", l.subtitle));
        t.appendChild(text("div", "role-status", saved ? "✓ Best: " + saved + " right on the first try" : "Not started"));
        card.appendChild(t);
        grid.appendChild(card);
      });
      show([head, progress, grid], scroll);
    }

    function openLesson(l) {
      lesson = l;
      stepIdx = 0;
      results = {};
      renderStep(true);
    }

    function renderStep(scroll) {
      const raw = lesson.steps[stepIdx];
      const step = typeof raw === "function" ? raw() : raw;
      const questions = step.questions || [];
      let remaining = questions.length;

      const panel = el("div", "panel");
      const hud = el("div", "hud");
      const left = el("div");
      left.appendChild(text("div", null, lesson.title + " · Step " + (stepIdx + 1) + " of " + lesson.steps.length));
      const dots = el("div", "steps");
      lesson.steps.forEach((_, i) => dots.appendChild(el("span", i < stepIdx ? "good" : i === stepIdx ? "now" : "")));
      left.appendChild(dots);
      hud.appendChild(left);
      if (step.regen) hud.appendChild(button("btn small ghost", "↻ New numbers", () => renderStep(false)));
      panel.appendChild(hud);

      panel.appendChild(text("h2", "task-title", step.title));
      panel.appendChild(el("div", "prose", (step.body || []).map((p) => "<p>" + p + "</p>").join("")));

      let fig = null;
      const drawFigure = (reveal) => {
        if (!fig) return;
        if (typeof step.figure === "function") {
          fig.innerHTML = "";
          step.figure(fig, reveal);
        } else fig.innerHTML = step.figure;
      };
      if (step.figure) {
        fig = el("div", "lab-figure");
        panel.appendChild(fig);
        drawFigure(false);
      }

      const list = el("div", "q-list");
      questions.forEach((q, qi) => {
        const resultKey = stepIdx + ":" + qi;
        const onDone = (firstTry) => {
          if (!(resultKey in results)) results[resultKey] = firstTry;
          remaining--;
          if (remaining === 0) {
            next.disabled = false;
            if (step.revealFigure) drawFigure(true);
          }
        };
        list.appendChild(q.type === "choice" ? choiceQuestion(q, onDone) : numberQuestion(q, onDone));
      });
      if (questions.length) panel.appendChild(list);

      const last = stepIdx === lesson.steps.length - 1;
      const next = button("btn", last ? "Finish lesson →" : "Next step →", () => {
        if (last) renderSummary();
        else { stepIdx++; renderStep(true); }
      });
      next.disabled = remaining > 0;
      const nav = el("div", "step-nav");
      nav.appendChild(stepIdx > 0 ? button("btn ghost", "← Back", () => { stepIdx--; renderStep(true); }) : el("span"));
      nav.appendChild(next);
      panel.appendChild(nav);

      show([button("link-btn", "← All lessons", () => renderHome(true)), panel], scroll);
    }

    function renderSummary() {
      const keys = Object.keys(results);
      const first = keys.filter((k) => results[k]).length;
      const total = keys.length;
      const prev = store.get(scoreKey(lesson));
      const prevFirst = prev ? parseInt(prev, 10) : -1;
      if (first >= prevFirst) store.set(scoreKey(lesson), first + " of " + total);

      const idx = lessons.indexOf(lesson);
      const panel = el("div", "panel");
      const title = el("div", "role-title");
      title.appendChild(text("span", "badge num", String(idx + 1)));
      const tt = el("div");
      tt.appendChild(text("h2", null, lesson.title + ": complete"));
      tt.appendChild(text("div", "role-meta", lesson.subtitle));
      title.appendChild(tt);
      panel.appendChild(title);

      const box = el("div", "score-box");
      box.appendChild(text("div", "big", first + " / " + total));
      box.appendChild(text("div", "small", "right on the first try"));
      const row = el("div", "score-row");
      row.appendChild(box);
      panel.appendChild(row);

      panel.appendChild(text("p", "section-label", "What to remember"));
      const ul = el("ul", "summary-list");
      lesson.summary.forEach((s) => ul.appendChild(el("li", null, s)));
      panel.appendChild(ul);

      const actions = el("div", "actions");
      if (idx < lessons.length - 1) actions.appendChild(button("btn", "Next lesson: " + lessons[idx + 1].title + " →", () => openLesson(lessons[idx + 1])));
      actions.appendChild(button("btn ghost", "All lessons", () => renderHome(true)));
      actions.appendChild(button("btn ghost", "Redo this lesson", () => openLesson(lesson)));
      panel.appendChild(actions);

      show([button("link-btn", "← All lessons", () => renderHome(true)), panel], true);
    }

    renderHome(false);
  };

  // ---------- charts (SVG strings) ----------
  const C = (LAB.charts = {});
  const svg = (w, h, inner, label) =>
    '<svg viewBox="0 0 ' + w + " " + h + '" role="img" aria-label="' + label + '">' + inner + "</svg>";
  const t = (x, y, s, cls, anchor) =>
    '<text x="' + x + '" y="' + y + '"' + (cls ? ' class="' + cls + '"' : "") + ' text-anchor="' + (anchor || "middle") + '">' + s + "</text>";
  const rect = (x, y, w, h, cls) =>
    '<rect x="' + x + '" y="' + y + '" width="' + Math.max(0, w) + '" height="' + Math.max(0, h) + '" class="' + cls + '"/>';
  const line = (x1, y1, x2, y2, cls) =>
    '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" class="' + cls + '"/>';

  LAB.draw = { svg, t, rect, line };

  C.legend = (items) =>
    '<div class="legend">' +
    items.map((i) => '<span><span class="swatch" style="background:' + i[0] + '"></span>' + i[1] + "</span>").join("") +
    "</div>";

  // Figure 5.1: net produce on plots of land, split into profit and rent.
  C.rentBars = (values, farmed, hideRent) => {
    const W = 640, H = 300, L = 16, R = 16, T = 26, B = 58;
    const max = values[0] * 1.12;
    const slot = (W - L - R) / values.length;
    const bw = Math.min(120, slot * 0.62);
    const Y = (v) => T + (H - T - B) * (1 - v / max);
    const base = Y(0);
    const margin = farmed > 0 ? values[farmed - 1] : null;
    let s = "";
    values.forEach((v, i) => {
      const cx = L + slot * (i + 0.5);
      const x = cx - bw / 2;
      if (i >= farmed) {
        s += '<rect x="' + x + '" y="' + Y(v) + '" width="' + bw + '" height="' + (base - Y(v)) + '" rx="8" class="bar-off"/>';
        s += t(cx, (Y(v) + base) / 2, "not farmed");
      } else {
        const rent = v - margin;
        s += rect(x, Y(margin), bw, base - Y(margin), "profit");
        s += t(cx, (Y(margin) + base) / 2 + 4, hideRent ? "profit" : "profit " + margin, "t-strong");
        if (rent > 0) {
          s += rect(x, Y(v), bw, Y(margin) - Y(v), "rent");
          s += t(cx, (Y(v) + Y(margin)) / 2 + 4, hideRent ? "rent ?" : "rent " + rent, "t-strong");
        }
      }
      s += t(cx, base + 20, "No. " + (i + 1), "t-strong");
      s += t(cx, base + 38, "net produce " + v);
    });
    if (margin != null) {
      s += line(L, Y(margin), W - R, Y(margin), "guide");
      s += t(W - R, Y(margin) - 6, "no-rent margin: " + margin, null, "end");
    }
    s += line(L, base, W - R, base, "ax");
    return svg(W, H, s, "Net produce on each plot of land, split into profit and rent") +
      C.legend([["var(--green)", "Profit (same on every farm)"], ["var(--yellow)", "Rent to the landlord"]]);
  };

  // Figure 5.2: steps of shrinking parcels become a downward line.
  C.stepsLine = () => {
    const W = 640, H = 260, L = 46, R = 30, T = 20, B = 40, n = 9;
    const vals = Array.from({ length: n }, (_, i) => 100 - i * 9);
    const slot = (W - L - R) / n;
    const Y = (v) => T + (H - T - B) * (1 - v / 112);
    let s = "";
    vals.forEach((v, i) => (s += rect(L + i * slot + 1, Y(v), slot - 2, Y(0) - Y(v), "bar-soft")));
    s += line(L, Y(104.5), L + n * slot, Y(104.5 - 9 * n), "pline");
    s += t(L + n * slot - 4, Y(104.5 - 9 * n) - 10, "NP", "t-big", "end");
    s += line(L, Y(0), W - R, Y(0), "ax") + line(L, T, L, Y(0), "ax");
    s += t((L + W - R) / 2, H - 10, "Number of parcels of land farmed →");
    s += '<text transform="translate(18 ' + (T + H - B) / 2 + ') rotate(-90)" text-anchor="middle">Net produce per parcel</text>';
    return svg(W, H, s, "Bars for each parcel of land getting shorter, with a downward sloping line NP through them");
  };

  // Figures 5.3 / 5.4: the corn model.
  // m = { a, b, w, ws }: extra corn from the x-th unit of land is a - b*x.
  C.corn = (m, x, wage) => {
    const W = 640, H = 340, L = 66, R = 20, T = 18, B = 48, XM = 50, YM = 130;
    const X = (v) => L + ((W - L - R) * v) / XM;
    const Y = (v) => T + (H - T - B) * (1 - v / YM);
    const P = (v) => m.a - m.b * v;
    const w = wage != null ? wage : m.ws;
    const px = P(x);
    let s = "";
    for (let v = 20; v <= 120; v += 20) s += line(L, Y(v), W - R, Y(v), "grid") + t(L - 8, Y(v) + 4, v, null, "end");
    for (let v = 0; v <= XM; v += 10) s += t(X(v), Y(0) + 18, v);
    if (x > 0) {
      s += rect(X(0), Y(w), X(x) - X(0), Y(0) - Y(w), "wage");
      if (px > w) s += rect(X(0), Y(px), X(x) - X(0), Y(w) - Y(px), "profit");
      s += '<polygon class="rent" points="' + X(0) + "," + Y(m.a) + " " + X(x) + "," + Y(px) + " " + X(0) + "," + Y(px) + '"/>';
      if (x >= 6) {
        s += t(X(x / 2), (Y(w) + Y(0)) / 2 + 4, "Wages", "t-strong");
        if (px - w >= 8) s += t(X(x / 2), (Y(px) + Y(w)) / 2 + 4, "Profits", "t-strong");
        if (m.a - px >= 14) s += t(X(x / 3), Y((m.a + 2 * px) / 3) + 4, "Rent", "t-strong");
      }
      s += line(X(x), Y(0), X(x), Y(px), "guide");
      s += t(X(x) + 8, Y(px) - 10, "x = " + x, "t-strong", "start");
    }
    s += line(L, Y(m.w), W - R, Y(m.w), "wline") + t(W - R, Y(m.w) - 6, "w", "t-strong", "end");
    s += line(L, Y(m.ws), W - R, Y(m.ws), "wsline") + t(W - R, Y(m.ws) - 6, "w*", "t-strong", "end");
    const xEnd = Math.min(XM, m.a / m.b);
    s += line(X(0), Y(m.a), X(xEnd), Y(P(xEnd)), "pline") + t(X(xEnd) - 4, Y(P(xEnd)) - 10, "P", "t-big", "end");
    s += line(L, Y(0), W - R, Y(0), "ax") + line(L, T, L, Y(0), "ax");
    s += t((L + W - R) / 2, H - 8, "Units of land farmed (x)");
    s += '<text transform="translate(12 ' + (T + Y(0)) / 2 + ') rotate(-90)" text-anchor="middle">Corn from each extra unit</text>';
    return svg(W, H, s, "Ricardo's corn model: rent triangle, profit and wage rectangles under the produce line") +
      C.legend([
        ["var(--yellow)", "Rent"],
        ["var(--green)", "Profits"],
        ["var(--blue-soft)", "Wages"],
        ["var(--blue)", "w* = " + m.ws + ": wage while capital accumulates"],
        ["var(--ink)", "w = " + m.w + ": subsistence wage (dashed)"]
      ]);
  };

  // Compounding $100 of wages at a given profit rate.
  C.compound = (values, labels, reveal) => {
    const W = 640, H = 250, L = 20, R = 20, T = 28, B = 46;
    const max = Math.max(...values) * 1.1;
    const slot = (W - L - R) / values.length;
    const bw = slot * 0.56;
    const Y = (v) => T + (H - T - B) * (1 - v / max);
    let s = "";
    values.forEach((v, i) => {
      const cx = L + slot * (i + 0.5);
      s += rect(cx - bw / 2, Y(v), bw, Y(0) - Y(v), i === 0 ? "wage" : "profit");
      s += t(cx, Y(v) - 8, i === 0 || reveal ? "$" + LAB.fmt(v) : "?", "t-big");
      s += t(cx, Y(0) + 18, labels[i]);
    });
    s += line(L, Y(0), W - R, Y(0), "ax");
    return svg(W, H, s, "Bars showing $100 of wages growing with compounded profit each year");
  };

  // Figure 5.7: time-dated labor for commodities x and y.
  C.laborBlocks = () => {
    const W = 640, H = 270, T = 30, B = 52;
    const cols = ["−4", "−3", "−2", "−1", "final"];
    const sets = [
      { name: "Commodity x", data: [75, 75, 75, 75, 100], x0: 20 },
      { name: "Commodity y", data: [0, 0, 50, 50, 300], x0: 340 }
    ];
    const Y = (v) => T + (H - T - B) * (1 - v / 320);
    let s = "";
    sets.forEach((set) => {
      const slot = 280 / cols.length;
      s += t(set.x0 + 140, 16, set.name + ": 400 units of labor", "t-big");
      set.data.forEach((v, i) => {
        const cx = set.x0 + slot * (i + 0.5);
        if (v > 0) {
          s += rect(cx - slot * 0.38, Y(v), slot * 0.76, Y(0) - Y(v), i === 4 ? "present" : "past");
          s += t(cx, Y(v) - 6, v, "t-strong");
        }
        s += t(cx, Y(0) + 16, cols[i]);
      });
      s += line(set.x0, Y(0), set.x0 + 280, Y(0), "ax");
      s += t(set.x0 + 140, Y(0) + 36, "years before the final year");
    });
    return svg(W, H, s, "Labor applied to x and y in each year before the final product") +
      C.legend([["var(--blue-soft)", "Past labor (in tools and materials)"], ["var(--green)", "Present labor (final year)"]]);
  };

  // Grouped before/after bars for comparative advantage.
  C.tradeBars = (before, after, reveal) => {
    const W = 640, H = 250, L = 30, R = 30, T = 30, B = 40;
    const max = Math.max(...before, ...after) * 1.2;
    const Y = (v) => T + (H - T - B) * (1 - v / max);
    const groups = ["Cloth (world total)", "Wine (world total)"];
    let s = "";
    groups.forEach((g, i) => {
      const gx = L + ((W - L - R) / 2) * i + (W - L - R) / 4;
      [["before", before[i], "Before"], ["after", after[i], "Specialized"]].forEach((b, j) => {
        const x = gx + (j === 0 ? -86 : 6);
        s += rect(x, Y(b[1]), 80, Y(0) - Y(b[1]), b[0]);
        s += t(x + 40, Y(b[1]) - 8, j === 1 && !reveal ? "?" : String(+b[1].toFixed(3)), "t-big");
        s += t(x + 40, Y(0) + 16, b[2]);
      });
      s += t(gx, H - 4, g, "t-strong");
    });
    s += line(L, Y(0), W - R, Y(0), "ax");
    return svg(W, H, s, "World output of cloth and wine before and after specialization");
  };

  // Ricardo's price formula from Tables 5.1 and 5.2.
  LAB.price = (present, pastPerYear, years, w, r) => {
    const A = present * w;
    let B = 0;
    for (let k = 1; k <= years; k++) B += pastPerYear * w * Math.pow(1 + r, k);
    const C2 = r * (A + B);
    const D = A + B + C2;
    return { A, B, C: C2, D, E: D / 100 };
  };
})();
