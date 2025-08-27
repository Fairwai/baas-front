import { Badge } from "@repo/shared/components/ui/badge"
import { Button } from "@repo/shared/components/ui/button"
import { cn } from "@repo/shared/lib/utils"
import { X } from "lucide-react"
import { useSelectedErrorContext } from "@/hooks/use-selected-error-context"

interface SelectedErrorBadgeProps {
  label?: string
}

export function SelectedErrorBadge({
  label = "Based on selected error types"
}: SelectedErrorBadgeProps) {
  const { botsFilteredByError, reset } = useSelectedErrorContext()
  return (
    <Badge
      variant="outline"
      className={cn(
        "px-2 py-0.5 text-xs opacity-0 transition-opacity",
        botsFilteredByError && "opacity-100"
      )}
    >
      <span className="truncate">{label}</span>
      <Button
        variant="ghost"
        size="icon"
        className="size-3 hover:bg-transparent hover:text-foreground dark:hover:bg-transparent"
        aria-label="Reset selected error types"
        onClick={() => reset()}
      >
        <X className="size-3" />
      </Button>
    </Badge>
  )
}
