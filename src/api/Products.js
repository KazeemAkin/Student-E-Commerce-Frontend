/* eslint-disable import/no-anonymous-default-export */
import client from "./Client";

const addProduct = (payload) =>
  client.post("/product/add", {
    ...payload,
  });


const getUserProducts = (payload) =>
  client.get("/products", {
    params: { ...payload },
  });

export default {
  addProduct,
  getUserProducts
};
