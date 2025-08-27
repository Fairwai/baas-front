"use client"

import { SidebarProvider } from "@repo/shared/components/ui/sidebar"
import { JwtProvider } from "@repo/shared/contexts/jwt-context"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "next-themes"

const queryClient = new QueryClient()

export default function Providers({
  children,
  jwt
}: Readonly<{
  children: React.ReactNode
  jwt: string
}>) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
      <JwtProvider jwt={jwt}>
        <QueryClientProvider client={queryClient}>
          <SidebarProvider className="flex flex-col">{children}</SidebarProvider>
        </QueryClientProvider>
      </JwtProvider>
    </ThemeProvider>
  )
}
