import { Button } from "@repo/shared/components/ui/button"
import { cn } from "@repo/shared/lib/utils"
import type { Column } from "@tanstack/react-table"
import { SortIcon } from "@/components/app-ui/sort-icon"

const sortButtonClasses = "p-0 hover:bg-transparent dark:hover:bg-transparent"

export function SortableHeader({
  column,
  title,
  isNumber,
  centered = false
}: {
  // biome-ignore lint/suspicious/noExplicitAny: Column type can be anything
  column: Column<any, any>
  title: string
  isNumber?: boolean
  centered?: boolean
}) {
  return (
    <div className={cn("flex justify-start", centered && "justify-center")}>
      <Button
        variant="ghost"
        className={sortButtonClasses}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        type="button"
        aria-label={`Sort by ${title}`}
      >
        {title}
        <SortIcon isSorted={column.getIsSorted()} isNumber={isNumber} />
      </Button>
    </div>
  )
}
