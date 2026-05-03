/* eslint-disable import/no-anonymous-default-export */
import { empty } from "../Utilities/utils";
import client from "./Client";

const getUserData = (userId) => {
  const token = localStorage.getItem("studentAccessToken");
  
  if (empty(token)) {
    return;
  }
  client.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${token}`;
  return client.get(`/user-details/${encodeURIComponent(userId)}`);
};
export default { getUserData };
