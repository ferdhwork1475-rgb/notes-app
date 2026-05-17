import { createContext, useState, useEffect } from "react";
import { verifyUser } from "../services/authService";
import ClipLoader from "react-spinners/ClipLoader";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = async () => {
      try {
        const response = await verifyUser();
        if (!response) return
        setUser(response.user);
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false); 
        throw error    
      }
    };

    auth();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user }}>
      {children}
    </AuthContext.Provider>
  );
};
