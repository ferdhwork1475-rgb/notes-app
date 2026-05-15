import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(async () => {
    try {
      const response = await verifyUser();
      if (!response.user) {
        toast.error("Login agian");
        return;
      }
      setUser(response.user);
      setIsLoggedIn(true);
    } catch (error) {
      navigate("/login");
    }
  }, []);
  return (
    <AuthContext.Provider value={{ isLoggedIn, user }}>
      {children}
    </AuthContext.Provider>
  );
};
