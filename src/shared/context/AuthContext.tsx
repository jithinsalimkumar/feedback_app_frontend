import React, { createContext, useContext, useMemo, useState } from "react";

export type User = { email: string; name?: string };
export type AuthResult = { success: boolean; error?: string };

type AuthContextValue = {
  user: User | null;
  login: (email: string, password: string) => Promise<AuthResult>;
  signup: (email: string, password: string) => Promise<AuthResult>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<AuthResult> => {
    // TODO: replace this with real API call
    if (!email || password.length < 6) {
      return { success: false, error: "Invalid credentials" };
    }
    setUser({ email, name: email.split("@")[0] });
    return { success: true };
  };

  const signup = async (email: string, password: string): Promise<AuthResult> => {
    // TODO: replace this with real API call
    if (!email || password.length < 6) {
      return { success: false, error: "Invalid input" };
    }
    setUser({ email, name: email.split("@")[0] });
    return { success: true };
  };

  const logout = () => setUser(null);

  const value = useMemo(() => ({ user, login, signup, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
