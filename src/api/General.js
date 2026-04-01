/* eslint-disable import/no-anonymous-default-export */
import client from "./Client";

const getUserData = (userId) => {
  return client.get(`/user-details/${encodeURIComponent(userId)}`);
};
export default { getUserData };
