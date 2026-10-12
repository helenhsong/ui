import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cva } from "class-variance-authority"
import { cn } from "cn"

// A text input modelled on the CDS Text Input: an optional small label
// (11/16 medium) with a required asterisk, start and end content, a text
// suffix, helper text, positive/negative states, read-only and compact
// (label inside the field) variants. Colours and sizes follow CDS (via the
// base- tokens); the border radius and the focus ring are shadcn's.
//
// With none of the field props it renders a bare <input>, so it still drops
// into InputGroup, Sidebar and anywhere else a plain input is expected.

type InputState = "default" | "positive" | "negative"

// The visible box: border, fill, height, padding, focus ring.
const inputControlVariants = cva(
  "rounded-lg border bg-base-palette-background text-base-palette-foreground transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 has-[input:focus-visible]:border-ring has-[input:focus-visible]:ring-3 has-[input:focus-visible]:ring-ring/50 data-[state=default]:border-base-palette-line-heavy/66 data-[state=negative]:border-base-palette-negative data-[state=positive]:border-base-palette-positive data-read-only:bg-base-palette-secondary",
  {
    variants: {
      compact: {
        false: "h-11 px-3 py-3",
        true: "h-9 px-3 py-2",
      },
    },
    defaultVariants: { compact: false },
  }
)

const inputTextClasses =
  "w-full min-w-0 bg-transparent text-base leading-5 outline-none md:text-sm placeholder:text-base-palette-foreground-muted file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground data-[align=end]:text-right disabled:cursor-not-allowed"

const labelClasses = "text-[11px] leading-4 font-medium text-base-palette-foreground"

interface InputProps extends Omit<React.ComponentProps<"input">, "size"> {
  /** Small label (11/16 medium). Above the field, or inside it when `compact`. */
  label?: React.ReactNode
  /** Show the label. When false the label still names the input for screen readers. */
  showLabel?: boolean
  /** Helper ("assistive") text under the field; takes the state colour. */
  helperText?: React.ReactNode
  /** Show the helper text. */
  showHelperText?: boolean
  /** Content before the value, usually an icon (16px). */
  start?: React.ReactNode
  /** Content after the value, usually an icon (16px). */
  end?: React.ReactNode
  /** Text after the value, e.g. a currency or unit ("USD"). */
  suffix?: React.ReactNode
  /** 36px field with the label inside it, instead of 44px with the label above. */
  compact?: boolean
  /** Positive or negative validation state (border and helper text). `aria-invalid` also means negative. */
  state?: InputState
  /** Right-align the value, for numbers and amounts. */
  rightAligned?: boolean
  /** Classes for the outer wrapper (label + field + helper text). */
  wrapperClassName?: string
}

function Input({
  className,
  type,
  label,
  showLabel = true,
  helperText,
  showHelperText = true,
  start,
  end,
  suffix,
  compact = false,
  state,
  rightAligned = false,
  required,
  readOnly,
  disabled,
  id,
  wrapperClassName,
  ...props
}: InputProps) {
  const autoId = React.useId()
  const inputId = id ?? autoId
  const helperId = `${inputId}-helper`
  const invalid = props["aria-invalid"] === true || props["aria-invalid"] === "true"
  const resolvedState: InputState = state ?? (invalid ? "negative" : "default")

  const hasField =
    label != null || helperText != null || start != null || end != null || suffix != null || compact

  if (!hasField) {
    return (
      <InputPrimitive
        type={type}
        id={id}
        data-slot="input"
        data-state={resolvedState}
        data-align={rightAligned ? "end" : undefined}
        data-read-only={readOnly ? "" : undefined}
        required={required}
        readOnly={readOnly}
        disabled={disabled}
        aria-invalid={resolvedState === "negative" || undefined}
        className={cn(
          inputControlVariants({ compact: false }),
          inputTextClasses,
          "h-9 py-2 disabled:pointer-events-none disabled:opacity-38",
          className
        )}
        {...props}
      />
    )
  }

  const labelNode =
    label != null ? (
      <label
        htmlFor={inputId}
        data-slot="input-label"
        className={cn(labelClasses, !showLabel && "sr-only", compact && "shrink-0")}
      >
        {label}
        {required && (
          <span aria-hidden="true" className="text-base-palette-negative">
            *
          </span>
        )}
      </label>
    ) : null

  const showHelper = helperText != null && showHelperText

  return (
    <div
      data-slot="input-field"
      data-state={resolvedState}
      data-disabled={disabled ? "" : undefined}
      className={cn("group/input-field flex w-full min-w-0 flex-col gap-1.5 data-disabled:opacity-38", wrapperClassName)}
    >
      {!compact && labelNode}
      <div
        data-slot="input-control"
        data-state={resolvedState}
        data-read-only={readOnly ? "" : undefined}
        className={cn(
          inputControlVariants({ compact }),
          "flex items-center gap-3 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
          compact && "gap-2"
        )}
      >
        {compact && labelNode}
        {start != null && (
          <span data-slot="input-start" className="flex items-center text-base-palette-foreground-muted">
            {start}
          </span>
        )}
        <InputPrimitive
          type={type}
          id={inputId}
          data-slot="input"
          data-align={rightAligned ? "end" : undefined}
          required={required}
          readOnly={readOnly}
          disabled={disabled}
          aria-invalid={resolvedState === "negative" || undefined}
          aria-describedby={showHelper ? helperId : undefined}
          className={cn(inputTextClasses, "flex-1", className)}
          {...props}
        />
        {suffix != null && (
          <span data-slot="input-suffix" className="shrink-0 text-sm leading-5 text-base-palette-foreground-muted">
            {suffix}
          </span>
        )}
        {end != null && (
          <span data-slot="input-end" className="flex items-center text-base-palette-foreground-muted">
            {end}
          </span>
        )}
      </div>
      {showHelper && (
        <p
          id={helperId}
          data-slot="input-helper"
          className="text-[11px] leading-4 text-base-palette-foreground-muted group-data-[state=negative]/input-field:text-base-palette-negative group-data-[state=positive]/input-field:text-base-palette-positive"
        >
          {helperText}
        </p>
      )}
    </div>
  )
}

export { Input, inputControlVariants }
export type { InputProps, InputState }
