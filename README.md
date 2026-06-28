<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CachyOS Setup Wizard — pick, tune, and install</title>
  <meta name="description" content="A friendly, browser-based setup wizard for a fresh CachyOS (Arch-based) machine. Choose your apps, tips and optimizations, then get a personalized install script." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="assets/css/style.css" />
</head>
<body>
  <!-- ===== Parallax background (shared across the whole page) ============== -->
  <div class="bg" aria-hidden="true">
    <div class="bg-glow"></div>
    <!-- Layered waves: each drifts at a different depth for parallax. -->
    <svg class="wave wave-1" data-parallax="0.10" viewBox="0 0 1440 320" preserveAspectRatio="none">
      <path d="M0,96 C320,200 520,40 720,96 C960,160 1180,40 1440,128 L1440,0 L0,0 Z"
            fill="none" stroke="#e11d48" stroke-width="6" opacity="0.55" />
    </svg>
    <svg class="wave wave-2" data-parallax="0.18" viewBox="0 0 1440 320" preserveAspectRatio="none">
      <path d="M0,128 C300,260 560,60 760,140 C1000,232 1220,72 1440,170 L1440,0 L0,0 Z"
            fill="none" stroke="#be4080" stroke-width="34" opacity="0.85" />
    </svg>
    <svg class="wave wave-3" data-parallax="0.28" viewBox="0 0 1440 320" preserveAspectRatio="none">
      <path d="M0,170 C320,300 540,110 780,180 C1020,250 1240,120 1440,210 L1440,0 L0,0 Z"
            fill="none" stroke="#7c1f4f" stroke-width="10" opacity="0.5" />
    </svg>
  </div>

  <!-- ===== Hero / landing ================================================= -->
  <header class="hero">
    <div class="hero-inner">
      <span class="kicker">CachyOS · Arch-based</span>
      <h1 class="hero-title">Set up your machine,<br /><span>your way.</span></h1>
      <p class="hero-lead">
        A guided, step-by-step wizard for a fresh CachyOS install — pick your drivers,
        apps, optimizations and tips, and walk away with a personalized install script.
        No terminal guesswork.
      </p>
      <div class="hero-actions">
        <button id="btn-begin" class="cta">Begin setup ↓</button>
        <a class="ghost" href="https://github.com/cixpave/archstartup" target="_blank" rel="noopener">View on GitHub</a>
      </div>
      <div class="hero-hint">No installs happen here — the wizard builds a script you review and run.</div>
    </div>
    <div class="scroll-cue" aria-hidden="true">▾</div>
  </header>

  <!-- ===== Wizard ========================================================= -->
  <main id="wizard" class="wizard">
    <div class="wizard-shell">
      <!-- Progress bar -->
      <div class="progress">
        <div class="progress-track"><div id="progress-fill" class="progress-fill"></div></div>
        <div id="progress-dots" class="progress-dots"></div>
        <div id="step-label" class="step-label"></div>
      </div>

      <!-- Steps render here -->
      <section id="stage" class="stage" aria-live="polite"></section>

      <!-- Nav -->
      <nav class="nav">
        <button id="btn-back" class="nav-btn">← Back</button>
        <button id="btn-next" class="nav-btn primary">Next →</button>
      </nav>
    </div>
  </main>

  <footer class="footer">
    <p>Built for CachyOS · Arch-based. Always check games on
      <a href="https://www.protondb.com" target="_blank" rel="noopener">ProtonDB</a> and anti-cheat on
      <a href="https://areweanticheatyet.com" target="_blank" rel="noopener">areweanticheatyet.com</a>.</p>
    <p class="muted">MIT licensed. This page never modifies your system — it generates a script for you to run.</p>
  </footer>

  <script src="assets/js/catalog.js"></script>
  <script src="assets/js/generator.js"></script>
  <script src="assets/js/installer.js"></script>
  <script src="assets/js/wizard.js"></script>
  <script src="assets/js/parallax.js"></script>
</body>
</html>
