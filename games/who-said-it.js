// Trivia game. Each question needs:
//   q        the question
//   choices  the answer options
//   answer   which choice is right, counting from 0 (first choice = 0)
//   explain  shown after the player answers (optional)
window.GAME = {
  questions: [
    {
      q: "Who wrote An Inquiry into the Nature and Causes of the Wealth of Nations (1776)?",
      choices: ["David Hume", "Adam Smith", "David Ricardo", "Thomas Malthus"],
      answer: 1,
      explain: "Adam Smith published The Wealth of Nations in 1776, the same year as the American Declaration of Independence."
    },
    {
      q: "Smith opens The Wealth of Nations with a pin factory. What idea is it meant to show?",
      choices: ["The labor theory of value", "The division of labor", "Diminishing returns", "The invisible hand"],
      answer: 1,
      explain: "By splitting pin-making into about 18 separate steps, ten workers could make roughly 48,000 pins a day."
    },
    {
      q: "Which economist used England's cloth and Portugal's wine to explain comparative advantage?",
      choices: ["John Stuart Mill", "Adam Smith", "David Ricardo", "Jean-Baptiste Say"],
      answer: 2,
      explain: "Ricardo made the case in On the Principles of Political Economy and Taxation (1817)."
    },
    {
      q: "Thomas Malthus argued that population grows geometrically, but food supply grows…",
      choices: ["Geometrically too", "Arithmetically", "Not at all", "Exponentially faster"],
      answer: 1,
      explain: "From An Essay on the Principle of Population (1798). Population would outrun food until checks like famine held it back."
    },
    {
      q: "Mercantilists believed a nation's wealth was best measured by…",
      choices: ["Its stock of gold and silver", "The skill of its workers", "The size of its farms", "Its population's happiness"],
      answer: 0,
      explain: "Mercantilists pushed for trade surpluses to pile up bullion. Smith attacked this view in Book IV of The Wealth of Nations."
    },
    {
      q: "The Physiocrats, led by François Quesnay, saw which sector as the only true source of wealth?",
      choices: ["Manufacturing", "Banking", "Agriculture", "Overseas trade"],
      answer: 2,
      explain: "Quesnay's Tableau Économique (1758) traced how the surplus from land flowed through the economy."
    },
    {
      q: "\"Supply creates its own demand\" is the usual summary of whose law?",
      choices: ["Jean-Baptiste Say", "Karl Marx", "Alfred Marshall", "John Maynard Keynes"],
      answer: 0,
      explain: "Say's Law. Keynes later made rejecting it central to his General Theory (1936)."
    },
    {
      q: "Who wrote Principles of Political Economy (1848), a leading textbook for decades?",
      choices: ["Thomas Malthus", "John Stuart Mill", "William Stanley Jevons", "Adam Smith"],
      answer: 1,
      explain: "Mill's Principles pulled classical economics together and stayed the standard text into the late 1800s."
    },
    {
      q: "Jevons, Menger, and Walras are linked to which 1870s shift in economics?",
      choices: ["The Keynesian revolution", "The marginal revolution", "The Physiocratic school", "The rise of mercantilism"],
      answer: 1,
      explain: "Working separately, they explained value through marginal utility rather than labor costs."
    },
    {
      q: "Alfred Marshall compared supply and demand setting a price to…",
      choices: ["An invisible hand", "The two blades of a pair of scissors", "A pendulum", "A tug of war"],
      answer: 1,
      explain: "In Principles of Economics (1890), Marshall said asking whether supply or demand sets price is like asking which blade of the scissors does the cutting."
    }
  ]
};
