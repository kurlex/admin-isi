import LocalUser from "../repositories/LocalUser";

interface IAuthContext {
  user: LocalUser | null;
  isLoading: boolean;
}

export default IAuthContext;
