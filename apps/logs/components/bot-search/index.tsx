"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@repo/shared/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@repo/shared/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@repo/shared/components/ui/form"
import { Input } from "@repo/shared/components/ui/input"
import { Loader2, Search, X } from "lucide-react"
import { motion } from "motion/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { SearchResult } from "@/components/bot-search/search-result"
import type { FormattedBotData } from "@/components/logs-table/types"
import { fetchLogs } from "@/lib/api"
import { getPlatformFromUrl } from "@/lib/format-logs"
import { type BotSearchFormData, botSearchSchema } from "@/lib/schemas/bot-search"

export function BotSearch() {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [searchStarted, setSearchStarted] = useState(false)
  const [data, setData] = useState<FormattedBotData | null>(null)

  const form = useForm<BotSearchFormData>({
    resolver: zodResolver(botSearchSchema),
    defaultValues: {
      bot_uuid: ""
    }
  })

  const onSubmit = async (data: BotSearchFormData) => {
    if (isLoading) return

    setIsLoading(true)
    setSearchStarted(true)
    try {
      const response = await fetchLogs({
        bot_uuid: data.bot_uuid,
        limit: 1,
        offset: 0,
        search: true
      })
      if (response.bots.length === 0) {
        setData(null)
        return
      }
      const formattedBot: FormattedBotData = {
        ...response.bots[0],
        platform: getPlatformFromUrl(response.bots[0].meeting_url)
      }

      setData(formattedBot)
    } catch (error) {
      console.error("error searching using bot uuid", error)
      toast.error("Error searching using bot uuid.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDialogClose = (open: boolean) => {
    setOpen(open)
    form.reset(
      { bot_uuid: "" },
      { keepDirty: false, keepErrors: false, keepTouched: false, keepValues: true }
    )
    setData(null)
    setSearchStarted(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="h-auto p-0 text-muted-foreground text-sm"
          aria-label="Search by Bot UUID"
        >
          Click here to search by Bot UUID
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Search by Bot UUID</DialogTitle>
          <DialogDescription>Enter a bot UUID to find a specific log</DialogDescription>
        </DialogHeader>
        <motion.div
          initial={{ height: "auto" }}
          animate={searchStarted ? { height: "45svh" } : { height: "auto" }}
          transition={{
            type: "spring",
            ease: "easeIn",
            stiffness: 80,
            damping: 20,
            duration: 0.1
          }}
          className="flex flex-col"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex">
              <FormField
                control={form.control}
                name="bot_uuid"
                render={({ field }) => (
                  <FormItem className="relative grow">
                    <FormControl>
                      <Input placeholder="Search" {...field} className="rounded-r-none pr-8" />
                    </FormControl>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-0 right-0 py-0.5"
                      onClick={() => {
                        form.reset()
                      }}
                      disabled={!field.value}
                      aria-label="clear search"
                    >
                      <X />
                    </Button>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="rounded-l-none" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="animate-spin" aria-label="Searching..." />
                ) : (
                  <Search aria-label="Search" />
                )}
              </Button>
            </form>
          </Form>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{
              delay: 0.2
            }}
            className="overflow-y-auto pr-4"
          >
            <SearchResult searchStarted={searchStarted} isLoading={isLoading} data={data} />
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
