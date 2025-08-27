import Footer from "@repo/shared/components/layout/footer"
import type { Metadata } from "next"
import { Toaster } from "sonner"
import Header from "@/components/header"

export const metadata: Metadata = {
  title: "Pricing | Meeting BaaS",
  description: "Pricing for Meeting BaaS"
}

export default async function PublicLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      <main className="flex grow flex-col">{children}</main>
      <Footer title="Pricing" />
      <Toaster />
    </>
  )
}
