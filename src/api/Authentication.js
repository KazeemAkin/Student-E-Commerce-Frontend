import { isObject } from "lodash";
import client from "./Client";
import { token } from "./ReturnToken";
import { empty } from "../Utilities/utils";
// import { SECRET_PASS_KEY, BASE_URL } from "@env";

const signIn = (payload) =>
  client.post("/sign-in", {
    ...payload,
  });

const forgotPassword = (payload) =>
  client.patch("/forgot-password", { ...payload });

const resetPassword = (payload) =>
  client.patch("/reset-password", {
    ...payload,
  });

const setItemsOfInterest = async (payload) => {
  if (!isObject(payload)) {
    return;
  }

  const { decodedToken } = await token();
  if (empty(decodedToken)) {
    return;
  }

  return client.patch(`/set-items-of-interest`, {
    ...payload,
  });
};

const setUserType = async (payload) => {
  if (!isObject(payload)) {
    return;
  }

  const { decodedToken } = await token();
  if (empty(decodedToken)) {
    return;
  }

  return client.patch(`/set-user-type`, {
    ...payload,
  });
};

const signup = async (payload) => {
  if (!isObject(payload)) {
    return;
  }
  return client.patch(`/register-user`, {
    ...payload,
  });
};

const sendAccessCode = async (payload) => {
  if (!isObject(payload)) {
    return;
  }
  return client.post("/send-access-code", {
    ...payload,
  });
};

const verifyAccessCode = (payload) => {
  if (!isObject(payload)) {
    return;
  }
  return client.patch("/verify-access-code", {
    ...payload,
  });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  signIn,
  verifyAccessCode,
  forgotPassword,
  resetPassword,
  signup,
  sendAccessCode,
  setUserType,
  setItemsOfInterest,
};
