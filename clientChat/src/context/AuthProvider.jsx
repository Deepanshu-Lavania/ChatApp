import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

// Create AuthContext
export const AuthContext = createContext(); // Acts as the central store

export const AuthProvider = ({ children }) => {
  // Fetch initial user state from Cookies or Local Storage
  const initialUserState =Cookies.get("jwt") || localStorage.getItem("messenger");
  console.log("initialUserState data is : ", Cookies.get("jwt"));
  console.log("initialUserState through cookie and localStorage is : ",initialUserState);
  

  let parsedUser = undefined;
  if (initialUserState) {
    try {
      parsedUser = JSON.parse(initialUserState); // Parse user data safely
    } catch (error) {
      console.error("Failed to parse user data:", error);
    }
  }
  // Manage auth state
  const [authUser, setAuthUser] = useState(parsedUser);

  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access AuthContext
export const useAuth = () => useContext(AuthContext);
