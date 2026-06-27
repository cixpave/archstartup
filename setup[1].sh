#!/usr/bin/env bash
#
# cachyos-setup.sh
# Post-install setup for a CachyOS (Arch-based) gaming + coding machine.
# Target hardware: NVIDIA GPU + Intel CPU.
#
# What it does (each section asks first, so you stay in control):
#   - Updates the system and enables multilib (needed for 32-bit game libs)
#   - Ensures an AUR helper (paru) is present
#   - Installs NVIDIA drivers (via CachyOS's chwd by default — the safe path)
#   - Installs Intel microcode + iGPU video-decode drivers
#   - Installs the gaming stack (Steam, GameMode, MangoHud, Gamescope, Proton-GE tool)
#   - Installs your apps (Discord, Spotify, Chrome, Minecraft, Modrinth, ThinkOrSwim)
#   - Applies a few safe gaming-oriented system tweaks
#
# Usage:
#   chmod +x setup.sh
#   ./setup.sh
#
# Run it as your normal user (NOT with sudo). It will call sudo where needed.
#
# NOTE: This is written for CachyOS / Arch (pacman + AUR). It will not work
# as-is on Fedora-based distros (Bazzite/Nobara) — those use rpm/dnf.

set -u  # treat unset variables as errors; we deliberately do NOT set -e so a
        # single failed optional package doesn't abort the whole run.

# ----------------------------------------------------------------------------
# Helpers
# ----------------------------------------------------------------------------
BOLD=$'\e[1m'; GREEN=$'\e[32m'; YELLOW=$'\e[33m'; RED=$'\e[31m'; BLUE=$'\e[34m'; RESET=$'\e[0m'

info()  { printf '%s\n' "${BLUE}${BOLD}::${RESET} $*"; }
ok()    { printf '%s\n' "${GREEN}${BOLD}✓${RESET} $*"; }
warn()  { printf '%s\n' "${YELLOW}${BOLD}!${RESET} $*"; }
err()   { printf '%s\n' "${RED}${BOLD}✗${RESET} $*" >&2; }

# Ask a yes/no question. Default is No unless second arg is "Y".
confirm() {
    local prompt="$1" default="${2:-N}" reply
    if [[ "$default" == "Y" ]]; then
        read -r -p "${BOLD}${prompt}${RESET} [Y/n] " reply
        [[ -z "$reply" || "$reply" =~ ^[Yy] ]]
    else
        read -r -p "${BOLD}${prompt}${RESET} [y/N] " reply
        [[ "$reply" =~ ^[Yy] ]]
    fi
}

# Install official-repo packages (idempotent thanks to --needed).
pac() {
    info "Installing (repo): $*"
    sudo pacman -S --needed --noconfirm "$@" || warn "Some packages failed: $*"
}

# Install AUR packages with the detected helper.
aur() {
    info "Installing (AUR): $*"
    "$AUR_HELPER" -S --needed --noconfirm "$@" || warn "Some AUR packages failed: $*"
}

# ----------------------------------------------------------------------------
# Pre-flight
# ----------------------------------------------------------------------------
if [[ $EUID -eq 0 ]]; then
    err "Don't run this as root. Run it as your normal user; it uses sudo itself."
    exit 1
fi

if ! command -v pacman >/dev/null 2>&1; then
    err "pacman not found. This script is for CachyOS / Arch-based systems only."
    exit 1
fi

info "Refreshing keyring and updating the system first (recommended)."
if confirm "Run a full system update now (pacman -Syu)?" Y; then
    sudo pacman -Syu --noconfirm || warn "System update reported errors — review above."
fi

# ----------------------------------------------------------------------------
# Multilib (32-bit support for Steam / older games)
# ----------------------------------------------------------------------------
if grep -q '^\[multilib\]' /etc/pacman.conf; then
    ok "multilib repo already enabled."
else
    if confirm "Enable the [multilib] repo (needed for Steam / 32-bit games)?" Y; then
        sudo sed -i '/^#\[multilib\]/,+1 s/^#//' /etc/pacman.conf
        sudo pacman -Sy
        ok "multilib enabled."
    fi
