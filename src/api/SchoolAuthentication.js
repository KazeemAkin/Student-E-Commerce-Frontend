import client from "./Client";
// import { SECRET_PASS_KEY, BASE_URL } from "@env";

const signIn = (email, password) =>
  client.post(
    "/signin",
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
    "/authentication/two-factor",
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
    "/password/forgot-password",
    { email },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

const updatePassword = (email, password, confirmPassword, resetHash) =>
  client.post(
    "/password/update-password",
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

export default {
  signIn,
  twoFactorAuthentication,
  forgotPassword,
  updatePassword,
};
