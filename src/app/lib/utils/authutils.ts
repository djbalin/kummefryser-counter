import { User } from "firebase/auth";

export async function getIdToken(user: User) {
  return await user.getIdToken();
}
