import { AuthContextProvider, useAuthContext } from "../contexts/auth_context";
import { Button } from "../ui/button";
// import Login from "../ui/login";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    // <AuthContextProvider>
    <>
      {/* <Login redirectPath={"/"} /> */}
      <div className="flex pt-12 sm:pt-12 min-h-[150vh] justify-center">
        {children}
      </div>
    </>
    // </AuthContextProvider>
  );
}
