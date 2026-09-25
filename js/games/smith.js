// Game 2: The Age of Adam Smith (textbook Chapter 3, "Adam Smith").
// Same format as mercantile.js.
window.GAMES = window.GAMES || {};
window.GAMES.smith = {
  id: "smith",
  title: "The Age of Adam Smith",
  years: "c. 1750–1776",
  place: "Scotland & England",
  intro: [
    "Foreign demand for British goods is booming, workshops called manufactories are spreading through cities like Glasgow, and the first inventions of the industrial revolution are arriving.",
    "Adam Smith wrote The Wealth of Nations (1776) while watching this world take shape. Play five of the people he wrote about, including Smith himself, and see his ideas from their side."
  ],
  finale: {
    title: "Era complete!",
    text: "You’ve seen Smith’s world from five sides: the productivity of divided labor, the unequal fight over wages, the end of feudal power, the pull of prices toward their natural level, and the case for a “system of natural liberty.” Next up in class: Malthus and Ricardo."
  },
  roles: [
    {
      id: "manufacturer",
      name: "The Master Manufacturer",
      year: "c. 1770",
      place: "Glasgow",
      icon: "factory",
      meter: { label: "Capital", prefix: "£", start: 100 },
      world: [
        "You own a manufactory: the building, the tools, and the raw materials. You hire wage laborers, who still work with hand techniques rather than machines.",
        "Between 1700 and 1770, England’s export industries grew far faster than its domestic ones. Buyers want more than your workers can make."
      ],
      tasks: [
        {
          title: "The pin problem",
          text: "You make pins. Right now each worker makes whole pins from start to finish. How do you raise output?",
          choices: [
            { label: "Split the work into many small steps and give each worker just one.", correct: true, delta: 60, result: "Output soars without hiring a single extra hand." },
            { label: "Tell everyone to work faster.", delta: -10, result: "Tired workers make more mistakes, not more pins." },
            { label: "Hire more workers, each still making whole pins.", delta: 0, result: "Output grows only as fast as your wage bill." }
          ],
          lesson: "Smith believed the greatest improvement in the productive power of labor came from the division of labor. He was greatly impressed by how far the manufactories of his day had carried it."
        },
        {
          title: "Too many pins",
          text: "Your workers now make far more pins than your town can buy. What’s your next move?",
          choices: [
            { label: "Find bigger markets in other towns and overseas.", correct: true, delta: 40, result: "New customers let you divide the work even further." },
            { label: "Go back to the old way of working.", delta: -20, result: "You give up the productivity you just gained." },
            { label: "Throw away the extra pins to keep prices up.", delta: -30, result: "Wasted labor and wasted materials." }
          ],
          lesson: "Because the power of exchanging gives rise to the division of labor, Smith wrote, the extent of that division is always limited by the extent of the market."
        },
        {
          title: "Your workers want a raise",
          text: "Your journeymen have banded together and demand higher wages. According to Smith, what usually happens?",
          choices: [
            { label: "You and the other masters hold out and call on the magistrate to enforce the laws against workers’ combinations.", correct: true, delta: 20, result: "The strike collapses, and the ringleaders are punished." },
            { label: "You give in right away.", delta: -30, result: "Smith thought masters almost never had to." },
            { label: "You and the workers bargain as equals and split the difference.", delta: -10, result: "Smith didn’t think this was a contest between equals." }
          ],
          lesson: "Smith saw wages set by a struggle that masters nearly always won. There were fewer of them, so they could combine easily. The law banned workers’ combinations but not theirs. And they could live a year or two on their stock, while many workers couldn’t last a week."
        },
        {
          title: "This year’s profits",
          text: "It was a good year. What do you do with the profits?",
          choices: [
            { label: "Reinvest them in more materials and tools so the work can be divided further.", correct: true, delta: 50, result: "Your stock grows, and so does your output." },
            { label: "Hire a houseful of servants.", delta: -20, result: "Smith called servants’ labor “unproductive.” It adds nothing to capital." },
            { label: "Bury them in the garden.", delta: -30, result: "Idle money builds nothing." }
          ],
          lesson: "For Smith, accumulating capital (“stock”) had to come before further division of labor. So profits, the source of new capital, drove economic progress. Labor that helped accumulate capital was productive; the labor of menial servants was not."
        }
      ],
      takeaway: [
        "In the manufactories, Smith could see the capitalist as someone distinct from both the merchant and the wage laborer, and he saw the huge productivity gains from dividing labor.",
        "He was the first major economist to clearly separate profit on industrial capital from wages, rents, and merchants’ profits."
      ]
    },

    {
      id: "laborer",
      name: "The Laborer",
      year: "c. 1770",
      place: "Glasgow",
      icon: "worker",
      meter: { label: "Savings", suffix: " shillings", start: 20 },
      world: [
        "You own no land and no tools. To live, you have to sell your labor for a wage to someone who does.",
        "You came to the city from the countryside, where landlords have cut the number of tenants so they can farm more efficiently."
      ],
      tasks: [
        {
          title: "Who keeps the value you add?",
          text: "All day you turn your employer’s wire into pins. The pins sell for much more than the wire cost. Who gets that extra value?",
          choices: [
            { label: "It’s split. I get a wage, and the rest becomes my employer’s profit.", correct: true, delta: 5, result: "You get your week’s wage." },
            { label: "I get all of it, since my labor made it.", delta: 0, result: "Smith said that was only true before capital was accumulated and land became private property." },
            { label: "It all goes to the king in taxes.", delta: 0, result: "Not in Smith’s account. It goes to your employer." }
          ],
          lesson: "Smith wrote that once capital builds up in particular hands, the value workers add to materials resolves itself into their employer’s profits. Only in an “early and rude state of society” does the whole produce of labor belong to the laborer."
        },
        {
          title: "The strike",
          text: "Wages are low, and you and your fellow workers talk about banding together to demand more. How long could you hold out without pay?",
          choices: [
            { label: "Not long. Maybe a week before my family goes hungry.", correct: true, delta: -10, result: "The strike ends quickly, and on the masters’ terms." },
            { label: "A year or two, easily.", delta: -15, result: "That’s how long a master could last, not a worker." },
            { label: "As long as it takes. The law protects us.", delta: -15, result: "The law banned workers’ combinations, and ringleaders were often punished." }
          ],
          lesson: "Smith observed that many workers couldn’t survive a week without work, few could last a month, and hardly any a year. Workers’ combinations were loud and desperate, but they usually ended only in the punishment or ruin of the ringleaders."
        },
        {
          title: "The price of bread",
          text: "A bad harvest drives up the price of corn (grain). According to Smith, what has to happen to your money wage?",
          choices: [
            { label: "It has to rise, since wages must cover subsistence and bread is most of it.", correct: true, delta: 0, result: "Your wage rises, but only enough to keep you fed." },
            { label: "It falls.", delta: -10, result: "Then you couldn’t buy enough to live on." },
            { label: "It stays the same. Wages have nothing to do with food.", delta: -10, result: "In Smith’s view, wages were tied to what workers needed to survive." }
          ],
          lesson: "Smith and the other classical economists believed wages tended toward subsistence, which was mostly grain. A higher corn price meant higher money wages, and since wages were the biggest cost of production, higher prices for everything. Smith concluded that the money price of corn regulates the price of all other home-made goods."
        },
        {
          title: "Ten years at one task",
          text: "You’ve spent ten years doing one simple step, over and over. What did Smith fear this does to a worker?",
          choices: [
            { label: "It dulls the mind, because the worker never has to solve a new problem.", correct: true, delta: 0, result: "Smith, the champion of divided labor, saw its human cost too." },
            { label: "It makes the worker a master of every trade.", delta: 0, result: "The opposite. The worker’s skill narrows to a single step." },
            { label: "Nothing. Talent is fixed at birth.", delta: 0, result: "Smith thought the gap between a philosopher and a street porter came more from habit, custom, and education than from nature." }
          ],
          lesson: "Smith warned that a person whose whole life is spent on a few simple operations never needs to use their understanding or invention, loses the habit of doing so, and generally becomes as ignorant as a person can become."
        }
      ],
      takeaway: [
        "From the laborer’s side, Smith’s system looks less harmonious. He saw labor as the only original creator of value, but he also saw capitalists win the fight over wages with the law on their side.",
        "That tension between class conflict and the harmony of the invisible hand runs all through The Wealth of Nations."
      ]
    },

    {
      id: "landlord",
      name: "The Landlord",
      year: "c. 1750",
      place: "A Scottish estate",
      icon: "estate",
      meter: { label: "Rents", prefix: "£", start: 100 },
      world: [
        "Your ancestors ruled their lands like petty princes: judge, lawmaker, and war leader to their tenants.",
        "With nothing to buy, they spent their surplus feeding crowds of retainers who owed them obedience. But the growing towns are now full of fine things to buy."
      ],
      tasks: [
        {
          title: "What to do with the surplus",
          text: "Your estate produces far more than your household needs, and shops in town sell fine watches, silver, and silks. What do you do with your surplus?",
          choices: [
            { label: "Trade it in town for manufactured luxuries.", correct: true, delta: 20, result: "You enjoy your new finery. Without your surplus to feed them, your retainers drift away, and your power goes with them." },
            { label: "Keep feeding a hundred retainers with rustic hospitality.", delta: 0, result: "That’s how your ancestors used it, back when there was nothing else to buy." },
            { label: "Store it until it rots.", delta: -30, result: "Pure waste." }
          ],
          lesson: "Smith argued that growing towns gave lords a market where they could exchange their surplus for manufactured goods. Lords sought only to gratify “the most childish vanity” and merchants only to turn a penny, yet neither foresaw the great revolution they were bringing about."
        },
        {
          title: "Too many tenants",
          text: "To afford more from town, you need a bigger income. Your farms are worked by far more tenants than they need. What do you do?",
          choices: [
            { label: "Dismiss the extra tenants and farm more efficiently.", correct: true, delta: 40, result: "Your rents rise. The dismissed families head for the towns." },
            { label: "Keep them all, as a matter of honor.", delta: -10, result: "Your income stays flat while your neighbors’ grows." },
            { label: "Turn them into soldiers for a private army.", delta: -20, result: "That belongs to the feudal age that’s now ending." }
          ],
          lesson: "Smith wrote that the desire for manufactured goods led lords to cut their tenants down to the number actually needed to farm the land. He linked this to the enclosure movements and to more efficient, commercial farming."
        },
        {
          title: "Half-hearted work",
          text: "Your remaining tenants work half-heartedly. How do you get more out of them?",
          choices: [
            { label: "Give them secure leases and let them own property, so they have a reason to work hard.", correct: true, delta: 30, result: "Output rises now that tenants gain from their own effort." },
            { label: "Watch them more closely.", delta: -10, result: "Supervision costs you time and money, and they still have no stake." },
            { label: "Threaten them.", delta: -20, result: "Fear doesn’t make people work well." }
          ],
          lesson: "Smith argued that a person who can acquire no property has no interest except to eat as much and work as little as possible. So landlords’ purely selfish motives led them to end serfdom and give producers rights and security. Smith saw this as the most progressive feature of capitalism."
        },
        {
          title: "Why rent?",
          text: "A tenant asks why they must pay you rent at all. What’s the honest answer, in Smith’s view?",
          choices: [
            { label: "Because I own the land. Once all land is private property, the worker must give up part of what they produce to the landlord.", correct: true, delta: 20, result: "Blunt, but it’s Smith’s answer." },
            { label: "Because I work harder than my tenants.", delta: -10, result: "Smith said landlords reap where they never sowed." },
            { label: "Because the land creates a surplus as a gift of nature, and that belongs to me.", delta: -10, result: "That’s the Physiocrats’ reasoning. Smith rejected the idea that only land produces a surplus." }
          ],
          lesson: "Smith wrote that landlords, like all other men, “love to reap where they never sowed.” Rent became one of the three parts of a price, along with wages and profits, in what has been called his “adding-up” theory of price."
        }
      ],
      takeaway: [
        "Through choices like yours, feudal power dissolved into commercial society. Smith saw history moving through four stages: hunting, pasturage, agriculture, and commerce.",
        "No one planned this change. For Smith it was a prime example of people being led, as if by an invisible hand, to ends that were no part of their intention."
      ]
    },

    {
      id: "merchant",
      name: "The Merchant",
      year: "c. 1770",
      place: "Glasgow",
      icon: "ship",
      meter: { label: "Purse", prefix: "£", start: 100 },
      world: [
        "Glasgow’s merchants are doing well, but the old tricks of the mercantile age pay less now. Competition has narrowed price gaps between regions.",
        "Meanwhile, Parliament still hands out bounties, tariffs, and monopolies to those who lobby hard enough."
      ],
      tasks: [
        {
          title: "Linen is booming",
          text: "The market price of linen has shot well above its natural price, and linen dealers are earning more than the usual rate of profit. What do you and other merchants do?",
          choices: [
            { label: "Move capital into linen to share in the high profits.", correct: true, delta: 40, result: "As you and others pile in, supply grows and the price drifts back toward its natural level." },
            { label: "Stay out. The high price will last forever.", delta: -10, result: "It won’t. Others move in and the price falls." },
            { label: "Pull out of linen entirely.", delta: -10, result: "You leave just as the profits are best." }
          ],
          lesson: "Smith separated the market price, set day to day by supply and demand, from the natural price, which just covers ordinary wages, profits, and rents. High profits attract capital, supply rises, and the market price is pushed toward the natural price."
        },
        {
          title: "A friendly dinner",
          text: "Other merchants in your trade invite you to dinner. What did Smith say usually happens at such gatherings?",
          choices: [
            { label: "The conversation turns to a scheme to raise prices.", correct: true, delta: 30, result: "Good for your purse, bad for the public." },
            { label: "They plan how to lower prices for the public.", delta: -10, result: "Smith was far more cynical than that." },
            { label: "Nothing but pleasant conversation.", delta: 0, result: "Smith doubted it." }
          ],
          lesson: "Smith wrote that people in the same trade rarely meet, even for fun, without the talk ending in a conspiracy against the public or a scheme to raise prices. Narrowing competition always serves dealers and works against the public."
        },
        {
          title: "Home or abroad?",
          text: "You have capital to invest. You could back a workshop in your own town, where you can keep an eye on it, or send it into a distant foreign trade. With no government favors either way, what do you choose?",
          choices: [
            { label: "The workshop at home, where my capital is safer.", correct: true, delta: 30, result: "Seeking only your own security, you also add to your country’s annual revenue." },
            { label: "The distant trade, for the adventure.", delta: -10, result: "Riskier, and harder to keep watch over." },
            { label: "Lobby Parliament for a bounty so the foreign trade pays better.", delta: -10, result: "Smith argued that favors like this misdirect capital." }
          ],
          lesson: "In his most famous passage, Smith said an investor who prefers domestic industry intends only his own security and gain, yet is “led by an invisible hand” to promote society’s welfare, an end that was no part of his intention."
        },
        {
          title: "Getting supplies",
          text: "You need a local baker to supply bread for your ship’s crew on time. How do you persuade the baker?",
          choices: [
            { label: "Show the baker how the deal will profit them.", correct: true, delta: 20, result: "The bread arrives on time." },
            { label: "Appeal to the baker’s kindness.", delta: -10, result: "Smith wouldn’t count on it." },
            { label: "Explain how badly your crew needs the bread.", delta: -10, result: "Smith said to talk of their advantages, not your needs." }
          ],
          lesson: "Smith wrote that we expect our dinner not from the benevolence of the butcher, the brewer, or the baker, but from their regard to their own interest. In free markets, self-interest leads people to produce what others need and want."
        }
      ],
      takeaway: [
        "Smith wasn’t against merchants, but he distrusted their lobbying. He argued that dealers’ interests are often the opposite of the public’s.",
        "His answer was competition. In free markets, he argued, self-interest pushes prices toward their natural level and capital toward its most valuable uses."
      ]
    },

    {
      id: "smith",
      name: "Adam Smith",
      year: "1776",
      place: "Scotland & London",
      icon: "book",
      meter: { label: "Argument strength", start: 50 },
      world: [
        "You are Adam Smith (1723–1790): former Glasgow professor, author of The Theory of Moral Sentiments (1759), and a visitor to France (1764–66), where you met Quesnay and Turgot.",
        "You’re finishing An Inquiry into the Nature and Causes of the Wealth of Nations. Time to make your case."
      ],
      tasks: [
        {
          title: "What is wealth?",
          text: "A mercantilist insists that England’s wealth is its stock of gold and silver. How do you answer?",
          choices: [
            { label: "A nation’s wealth is the annual produce of its land and labor. It was labor, not gold or silver, that originally purchased all the world’s wealth.", correct: true, delta: 15, result: "The mercantilist has no reply." },
            { label: "Agreed. More bullion makes a richer nation.", delta: -15, result: "That’s the mercantile system you spend Book IV attacking." },
            { label: "Wealth comes only from the land.", delta: -10, result: "That’s the Physiocrats’ view, not yours." }
          ],
          lesson: "For Smith, economic welfare depended on the annual “produce of labour” and the number of people who share it. He wrote that it was not by gold or silver but by labor that all the wealth of the world was originally purchased."
        },
        {
          title: "Answering the Physiocrats",
          text: "Quesnay’s followers call manufacturing “sterile.” What’s your reply?",
          choices: [
            { label: "Manufacturing labor is productive: it makes a sellable good and earns a profit that can be reinvested.", correct: true, delta: 15, result: "You’ve widened “productive” well beyond the farm." },
            { label: "They’re right. Only farming creates a surplus.", delta: -15, result: "You disagreed with them on exactly this point." },
            { label: "Only foreign trade is productive.", delta: -10, result: "You actually ranked foreign trade last." }
          ],
          lesson: "Smith called labor productive if it produced a profit or a tangible, sellable commodity. What mattered was that it furthered capital accumulation. Services sold to the wealthy or the government, however desirable, were unproductive."
        },
        {
          title: "Water and diamonds",
          text: "A student asks: why is water, which is so useful, nearly free, while a diamond, which is barely useful, costs a fortune?",
          choices: [
            { label: "Value in use and value in exchange are different things, and they don’t have to line up.", correct: true, delta: 15, result: "Exactly the distinction you drew." },
            { label: "Because diamonds are more useful than water.", delta: -10, result: "Nothing is more useful than water." },
            { label: "Because water is scarce.", delta: -10, result: "Water is plentiful. That’s part of the puzzle." }
          ],
          lesson: "Smith separated “value in use” from “value in exchange” and rejected use value as a determinant of price. Later utility theorists called this the water–diamond paradox and explained it with marginal utility."
        },
        {
          title: "The price of things",
          text: "In a society with capitalists and landlords, what makes up the natural price of a good?",
          choices: [
            { label: "Wages, profits, and rent, each at its ordinary rate.", correct: true, delta: 15, result: "Your “adding-up” theory of price." },
            { label: "Only the labor that went into making it.", delta: -5, result: "You thought that held only in an early society of hunters, before capital and private land: if a beaver takes twice the labor of a deer, it trades for two deer." },
            { label: "Whatever the king decrees.", delta: -15, result: "Prices are set in the market, not by decree." }
          ],
          lesson: "Once capital and land are privately owned, Smith said, price is the sum of wages, profits, and rents. Its weakness is circularity: it explains prices using other prices."
        },
        {
          title: "The role of government",
          text: "A member of Parliament asks what government should do in your “system of natural liberty.” Which list is yours?",
          choices: [
            { label: "Defend the nation, administer justice, and build public works that no individual would profit from building.", correct: true, delta: 15, result: "The three duties of the sovereign." },
            { label: "Direct capital into whichever industries serve the nation best.", delta: -15, result: "You said no person or council could safely be trusted with that authority." },
            { label: "Grant monopolies and bounties to encourage exports.", delta: -15, result: "That’s the mercantile system you set out to dismantle." }
          ],
          lesson: "Smith gave government only three duties: defense, justice, and certain public works and institutions. Beyond that, he argued, the “obvious and simple system of natural liberty” would establish itself."
        }
      ],
      takeaway: [
        "Smith wrote as commercial society and early industry took shape around him. His system of natural liberty attacked both the mercantilists’ privileges and the Physiocrats’ claim that only land is productive.",
        "His writing also carries a tension: labor creates value and class conflict is real, yet an invisible hand harmonizes self-interest. Two rival traditions in economics trace their roots to him."
      ]
    }
  ]
};