fi

# ----------------------------------------------------------------------------
# AUR helper
# ----------------------------------------------------------------------------
if command -v paru >/dev/null 2>&1; then
    AUR_HELPER=paru
elif command -v yay >/dev/null 2>&1; then
    AUR_HELPER=yay
else
    warn "No AUR helper found."
    if confirm "Install 'paru' (AUR helper, needed for Chrome/Spotify/etc.)?" Y; then
        pac --needed base-devel git
        tmp="$(mktemp -d)"
        git clone https://aur.archlinux.org/paru-bin.git "$tmp/paru-bin" \
            && ( cd "$tmp/paru-bin" && makepkg -si --noconfirm )
        rm -rf "$tmp"
        AUR_HELPER=paru
    else
        AUR_HELPER=""
        warn "Continuing without an AUR helper — AUR apps will be skipped."
    fi
fi
[[ -n "${AUR_HELPER:-}" ]] && ok "Using AUR helper: $AUR_HELPER"

# ----------------------------------------------------------------------------
# NVIDIA drivers
# ----------------------------------------------------------------------------
echo
info "${BOLD}NVIDIA drivers${RESET}"
echo "  The safest route on CachyOS is its built-in detector (chwd), which picks"
echo "  the right driver for your card and kernel. Manual install is also offered."
if confirm "Set up NVIDIA drivers now?" Y; then
    if command -v chwd >/dev/null 2>&1 && confirm "Use CachyOS chwd (recommended)?" Y; then
        sudo chwd -a pci nonfree 0300 || warn "chwd returned an error — review above."
        ok "chwd finished. Reboot before gaming."
    else
        echo "  Manual driver choice:"
        echo "    1) nvidia-open-dkms  (recommended for RTX 20-series / GTX 16-series and newer)"
        echo "    2) nvidia-dkms       (older GPUs, pre-Turing)"
        read -r -p "  Pick 1 or 2 [1]: " nvchoice
        case "${nvchoice:-1}" in
            2) NV_PKG=nvidia-dkms ;;
            *) NV_PKG=nvidia-open-dkms ;;
        esac
        pac "$NV_PKG" nvidia-utils lib32-nvidia-utils nvidia-settings \
            vulkan-icd-loader lib32-vulkan-icd-loader libva-nvidia-driver
        ok "NVIDIA packages installed. A reboot is required."
        warn "If you boot to a black screen, see the CachyOS NVIDIA wiki / chwd."
    fi
fi

# ----------------------------------------------------------------------------
# Intel CPU + iGPU
# ----------------------------------------------------------------------------
echo
info "${BOLD}Intel CPU / integrated GPU${RESET}"
if confirm "Install Intel microcode + iGPU video-decode drivers?" Y; then
    pac intel-ucode intel-media-driver libva-utils vulkan-intel lib32-vulkan-intel
    ok "Intel microcode + media drivers installed (helps YouTube/video hardware decode)."
    echo "  (CachyOS's kernel already handles CPU scheduling tuning for you.)"
fi

# ----------------------------------------------------------------------------
# Gaming stack
# ----------------------------------------------------------------------------
echo
info "${BOLD}Core gaming stack${RESET}"
if confirm "Install Steam, GameMode, MangoHud, Gamescope?" Y; then
    pac steam gamemode lib32-gamemode mangohud lib32-mangohud gamescope
    ok "Gaming stack installed."
    echo "  Tip: launch games with  gamemoderun %command%  in Steam launch options."
    echo "       Add  mangohud  to that line for an FPS/usage overlay."
fi

if [[ -n "${AUR_HELPER:-}" ]] && confirm "Install ProtonUp-Qt (easy Proton-GE installer)?" Y; then
    aur protonup-qt
    ok "ProtonUp-Qt installed — open it to download the latest Proton-GE."
fi

# ----------------------------------------------------------------------------
# Applications
# ----------------------------------------------------------------------------
echo
info "${BOLD}Applications${RESET}"

