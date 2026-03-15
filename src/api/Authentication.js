import { isObject } from "lodash";
import client from "./Client";
// import { SECRET_PASS_KEY, BASE_URL } from "@env";

const signIn = (email, password) =>
  client.post(
    "/super-admin/signin",
    {
      email,
      password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

const forgotPassword = (email) =>
  client.post(
    "/forgot-password",
    { email },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

const resetPassword = (email, password, confirmPassword, resetHash) =>
  client.post(
    "/reset-password",
    {
      email,
      password,
      confirm_password: confirmPassword,
      password_reset_hash: resetHash,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

const signup = (payload) => {
  if (!isObject(payload)) {
    return;
  }
  return client.patch(`/register-user`, {
    ...payload,
  });
};

const sendAccessCode = (payload) => {
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
};
