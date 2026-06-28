/* =========================================================================
   CachyOS Setup Wizard — styles
   Dark, glassy, with the signature CachyOS pink/red parallax waves.
   ========================================================================= */

:root {
  --bg: #0a0a0c;
  --bg-2: #111014;
  --ink: #f4f4f6;
  --muted: #9aa0aa;
  --pink: #be4080;
  --pink-bright: #e85a9b;
  --red: #e11d48;
  --plum: #7c1f4f;
  --card: rgba(22, 20, 26, 0.72);
  --card-border: rgba(255, 255, 255, 0.08);
  --radius: 18px;
  --shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
}

* { box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
  margin: 0;
  font-family: "Inter", system-ui, -apple-system, sans-serif;
  color: var(--ink);
  background: var(--bg);
  overflow-x: hidden;
  line-height: 1.55;
}

code, pre { font-family: "JetBrains Mono", ui-monospace, monospace; }

a { color: var(--pink-bright); text-decoration: none; }
a:hover { text-decoration: underline; }

.muted { color: var(--muted); }

/* ===== Parallax background ============================================== */
.bg {
  position: fixed;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(1200px 600px at 15% -10%, rgba(190, 64, 128, 0.18), transparent 60%),
    radial-gradient(900px 500px at 90% 10%, rgba(225, 29, 72, 0.12), transparent 55%),
    var(--bg);
  overflow: hidden;
}
.bg-glow {
  position: absolute;
  top: -20%;
  left: -10%;
  width: 60%;
  height: 60%;
  background: radial-gradient(circle, rgba(232, 90, 155, 0.16), transparent 70%);
  filter: blur(40px);
  animation: float 14s ease-in-out infinite alternate;
}
@keyframes float {
  from { transform: translate(0, 0); }
  to   { transform: translate(40px, 30px); }
}
.wave {
  position: absolute;
  left: -5%;
  width: 110%;
  will-change: transform;
}
.wave-1 { top: -4%;  height: 360px; }
.wave-2 { top: -2%;  height: 380px; }
.wave-3 { top: 0;    height: 400px; }

