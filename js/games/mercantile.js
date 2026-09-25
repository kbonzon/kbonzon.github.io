// Game 1: The Mercantile Age (textbook Chapter 2, "Economic Ideas Before Adam Smith").
// Each role: world (intro), tasks (one correct choice each), takeaway (summary).
// delta = change to the role's meter for that choice.
window.GAMES = window.GAMES || {};
window.GAMES.mercantile = {
  id: "mercantile",
  title: "The Mercantile Age",
  years: "c. 1550–1776",
  place: "England & France",
  intro: [
    "Feudalism is fading but not gone. Lords still control most farmland, merchants grow rich by trading, and the new nation-states are taking over jobs the Church used to do.",
    "Step into five lives and make the choices those people actually made. Along the way, you’ll see how the conditions of the time shaped the economic ideas of the time."
  ],
  finale: {
    title: "Era complete!",
    text: "You’ve watched profit move from the merchant’s trick of buying low and selling high to the capitalist’s control of production, and seen thinkers start tracing value back to labor. That’s the world Adam Smith stepped into. Try Game 2 next."
  },
  roles: [
    {
      id: "merchant",
      name: "The Merchant Adventurer",
      year: "c. 1600",
      place: "London",
      icon: "ship",
      meter: { label: "Purse", prefix: "£", start: 100 },
      world: [
        "You belong to one of the great chartered trading companies. Your capital is merchant capital: money, ships, warehouses, and goods waiting to be sold. You don’t make anything yourself.",
        "Most goods are still made by craftsmen who own their own tools, and feudal lords still control farming. Resources, technology, and labor barely move between regions, so the same good can cost very different amounts in different places."
      ],
      tasks: [
        {
          title: "Buy low, sell dear",
          text: "Pepper is cheap in the East Indies and costly in London. Your ship has room for one more cargo. What’s your plan?",
          choices: [
            { label: "Buy pepper where it’s cheap and ship it to London, where it’s dear.", correct: true, delta: 60, result: "The price gap pays for the voyage many times over." },
            { label: "Buy pepper in London and sell it in the East Indies.", delta: -30, result: "You bought where it was expensive and sold where it was cheap. Ouch." },
            { label: "Stay home and open a workshop making pepper grinders.", delta: -10, result: "Merchants of your day don’t look to production for profit, and your rivals take the voyage instead." }
          ],
          lesson: "Early mercantilists saw profit as coming from exchange, not production. Because production conditions differed between regions and little moved between them, relative prices differed widely. Merchants profited by buying where goods were cheap and selling where they were dear."
        },
        {
          title: "Rivals on your route",
          text: "Word of your profits has spread. Three new ships now sail your route, and pepper prices in London are sliding. What do you do?",
          choices: [
            { label: "Petition the Crown for an exclusive charter that keeps rivals out.", correct: true, delta: 50, result: "The charter is granted. Supply stays scarce and prices stay high." },
            { label: "Cut your prices and try to outsell them.", delta: -30, result: "More sellers means more supply, lower prices, and thinner profits for everyone." },
            { label: "Welcome them. Competition is good for the public.", delta: -20, result: "A generous thought, but merchants of your day didn’t argue this way." }
          ],
          lesson: "Competition shrank the price differences merchants lived on: more merchants meant more supply, lower prices, and lower profits. So the great merchant companies sought state-created and enforced monopolies, and went to great lengths to exclude competitors."
        },
        {
          title: "The rising tide of prices",
          text: "Prices across England have been climbing for years. Your warehouse is full of goods you bought last season. When do you sell?",
          choices: [
            { label: "Hold them a while. Prices will probably be higher later.", correct: true, delta: 40, result: "Your stock is worth more every month you wait." },
            { label: "Sell everything today, whatever the price.", delta: -10, result: "You miss the rise your patient rivals enjoy." },
            { label: "Sell below cost to clear space.", delta: -30, result: "You lose money on goods that were only getting more valuable." }
          ],
          lesson: "The inflation of the 16th and 17th centuries meant goods gained value between purchase and sale, giving merchants windfall profits. Nicholas Barbon even described merchants storing goods when plenty drove prices down, waiting until the price rose again."
        },
        {
          title: "What is it worth?",
          text: "A customer asks what your pepper is really worth. How does a merchant of your time answer?",
          choices: [
            { label: "Whatever it can be sold for. Its value comes from its use, and its price from how plentiful or scarce it is.", correct: true, delta: 20, result: "Spoken like Nicholas Barbon himself." },
            { label: "A just price that covers the maker’s costs and supports his traditional station in life.", delta: 0, result: "That’s the older medieval cost-of-production view your generation has abandoned." },
            { label: "The amount of labor it took to produce it.", delta: 0, result: "That idea won’t take hold until the late 1600s, once capitalists control production." }
          ],
          lesson: "Early mercantilists shared three ideas about value: a good’s value is simply its market price, supply and demand set that price, and use value drives demand. Barbon wrote that the market is the best judge of value."
        }
      ],
      takeaway: [
        "Merchants made their money in the gap between buying and selling, so it made sense that they explained value through market prices, supply, and demand.",
        "As the textbook puts it, this wasn’t a failure of reasoning. Their ideas reflected the economic realities of the era they were writing in."
      ]
    },

    {
      id: "lord",
      name: "The Lord of the Manor",
      year: "c. 1560–1601",
      place: "Rural England",
      icon: "estate",
      meter: { label: "Rents", prefix: "£", start: 100 },
      world: [
        "Your family has held this estate for generations. Tenants farm your land, and the surplus they produce beyond their own needs flows to you.",
        "Merchants bring silks, spices, and wine to trade for your wool and grain. And wool is fetching a high price."
      ],
      tasks: [
        {
          title: "Sheep or tenants?",
          text: "Wool prices are high. Your fields are farmed by tenant families who pay small, customary rents. What do you do?",
          choices: [
            { label: "Enclose the fields with hedges and turn them into sheep pasture.", correct: true, delta: 60, result: "Your income climbs, but many tenant families lose their land and livelihood." },
            { label: "Leave the fields as they are. Tradition matters.", delta: -10, result: "Your neighbors enclose and grow richer while your rents stand still." },
            { label: "Give the land to your tenants as their own property.", delta: -50, result: "No lord of your day would have dreamed of it." }
          ],
          lesson: "Enclosure pushed huge numbers of people off the land. During the reigns of Elizabeth I, James I, and Charles I (1558–1649), there was widespread unrest. Its cause was poverty, much of that poverty came from unemployment, and much of the unemployment came from the enclosure movement."
        },
        {
          title: "The merchant’s wagon",
          text: "A merchant arrives with fine cloth and spices and offers them for part of your surplus wool and grain. Do you trade?",
          choices: [
            { label: "Yes. Trade part of your surplus for goods your estate can’t produce.", correct: true, delta: 20, result: "You get your luxuries, and the merchant takes his profit." },
            { label: "No. Your household will make everything it needs.", delta: -10, result: "Your rivals at court are wearing silks and serving spiced wine." },
            { label: "Offer the merchant a share of your land instead.", delta: -30, result: "Land is the source of your power. You don’t trade it away for spices." }
          ],
          lesson: "In the early mercantile period, feudal lords still controlled production and took the surplus. Merchants got their share of it through exchange with the lords, so the surplus was effectively shared between the two groups."
        },
        {
          title: "Beggars at the gate",
          text: "It is 1601. Families pushed off enclosed land now beg in your village, and the monasteries that once fed the poor were closed decades ago. As a local justice, how do you handle it under the new Poor Law?",
          choices: [
            { label: "Collect the compulsory poor rate. Help the old and sick at home, find work for the able poor, and send “incorrigible vagrants” to the house of correction.", correct: true, delta: -10, result: "Order is kept, though it costs your purse something." },
            { label: "Send them to the nearest monastery for charity.", delta: 0, result: "When Henry VIII broke with Rome, the Church’s system of charity was destroyed. There’s nowhere to send them." },
            { label: "Do nothing. Poverty is a personal sin.", delta: -30, result: "The Crown disagrees, and unrest spreads to your fields." }
          ],
          lesson: "With the Church’s charity gone, the state took responsibility for the general welfare. The Poor Law of 1601 recognized the poor’s right to relief, required parish poor rates, and treated different kinds of poor differently. These laws assumed poverty came from the economic system rather than personal sin."
        },
        {
          title: "Setting wages",
          text: "Under the Statute of Artificers, justices like you set the wages laborers may be paid. Workers want more because prices keep rising. What do you do?",
          choices: [
            { label: "Set a maximum wage that protects employers and keeps laborers in their place.", correct: true, delta: 20, result: "Employers are pleased. Laborers’ real wages fall as prices keep climbing." },
            { label: "Raise wages so they keep up with prices.", delta: -20, result: "Your fellow justices, all employers themselves, overrule you." },
            { label: "Remove all limits and let the market decide.", delta: -10, result: "That idea belongs to a much later age." }
          ],
          lesson: "The Statute of Artificers (1563) set maximum wage rates. The Crown felt obliged to protect workers but never tried to raise their status. The justices who set wages usually belonged to the employing class, and real wages probably fell as prices rose faster than wages."
        }
      ],
      takeaway: [
        "You lived under the Christian paternalist ethic: the belief that God chose the wealthy to be caretakers of everyone else’s welfare.",
        "As the Church weakened, the state took over that role. Mercantilist policy combined care for the poor with firm control over them, keeping every class in its proper place."
      ]
    },

    {
      id: "councillor",
      name: "The Queen’s Councillor",
      year: "c. 1570",
      place: "Court of Elizabeth I",
      icon: "crown",
      meter: { label: "Royal favor", start: 50 },
      world: [
        "England has broken with Rome. The monarchy now fills the old Church’s role as guardian of the public welfare.",
        "The realm is restless. Enclosure has thrown people off the land, woolen exports are falling, and seasonal work leaves many idle for up to four months a year. Keeping people employed is your top concern."
      ],
      tasks: [
        {
          title: "Idle looms",
          text: "Woolen exports have slumped, and weavers across England are out of work. What policy do you advise?",
          choices: [
            { label: "Promote exports so that more gold and silver flow in than flow out.", correct: true, delta: 20, result: "Trade revives, bullion flows in, and the looms start again." },
            { label: "Leave trade alone. It will sort itself out.", delta: -20, result: "Unrest grows. No councillor of your day would trust the market to fix this." },
            { label: "Ban foreign trade to protect England.", delta: -30, result: "Without export markets, even more weavers are idle." }
          ],
          lesson: "The desire for full employment was the unifying theme of mercantilist policy. Mercantilists favored foreign trade over domestic trade because they believed it did more for employment, national wealth, and national power. Writers after 1600 stressed that an export surplus caused inflation, which increased employment."
        },
        {
          title: "An inventor at court",
          text: "An inventor asks for the exclusive right to make a new kind of glass in England. What do you recommend?",
          choices: [
            { label: "Grant a patent of monopoly to encourage the new industry.", correct: true, delta: 15, result: "A new industry takes root. (Other patent holders will soon abuse the same kind of privilege.)" },
            { label: "Refuse. Anyone should be free to copy the idea.", delta: -10, result: "The inventor takes the idea abroad." },
            { label: "Seize the invention for the Crown.", delta: -20, result: "Word spreads, and inventors stop coming to court." }
          ],
          lesson: "The first important patent of monopoly was granted in 1561 under Elizabeth I, to encourage inventions and new industries. These rights were badly abused and created a web of privilege and patronage, until the Statute of Monopolies (1624) outlawed most monopolies, though with large loopholes."
        },
        {
          title: "Uneven cloth",
          text: "Foreign buyers complain that English cloth varies wildly in quality. How should the Crown respond?",
          choices: [
            { label: "Set official standards for how goods are made and marketed.", correct: true, delta: 15, result: "English cloth regains its reputation abroad." },
            { label: "Do nothing. Buyers should beware.", delta: -15, result: "Orders drop, and more weavers lose work." },
            { label: "Order foreign buyers to stop complaining.", delta: -20, result: "They simply buy elsewhere." }
          ],
          lesson: "To support the general welfare, England’s leaders ran a coordinated program to reorganize industry by setting standards of production and marketing. All of it was meant to stimulate English trade and ease unemployment."
        },
        {
          title: "The poor fund",
          text: "Voluntary parish collections for the poor have failed, and the problem keeps growing. It’s 1572. What do you advise?",
          choices: [
            { label: "Make the poor rate compulsory and fund it through taxes.", correct: true, delta: 15, result: "Relief finally has steady funding." },
            { label: "Keep relying on voluntary gifts.", delta: -15, result: "The pauper problem grows more severe." },
            { label: "Leave poor relief to the Church.", delta: -20, result: "The old Church charity system no longer exists." }
          ],
          lesson: "Poor laws in 1531 and 1536 let only the “deserving” poor beg and relied on voluntary parish funds, which proved completely inadequate. In 1572 the state accepted that the poor would have to be supported by tax funds and enacted a compulsory “poor rate.”"
        }
      ],
      takeaway: [
        "You saw the state as responsible for the general welfare, as the medieval Church had been.",
        "Because unemployment and unrest were the pressing problems, mercantilist writers judged policies by whether they created work, brought in treasure, and strengthened the nation."
      ]
    },

    {
      id: "clothier",
      name: "The Master Clothier",
      year: "c. 1690",
      place: "Yorkshire & London",
      icon: "tools",
      meter: { label: "Capital", prefix: "£", start: 100 },
      world: [
        "You started as a guild master working alongside your apprentices. Now you organize production and hire journeymen who have little hope of becoming masters themselves.",
        "Competition has narrowed the old price gaps between regions, so simply buying low and selling high pays less than it used to. Profit increasingly comes from controlling production, but the old merchant companies’ monopolies and a maze of regulations stand in your way."
      ],
      tasks: [
        {
          title: "Closing the guild",
          text: "Your journeymen want to become masters and open their own shops. What do you and the other guild masters do?",
          choices: [
            { label: "Restrict how many can become masters, and keep the rest as hired workers.", correct: true, delta: 40, result: "You become an employer, and they become wage workers." },
            { label: "Help them all open shops to compete with you.", delta: -30, result: "Your status and income shrink." },
            { label: "Go back to working the loom beside them as an equal.", delta: -10, result: "The guilds are moving the other way." }
          ],
          lesson: "As early as the 1500s, craft guilds became closed systems that protected masters by restricting how many apprentices and journeymen could become masters. Masters turned into employers or capitalists, and journeymen into hired workers."
        },
        {
          title: "The company’s wall",
          text: "You want to sell your cloth abroad, but a chartered company holds the exclusive right to that trade. What do you do?",
          choices: [
            { label: "Join other producers in attacking monopolies and special privileges.", correct: true, delta: 30, result: "You join a growing chorus against the old merchant companies." },
            { label: "Sell to the company on whatever terms it offers.", delta: -10, result: "It pays what it likes, and you keep little." },
            { label: "Accept it. The Crown knows best.", delta: -20, result: "Your capital sits idle." }
          ],
          lesson: "From the mid-1600s, almost all mercantilist writers condemned state-granted monopolies and favoritism in the domestic economy. Sir Dudley North argued that people who lobby for special laws treat their own gain as the measure of good and evil, and that the public is best served by removing such privileges."
        },
        {
          title: "A sermon on profit",
          text: "Your minister visits. Business is thriving. What does a devout Protestant businessman of your day do with his profits?",
          choices: [
            { label: "Keep working hard in my calling, live frugally, and put the profits back into the business.", correct: true, delta: 40, result: "Your capital grows year after year." },
            { label: "Spend them on fine clothes and feasts.", delta: -30, result: "Your faith condemns extravagance." },
            { label: "Feel ashamed of them and give them all away.", delta: -30, result: "That’s the old distrust of riches. Your faith sees success in your calling as a sign of God’s favor." }
          ],
          lesson: "Protestantism came to prize diligent work in one’s calling and to condemn extravagance. Strict limits on consumption plus methodical, intense production could have only one result: the accumulation of capital. Over time, profits came to be seen as a mark of God’s favor."
        },
        {
          title: "Where does your profit come from?",
          text: "A pamphlet writer asks you: where does your business’s wealth really come from?",
          choices: [
            { label: "From my workers’ labor, which adds value to the wool I buy.", correct: true, delta: 20, result: "You sound like Defoe and Cary." },
            { label: "From buying cloth cheap and selling it dear.", delta: 0, result: "That’s the old merchant’s answer. Your profits now come from production." },
            { label: "From the gold and silver in my strongbox.", delta: 0, result: "Coin measures your wealth, but it isn’t where it comes from." }
          ],
          lesson: "In the late 1600s, the cost-of-production view of value revived. Daniel Defoe wrote that the labor and industry of the people alone bring wealth, and John Cary wrote that exports are profitable as the labor of the people adds to their value. Writers were edging toward a labor theory of value."
        }
      ],
      takeaway: [
        "Producer-capitalists like you wanted freedom from restrictions, and new theories of human nature stressed self-interest. Hobbes argued that all motives are self-interested, and Mandeville’s Fable of the Bees (1714) claimed private vices produce public benefits.",
        "And because your profit came from production, thinkers began tracing value and profit back to labor. These are the ideas Adam Smith would build on."
      ]
    },

    {
      id: "physiocrat",
      name: "The Physiocrat",
      year: "c. 1765",
      place: "Versailles, France",
      icon: "wheat",
      meter: { label: "Reform support", start: 50 },
      world: [
        "You’re a follower of François Quesnay, author of the Tableau économique (1758), a model of how production, money, and income circulate through an economy.",
        "France is in disorder: taxes are chaotic and unjust, farms are small and use feudal methods, and a maze of tariffs, subsidies, and privileges chokes industry and trade."
      ],
      tasks: [
        {
          title: "The source of the surplus",
          text: "A minister asks you: which workers produce a true surplus beyond their own costs?",
          choices: [
            { label: "Only those who work the land. Agriculture is the productive class.", correct: true, delta: 15, result: "Straight from Quesnay’s Tableau." },
            { label: "Manufacturers and artisans.", delta: -10, result: "To you they’re the “sterile class”: what they make only repays their materials and subsistence." },
            { label: "Landlords.", delta: -10, result: "Landlords are the “idle class.” They receive the surplus but do nothing to produce it." }
          ],
          lesson: "Quesnay’s model had three classes: the productive class (agriculture), the sterile class (manufacturing), and the idle class (landlords, who receive the surplus as rent). The Physiocrats saw the surplus as a gift of nature."
        },
        {
          title: "Reforming France",
          text: "You believe France’s problems come from ignoring natural law. Which reforms do you push for?",
          choices: [
            { label: "Abolish the guilds, remove tariffs, subsidies, and restrictions, and encourage large-scale capitalist farming.", correct: true, delta: 15, result: "Reformers cheer. Those who profit from privileges are alarmed." },
            { label: "Add tariffs to protect French workshops.", delta: -15, result: "That’s the tangle you’re trying to cut away." },
            { label: "Strengthen feudal obligations on the peasants.", delta: -20, result: "That would make French farming even less efficient." }
          ],
          lesson: "The Physiocrats believed society was governed by natural law. They pushed to abolish the guilds, remove the tariffs, taxes, subsidies, and regulations that hindered industry and trade, and replace small farms with large-scale capitalist agriculture."
        },
        {
          title: "The single tax",
          text: "How should the king raise his revenue?",
          choices: [
            { label: "With one single tax on agriculture.", correct: true, delta: 15, result: "The reform the Physiocrats are best remembered for." },
            { label: "With many small taxes on manufactured goods.", delta: -10, result: "In your theory, manufacturing produces no surplus to tax." },
            { label: "By selling more privileges and monopolies.", delta: -20, result: "That’s exactly the system you want to abolish." }
          ],
          lesson: "The Physiocrats recommended that all government revenue come from a single, nationwide tax on agriculture, since only agriculture produced a surplus."
        },
        {
          title: "The hoarder",
          text: "A wealthy landlord plans to lock his rent money in a chest instead of spending it. Why does this worry you?",
          choices: [
            { label: "Money has to keep circulating between farms and workshops, or next year’s production breaks down.", correct: true, delta: 10, result: "You’ve spotted a danger later economists will return to." },
            { label: "It doesn’t. Saving is always good.", delta: -10, result: "The Tableau shows why it can hurt." },
            { label: "Gold should be spent on foreign luxuries.", delta: -10, result: "That’s not the concern. The problem is money leaving circulation." }
          ],
          lesson: "The Tableau showed that farming and manufacturing depend on each other, and that goods can be allocated only if money keeps circulating. The Physiocrats anticipated Malthus, Marx, and Keynes in seeing how hoarding money could cause crises or depressions."
        },
        {
          title: "1776",
          text: "Your ally Turgot, now France’s comptroller general of finances, is pushing your reforms. The great landowners realize the plans will cost them. What happens?",
          choices: [
            { label: "The nobility resists, and Turgot loses his office.", correct: true, delta: -40, result: "Your political influence is over, though your ideas live on." },
            { label: "The nobles happily agree to the reforms.", delta: 0, result: "They correctly saw the reforms would impoverish their class." },
            { label: "The king makes the reforms permanent law.", delta: 0, result: "It didn’t happen. Real change had to wait for the Revolution of 1789." }
          ],
          lesson: "The Physiocrats never questioned the nobility’s right to rent, yet the nobles correctly saw that the reforms would impoverish them. Turgot lost office in 1776, and similar changes had to wait for the French Revolution of 1789."
        }
      ],
      takeaway: [
        "France was still mostly agricultural and weighed down by feudal leftovers, so it made sense to the Physiocrats that farming was where the surplus came from.",
        "Their lasting ideas were productive vs. unproductive labor, how sectors depend on each other, and the circular flow of money. Adam Smith met Quesnay and Turgot in France (1764–66) and responded to them in The Wealth of Nations."
      ]
    }
  ]
};
