import { Button } from "@repo/shared/components/ui/button"
import { Eye, Pencil, Trash } from "lucide-react"
import { useState } from "react"
import { DeleteContent } from "@/components/broadcasts/content/delete-content"
import { EditContent } from "@/components/broadcasts/content/edit-content"
import { ContentDetailDialog } from "@/components/broadcasts/content-detail-dialog"
import type { Content } from "@/lib/broadcast-types"
import type { EmailType } from "@/lib/email-types"

export type DialogState = "view" | "edit" | "delete" | null

interface TableActionsProps {
  row: Content
  showEditAndDelete?: boolean
  broadcastTypes: EmailType[]
}

export function TableActions({ row, showEditAndDelete, broadcastTypes }: TableActionsProps) {
  const [open, setOpen] = useState<DialogState>(null)

  return (
    <>
      <div className="flex w-full justify-around gap-2">
        <Button
          variant="ghost"
          size="icon"
          aria-label="View content details"
          onClick={() => setOpen("view")}
        >
          <Eye />
        </Button>
        {showEditAndDelete && (
          <>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Edit content"
              onClick={() => setOpen("edit")}
            >
              <Pencil />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-baas-destructive hover:text-baas-destructive"
              aria-label="Delete content"
              onClick={() => setOpen("delete")}
            >
              <Trash />
            </Button>
          </>
        )}
      </div>
      {open === "view" && (
        <ContentDetailDialog content={row.content} open={open} onOpenChange={setOpen} />
      )}
      {open === "edit" && (
        <EditContent broadcastTypes={broadcastTypes} row={row} open={open} onOpenChange={setOpen} />
      )}
      {open === "delete" && <DeleteContent row={row} open={open} onOpenChange={setOpen} />}
    </>
  )
}
