# Base reference system

This directory preserves the former custom token and component guidance under
the `base` name. It is an opt-in reference, not the package default.

Keep `src/base-styles.css` separate from `src/index.css`. Do not import it into
the default package stylesheet, and do not use its spacing or radius values to
override the generated shadcn component classes. Products may use individual
Base colors for brand moments, charts, or illustrations when explicitly
requested.

The active reusable components remain the unmodified shadcn defaults described
by `design-systems/default`. New products select `base-mira` for technical,
data-dense, or enterprise work and `base-maia` otherwise, as directed by the
product-building skills.
