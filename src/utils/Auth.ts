import { auth } from "../config/Firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
export const SignIn = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const SignOut = () => auth.signOut();
