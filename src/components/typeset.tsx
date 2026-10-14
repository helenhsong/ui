import * as React from "react"
import { cn } from "cn"

type TypesetProps = React.ComponentProps<"article">

function Typeset({ className, ...props }: TypesetProps) {
  return <article className={cn("typeset", className)} {...props} />
}

export { Typeset }
export type { TypesetProps }
