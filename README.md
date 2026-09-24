# The Bonzon Exchange

Abby Bonzon's History of Economic Thought site (Fall 2026). Plain HTML, CSS, and JavaScript. No build step.

## Folder layout

```
index.html          home page
css/style.css       all styling
js/catalog.js       list of games + home page updates  <- edit this often
js/trivia.js        trivia game engine
js/story.js         story game engine
play/trivia.html    page that plays any trivia game
play/story.html     page that plays any story game
games/*.js          one data file per game              <- add new games here
```

## Add a new game

1. Copy `games/who-said-it.js` (trivia) or `games/kings-treasury.js` (story) to a new file, like `games/keynes-quiz.js`.
2. Edit the questions or scenes.
3. Add an entry to `js/catalog.js` whose `id` matches the file name (`keynes-quiz`) and whose `type` is `trivia` or `story`.

It appears on the home page automatically.

## Post an update

Add an item to the top of `window.ENTRIES` in `js/catalog.js`.

## Preview locally

Double-click `index.html` to open it in your browser.

## Publish on GitHub Pages

1. Make a free account at github.com.
2. Create a new public repository named `<your-username>.github.io` (for example `abbybonzon.github.io`).
3. On the repo page, choose **uploading an existing file** and drag in everything inside this folder (not the folder itself).
4. Commit. After a minute or two, the site is live at `https://<your-username>.github.io`.
5. To update later, upload the changed files again (or edit them right on GitHub).
