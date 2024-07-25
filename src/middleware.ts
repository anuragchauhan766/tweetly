export { default } from "next-auth/middleware";
// import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
// export default withAuth(function middleware(req: NextRequestWithAuth) {
//   console.log(req.nextUrl.pathname);
//   console.log(req.nextauth.token);
// });
// Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage
/*
 * Match all request paths except for the ones starting with:
 * - api (API routes)
 * - _next/static (static files)
 * - _next/image (image optimization files)
 * - favicon.ico (favicon file)
 * - $ (root url e.g "/")
 *   these settings are configured so that images and other static data can be load and user should be             authenticated to access all routes excepts the one listed above
 */

export const config = {
  // matcher: [
  //   "/((?!$|api|home|_next/static|_next/image|favicon.ico|auth|twitter.svg).*)",
  // ],
  matcher: ["/admin"]
};
