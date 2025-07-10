import { auth } from "@/auth";

export default auth(async function middleware(req) {
  // Your custom middleware logic goes here
  console.log("Middleware response ", req.auth);
  console.log("Request URL:", req.url);
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth.js routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
};
