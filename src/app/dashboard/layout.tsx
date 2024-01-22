import { AuthContextProvider, useAuthContext } from "../contexts/auth_context";
import Login from "../ui/login";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthContextProvider>
      <Login />
      <div className="pt-12 sm:pt-12 min-h-[150vh] flex justify-center">
        {children}
      </div>
    </AuthContextProvider>
  );
}
