import { User } from "firebase/auth";

interface IAuthContext {
  user: User | null;
  isLoading: boolean;
}

export default IAuthContext;
