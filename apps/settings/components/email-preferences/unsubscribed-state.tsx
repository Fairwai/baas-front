"use client"

import { Button } from "@repo/shared/components/ui/button"
import { Card, CardContent } from "@repo/shared/components/ui/card"
import type { DomainConfig } from "@/lib/email-types"

interface UnsubscribedStateProps {
  domainConfig: DomainConfig
  onResubscribe: () => void
}

export const UnsubscribedState = ({ domainConfig, onResubscribe }: UnsubscribedStateProps) => {
  return (
    <Card className="mb-6 text-center text-muted-foreground">
      <CardContent>
        <p className="mb-1">You've unsubscribed from all optional {domainConfig.name} emails.</p>
        <Button
          variant="link"
          type="button"
          onClick={() => onResubscribe()}
          aria-label={`Resubscribe to ${domainConfig.name} emails`}
        >
          Resubscribe
        </Button>
      </CardContent>
    </Card>
  )
}
