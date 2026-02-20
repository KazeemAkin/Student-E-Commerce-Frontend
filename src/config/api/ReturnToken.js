import axios from "axios";
import jwtDecode from "jwt-decode";
export const token = () => {
  const storedToken = localStorage.getItem("schoolAccessToken");
  const decodedToken = jwtDecode(storedToken);
  axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;

  return { decodedToken, storedToken };
};
