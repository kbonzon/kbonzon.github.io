// Build 4, Game 1: Standing on Shoulders. How Bastiat and Mill used earlier thinkers
// (Hunt & Lautzenheiser, Chapter 8, pp. 174–200). Step format is described in js/lab.js.
(function () {
  const cell = (k, v) => '<div class="readout"><div class="k">' + k + '</div><div class="v">' + v + "</div></div>";

  // "What did he do with it?" questions share one fixed set of answers.
  const V = ["Kept it", "Extended it", "Changed it", "Rejected it"];
  const verdict = (prompt, answer, explain) => ({ type: "choice", prompt, options: V, answer: V.indexOf(answer), keepOrder: true, explain });
  const pick = (prompt, options, answer, explain) => ({ type: "choice", prompt, options, answer: options.indexOf(answer), keepOrder: true, explain });
  const WHO = ["Bastiat", "Mill", "Both"];

  // ---------- Bastiat's "law" of shares (p. 185) ----------
  // Illustration: before, capital 100 earns 10% of an output of 100. After, output is 120.
  function sharesLab(fig) {
    fig.innerHTML =
      '<div class="lab-controls">' +
      '<div class="slider-row"><label for="bk">Capital after</label><input id="bk" type="range" min="100" max="300" step="10" value="200"><output id="bko"></output></div>' +
      '<div class="slider-row"><label for="br">Profit rate after</label><input id="br" type="range" min="2" max="10" step="0.5" value="8"><output id="bro"></output></div>' +
      '</div><div class="readouts" data-read></div>' +
      '<p class="caption">Our illustrative numbers. Before: capital 100 at a 10% profit rate, total output 100, so capitalists get 10 (10%) and workers 90 (90%). After: total output grows to 120.</p>';
    const bk = fig.querySelector("#bk");
    const br = fig.querySelector("#br");
    function draw() {
      const k = +bk.value;
      const r = +br.value / 100;
      fig.querySelector("#bko").value = k;
      fig.querySelector("#bro").value = br.value + "%";
      const profit = k * r;
      const share = profit / 120;
      fig.querySelector("[data-read]").innerHTML =
        cell("Profits", LAB.fmt(profit, 1)) +
        cell("Wages", LAB.fmt(120 - profit, 1)) +
        cell("Capitalists’ share", LAB.fmt(share * 100, 1) + "%") +
        cell("Workers’ share", LAB.fmt((1 - share) * 100, 1) + "%") +
        cell("Bastiat’s claim", share < 0.1 ? "holds here" : share > 0.1 ? "fails here" : "borderline");
    }
    bk.addEventListener("input", draw);
    br.addEventListener("input", draw);
    draw();
  }

  // ---------- The inheritance chart (final lesson) ----------
  const ROWS = [
    ["All motives reduce to pleasure and pain", "Bentham", ["kept", "Kept: “increase the sum of our satisfactions in relation to our efforts” (p. 179)"], ["changed", "Changed: some pleasures are higher; not all motives are selfish (p. 187)"]],
    ["Exchange harmonizes self-interest (invisible hand)", "Smith", ["extended", "Extended: “exchange is political economy” (p. 178)"], ["rejected", "Rejected as the core: exchange is “not the fundamental law” of distribution (pp. 186–187)"]],
    ["Economics studies distribution among the classes", "Ricardo", ["rejected", "Rejected: replaced by the study of exchange (p. 178)"], ["changed", "Changed: distribution is partly a human institution (p. 186)"]],
    ["Labor theory of value", "Ricardo", ["rejected", "Rejected: labor is just one “service” among others (p. 179)"], ["rejected", "Rejected after starting from it; adding-up cost theory (p. 188)"]],
    ["Value is based on utility", "Say", ["changed", "Changed: value flows from the service to the product (pp. 180–181)"], ["none", "Not his approach: cost of production instead (p. 189)"]],
    ["Rent is paid for the original powers of the soil", "Ricardo", ["rejected", "Rejected: rent pays only for improvements (p. 183)"], ["kept", "Kept: accumulation raises rent and lowers profit (p. 192)"]],
    ["Profit rewards abstinence / sacrifice", "Senior", ["kept", "Kept: capital comes from foresight, intelligence, thrift (p. 182)"], ["kept", "Kept: “Mr. Senior’s well-chosen expression” (p. 189)"]],
    ["Wages fund doctrine", "Senior", ["none", "Not discussed in this chapter"], ["changed", "Kept in 1848, rejected in 1869 (p. 191)"]],
    ["Rate of profit tends to fall", "Smith, Ricardo", ["changed", "Changed: used to “prove” labor’s share rises, a logical error (p. 185)"], ["extended", "Extended: counter-forces such as capital export and crises (p. 192)"]],
    ["No general glut is possible (Say’s law)", "Say", ["none", "Not discussed in this chapter"], ["kept", "Kept, even while describing crises (p. 193)"]],
    ["Property is sacred", "Say", ["extended", "Extended: a natural law instituted by God (p. 181)"], ["rejected", "Rejected: “wholly a question of general expediency” (p. 186)"]],
    ["Comparative advantage", "Ricardo", ["none", "Not discussed in this chapter"], ["extended", "Extended: reciprocal demand sets the trade price (p. 190)"]],
    ["Population pressure keeps wages low", "Malthus", ["none", "Not discussed in this chapter"], ["changed", "Changed: birth control is not a vice; education helps (p. 191)"]],
    ["The 1834 Poor Law principle", "Senior", ["none", "Not discussed in this chapter"], ["kept", "Kept: relief must leave a motive to do without it (p. 197)"]]
  ];
  function chart(fig, reveal) {
    const chip = (c) => (reveal ? '<span class="chip ' + c[0] + '">' + c[0].replace("none", "—") + "</span><br>" + c[1].replace(/^(Kept|Extended|Changed|Rejected):\s*/, "") : '<span class="chip none">?</span>');
    let rows = "";
    ROWS.forEach((r) => {
      rows += '<tr><td class="wrap-cell"><b>' + r[0] + "</b><br><span class=\"role-meta\">" + r[1] + '</span></td><td class="wrap-cell">' + chip(r[2]) + '</td><td class="wrap-cell">' + chip(r[3]) + "</td></tr>";
    });
    fig.innerHTML =
      '<div class="table-wrap"><table class="calc-table left"><thead><tr><th>Earlier idea · source</th><th>Bastiat</th><th>Mill</th></tr></thead><tbody>' + rows + "</tbody></table></div>" +
      '<p class="caption">' + (reveal ? "Kept · Extended · Changed · Rejected. A dash means this chapter doesn’t say." : "Answer the questions to reveal the full chart.") + "</p>";
  }

  window.LINEAGE_LESSONS = [
    // =====================================================================
    {
      id: "setting",
      title: "The Setting",
      subtitle: "Socialism spreads, and two answers appear (pp. 174–176)",
      steps: [
        {
          title: "Where the story stands",
          body: [
            "Smith and Ricardo mixed the utility and labor perspectives, so their work suggested both social harmony and class conflict (p. 174).",
            "Say and Senior “sanitized” political economy by dropping the labor theory; Thompson and Hodgskin used it to side with workers (p. 174).",
            "Between 1820 and 1850 socialist ideas spread fast, so conservatives looked urgently for an economics based on <b>pure utilitarianism</b> (p. 174). Two big books answered: Mill’s <em>Principles of Political Economy</em> (1848) and Bastiat’s <em>Economic Harmonies</em> (1850) (pp. 174–175)."
          ],
          questions: [
            pick("How does the textbook describe Mill’s Principles?", ["The last great effort to keep both the utility and labor perspectives in one body of doctrine", "Pure utilitarianism pushed to its logical conclusions", "The first socialist textbook", "A restatement of Ricardo with no changes"], "The last great effort to keep both the utility and labor perspectives in one body of doctrine", "p. 175."),
            pick("And Bastiat’s Economic Harmonies?", ["Pure economic utilitarianism pushed to its logical conclusions", "A defense of the labor theory of value", "A compromise between socialism and capitalism", "A study of rent"], "Pure economic utilitarianism pushed to its logical conclusions", "p. 175.")
          ]
        },
        {
          title: "The socialists Bastiat was answering",
          body: [
            "Bastiat wrote against French socialism, which grew fastest in the 1830s and 1840s (pp. 175–176). Match each idea to its socialist."
          ],
          questions: [
            pick("Nature makes all people equal in rights and needs; inequality is injustice; capitalist commerce forms “lakes of gold for the benefit of the few.”", ["Babeuf", "Saint-Simon", "Fourier", "Proudhon"], "Babeuf", "Executed after a failed conspiracy following the fall of Robespierre (p. 175)."),
            pick("Condemned the idle rich and selfish competition; private property is fine if it serves the masses, but only extensive government intervention can make sure it does.", ["Babeuf", "Saint-Simon", "Fourier", "Proudhon"], "Saint-Simon", "p. 175."),
            pick("Only about one-third of people do useful work; form voluntary cooperatives (“phalanxes”); competition will end in monopoly.", ["Babeuf", "Saint-Simon", "Fourier", "Proudhon"], "Fourier", "p. 176."),
            pick("“Property is theft”; the state exists to coerce; the ideal is small farms and handicrafts.", ["Babeuf", "Saint-Simon", "Fourier", "Proudhon"], "Proudhon", "Bastiat’s most despised opponent (pp. 176–177).")
          ]
        },
        {
          title: "Why lineage matters here",
          body: [
            "The radical side used the classical economists’ own tools. That’s why both Bastiat and Mill had to decide what to do with what Smith, Ricardo, and the others had left them."
          ],
          questions: [
            pick("Where did socialist economic ideas mainly come from, according to the textbook?", ["English classical political economy, through Thompson and Hodgskin", "The Catholic Church", "Bastiat’s early writings", "Physiocrats only"], "English classical political economy, through Thompson and Hodgskin", "Their economic doctrines originated mostly in England, even though socialism grew fastest in France (p. 175).")
          ]
        }
      ],
      summary: [
        "Socialist ideas spread rapidly from 1820 to 1850, with economic roots in English classical political economy (pp. 174–175).",
        "Bastiat (1850) pushed pure utilitarianism to its conclusions; Mill (1848) tried to keep both perspectives (p. 175).",
        "Babeuf, Saint-Simon, Fourier, and Proudhon were the French socialists Bastiat was answering (pp. 175–176)."
      ]
    },

    // =====================================================================
    {
      id: "bastiat",
      title: "What Bastiat Inherited",
      subtitle: "Bentham, Smith, Say, and Senior, pushed to the limit (pp. 176–185)",
      steps: [
        {
          title: "Four ways to use an idea",
          body: [
            "For each earlier idea, decide what Bastiat did with it: <b>Kept</b> (used it largely as is), <b>Extended</b> (pushed it further than its author), <b>Changed</b> (kept the label but altered the content), or <b>Rejected</b> (threw it out).",
            "Bastiat (1801–1850) set out to defend private property, capital, profit, and the existing distribution of wealth by extending utilitarianism consistently into economics (pp. 176–177)."
          ],
          questions: [
            pick("Bastiat borrowed two kinds of authority for his ideas. Science, like ___, and God, like ___.", ["Senior; Malthus", "Ricardo; Smith", "Marx; Hobbes", "Proudhon; Fourier"], "Senior; Malthus", "Socialism, he said, is astrology and alchemy; political economy is astronomy and chemistry (p. 177).")
          ]
        },
        {
          title: "Bentham, Smith, and Ricardo",
          body: [
            "<b>Bentham:</b> all action seeks pleasure and avoids pain. <b>Bastiat:</b> “we constantly seek to increase the sum of our satisfactions in relation to our efforts” (p. 179).",
            "<b>Smith:</b> a few dozen pages on exchange and the invisible hand, in a 1,000-page book. <b>Bastiat:</b> “Exchange is political economy… it is society itself” (p. 178).",
            "<b>Ricardo:</b> political economy is the study of how produce is distributed among the three classes. <b>Bastiat:</b> political economy is exchange (p. 178)."
          ],
          questions: [
            verdict("What did Bastiat do with Bentham’s pleasure principle?", "Kept it", "The textbook calls it “simply a restatement” of Bentham (p. 179)."),
            verdict("What did Bastiat do with Smith’s invisible hand?", "Extended it", "A few pages in Smith became the whole of political economy (p. 178)."),
            verdict("What did Bastiat do with Ricardo’s definition of political economy?", "Rejected it", "Class distribution drops out; exchange replaces it (p. 178)."),
            pick("The utilitarian syllogism: all exchanges benefit both parties; ___; so all interactions benefit everyone. What’s the missing premise?", ["All human interactions can be reduced to exchanges", "All people are equal", "Labor creates all value", "Governments are benevolent"], "All human interactions can be reduced to exchanges", "Bastiat was the first to consistently reduce economics to exchange (p. 178).")
          ]
        },
        {
          title: "Value: Say’s utility and Smith’s water",
          body: [
            "<b>Say:</b> “the basis of value is utility.” <b>Bastiat:</b> agreed only for human <i>services</i>, and reversed the direction: “Value is not transmitted from the material object to the service, but from the service to the material” (p. 180).",
            "For Smith’s water and diamonds, Bastiat split utility in two: <b>gratuitous</b> utility from nature, never priced, and <b>onerous</b> utility that requires effort (p. 179). A <b>service</b> is effort by one person for another’s satisfaction (p. 179)."
          ],
          questions: [
            verdict("What did Bastiat do with Say’s “value is based on utility”?", "Changed it", "He reversed the causation later neoclassical theory would use; Say was closer to the neoclassicals here (pp. 180–181)."),
            verdict("What did Bastiat do with the labor theory of value?", "Rejected it", "Labor became one type of service, no different in kind from what landlords and capitalists provide (p. 179)."),
            pick("The textbook finds an inconsistency in Bastiat’s “service.” What is it?", ["He defines service as painful effort, then says owning money or capital “renders a service,” and it’s hard to see the pain", "He never defines service", "He says services have no value", "He agrees with Proudhon"], "He defines service as painful effort, then says owning money or capital “renders a service,” and it’s hard to see the pain", "How are owning money and receiving interest painful? (p. 180)")
          ]
        },
        {
          title: "Property, capital, and rent",
          body: [
            "<b>Say:</b> property is “sacred and indisputable.” <b>Bastiat:</b> “Property does not exist because there are laws, but laws exist because there is property”; property is divinely instituted (p. 181).",
            "<b>Senior:</b> profit rewards abstinence. <b>Bastiat:</b> capital has its roots in foresight, intelligence, and thrift; the capitalist sacrifices the present (p. 182).",
            "<b>Ricardo:</b> rent is paid for the original, indestructible powers of the soil. <b>Bastiat:</b> nature’s part is free; rent pays only for the landowner’s improvements (p. 183)."
          ],
          questions: [
            verdict("What did Bastiat do with Say’s sacred property?", "Extended it", "From sacred to a natural law created by God, prior to any human law (p. 181)."),
            verdict("What did Bastiat do with Senior’s abstinence?", "Kept it", "Capital is the reward for self-control and sacrifice (p. 182)."),
            verdict("What did Bastiat do with Ricardo’s theory of rent?", "Rejected it", "He offered no theory for this; he simply asserted it (p. 183)."),
            pick("The textbook’s objection to Bastiat’s view of rent?", ["Landlords lived in Paris mansions; peasants and wage workers did the draining, enclosing, and improving", "Rent doesn’t exist", "Ricardo agreed with Bastiat", "Land can’t be improved"], "Landlords lived in Paris mansions; peasants and wage workers did the draining, enclosing, and improving", "p. 183.")
          ]
        },
        {
          title: "Test Bastiat’s “law”",
          body: [
            "Smith and Ricardo both expected the rate of profit to fall as capital accumulates (p. 185). Bastiat used this to “prove” harmony: as capital grows, capitalists’ <i>relative</i> share falls and workers’ share rises both relatively and absolutely (p. 185). His proof: “the more plentiful capital is, the lower its interest rate” (p. 185).",
            "The textbook calls this a logical error. Find out why."
          ],
          figure: sharesLab,
          questions: [
            { prompt: "With capital at 200 and a profit rate of 8%, how much profit do capitalists get?", answer: 16, hint: "200 × 0.08", explain: "16, up from 10." },
            { prompt: "What is the capitalists’ share of the 120 total output, as a %?", answer: 13.3, unit: "%", tol: 0.1, dp: 1, hint: "16 ÷ 120", explain: "13.3%, up from 10%. The rate fell, but the share rose: Bastiat’s claim fails." },
            { prompt: "At an 8% rate, what amount of capital keeps the capitalists’ share at exactly 10%?", answer: 150, hint: "Profit must be 10% of 120 = 12. Solve 0.08 × K = 12.", explain: "150. Any faster growth of capital pushes the capitalists’ share up." },
            pick("So what is wrong with Bastiat’s proof?", ["A falling rate of profit doesn’t mean a falling share: if capital grows fast enough, capitalists’ share rises", "The rate of profit never falls", "Workers own the capital", "Output can’t grow"], "A falling rate of profit doesn’t mean a falling share: if capital grows fast enough, capitalists’ share rises", "The textbook reads the error as a sign of class bias (p. 185).")
          ]
        },
        {
          title: "Harmony and government",
          body: [
            "Bastiat’s answer to every claim of class antagonism: “Men’s interests are harmonious; therefore, the answer lies entirely in this one word: freedom” (p. 185). Government should stick to “the maintenance of liberty, property, and individual rights” (p. 184)."
          ],
          questions: [
            pick("What exchange does the textbook say Bastiat ignored?", ["Capitalists trading bribes or campaign money to officials for monopoly protection, which benefits both parties while the public suffers", "Workers trading labor for wages", "Countries trading wine for cloth", "Landlords renting land"], "Capitalists trading bribes or campaign money to officials for monopoly protection, which benefits both parties while the public suffers", "By his own theory, both sides gain (p. 184).")
          ]
        }
      ],
      summary: [
        "Kept: Bentham’s pleasure principle (p. 179) and Senior’s sacrifice theory of capital (p. 182).",
        "Extended: Smith’s invisible hand into “exchange is political economy” (p. 178) and Say’s sacred property into God’s law (p. 181).",
        "Changed: Say’s utility theory of value, by reversing its direction (pp. 180–181).",
        "Rejected: Ricardo’s distribution focus, the labor theory, and Ricardian rent (pp. 178–179, 183).",
        "Misused: the falling rate of profit, to “prove” labor’s share rises (p. 185)."
      ]
    },

    // =====================================================================
    {
      id: "mill",
      title: "What Mill Inherited",
      subtitle: "Bentham and Ricardo, qualified until they changed (pp. 185–198)",
      steps: [
        {
          title: "The eclectic",
          body: [
            "John Stuart Mill (1806–1873) called himself a disciple of both Bentham and Ricardo. But he qualified every principle so much that he ended up “neither a utilitarian nor a proponent of the labor theory of value” (pp. 185–186).",
            "His new starting point: the laws of <b>production</b> are fixed by nature, but the laws of <b>distribution</b> are “partly of human institution” (p. 186). Private property is “wholly a question of general expediency” (p. 186), and exchange is “not the fundamental law” of distribution (pp. 186–187)."
          ],
          questions: [
            verdict("What did Mill do with Say’s and Bastiat’s view that property is sacred?", "Rejected it", "When private property isn’t expedient, it’s unjust (p. 186)."),
            verdict("What did Mill do with Smith’s exchange-centered harmony?", "Rejected it", "Confusing exchange with the laws of distribution is “not only a logical, but a practical blunder” (pp. 186–187).")
          ]
        },
        {
          title: "Bentham, revised",
          body: [
            "Benthamite utilitarianism rests on two axioms: (1) all motives are self-interested pursuit of pleasure, and (2) each person is the sole judge of their pleasures, so “pushpin is as good as poetry” (p. 187).",
            "Mill: “some kinds of pleasure are more desirable and more valuable than others” and it’s “better to be a Socrates dissatisfied than a fool satisfied” (p. 187). Even the individual may be “incapable of judging” their own interests (p. 196)."
          ],
          questions: [
            verdict("What did Mill do with Bentham’s utilitarianism?", "Changed it", "He kept the name but broke both axioms (p. 187)."),
            pick("Which of Bentham’s axioms did Mill reject?", ["Both: not all motives are selfish, and pleasures can be ranked", "Only the first", "Only the second", "Neither"], "Both: not all motives are selfish, and pleasures can be ranked", "That’s why the textbook says he “was certainly not a consistent utilitarian” (p. 187).")
          ]
        },
        {
          title: "Ricardo, revised",
          body: [
            "Mill opened with something close to Ricardo: production costs resolve into labor, so value depends “principally” on labor (p. 188). Then, because capital-to-labor ratios differ (wine vs. cloth), he dropped it for Smith’s <b>adding-up</b> cost-of-production theory (p. 188).",
            "On profit he wavered: sometimes Ricardo’s surplus (“labour produces more than is required for its support,” p. 189), more often Senior’s “remuneration of abstinence” (p. 189). He dismissed Ricardo’s search for an invariable measure of value as impossible and irrelevant (p. 190).",
            "He agreed with Ricardo that profits tend to fall, but stressed counter-forces: export of capital to colonies and the waste of capital in commercial crises (p. 192)."
          ],
          questions: [
            verdict("What did Mill do with Ricardo’s labor theory of value?", "Rejected it", "He went back to Smith’s adding-up theory, which Ricardo had opposed (p. 188)."),
            verdict("What did Mill do with Senior’s abstinence?", "Kept it", "“Mr. Senior’s well-chosen expression” (p. 189)."),
            verdict("What did Mill do with Ricardo’s falling rate of profit?", "Extended it", "The counter-forces resemble later arguments by Marx and Lenin (p. 192)."),
            pick("In the adding-up theory, where does profit come from?", ["From exchange: it’s the price paid for the capitalist’s abstinence, risk, and exertion", "From the productive power of labor alone", "From rent", "From the government"], "From exchange: it’s the price paid for the capitalist’s abstinence, risk, and exertion", "This contradicts his other, Ricardian statement that profit arises from production (p. 189).")
          ]
        },
        {
          title: "Trade: finishing Ricardo’s story",
          body: [
            "Ricardo showed two countries gain if they trade at a price between their two cost ratios, but he never explained where in that range the price would land (p. 190).",
            "Mill: since capital and labor can’t move freely between countries, international prices depend on supply and demand. Each country must pay for its imports with its exports, so the price settles where the two countries’ “offer curves” cross (p. 190).",
            "Recall Ricardo’s numbers: a unit of wine costs 1.20 cloth in England and about 0.89 cloth in Portugal."
          ],
          questions: [
            pick("Which could be Mill’s equilibrium price of wine, in cloth?", ["1.00", "1.35", "0.50", "2.00"], "1.00", "It must lie between 0.89 and 1.20 for both countries to gain; reciprocal demand picks the exact point (p. 190)."),
            verdict("What did Mill do with Ricardo’s comparative advantage?", "Extended it", "With modifications, his theory is still the orthodox theory of international prices (p. 190).")
          ]
        },
        {
          title: "Wages: Senior’s fund, Mill’s reversal",
          body: [
            "In the <em>Principles</em> Mill accepted the wages fund: wage = fund ÷ workers (p. 191). In 1869, reviewing W.T. Thornton, he reversed himself. The limit on wages is capitalists’ profits minus what they need “to maintain themselves and their families,” and where wages fall within that range is settled by struggle between labor and capital (p. 191).",
            "Try it with our illustrative numbers: a £600,000 fund, 150,000 workers, profits of £300,000, of which capitalists need £100,000 for their families."
          ],
          questions: [
            { prompt: "Under the wages fund, what is each worker’s wage?", answer: 4, prefix: "£", hint: "600,000 ÷ 150,000", explain: "£4." },
            { prompt: "Under Mill’s 1869 view, what is the most the total wage bill could reach?", answer: 800000, prefix: "£", hint: "Fund + (profits − capitalists’ maintenance)", explain: "600,000 + 200,000 = £800,000, about £5.33 per worker." },
            verdict("What did Mill ultimately do with Senior’s wages fund?", "Rejected it", "He accepted it in 1848, then repudiated it in 1869 (p. 191)."),
            verdict("What did Mill do with Malthus’s population theory?", "Changed it", "Unlike Malthus, he didn’t see birth control as a vice, and he expected education to shrink families and raise wages (p. 191).")
          ]
        },
        {
          title: "Say’s law and the Poor Law",
          body: [
            "Mill described almost periodic crises: over-trading, factories built beyond what the market needs, then shutdowns and discharged workers (p. 193). Yet he defended Say’s law, renaming a general glut an “under-supply of money” and calling such slumps temporary (p. 193).",
            "He also defended the principle of Senior’s 1834 Poor Law: relief should leave everyone “a strong motive to do without it” (p. 197). But he proposed a tax on inheritances (p. 197), where Bastiat had defended inheritance as natural (p. 183)."
          ],
          questions: [
            verdict("What did Mill do with Say’s law?", "Kept it", "Keynes later answered this kind of long-run defense: “In the long run we are all dead” (p. 193)."),
            verdict("What did Mill do with the principle of Senior’s 1834 Poor Law?", "Kept it", "p. 197.")
          ]
        }
      ],
      summary: [
        "Rejected: sacred property, exchange as the core of economics, the labor theory of value, and (by 1869) the wages fund (pp. 186–188, 191).",
        "Changed: Bentham’s utilitarianism (higher pleasures) and Malthus on population (birth control) (pp. 187, 191).",
        "Kept: Senior’s abstinence, Say’s law, and the 1834 Poor Law principle (pp. 189, 193, 197).",
        "Extended: Ricardo’s comparative advantage (reciprocal demand) and falling profits (counter-forces) (pp. 190, 192)."
      ]
    },

    // =====================================================================
    {
      id: "chart",
      title: "The Inheritance Chart",
      subtitle: "Same ancestors, opposite directions",
      steps: [
        {
          title: "Who did it: Bastiat, Mill, or both?",
          body: ["Both men inherited the same ideas. Decide who made each move."],
          questions: [
            pick("Kept Senior’s idea that profit rewards the capitalist’s sacrifice.", WHO, "Both", "Bastiat (p. 182) and Mill (p. 189)."),
            pick("Rejected Ricardo’s labor theory of value.", WHO, "Both", "Bastiat by making labor one service among many (p. 179); Mill by returning to Smith’s adding-up theory (p. 188)."),
            pick("Made private property a natural law created by God.", WHO, "Bastiat", "p. 181."),
            pick("Treated private property as a human convention, judged by expediency.", WHO, "Mill", "p. 186."),
            pick("Took Smith and Ricardo’s falling rate of profit and built on it.", WHO, "Both", "Bastiat misused it (p. 185); Mill added counter-forces (p. 192)."),
            pick("Proposed limiting what anyone may receive by inheritance.", WHO, "Mill", "Mill proposed it (p. 197); Bastiat defended inheritance as natural (p. 183).")
          ]
        },
        {
          title: "Two branches of one tree",
          body: [
            "The textbook places them in one chapter because they are “the first two clear representatives of a polar bifurcation of utilitarian economics” (p. 186)."
          ],
          questions: [
            pick("Bastiat was the precursor of which later schools?", ["The Austrian and Chicago schools", "The Marshallian school", "Marxism", "The Physiocrats"], "The Austrian and Chicago schools", "Extreme conservatives and uncompromising defenders of laissez-faire (p. 186)."),
            pick("Mill was the precursor of which?", ["The more moderate Marshallian school of neoclassical economics", "The Chicago school", "Mercantilism", "The Austrian school"], "The more moderate Marshallian school of neoclassical economics", "Often advocates of reform and government intervention (p. 186)."),
            pick("The textbook’s verdict on the two men?", ["Mill was the better theorist and scholar but eclectic and inconsistent; Bastiat was the consistent developer of utilitarianism", "Bastiat was the better scholar", "Both were equally consistent", "Neither used utilitarianism"], "Mill was the better theorist and scholar but eclectic and inconsistent; Bastiat was the consistent developer of utilitarianism", "p. 186.")
          ]
        },
        {
          title: "The full inheritance chart",
          body: [
            "Here is everything in one place. Notice how often the two men took the <i>same</i> earlier idea in <i>opposite</i> directions."
          ],
          figure: chart,
          revealFigure: true,
          questions: [
            pick("On the course question (does exchange harmonize interests or conceal conflict?), where do they land?", ["Bastiat: harmony, and the answer is freedom. Mill: real conflict and a class structure that won’t last, but reform rather than revolution", "Both: pure harmony", "Both: pure conflict", "Bastiat: conflict; Mill: harmony"], "Bastiat: harmony, and the answer is freedom. Mill: real conflict and a class structure that won’t last, but reform rather than revolution", "Bastiat (p. 185); Mill sides with workers (p. 191), sees the two hereditary classes as impermanent (p. 194), and favors improving private property (p. 195).")
          ]
        }
      ],
      summary: [
        "Both rejected the labor theory and kept Senior’s abstinence, but for different purposes (pp. 179, 182, 188–189).",
        "Bastiat made property and inheritance sacred; Mill made them matters of expediency and taxable (pp. 181, 183, 186, 197).",
        "Bastiat leads to the Austrian and Chicago schools; Mill to the Marshallian school (p. 186)."
      ]
    }
  ];
})();
