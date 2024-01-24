// import App from "next/app";
import { cookies } from "next/headers";
import { AuthContextProvider } from "./contexts/auth_context";
import MainContainer from "./ui/maincontainer";
import Navbar from "./ui/navbar/navbar";

export default function Home() {
  return (
    // <AuthContextProvider>
    <>
      <MainContainer></MainContainer>
    </>
    // </AuthContextProvider>
  );
}
