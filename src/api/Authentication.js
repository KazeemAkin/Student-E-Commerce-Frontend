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
    }
  );

const twoFactorAuthentication = (email, access_code) =>
  client.post(
    "/super-admin/authentication/two-factor",
    {
      email,
      access_code,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

const forgotPassword = (email) =>
  client.post(
    "/forgot-password",
    { email },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
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
    }
  );

const logUserOut = (
  user_id,
  user_type
) =>
  client.post(`/log-user-out`, {
    user_id,
    user_type
  });

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  signIn,
  twoFactorAuthentication,
  forgotPassword,
  resetPassword,
  logUserOut
};
