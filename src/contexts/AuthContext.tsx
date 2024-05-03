import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/Firebase";
import { NextOrObserver, User, onAuthStateChanged } from "firebase/auth";
import IAuthContext from "./IAuthContext";
import LocalUser from "../repositories/LocalUser";
import { GetUser } from "../repositories/UserRepository";

const AuthContext = createContext<IAuthContext>({
  user: null,
  isLoading: true,
  refreshCategories: () => {},
  refreshPosts: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<LocalUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser, () =>
      setIsLoading(false)
    );
    return unsubscribe;
  }, []);

  const initializeUser: NextOrObserver<User> = (user: User | null) => {
    if (user)
      GetUser(user.uid)
        .then((localUser) => setUser(localUser))
        .finally(() => setIsLoading(false));
    else {
      setUser(null);
      setIsLoading(false);
    }
  };

  const refreshCategories = () =>
    user?.updateCategories().then((localUser) => {
      setUser((oldUser) => {
        console.log(localUser);
        return {
          ...oldUser,
          categories: [...localUser.categories],
        } as LocalUser;
      });
    });

  const refreshPosts = () =>
    user?.updatePosts().then((localUser) => {
      setUser((oldUser) => {
        console.log(localUser);
        return {
          ...oldUser,
          posts: [...localUser.posts],
        } as LocalUser;
      });
    });

  const value = {
    user,
    isLoading,
    refreshCategories,
    refreshPosts,
  };
  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
