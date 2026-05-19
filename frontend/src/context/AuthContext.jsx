import { createContext, useState, useEffect } from "react";
import { verifyUser } from "../services/authService";
import ClipLoader from "react-spinners/ClipLoader";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [data, setData] = useState(null)
  
  const verifyUserToken = async () => {
    try {
      const response = await verifyUser()
      console.log(response);
      
    } catch (error) {
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ }}>
      {children}
    </AuthContext.Provider>
  );
};
