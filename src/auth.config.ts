// import { GoogleAuthProvider } from "firebase/auth";
// import type { NextAuthConfig } from "next-auth";
// import Google from "@auth/core/providers/google";
// import { FirebaseAdapter } from "@next-auth/firebase-adapter";
// export const authConfig = {
//   pages: {
//     signIn: "/login",
//   },
//   callbacks: {
//     authorized({ auth, request: { nextUrl } }) {
//       const isLoggedIn = !!auth?.user;
//       const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
//       if (isOnDashboard) {
//         if (isLoggedIn) {
//           return true;
//         } else {
//           return false; // Redirect unauthenticated users to login page
//         }
//       } else if (isLoggedIn) {
//         return Response.redirect(new URL("/dashboard", nextUrl));
//       }
//       return true;
//     },
//   },
//   providers: [
//     Google({ clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET }),
//   ],
//   adapter: FirebaseAdapter(firestore), // Add providers with an empty array for now
// } satisfies NextAuthConfig;
