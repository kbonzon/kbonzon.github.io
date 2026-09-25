# History of Economic Thought: Class Website

Abigail Bonzon · Baylor 2026. Plain HTML, CSS, and JavaScript with no build step, hosted on GitHub Pages.

## Files

```
index.html               home page (welcome + project list)
build-1.html             Build 1: Pre–Adam Smith and Adam Smith
css/style.css            all styling
js/site.js               list of builds (drives the top nav and the project list)
js/role-game.js          role-playing game engine
js/games/mercantile.js   Game 1: The Mercantile Age (textbook ch. 2)
js/games/smith.js        Game 2: The Age of Adam Smith (textbook ch. 3)
```

## Add a new build

1. Copy `build-1.html` to `build-2.html` and change its heading, note, and game scripts.
2. Add an entry to `window.BUILDS` in `js/site.js`.

The nav bar and home page list update automatically.

## Edit a game

Each role in `js/games/*.js` has a `world` intro, a list of `tasks` (each with one `correct: true` choice and a `lesson`), and a `takeaway`. Choices are shuffled when played.
