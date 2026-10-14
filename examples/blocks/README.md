# shadcn blocks

This directory vendors every public block in the shadcn `base-nova` registry.
Each block has its own folder so page and component filenames can coexist
without overwriting another block.

- `registry-item.json` is the unmodified upstream registry item.
- `page.tsx` and `components/` are copyable source with imports localized to
  this repository's shared `src/components/ui` primitives.
- `_shared/icon-placeholder.tsx` resolves the registry's icon placeholders to
  the configured Lucide icon library.

Blocks are application patterns, not stable library primitives, so they are
kept as examples and are not exported from `@helenhsong/ui`. Copy the block
you need into an application, or run `npx shadcn add <block-name>` there when
the application has its own shadcn configuration.

The catalog currently includes `dashboard-01`, `login-01` through `login-05`,
`signup-01` through `signup-05`, and `sidebar-01` through `sidebar-16`.
