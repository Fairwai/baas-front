"use client"

import { Loader2 } from "lucide-react"
import { useMemo } from "react"
import { DataTable } from "@/components/app-ui/data-table"
import { baseContentColumns } from "@/components/broadcasts/content/columns"
import { useContents } from "@/hooks/use-contents"
import type { EmailType } from "@/lib/email-types"

interface ViewContentsProps {
  broadcastTypes: EmailType[]
}

export function ViewContents({ broadcastTypes }: ViewContentsProps) {
  const { contents, isLoadingContents } = useContents()
  const columns = useMemo(() => baseContentColumns(broadcastTypes, true), [broadcastTypes])

  if (isLoadingContents) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="animate-spin stroke-primary" />
      </div>
    )
  }

  return <DataTable columns={columns} data={contents ?? []} noDataMessage="No contents found." />
}
