# CachyOS Setup Wizard

A friendly, **browser-based** setup wizard for a fresh **CachyOS** (Arch-based)
machine. Instead of running a script blind in the terminal and answering a
wall of `[y/N]` prompts, you click through a guided, parallax web page — like
an OS installer, but for your **apps, tips and optimizations** — and walk away
with a personalized `setup.sh` you review and run.

> The web page never touches your machine. It only **generates a script** for
> you to read and run yourself. Same "nothing happens silently" philosophy as
> the original script, front-loaded into a UI.

## Two ways to run it

### 1. Live installer (recommended) — runs the install for you

Run the bundled local server **on the CachyOS machine** you want to set up. The
wizard then installs everything for you and shows live progress with
percentages — no copy-pasting, no terminal babysitting.

```bash
git clone https://github.com/cixpave/archstartup.git
cd archstartup
./start.sh                 # or: node server.js
```

Then open **http://127.0.0.1:8787**. The server:

- binds to `127.0.0.1` only (never exposed to the network),
- requires a per-launch token (so a random website can't drive it),
- runs real `pacman` / `paru` / `flatpak` commands and **streams progress**
  (overall %, per-step status, and the live command log),
- uses `pkexec` for a graphical password prompt when passwordless `sudo` isn't
  set up (or run `sudo -v` first / `start.sh` does it for you).

Only Node.js is required (`sudo pacman -S nodejs`). No npm install, no build.

> If `pacman` isn't found (e.g. you open it on another distro), the installer
> automatically runs in **dry-run** — it simulates the install so you can try
> the whole flow safely.

### 2. Static page — generates a script you run yourself

Just open `index.html` (or host it on GitHub Pages). With no server it can't
install directly, so the summary step gives you a tailored `setup.sh` to
**copy or download** and run:

```bash
chmod +x setup.sh && ./setup.sh
```

Run it as your **normal user** (not `sudo`) — it calls `sudo` itself where
needed. **Reboot afterward** if you installed the NVIDIA driver.

## How it works

1. **Welcome** — what the wizard does and why it's safe.
2. **Update your system** — checks how many updates are pending (live installer) and offers a full `pacman -Syu` first.
3. **Graphics drivers** — NVIDIA (via CachyOS `chwd`), AMD (Mesa/RADV), Intel iGPU, or skip.
4. **CPU microcode** — Intel / AMD.
5. **Gaming stack** — Steam, GameMode, MangoHud, Gamescope, ProtonUp-Qt, Lutris, Heroic.
6. **Applications** — Discord, Chrome, Firefox, Spotify, Prism Launcher, Modrinth, VS Code, OBS, ThinkOrSwim.
7. **Flatpak** — optional Flathub fallback source.
8. **Optimization & tweaks** — gaming `sysctl`, `fstrim.timer`, multilib, `ufw`.
9. **Summary** — **Install now** (live), or **Copy** / **Download** your tailored `setup.sh`.

Each step carries inline **tips** and **reference links** (CachyOS wiki, Arch
Wiki, ProtonDB, Flathub). Sensible "recommended" options are pre-selected, so
you can click straight through and still get a sane build.

## Project layout

```
index.html              # the parallax wizard page
server.js               # local install server (zero npm deps) — serves the page + runs the install
start.sh                # convenience launcher (caches sudo, opens the browser)
package.json            # `npm start` -> node server.js
assets/
  css/style.css         # styling + parallax waves + progress page
  js/catalog.js         # all packages / tips / steps as data (edit here to add apps)
  js/generator.js       # turns selections into a setup.sh AND a live install plan
  js/installer.js       # front-end client for the local server (health, updates, run)
  js/wizard.js          # step navigation + UI rendering + live progress page
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
