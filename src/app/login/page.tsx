import { Button } from "../ui/button";
import Login from "../ui/login";

export default function Page() {
  return (
    <div className="flex h-[100vh] w-full bg-orange-300 items-center justify-center">
      <Login></Login>
      {/* <Button>Login</Button> */}
    </div>
  );
}
