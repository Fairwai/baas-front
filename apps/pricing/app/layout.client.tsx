"use client"

import { ThemeProvider } from "next-themes"

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
      {children}
    </ThemeProvider>
  )
}
