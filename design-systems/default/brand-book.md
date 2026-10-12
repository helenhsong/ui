# Default system: brand book

Neutral product UI built from vendored shadcn components (`base-nova` style) and Base UI behaviour. Use the exported components before creating equivalents; keep product-specific layout and visual experiments in the consuming project, and promote a pattern here only once it is reused or is intentionally part of the system.

## Principles

- **Neutral first.** Every surface, text and action colour is an achromatic grey. The only hues are `destructive` (red) and, in dark, `sidebar-primary` (blue). Do not introduce brand colour through components; a project that wants colour paints its own background and lets the shared chrome adapt (see ProjectHeader).
- **One small type size, set apart by weight.** Interface text sits at 14/20 (`cds-headline` medium on controls, `cds-body` regular for values and copy), with 11/16 (`cds-label-1`, `cds-label-2`) for field labels, tags and helper text; hierarchy comes from weight and from `foreground` versus `muted-foreground`, not from large size jumps.
- **One control height.** Buttons, inputs, selects, toggles and segmented tabs are 36px (`cds-control-height`); large buttons and line tabs are 44px (`cds-control-height-lg`). Sizing follows the CDS Dense scale.
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
- CDS palette: every colour variable from the CDS Styles file is available on top of these tokens, prefixed `cds-`: hue ramps (`cds-blue-0` … `cds-blue-100`, likewise gray, indigo, purple, pink, red, orange, yellow, green, teal), semantic colours (`cds-palette-primary`, `cds-palette-foreground-muted`, `cds-palette-negative`…), interaction states (`cds-states-primary-hovered`…) and illustration colours. Semantic ones alias the ramps, as in CDS. In the package they are CSS variables (`var(--cds-blue-60)`) and Tailwind colours (`bg-cds-blue-60`). Components keep this system's own colour tokens; reach for `cds-` colours for brand moments, charts and illustration, not to restyle a component.

## Type

- Sans is **Inter** (`sans`, also `heading`). It is not bundled: load it yourself (Google Fonts, next/font) or it falls back to `ui-sans-serif, system-ui`.
- **iA Writer Mono V** Regular (`label`) is bundled and used only for ProjectHeader's two links (`header-label`, 12px / 150%). It is SIL OFL licensed.
- Interface scale: `text-2xl` page titles, `text-lg` section titles, `text-sm` body. Components follow the CDS Dense scale (group "CDS (Dense)"): `cds-headline` 14/20 medium for button, tab, menu-item, chip and table-header labels; `cds-body` 14/20 for input values, checkbox and switch labels and table cells; `cds-label-1` 11/16 medium for stacked field labels, badges and banner titles; `cds-label-2` 11/16 for helper and error text, card descriptions and banner body; `cds-title-3` 17/24 medium for alert dialog titles.
- Long-form README text: everything at 14px / 160% (`readme-body`, `readme-heading`, `readme-strong`); headings never grow, they only take weight 500 and the stronger colour. Code uses the system mono stack at 0.9em (`readme-code`) on `muted`.

## Spacing and layout

- Spacing is Tailwind's 4px scale (`spacing` = 0.25rem), on the CDS Dense steps (`cds-space-1` 8px, `cds-space-2` 12px, `cds-space-3` 16px, `cds-space-4` 20px). Button: 36px tall, `button-padding-x` 12px, `button-gap` 8px; large 44px with 20px and 12px. Inputs and selects: 36px, 12px side padding; textareas 12px all round. Stacked fields: label 6px above the control. Menus and select lists: items 8px by 12px. Modals and popovers: 16px body; modal footers 12px by 16px with 12px between buttons. Tables: cells 8px by 16px.
- Project pages: ProjectHeader reserves `header-height` (66px). Above 420px it pads `header-gutter` 32px by `header-padding-y` 24px and the README uses `readme-gutter` 30px; at 420px and below both use `gutter-narrow` 20px. The README column is at most `readme-width` 500px with `readme-padding-y` 72px. Consumers must not reproduce or override these rules.

## Radii

