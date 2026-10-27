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
build-2.html             Build 2: David Ricardo's Model
js/lab.js                step-by-step workbook engine + charts
js/lessons/ricardo.js    Build 2 lessons (textbook ch. 5)
build-3.html             Build 3: Bentham, Say, and Senior
js/lessons/bentham-say-senior.js   Build 3 lessons + comparison quiz (textbook ch. 6)
```

## Cache tags

The HTML pages load CSS and JS with a version tag (for example `js/site.js?v=3`) so browsers fetch fresh copies after an update. When you change any CSS or JS file, bump the number in all the HTML pages.

## Add a new build

1. Copy `build-1.html` to `build-2.html` and change its heading, note, and game scripts.
2. Add an entry to `window.BUILDS` in `js/site.js`.

The nav bar and home page list update automatically.

## Edit a game

Each role in `js/games/*.js` has a `world` intro, a list of `tasks` (each with one `correct: true` choice and a `lesson`), and a `takeaway`. Choices are shuffled when played.
