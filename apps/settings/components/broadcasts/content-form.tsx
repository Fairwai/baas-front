"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@repo/shared/components/ui/button"
import { Form } from "@repo/shared/components/ui/form"
import { useQueryClient } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { FormFields } from "@/components/broadcasts/content/form-fields"
import { saveContent } from "@/lib/api/broadcast-api"
import type { EmailType } from "@/lib/email-types"
import { type ContentFormValues, contentFormSchema } from "@/lib/schemas/content"

interface ContentFormProps {
  broadcastTypes: EmailType[]
}

export function ContentForm({ broadcastTypes }: ContentFormProps) {
  const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const form = useForm<ContentFormValues>({
    resolver: zodResolver(contentFormSchema),
    defaultValues: {
      emailType: "",
      content: "",
      contentText: ""
    }
  })

  const onSubmit = async (data: ContentFormValues) => {
    setIsLoading(true)
    try {
      await saveContent(data)
      toast.success("Content saved successfully")
      queryClient.invalidateQueries({ queryKey: ["contents"] })
      router.push("/broadcasts/view")
    } catch (error) {
      console.error(error)
      toast.error("Failed to save content")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormFields broadcastTypes={broadcastTypes} />
        <div className="flex justify-end">
          <Button
            type="submit"
            className="w-full md:w-auto"
            disabled={isLoading}
            aria-disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" /> Saving...
              </>
            ) : (
              "Save Content"
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
