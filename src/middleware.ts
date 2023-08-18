export { default } from "next-auth/middleware";
/*
 * Match all request paths except for the ones starting with:
 * - api (API routes)
 * - _next/static (static files)
 * - _next/image (image optimization files)
 * - favicon.ico (favicon file)
 * - twitter.svg (twitter logo file)
 * - $ (root url e.g "/")
 *   these settings are configured so that images and other static data can be load and user should be             authenticated to access all routes excepts the one listed above
 */
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|auth|twitter.svg|$).*)",
  ],
};
