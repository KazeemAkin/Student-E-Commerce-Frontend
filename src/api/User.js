/* eslint-disable import/no-anonymous-default-export */
import client from "./Client";

const updateProfile = (payload) =>
  client.patch("/profile/update", {
    ...payload,
  });

export default {
  updateProfile
};
