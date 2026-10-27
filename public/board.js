/* ============================================================
   board.js - Hiệu ứng bàn chơi "Đại Đoàn Kết"
   - Chữ BẮC / TRUNG / NAM là chữ HTML nằm đè lên ảnh nền (nen.webp đã xoá chữ)
   - Xe chạy qua vùng nào: chữ vùng đó CHỚP MÀU + vùng sáng nhẹ + xe phát sáng
   - Xe dừng: chỉ hiện tên vùng trúng (phóng to, phát sáng), vùng khác mờ đi, bắn pháo giấy
   Dùng:  Board.init(boardEl);  Board.update(gocDo, "run" | "stop" | "idle");
   ============================================================ */
(function () {
  /* Vị trí chữ (% theo bàn) + độ xoay: chỉnh ở đây nếu muốn dời chữ */
  var POS = {
    bac:   { x: 51.9, y: 14.4, rot: 0,   name: "BẮC",   col: "#ff4f9a" },
    trung: { x: 78.4, y: 70.4, rot: -52, name: "TRUNG", col: "#ff9a1f" },
    nam:   { x: 20.9, y: 68.5, rot: 52,  name: "NAM",   col: "#2fb4ff" }
  };
  /* Cung của mỗi vùng (độ, 0 = đỉnh, chiều kim đồng hồ) - khớp với src/game.js */
  var ARC = { bac: [-60, 60], trung: [60, 180], nam: [180, 300] };
  var INNER = 12, OUTER = 49; /* bán kính trong (trống đồng) / ngoài, tính theo % */

  var css = "" +
    ".bd-w{position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity .5s;background:var(--rc)}" +
    ".bd-w.on{opacity:.16;transition:opacity .15s}" +
    ".bd-w.dim{background:#06102a;opacity:.6}" +
    ".bd-w.win{opacity:.3;animation:bdPulse .9s ease-in-out infinite alternate}" +
    "@keyframes bdPulse{from{opacity:.08}to{opacity:.34}}" +
    ".bd-l{position:absolute;left:var(--x);top:var(--y);white-space:nowrap;pointer-events:none;font-weight:900;" +
    "letter-spacing:.08em;font-size:calc(var(--s,600px)*.05);color:#fff;--k:1;" +
    "transform:translate(-50%,-50%) rotate(var(--rot)) scale(var(--k));" +
    "-webkit-text-stroke:.6px rgba(8,40,95,.85);text-shadow:0 2px 4px rgba(0,25,70,.85);" +
    "transition:transform .55s cubic-bezier(.2,1.6,.4,1),opacity .5s}" +
    ".bd-l.on{animation:bdFlash .28s linear infinite}" +
    "@keyframes bdFlash{0%,100%{color:#fff}50%{color:var(--rc);text-shadow:0 0 10px var(--rc),0 0 22px var(--rc),0 2px 4px #0008}}" +
    ".bd-l.win{--k:1.6;color:var(--rc);-webkit-text-stroke:1.4px #fff;" +
    "text-shadow:0 0 12px #fff,0 0 26px var(--rc),0 0 42px var(--rc);animation:bdWin .8s ease-in-out infinite alternate}" +
    "@keyframes bdWin{from{filter:brightness(1)}to{filter:brightness(1.35)}}" +
    ".bd-l.off{opacity:0}" +
    "#board.bd-run #car{filter:drop-shadow(0 3px 4px #000a) drop-shadow(0 0 9px var(--rc))}" +
    ".bd-p{position:absolute;pointer-events:none;border-radius:2px;z-index:3}";

  function wedgeClip(r) {
    var a0 = ARC[r][0], a1 = ARC[r][1], p = [], i, t, n = 24;
    function pt(deg, rad) {
      var t = deg * Math.PI / 180;
      return (50 + rad * Math.sin(t)).toFixed(2) + "% " + (50 - rad * Math.cos(t)).toFixed(2) + "%";
    }
    for (i = 0; i <= n; i++) p.push(pt(a0 + (a1 - a0) * i / n, OUTER));
    for (i = n; i >= 0; i--) p.push(pt(a0 + (a1 - a0) * i / n, INNER));
    return "polygon(" + p.join(",") + ")";
  }

  function regionOf(a) {
    a = ((a % 360) + 360) % 360;
    return a >= 300 || a < 60 ? "bac" : a < 180 ? "trung" : "nam";
  }

  var B = null, W = {}, L = {}, key = "";

  function init(board) {
    if (!board || board.querySelector(".bd-l")) { B = board; return; }
    B = board;
    var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
    var car = board.querySelector("#car");
    Object.keys(POS).forEach(function (r) {
      var w = document.createElement("div");
      w.className = "bd-w"; w.style.clipPath = w.style.webkitClipPath = wedgeClip(r);
      w.style.setProperty("--rc", POS[r].col); W[r] = w;
      var l = document.createElement("div");
      l.className = "bd-l"; l.textContent = POS[r].name;
      l.style.setProperty("--x", POS[r].x + "%"); l.style.setProperty("--y", POS[r].y + "%");
      l.style.setProperty("--rot", POS[r].rot + "deg"); l.style.setProperty("--rc", POS[r].col); L[r] = l;
      board.insertBefore(w, car); board.insertBefore(l, car);
    });
  }

  function burst(r) {
    if (!B) return;
    var cols = [POS[r].col, "#fff", "#ffd400", "#ff4f4f"], i;
    for (i = 0; i < 30; i++) {
      var e = document.createElement("i"); e.className = "bd-p";
      var s = 5 + Math.random() * 7;
      e.style.cssText += "left:" + POS[r].x + "%;top:" + POS[r].y + "%;width:" + s + "px;height:" + s * 1.6 +
        "px;background:" + cols[i % cols.length];
      B.appendChild(e);
      var ang = Math.random() * 6.283, dist = 50 + Math.random() * 110;
      var dx = Math.cos(ang) * dist, dy = Math.sin(ang) * dist - 30;
      var an = e.animate([
        { transform: "translate(0,0) rotate(0)", opacity: 1 },
        { transform: "translate(" + dx + "px," + (dy + 70) + "px) rotate(" + (Math.random() * 720 - 360) + "deg)", opacity: 0 }
      ], { duration: 1100 + Math.random() * 600, easing: "cubic-bezier(.1,.7,.3,1)" });
      an.onfinish = (function (el) { return function () { el.remove(); }; })(e);
    }
  }

  /* mode: "run" xe đang chạy · "stop" xe đã dừng (a = góc dừng) · "idle" đứng chờ */
  function update(a, mode) {
    if (!B) return;
    var r = regionOf(a), k = mode + (mode === "idle" ? "" : r);
    if (k === key) return;
    var was = key; key = k;
    Object.keys(POS).forEach(function (x) {
      var on = mode === "run" && x === r, win = mode === "stop" && x === r, off = mode === "stop" && x !== r;
      L[x].className = "bd-l" + (on ? " on" : "") + (win ? " win" : "") + (off ? " off" : "");
      W[x].className = "bd-w" + (on ? " on" : "") + (win ? " win" : "") + (off ? " dim" : "");
    });
    if (mode === "run") { B.classList.add("bd-run"); B.style.setProperty("--rc", POS[r].col); }
    else B.classList.remove("bd-run");
    if (mode === "stop" && was.indexOf("stop") !== 0) burst(r);
  }

  window.Board = { init: init, update: update, regionOf: regionOf };
})();
