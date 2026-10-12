# Input

A text input that carries its own label, helper text and adornments, modelled on the CDS Text Input; only its border radius, focus ring and hover come from shadcn.

## Options (the CDS Text Input's toggles)

| Prop | CDS toggle | What it does |
| --- | --- | --- |
| `label` | label string | Small label, 11/16 medium in `base-palette-foreground`, 6px above the field. |
| `showLabel` (default `true`) | show label | `false` hides the label visually; it still names the input for screen readers. |
| `required` | required | Adds a `base-palette-negative` asterisk after the label and sets `required` on the input. |
| `helperText` | helper text | 11/16 text under the field in `base-palette-foreground-muted`; turns green or red with `state`. |
| `showHelperText` (default `true`) | show helper text | Hides the helper text without removing it from your markup. |
| `start` | show start · start icon | Content before the value, usually a 16px Lucide icon, in the muted colour. |
| `end` | show end · end icon | Content after the value, usually an icon (clear, reveal, calendar). |
| `suffix` | show suffix | Text after the value, such as a currency or unit (`"USD"`). |
| `compact` | compact | 36px field with the label inside it, on the left. Without it the field is 44px with the label above. |
| `state` | state (positive / negative) | Border and helper text in `base-palette-positive` or `base-palette-negative`. `aria-invalid` also gives the negative state. |
| `readOnly` | state (read-only) | `base-palette-secondary` fill. |
| `disabled` | disabled | The whole field at 38% opacity. |
| `rightAligned` | right aligned | Right-aligns the value, for amounts. |
| `wrapperClassName` | | Classes for the outer wrapper (label, field and helper text); `className` goes on the `<input>`. |

Every other `<input>` attribute (`type`, `placeholder`, `value`, `onChange`, `name`, `id`…) passes through. The label is wired to the input, and the helper text to `aria-describedby`.

## Look

- Field: `base-palette-background` fill, 1px `base-palette-line-heavy` border at 66%, 12px padding, `radius-lg` corners, 14/20 value text with a `base-palette-foreground-muted` placeholder.
- Focus is shadcn's: a `ring` border and 3px ring at 50%. The CDS 2px primary-blue active border is not used.

## Use

- Give every input a `label`; use `showLabel={false}` only where the context already names it, like a search bar.
- Prefer `compact` in toolbars, filters and dense tables; use the default in forms.
- With none of the field props, `Input` renders a bare 36px `<input>`, which is what InputGroup and the Sidebar's search use. Field, FieldLabel and FieldDescription still work around a bare Input.
- Write helper text as one short sentence; for errors, say how to fix it ("Use at least 12 characters").
