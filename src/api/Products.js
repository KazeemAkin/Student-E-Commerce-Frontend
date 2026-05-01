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


const getProductDetails = (product_id) =>
  client.get(`/product/${product_id}`);

const updateProduct = (payload) =>
  client.patch("/product/update", {
    ...payload
  });
  
const deleteProduct = (product_id) =>
  client.delete(`/product/delete/${product_id}`);

export default {
  addProduct,
  getUserProducts,
  getProductDetails,
  updateProduct,
  deleteProduct
};