# Discord (official repo)
if confirm "Install Discord?" Y; then
    pac discord
fi

# Minecraft — Prism Launcher (repo) has built-in Modrinth modpack browsing
if confirm "Install Prism Launcher for Minecraft (recommended, has Modrinth built in)?" Y; then
    pac prismlauncher
    ok "Prism Launcher installed."
fi
if [[ -n "${AUR_HELPER:-}" ]] && confirm "Also install the official Minecraft launcher?" N; then
    aur minecraft-launcher
fi

# AUR apps
if [[ -n "${AUR_HELPER:-}" ]]; then
    confirm "Install Google Chrome?" Y           && aur google-chrome
    confirm "Install Spotify?" Y                  && aur spotify
    confirm "Install the Modrinth app?" Y         && aur modrinth-app-bin
else
    warn "Skipping Chrome / Spotify / Modrinth — no AUR helper available."
    echo "  Flatpak fallbacks if you prefer:"
    echo "    flatpak install flathub com.google.Chrome com.spotify.Client com.modrinth.ModrinthApp"
fi

# ThinkOrSwim — the fiddly one. Needs a JDK; Schwab wants Zulu 21 but mainline
# OpenJDK 21+ works fine in practice. Made separate + opt-in for that reason.
echo
info "${BOLD}ThinkOrSwim${RESET} (trading platform — needs Java, no official Linux support)"
if [[ -n "${AUR_HELPER:-}" ]] && confirm "Install ThinkOrSwim + a Java runtime?" N; then
    pac jdk-openjdk          # mainline OpenJDK 21+, works for ToS in practice
    aur thinkorswim
    ok "ThinkOrSwim installed. If it complains about Java, install Zulu instead:"
    echo "    $AUR_HELPER -S zulu-21-bin   (then: sudo archlinux-java set <zulu-21>)"
    warn "Note: the Trader-TV video feed and in-app Learning Center are missing on Linux."
fi

# ----------------------------------------------------------------------------
# Flatpak (handy fallback source)
# ----------------------------------------------------------------------------
echo
if confirm "Set up Flatpak + Flathub (useful as a fallback app source)?" N; then
    pac flatpak
    flatpak remote-add --if-not-exists flathub \
        https://flathub.org/repo/flathub.flatpakrepo
    ok "Flathub added. Install apps with: flatpak install flathub <app-id>"
fi

# ----------------------------------------------------------------------------
# Safe gaming/system tweaks
# ----------------------------------------------------------------------------
echo
info "${BOLD}System tweaks${RESET}"
if confirm "Apply a few safe gaming sysctl tweaks + enable fstrim?" Y; then
    sudo tee /etc/sysctl.d/99-gaming.conf >/dev/null <<'EOF'
# Higher mmap count — required by some games (e.g. certain Source/Proton titles).
vm.max_map_count = 2147483642
# Be less eager to swap; better for systems with plenty of RAM while gaming.
vm.swappiness = 10
EOF
    sudo sysctl --system >/dev/null 2>&1
    sudo systemctl enable --now fstrim.timer >/dev/null 2>&1
    ok "Tweaks applied (CachyOS may already set some of these — harmless to repeat)."
fi

# ----------------------------------------------------------------------------
# Done
# ----------------------------------------------------------------------------
echo
ok "${BOLD}All selected steps are complete.${RESET}"
echo
echo "Next steps:"
echo "  1) ${BOLD}Reboot${RESET} (required for NVIDIA drivers to load)."
echo "  2) Open ProtonUp-Qt and grab the latest Proton-GE."
echo "  3) In Steam: Settings → Compatibility → enable Proton for all titles,"
echo "     and select Proton-GE as the default."
echo "  4) Before trusting a game, check it on ${BOLD}https://www.protondb.com${RESET}."
echo "  5) Xbox/Game Pass games won't install natively — stream via xbox.com/play"
echo "     in Chrome, or keep a Windows dual-boot for those specific titles."
echo
