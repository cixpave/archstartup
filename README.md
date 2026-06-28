# CachyOS Setup Wizard

A friendly, **browser-based** setup wizard for a fresh **CachyOS** (Arch-based)
machine. Instead of running a script blind in the terminal and answering a
wall of `[y/N]` prompts, you click through a guided, parallax web page — like
an OS installer, but for your **apps, tips and optimizations** — and walk away
with a personalized `setup.sh` you review and run.

> The web page never touches your machine. It only **generates a script** for
> you to read and run yourself. Same "nothing happens silently" philosophy as
> the original script, front-loaded into a UI.

## Try it

Open `index.html` in any browser, or host the folder on GitHub Pages:

```bash
git clone https://github.com/cixpave/archstartup.git
cd archstartup
xdg-open index.html        # or just double-click it
```

To publish it: push to GitHub and enable **Settings → Pages → Deploy from
branch → root**. The wizard is 100% static (HTML/CSS/JS) — no build step, no
server, no backend.

## How it works

1. **Welcome** — what the wizard does and why it's safe.
2. **Graphics drivers** — NVIDIA (via CachyOS `chwd`), AMD (Mesa/RADV), Intel iGPU, or skip.
3. **CPU microcode** — Intel / AMD.
4. **Gaming stack** — Steam, GameMode, MangoHud, Gamescope, ProtonUp-Qt, Lutris, Heroic.
5. **Applications** — Discord, Chrome, Firefox, Spotify, Prism Launcher, Modrinth, VS Code, OBS, ThinkOrSwim.
6. **Flatpak** — optional Flathub fallback source.
7. **Optimization & tweaks** — gaming `sysctl`, `fstrim.timer`, multilib, `ufw`.
8. **Summary** — review your picks, then **Copy** / **Download** your tailored `setup.sh`.

Each step carries inline **tips** and **reference links** (CachyOS wiki, Arch
Wiki, ProtonDB, Flathub). Sensible "recommended" options are pre-selected, so
you can click straight through and still get a sane build.

Then, on your machine:

```bash
chmod +x setup.sh && ./setup.sh
```

Run it as your **normal user** (not `sudo`) — it calls `sudo` itself where
needed. **Reboot afterward** if you installed the NVIDIA driver.

## Project layout

```
index.html              # the parallax wizard page
assets/
  css/style.css         # styling + parallax waves
  js/catalog.js         # all packages / tips / steps as data (edit here to add apps)
  js/generator.js       # turns selections into a setup.sh
  js/wizard.js          # step navigation + UI rendering
  js/parallax.js        # scroll/mouse parallax (respects prefers-reduced-motion)
setup.sh                # the original full interactive script (still works standalone)
```

Want to add an app or tweak? It's a one-line data change in
[`assets/js/catalog.js`](assets/js/catalog.js) — no UI code to touch.

## Notes / gotchas

- **CachyOS / Arch only.** Uses `pacman` + the AUR. Won't work on Bazzite or
  Nobara (Fedora-based, `rpm`/`dnf`).
- **NVIDIA:** the default path uses CachyOS's `chwd` detector, the least likely
  to break your boot. A reboot is required afterward.
- **AUR apps** (Chrome, Spotify, Modrinth, Heroic…) build from source the first
  time and need the `paru` helper — the generated script installs it for you.
- **ThinkOrSwim** is the one finicky app: it needs a JDK. `jdk-openjdk` works in
  practice; if it refuses to launch, switch to `zulu-21-bin`.
- **Xbox / Game Pass games don't install natively.** Stream them via
  `xbox.com/play` in Chrome, or buy the ones you care about on Steam.

## After running

1. Reboot (required for NVIDIA).
2. Open **ProtonUp-Qt** → install the latest **Proton-GE**.
3. Steam → Settings → Compatibility → enable Proton for all titles → pick Proton-GE.
4. Check any game on [ProtonDB](https://www.protondb.com) before trusting it.
5. For multiplayer titles, check [areweanticheatyet.com](https://areweanticheatyet.com) —
   a few games (Valorant, Fortnite, Destiny 2) block Linux at the anti-cheat level.

## License

MIT — do whatever you like with it.
