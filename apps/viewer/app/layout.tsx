import "@/app/globals.css"
import { getAuthAppUrl } from "@repo/shared/auth/auth-app-url"
import { getAuthSession } from "@repo/shared/auth/session"
import { Toaster } from "@repo/shared/components/ui/sonner"
import type { Metadata, Viewport } from "next"
import { Sofia_Sans } from "next/font/google"
import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"
import { cache } from "react"
import LayoutRoot from "@/app/layout-root"
import Providers from "@/components/providers"

const sofiaSans = Sofia_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"]
})

export const metadata: Metadata = {
  title: "Viewer | Meeting BaaS",
  description: "Access your Meeting BaaS recordings"
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
}

const authAppUrl = getAuthAppUrl()
const getCachedAuthSession = cache(getAuthSession)

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const [requestHeaders, requestCookies] = await Promise.all([headers(), cookies()])
  // RSCs need to pass cookies to getAuthSession
  const session = await getCachedAuthSession(requestCookies.toString())
  const jwt = requestCookies.get("jwt")?.value || ""

  if (!session) {
    const redirectTo = requestHeaders.get("x-redirect-to")
    const redirectionUrl = redirectTo
      ? `${authAppUrl}/sign-in?redirectTo=${redirectTo}`
      : `${authAppUrl}/sign-in`
    redirect(redirectionUrl)
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sofiaSans.className} flex min-h-screen flex-col antialiased`}>
        <Providers jwt={jwt}>
          <LayoutRoot session={session}>{children}</LayoutRoot>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
