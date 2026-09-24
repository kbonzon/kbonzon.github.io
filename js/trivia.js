// Trivia engine. Game data format (see games/who-said-it.js):
//   window.GAME = { questions: [ { q, choices: [...], answer: <index>, explain } ] }
window.loadGame("trivia", function (game, entry, root) {
  var bestKey = "best:" + entry.id;
  var index, score;

  function start() {
    index = 0;
    score = 0;
    showQuestion();
  }

  function header() {
    var total = game.questions.length;
    return [
      h("div", { class: "progress" }, [h("div", { style: "width:" + (index / total) * 100 + "%" })]),
      h("div", { class: "meta" }, [
        h("span", { text: "Question " + Math.min(index + 1, total) + " of " + total }),
        h("span", { id: "score", text: "Score: " + score })
      ])
    ];
  }

  function showQuestion() {
    var item = game.questions[index];
    var feedbackSlot = h("div");
    var nextSlot = h("div", { class: "actions" });

    var buttons = item.choices.map(function (choice, i) {
      return h("button", { class: "choice", text: choice, onclick: function () { pick(i); } });
    });

    function pick(i) {
      var right = i === item.answer;
      if (right) score++;
      document.getElementById("score").textContent = "Score: " + score;
      buttons.forEach(function (b, j) {
        b.disabled = true;
        if (j === item.answer) b.classList.add("correct");
        else if (j === i) b.classList.add("wrong");
      });
      feedbackSlot.appendChild(h("div", { class: "feedback " + (right ? "good" : "bad") }, [
        h("strong", { text: right ? "Correct!" : "Not quite." }),
        item.explain ? h("span", { text: item.explain }) : null
      ]));
      var last = index === game.questions.length - 1;
      var next = h("button", {
        class: "btn",
        text: last ? "See results" : "Next question",
        onclick: function () { index++; last ? showResults() : showQuestion(); }
      });
      nextSlot.appendChild(next);
      next.focus();
    }

    render(header().concat([
      h("div", { class: "panel" }, [
        h("h2", { text: item.q }),
        h("div", { class: "choices" }, buttons),
        feedbackSlot,
        nextSlot
      ])
    ]));
  }

  function showResults() {
    var total = game.questions.length;
    var best = Math.max(score, Number(store.get(bestKey)) || 0);
    store.set(bestKey, String(best));
    var pct = score / total;
    var verdict = pct === 1 ? "Perfect. Adam Smith would be proud."
      : pct >= 0.7 ? "Strong work. You know your classics."
      : pct >= 0.4 ? "Not bad. A quick review and you'll have it."
      : "The invisible hand didn't help this time. Try again!";

    render(header().concat([
      h("div", { class: "panel" }, [
        h("p", { class: "eyebrow", text: "Final score" }),
        h("p", { class: "score-big", text: score + " / " + total }),
        h("p", { text: verdict }),
        h("p", { class: "meta", text: "Your best: " + best + " / " + total }),
        h("div", { class: "actions" }, [
          h("button", { class: "btn", text: "Play again", onclick: start }),
          h("a", { class: "btn secondary", href: "../index.html#games", text: "More games" })
        ])
      ])
    ]));
  }

  function render(nodes) {
    root.innerHTML = "";
    nodes.forEach(function (n) { root.appendChild(n); });
  }

  start();
});
