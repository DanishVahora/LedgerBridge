import React, { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";

interface UserContextType {
  user: any | null;
  role: string | null;
  auth: boolean;
  setUser: (user: any) => void;
  setRole: (role: string) => void;
  setAuth: (auth: boolean) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [auth, setAuth] = useState<boolean>(false); // Include auth state

  const logout = () => {
    setUser(null);
    setRole(null);
    setAuth(false);
    localStorage.clear(); // Optional cleanup
  };

  return (
    <UserContext.Provider
      value={{ user, role, auth, setUser, setRole, setAuth, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};