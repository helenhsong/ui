# ProjectHeader

The header every project page at `helenhsong.com/<project>/` shares: a link home on the left and a link to the project's rendered README child page on the right.

It is portfolio chrome for the `helen-build` workflow only. Standalone prototypes, interview challenges and client demos do not include it.

## What the consumer provides

- `readme`: the project's raw README.md Markdown. Without it, only the home link shows.
- Optional labels: `homeHref` (default `https://helenhsong.github.io/`), `homeLabel` (`helenhsong.com`), `openLabel` (`README`), `closeLabel` (`[close]`).
- Open state: uncontrolled with `defaultOpen`, or controlled with `open` and `onOpenChange`. The URL drives it too: a path ending in `/readme/` opens the panel, and toggling pushes `<project>/readme/` or `<project>/`.
- `className`: e.g. `bg-transparent` when the page paints its own backdrop.

## Behaviour

- Place it first on the page. It reserves `header-height` (66px) in flow; the bar itself is fixed to the top.
- When open, the README panel covers the page with a 94% veil and a 28px blur, and sets `data-ph-open` on `<html>` so a page's own backdrop can react (`:root[data-ph-open] .my-backdrop { … }`).
- Markdown is rendered with `marked` (GFM) and sanitised with DOMPurify.

## Colour on custom backgrounds

Set `--project-bg` to whatever the page paints behind the header (a colour, or the dominant colour of a shader or image). The labels and README text then compute a darker shade of the same hue: `--project-muted-fg` lands 0.444 lightness below the background (exactly `muted-foreground` on white) and `--project-fg` 0.855 below (exactly `foreground` on white). On cyworld's #E8E0F2 these resolve to about #67507E (5.4:1) and #04000E (16:1). To pin a colour, or to support browsers without relative colour syntax, set `--project-muted-fg` or `--project-fg` directly.

## Don't

- Don't reproduce or override its padding, gutters or breakpoints (`header-gutter`, `readme-gutter`, `gutter-narrow`).
- Don't hide your own content when the README opens; the panel already covers it.
