import { createContext, useEffect, useState } from "react";
import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
import { getSchoolDetails } from "../../api/GetSchoolDetails";
import { empty } from "../../Utilities/utils";
import { ProgressSpinner } from "primereact/progressspinner";

// css

export const AuthContext = createContext();

export const ProtectedRoute = () => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  const [termActive, setTermActive] = useState(false);
  const [sessionEmpty, setSessionEmpty] = useState(false);
  const [studentData, setStudentData] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const schoolDetails = await getSchoolDetails();
      if (
        !empty(schoolDetails) &&
        schoolDetails.success &&
        !empty(schoolDetails.response)
      ) {
        const data = !empty(schoolDetails.response)
          ? schoolDetails.response
          : {};
        const _sessionActive =
          typeof data.sessionActive === "boolean" &&
          data.sessionActive === true;
        const _termActive =
          typeof data.termActive === "boolean" && data.termActive === true;
        const _sessionEmpty =
          typeof data.sessionEmpty === "boolean" && data.sessionEmpty === true;

        setTermActive(_termActive);
        setSessionActive(_sessionActive);
        setSessionEmpty(_sessionEmpty);
        setUser(data);
        setIsLoggedIn(true);
      } else {
        setUser({});
        setIsLoggedIn(false);
        navigate("/");
      }
    };
    getUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  if (user === null) {
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

  return user && !empty(user.userType) && user.userType === "SCHOOL" ? (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        termActive,
        setTermActive,
        sessionActive,
        setSessionActive,
        sessionEmpty,
        setSessionEmpty,
        studentData,
        setStudentData
      }}
    >
      <Outlet />
    </AuthContext.Provider>
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoute;
