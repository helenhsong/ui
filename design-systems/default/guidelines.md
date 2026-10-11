# Default system

Use the exported components from `@helenhsong/ui` before creating equivalents.
The current component foundation is the `base-nova` shadcn style with Base UI
behavior and CSS-variable tokens from `src/index.css`.

For standalone prototypes, import only the components the product needs and
apply this system's tokens. Do not include `ProjectHeader`; it is shared
portfolio chrome reserved for the `helen-build` workflow.

Keep product-specific layout and visual experimentation inside the consuming
project. Promote a pattern into this repository only after it is reused or is
intentionally part of the system.

