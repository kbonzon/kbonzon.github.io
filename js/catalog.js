// The list of every game on the site.
// To add a game: put its data file in /games, then add one entry here.
//   id:    must match the file name in /games (without .js)
//   type:  "trivia" or "story"
window.CATALOG = [
  {
    id: "who-said-it",
    type: "trivia",
    title: "Who Said It? The Classical Economists",
    description: "Match the big ideas of 1750 to 1900 with the thinkers behind them.",
    unit: "Unit 1: Classical Economics"
  },
  {
    id: "kings-treasury",
    type: "story",
    title: "Advisor to the King",
    description: "It's 1776. The treasury is nervous and the king wants your advice. Mercantilism or free trade?",
    unit: "Unit 1: Classical Economics"
  }
];

// Short posts shown on the home page. Newest first.
window.ENTRIES = [
  {
    date: "September 24, 2026",
    title: "Welcome to The Bonzon Exchange",
    text: "This site holds my games and notes for History of Economic Thought this semester. First up: a classical economists trivia game and a story game about mercantilism."
  }
];
