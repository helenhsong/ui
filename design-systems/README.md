# Design systems

This directory is the discovery layer for the design systems in
`@helenhsong/ui`.

Start with `catalog.json`, then read the selected system's `system.json` and
`guidelines.md`. A system may also carry `tokens.json` (its colour, type,
spacing and radius tokens), a `brand-book.md`, per-component guides under
`components/`, and an `artifact` link to its live design system in Claude.
Manifests point to the current component, token, and utility sources without
forcing the library into separate packages.

`default` is the active, unmodified shadcn system. `base` preserves the former
custom token and component guidance as an opt-in reference. Its stylesheet is
not imported by the package and cannot override the default primitives.

Add a new system only when it has a real visual language or component need.
Keep reusable behavior in the shared component and utility paths; keep a
system's visual decisions in its own tokens, components, and guidelines. If two
systems need fundamentally different component APIs, prefer separate
implementations over a forced shared abstraction.

