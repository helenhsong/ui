# Button

Displays a button, or a component that looks like a button, built on Base UI's Button with shadcn `base-nova` variants.

## When to use

- `default` (`primary` fill): the one main action in a view.
- `secondary`: supporting actions beside the main one.
- `outline`: neutral actions in toolbars and catalog panels ("View code").
- `ghost`: low-emphasis actions inside dense UI; no resting fill.
- `destructive`: deleting or discarding. Red text on a 10% red tint, never a solid red fill.
- `link`: an action that should read as inline text.

## What the consumer provides

- `children`: the label, and optionally an inline `<svg>`. Icons are sized for you (16px; 12px at `xs`, 14px at `sm`). Mark a leading or trailing icon with `data-icon="inline-start"` or `data-icon="inline-end"` to tighten the padding on that side.
- `variant` and `size` (defaults: `default`, `default`). Sizes `xs` 28px, `sm` 32px, `default` 36px, `lg` 44px tall (default and lg are CDS Dense's compact and default buttons); `icon-xs` 28, `icon-sm` 32, `icon` 36 and `icon-lg` 40px are square for icon-only buttons, which need an `aria-label`. Labels are 14/20 medium (`base-headline`); `xs` uses 11/16.
- `className` merges over the variant classes with `cn()`; any native button attribute passes through.

## Do and don't

- Do keep labels short and in sentence case.
- Do use `disabled` (50% opacity, no pointer events); use `focusableWhenDisabled` when a disabled button must stay reachable by keyboard.
- Don't restyle colours with `className`; pick a variant.
- Don't place two `default` buttons side by side.
