/*
 * catalog.js
 * Data model for the CachyOS setup wizard.
 *
 * Every choice the user can make lives here as plain data. The wizard renders
 * these steps, and the generator (generator.js) turns the user's selections
 * into a runnable setup.sh. Keeping this declarative means adding a new app or
 * tweak is a one-line data change, not a UI rewrite.
 *
 * Item types tell the generator HOW to install something:
 *   repo    -> sudo pacman -S --needed   (official repos)
 *   aur     -> <aur helper> -S --needed  (Arch User Repository)
 *   flatpak -> flatpak install flathub   (sandboxed fallback)
 *   special -> custom shell block (drivers, tweaks, etc.)
 */

const CATALOG = {
  // ---- Step order is the order of this array -------------------------------
  steps: [
    {
      id: "welcome",
      title: "Welcome to CachyOS",
      subtitle: "Let's get your fresh Arch-based system set up — the friendly way.",
      kind: "intro",
    },

    {
      id: "update",
      title: "Update your system",
      subtitle: "On a fresh install it's best to bring everything current before adding anything.",
      kind: "update", // custom: live update-check (server mode) + a toggle
      key: "update",
      help:
        "Partial upgrades can break Arch systems. A full <code>pacman -Syu</code> first keeps " +
        "everything in sync — strongly recommended before installing new packages.",
      reference: { label: "Arch Wiki: System maintenance", url: "https://wiki.archlinux.org/title/System_maintenance" },
      options: [
        {
          id: "do-update",
          name: "Update everything first (pacman -Syu)",
          desc: "Refresh repos and upgrade all installed packages before the rest of the setup.",
          recommended: true,
          special: "update",
        },
      ],
    },

    {
      id: "gpu",
      title: "Graphics drivers",
      subtitle: "Pick the GPU in this machine. This is the one step worth getting right first.",
      kind: "single", // radio: choose exactly one
      key: "gpu",
      help:
        "On CachyOS the safest route for NVIDIA is the built-in <code>chwd</code> detector, " +
        "which matches the right driver to your card and kernel.",
      reference: { label: "CachyOS GPU wiki", url: "https://wiki.cachyos.org/configuration/gpu/" },
      options: [
        {
          id: "gpu-nvidia",
          name: "NVIDIA (RTX/GTX)",
          desc: "Uses chwd to auto-pick nvidia-open-dkms / nvidia-dkms + Vulkan + video decode.",
          recommended: true,
          special: "nvidia",
        },
        {
          id: "gpu-amd",
          name: "AMD (Radeon)",
          desc: "Mesa RADV Vulkan stack + 32-bit libs. Open-source, nothing to reboot for.",
          special: "amd",
        },
        {
          id: "gpu-intel-only",
          name: "Intel graphics only",
          desc: "No discrete GPU — just the Intel iGPU Vulkan + media drivers.",
          special: "intel-gpu",
        },
        {
          id: "gpu-skip",
          name: "Skip / already set up",
          desc: "Leave graphics drivers untouched.",
          special: "none",
        },
      ],
    },

    {
      id: "cpu",
      title: "CPU microcode",
      subtitle: "Microcode delivers stability and security fixes for your processor.",
      kind: "single",
      key: "cpu",
      reference: { label: "Arch Wiki: Microcode", url: "https://wiki.archlinux.org/title/Microcode" },
      options: [
        { id: "cpu-intel", name: "Intel", desc: "intel-ucode + iGPU media decode drivers.", recommended: true, special: "intel-cpu" },
        { id: "cpu-amd", name: "AMD", desc: "amd-ucode (Ryzen / EPYC).", special: "amd-cpu" },
        { id: "cpu-skip", name: "Skip", desc: "Don't touch microcode.", special: "none" },
      ],
    },

    {
      id: "gaming",
      title: "Gaming stack",
      subtitle: "The core toolkit for native and Proton gaming. Pick what you want.",
      kind: "multi", // checkboxes: choose any
      key: "gaming",
      help:
        "Launch a game in Steam with <code>gamemoderun mangohud %command%</code> to get the " +
        "performance governor plus an FPS/usage overlay.",
      reference: { label: "ProtonDB — check any game first", url: "https://www.protondb.com" },
      options: [
        { id: "steam", name: "Steam", desc: "Valve's client. Pulls in 32-bit libs via multilib.", type: "repo", packages: ["steam"], recommended: true, needsMultilib: true },
        { id: "gamemode", name: "GameMode", desc: "On-demand CPU/GPU performance governor.", type: "repo", packages: ["gamemode", "lib32-gamemode"], recommended: true, needsMultilib: true },
        { id: "mangohud", name: "MangoHud", desc: "FPS, frametime, temps & usage overlay.", type: "repo", packages: ["mangohud", "lib32-mangohud"], recommended: true, needsMultilib: true },
        { id: "gamescope", name: "Gamescope", desc: "Valve's micro-compositor (great for handhelds & scaling).", type: "repo", packages: ["gamescope"] },
        { id: "protonup", name: "ProtonUp-Qt", desc: "One-click installer for Proton-GE custom builds.", type: "aur", packages: ["protonup-qt"], recommended: true },
        { id: "lutris", name: "Lutris", desc: "Manager for non-Steam games, emulators & stores.", type: "repo", packages: ["lutris"] },
        { id: "heroic", name: "Heroic Games Launcher", desc: "Epic Games + GOG + Amazon Prime launcher.", type: "aur", packages: ["heroic-games-launcher-bin"] },
      ],
    },

    {
      id: "apps",
      title: "Applications",
      subtitle: "Everyday apps. Tick the ones you use — leave the rest.",
      kind: "multi",
      key: "apps",
      help:
        "Some apps live in the AUR (community-maintained). If you tick any of those, the " +
        "generated script installs the <code>paru</code> helper automatically.",
      options: [
        { id: "discord", name: "Discord", desc: "Voice/text chat. Official repo build.", type: "repo", packages: ["discord"], recommended: true },
        { id: "chrome", name: "Google Chrome", desc: "Needed for Xbox Cloud / Game Pass streaming.", type: "aur", packages: ["google-chrome"] },
        { id: "firefox", name: "Firefox", desc: "Open-source browser, in the official repos.", type: "repo", packages: ["firefox"], recommended: true },
        { id: "spotify", name: "Spotify", desc: "Music streaming (AUR build).", type: "aur", packages: ["spotify"] },
        { id: "prism", name: "Prism Launcher", desc: "Best Minecraft launcher — Modrinth packs built in.", type: "repo", packages: ["prismlauncher"], recommended: true },
        { id: "modrinth", name: "Modrinth App", desc: "Mod & modpack manager.", type: "aur", packages: ["modrinth-app-bin"] },
        { id: "vscode", name: "VS Code", desc: "Microsoft's editor (OSS build, code).", type: "repo", packages: ["code"] },
        { id: "obs", name: "OBS Studio", desc: "Recording & streaming.", type: "repo", packages: ["obs-studio"] },
        { id: "thinkorswim", name: "ThinkOrSwim", desc: "Schwab trading platform — installs a JDK too.", type: "special", special: "thinkorswim" },
      ],
    },

    {
      id: "flatpak",
      title: "Flatpak",
      subtitle: "A sandboxed app source — a handy fallback when an app isn't in the repos.",
      kind: "multi",
      key: "flatpak",
      reference: { label: "Flathub", url: "https://flathub.org" },
      options: [
        { id: "flatpak-enable", name: "Enable Flatpak + Flathub", desc: "Adds the flatpak runtime and the Flathub remote.", type: "special", special: "flatpak", recommended: true },
      ],
    },

    {
      id: "tweaks",
      title: "Optimization & tweaks",
      subtitle: "Safe, reversible system tuning. CachyOS sets some of these already — repeating is harmless.",
      kind: "multi",
      key: "tweaks",
      help:
        "These write to <code>/etc/sysctl.d/</code> and enable systemd timers — nothing destructive, " +
        "and every change is listed in the generated script so you can read before you run.",
      reference: { label: "CachyOS performance wiki", url: "https://wiki.cachyos.org/" },
      options: [
        { id: "tweak-sysctl", name: "Gaming sysctl tuning", desc: "Raises vm.max_map_count (needed by some Proton titles) and lowers swappiness.", type: "special", special: "sysctl", recommended: true },
        { id: "tweak-fstrim", name: "Enable fstrim timer", desc: "Weekly SSD TRIM for sustained performance.", type: "special", special: "fstrim", recommended: true },
        { id: "tweak-multilib", name: "Enable multilib repo", desc: "32-bit packages (required for Steam & many games).", type: "special", special: "multilib", recommended: true },
        { id: "tweak-firewall", name: "Enable firewall (ufw)", desc: "Sensible default-deny firewall.", type: "special", special: "ufw" },
      ],
    },

    {
      id: "summary",
      title: "Your setup is ready",
      subtitle: "Review your picks, then copy or download your personalized install script.",
      kind: "summary",
    },
  ],

  /* Bite-size tips shown in the sidebar, rotated per step. */
  tips: {
    welcome: [
      "This wizard never touches your machine — it builds a script you read and run yourself.",
      "Everything you pick is reversible. Nothing here reformats or wipes anything.",
    ],
    update: [
      "Running under the local server? Hit “Check for updates” to see exactly how many are pending.",
      "Updating first avoids partial-upgrade breakage — the #1 way Arch systems get into trouble.",
    ],
    gpu: [
      "NVIDIA needs a reboot after install before games will run.",
      "Unsure of your card? Run <code>lspci -k | grep -A2 VGA</code> in a terminal.",
    ],
    cpu: ["Microcode loads at boot via your initramfs — CachyOS regenerates it for you."],
    gaming: [
      "Check every game on ProtonDB before buying — most 'just work', a few don't.",
      "Anti-cheat can block Linux. Verify multiplayer titles on areweanticheatyet.com.",
    ],
    apps: ["AUR builds compile from source the first time — give Chrome/Spotify a minute."],
    flatpak: ["Flatpaks are sandboxed, so they sometimes need extra permission grants (use Flatseal)."],
    tweaks: ["vm.max_map_count fixes crashes in some Source-engine & Proton games."],
    summary: ["Run the script as your normal user — it calls sudo itself where needed."],
  },
};
