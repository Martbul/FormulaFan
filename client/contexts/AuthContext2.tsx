"use client";

import { AuthContextType, User } from "@/services/auth/auth.interface";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthContextType>({
  user: { username: "Guest", email: undefined, picture: "" },
  setUser: () => {},
});

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>({
    username: "Guest",
    email: undefined,
    picture: "",
  });

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  const contextValue: AuthContextType = {
    user,
    setUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
