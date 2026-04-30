import React, { useContext, useState, useEffect, } from 'react';
import { getUserDetails } from '../api/GetUserDetails';
import { empty, isObject } from '../Utilities/utils';
import { AuthContext } from '../screens/Root/ProtectedRoute';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  // Function to fetch and set current user
  const refreshUser = async () => {
    try {
      const token = localStorage.getItem("studentAccessToken");
      
      if (empty(token)) {
        setIsLoggedIn(false);
        setUser(null);
        return;
      }
      
      const response = await getUserDetails();
      if (isObject(response) && response.success && response.userDetails) {
        setUser(response.userDetails);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      setUser(null);
      setIsLoggedIn(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("studentAccessToken");
    setUser(null);
    setIsLoggedIn(false);
  };

  // Initial auth check when app loads
  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        setUser,
        setIsLoggedIn,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};