"use client"

import { Alert, AlertDescription, AlertTitle } from "@repo/shared/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { EmailPreference } from "@/components/email-preferences/email-preference-card"
import type { EmailType } from "@/lib/email-types"

interface AccountSectionProps {
  emailTypes: EmailType[]
  onUnsubscribe: (emailId: string, emailName: string) => void
}

export const AccountSection = ({ emailTypes, onUnsubscribe }: AccountSectionProps) => {
  return (
    <>
      <Alert className="mb-6" variant="warning">
        <AlertCircle className="size-4" />
        <AlertTitle>Required Notifications</AlertTitle>
        <AlertDescription>
          These notifications cannot be disabled for security and billing purposes. You can adjust
          frequency where available.
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        {emailTypes.map((emailType) => (
          <EmailPreference key={emailType.id} emailType={emailType} onUnsubscribe={onUnsubscribe} />
        ))}
      </div>
    </>
  )
}
