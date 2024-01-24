// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  UserCredential,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import {
  deleteCookie as deleteCookieClient,
  setCookie as setCookieClient,
} from "cookies-next";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
auth.useDeviceLanguage();

// onAuthStateChanged(auth, (user) => {
//   console.log(auth.currentUser);
//   console.log(user);

//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/auth.user
//     console.log("In auth state changed. User is signed in");
//     setCookie("USER", "heyy");
//   } else {
//     console.log("In auth state changed. User is signed out");
//     deleteCookie("USER");
//     // revalidatePath("/dashboard");
//     // redirect("/");
//   }
// });
// setPersistence(auth, browserLocalPersistence);

export const db_firebase = getFirestore(app);

// TODO:
// This is now client-side. Make server-side authentication in the future so more can be server-side rendered
export async function signInGooglePopup() {
  // "use server";
  console.log("GOOGLE LOG In");
  await signInWithPopup(auth, provider);
  setCookieClient("USER", "yeye");
  redirect("/");
}

// export async function signOutGoogle() {
//   "use server";
//   console.log("LOGGIN OUT:)");
//   const loggedIn = cookies().has("USER");
//   if (loggedIn) {
//     alert("Error: already logged in");
//   } else {
//     await signOut(auth);
//     cookies().delete("USER");
//     // revalidatePath("/");
//     redirect("/");
//   }
// }
