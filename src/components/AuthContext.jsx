import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

function AuthContext() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = (user) => {
    // Assume user has an isAdmin property to check admin rights
    setIsAuthenticated(true);
    setIsAdmin(user.isAdmin);
    // Save the user details in local storage or cookies if necessary
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    // Remove user details from local storage or cookies
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
