import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import utc from "dayjs/plugin/utc"

dayjs.extend(utc)
dayjs.extend(relativeTime)

export function isMeetingBaasUser(email?: string) {
  const domain = process.env.NEXT_PUBLIC_BASE_DOMAIN || "meetingbaas.com"
  if (!email) return false
  // At times, NEXT_PUBLIC_BASE_DOMAIN can differ from meetingbaas.com
  // In such cases, we need to check for both domains
  return email.endsWith(`@${domain}`) || email.endsWith("@meetingbaas.com")
}

export const formatSentAt = (dateStr: string) => {
  // Parse the date as UTC and convert to local timezone
  const date = dayjs.utc(dateStr).local()
  const now = dayjs()

  // If the date is more than 7 days old, show the full date
  if (now.diff(date, "day") > 7) {
    return date.format("D MMM YYYY, h:mm A")
  }

  // Otherwise show relative time
  return date.fromNow()
}
