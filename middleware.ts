import { NextRequest } from "next/server";

import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const response = intlMiddleware(request); // run next-intl

  // Geo detection (only works on Vercel or Edge runtimes)
  const geo = (request as NextRequest & { geo: { country?: string } }).geo;
  const country = geo?.country ?? "US";

  // // Add country to cookies (you could also use headers, but cookies persist better)
  response.cookies.set("user-country", country, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: "lax",
    path: "/",
  });

  return response;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
