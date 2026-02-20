/* eslint-disable react-hooks/exhaustive-deps */


// api 
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Root/ProtectedRoute";
import { empty } from "../../Utilities/utils";

// api
import authenticationApi from "../../api/Authentication";

const LogUserOut = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    logUserOut();
  }, []);

  const logUserOut = async() => {
    try {
      const schoolId = !empty(user) && !empty(user._id) ? user._id : "";
      await authenticationApi.logUserOut(schoolId, 'schools');

      const schoolToken = localStorage.getItem("schoolAccessToken");
      if (schoolToken) {
        localStorage.removeItem("schoolAccessToken");
      }
      navigate("/");

    } catch (error) {}
  }

  return null;
}

export default LogUserOut;
