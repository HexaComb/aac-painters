# DESIGN.md — AAC Painters Inc.

## Aesthetic Direction & Domain Exemplars
- **Direction**: **AAC Spectrum Editorial & Picture-Driven Craftsmanship** — blending a high-contrast modern contractor layout (alternating crisp white editorial sections with deep slate-charcoal `#0E141B` architectural bands and the signature 4-color AAC paint spectrum bar) with our deep, real-photo jobsite storytelling.
- **Brand Motif**:
  - **The 4-Color AAC Spectrum Bar**: Derived directly from the AAC Painters Inc. logo (`#E53924` Red, `#48B649` Green, `#F5B800` Yellow, `#14A8E8` Cyan). Used as:
    1. A full-width 4-segment horizontal divider bar at the base of the Hero and above the Footer.
    2. A compact 4-segment horizontal bar (`44px × 4px`) beside uppercase section kickers (`OUR SERVICES`, `BEFORE & AFTER PROOF`, `WHY CHOOSE US`, `OUR PROCESS`, `WHAT OUR CLIENTS SAY`, `GET A FREE ESTIMATE`).
  - **Solid Cerulean Headline Highlights**: Key emotional anchor words in dark-section headlines (`Lasting`, `Detail Oriented.`, `Your Space?`) use solid `#14A8E8` cyan (never multi-stop `background-clip: text` gradients).

## Color Palette & Atmospheric Polarity
- **Alternating Daylight & Slate Polarity**:
  - **Light Editorial Surfaces**:
    - `--bg-white`: `#FFFFFF` (Featured Before & After story rows, Coating Lab, floating Estimate card)
    - `--bg-light`: `#F6F8FA` (Our Services & Our Process sections)
    - `--text-dark`: `#111720` (Primary ink on light sections)
    - `--text-dark-secondary`: `#3E4856` (Body copy on light sections, contrast $\ge 7.5:1$)
    - `--text-dark-muted`: `#5B6676` (Metadata & captions on light sections, contrast $\ge 4.8:1$)
  - **Dark Slate Architectural Bands**:
    - `--bg-dark`: `#0E141B` (Navbar, Why Choose Us, Reviews & Field Reels, Footer)
    - `--bg-dark-elevated`: `#161F2A` (Review cards and dark media frames)
    - `--text-light`: `#F8FAFC` (Primary headline ink on dark sections)
    - `--text-light-secondary`: `#C6D0DC` (Body copy on dark sections, contrast $\ge 9.2:1$)
  - **AAC Spectrum Accents**:
    - `--aac-blue`: `#14A8E8` (Primary brand highlight on dark surfaces)
    - `--aac-blue-deep`: `#0874A6` (Accessible cyan-blue link/accent on light surfaces, contrast $\ge 4.9:1$)
    - `--aac-red`: `#E53924` (Active nav indicator, Step `01`, `Licensed` highlight)
    - `--aac-green`: `#48B649` (Step `02`, `Clear` highlight)
    - `--aac-yellow`: `#F5B800` (5-star rating & `High-Quality` highlight)

## Typography & Scannable Hierarchy
- **Font Pairings**:
  - `--font-display`: `'Schibsted Grotesk', -apple-system, BlinkMacSystemFont, sans-serif` — bold, clean geometric grotesque matching the reference layout (`700`–`800` weights, tight `-0.025em` tracking).
  - `--font-sans`: `'Public Sans', -apple-system, BlinkMacSystemFont, sans-serif` — clean, high-legibility body and UI typography.
  - `--font-mono`: `'JetBrains Mono', monospace` — used for license numbers, square footage, and stage indices.
- **Scale & Hierarchy Guardrails**:
  - All functional UI text is $\ge 0.85\text{rem}$ (`13.6px`).
  - Strict `h1 -> h2 -> h3` semantic hierarchy without skipped levels.

## Layout, Spatial Architecture & Focal Points
- **Hero Section**: Full-bleed real AAC project photography with a dark left reading scrim, bold `Quality Paint. Lasting Results.` headline, solid white rectangular CTA (`GET A FREE ESTIMATE →`), interactive backdrop story switcher (allowing visitors to toggle the hero photo between AAC's real Exterior, Epoxy, Commercial, and Interior jobs), and the full-width 4-color AAC spectrum bar along the bottom edge.
- **Wide Side-by-Side Before & After Story Rows**:
  - Large 7-column interactive Before/After slider on the left (`BEFORE` and `AFTER` dark corner labels + circular white `< >` center drag handle) paired with a 5-column story & multi-stage documentary strip on the right.
- **Floating White Estimate Card on Dark Paint-Tray Backdrop**:
  - Bottom conversion section features a dark atmospheric jobsite/paint-roller backdrop with `Ready to Transform Your Space?` on the left and a crisp white floating estimate form card on the right.
