/* eslint-disable import/no-anonymous-default-export */
import client from "./Client";

const updateProfile = (payload) =>
  client.patch("/profile/update", {
    ...payload,
  });


const uploadAvatar = (payload) =>
  client.patch("/profile/avatar/update", {
    ...payload,
  });

export default {
  updateProfile,
  uploadAvatar
};
