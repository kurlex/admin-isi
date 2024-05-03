import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/Firebase";
import { NextOrObserver, User, onAuthStateChanged } from "firebase/auth";
import IAuthContext from "./IAuthContext";
import LocalUser from "../repositories/LocalUser";
import { GetUser } from "../repositories/UserRepository";

const AuthContext = createContext<IAuthContext>({
  user: null,
  isLoading: true,
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
  const value = {
    user,
    isLoading,
  };
  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
