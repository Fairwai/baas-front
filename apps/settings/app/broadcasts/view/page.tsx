import { getAuthSession } from "@repo/shared/auth/session"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { cache } from "react"
import { ViewContents } from "@/components/broadcasts/content/view-contents"
import { PageTitle } from "@/components/page-title"
import { getBroadcastTypes } from "@/lib/api/broadcast-type-api"
import { isMeetingBaasUser } from "@/lib/app-utils"

// Cache the getBroadcastTypes call
const getCachedBroadcastTypes = cache(getBroadcastTypes)

export default async function ViewContentsPage() {
  const requestCookies = await cookies()
  // RSCs need to pass cookies to getAuthSession
  const [session, broadcastTypes] = await Promise.all([
    getAuthSession(requestCookies.toString()),
    getCachedBroadcastTypes()
  ])

  const isMeetingBaas = isMeetingBaasUser(session?.user?.email)

  if (!isMeetingBaas) {
    redirect("/")
  }

  return (
    <>
      <PageTitle title="View Contents" description="View all content blocks." />
      <ViewContents broadcastTypes={broadcastTypes} />
    </>
  )
}
