import { cookies } from "next/headers";
import Navbar from "./navbar";

export default function NavHolder() {
  const user = cookies().get("user_id");
  if (user) {
    return <Navbar user={user.value}></Navbar>;
  } else {
    return <Navbar user={undefined}></Navbar>;
  }
}
