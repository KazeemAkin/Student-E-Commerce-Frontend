/* eslint-disable import/no-anonymous-default-export */
import client from "./Client";
  // const token = localStorage.getItem("studentAccessToken");
  // client.defaults.headers.common[
  //   "Authorization"
  // ] = `Bearer ${token}`;

const getPurchaseHistory = () =>
  client.get(`/transaction/history`);

const rateTransaction = (payload) =>
  client.patch("/transaction/rate", {
    ...payload,
  });

export default {
  getPurchaseHistory,
  rateTransaction
};
