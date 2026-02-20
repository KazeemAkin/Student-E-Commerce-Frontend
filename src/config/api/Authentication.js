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
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

export default {
  signIn,
};
