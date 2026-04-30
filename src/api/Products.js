/* eslint-disable import/no-anonymous-default-export */
import client from "./Client";

const addProduct = (payload) =>
  client.post("/product/add", {
    ...payload,
  });

export default {
  addProduct,
};
