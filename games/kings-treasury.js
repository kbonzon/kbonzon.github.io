// Story game. Each scene has an id (the key), a title, and text paragraphs.
// Normal scenes list choices, each pointing to another scene id with "to".
// Ending scenes set ending: true and can add a "lesson" about the real history.
window.GAME = {
  start: "treasury",
  scenes: {
    treasury: {
      title: "The Royal Treasury, 1776",
      text: [
        "The king's chief treasurer slams a ledger shut. \"Gold is leaving the kingdom, Your Majesty. Our merchants buy foreign cloth and pay in coin.\"",
        "The king turns to you, his newest economic advisor. \"Well? What do we do?\""
      ],
      choices: [
        { label: "Ban foreign cloth and keep our gold at home.", to: "mercantile" },
        { label: "Ask the French thinkers who say all wealth comes from the land.", to: "physiocrats" },
        { label: "Mention a new book from a Scottish professor named Adam Smith.", to: "smith" }
      ]
    },

    mercantile: {
      title: "Walls of Gold",
      text: [
        "You put heavy tariffs on imports and give a royal company exclusive rights to trade with the colonies. Within a year, less gold leaves the kingdom.",
        "But cloth prices have doubled. Smugglers work every harbor, and the colonies grumble about being forced to buy only from the royal company."
      ],
      choices: [
        { label: "Double down: more tariffs, more navy ships to stop smugglers.", to: "end_tradewar" },
        { label: "Maybe gold isn't the whole story. Open that Scottish book after all.", to: "smith" }
      ]
    },

    physiocrats: {
      title: "A Letter from Versailles",
      text: [
        "A letter arrives from followers of Dr. François Quesnay. Only farming, they write, creates a true surplus. Merchants and craftsmen just move wealth around.",
        "Their advice: let trade flow freely (laissez-faire!) and replace the tangle of taxes with one single tax on land."
      ],
      choices: [
        { label: "Adopt the single tax on land.", to: "end_landtax" },
        { label: "Free trade sounds right, but is it only about farms? Read the Scottish book.", to: "smith" }
      ]
    },

    smith: {
      title: "The Wealth of Nations",
      text: [
        "You open the freshly printed volume. Smith argues that a nation's wealth is not the gold in its vaults. It is the goods and services its people can produce.",
        "Trade, he says, isn't a contest where one side's gain is the other's loss. Both sides can come out ahead."
      ],
      choices: [
        { label: "Recommend lowering tariffs so trade can grow.", to: "end_freetrade" },
        { label: "Not convinced yet. Visit the pin factory he describes.", to: "pins" }
      ]
    },

    pins: {
      title: "The Pin Factory",
      text: [
        "An untrained worker on their own could barely make one pin a day, and certainly not twenty.",
        "Here, ten workers each do one step: one draws the wire, another straightens it, a third cuts it, and so on. Together they make about 48,000 pins a day.",
        "The foreman shrugs. \"Only works if we can sell that many pins. We need bigger markets.\""
      ],
      choices: [
        { label: "Division of labor needs big markets. Open trade to grow them.", to: "end_freetrade" },
        { label: "Keep markets small and protected. Stability matters more.", to: "end_tradewar" }
      ]
    },

    end_tradewar: {
      title: "Ending: The Trade War",
      ending: true,
      text: [
        "Rival kingdoms answer your tariffs with tariffs of their own. The navy is expensive, the colonies are furious, and the treasury has less gold than when you started."
      ],
      lesson: "This is the mercantile system that Smith attacked in Book IV of The Wealth of Nations. Mercantilists like Thomas Mun saw trade as zero-sum and aimed for surpluses of bullion. Britain's own trade restrictions helped fuel the anger in the American colonies."
    },

    end_landtax: {
      title: "Ending: The Landlords Revolt",
      ending: true,
      text: [
        "The great landowners are outraged to carry the whole tax burden. They pressure the king, and within months you are dismissed from court."
      ],
      lesson: "Something similar happened in France. Turgot, a minister sympathetic to the Physiocrats, pushed free trade in grain and other reforms from 1774, but powerful interests resisted and he was dismissed in 1776."
    },

    end_freetrade: {
      title: "Ending: A Wealthier Kingdom",
      ending: true,
      text: [
        "Tariffs come down slowly. Cloth gets cheaper, workers specialize, and merchants find new customers abroad. The treasury's gold goes up and down, but people are better off than ever."
      ],
      lesson: "Smith argued that the division of labor is limited by the extent of the market, so freer trade makes nations richer. David Ricardo sharpened the case in 1817 with comparative advantage, and Britain finally repealed its protective Corn Laws in 1846."
    }
  }
};
