# Design systems

This directory is the discovery layer for the design systems in
`@helenhsong/ui`.

Start with `catalog.json`, then read the selected system's `system.json` and
`guidelines.md`. Manifests point to the current component, token, and utility
sources without forcing the library into separate packages.

Add a new system only when it has a real visual language or component need.
Keep reusable behavior in the shared component and utility paths; keep a
system's visual decisions in its own tokens, components, and guidelines. If two
systems need fundamentally different component APIs, prefer separate
implementations over a forced shared abstraction.

