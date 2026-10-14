# @helenhsong/ui

Shared React component library, built here and consumed directly by other
repos as a git dependency — no npm registry, no publish step.

Built on [shadcn/ui](https://ui.shadcn.com). Registry components are vendored
with their current `base-nova` defaults and exported from this package. Keep
their component styles, Tailwind spacing scale, and shadcn radius mapping
unchanged; layer product- or base-specific styling outside the default
primitives.

## Using it in another repo

```bash
npm install github:helenhsong/ui
```

`npm install` clones this repo, runs its `prepare` script (which builds
`dist/`), and links it in like any other package.

```tsx
import { SomeComponent } from "@helenhsong/ui";
import "@helenhsong/ui/style.css"; // once, e.g. in your app's entry point
```

Tailwind is a build-time detail of this repo, not something consumers
need — `npm run build` compiles it all down to the one plain `style.css`
above, so nothing here requires the consuming app to have Tailwind
configured.

### Pinning a version

Tracking `main` means every consumer picks up changes on their next
`npm install`. To pin, tag a release here:

```bash
git tag v0.1.0 && git push --tags
```

and depend on the tag instead of the branch:

```bash
npm install github:helenhsong/ui#v0.1.0
```

## Design systems

[`design-systems/catalog.json`](design-systems/catalog.json) is the discovery
point for the visual systems available in this repository. Each catalog entry
links to a manifest and guidelines while the reusable implementation remains
in `src/`.

The current `default` system describes the neutral shadcn/Base UI component
library. Its source of truth is the official shadcn `base-nova` registry,
including the default `0.625rem` base radius and generated radius scale. Add
another system when it has a real visual language or component need; do not
override the default system's primitive styles to express a separate system.

The former custom styles are preserved as the separate `base` reference system
under [`design-systems/base`](design-systems/base), with its CSS tokens in
[`src/base-styles.css`](src/base-styles.css). That stylesheet is intentionally
not imported into the package's default `style.css`.

All current registry primitives are exported from `@helenhsong/ui`, together
with the docs-only compositions that are not registry items: a reusable Data
Table, the official Data Table demo, all eight Date Picker examples, and a
`Typeset` wrapper backed by shadcn's full Typeset stylesheet. The ten examples
from shadcn's Area Charts collection are also public exports. The complete
27-block catalog is vendored under [`examples/blocks`](examples/blocks): blocks
are copyable application patterns and intentionally are not package exports.

### Component coverage

- `src/components/ui/` contains the full current `base-nova` registry set plus
  the reusable Data Table composition recommended by the docs.
- `src/components/date-picker-*.tsx` contains Basic, Demo, Date of Birth,
  Input, Natural Language, Range, RTL, and Time variants.
- `src/typeset.css` is the complete shadcn Typeset stylesheet; `Typeset`
  provides its standard `.typeset` wrapper as a package export.
- `src/components/chart-area-*.tsx` contains all ten Area Chart examples.
- `examples/blocks/` contains all 27 public block registry items with their
  source files and registry metadata.

## Setting up a project page

Every repo served at `helenhsong.com/<project>/` starts from the
same template: a blank page with [`ProjectHeader`](src/components/ProjectHeader/ProjectHeader.tsx)
at the top (home link + a link to the project's README child page). Use the
globally installed `$helen-build` skill for the full template and automated
workflow, from scaffolding through deploying to Pages. The skill's source lives
in Helen's private `ai-skills` repository.

`ProjectHeader` owns its responsive layout: above 420px the header uses 32px
horizontal and 24px vertical padding, while its README uses the homepage's
30px content gutter; at 420px and below, both use the homepage's 20px content
gutter. The component does not reserve a scrollbar gutter, so short pages keep
their full width and projects with custom scroll surfaces do not gain a second
gutter. Consumers must not reproduce or override these layout rules.

## Developing in this repo

```bash
npm install
npm run dev        # opens src/dev — a playground for previewing components
```

### Adding a component

```bash
npm run ui:add -- <name>   # e.g. npm run ui:add -- card
```

vendors a shadcn primitive into `src/components/ui/`. Re-export it from
[src/index.ts](src/index.ts) — anything not exported there isn't part of the
public package — and preview it via `src/dev/App.tsx`. Keep the generated
default styling intact; product and alternate-system customization belongs in
the consuming application or a separate design-system layer.

To refresh the full primitive set from the official registry:

```bash
npm run ui:add -- --all --overwrite -y
```

For something fully custom (not a shadcn primitive), build it under
`src/components/<Name>/`, styled with Tailwind utilities and the shared
`cn()` helper from `@/lib/utils`, and export it the same way — see
[`ProjectHeader`](src/components/ProjectHeader/ProjectHeader.tsx) for an
example.

### Scripts

- `npm run dev` — local playground with hot reload
- `npm run build` — builds the publishable package into `dist/`
- `npm run typecheck` — type-checks `src/` without emitting
- `npm run lint` — runs ESLint
- `npm run ui:add -- <component>` — vendors a shadcn primitive into `src/components/ui/`

## Design decisions

- **Distribution**: plain git dependency (via `prepare`), not npm/GitHub Packages — simplest to keep in sync across personal repos with no auth or publish ceremony.
- **Design system**: [shadcn/ui](https://ui.shadcn.com) — vendored primitives, `cva` variants, `cn()` merging — as the foundation to build and tweak components on top of, rather than hand-rolling each one.
- **Styling distribution**: Tailwind is compiled away at build time into one plain `dist/style.css`, not shipped as source. Consumers get a zero-Tailwind-required experience; only this repo's own build needs it.
- **Fonts**: not self-hosted, as a rule — bundling `@fontsource` packages inlined every font file as base64 into the stylesheet (Tailwind's CSS bundler inlines `@font-face` `url()`s regardless of Vite's asset settings), bloating it from ~4KB to ~150KB gzip. Consumers load fonts themselves. The one exception is `iA Writer Mono` (Regular only, for `ProjectHeader`'s header bar): it's [SIL OFL licensed](https://github.com/iaolo/iA-Fonts) so bundling it is fine, and the single weight actually used costs ~50KB gzip (style.css: 5KB → ~55KB) rather than a whole family's worth.
- **Layout**: single package at the repo root. If this grows into several independently-versioned packages, revisit as an npm/pnpm workspace monorepo.
