
(function () {
  var NS = "http://www.w3.org/2000/svg";
  function el(tag, attrs, parent, text) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (text !== undefined) e.textContent = text;
    if (parent) parent.appendChild(e);
    return e;
  }
  var C = { trinity: "var(--s-trinity)", flow: "var(--s-flow)", chip: "var(--s-chip)", macro: "var(--s-macro)", diff: "var(--s-diff)" };
  var NAMES = { trinity: "Trinity", flow: "FlowPlace", chip: "ChipDiffusion", macro: "MacroDiff+", diff: "DiffPlace" };
  function logScale(lo, hi, a, b) { return function (v) { return a + (Math.log(v) - Math.log(lo)) / (Math.log(hi) - Math.log(lo)) * (b - a); }; }

  // physics term reductions
  (function () {
    var svg = document.getElementById("chart-terms"), rows = [["boundary distance", 69], ["multi-instance spread", 60], ["soft cost", 25], ["cluster gap", 14], ["overlap", 7]];
    var L = 150, W = 460, R = 50, top = 14, bh = 26, gap = 14, max = 80;
    var fx = function (v) { return L + v / max * (W - L - R); };
    [0, 20, 40, 60, 80].forEach(function (v) { el("line", { x1: fx(v), x2: fx(v), y1: top - 4, y2: top + rows.length * (bh + gap) - gap + 4, "class": "gl" }, svg); el("text", { x: fx(v), y: top + rows.length * (bh + gap) + 12, "text-anchor": "middle" }, svg, v + "%"); });
    rows.forEach(function (r, i) {
      var y = top + i * (bh + gap);
      el("text", { x: L - 10, y: y + bh / 2 + 4, "text-anchor": "end", "class": "lbl" }, svg, r[0]);
      el("rect", { x: fx(0), y: y, width: fx(r[1]) - fx(0), height: bh, rx: 4, fill: "var(--s-trinity)" }, svg);
      el("text", { x: fx(r[1]) + 6, y: y + bh / 2 + 4, "class": "lbl" }, svg, "−" + r[1] + "%");
    });
  })();

  // raw soft cost against NFE
  (function () {
    var svg = document.getElementById("chart-nfe"), W = 460, H = 250, L = 46, R = 104, T = 12, B = 34;
    var xs = [1, 4, 8, 32], fx = function (i) { return L + i * (W - L - R) / 3; }, fy = logScale(1.3, 160, H - B, T);
    [1.5, 3, 10, 30, 100].forEach(function (v) { el("line", { x1: L, x2: W - R, y1: fy(v), y2: fy(v), "class": "gl" }, svg); el("text", { x: L - 6, y: fy(v) + 4, "text-anchor": "end" }, svg, v); });
    xs.forEach(function (x, i) { el("text", { x: fx(i), y: H - B + 16, "text-anchor": "middle" }, svg, x); });
    el("text", { x: (L + W - R) / 2, y: H - 2, "text-anchor": "middle" }, svg, "sampling steps (network calls)");
    var S = [["trinity", [1.68, 1.63, 1.60, 1.51]], ["flow", [11.5, 5.09, 3.82, 2.46]], ["chip", [152, 11.9, 3.83, 2.80]], ["macro", [150, 71.7, 9.89, 3.85]], ["diff", [150, 99.5, 14.6, 6.23]]];
    var ends = [];
    S.forEach(function (s) {
      el("path", { d: s[1].map(function (v, i) { return (i ? "L" : "M") + fx(i) + " " + fy(v); }).join(" "), fill: "none", stroke: C[s[0]], "stroke-width": s[0] === "trinity" ? 3 : 2 }, svg);
      s[1].forEach(function (v, i) { var c = el("circle", { cx: fx(i), cy: fy(v), r: s[0] === "trinity" ? 4.5 : 3.5, fill: C[s[0]], stroke: "var(--surface)", "stroke-width": 1.5 }, svg); el("title", {}, c, NAMES[s[0]] + ", " + xs[i] + " steps: " + v); });
      ends.push({ k: s[0], y: fy(s[1][3]) });
    });
    ends.sort(function (a, b) { return a.y - b.y; });
    for (var i = 1; i < ends.length; i++) if (ends[i].y - ends[i - 1].y < 14) ends[i].y = ends[i - 1].y + 14;
    ends.forEach(function (e) { el("text", { x: W - R + 8, y: e.y + 4, "class": "lbl", style: "fill:" + C[e.k] }, svg, NAMES[e.k]); });
  })();

  // our refiner against own loops
  (function () {
    var svg = document.getElementById("chart-ref"), W = 900, H = 340, L = 50, R = 150, T = 14, B = 40;
    var xmax = 6000, fx = function (s) { return L + Math.log(1 + s) / Math.log(1 + xmax) * (W - L - R); }, fy = logScale(1.0, 7, H - B, T);
    [1, 1.5, 2, 3, 5].forEach(function (v) { el("line", { x1: L, x2: W - R, y1: fy(v), y2: fy(v), "class": "gl" }, svg); el("text", { x: L - 6, y: fy(v) + 4, "text-anchor": "end" }, svg, v); });
    [0, 10, 25, 100, 400, 500, 5000].forEach(function (s) { el("line", { x1: fx(s), x2: fx(s), y1: T, y2: H - B, "class": "gl" }, svg); el("text", { x: fx(s), y: H - B + 16, "text-anchor": "middle" }, svg, s); });
    el("text", { x: (L + W - R) / 2, y: H - 4, "text-anchor": "middle" }, svg, "our refiner steps  |  own loop iterations");
    var steps = [0, 25, 100, 400];
    var S = [["trinity", [1.51, 1.22, 1.11, 1.06]], ["flow", [2.46, 1.42, 1.22, 1.11]], ["chip", [2.80, 1.52, 1.27, 1.13]], ["macro", [3.85, 1.71, 1.35, 1.17]], ["diff", [6.23, 2.61, 1.57, 1.20]]];
    S.forEach(function (s) {
      el("path", { d: s[1].map(function (v, i) { return (i ? "L" : "M") + fx(steps[i]) + " " + fy(v); }).join(" "), fill: "none", stroke: C[s[0]], "stroke-width": s[0] === "trinity" ? 3 : 2, "stroke-dasharray": s[0] === "trinity" ? "" : "6 4" }, svg);
      s[1].forEach(function (v, i) { var c = el("circle", { cx: fx(steps[i]), cy: fy(v), r: s[0] === "trinity" ? 4.5 : 3.5, fill: C[s[0]], stroke: "var(--surface)", "stroke-width": 1.5 }, svg); el("title", {}, c, NAMES[s[0]] + " under our refiner, " + steps[i] + " steps: " + v); });
    });
    // own loops: released iteration counts and refined soft cost (Table 3)
    [["chip", 5000, 2.05], ["macro", 500, 1.66], ["diff", 500, 3.91]].forEach(function (o) {
      var x = fx(o[1]), y = fy(o[2]);
      var t = el("path", { d: "M" + x + " " + (y - 8) + " L" + (x + 7) + " " + (y + 5) + " L" + (x - 7) + " " + (y + 5) + " Z", fill: C[o[0]], stroke: "var(--surface)", "stroke-width": 1.5 }, svg);
      el("title", {}, t, NAMES[o[0]] + "'s own loop, " + o[1] + " iterations: " + o[2]);
      el("text", { x: x + 11, y: y + 4, "class": "lbl", style: "fill:" + C[o[0]] }, svg, NAMES[o[0]] + " own loop " + o[2]);
    });
    var ends = S.map(function (s) { return { k: s[0], y: fy(s[1][3]) }; }).sort(function (a, b) { return a.y - b.y; });
    for (var i = 1; i < ends.length; i++) if (ends[i].y - ends[i - 1].y < 14) ends[i].y = ends[i - 1].y + 14;
    var lx = fx(400) + 8;
    ends.forEach(function (e) { el("text", { x: lx, y: e.y + 4 + (e.k === "trinity" ? 0 : 0), "class": "lbl", style: "fill:" + C[e.k] }, svg, (e.k === "trinity" ? "Trinity" : NAMES[e.k] + " + ours")); });
  })();

  // hard cost: own loop against our refiner
  (function () {
    var svg = document.getElementById("chart-loop"), W = 460, L = 110, R = 30, top = 22, bh = 38;
    var rows = [["flow", 1.567, 1.296, "no loop"], ["chip", 1.521, 1.322], ["diff", 1.537, 1.355], ["macro", 1.546, 1.352], ["trinity", null, 1.234]];
    var lo = 1.2, hi = 1.6, fx = function (v) { return L + (v - lo) / (hi - lo) * (W - L - R); };
    [1.2, 1.3, 1.4, 1.5, 1.6].forEach(function (v) { el("line", { x1: fx(v), x2: fx(v), y1: top - 10, y2: top + rows.length * bh - 14, "class": "gl" }, svg); el("text", { x: fx(v), y: top + rows.length * bh + 2, "text-anchor": "middle" }, svg, v.toFixed(1)); });
    el("text", { x: (L + W - R) / 2, y: top + rows.length * bh + 20, "text-anchor": "middle" }, svg, "hard cost (lower is better)  ○ own loop  ● our refiner");
    rows.forEach(function (r, i) {
      var y = top + i * bh;
      el("text", { x: L - 10, y: y + 4, "text-anchor": "end", "class": "lbl", style: "fill:" + C[r[0]] }, svg, NAMES[r[0]]);
      if (r[1] !== null) {
        el("line", { x1: fx(r[1]), x2: fx(r[2]), y1: y, y2: y, stroke: C[r[0]], "stroke-width": 2, "stroke-opacity": 0.5 }, svg);
        el("circle", { cx: fx(r[1]), cy: y, r: 6, fill: "var(--surface)", stroke: C[r[0]], "stroke-width": 2 }, svg);
        el("text", { x: fx(r[1]) + 10, y: y + 4 }, svg, r[1].toFixed(3) + (r[3] ? " (" + r[3] + ")" : ""));
      }
      el("circle", { cx: fx(r[2]), cy: y, r: 6.5, fill: C[r[0]], stroke: "var(--surface)", "stroke-width": 1.5 }, svg);
      el("text", { x: fx(r[2]) - 10, y: y + 4, "text-anchor": "end" }, svg, r[2].toFixed(3));
    });
  })();

  // trained toy: equal disks in a square outline, the data-only model against the physics model;
  // every frame is a recorded Euler state of the trained models (scratchpad toy/train_disks.py)
  function initToy(T) {
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var RHO = T.rho, K = T.k, VIEW = 1.35, FLOW_MS = 2400, HOLD_MS = 2200, TOL = 0.02 * RHO;
    var state = { n: 14, nfe: 32, lam: "30", lams: ["1", "3", "30"], start: 0 };
    // one orange shade per weight, light to dark (the paper's Trinity family)
    var SHADE = { "0.1": "#fdd0a2", "0.3": "#fdae6b", "1": "#fd8d3c", "3": "#f58518", "10": "#d94801", "30": "#a63603", "100": "#7f2704" };
    function half(n) { return T.side * Math.sqrt(n) / 2; }
    function tok(name) { return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); }
    function pct(v) { return Math.round(100 * v) + "%"; }
    var cache = {};
    function met(model, nfe) { return model === "physics" ? T.metrics[nfe].physics[state.lam] : T.metrics[nfe].data; }
    function frames(model, n, nfe) {
      var src = model === "physics" ? T.traj.physics[state.lam] : T.traj.data, key = model + "/" + state.lam + "/" + n + "/" + nfe;
      if (!cache[key]) {
        var s = atob(src[n + "/" + nfe]), a = new Float32Array(s.length / 2);
        for (var i = 0; i < a.length; i++) {
          var v = s.charCodeAt(2 * i) | (s.charCodeAt(2 * i + 1) << 8);
          a[i] = (v > 32767 ? v - 65536 : v) / T.scale;
        }
        cache[key] = a; // (nfe + 1, K, n, 2)
      }
      return cache[key];
    }
    function bad(P, n) {
      var h = half(n) - RHO, out = [];
      for (var i = 0; i < n; i++) out.push(Math.abs(P[i][0]) - h > TOL || Math.abs(P[i][1]) - h > TOL);
      for (i = 0; i < n; i++) for (var j = i + 1; j < n; j++) {
        if (2 * RHO - Math.hypot(P[i][0] - P[j][0], P[i][1] - P[j][1]) > TOL) { out[i] = true; out[j] = true; }
      }
      return out;
    }
    function drawCell(ctx, cx, cy, size, view, P, n, color, judged) {
      var sc = size / (2 * view), h = half(n) * sc;
      ctx.save();
      ctx.beginPath(); ctx.rect(cx - size / 2, cy - size / 2, size, size); ctx.clip();
      ctx.setLineDash([8, 6]); ctx.lineWidth = 2; ctx.strokeStyle = tok("--muted");
      ctx.strokeRect(cx - h, cy - h, 2 * h, 2 * h); ctx.setLineDash([]);
      var b = judged ? bad(P, n) : null, ok = true;
      P.forEach(function (p, i) {
        var c = b && b[i] ? tok("--bad") : color;
        if (b && b[i]) ok = false;
        ctx.beginPath(); ctx.arc(cx + p[0] * sc, cy - p[1] * sc, RHO * sc, 0, 2 * Math.PI);
        ctx.globalAlpha = 0.28; ctx.fillStyle = c; ctx.fill();
        ctx.globalAlpha = 1; ctx.lineWidth = 2; ctx.strokeStyle = c; ctx.stroke();
      });
      ctx.restore();
      return ok;
    }
    function render(id, model, p) {
      var cv = document.getElementById(id), ctx = cv.getContext("2d"), W = cv.width, H = cv.height;
      var n = state.n, nfe = state.nfe, A = frames(model, n, nfe), cols = 3, cell = W / cols;
      var f = Math.min(p, 1) * nfe, i0 = Math.min(Math.floor(f), nfe - 1), fr = f - i0, done = p >= 1;
      var color = model === "physics" ? SHADE[state.lam] : tok("--s-plain"), legal = 0;
      ctx.clearRect(0, 0, W, H);
      for (var k = 0; k < K; k++) {
        var P = [];
        for (var i = 0; i < n; i++) {
          var a = ((i0 * K + k) * n + i) * 2, b = (((i0 + 1) * K + k) * n + i) * 2;
          P.push([A[a] + fr * (A[b] - A[a]), A[a + 1] + fr * (A[b + 1] - A[a + 1])]);
        }
        var cx = (k % cols + 0.5) * cell, cy = (Math.floor(k / cols) + 0.5) * cell;
        if (drawCell(ctx, cx, cy, cell - 12, VIEW * half(n), P, n, color, done)) legal++;
      }
      ctx.fillStyle = tok("--muted"); ctx.font = "22px JetBrains Mono, monospace";
      ctx.fillText("t = " + (1 - Math.min(p, 1)).toFixed(2), 14, 30);
      var m = met(model, nfe);
      document.getElementById(id + "-r").textContent = "legal in 1,000 draws: " + pct(m.legal[n - 2]) +
        " · overlap per disk: " + m.overlap[n - 2].toFixed(3) + " radii · shown: " + (done ? legal : "–") + " of " + K + " legal";
    }
    function examples() {
      var cv = document.getElementById("toy-ex"), ctx = cv.getContext("2d"), W = cv.width, H = cv.height;
      var ns = [4, 6, 8, 10], cell = W / ns.length, view = half(10) * 1.3;
      ctx.clearRect(0, 0, W, H);
      ns.forEach(function (n, j) {
        drawCell(ctx, (j + 0.5) * cell, H / 2, Math.min(cell, H) - 16, view, T.examples[n], n, tok("--fg-soft"), false);
        ctx.fillStyle = tok("--muted"); ctx.font = "24px JetBrains Mono, monospace";
        ctx.fillText(n + " disks", j * cell + 18, 34);
      });
    }
    var NS = "http://www.w3.org/2000/svg";
    function el(tag, attrs, parent, text) {
      var e = document.createElementNS(NS, tag);
      for (var k in attrs) e.setAttribute(k, attrs[k]);
      if (text !== undefined) e.textContent = text;
      parent.appendChild(e);
      return e;
    }
    function chart() {
      var svg = document.getElementById("toy-chart"), L = 48, R = 700, Tp = 50, B = 242;
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      function fx(n) { return L + (n - 2) / 18 * (R - L); }
      function fy(v) { return B - v * (B - Tp); }
      el("rect", { x: fx(T.n_data[0]), y: Tp, width: fx(T.n_data[1]) - fx(T.n_data[0]), height: B - Tp, fill: "var(--aquamarine-s)", "fill-opacity": 0.14 }, svg);
      el("text", { x: (fx(T.n_data[0]) + fx(T.n_data[1])) / 2, y: Tp - 10, "text-anchor": "middle" }, svg, "training data (4 to 10 disks)");
      [0, 0.25, 0.5, 0.75, 1].forEach(function (v) {
        el("line", { x1: L, x2: R, y1: fy(v), y2: fy(v), "class": "gl" }, svg);
        el("text", { x: L - 8, y: fy(v) + 4, "text-anchor": "end" }, svg, pct(v));
      });
      for (var n = 2; n <= 20; n += 2) el("text", { x: fx(n), y: B + 18, "text-anchor": "middle" }, svg, n);
      el("text", { x: (L + R) / 2, y: B + 36, "text-anchor": "middle" }, svg, "number of disks");
      el("line", { x1: fx(state.n), x2: fx(state.n), y1: Tp, y2: B, stroke: "var(--muted)", "stroke-dasharray": "4 4" }, svg);
      var series = [{ v: T.metrics[state.nfe].data.legal, c: "var(--s-plain)", t: "data only", w: 2.5 }];
      T.lams.forEach(function (lam) {
        if (state.lams.indexOf(lam) < 0) return;
        series.push({ v: T.metrics[state.nfe].physics[lam].legal, c: SHADE[lam], t: "λ = " + lam, w: lam === state.lam ? 3.5 : 2.2 });
      });
      series.forEach(function (s) {
        el("polyline", { points: s.v.map(function (y, i) { return fx(i + 2) + "," + fy(y); }).join(" "), fill: "none", stroke: s.c,
          "stroke-width": s.w, "stroke-linejoin": "round" }, svg);
        s.v.forEach(function (y, i) { el("circle", { cx: fx(i + 2), cy: fy(y), r: s.w > 3 ? 3.5 : 2.6, fill: s.c }, svg); });
      });
      // legend above the plot, one swatch per drawn series
      var lx = L;
      series.forEach(function (s) {
        el("line", { x1: lx, x2: lx + 22, y1: 10, y2: 10, stroke: s.c, "stroke-width": s.w }, svg);
        var t = el("text", { x: lx + 28, y: 14, "class": "lbl" }, svg, s.t);
        lx += 28 + Math.max(58, 8.2 * s.t.length) + 14;
      });
      document.getElementById("toy-chart-sub").textContent = "Share of 1,000 draws per size with no overlap or overhang, at " + state.nfe +
        (state.nfe === 1 ? " sampling step" : " sampling steps") + ". Dashed line: the size shown above.";
    }
    function text() {
      [["d", "data", 6], ["d", "data", 10], ["d", "data", 14], ["p", "physics", 6], ["p", "physics", 10], ["p", "physics", 14]].forEach(function (r) {
        document.getElementById("toy-txt-" + r[0] + r[2]).textContent = pct(met(r[1], 32).legal[r[2] - 2]);
      });
      document.getElementById("toy-txt-lam").textContent = state.lam;
      document.getElementById("toy-lam-h").textContent = "λ = " + state.lam;
    }
    var raf = 0, toyVisible = false;
    function loop(now) {
      if (!toyVisible || document.hidden) return;
      if (!state.start) state.start = now;
      var dt = now - state.start, p = dt / FLOW_MS;
      if (dt > FLOW_MS + HOLD_MS) { state.start = now; p = 0; }
      render("toy-d", "data", p); render("toy-p", "physics", p);
      raf = requestAnimationFrame(loop);
    }
    function restart() {
      cancelAnimationFrame(raf); state.start = 0; chart(); text();
      if (reduce) { render("toy-d", "data", 1); render("toy-p", "physics", 1); } else if (toyVisible && !document.hidden) raf = requestAnimationFrame(loop);
    }
    function group(attr, key) {
      var bs = document.querySelectorAll(".toy-ctl button[" + attr + "]");
      bs.forEach(function (b) { b.addEventListener("click", function () {
        bs.forEach(function (o) { o.setAttribute("aria-pressed", o === b ? "true" : "false"); });
        state[key] = parseInt(b.getAttribute(attr), 10); restart();
      }); });
    }
    group("data-n", "n"); group("data-nfe", "nfe");
    // the weights are a multiple choice: each button toggles its curve; the panels follow the weight
    // turned on last (or the largest still on), and at least one weight stays on
    var lb = document.querySelectorAll(".toy-ctl button[data-lam]");
    function paintLam() {
      lb.forEach(function (b) {
        var lam = b.getAttribute("data-lam"), on = state.lams.indexOf(lam) >= 0, i = T.lams.indexOf(lam);
        b.setAttribute("aria-pressed", on ? "true" : "false");
        b.style.background = on ? SHADE[lam] : ""; b.style.borderColor = on ? SHADE[lam] : "";
        b.style.color = on ? (i >= 4 ? "#FFFFFF" : "#1A1816") : "";
        b.style.outline = on && lam === state.lam ? "2px solid var(--fg)" : ""; b.style.outlineOffset = "1px";
      });
    }
    lb.forEach(function (b) { b.addEventListener("click", function () {
      var lam = b.getAttribute("data-lam"), k = state.lams.indexOf(lam);
      if (k < 0) { state.lams.push(lam); state.lam = lam; }
      else if (state.lams.length > 1) {
        state.lams.splice(k, 1);
        if (state.lam === lam) state.lam = state.lams.slice().sort(function (a, c) { return parseFloat(c) - parseFloat(a); })[0];
      }
      paintLam(); restart();
    }); });
    paintLam();
    document.getElementById("toy-replay").addEventListener("click", restart);
    examples(); restart();
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        toyVisible = entries[0].isIntersecting;
        if (toyVisible) restart(); else cancelAnimationFrame(raf);
      }).observe(document.querySelector('.toy'));
    } else { toyVisible = true; restart(); }
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) cancelAnimationFrame(raf); else if (toyVisible) restart();
    });
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', function (event) {
      reduce = event.matches; restart();
    });
    if (window.matchMedia) window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () { examples(); restart(); });
  }
  var toySection = document.querySelector('.toy').closest('section');
  var toyLoaded = false;
  function loadToy() {
    if (toyLoaded) return;
    toyLoaded = true;
    document.getElementById('toy-d-r').textContent = 'Loading recorded model outputs…';
    fetch('assets/toy-data.json').then(function (response) {
      if (!response.ok) throw new Error('Interactive data unavailable');
      return response.json();
    }).then(initToy).catch(function () {
      toyLoaded = false;
      document.getElementById('toy-d-r').textContent = 'Interactive example unavailable. Please see the paper for the recorded results.';
    });
  }
  if ('IntersectionObserver' in window) {
    var toyLoader = new IntersectionObserver(function (entries) {
      if (entries.some(function (entry) { return entry.isIntersecting; })) { loadToy(); toyLoader.disconnect(); }
    }, {rootMargin:'900px'});
    toyLoader.observe(toySection);
  } else loadToy();

  var btns = document.querySelectorAll(".cases button"), v = document.getElementById("vid-case");
  btns.forEach(function (b) { b.addEventListener("click", function () {
    btns.forEach(function (o) { o.setAttribute("aria-pressed", o === b ? "true" : "false"); });
    var n = b.getAttribute("data-case"), s = v.querySelectorAll("source");
    s[0].dataset.src = "assets/2026-trinity-n" + n + "-pipeline.av1.mp4"; s[1].dataset.src = "assets/2026-trinity-n" + n + "-pipeline.mp4";
    v.dataset.case = n;
    v.poster = "assets/2026-trinity-n" + n + "-poster.webp";
    s.forEach(function (source) { source.src = source.dataset.src; });
    v.load(); v.dataset.loaded = 'true';
    if (!window.matchMedia("(prefers-reduced-motion:reduce)").matches && !document.hidden && v.dataset.visible === 'true') v.play().catch(function () {});
  }); });
  ['copy-bib', 'copy-bib-top'].forEach(function (id) {
    document.getElementById(id).addEventListener('click', function (event) {
      event.preventDefault();
      var btn = this, pre = document.getElementById('bibtex'), label = btn.textContent;
      function done(message) {
        btn.textContent = message;
        document.getElementById('citation-status').textContent = message === 'Copied' ? 'BibTeX copied to clipboard.' : 'Citation selected for manual copying.';
        setTimeout(function () { btn.textContent = label; }, 2000);
      }
      function selectCitation() {
        pre.scrollIntoView({block:'center', behavior:'auto'});
        pre.focus({preventScroll:true});
        var range = document.createRange(); range.selectNodeContents(pre);
        var selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range);
        done('Selected');
      }
      if (navigator.clipboard && navigator.clipboard.writeText)
        navigator.clipboard.writeText(pre.textContent).then(function () {done('Copied');}, selectCitation);
      else selectCitation();
    });
  });
  var motion = window.matchMedia('(prefers-reduced-motion:reduce)');
  var videos = document.querySelectorAll('video');
  function activateVideo(video) {
    if (!video.dataset.loaded) {
      video.querySelectorAll('source').forEach(function (source) {source.src = source.dataset.src;});
      video.load(); video.dataset.loaded = 'true';
    }
    if (!motion.matches && !document.hidden && video.dataset.visible === 'true') video.play().catch(function () {});
  }
  if ('IntersectionObserver' in window) {
    var videoObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        entry.target.dataset.visible = entry.isIntersecting ? 'true' : 'false';
        if (entry.isIntersecting) activateVideo(entry.target); else entry.target.pause();
      });
    }, {threshold:.1});
    videos.forEach(function (video) {videoObserver.observe(video);});
  } else videos.forEach(function (video) {video.dataset.visible = 'true'; activateVideo(video);});
  document.addEventListener('visibilitychange', function () {
    videos.forEach(function (video) {if (document.hidden) video.pause(); else if (video.dataset.visible === 'true') activateVideo(video);});
  });
  motion.addEventListener('change', function () {
    videos.forEach(function (video) {if (motion.matches) video.pause(); else if (video.dataset.visible === 'true') activateVideo(video);});
  });
})();
