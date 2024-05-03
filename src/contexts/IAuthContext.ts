import LocalUser from "../repositories/LocalUser";

interface IAuthContext {
  user: LocalUser | null;
  isLoading: boolean;
  refreshCategories: () => void;
  refreshPosts: () => void;
}

export default IAuthContext;
