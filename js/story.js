// Story (choose-your-path) engine. Game data format (see games/kings-treasury.js):
//   window.GAME = {
//     start: "<scene id>",
//     scenes: {
//       "<scene id>": { title, text: [paragraphs], choices: [ { label, to } ] },
//       "<ending id>": { title, text: [...], ending: true, lesson: "..." }
//     }
//   }
window.loadGame("story", function (game, entry, root) {
  var endingsKey = "endings:" + entry.id;
  var endingIds = Object.keys(game.scenes).filter(function (id) { return game.scenes[id].ending; });
  var steps;

  function found() {
    try { return JSON.parse(store.get(endingsKey)) || []; } catch (e) { return []; }
  }

  function begin() {
    steps = 0;
    show(game.start);
  }

  function show(id) {
    var scene = game.scenes[id];
    if (!scene) {
      root.innerHTML = "";
      root.appendChild(h("p", { class: "error", text: "Missing scene: " + id }));
      return;
    }

    var body = [h("h2", { text: scene.title })];
    body.push(h("div", { class: "story-text" }, scene.text.map(function (p) { return h("p", { text: p }); })));

    if (scene.ending) {
      var seen = found();
      if (seen.indexOf(id) === -1) seen.push(id);
      store.set(endingsKey, JSON.stringify(seen));

      if (scene.lesson) {
        body.push(h("div", { class: "lesson" }, [
          h("strong", { text: "The history behind it: " }),
          h("span", { text: scene.lesson })
        ]));
      }
      body.push(h("div", { class: "actions" }, [
        h("button", { class: "btn", text: "Start over", onclick: begin }),
        h("a", { class: "btn secondary", href: "../index.html#games", text: "More games" })
      ]));
    } else {
      body.push(h("div", { class: "choices" }, scene.choices.map(function (c) {
        return h("button", { class: "choice", text: c.label, onclick: function () { steps++; show(c.to); } });
      })));
    }

    root.innerHTML = "";
    root.appendChild(h("div", { class: "meta" }, [
      h("span", { text: scene.ending ? "The End" : "Decision " + (steps + 1) }),
      h("span", { text: "Endings found: " + found().length + " of " + endingIds.length })
    ]));
    root.appendChild(h("div", { class: "panel" }, body));
    window.scrollTo(0, 0);
  }

  begin();
});
