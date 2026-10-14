import type { ComponentType } from "react"
import * as LucideIcons from "lucide-react"

type IconPlaceholderProps = {
  lucide: string
  className?: string
  [key: string]: unknown
}

export function IconPlaceholder({
  lucide,
  className,
}: IconPlaceholderProps) {
  const exportName = lucide.replace(/Icon$/, "")
  const Icon = LucideIcons[
    exportName as keyof typeof LucideIcons
  ] as ComponentType<{ className?: string }> | undefined

  return Icon ? <Icon className={className} /> : null
}
