// Build 2 lessons: David Ricardo's model (textbook Chapter 5).
// Step format is described at the top of js/lab.js.
(function () {
  const C = LAB.charts;
  const f = (s) => '<span class="formula">' + s + "</span>";

  // ---------- Lesson 1 data ----------
  const LANDS = [100, 90, 80];

  // ---------- Lesson 2 corn model ----------
  // Extra corn from the x-th unit of land: P = 120 − 2x.
  const CORN = { a: 120, b: 2, w: 40, ws: 50 };

  function cornExplorer(fig) {
    const m = CORN;
    fig.innerHTML =
      '<div class="lab-controls">' +
      '<div class="slider-row"><label for="cw">Wage per unit (w)</label><input id="cw" type="range" min="40" max="60" step="1" value="50"><output id="cwo"></output></div>' +
      '<div class="slider-row"><label for="cx">Land farmed (x)</label><input id="cx" type="range" min="1" max="35" step="1" value="30"><output id="cxo"></output></div>' +
      '<div class="btn-row"><button type="button" class="btn small ghost" data-x="30">Corn Laws: grow it all at home (x = 30)</button>' +
      '<button type="button" class="btn small ghost" data-x="15">Repeal: import half the corn (x = 15)</button></div>' +
      "</div><div data-chart></div><div class=\"readouts\" data-read></div>";
    const ws = fig.querySelector("#cw");
    const xs = fig.querySelector("#cx");
    const chart = fig.querySelector("[data-chart]");
    const read = fig.querySelector("[data-read]");
    function draw() {
      const w = +ws.value;
      const maxX = Math.floor((m.a - w) / m.b);
      xs.max = maxX;
      if (+xs.value > maxX) xs.value = maxX;
      const x = +xs.value;
      fig.querySelector("#cwo").value = w;
      fig.querySelector("#cxo").value = x;
      const px = m.a - m.b * x;
      const rent = 0.5 * x * (m.a - px);
      const wages = w * x;
      const profits = (px - w) * x;
      const total = rent + wages + profits;
      chart.innerHTML = C.corn(m, x, w);
      const cell = (k, v) => '<div class="readout"><div class="k">' + k + '</div><div class="v">' + v + "</div></div>";
      read.innerHTML =
        cell("Last unit yields", px) +
        cell("Rent", LAB.fmt(rent, 0)) +
        cell("Wages", LAB.fmt(wages, 0)) +
        cell("Profits", LAB.fmt(profits, 0)) +
        cell("Rate of profit", LAB.fmt((100 * (px - w)) / w, 0) + "%") +
        cell("Landlords’ share", LAB.fmt((100 * rent) / total, 0) + "%");
    }
    ws.addEventListener("input", draw);
    xs.addEventListener("input", draw);
    fig.querySelectorAll("[data-x]").forEach((b) =>
      b.addEventListener("click", () => {
        ws.value = 50;
        xs.value = b.dataset.x;
        draw();
      })
    );
    draw();
  }

  // ---------- Lesson 4 price lab ----------
  function priceLab(fig) {
    fig.innerHTML =
      '<div class="lab-controls">' +
      '<div class="slider-row"><label for="pw">Wage per labor unit</label><input id="pw" type="range" min="0.5" max="3" step="0.1" value="1"><output id="pwo"></output></div>' +
      '<div class="slider-row"><label for="pr">Rate of profit</label><input id="pr" type="range" min="0" max="60" step="1" value="50"><output id="pro"></output></div>' +
      '<div class="btn-row"><button type="button" class="btn small ghost" data-p="1,50">Table 5.1 ($1, 50%)</button>' +
      '<button type="button" class="btn small ghost" data-p="2,10">Table 5.2 ($2, 10%)</button>' +
      '<button type="button" class="btn small ghost" data-p="2,0">No profit at all</button></div>' +
      '</div><div class="table-wrap" data-table></div><div class="readouts" data-read></div>';
    const pw = fig.querySelector("#pw");
    const pr = fig.querySelector("#pr");
    function draw() {
      const w = +pw.value;
      const r = +pr.value / 100;
      fig.querySelector("#pwo").value = "$" + w.toFixed(2);
      fig.querySelector("#pro").value = pr.value + "%";
      const x = LAB.price(100, 75, 4, w, r);
      const y = LAB.price(300, 50, 2, w, r);
      const row = (name, p) =>
        "<tr><td>" + name + "</td><td>" + LAB.fmt(p.A) + "</td><td>" + LAB.fmt(p.B) + "</td><td>" + LAB.fmt(p.C) +
        "</td><td>" + LAB.fmt(p.D) + '</td><td class="hl">$' + LAB.fmt(p.E) + "</td></tr>";
      fig.querySelector("[data-table]").innerHTML =
        '<table class="calc-table"><thead><tr><th></th><th>A. Labor</th><th>B. Machinery</th><th>C. Profit</th><th>D. Total</th><th>E. Price/unit</th></tr></thead><tbody>' +
        row("Commodity x", x) + row("Commodity y", y) + "</tbody></table>";
      const cell = (k, v) => '<div class="readout"><div class="k">' + k + '</div><div class="v">' + v + "</div></div>";
      fig.querySelector("[data-read]").innerHTML =
        cell("Labor ratio x : y", "1.00") +
        cell("Price ratio x : y", LAB.fmt(x.E / y.E)) +
        cell("Gap from labor", LAB.fmt(Math.abs(x.E / y.E - 1) * 100, 0) + "%");
    }
    pw.addEventListener("input", draw);
    pr.addEventListener("input", draw);
    fig.querySelectorAll("[data-p]").forEach((b) =>
      b.addEventListener("click", () => {
        const [w, r] = b.dataset.p.split(",");
        pw.value = w;
        pr.value = r;
        draw();
      })
    );
    draw();
  }

  const tradeTable = (e, p) =>
    '<div class="table-wrap"><table class="calc-table"><thead><tr><th>Hours to make one unit</th><th>Cloth</th><th>Wine</th></tr></thead><tbody>' +
    "<tr><td>England</td><td>" + e[0] + "</td><td>" + e[1] + "</td></tr>" +
    "<tr><td>Portugal</td><td>" + p[0] + "</td><td>" + p[1] + "</td></tr></tbody></table></div>";

  window.RICARDO_LESSONS = [
    // =====================================================================
    {
      id: "rent",
      title: "Rent on the Land",
      subtitle: "Differential rent (Figures 5.1 and 5.2)",
      steps: [
        {
          title: "Ricardo’s big question",
          body: [
            "David Ricardo (1772–1823) made a fortune on the stock exchange, read <em>The Wealth of Nations</em> in 1799, and became the most rigorous theorist of the classical economists.",
            "In his <em>Principles of Political Economy and Taxation</em> (1817), he said the main problem of political economy is explaining how the produce of the earth is divided among three classes: <b>landlords</b> (rent), <b>capitalists</b> (profit), and <b>laborers</b> (wages).",
            "His rent theory rests on two assumptions: (1) land differs in fertility and can be ranked from best to worst, and (2) competition equalizes the rate of profit among the capitalist farmers who rent the land.",
            "Key term: " + f("net produce = total produce − wages − capital used up") + ". It’s the surplus left to be split. Below are three plots of land, each worked with the same capital and labor."
          ],
          figure: C.rentBars(LANDS, 0),
          questions: [
            {
              type: "choice",
              prompt: "Net produce is split between…",
              options: ["Profit and rent", "Wages and rent", "Wages and profit", "Rent only"],
              answer: 0,
              explain: "Wages are already subtracted, so the surplus goes to the capitalist farmer (profit) and the landlord (rent)."
            }
          ]
        },
        {
          title: "Only the best land is farmed",
          body: ["At first, population is small and only Land No. 1 is farmed. It yields a net produce of 100 quarters of corn."],
          figure: C.rentBars(LANDS, 1),
          questions: [
            {
              prompt: "How many quarters of rent can the landlord of No. 1 charge?",
              answer: 0,
              unit: "quarters",
              hint: "Is any worse land being farmed that a farmer could compare it with?",
              explain: "Zero. Ricardo said rent exists only because land is limited and unequal in quality. With no worse land in use, the capitalist keeps all 100 as profit."
            }
          ]
        },
        {
          title: "Population grows: No. 2 is farmed",
          body: [
            "More people need more food, so Land No. 2 (net produce 90) is brought into cultivation. Its farmer pays no rent: it is the <b>no-rent margin</b>.",
            "Competition won’t allow two rates of profit on the same capital. A farmer would be just as happy on No. 2 paying no rent as on No. 1 paying the difference."
          ],
          figure: (fig, reveal) => (fig.innerHTML = C.rentBars(LANDS, 2, !reveal)),
          revealFigure: true,
          questions: [
            {
              prompt: "What rent is now paid on No. 1?",
              answer: 10,
              unit: "quarters",
              hint: "Every farmer must end up with the same profit as the farmer on No. 2.",
              explain: "100 − 90 = 10 quarters."
            },
            {
              prompt: "What profit does each capitalist farmer now earn?",
              answer: 90,
              unit: "quarters",
              hint: "Look at the farmer who pays no rent.",
              explain: "90 quarters on every farm: the net produce of the no-rent land."
            }
          ]
        },
        {
          title: "No. 3 is farmed",
          body: [
            "Population grows again, and Land No. 3 (net produce 80) becomes the new no-rent margin.",
            "Ricardo’s rule: " + f("rent on a plot = its net produce − net produce of the no-rent land") + "."
          ],
          figure: (fig, reveal) => (fig.innerHTML = C.rentBars(LANDS, 3, !reveal)),
          revealFigure: true,
          questions: [
            { prompt: "Rent on No. 2?", answer: 10, unit: "quarters", hint: "90 − ?", explain: "90 − 80 = 10. Rent now starts on No. 2." },
            { prompt: "Rent on No. 1?", answer: 20, unit: "quarters", hint: "100 − ?", explain: "100 − 80 = 20. Rent on the best land rises." },
            { prompt: "Profit per farmer?", answer: 80, unit: "quarters", hint: "What does the no-rent farm make?", explain: "80 on every farm. Profit per farm keeps falling as worse land is used." }
          ]
        },
        {
          title: "Why competition sets the rent",
          body: ["Suppose, after No. 3 is farmed, the farmer on No. 1 somehow pays only 15 quarters of rent."],
          questions: [
            {
              prompt: "What profit does that lucky farmer make?",
              answer: 85,
              unit: "quarters",
              hint: "Net produce on No. 1 minus the rent paid.",
              explain: "100 − 15 = 85, while the other farmers make only 80."
            },
            {
              type: "choice",
              prompt: "What happens next?",
              options: [
                "Other farmers offer the landlord more, bidding rent on No. 1 up until it reaches 20",
                "The landlord lowers the rent to be fair",
                "All the farmers move to No. 3",
                "Nothing: rents are fixed by custom"
              ],
              answer: 0,
              explain: "As long as rent is below 20, capitalists can earn above-average profit by bidding for No. 1. Bidding stops at 20, where profits are equal everywhere."
            }
          ]
        },
        () => {
          const v = [LAB.pick(110, 150, 5)];
          for (let i = 1; i < 4; i++) v.push(v[i - 1] - LAB.pick(5, 20, 5));
          const m = v[3];
          return {
            title: "Your turn: new numbers",
            regen: true,
            body: ["Four plots are now farmed. Use Ricardo’s rule. Press <b>↻ New numbers</b> any time for a fresh set."],
            figure: (fig, reveal) => (fig.innerHTML = C.rentBars(v, 4, !reveal)),
            revealFigure: true,
            questions: [
              { prompt: "Rent on No. 1?", answer: v[0] - m, unit: "quarters", hint: v[0] + " − the no-rent land’s net produce.", explain: v[0] + " − " + m + " = " + (v[0] - m) + "." },
              { prompt: "Rent on No. 2?", answer: v[1] - m, unit: "quarters", hint: v[1] + " − " + m, explain: v[1] + " − " + m + " = " + (v[1] - m) + "." },
              { prompt: "Rent on No. 3?", answer: v[2] - m, unit: "quarters", hint: v[2] + " − " + m, explain: v[2] + " − " + m + " = " + (v[2] - m) + "." },
              { prompt: "Profit per farmer?", answer: m, unit: "quarters", hint: "The no-rent farm keeps all of its net produce.", explain: "Every farmer earns " + m + "." },
              {
                prompt: "Total rent paid to landlords?",
                answer: v[0] + v[1] + v[2] - 3 * m,
                unit: "quarters",
                hint: "Add up the three rents.",
                explain: "Total rent = " + (v[0] - m) + " + " + (v[1] - m) + " + " + (v[2] - m) + " = " + (v[0] + v[1] + v[2] - 3 * m) + "."
              }
            ]
          };
        },
        {
          title: "From steps to a line",
          body: [
            "The size of a “parcel” is arbitrary. Cut the land into smaller and smaller parcels and the step-like tops of the bars become a smooth downward line, <b>NP</b> (Figure 5.2).",
            "Add wages to NP and you get line <b>P</b>, total produce per unit of land (Figure 5.3). On the last, no-rent unit, the triangle above it is <b>rent</b>; the rectangle below is <b>profits plus wages</b>. You’ll use this picture in the next lesson."
          ],
          figure: C.stepsLine(),
          questions: [
            {
              type: "choice",
              prompt: "What does the downward-sloping NP line show?",
              options: [
                "Diminishing productivity: each extra parcel farmed yields less",
                "Corn prices falling over time",
                "Landlords cutting rents",
                "Wages rising"
              ],
              answer: 0,
              explain: "This diminishing productivity in agriculture drives everything else in Ricardo’s model."
            }
          ]
        }
      ],
      summary: [
        "Rent exists only because land is limited in quantity and unequal in quality.",
        "Rent on any plot = its net produce − the net produce of the no-rent (marginal) land.",
        "Competition among capitalist farmers bids rent up until profit is equal on every farm.",
        "As worse land is farmed, rent rises on all better land and profit per farm falls."
      ]
    },

    // =====================================================================
    {
      id: "corn",
      title: "The Profit Squeeze",
      subtitle: "The corn model and the Corn Laws (Figures 5.3 and 5.4)",
      steps: [
        {
          title: "A one-good economy",
          body: [
            "To explain profits, Ricardo first imagined an economy that produces only <b>corn</b>. Wages are paid in corn, and the capitalist’s capital is just the corn “advanced” to workers as wages.",
            "Ricardo accepted Malthus: population growth pushes wages toward <b>subsistence</b>. While capital is accumulating, the market wage can sit a bit above it.",
            "Our numbers: the extra corn from the x-th unit of land is " + f("P = 120 − 2x") + ". Subsistence wage per unit of land " + f("w = 40") + ". Wage while accumulation is happening " + f("w* = 50") + "."
          ],
          figure: C.corn(CORN, 0),
          questions: [
            {
              type: "choice",
              prompt: "Since competition equalizes profit rates, which land sets the rate of profit for everyone?",
              options: ["The no-rent (marginal) land", "The most fertile land", "The landlord’s favorite field", "Manufacturing, not land"],
              answer: 0,
              explain: "Profit on the no-rent land is just produce minus wages, and competition makes every capitalist’s rate of profit match it."
            }
          ]
        },
        {
          title: "Early growth: x = 10",
          body: [
            "Ten units of land are farmed and the wage is w* = 50.",
            "On the marginal unit there’s no rent, so " + f("profit = P − w*") + " and " + f("rate of profit = (P − w*) ÷ w*") + "."
          ],
          figure: C.corn(CORN, 10),
          questions: [
            { prompt: "How much corn does the 10th (marginal) unit produce?", answer: 100, unit: "corn", hint: "120 − 2 × 10", explain: "120 − 20 = 100." },
            { prompt: "Profit on that marginal unit?", answer: 50, unit: "corn", hint: "100 − w*", explain: "100 − 50 = 50." },
            { prompt: "Rate of profit?", answer: 100, unit: "%", hint: "Profit ÷ wages, as a percent.", explain: "50 ÷ 50 = 100%." }
          ]
        },
        {
          title: "Splitting the whole harvest at x = 10",
          body: [
            "Now look at the whole economy, using the areas in the figure:",
            "Rent is the triangle: " + f("½ × x × (120 − P)") + ". Wages are the bottom rectangle: " + f("w* × x") + ". Profits are the middle rectangle: " + f("(P − w*) × x") + "."
          ],
          figure: C.corn(CORN, 10),
          questions: [
            { prompt: "Total rent?", answer: 100, unit: "corn", hint: "½ × 10 × (120 − 100)", explain: "½ × 10 × 20 = 100." },
            { prompt: "Total wages?", answer: 500, unit: "corn", hint: "50 × 10", explain: "50 × 10 = 500." },
            { prompt: "Total profits?", answer: 500, unit: "corn", hint: "(100 − 50) × 10", explain: "50 × 10 = 500. Profits are large, so capital accumulates quickly." }
          ]
        },
        {
          title: "Population grows: x = 30",
          body: [
            "Accumulation keeps wages above subsistence, so population grows and more (worse) land must be farmed. Now x = 30, with the wage still at 50.",
            "Watch what happens to the rent triangle and the profit rectangle."
          ],
          figure: C.corn(CORN, 30),
          questions: [
            { prompt: "Corn from the 30th unit?", answer: 60, unit: "corn", hint: "120 − 2 × 30", explain: "120 − 60 = 60." },
            { prompt: "Rate of profit now?", answer: 20, unit: "%", hint: "(60 − 50) ÷ 50", explain: "10 ÷ 50 = 20%, down from 100%. Same wage, much lower profit rate." },
            { prompt: "Total rent now?", answer: 900, unit: "corn", hint: "½ × 30 × (120 − 60)", explain: "½ × 30 × 60 = 900, up from 100." },
            { prompt: "Total profits now?", answer: 300, unit: "corn", hint: "(60 − 50) × 30", explain: "10 × 30 = 300, down from 500, even though three times as much land is farmed." }
          ]
        },
        {
          title: "The stationary state",
          body: [
            "Keep going and the marginal land eventually produces only enough to pay a <b>subsistence</b> wage. Profit disappears.",
            "Ricardo: with no profit there is no motive to accumulate. Growth halts, wages fall back to subsistence, and the economy reaches the <b>stationary state</b>."
          ],
          figure: C.corn(CORN, 40, 40),
          questions: [
            { prompt: "At what x does P fall to the subsistence wage of 40?", answer: 40, unit: "units of land", hint: "Solve 120 − 2x = 40.", explain: "2x = 80, so x = 40." },
            { prompt: "Total rent at that point?", answer: 1600, unit: "corn", hint: "½ × 40 × (120 − 40)", explain: "½ × 40 × 80 = 1,600. Landlords now take the whole surplus." },
            {
              type: "choice",
              prompt: "What happens to accumulation in the stationary state?",
              options: ["It stops: without profit there is no motive to accumulate", "It speeds up", "Landlords take over accumulating capital", "Wages rise and restart it"],
              answer: 0,
              explain: "No one accumulates except to make the accumulation productive, Ricardo wrote, and that requires profit."
            }
          ]
        },
        {
          title: "Explore: the Corn Laws",
          body: [
            "Britain’s Corn Laws restricted imports of grain, so more and worse land had to be farmed at home. Ricardo argued for repeal.",
            "Drag the sliders, or use the buttons to compare growing all the corn at home with importing half of it. Watch the profit rate and the landlords’ share."
          ],
          figure: cornExplorer,
          questions: [
            {
              type: "choice",
              prompt: "Who gains from the Corn Laws in this model?",
              options: ["Landlords, through higher rent", "Capitalists, through higher profit", "Workers, through higher wages", "Everyone equally"],
              answer: 0,
              explain: "More land farmed means a bigger rent triangle and a lower profit rate. Ricardo concluded that the interest of the landlord is always opposed to that of every other class."
            }
          ]
        },
        {
          title: "What actually squeezes profit?",
          body: [
            "A subtle point: rent itself doesn’t squeeze profit. As cultivation extends, corn takes more labor to grow, so the money wage needed to keep workers at subsistence rises.",
            "Ricardo assumed a constant average price level. Manufacturing productivity hadn’t changed, so manufactured prices had to fall relative to corn until profit rates were equal again, at a lower level.",
            "He also knew remedies existed: free importation of food and improvements in agriculture."
          ],
          questions: [
            {
              type: "choice",
              prompt: "In Ricardo’s model, what directly pushes the profit rate down?",
              options: [
                "Higher wages, because corn (workers’ main food) takes more labor to produce",
                "Landlords raising rents whenever they like",
                "Too much demand for manufactured goods",
                "Machines replacing workers"
              ],
              answer: 0,
              explain: "If wages rise with the price of corn, Ricardo wrote, profits would necessarily fall."
            },
            {
              type: "choice",
              prompt: "Which remedies did Ricardo say could check the fall in profits?",
              options: [
                "Free importation of food and improvements in agriculture",
                "Higher tariffs on imported corn",
                "Lower wages set by law",
                "Giving landlords a larger share"
              ],
              answer: 0,
              explain: "England did avoid the stationary state, partly by repealing the Corn Laws and partly through rising farm productivity."
            }
          ]
        }
      ],
      summary: [
        "On the no-rent land, profit = produce − wages, and competition makes that the profit rate everywhere.",
        "As population grows and worse land is farmed, the rent triangle grows and the rate of profit falls, even at the same wage.",
        "When profit reaches zero, accumulation stops: the stationary state.",
        "Ricardo opposed the Corn Laws because they forced worse land into use, raising rent and squeezing profit."
      ]
    },

    // =====================================================================
    {
      id: "value",
      title: "Labor, Capital & Time",
      subtitle: "The labor theory of value (Figures 5.5 and 5.6)",
      steps: [
        {
          title: "What sets value?",
          body: [
            "Ricardo said a good must have utility to have value, but utility doesn’t regulate its value.",
            "Exchange value comes from <b>scarcity</b> or from the <b>quantity of labor</b> needed to obtain the good. Scarcity matters only for goods that can’t be reproduced, like rare statues, scarce books and coins, and wines of a peculiar quality.",
            "Most goods can be multiplied almost without limit by applying more labor. For them, labor embodied regulates value."
          ],
          questions: [
            {
              type: "choice",
              prompt: "Which good’s value would Ricardo NOT explain by labor embodied?",
              options: ["A rare old painting", "A bolt of cloth", "A pair of stockings", "A bushel of corn"],
              answer: 0,
              explain: "Its value depends on the wealth and tastes of buyers, not on labor. Ricardo thought such goods were unimportant for distribution and accumulation."
            }
          ]
        },
        {
          title: "Beaver and deer",
          body: [
            "Ricardo approvingly quoted Adam Smith’s example: among hunters, if a beaver takes twice the labor of a deer, one beaver exchanges for two deer.",
            "Unlike Smith, Ricardo believed this still held in a capitalist economy, with some modifications you’ll see in the next lesson."
          ],
          questions: [
            { prompt: "A beaver takes 2 days to hunt and a deer takes 1. How many deer for one beaver?", answer: 2, unit: "deer", hint: "Ratio of labor times.", explain: "2 ÷ 1 = 2 deer." },
            { prompt: "A coat takes 30 hours and a hat takes 6 hours. How many hats exchange for one coat?", answer: 5, unit: "hats", hint: "30 ÷ 6", explain: "30 ÷ 6 = 5 hats." }
          ]
        },
        {
          title: "Machines are past labor",
          body: [
            "Critics said the labor theory ignores the productivity of land and capital. Ricardo answered that tools and machines are <b>intermediate products of labor</b>: a loom is simply partly produced cloth.",
            "His stockings example adds up the labor of the cotton grower, the shipbuilders and sailors who carried the cotton, the spinner and weaver, and the engineer, smith, and carpenter who built the machinery.",
            "Nature helps for free. Air, heat, and water add to use value but nothing to exchange value."
          ],
          questions: [
            {
              type: "choice",
              prompt: "In Ricardo’s view, who contributes to the value of a piece of cloth?",
              options: ["The weaver and the workers who built the loom", "The weaver and the loom itself", "Only the weaver", "The landlord whose sheep grew the wool"],
              answer: 0,
              explain: "Later neoclassical economists would credit the loom; Ricardo credited the labor that made it."
            }
          ]
        },
        {
          title: "Profit compounds over time",
          body: [
            "Here’s the catch. A capitalist earns profit for the whole time money is tied up in production.",
            "Say $100 of wages is paid three years before the final year, and the rate of profit is 10% a year. Each year, profit is earned on the original $100 <i>plus</i> past profit still tied up: " + f("value next year = value × 1.10") + "."
          ],
          figure: (fig, reveal) =>
            (fig.innerHTML = C.compound([100, 110, 121, 133.1, 146.41], ["wages paid", "after year 1", "after year 2", "start of final yr", "in final price"], reveal)),
          revealFigure: true,
          questions: [
            { prompt: "Value after year 1?", answer: 110, prefix: "$", hint: "100 × 1.10", explain: "$110." },
            { prompt: "Value after year 2?", answer: 121, prefix: "$", hint: "110 × 1.10", explain: "$121." },
            { prompt: "Value at the start of the final year?", answer: 133.1, prefix: "$", dp: 2, hint: "121 × 1.10", explain: "$133.10." },
            { prompt: "Amount this labor adds to the final price?", answer: 146.41, prefix: "$", hint: "One more year of profit: 133.10 × 1.10", explain: "$146.41: $100 repays the wages and $46.41 is profit for having $100 tied up four years." }
          ]
        },
        {
          title: "Longer means pricier",
          body: ["The same $100 of wages, tied up for less time, earns less profit."],
          questions: [
            {
              prompt: "If the $100 were tied up for only two years, what would it be worth at the start of the final year?",
              answer: 110,
              prefix: "$",
              hint: "Only one year of profit before the final year.",
              explain: "$110, versus $133.10 for the longer process, with the same original labor."
            },
            {
              type: "choice",
              prompt: "So a good made with more capital per worker, or a longer production period, will have…",
              options: ["A higher price relative to the labor in it", "A lower price relative to its labor", "Exactly the price its labor implies", "No profit in its price"],
              answer: 0,
              explain: "Ricardo’s three special cases (fixed vs. circulating capital, durability, and how fast capital returns) are all this same effect."
            }
          ]
        }
      ],
      summary: [
        "For freely reproducible goods, value is regulated by the labor embodied in them. Scarcity matters only for rare, non-reproducible goods.",
        "Machines and tools are past labor; nature’s help is free and adds nothing to exchange value.",
        "Profit compounds over the time capital is tied up, so goods with more capital or longer production periods carry more profit in their price."
      ]
    },

    // =====================================================================
    {
      id: "prices",
      title: "Why Prices Drift from Labor",
      subtitle: "Tables 5.1 and 5.2: wages, profits, and relative prices",
      steps: [
        {
          title: "Two goods, the same labor",
          body: [
            "Figure 5.7 compares two ways of producing 100 units of a good.",
            "<b>x</b>: 100 units of present labor, plus 75 units of past labor in each of the four years before. <b>y</b>: 300 units of present labor, plus 50 units in each of the two years before."
          ],
          figure: C.laborBlocks(),
          questions: [
            { prompt: "Total labor embodied in 100 units of x?", answer: 400, unit: "labor units", hint: "100 + 4 × 75", explain: "100 + 300 = 400. Same as y: 300 + 2 × 50 = 400." },
            {
              type: "choice",
              prompt: "If prices were strictly proportional to labor, the price of x compared with y would be…",
              options: ["Equal", "Twice as high", "Half as high", "Impossible to say"],
              answer: 0,
              explain: "Same labor, same price, under the simple labor theory. Now let’s add profit."
            }
          ]
        },
        {
          title: "Price of x at a $1 wage and 50% profit",
          body: [
            "The textbook builds each price in steps:",
            "A. Labor cost " + f("= present labor × wage") + "<br>B. Machinery " + f("= past labor × wage, compounded each year") + "<br>C. Profit " + f("= r × (A + B)") + "<br>D. Total " + f("= A + B + C") + " and E. Price " + f("= D ÷ 100"),
            "For x, B = 75 × $1 × (1.5 + 1.5² + 1.5³ + 1.5⁴) = 75 × (1.5 + 2.25 + 3.375 + 5.0625)."
          ],
          questions: [
            { prompt: "A. Labor cost of x?", answer: 100, prefix: "$", hint: "100 labor units × $1", explain: "$100." },
            { prompt: "B. Cost of machinery (compounded past labor)?", answer: 914.06, prefix: "$", tol: 0.1, hint: "The factors add up to 12.1875. Multiply by 75.", explain: "75 × 12.1875 = $914.06 (the textbook shows 914.08 from rounding)." },
            { prompt: "C. Profit cost?", answer: 507.03, prefix: "$", tol: 0.1, hint: "0.5 × (100 + 914.06)", explain: "0.5 × 1,014.06 = $507.03." },
            { prompt: "E. Price per unit of x?", answer: 15.21, prefix: "$", tol: 0.02, hint: "(A + B + C) ÷ 100", explain: "$1,521.09 ÷ 100 = $15.21." }
          ]
        },
        {
          title: "Now price y",
          body: [
            "y has 300 units of present labor and 50 units of past labor in each of two earlier years: B = 50 × (1.5 + 2.25)."
          ],
          questions: [
            { prompt: "B. Cost of machinery for y?", answer: 187.5, prefix: "$", dp: 2, hint: "50 × 3.75", explain: "$187.50." },
            { prompt: "E. Price per unit of y?", answer: 7.31, prefix: "$", tol: 0.02, hint: "A = 300, C = 0.5 × (300 + 187.50). Add and divide by 100.", explain: "(300 + 187.50 + 243.75) ÷ 100 = $7.31." },
            { prompt: "Price ratio of x to y?", answer: 2.08, tol: 0.02, hint: "15.21 ÷ 7.31", explain: "About 2.08: more than double, though both embody 400 units of labor. The gap is entirely the extra profit compounded into x." }
          ]
        },
        {
          title: "Wages double, profit falls to 10%",
          body: [
            "With the same techniques and the same output, a higher wage can only come out of profit. Suppose the wage rises to $2 and the rate of profit falls to 10%.",
            "Compounding factors at 10%: 1.1, 1.21, 1.331, 1.4641."
          ],
          questions: [
            { prompt: "New price per unit of x?", answer: 10.62, prefix: "$", tol: 0.02, hint: "A = 200, B = 150 × 5.1051, C = 0.1 × (A + B).", explain: "(200 + 765.77 + 96.58) ÷ 100 = $10.62." },
            { prompt: "New price per unit of y?", answer: 9.14, prefix: "$", tol: 0.02, hint: "A = 600, B = 100 × 2.31, C = 0.1 × (A + B).", explain: "(600 + 231 + 83.10) ÷ 100 = $9.14." },
            {
              type: "choice",
              prompt: "What happened to the price of x when wages doubled?",
              options: ["It fell, from $15.21 to $10.62", "It doubled", "It rose a little", "It stayed the same"],
              answer: 0,
              explain: "That’s why Ricardo rejected Smith’s claim that higher wages raise all prices. The fall in profit lowers the price of capital-heavy goods."
            }
          ]
        },
        {
          title: "Lab: move wages and profits yourself",
          body: [
            "Drag the sliders or use the buttons. The table recomputes Tables 5.1 and 5.2 for any wage and profit rate you choose."
          ],
          figure: priceLab,
          questions: [
            {
              type: "choice",
              prompt: "Click “No profit at all.” What is the price ratio of x to y?",
              options: ["1.00: prices match labor exactly", "2.08", "0.50", "It depends on the wage"],
              answer: 0,
              explain: "With zero profit, only labor counts, and both embody 400 units."
            },
            {
              type: "choice",
              prompt: "As long as profit is positive, the good with more capital per worker always has…",
              options: ["A higher price", "A lower price", "The same price"],
              answer: 0,
              explain: "Ricardo’s first rule: price ratios diverge from labor ratios in the same direction as capital per worker."
            },
            {
              type: "choice",
              prompt: "The higher the rate of profit, the gap between price ratios and labor ratios gets…",
              options: ["Larger", "Smaller", "No different"],
              answer: 0,
              explain: "Ricardo’s second rule. Try sliding profit from 0% to 60%."
            }
          ]
        },
        {
          title: "The invariable measure of value",
          body: [
            "Goods made with the <b>socially average</b> mix of capital and labor have prices proportional to their labor no matter how wages and profits change. Goods with more capital than average fall in price as wages rise; goods with less capital rise.",
            "Ricardo wanted such an average good as an “invariable measure of value” to measure total output and the rate of profit. He never found one he could defend."
          ],
          questions: [
            {
              type: "choice",
              prompt: "When wages rise, the price of a good made with MORE capital than average will…",
              options: ["Fall", "Rise", "Stay the same"],
              answer: 0,
              explain: "Like x in the tables."
            },
            {
              type: "choice",
              prompt: "What did Ricardo use, provisionally, as his measure of value?",
              options: ["Gold", "Corn", "Hours of labor", "Silver coins"],
              answer: 0,
              explain: "He took gold provisionally, knowing it wasn’t truly invariable."
            }
          ]
        }
      ],
      summary: [
        "Price = labor cost + compounded cost of past labor (machinery) + profit on both.",
        "With positive profit, goods with more capital per worker have higher prices than their labor alone implies.",
        "Higher wages mean lower profit, which can lower the price of capital-heavy goods. That’s why Ricardo rejected Smith’s view that higher wages raise all prices.",
        "Ricardo thought these deviations were small, and wanted an invariable measure of value, which he never found."
      ]
    },

    // =====================================================================
    {
      id: "trade",
      title: "Comparative Advantage",
      subtitle: "England, Portugal, cloth and wine (Table 5.3)",
      steps: [
        {
          title: "Ricardo’s example",
          body: [
            "Ricardo was the first economist to argue consistently that free trade can benefit two countries even when one is better at producing <i>everything</i>.",
            "Here are the hours needed to make one unit of each good:"
          ],
          figure: tradeTable([100, 120], [90, 80]),
          questions: [
            {
              type: "choice",
              prompt: "Which country has an absolute advantage in both goods?",
              options: ["Portugal", "England", "Neither", "Each has one"],
              answer: 0,
              explain: "Portugal needs fewer hours for both cloth (90 vs. 100) and wine (80 vs. 120)."
            }
          ]
        },
        {
          title: "Relative prices",
          body: [
            "If prices are proportional to labor, then within each country " + f("price of wine ÷ price of cloth = wine hours ÷ cloth hours") + "."
          ],
          figure: tradeTable([100, 120], [90, 80]),
          questions: [
            { prompt: "In England, wine costs how many units of cloth?", answer: 1.2, dp: 2, tol: 0.01, hint: "120 ÷ 100", explain: "1.20." },
            { prompt: "In Portugal, wine costs how many units of cloth?", answer: 0.89, tol: 0.015, hint: "80 ÷ 90", explain: "0.89 (the textbook rounds down to 0.88). Wine is relatively cheap in Portugal." },
            {
              type: "choice",
              prompt: "So each country has a comparative advantage in…",
              options: ["Portugal: wine; England: cloth", "Portugal: cloth; England: wine", "Portugal: both", "Neither"],
              answer: 0,
              explain: "England uses absolutely more labor for cloth, but relatively less."
            }
          ]
        },
        {
          title: "Make it or trade for it?",
          body: [
            "Portugal has been making only wine and now wants cloth. It can move workers into cloth, or trade wine for English cloth."
          ],
          questions: [
            { prompt: "To make 1 unit of cloth itself, how much wine does Portugal give up?", answer: 1.125, tol: 0.01, dp: 3, hint: "90 hours of cloth ÷ 80 hours per wine", explain: "1.125 wine (the textbook says 1.12)." },
            { prompt: "Trading at England’s price ratio, how much wine does Portugal give up per unit of cloth?", answer: 0.83, tol: 0.01, hint: "100 ÷ 120", explain: "Only 0.83 wine. Trading beats making it." }
          ]
        },
        {
          title: "Count the gains",
          body: [
            "Before trade, each country makes 1 cloth and 1 wine. England uses 100 + 120 = 220 hours; Portugal uses 90 + 80 = 170 hours.",
            "Now each country puts all its hours into its comparative advantage."
          ],
          figure: (fig, reveal) => (fig.innerHTML = C.tradeBars([2, 2], [2.2, 2.125], reveal)),
          revealFigure: true,
          questions: [
            { prompt: "England puts all 220 hours into cloth. How much cloth?", answer: 2.2, dp: 1, tol: 0.01, hint: "220 ÷ 100", explain: "2.2 units of cloth." },
            { prompt: "Portugal puts all 170 hours into wine. How much wine?", answer: 2.125, dp: 3, tol: 0.01, hint: "170 ÷ 80", explain: "2.125 units of wine." },
            {
              type: "choice",
              prompt: "Trading one for one, how do they end up?",
              options: [
                "England: 1.2 cloth + 1 wine; Portugal: 1 cloth + 1.125 wine. Both are better off",
                "England gains and Portugal loses",
                "Portugal gains and England loses",
                "Nobody gains"
              ],
              answer: 0,
              explain: "Same labor, more of both goods. Ricardo said free trade increases “the sum of enjoyments.”"
            }
          ]
        },
        () => {
          let e, p;
          do {
            e = [LAB.pick(60, 140, 10), LAB.pick(60, 140, 10)];
            p = [LAB.pick(60, 140, 10), LAB.pick(60, 140, 10)];
          } while (Math.abs(e[1] / e[0] - p[1] / p[0]) < 0.08);
          const eRatio = e[1] / e[0];
          const englandCloth = eRatio > p[1] / p[0];
          return {
            title: "Your turn: new numbers",
            regen: true,
            body: ["Here’s a new pair of countries. Work out who should specialize in what. Press <b>↻ New numbers</b> for another set."],
            figure: tradeTable(e, p),
            questions: [
              { prompt: "In England, wine costs how many units of cloth?", answer: +eRatio.toFixed(2), tol: 0.015, hint: e[1] + " ÷ " + e[0], explain: e[1] + " ÷ " + e[0] + " = " + LAB.fmt(eRatio) + "." },
              { prompt: "In Portugal, wine costs how many units of cloth?", answer: +(p[1] / p[0]).toFixed(2), tol: 0.015, hint: p[1] + " ÷ " + p[0], explain: p[1] + " ÷ " + p[0] + " = " + LAB.fmt(p[1] / p[0]) + "." },
              {
                type: "choice",
                prompt: "Which good should England specialize in?",
                options: [englandCloth ? "Cloth" : "Wine", englandCloth ? "Wine" : "Cloth"],
                answer: 0,
                hint: "Wine is relatively cheaper in the country with the lower wine-to-cloth ratio.",
                explain: englandCloth
                  ? "Wine is relatively dearer in England (" + LAB.fmt(eRatio) + " vs. " + LAB.fmt(p[1] / p[0]) + "), so England makes cloth and Portugal makes wine."
                  : "Wine is relatively cheaper in England (" + LAB.fmt(eRatio) + " vs. " + LAB.fmt(p[1] / p[0]) + "), so England makes wine and Portugal makes cloth."
              }
            ]
          };
        },
        {
          title: "A critique",
          body: [
            "The textbook points out that “the sum of enjoyments” treats the wants of whoever has purchasing power as society’s welfare. If only landlords and capitalists drink wine while workers lack warm clothing, more wine imports may not help workers at all.",
            "Ricardo also admitted that a mother country could gain by regulating trade with its colonies, at the colony’s expense. Once power isn’t taken as given, trade can mean conflict rather than harmony."
          ],
          questions: [
            {
              type: "choice",
              prompt: "What is the textbook’s main critique of Ricardo’s case for free trade?",
              options: [
                "Its gains go to those with purchasing power, not necessarily to workers",
                "The arithmetic of comparative advantage is wrong",
                "Ricardo actually opposed free trade",
                "Portugal should have made cloth"
              ],
              answer: 0,
              explain: "The labor-theory side of Ricardo stresses class conflict; the “sum of enjoyments” side stresses harmony. His writing contains both."
            }
          ]
        }
      ],
      summary: [
        "Absolute advantage means using less labor; comparative advantage means a lower relative labor cost.",
        "Each country gains by specializing in its comparative advantage and trading at a ratio between the two countries’ ratios.",
        "In Ricardo’s example, the same labor yields 2.2 cloth and 2.125 wine instead of 2 and 2.",
        "Comparative advantage was another link in Ricardo’s attack on the Corn Laws, but his “sum of enjoyments” overlooks who gets the gains."
      ]
    },

    // =====================================================================
    {
      id: "review",
      title: "Final Review",
      subtitle: "Gluts, machinery, and the big picture",
      steps: [
        {
          title: "Gluts and Say’s law",
          body: [
            "Malthus blamed periodic gluts on too little demand. Ricardo disagreed, using an argument like J.B. Say’s: people produce only to consume or to buy something else, and money is just the medium of exchange."
          ],
          questions: [
            {
              type: "choice",
              prompt: "Why did Ricardo think a general glut was impossible?",
              options: [
                "Production creates its own demand: everyone sells in order to buy, and no one wants to hoard money",
                "The government would always buy the surplus",
                "Landlords spend enough to absorb everything",
                "Wages were always high enough"
              ],
              answer: 0,
              explain: "Too much of one good is possible, he said, but not of all goods at once."
            },
            {
              type: "choice",
              prompt: "How did Ricardo explain the depressed years after the Napoleonic Wars?",
              options: [
                "As temporary adjustments while capital moved from one employment to another",
                "As a general glut of all goods",
                "As the arrival of the stationary state",
                "As the result of free trade"
              ],
              answer: 0,
              explain: "He saw them as temporary reverses after the abnormal supply and demand of the war years."
            }
          ]
        },
        {
          title: "On Machinery",
          body: [
            "In the third edition of the <em>Principles</em>, Ricardo added Chapter 31, “On Machinery,” a major concession after his debates with Malthus."
          ],
          questions: [
            {
              type: "choice",
              prompt: "What did Ricardo conclude about labor-saving machinery?",
              options: [
                "It can harm workers: their fear of machinery is not founded on prejudice and error",
                "It always benefits every class equally",
                "It should be banned",
                "It only affects landlords"
              ],
              answer: 0,
              explain: "Society’s net income (profit and rent) could rise while gross income, including wages, falls, leaving workers unemployed."
            },
            {
              type: "choice",
              prompt: "Even so, what did Ricardo still believe about wages?",
              options: [
                "They should be left to free competition in the market, not set by the legislature",
                "They should be set by Parliament",
                "Machines should pay workers directly",
                "They should be tied to rent"
              ],
              answer: 0,
              explain: "He hoped his chapter wouldn’t discourage machinery. His sympathy stayed with the capitalist class."
            }
          ]
        },
        {
          title: "Classes and conflict",
          body: ["Ricardo’s <em>Principles</em> is full of class conflict, yet he also defended free trade as harmonizing everyone’s interests."],
          questions: [
            {
              type: "choice",
              prompt: "In the struggle between capitalists and landlords, whose interests did Ricardo defend as matching society’s?",
              options: ["The capitalists’", "The landlords’", "Neither", "Both equally"],
              answer: 0,
              explain: "He saw the landlord’s interest as always opposed to that of the consumer and the manufacturer."
            },
            {
              type: "choice",
              prompt: "Ricardo wrote that rent is…",
              options: [
                "Never a new creation of revenue, but always part of a revenue already created",
                "The reward for the landlord’s hard work",
                "A cost that sets the price of corn",
                "A gift paid by nature"
              ],
              answer: 0,
              explain: "Rent is a residual determined by price, not a component of cost."
            }
          ]
        },
        {
          title: "The big picture",
          body: ["Last one."],
          questions: [
            {
              type: "choice",
              prompt: "Why does the textbook call Ricardo’s view of capitalism “ahistorical”?",
              options: [
                "He treated capitalism’s property and class relations as natural and eternal",
                "He ignored the Corn Laws",
                "He never used numerical examples",
                "He thought capitalism would soon end"
              ],
              answer: 0,
              explain: "Unlike Smith’s theory of stages, Ricardo saw capitalist relations as unchanging, so he didn’t consider policies that would change the distribution of wealth or power."
            }
          ]
        }
      ],
      summary: [
        "Ricardo accepted a Say’s-law argument that general gluts are impossible, and saw depressions as temporary.",
        "In “On Machinery,” he conceded that labor-saving machines can hurt workers, but still opposed regulating wages.",
        "He defended capitalists against landlords and saw rent as a transfer out of revenue already created.",
        "His labor theory stresses conflict between classes, while his free-trade arguments stress harmony."
      ]
    }
  ];
})();
