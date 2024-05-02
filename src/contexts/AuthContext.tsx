import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/Firebase";
import { NextOrObserver, User, onAuthStateChanged } from "firebase/auth";
import IAuthContext from "./IAuthContext";

const AuthContext = createContext<IAuthContext>({
  user: null,
  isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser, () =>
      setIsLoading(false)
    );
    return unsubscribe;
  }, []);

  const initializeUser: NextOrObserver<User> = (user: User | null) => {
    setUser(user);
    setIsLoading(false);
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
