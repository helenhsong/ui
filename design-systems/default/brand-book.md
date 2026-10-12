# Default system: brand book

Neutral product UI built from vendored shadcn components (`base-nova` style) and Base UI behaviour. Use the exported components before creating equivalents; keep product-specific layout and visual experiments in the consuming project, and promote a pattern here only once it is reused or is intentionally part of the system.

## Principles

- **Neutral first.** Every surface, text and action colour is an achromatic grey. The only hues are `destructive` (red) and, in dark, `sidebar-primary` (blue). Do not introduce brand colour through components; a project that wants colour paints its own background and lets the shared chrome adapt (see ProjectHeader).
- **One small type size, set apart by weight.** Interface text sits at `text-sm` (14px); hierarchy comes from `font-medium` / `font-semibold` and from `foreground` versus `muted-foreground`, not from large size jumps.
- **Quiet chrome.** Hairline `border` and `divider`, no shadows, `radius-lg` corners, short 150 ms transitions.

## Content fundamentals

- Labels are short, plain and lowercase where they name a thing: `helenhsong.com`, `README`, `[close]`. Bracketed words mark a closing action.
- Descriptions are one sentence in sentence case, describing what a thing does ("Displays a button, or a component that looks like a button.").
- No emoji. No marketing tone. Commands and code are set in `code`, e.g. `npm run ui:add -- card`.

## Colour

- Page: `background` ground, `foreground` text. Secondary text: `muted-foreground` on `background` (about 4.7:1 in light).
- Actions: `primary` fill with `primary-foreground` label for the main action; `secondary` / `secondary-foreground` for quieter ones; `destructive` text on a 10% `destructive` tint for dangerous actions.
- Hover and selection: `muted` (outline and ghost buttons), `accent` / `accent-foreground` for highlighted items.
- Lines: `border` on every element by default, `input` for fields, `divider` for the soft hairlines in long-form text. These are decorative and fall below 3:1 by design; do not rely on them alone to mark a control's edge.
- Focus: `ring` at 50%, a 3px ring plus a `ring`-coloured border. The source's light `ring` is under 3:1 on `background`; it is kept exact.
- Data: `chart-1` (lightest) to `chart-5` (darkest), a grey ramp. Add a label or pattern to every series; never tell series apart by shade alone.
- Dark theme: switch with the `.dark` class on an ancestor (the package's `dark:` variants key off it). Border, input and divider become white at 10%, 15% and 6%.

## Type

- Sans is **Inter** (`sans`, also `heading`). It is not bundled: load it yourself (Google Fonts, next/font) or it falls back to `ui-sans-serif, system-ui`.
- **iA Writer Mono V** Regular (`label`) is bundled and used only for ProjectHeader's two links (`header-label`, 12px / 150%). It is SIL OFL licensed.
- Interface scale: `text-2xl` page titles, `text-lg` section titles (both semibold), `text-sm` body and descriptions, `button` / `button-sm` / `text-xs` for button labels (medium).
- Long-form README text: everything at 14px / 160% (`readme-body`, `readme-heading`, `readme-strong`); headings never grow, they only take weight 500 and the stronger colour. Code uses the system mono stack at 0.9em (`readme-code`) on `muted`.

## Spacing and layout

- Spacing is Tailwind's 4px scale (`spacing` = 0.25rem). Button: 32px tall (`h-8`), `button-padding-x` 10px, `button-gap` 6px.
- Project pages: ProjectHeader reserves `header-height` (66px). Above 420px it pads `header-gutter` 32px by `header-padding-y` 24px and the README uses `readme-gutter` 30px; at 420px and below both use `gutter-narrow` 20px. The README column is at most `readme-width` 500px with `readme-padding-y` 72px. Consumers must not reproduce or override these rules.

## Radii

`radius` (0.625rem) is the base; `radius-sm` to `radius-4xl` are fixed multiples of it (0.6× to 2.6×). Buttons and cards use `radius-lg`; small button sizes cap at `radius-md`. In README text, inline code takes `radius-code` (4px) and pre blocks and images `radius-block` (8px).

## Motion

Transitions use Tailwind's default 150 ms `cubic-bezier(0.4, 0, 0.2, 1)`. Buttons nudge down 1px on press. The README panel fades in over 240 ms and lifts out over 140–160 ms. Under `prefers-reduced-motion: reduce` all of it is switched off.

## Iconography

The shadcn config names **Lucide** as the icon library, but the package ships no icons. Put an inline `<svg>` inside a Button; it is sized to 16px automatically (12–14px in the small sizes) and inherits the label colour. There is no logo in the repository: set the name `helenhsong.com` in plain type.

## Components

- **Button**: every clickable action. Six variants, eight sizes.
- **ProjectHeader**: shared portfolio chrome for pages at `helenhsong.com/<project>/`, reserved for the `helen-build` workflow. Do not include it in standalone prototypes.

Consumers install `github:helenhsong/ui`, import from `@helenhsong/ui` and load `@helenhsong/ui/style.css` once. Tailwind is compiled away, so consuming apps need no Tailwind setup.

## Not synced

From `helenhsong/ui` at `main@6b9a30b`:

- **Skipped:** `--project-bg` (a per-project override hook, not a palette entry), the computed `--project-fg` / `--project-muted-fg` (relative colour, not tokens), and Tailwind's `@theme inline` aliases (`--color-*`), which only point at the colours above.
- **Converted:** the radius scale's `calc()` values are stored as their results, so editing `radius` here does not move the other steps.
- **Not bundled:** Inter (load it yourself). No logos or icons exist in the repository.
- **Components:** both are built from the repository's own code into one bundle; the previews are live. `buttonVariants` and `cn` are exported in the bundle but get no card.
