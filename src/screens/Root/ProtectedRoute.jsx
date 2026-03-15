import { createContext, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { empty } from "../../Utilities/utils";
import { ProgressSpinner } from "primereact/progressspinner";

// css

export const AuthContext = createContext();

export const ProtectedRoute = () => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const authenticateUser = async () => {
      const storedToken = localStorage.getItem("studentAccessToken");
      if (!empty(storedToken)) {
        setUser({});
        setIsLoggedIn(false);
      }
      setIsLoggedIn(true);
    };
    authenticateUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  if (!isLoggedIn) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          backgroundColor: "rgba(255,255,255,0.7)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ProgressSpinner
          style={{ width: 50, height: 50 }}
          strokeWidth={9}
          animationDuration={0.5}
        />
      </div>
    );
  }

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
