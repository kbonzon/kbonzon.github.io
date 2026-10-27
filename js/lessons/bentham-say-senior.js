// Build 3 lessons: Bentham, Say, and Senior (Hunt & Lautzenheiser, Chapter 6, pp. 125–151).
// Page numbers in parentheses point to the textbook. Step format is described in js/lab.js.
(function () {
  const { svg, t, rect, line } = LAB.draw;
  const f = (s) => '<span class="formula">' + s + "</span>";
  const cell = (k, v) => '<div class="readout"><div class="k">' + k + '</div><div class="v">' + v + "</div></div>";

  const FEATURES = [
    "Atomistic individualism (isolated, egoistic individuals)",
    "Egoistic utilitarianism (all motives = pleasure and pain)",
    "Dependence on markets",
    "Financing industrialization out of profits",
    "Calculating rationalism (every choice is bookkeeping)"
  ];
  const featureQ = (prompt, answer, explain) => ({ type: "choice", prompt, options: FEATURES, answer, explain });

  // ---------- Bentham: the seven circumstances (p. 130) ----------
  // Ratings are our illustration. Bentham listed the circumstances but gave no formula.
  const CIRCS = [
    ["Intensity", 5, 2],
    ["Duration", 2, 4],
    ["Certainty", 5, 3],
    ["Propinquity (nearness)", 5, 1],
    ["Fecundity (leads to more pleasure)", 1, 5],
    ["Purity (not followed by pain)", 2, 4],
    ["Extent (people affected)", 3, 1]
  ];
  function calculus(fig) {
    let rows = "";
    CIRCS.forEach((c, i) => {
      rows +=
        "<tr><td>" + c[0] + "</td><td>" + c[1] + "</td><td>" + c[2] + "</td>" +
        '<td><input type="range" min="0" max="3" step="1" value="1" data-w="' + i + '" aria-label="Weight on ' + c[0] + '"> <output data-o="' + i + '">1</output></td></tr>';
    });
    fig.innerHTML =
      '<div class="table-wrap"><table class="calc-table"><thead><tr><th>Circumstance (p. 130)</th><th>A: Night at the fair</th><th>B: Study for the quiz</th><th>Weight (our choice)</th></tr></thead><tbody>' +
      rows + '<tr><td><b>Weighted total</b></td><td data-ta></td><td data-tb></td><td></td></tr></tbody></table></div>' +
      '<div class="btn-row" style="margin-top:10px"><button type="button" class="btn small ghost" data-reset>Reset all weights to 1</button></div>' +
      '<p class="caption">Ratings 1–5 are made up for this example. The weighting rule is our assumption: Bentham named the circumstances but never said how to combine them.</p>';
    const sliders = [...fig.querySelectorAll("[data-w]")];
    function draw() {
      let a = 0, b = 0;
      sliders.forEach((s, i) => {
        const w = +s.value;
        fig.querySelector('[data-o="' + i + '"]').value = w;
        a += w * CIRCS[i][1];
        b += w * CIRCS[i][2];
      });
      const ta = fig.querySelector("[data-ta]");
      const tb = fig.querySelector("[data-tb]");
      ta.textContent = a;
      tb.textContent = b;
      ta.className = a > b ? "win" : "";
      tb.className = b > a ? "win" : "";
    }
    sliders.forEach((s) => s.addEventListener("input", draw));
    fig.querySelector("[data-reset]").addEventListener("click", () => { sliders.forEach((s) => (s.value = 1)); draw(); });
    draw();
  }

  // ---------- Say's law model (pp. 137–138) ----------
  // Illustration: output worth 200; buyers want 35% cloth and 65% corn; h = share of income hoarded.
  function sayLab(fig, withHoarding) {
    fig.innerHTML =
      '<div class="lab-controls">' +
      '<div class="slider-row"><label for="ss">Capital in cloth</label><input id="ss" type="range" min="0" max="100" step="5" value="50"><output id="sso"></output></div>' +
      (withHoarding ? '<div class="slider-row"><label for="sh">Income hoarded</label><input id="sh" type="range" min="0" max="30" step="5" value="0"><output id="sho"></output></div>' : "") +
      "</div><div data-chart></div><div class=\"readouts\" data-read></div>" +
      '<p class="caption">Our illustration, not Say’s numbers: the economy produces goods worth 200, and buyers want to spend 35% on cloth and 65% on corn.</p>';
    const ss = fig.querySelector("#ss");
    const sh = fig.querySelector("#sh");
    function draw() {
      const s = +ss.value / 100;
      const h = sh ? +sh.value / 100 : 0;
      fig.querySelector("#sso").value = ss.value + "%";
      if (sh) fig.querySelector("#sho").value = sh.value + "%";
      const supply = [200 * s, 200 * (1 - s)];
      const demand = [70 * (1 - h), 130 * (1 - h)];
      const gap = supply.map((v, i) => v - demand[i]);
      const total = gap[0] + gap[1];
      fig.querySelector("[data-chart]").innerHTML = sayBars(supply, demand);
      const word = (g) => (Math.abs(g) < 0.01 ? "balanced" : g > 0 ? "glut " + LAB.fmt(g, 0) : "shortage " + LAB.fmt(-g, 0));
      fig.querySelector("[data-read]").innerHTML =
        cell("Cloth market", word(gap[0])) +
        cell("Corn market", word(gap[1])) +
        cell("All goods together", Math.abs(total) < 0.01 ? "no general glut" : "general glut " + LAB.fmt(total, 0));
    }
    ss.addEventListener("input", draw);
    if (sh) sh.addEventListener("input", draw);
    draw();
  }
  function sayBars(supply, demand) {
    const W = 640, H = 250, T = 24, B = 40;
    const Y = (v) => T + (H - T - B) * (1 - v / 220);
    const groups = [["Cloth", supply[0], demand[0]], ["Corn", supply[1], demand[1]], ["All goods", supply[0] + supply[1], demand[0] + demand[1]]];
    let s = "";
    groups.forEach((g, i) => {
      const gx = 40 + i * 200;
      [["before", g[1], "Supplied"], ["after", g[2], "Demanded"]].forEach((b, j) => {
        const x = gx + j * 74;
        s += rect(x, Y(b[1]), 66, Y(0) - Y(b[1]), b[0]);
        s += t(x + 33, Y(b[1]) - 7, LAB.fmt(b[1], 0), "t-strong");
        s += t(x + 33, Y(0) + 16, b[2]);
      });
      s += t(gx + 70, H - 4, g[0], "t-strong");
    });
    s += line(20, Y(0), W - 20, Y(0), "ax");
    return svg(W, H, s, "Supply and demand for cloth, corn, and all goods together") +
      LAB.charts.legend([["var(--blue-soft)", "Value supplied"], ["var(--green)", "Value demanded"]]);
  }

  // ---------- Senior's wages fund (p. 139) ----------
  function wagesFund(fig) {
    fig.innerHTML =
      '<div class="lab-controls">' +
      '<div class="slider-row"><label for="wf">Wages fund (£)</label><input id="wf" type="range" min="300000" max="900000" step="50000" value="600000"><output id="wfo"></output></div>' +
      '<div class="slider-row"><label for="wn">Number of workers</label><input id="wn" type="range" min="60000" max="200000" step="10000" value="120000"><output id="wno"></output></div>' +
      '</div><div class="readouts" data-read></div><p class="caption">Our illustrative numbers. The rule is Senior’s: the wage is the fund divided among the workers.</p>';
    const wf = fig.querySelector("#wf");
    const wn = fig.querySelector("#wn");
    function draw() {
      fig.querySelector("#wfo").value = "£" + (+wf.value / 1000) + "k";
      fig.querySelector("#wno").value = (+wn.value / 1000) + "k";
      fig.querySelector("[data-read]").innerHTML =
        cell("Wage per worker", "£" + LAB.fmt(+wf.value / +wn.value)) +
        cell("To raise wages", "↑ fund or ↓ workers");
    }
    wf.addEventListener("input", draw);
    wn.addEventListener("input", draw);
    draw();
  }

  // ---------- Venn diagram for the comparison lesson ----------
  const REGIONS = [
    ["1", "Bentham only", ["Seven-circumstance calculus of pleasure (p. 130)", "Take from the rich, give to the poor: diminishing utility of money (p. 133)", "Later: idle savings and government money (p. 133)"]],
    ["2", "Say only", ["Labor, capital, and nature are coequal “productive agencies” (p. 135)", "Property is sacred however it was obtained (p. 137)"]],
    ["3", "Senior only", ["Wages fund and the 1834 Poor Law (pp. 139, 141)", "Economics as a value-free science (p. 142)", "No comparing utility across people (p. 145)", "Rent hides inside wages and profits (p. 149)"]],
    ["4", "Bentham & Say", ["Free markets put resources to their best use (early Bentham, p. 132; Say, p. 138)"]],
    ["5", "Bentham & Senior", ["Work is painful; people act to get pleasure and avoid pain (pp. 131, 144, 147)"]],
    ["6", "Say & Senior", ["Owning capital is a sacrifice: frugality / abstinence (pp. 135–136, 147)", "Capital is productive like labor (pp. 135, 147)", "No general glut is possible (pp. 137, 145; early Bentham agreed, p. 132)"]],
    ["7", "All three", ["Utility, not labor, is the basis of value (pp. 131, 135, 144)", "Helped make economics a theory of social harmony (p. 127)"]]
  ];
  function venn(fig, reveal) {
    let s = "";
    s += '<circle cx="250" cy="150" r="125" class="c-bentham"/>';
    s += '<circle cx="390" cy="150" r="125" class="c-say"/>';
    s += '<circle cx="320" cy="270" r="125" class="c-senior"/>';
    s += t(165, 22, "Bentham", "t-big") + t(475, 22, "Say", "t-big") + t(320, 418, "Senior", "t-big");
    const pos = [[185, 120], [455, 120], [320, 340], [320, 95], [245, 245], [395, 245], [320, 190]];
    pos.forEach((p, i) => {
      s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="15" fill="#fff" stroke="var(--ink)" stroke-width="1"/>';
      s += t(p[0], p[1] + 5, reveal ? REGIONS[i][0] : "?", "t-strong");
    });
    let list = '<div class="venn-regions">';
    REGIONS.forEach((r) => {
      list += '<div class="venn-region"><h4>' + r[0] + ". " + r[1] + "</h4>" +
        (reveal ? "<ul>" + r[2].map((x) => "<li>" + x + "</li>").join("") + "</ul>" : "<ul><li>Answer the questions to reveal</li></ul>") + "</div>";
    });
    fig.innerHTML = svg(640, 430, s, "Venn diagram of Bentham, Say, and Senior") + list + "</div>";
  }

  const WHO = ["Bentham only", "Say only", "Senior only", "Say and Senior", "Bentham and Senior", "All three"];
  const who = (prompt, answer, explain, extra) => ({ type: "choice", prompt, options: extra || WHO, answer: (extra || WHO).indexOf(answer), keepOrder: true, explain });

  window.BSS_LESSONS = [
    // =====================================================================
    {
      id: "common",
      title: "The Shared Starting Point",
      subtitle: "Why a utility tradition grew out of capitalism (pp. 125–129)",
      steps: [
        {
          title: "Two ways of seeing the economy",
          body: [
            "Hunt and Lautzenheiser contrast the <b>labor theory of value</b>, or production perspective, with the <b>utility theory of value</b>, or market perspective (p. 125).",
            "Smith and Ricardo used both, so in their work social harmony kept bumping into class conflict (p. 127).",
            "This chapter’s three writers each helped abandon the labor theory and its class-conflict conclusions, making orthodox economics “essentially a theory of social harmony” (p. 127)."
          ],
          questions: [
            {
              type: "choice",
              prompt: "What did Bentham, Say, and Senior each help do, according to the textbook?",
              options: [
                "Abandon the labor theory of value, and with it its class-conflict conclusions",
                "Extend Ricardo’s labor theory of value",
                "Prove that class conflict is permanent",
                "Replace markets with central planning"
              ],
              answer: 0,
              explain: "Their influence removed the contradictions in Smith and Ricardo by making economics a theory of harmony (p. 127)."
            }
          ]
        },
        {
          title: "Five features, treated as human nature",
          body: [
            "The textbook argues that five features of capitalism came to be seen as natural traits of all people in all societies (pp. 125–126, 129):",
            "1. Atomistic individualism · 2. Egoistic utilitarianism · 3. Dependence on markets · 4. Financing industrialization out of profits · 5. Calculating rationalism.",
            "Match each example to its feature."
          ],
          questions: [
            featureQ("Hobbes says even pity is self-interest in disguise; each person is a natural combatant of every other.", 0, "Specialization and isolation led people to see themselves as isolated, egoistic units (p. 126)."),
            featureQ("Every human act comes from the desire to gain pleasure and avoid pain.", 1, "This belief is utilitarianism, the philosophical basis of the utility theory of value (pp. 126–127)."),
            featureQ("Since hardly anyone could survive without the market, the market looked universally beneficial.", 2, "This universal dependence is the foundation of the perceived harmony of interests (p. 127)."),
            featureQ("Profits must rise relative to wages so that factories and machines can be built.", 3, "Capitalist industrialization means accumulation financed by profits (p. 128)."),
            featureQ("Each person acts like an accountant, adding up pleasures, subtracting pains, and choosing the largest surplus.", 4, "Double-entry bookkeeping became a model of all human decisions (p. 129).")
          ]
        },
        {
          title: "Who paid for industrialization?",
          body: [
            "Building factories means producing fewer consumer goods for a while. Someone bears that cost (pp. 127–128).",
            "Historians dispute whether real wages rose in early nineteenth-century England, but at best they rose much more slowly than total output (p. 128)."
          ],
          questions: [
            {
              type: "choice",
              prompt: "According to the textbook, which class paid most of the real social cost of English industrialization?",
              options: ["The working class", "The capitalist class", "The landlords", "The Church"],
              answer: 0,
              explain: "Real wages fell relative to profits throughout the period (p. 128)."
            },
            {
              type: "choice",
              prompt: "Why, then, can it look as if capitalists paid the cost?",
              options: [
                "If you take the split between wages and profits as given, accumulation financed out of profits looks like the capitalists’ sacrifice",
                "Capitalists paid higher taxes",
                "Workers owned the factories",
                "Profits fell during industrialization"
              ],
              answer: 0,
              explain: "This sets up Senior, who tried to justify profit as a reward for the capitalist’s sacrifice (p. 128)."
            }
          ]
        }
      ],
      summary: [
        "The utility (market) perspective sees harmony; the labor (production) perspective sees class conflict (pp. 125, 127).",
        "Five features of capitalism came to be treated as universal human nature: atomism, egoistic utilitarianism, market dependence, profit-financed accumulation, and calculating rationalism (p. 129).",
        "Bentham, Say, and Senior supplied most of the ideas later used to make economics a theory of social harmony (pp. 127, 129)."
      ]
    },

    // =====================================================================
    {
      id: "bentham",
      title: "Bentham’s Calculus",
      subtitle: "Pleasure, pain, and the case for redistribution (pp. 129–134)",
      steps: [
        {
          title: "Two sovereign masters",
          body: [
            "Jeremy Bentham (1748–1832) set out utilitarian philosophy in <em>An Introduction to the Principles of Morals and Legislation</em> (1780), the work that most influenced nineteenth-century economics (p. 129).",
            "Nature, he wrote, placed mankind under two masters, <b>pain and pleasure</b>. <b>Utility</b> is whatever tends to produce pleasure or prevent pain (p. 130).",
            "He saw people as self-interested and essentially lazy. Labor produces only aversion, so “love of labour” is a contradiction in terms (p. 131)."
          ],
          questions: [
            {
              type: "choice",
              prompt: "For Bentham, why does anyone work at all?",
              options: [
                "Only for the promise of greater pleasure or to avoid greater pain",
                "Because work is naturally enjoyable",
                "Out of duty to society",
                "Because custom requires it"
              ],
              answer: 0,
              explain: "Work is painful, so it is never undertaken without a bigger pleasure or a bigger pain at stake (p. 131)."
            }
          ]
        },
        {
          title: "The seven circumstances",
          body: [
            "Bentham said the value of a pleasure or pain depends on seven circumstances: intensity, duration, certainty, propinquity, fecundity, purity, and extent (p. 130). He “suggested a possible method” of quantifying pleasure, but not a formula.",
            "Try it on a Saturday choice. The table adds up weighted ratings. <b>The weights are our invention</b>, and that turns out to matter."
          ],
          figure: calculus,
          questions: [
            { prompt: "With every weight at 1, what is A’s total?", answer: 23, hint: "Add A’s seven ratings.", explain: "5 + 2 + 5 + 5 + 1 + 2 + 3 = 23, so the fair wins over studying (20)." },
            { prompt: "Set the Fecundity weight to 3 (others at 1). What is B’s total now?", answer: 30, hint: "B gains 2 extra × its fecundity rating of 5.", explain: "20 + 2 × 5 = 30, versus 25 for A. Studying now wins." },
            {
              type: "choice",
              prompt: "What does this show about Bentham’s calculus?",
              options: [
                "The verdict depends on weights and units Bentham never specified: it is an apparatus, not a working mechanism",
                "Bentham’s formula always favors studying",
                "Pleasure can be measured as exactly as in physics",
                "Only intensity matters"
              ],
              answer: 0,
              explain: "Bentham hoped happiness could someday be measured like physics (p. 130), but he supplied the checklist, not the scales."
            }
          ]
        },
        {
          title: "Water and diamonds, again",
          body: [
            "Smith said water has great use value but no exchange value, and diamonds the reverse. Bentham objected: water <i>is</i> sold, by London’s New River Board and by water carriers in Paris (pp. 131–132).",
            "Water usually has no exchange value, Bentham argued, because when the whole quantity required is available, <b>the surplus has no use</b> (p. 132). That came very close to the later idea of <b>marginal utility</b>."
          ],
          questions: [
            {
              type: "choice",
              prompt: "In Bentham’s answer, why does abundant water have little exchange value?",
              options: [
                "Once everyone has all the water they need, an extra unit is useless",
                "Water takes no labor to produce",
                "Water is a gift of God and cannot be sold",
                "Governments fix its price"
              ],
              answer: 0,
              explain: "What matters is the usefulness of the extra unit, not total usefulness: the seed of marginal utility (pp. 131–132)."
            },
            {
              type: "choice",
              prompt: "For Ricardo, higher labor productivity lowers a good’s value but raises wealth. For Bentham, more utility…",
              options: ["Raises both value and wealth", "Lowers value but raises wealth", "Has no effect on value", "Lowers both"],
              answer: 0,
              explain: "“It is by the degrees of that value that wealth is measured” (p. 131)."
            }
          ]
        },
        {
          title: "The rich man and the laborer",
          body: [
            "Bentham believed the pleasure we get from money declines as we get more of it: in modern terms, <b>diminishing marginal utility of money</b> (p. 133).",
            "His example: the richest man has 50,000 times a laborer’s income. Is his pleasure 50,000 times greater? Bentham thought five times was “excessive” and twice “a liberal” allowance (p. 133)."
          ],
          questions: [
            { prompt: "If pleasure rose in proportion to income, how many times the laborer’s pleasure would the rich man have?", answer: 50000, unit: "times", hint: "Proportional means same ratio as income.", explain: "50,000 times. Bentham rejects this." },
            { prompt: "Take Bentham’s upper bound: 5 times the pleasure for 50,000 times the income. Each of the rich man’s pounds gives what fraction of the pleasure of a laborer’s pound?", answer: 0.0001, dp: 4, tol: 0.00001, hint: "5 ÷ 50,000", explain: "5 ÷ 50,000 = 0.0001, one ten-thousandth." },
            {
              type: "choice",
              prompt: "So if the government moves £1 from the rich man to the laborer, total pleasure…",
              options: ["Rises", "Falls", "Stays exactly the same"],
              answer: 0,
              explain: "The laborer gains far more pleasure than the rich man loses (p. 133)."
            },
            {
              type: "choice",
              prompt: "Did Bentham want complete equality?",
              options: [
                "No: past a point, redistribution would weaken the inducement to work. His ideal was the inequality of the American states without slavery",
                "Yes, everyone should have the same income",
                "No, he opposed any redistribution",
                "Yes, but only for landlords"
              ],
              answer: 0,
              explain: "Still a radical standard at the time, since inequality there was far below England’s (pp. 133–134)."
            }
          ]
        },
        {
          title: "Early Bentham vs. later Bentham",
          body: [
            "Early on, Bentham was a laissez-faire Smithian: regulation could not raise production, and “whoever saves money adds proportionately to the general mass of capital” (p. 132).",
            "By 1801 he welcomed government action whenever it brought the smallest advantage (pp. 132–133), for two reasons: savings might be hoarded instead of invested, and inequality reduced total happiness (p. 133)."
          ],
          questions: [
            {
              type: "choice",
              prompt: "What worried the later Bentham about frugality?",
              options: [
                "Saved money might be put into a chest and kept there, so prices, production, profits, and investment fall",
                "Saving raises wages too much",
                "Saving makes landlords richer",
                "Saving always increases capital"
              ],
              answer: 0,
              explain: "In that case, he said, the government adding money to circulation would increase wealth (p. 133). He sided with Malthus against Say’s law here."
            },
            {
              type: "choice",
              prompt: "What is the textbook’s main objection to Bentham the reformer?",
              options: [
                "Reform needs an impartial government, but by his own theory legislators are self-interested too, and benefit more from serving the rich",
                "Redistribution is mathematically impossible",
                "Bentham never wrote about government",
                "The poor would not want the money"
              ],
              answer: 0,
              explain: "Government is made of ordinary egoists, not “philosopher kings” (p. 134)."
            }
          ]
        }
      ],
      summary: [
        "All motivation reduces to pleasure and pain; utility is whatever produces pleasure (p. 130).",
        "The seven circumstances are a checklist, not a formula: the result depends on how you weigh them (p. 130).",
        "Bentham came close to marginal utility in his critique of Smith’s water and diamonds (pp. 131–132).",
        "Diminishing utility of money led the later Bentham to favor redistribution, and hoarding led him to doubt Say’s law (p. 133).",
        "His split between laissez-faire and reform foreshadows a split inside neoclassical economics (p. 134)."
      ]
    },

    // =====================================================================
    {
      id: "say",
      title: "Say and Say’s Law",
      subtitle: "Utility, productive agencies, and “no general glut” (pp. 134–138)",
      steps: [
        {
          title: "“Correcting” Adam Smith",
          body: [
            "J.B. Say (1767–1832) saw himself as Smith’s disciple, just tidying up minor errors (p. 134). One historian compared him to a spouse emptying a husband’s trousers of “dangerous thoughts” (p. 134).",
            "The big “error”: Smith gave the power of producing value to labor alone (p. 134). For Say, value comes from <b>utility</b>, and price is “an index of the recognized utility of a thing” (p. 135)."
          ],
          questions: [
            {
              type: "choice",
              prompt: "For Say, what does a commodity’s price measure?",
              options: ["Its recognized utility", "The labor embodied in it", "Its cost in land", "The wage of its maker"],
              answer: 0,
              explain: "Though forcing a price up, Say added, does not increase utility (p. 135)."
            }
          ]
        },
        {
          title: "Productive agencies",
          body: [
            "Say described production as “productive agencies” (human industry, capital, and natural agents) cooperating as equals to create utility (p. 135).",
            "So there is no qualitative difference between <i>working</i> and <i>owning</i>. Capital comes from frugality, which Say called as much a sacrifice as work (pp. 135–136).",
            "Each agency is paid in proportion to the importance of its cooperation in production (p. 136), an idea J.B. Clark later developed fully."
          ],
          questions: [
            {
              type: "choice",
              prompt: "What disappears from economics in Say’s scheme?",
              options: [
                "Any theoretical difference between the incomes of different classes, and with it class conflict",
                "Prices",
                "Capital",
                "Markets"
              ],
              answer: 0,
              explain: "Say thought political economy proves the interests of rich and poor “are not opposed” (pp. 136–137)."
            },
            {
              type: "choice",
              prompt: "What did Say say about property first obtained by violence or fraud?",
              options: [
                "It makes no difference to the production and distribution of its revenue",
                "It should be returned",
                "It should be taxed away",
                "It produces no utility"
              ],
              answer: 0,
              explain: "Say treated property as “sacred and indisputable” (p. 137)."
            }
          ]
        },
        {
          title: "Say’s law: the argument",
          body: [
            "Say argued, against Malthus, that a general glut or depression is impossible (p. 137).",
            "No one produces except to exchange for someone else’s product, and money is only a means of exchange. So <b>a supply creates a demand of the same magnitude</b>: “produce opens a vent for produce” (p. 137)."
          ],
          questions: [
            {
              type: "choice",
              prompt: "Which assumption does the whole argument rest on?",
              options: [
                "Money is wanted only to buy other goods, never held for its own sake",
                "Wages are at subsistence",
                "Land has diminishing returns",
                "Prices never change"
              ],
              answer: 0,
              explain: "Money “had no inherent importance” (p. 137). Remember this: it is the boundary you’ll test in step 5."
            }
          ]
        },
        {
          title: "Model: gluts that cancel out",
          body: [
            "Say allowed temporary gluts of <i>some</i> goods: if some prices are too high and others too low, there are gluts in some markets and shortages in others that exactly cancel in total (p. 137).",
            "Profits are low where there’s a glut and high where there’s a shortage, so capitalists move until “the productive services are equally paid by both” (pp. 137–138). Drag the slider to move capital."
          ],
          figure: (fig) => sayLab(fig, false),
          questions: [
            { prompt: "With 50% of capital in cloth, how big is the cloth glut?", answer: 30, hint: "Cloth supplied 100, demanded 70.", explain: "100 − 70 = 30." },
            { prompt: "And the corn shortage?", answer: 30, hint: "Corn supplied 100, demanded 130.", explain: "130 − 100 = 30. It exactly offsets the cloth glut." },
            { prompt: "What share of capital in cloth (in %) clears both markets?", answer: 35, unit: "%", hint: "Cloth supply must equal cloth demand: 200 × share = 70.", explain: "70 ÷ 200 = 35%. Capital migrating out of low-profit cloth gets there automatically, in Say’s story." }
          ]
        },
        {
          title: "Find the boundary: hoarding",
          body: [
            "Now break the key assumption. Suppose people hold some of their income as money instead of spending it, like the later Bentham’s chest of savings (p. 133)."
          ],
          figure: (fig) => sayLab(fig, true),
          questions: [
            { prompt: "Set capital in cloth to 35% and hoarding to 10%. How large is the general glut of all goods?", answer: 20, hint: "Total supply is 200; total spending is 90% of 200.", explain: "200 − 180 = 20 of goods that cannot be sold anywhere. Moving capital can’t fix it." },
            {
              type: "choice",
              prompt: "Which economists rejected Say’s law?",
              options: ["Malthus, the later Bentham, Marx, and Keynes", "Smith and Ricardo", "Say and Senior", "No one has ever rejected it"],
              answer: 0,
              explain: "Smith, Ricardo, and the early Bentham accepted the idea before it was named for Say (p. 137)."
            }
          ]
        }
      ],
      summary: [
        "Value comes from utility; price is an index of recognized utility (p. 135).",
        "Labor, capital, and nature are coequal productive agencies; owning capital is a sacrifice like working (pp. 135–136).",
        "Incomes reflect each agency’s contribution, so class conflict disappears (p. 136).",
        "Say’s law: supply creates its own demand, so gluts of some goods are offset by shortages of others (pp. 137–138).",
        "The law depends on money never being hoarded. Break that and a general glut appears."
      ]
    },

    // =====================================================================
    {
      id: "senior",
      title: "Senior and Abstinence",
      subtitle: "Wages fund, the Poor Law, and justifying profit (pp. 138–151)",
      steps: [
        {
          title: "Who was Nassau Senior?",
          body: [
            "Nassau Senior (1790–1864) was a lawyer, an adviser to the Whig party, and in 1825 the first professor of political economy at Oxford (p. 138).",
            "Before 1830 he was sympathetic to the poor and optimistic that moral education would raise their living standards (p. 139). Then strikes, riots, and what he called the “fires and insurrections” of the autumn of 1830 changed his views (p. 139)."
          ],
          questions: [
            {
              type: "choice",
              prompt: "What changed Senior’s views on the working class?",
              options: [
                "The strikes, riots, and unrest of 1829–1830, especially the autumn of 1830",
                "Reading Adam Smith",
                "A trip to America",
                "The repeal of the Corn Laws"
              ],
              answer: 0,
              explain: "He came to see the poor laws as a threat to English capitalism itself (p. 139)."
            }
          ]
        },
        {
          title: "The wages fund",
          body: [
            "In 1830 Senior argued that capitalists hold a “fund for the maintenance of labourers,” later called the <b>wages fund doctrine</b> (p. 139).",
            f("wage = wages fund ÷ number of workers") + ". The fund is set by labor’s productivity (p. 139)."
          ],
          figure: wagesFund,
          questions: [
            { prompt: "A £600,000 fund is shared by 120,000 workers. What is the wage?", answer: 5, prefix: "£", hint: "600,000 ÷ 120,000", explain: "£5." },
            { prompt: "The number of workers grows to 150,000 with the same fund. New wage?", answer: 4, prefix: "£", hint: "600,000 ÷ 150,000", explain: "£4. More workers, smaller share each." },
            {
              type: "choice",
              prompt: "How did Senior say workers’ living standards could rise?",
              options: [
                "Raise productivity (free commerce and accumulation, abolish the poor laws) or have fewer workers",
                "Strikes and unions",
                "A legal minimum wage",
                "Higher poor-law allowances"
              ],
              answer: 0,
              explain: "He blamed the poor laws for making wages “a right for the one, and a tax on the other” (p. 139)."
            }
          ]
        },
        {
          title: "The 1834 Poor Law",
          body: [
            "Senior largely wrote the 1834 report of the Poor Law Inquiry Commission, which became the new Poor Law (p. 141).",
            "Its rules: take any job the market offers; those without work get barely enough to avoid starvation; and relief must be well below the lowest market wage, and stigmatizing (p. 141)."
          ],
          questions: [
            {
              type: "choice",
              prompt: "If the lowest market wage is £4 a week, relief under the 1834 law must be…",
              options: [
                "Well below £4, given in a jail-like workhouse",
                "Exactly £4",
                "More than £4, to support families",
                "Set by the worker’s needs"
              ],
              answer: 0,
              explain: "Relief had to be “less eligible” than the lowest wage outside (p. 141)."
            },
            {
              type: "choice",
              prompt: "Why did Senior want the poor kept in a “fear of deficiency”?",
              options: [
                "He thought it was the only alternative to moral and physical evil in checking population",
                "To raise wages",
                "To encourage unions",
                "To lower rents"
              ],
              answer: 0,
              explain: "His second proposition nearly restates Malthus (p. 146)."
            }
          ]
        },
        {
          title: "Four propositions and a “value-free” science",
          body: [
            "Senior said economics studies wealth, not happiness, and its conclusions do not authorize “a single syllable of advice” (p. 142). Yet he called its principles “fatal to neglect” (p. 143).",
            "His four propositions (p. 144): (1) everyone wants more wealth with as little sacrifice as possible; (2) population is limited only by moral or physical evil or fear of deficiency; (3) labor and other instruments can be increased indefinitely by using their products in further production; (4) with the same skill, more labor on land gives less than proportional returns."
          ],
          questions: [
            {
              type: "choice",
              prompt: "Which proposition underlies Senior’s case for capital accumulation?",
              options: ["Proposition 3", "Proposition 1", "Proposition 2", "Proposition 4"],
              answer: 0,
              explain: "Using products as means of further production is how capital raises labor’s productivity (pp. 146–148)."
            },
            {
              type: "choice",
              prompt: "What is the textbook’s objection to Senior’s “value-free” method?",
              options: [
                "Choosing which “few general propositions” matter already depends on the theorist’s values",
                "Senior used too much mathematics",
                "Economics has no facts",
                "Senior gave too much advice to workers"
              ],
              answer: 0,
              explain: "Relevance only makes sense relative to a problem, and choosing problems is a value judgment (pp. 142–143)."
            }
          ]
        },
        {
          title: "Abstinence",
          body: [
            "Workers earn wages for <b>labor</b>. What does the capitalist do to earn profit? Senior coined a word for it: <b>abstinence</b>, abstaining from the unproductive use of capital (p. 147).",
            "Abstaining from enjoyment, he said, is “among the most painful exertions of the human will,” so profits, like wages, pay for real pain (p. 147)."
          ],
          questions: [
            {
              type: "choice",
              prompt: "Profit is to abstinence as wages are to…",
              options: ["Labor", "Rent", "Land", "Population"],
              answer: 0,
              explain: "That parallel is the whole point: it gives profit the same moral justification as wages (p. 147)."
            },
            {
              type: "choice",
              prompt: "Which is one of the textbook’s criticisms of abstinence?",
              options: [
                "Most capital is inherited, and capitalists clearly enjoy making profits, as Senior himself admitted",
                "Capitalists never save",
                "Workers also receive profit",
                "Abstinence lowers wages"
              ],
              answer: 0,
              explain: "Senior himself called the desire for wealth “instinctive” and credited vanity for saving (p. 150)."
            }
          ]
        },
        {
          title: "Is it rent, wages, or profit?",
          body: [
            "Senior defined rent as “an advantage derived from the use of a natural agent not universally accessible” (p. 148). Then he found rent hiding inside other incomes (pp. 148–149).",
            "Classify each income the way Senior would."
          ],
          questions: [
            {
              type: "choice",
              prompt: "An heir receives income from a factory his father built by saving.",
              options: ["Rent", "Profit", "Wages"],
              answer: 0,
              keepOrder: true,
              explain: "Once capital passes by gift or inheritance to someone whose abstinence didn’t create it, profit becomes rent (p. 149)."
            },
            {
              type: "choice",
              prompt: "A worker with extraordinary natural talent earns far above the usual wage.",
              options: ["Rent (Senior said it could equally be called wages)", "Profit", "Not income at all"],
              answer: 0,
              keepOrder: true,
              explain: "Extraordinary pay from extraordinary talent “might be termed, with equal correctness, rent … or wages” (p. 149)."
            },
            {
              type: "choice",
              prompt: "Why does it matter that Senior blurred rent, wages, and profit?",
              options: [
                "If all incomes have the same sources, class distinctions, and so class conflict, look unimportant",
                "It made taxes easier to collect",
                "It proved Ricardo’s rent theory",
                "It raised wages"
              ],
              answer: 0,
              explain: "Later thinkers influenced by Senior came to see capitalism as essentially classless (p. 149)."
            }
          ]
        }
      ],
      summary: [
        "Wages fund doctrine: wage = fund ÷ workers, so wages rise only with productivity or fewer workers (p. 139).",
        "The 1834 Poor Law made relief “less eligible” than the lowest wage (p. 141).",
        "Senior claimed a value-free science while calling his principles “fatal to neglect” (pp. 142–143).",
        "Abstinence makes profit a reward for pain, just like wages (p. 147).",
        "By finding rent inside wages and profit, Senior blurred class lines (pp. 148–149)."
      ]
    },

    // =====================================================================
    {
      id: "compare",
      title: "Overlap & Distinct",
      subtitle: "Who said it? The comparison quiz",
      steps: [
        {
          title: "Value and utility",
          body: ["For each idea, choose who held it. Some are shared; watch for the ones that only look shared."],
          questions: [
            who("Utility, not labor, is the basis of value.", "All three", "Bentham: “all value is founded on utility” (p. 131); Say (p. 135); Senior (p. 144)."),
            who("Came closest to marginal utility by attacking Smith’s water-and-diamonds example.", "Bentham only", "The surplus of water “has no kind of value” (pp. 131–132)."),
            who("Labor, capital, and natural agents are coequal “productive agencies.”", "Say only", "Senior later agreed capital is productive like labor (p. 147), but the “productive agencies” framework is Say’s (p. 135).")
          ]
        },
        {
          title: "Gluts and money",
          body: ["Careful: Bentham changed his mind."],
          questions: [
            who("A general glut of all goods is impossible.", "Say and Senior", "Say’s law (p. 137); Senior, because desire is insatiable (p. 145). Only the early Bentham agreed (p. 132)."),
            who("Savings might sit idle in a chest, lowering production; government money could help.", "Bentham only", "The later Bentham (p. 133)."),
            who("Gluts are impossible because no one’s desire for wealth is ever satisfied.", "Senior only", "Senior’s version of the argument (p. 145).")
          ]
        },
        {
          title: "Justifying incomes",
          body: ["The utility tradition needed to show that owners, like workers, earn their income."],
          questions: [
            who("Owning capital involves a real sacrifice, so profit is earned like wages.", "Say and Senior", "Say’s frugality (pp. 135–136) and Senior’s abstinence (p. 147)."),
            who("Property is legitimate however it was first obtained, even by violence or fraud.", "Say only", "p. 137."),
            who("Work is painful, and people act only to gain pleasure or avoid pain.", "Bentham and Senior", "Bentham: love of labour is a contradiction (p. 131). Senior: work is painful, and abstinence is too (pp. 144, 147).")
          ]
        },
        {
          title: "Equality and government",
          body: ["Here Bentham and Senior part ways sharply."],
          questions: [
            who("Moving money from rich to poor raises society’s total happiness.", "Bentham only", "Because of diminishing marginal utility of money (p. 133)."),
            who("We cannot compare how much utility different people get from wealth.", "Senior only", "Senior denied both of Bentham’s egalitarian premises: satiety and comparability (p. 145)."),
            who("Economics should be a value-free science that gives no advice.", "Senior only", "“Not a single syllable of advice” (p. 142).")
          ]
        },
        {
          title: "The course question",
          body: [
            "Does market exchange harmonize our interests, or conceal a conflict between them? All three belong to the harmony tradition (p. 127), but not equally neatly."
          ],
          figure: venn,
          revealFigure: true,
          questions: [
            {
              type: "choice",
              prompt: "Whose own writing contains a split, laissez-faire versus reform, that later divides neoclassical economics?",
              options: ["Bentham", "Say", "Senior"],
              answer: 0,
              keepOrder: true,
              explain: "His reformist phase accepted government action to fix idle savings and inequality (p. 134)."
            },
            {
              type: "choice",
              prompt: "Which feature of Say’s argument (not his politics) puts him firmly on the harmony side?",
              options: [
                "Every income is payment for a productive agency’s contribution to utility, so no class takes from another",
                "He disliked Malthus",
                "He was French",
                "He supported the Poor Law"
              ],
              answer: 0,
              explain: "With incomes justified by contribution, rich and poor interests “are not opposed” (pp. 136–137)."
            },
            {
              type: "choice",
              prompt: "Senior called the worker–master relation “a voluntary association.” Where does his own writing reveal conflict anyway?",
              options: [
                "He said the poor must be excluded from politics, kept in fear of deficiency, or held down by military power",
                "Nowhere; he was consistent",
                "In his support for unions",
                "In his praise of Bentham’s redistribution"
              ],
              answer: 0,
              explain: "His “three means of governing” the poor (p. 141) and the 1834 Poor Law (p. 141) assume opposed interests."
            }
          ]
        }
      ],
      summary: [
        "All three: value rests on utility, and markets harmonize interests (pp. 127, 131, 135, 144).",
        "Bentham alone: the pleasure calculus and redistribution via diminishing utility of money; later, doubts about Say’s law (pp. 130, 133).",
        "Say alone: coequal productive agencies and property sacred regardless of origin (pp. 135, 137).",
        "Senior alone: wages fund, abstinence’s moral language, value-free method, and no interpersonal comparisons (pp. 139, 142, 145, 147).",
        "Say and Senior share: owning is a sacrifice, and no general glut is possible (pp. 135–137, 145, 147)."
      ]
    }
  ];
})();