/* ===== Hero ============================================================= */
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 8vw;
  position: relative;
}
.hero-inner { max-width: 720px; }
.kicker {
  display: inline-block;
  font-size: 0.78rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--pink-bright);
  border: 1px solid rgba(232, 90, 155, 0.4);
  border-radius: 999px;
  padding: 6px 14px;
  margin-bottom: 22px;
}
.hero-title {
  font-size: clamp(2.6rem, 7vw, 5rem);
  font-weight: 800;
  line-height: 1.02;
  margin: 0 0 18px;
  letter-spacing: -0.02em;
}
.hero-title span {
  background: linear-gradient(100deg, var(--pink-bright), var(--red));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.hero-lead {
  font-size: clamp(1rem, 2.2vw, 1.22rem);
  color: var(--muted);
  max-width: 600px;
  margin: 0 0 32px;
}
.hero-actions { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; }
.cta {
  background: linear-gradient(100deg, var(--pink-bright), var(--red));
  color: #fff;
  border: none;
  font-weight: 700;
  font-size: 1.05rem;
  padding: 15px 30px;
  border-radius: 999px;
  cursor: pointer;
  box-shadow: 0 12px 30px rgba(225, 29, 72, 0.35);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.cta:hover { transform: translateY(-2px); box-shadow: 0 18px 40px rgba(225, 29, 72, 0.5); }
.ghost {
  color: var(--ink);
  border: 1px solid var(--card-border);
  padding: 14px 26px;
  border-radius: 999px;
  font-weight: 600;
}
.ghost:hover { border-color: var(--pink); text-decoration: none; }
.hero-hint { margin-top: 26px; font-size: 0.9rem; color: var(--muted); }
.scroll-cue {
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.6rem;
  color: var(--pink);
  animation: bob 1.8s ease-in-out infinite;
}
@keyframes bob {
  0%, 100% { transform: translate(-50%, 0); }
  50% { transform: translate(-50%, 10px); }
}

/* ===== Wizard ========================================================== */
.wizard {
  min-height: 100vh;
  padding: 70px 6vw 40px;
  display: flex;
  justify-content: center;
}
.wizard-shell {
  width: 100%;
  max-width: 980px;
}

/* Progress */
.progress { margin-bottom: 28px; }
.progress-track {
  height: 4px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  width: 0;
  background: linear-gradient(90deg, var(--pink-bright), var(--red));
  border-radius: 999px;
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.progress-dots {
  display: flex;
  gap: 10px;
  margin: 16px 0 8px;
  flex-wrap: wrap;
}
.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.2);
  background: transparent;
  cursor: pointer;
  padding: 0;
  transition: all 0.2s ease;
}
.dot.done { background: var(--pink); border-color: var(--pink); }
.dot.active { background: var(--pink-bright); border-color: var(--pink-bright); transform: scale(1.35); box-shadow: 0 0 0 4px rgba(232, 90, 155, 0.18); }
.step-label { font-size: 0.85rem; color: var(--muted); letter-spacing: 0.02em; }

/* Stage + cards */
.stage { min-height: 360px; }
.step-layout {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 24px;
  align-items: start;
}
@media (max-width: 820px) {
  .step-layout { grid-template-columns: 1fr; }
}

.card {
  background: var(--card);
  border: 1px solid var(--card-border);
  border-radius: var(--radius);
  padding: 32px;
  box-shadow: var(--shadow);
  backdrop-filter: blur(14px);
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.45s ease, transform 0.45s ease;
}
.card.in { opacity: 1; transform: translateY(0); }

.step-title { font-size: 1.6rem; font-weight: 700; margin: 0 0 6px; }
.step-sub { color: var(--muted); margin: 0 0 20px; }
.step-help {
  background: rgba(232, 90, 155, 0.08);
  border-left: 3px solid var(--pink);
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 0.92rem;
  color: #e8d3df;
  margin-bottom: 22px;
}
.step-help code, .run-note code {
  background: rgba(0, 0, 0, 0.4);
  padding: 1px 6px;
  border-radius: 5px;
  font-size: 0.85em;
}

/* Intro */
.intro-card .headline { font-size: 2.2rem; margin: 0 0 8px; }
.intro-card .subhead { color: var(--muted); font-size: 1.1rem; margin: 0 0 28px; }
.fact-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
@media (max-width: 640px) { .fact-grid { grid-template-columns: 1fr; } }
.fact {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  padding: 18px;
}
.fact-ico { font-size: 1.6rem; margin-bottom: 8px; }
.fact-h { font-weight: 700; margin-bottom: 4px; }
.fact-d { font-size: 0.88rem; color: var(--muted); }

/* Options */
.options { display: flex; flex-direction: column; gap: 12px; }
.option {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px 18px;
  border: 1px solid var(--card-border);
  border-radius: 12px;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.02);
  transition: border-color 0.2s ease, background 0.2s ease, transform 0.1s ease;
}
.option:hover { border-color: rgba(232, 90, 155, 0.5); background: rgba(232, 90, 155, 0.05); }
.option.selected { border-color: var(--pink-bright); background: rgba(232, 90, 155, 0.10); }
.option input { position: absolute; opacity: 0; pointer-events: none; }
.mark {
  flex: 0 0 auto;
  width: 22px;
  height: 22px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  margin-top: 2px;
  display: grid;
  place-items: center;
  transition: all 0.2s ease;
}
.option input[type="radio"] ~ .mark { border-radius: 50%; }
.option input[type="checkbox"] ~ .mark { border-radius: 6px; }
.option.selected .mark { border-color: var(--pink-bright); background: var(--pink-bright); }
.option.selected .mark::after {
  content: "";
  width: 9px; height: 9px;
  border-radius: inherit;
  background: #fff;
}
.option input[type="checkbox"] ~ .mark::after { border-radius: 2px; }
.option-body { display: flex; flex-direction: column; gap: 3px; }
.option-title { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.option-name { font-weight: 600; }
.option-desc { font-size: 0.86rem; color: var(--muted); }
.badge {
  font-size: 0.66rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  background: rgba(232, 90, 155, 0.2);
  color: var(--pink-bright);
  border: 1px solid rgba(232, 90, 155, 0.4);
  padding: 2px 8px;
  border-radius: 999px;
  font-weight: 700;
}

/* Tips sidebar */
.tips {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--card-border);
  border-radius: var(--radius);
  padding: 22px;
  font-size: 0.9rem;
  position: sticky;
  top: 24px;
}
.tips-head { font-weight: 700; margin-bottom: 12px; }
.tips ul { margin: 0; padding-left: 18px; display: flex; flex-direction: column; gap: 10px; color: var(--muted); }
.tips code { background: rgba(0,0,0,0.4); padding: 1px 5px; border-radius: 4px; font-size: 0.82em; color: #e8d3df; }
.ref-link { display: inline-block; margin-top: 16px; font-weight: 600; font-size: 0.86rem; }

/* Summary */
.chips { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 22px; }
.chip {
  background: rgba(232, 90, 155, 0.12);
  border: 1px solid rgba(232, 90, 155, 0.3);
  color: #f0d5e3;
  padding: 5px 12px;
  border-radius: 999px;
  font-size: 0.82rem;
}
.toolbar { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 16px; }
.tool-btn {
  border: 1px solid var(--card-border);
  background: rgba(255,255,255,0.04);
  color: var(--ink);
  padding: 10px 18px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.15s ease;
}
.tool-btn:hover { border-color: var(--pink); }
.tool-btn.primary { background: linear-gradient(100deg, var(--pink-bright), var(--red)); border: none; }
.tool-btn.flash { background: #22c55e; border-color: #22c55e; color: #fff; }
.script {
  background: #08080a;
  border: 1px solid var(--card-border);
  border-radius: 12px;
  padding: 18px;
  max-height: 420px;
  overflow: auto;
  font-size: 0.8rem;
  line-height: 1.5;
  color: #cdd3dc;
  white-space: pre;
}
.run-note { margin-top: 14px; font-size: 0.9rem; color: var(--muted); }

/* Nav */
.nav { display: flex; justify-content: space-between; margin-top: 28px; }
.nav-btn {
  background: rgba(255,255,255,0.05);
  border: 1px solid var(--card-border);
  color: var(--ink);
  padding: 13px 28px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.15s ease;
}
.nav-btn:hover:not(:disabled) { border-color: var(--pink); transform: translateY(-1px); }
.nav-btn:disabled { opacity: 0.35; cursor: not-allowed; }
.nav-btn.primary { background: linear-gradient(100deg, var(--pink-bright), var(--red)); border: none; }

/* Footer */
.footer {
  text-align: center;
  padding: 50px 6vw 60px;
  font-size: 0.88rem;
  color: var(--muted);
  border-top: 1px solid var(--card-border);
}
.footer p { margin: 6px 0; }
