// Builds the game cards and update list on the home page from catalog.js.
(function () {
  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  var grid = document.getElementById("game-grid");
  window.CATALOG.forEach(function (game) {
    var card = el("article", "card");
    card.appendChild(el("span", "tag", game.type === "story" ? "Story" : "Trivia"));
    card.appendChild(el("h3", null, game.title));
    card.appendChild(el("p", null, game.description));
    if (game.unit) card.appendChild(el("p", null, game.unit));

    var foot = el("div", "card-foot");
    var link = el("a", "btn", "Play");
    link.href = "play/" + game.type + ".html?game=" + encodeURIComponent(game.id);
    foot.appendChild(link);
    card.appendChild(foot);
    grid.appendChild(card);
  });

  var list = document.getElementById("entry-list");
  window.ENTRIES.forEach(function (entry) {
    var li = el("li");
    li.appendChild(el("div", "date", entry.date));
    li.appendChild(el("h3", null, entry.title));
    li.appendChild(el("p", null, entry.text));
    list.appendChild(li);
  });
})();
