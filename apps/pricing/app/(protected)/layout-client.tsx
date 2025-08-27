"use client"

import type { Session } from "@repo/shared/auth/types"
import Footer from "@repo/shared/components/layout/footer"
import ProtectedHeader from "@repo/shared/components/layout/header"
import { useSession } from "@repo/shared/hooks/use-session"
import { BILLING_URL } from "@repo/shared/lib/external-urls"
import { useRouter } from "next/navigation"

interface ProtectedLayoutClientProps {
  session: Session
  children: React.ReactNode
}

export default function ProtectedLayoutClient({
  children,
  session: initialSession
}: ProtectedLayoutClientProps) {
  const session = useSession(initialSession)
  const router = useRouter()

  if (!session) {
    router.push("/pricing")
    return null
  }

  return (
    <>
      <ProtectedHeader user={session.user} currentPath={BILLING_URL} />
      <main className="flex grow flex-col">{children}</main>
      <Footer title="Billing" />
    </>
  )
}
