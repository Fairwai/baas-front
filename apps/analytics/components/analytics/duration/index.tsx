import { DurationDistributionCard } from "@/components/analytics/duration/duration-distribution-card"
import { DurationPlatformCard } from "@/components/analytics/duration/duration-platform-card"
import { DurationTimelineCard } from "@/components/analytics/duration/duration-timeline-card"
import { ErrorDistributionPopover } from "@/components/analytics/error-distribution-popover"
import type { ErrorDistribution } from "@/lib/types"

interface DurationProps {
  errorDistributionData: ErrorDistribution[]
}

export default function Duration({ errorDistributionData }: DurationProps) {
  return (
    <>
      <div className="flex md:justify-end">
        <ErrorDistributionPopover errorDistributionData={errorDistributionData} />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <DurationTimelineCard />
        <DurationPlatformCard />
        <DurationDistributionCard />
      </div>
    </>
  )
}
