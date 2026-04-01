import { createContext, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { empty, isObject } from "../../Utilities/utils";
import { getUserDetails } from "../../api/GetUserDetails";

// css

export const AuthContext = createContext();

export const ProtectedRoute = () => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const authenticateUser = async () => {
      const storedToken = localStorage.getItem("studentAccessToken");
      if (empty(storedToken)) {
        setIsLoggedIn(false);
      }
      const getUserDatails = await getUserDetails();
      if (
        isObject(getUserDatails) &&
        getUserDatails.success &&
        getUserDatails.userDetails
      ) {
        setUser(getUserDatails.userDetails);
        setIsLoggedIn(true);
      }
    };
    authenticateUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      <Outlet />
    </AuthContext.Provider>
  );
};

export default ProtectedRoute;
