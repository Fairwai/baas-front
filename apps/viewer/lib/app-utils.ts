import type { PlatformName } from "@/types/meeting-data"

export const getPlatformFromUrl = (url: string): PlatformName => {
  if (url.includes("zoom.us")) return "zoom"
  if (url.includes("teams.microsoft.com") || url.includes("teams.live.com")) return "teams"
  if (url.includes("meet.google.com")) return "google meet"
  return "unknown"
}
