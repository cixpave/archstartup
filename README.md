# CachyOS Gaming + Dev Setup

A post-install script for a fresh **CachyOS** (Arch-based) machine, aimed at
gaming + coding on **NVIDIA GPU + Intel CPU** hardware.

It's interactive — every section asks before it does anything, so you can run
the whole thing or cherry-pick. Nothing runs silently.

## What it installs

| Category    | Packages |
|-------------|----------|
| GPU/CPU     | NVIDIA driver (via `chwd` or manual), `intel-ucode`, `intel-media-driver`, Vulkan loaders |
| Gaming      | `steam`, `gamemode`, `mangohud`, `gamescope`, ProtonUp-Qt (for Proton-GE) |
| Apps        | Discord, Google Chrome, Spotify, Prism Launcher (Minecraft), Modrinth, ThinkOrSwim |
| Tweaks      | Safe gaming `sysctl` values, `fstrim.timer`, multilib repo, an AUR helper (`paru`) |

## Usage

```bash
git clone https://github.com/<your-username>/cachyos-setup.git
cd cachyos-setup
chmod +x setup.sh
./setup.sh
```

Run it as your **normal user** (not `sudo`) — it calls `sudo` itself where needed.
**Reboot afterward** so the NVIDIA driver loads.

## Notes / gotchas

- **CachyOS / Arch only.** It uses `pacman` + the AUR. It will *not* work on
  Bazzite or Nobara (those are Fedora-based, `rpm`/`dnf`).
- **NVIDIA:** the default path uses CachyOS's `chwd` detector, which is the
  least likely to break your boot. Manual install offers `nvidia-open-dkms`
  (RTX 20-series / GTX 16-series and newer) vs `nvidia-dkms` (older cards).
- **ThinkOrSwim** is opt-in and the one finicky app. It needs a JDK; mainline
  `jdk-openjdk` works in practice, but if it refuses to launch, switch to
  `zulu-21-bin`. The Trader-TV video feed and Learning Center tab don't exist
  on the Linux build.
- **Xbox / Game Pass games don't install natively.** Stream them via
  `xbox.com/play` in Chrome (needs Game Pass Ultimate), buy the ones you care
  about on Steam, or keep a Windows dual-boot for them.

## After running

1. Reboot.
2. Open **ProtonUp-Qt** → install the latest **Proton-GE**.
3. Steam → Settings → Compatibility → enable Proton for all titles → pick Proton-GE.
4. Check any game on [ProtonDB](https://www.protondb.com) before trusting it.
5. For multiplayer titles, check [areweanticheatyet.com](https://areweanticheatyet.com) —
   a few games (Valorant, Fortnite, Destiny 2) block Linux at the anti-cheat level.

## License

MIT — do whatever you like with it.
