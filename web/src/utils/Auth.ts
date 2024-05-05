import { auth } from "../config/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const SignIn = async (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

const SignOut = () => auth.signOut();

export { SignIn, SignOut };
