"use client"

import type { Session } from "@repo/shared/auth/types"
import Footer from "@repo/shared/components/layout/footer"
import Header from "@repo/shared/components/layout/header"
import { SidebarInset } from "@repo/shared/components/ui/sidebar"
import { useSession } from "@repo/shared/hooks/use-session"
import { SETTINGS_URL } from "@repo/shared/lib/external-urls"
import AppSidebar from "@/components/sidebar"
import { isMeetingBaasUser } from "@/lib/app-utils"

interface LayoutRootProps {
  session: Session
  children: React.ReactNode
}

export default function LayoutRoot({ children, session: initialSession }: LayoutRootProps) {
  const session = useSession(initialSession)

  if (!session) {
    return null
  }

  const meetingBaasUser = isMeetingBaasUser(initialSession?.user?.email)

  return (
    <div className="[--header-height:calc(theme(spacing.12))]">
      <Header
        user={session.user}
        currentPath={SETTINGS_URL}
        headerClassName="-translate-x-1/2 fixed top-0 left-1/2 z-50"
      />
      <div className="flex min-h-svh flex-1">
        <AppSidebar meetingBaasUser={meetingBaasUser} />
        <SidebarInset className="mt-[var(--header-height)]">
          <div className="flex grow flex-col p-4 md:p-10">{children}</div>
          <Footer title="Settings" />
        </SidebarInset>
      </div>
    </div>
  )
}
