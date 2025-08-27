"use client"

import { Button } from "@repo/shared/components/ui/button"
import { Input } from "@repo/shared/components/ui/input"
import { Label } from "@repo/shared/components/ui/label"
import { Check, Copy, Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface ApiKeyProps {
  apiKey: string
}

export function ApiKey({ apiKey }: ApiKeyProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(apiKey)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error("Error copying API key to clipboard", err)
      toast.error("Failed to copy API key. Please try again.")
    }
  }

  return (
    <div>
      <Label htmlFor="api-key" className="mb-2 font-medium">
        Your API Key:
      </Label>
      <div className="relative">
        <Input
          type={isVisible ? "text" : "password"}
          value={apiKey}
          readOnly
          className="pr-20"
          id="api-key"
        />
        <div className="-translate-y-1/2 absolute top-1/2 right-0 flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleVisibility}
            aria-label={isVisible ? "Hide API key" : "Show API key"}
          >
            {isVisible ? <EyeOff /> : <Eye />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={copyToClipboard}
            aria-label={isCopied ? "Copied to clipboard" : "Copy API key to clipboard"}
          >
            {isCopied ? <Check className="stroke-primary" /> : <Copy />}
          </Button>
        </div>
      </div>
    </div>
  )
}
