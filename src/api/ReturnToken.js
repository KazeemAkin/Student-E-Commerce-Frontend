import apiClient from "./Client";
import jwtDecode from "jwt-decode";
import { empty } from "../Utilities/utils";
export const token = () => {
  try {
    const storedToken = localStorage.getItem("studentAccessToken");
    if (!empty(storedToken)) {
      const decodedToken = jwtDecode(storedToken);
      apiClient.defaults.headers.common["Authorization"] =
        `Bearer ${storedToken}`;
      return { decodedToken };
    }
    return { decodedToken: {} };
  } catch (error) {
    return false;
  }
};