`radius` (0.625rem) is the base; `radius-sm` to `radius-4xl` are fixed multiples of it (0.6× to 2.6×). Buttons and cards use `radius-lg`; small button sizes cap at `radius-md`. In README text, inline code takes `radius-code` (4px) and pre blocks and images `radius-block` (8px).

## Motion

Transitions use Tailwind's default 150 ms `cubic-bezier(0.4, 0, 0.2, 1)`. Buttons nudge down 1px on press. The README panel fades in over 240 ms and lifts out over 140–160 ms. Under `prefers-reduced-motion: reduce` all of it is switched off.

## Iconography

Icons are **Lucide** (`lucide-react`), the shadcn config's icon library; components draw their own chevrons, checks and close marks from it. Put a Lucide icon or inline `<svg>` inside a Button; it is sized to 16px (`cds-icon-m`) automatically (12–14px in the small sizes) and inherits the label colour. There is no logo in the repository: set the name `helenhsong.com` in plain type.

## Components

Every shadcn/ui Base UI component is vendored in the `base-nova` style and exported from `@helenhsong/ui`. Use them before building your own.

- **Actions:** Button (six variants, eight sizes: 28, 32, 36 and 44px tall, square icon sizes 28 to 40px), ButtonGroup, Toggle, ToggleGroup.
- **Forms:** Input, Textarea, Checkbox, RadioGroup, Switch, Slider, Select, NativeSelect, Combobox, Field, Label, InputGroup, InputOTP, Calendar.
- **Overlays:** Dialog, AlertDialog, Sheet, Drawer, Popover, HoverCard, Tooltip, DropdownMenu, ContextMenu, Menubar, Command.
- **Navigation:** Breadcrumb, NavigationMenu, Pagination, Tabs, Sidebar.
- **Data display:** Table, Card, Badge, Avatar, Chart, Carousel, Item, Kbd, Accordion, Collapsible, Separator, AspectRatio, ScrollArea, Resizable.
- **Feedback:** Alert, Toast, Sonner (exported as `SonnerToaster`), Progress, Spinner, Skeleton, Empty.
- **Chat:** Attachment, Bubble, Message, MessageScroller, Questionnaire, Marker.
- **Utilities:** Direction (`DirectionProvider` for right-to-left layouts) and the `useIsMobile` hook.
- **ProjectHeader**: shared portfolio chrome for pages at `helenhsong.com/<project>/`, reserved for the `helen-build` workflow. Do not include it in standalone prototypes.

Consumers install `github:helenhsong/ui`, import from `@helenhsong/ui` and load `@helenhsong/ui/style.css` once. Tailwind is compiled away, so consuming apps need no Tailwind setup.

## Not synced

From `helenhsong/ui` at `main@36ef3c2`, reskinned with the CDS Components and CDS Styles (Variables) Figma files in their Dense mode:

- **Skipped:** `--project-bg` (a per-project override hook, not a palette entry), the computed `--project-fg` / `--project-muted-fg` (relative colour, not tokens), and Tailwind's `@theme inline` aliases (`--color-*`), which only point at the colours above.
- **Converted:** the radius scale's `calc()` values are stored as their results, so editing `radius` here does not move the other steps.
- **Not taken from CDS:** its radii (this system's are kept), its colours on components (kept; CDS colours are added as `cds-` tokens), its Coinbase typefaces (Inter is kept) and its Normal mode. Two measures deliberately differ: stacked field labels sit 6px above the control (CDS: 8px) and badges keep 6px side padding (CDS tags: 4px) to suit the pill radius.
- **No CDS counterpart, sized to match:** Calendar day cells are 36px; other components without a CDS twin are unchanged.
- **Not bundled:** Inter (load it yourself). No logos exist in the repository.
- **Components:** all are built from the repository's own code into one bundle, and every preview is live. Previews other than Button, ProjectHeader and the hand-written Sonner, Direction and MessageScroller demos run shadcn's own docs demos. Their stylesheet also carries the demos' layout classes. Photos in the AspectRatio and Attachment demos load from the web and may not show here.
