import { BILLING_URL } from "@repo/shared/lib/external-urls"
import { type NextRequest, NextResponse } from "next/server"

if (!process.env.AUTH_COOKIE_PREFIX) {
  throw new Error("AUTH_COOKIE_PREFIX environment variable is not defined")
}

const protectedRoutes = ["/billing"]
const publicRoutes = ["/pricing"]

export async function middleware(request: NextRequest) {
  // Check if auth cookie exists before processing request
  // Fetch session in RSC/APIs to further protect a route
  const authCookieName = `${process.env.AUTH_COOKIE_PREFIX}.session_token`
  const cookie = authCookieName ? request.cookies.get(authCookieName) : undefined
  const response = NextResponse.next()

  // If the app is self hosted, get the app url from the environment configuration
  // When hosted on Vercel, the origin is the same as the auth app url
  // In development, the origin is the same as the auth app url
  const appUrl =
    process.env.NODE_ENV === "development" || process.env.SELF_HOST !== "true"
      ? request.nextUrl.origin
      : BILLING_URL
  const redirectTo = `${appUrl}${request.nextUrl.pathname}${request.nextUrl.search}`

  const isProtectedRoute = protectedRoutes.includes(request.nextUrl.pathname)
  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname)

  if (isProtectedRoute && !cookie) {
    return NextResponse.redirect(new URL("/pricing", request.url))
  }

  if (isPublicRoute && cookie) {
    return NextResponse.redirect(new URL("/billing", request.url))
  }

  // Setting a custom header so that RSCs can handle redirection if session not found
  // In this app, when user is not logged in, they are redirected to pricing page, so this header is not used
  response.headers.set("x-redirect-to", redirectTo)

  return response
}

// skipping static and api routes
// Api routes are protected by fetch session request
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"]
}
