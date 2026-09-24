// Shared by the game player pages. Reads ?game=<id>, checks it against the
// catalog, loads /games/<id>.js, then hands the data to the page's start().
window.loadGame = function (expectedType, start) {
  var id = new URLSearchParams(window.location.search).get("game");
  var entry = window.CATALOG.find(function (g) { return g.id === id; });
  var root = document.getElementById("game");

  function fail(message) {
    root.innerHTML = "";
    var p = document.createElement("p");
    p.className = "error";
    p.textContent = message;
    root.appendChild(p);
  }

  if (!entry || entry.type !== expectedType) {
    fail("Game not found. Head back to the home page and pick one from the list.");
    return;
  }

  document.title = entry.title + " · The Bonzon Exchange";
  document.getElementById("game-title").textContent = entry.title;
  document.getElementById("game-desc").textContent = entry.description;

  window.GAME = null;
  var script = document.createElement("script");
  script.src = "../games/" + entry.id + ".js";
  script.onload = function () {
    if (!window.GAME) return fail("This game's data file didn't set window.GAME.");
    start(window.GAME, entry, root);
  };
  script.onerror = function () { fail("Couldn't load games/" + entry.id + ".js"); };
  document.body.appendChild(script);
};

// Small helpers used by both engines.
window.h = function (tag, attrs, children) {
  var node = document.createElement(tag);
  Object.keys(attrs || {}).forEach(function (key) {
    if (key === "text") node.textContent = attrs[key];
    else if (key === "onclick") node.addEventListener("click", attrs[key]);
    else node.setAttribute(key, attrs[key]);
  });
  (children || []).forEach(function (child) { if (child) node.appendChild(child); });
  return node;
};

window.store = {
  get: function (key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  },
  set: function (key, value) {
    try { window.localStorage.setItem(key, value); } catch (e) { /* storage unavailable */ }
  }
};
