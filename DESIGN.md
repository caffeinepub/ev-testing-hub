# Design Brief

**Purpose**: Industrial EV testing dashboard for 2-3 wheeler performance tracking. Mission-critical role-based access (Admin, Rider, Analyst). OPG Mobility branding on all exports.

**Tone**: Refined industrialism with technical confidence. Precision > decoration. Dark-mode primary for monitoring context.

**Differentiation**: Electric teal primary color + geometric precision + dense information architecture = premium vehicle testing platform.

## Color Palette

| Token | Light OKLCH | Dark OKLCH | Usage |
|-------|-----------|-----------|-------|
| Primary | 0.55 0.15 230 | 0.55 0.15 230 | Electric teal: CTA, active states, highlights |
| Accent | 0.72 0.18 110 | 0.72 0.18 110 | Lime-green: alerts, critical issues, energy indicators |
| Destructive | 0.55 0.24 25 | 0.55 0.24 25 | Warning red: errors, critical issues, safety |
| Background | 0.095 0 0 | 0.095 0 0 | Deep charcoal (dark mode optimized) |
| Foreground | 0.92 0 0 | 0.92 0 0 | Off-white text for contrast |
| Card | 0.14 0 0 | 0.14 0 0 | Elevated card surfaces |
| Muted | 0.22 0 0 | 0.22 0 0 | Secondary text, disabled states |
| Border | 0.22 0 0 | 0.22 0 0 | Subtle 1px dividers |

## Typography

| Role | Font | Scale | Usage |
|------|------|-------|-------|
| Display | Space Grotesk 700 | 32px / 24px | Headers, role labels, critical metrics |
| Body | General Sans 400 | 14px / 16px | Form inputs, data tables, descriptions |
| Mono | JetBrains Mono 400 | 12px | Numeric values, timestamps, IDs |

## Structural Zones

| Zone | Surface | Border | Depth | Notes |
|------|---------|--------|-------|-------|
| Header | `bg-sidebar` 0.12L | `border-sidebar-border` | Elevated | OPG Mobility logo + user role badge |
| Sidebar | `bg-sidebar` 0.12L | `border-sidebar-border` | Same as header | Role-based nav (Admin/Rider/Analyst) |
| Main Content | `bg-background` 0.095L | None | Recessed | Data grids, forms, charts |
| Data Cards | `bg-card` 0.14L | `border-border` | Lifted | `.data-card` utility: hover state lifts with primary border + shadow-card |
| Critical Issues Panel | `bg-card` 0.14L | 2px `border-accent` | Elevated | `.critical-panel` utility: top 5 issues highlighted with lime-green accent |
| Footer | `bg-sidebar` 0.12L | `border-t border-sidebar-border` | Same as header | OPG Mobility branding, export controls (Admin only) |

## Spacing & Rhythm

- **Padding**: 16px (cards), 24px (sections), 12px (inline elements)
- **Gap**: 16px (grid items), 8px (compact lists)
- **Rhythm**: 8px base unit. Headers 32px top margin, sections 24px bottom margin.

## Component Patterns

- **Data Cards**: `.data-card` utility with rounded-lg (12px), subtle border, hover→primary border + shadow-card lift
- **Badges**: `.badge-success` (green tint), `.badge-warning` (red tint) for status indicators
- **Forms**: Input `bg-input` 0.18L, label `text-foreground` 0.92L, focus `ring-primary`
- **Tables**: Striped rows alternating `bg-background` / `bg-card/50`, header `bg-card` text-accent
- **Charts**: Use `chart-1` (teal), `chart-2` (lime), `chart-3` (red), `chart-4` (cyan), `chart-5` (purple)

## Motion

- **Transitions**: `.transition-smooth` (0.3s cubic-bezier) for all interactive elements
- **Subtle Animation**: `.animate-pulse-subtle` (2s) for live data indicators
- **No bounce/overshoot**: Preference for easing-out motions (professional monitoring context)

## Constraints

- **No gradients or blur effects**: Clarity over decoration
- **No shadows > card level**: One hierarchy through depth and color only
- **Monochrome text**: No color gradients on text
- **High contrast**: AA+ everywhere (teal 0.55L on background 0.095L = valid; red 0.55L on background = valid)

## Signature Detail

Electric teal primary (`0.55 0.15 230`) paired with lime-green accents (`0.72 0.18 110`) creates a distinctly modern EV brand identity. Precision geometry (0px on data, 12px on cards) reinforces technical discipline. Dark mode optimized for 24/7 monitoring dashboards.
