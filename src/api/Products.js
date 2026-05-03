/* eslint-disable import/no-anonymous-default-export */
import client from "./Client";
  const token = localStorage.getItem("studentAccessToken");
  client.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${token}`;

const addProduct = (payload) =>
  client.post("/product/add", {
    ...payload,
  });

const getProducts = (payload) =>
  client.get("/products", {
    params: { ...payload },
  });

const getUserProducts = (payload) =>
  client.get("/user/products", {
    params: { ...payload },
  });


const getProductDetails = (product_id) =>
  client.get(`/product/${product_id}`);

const updateProduct = (payload) =>
  client.patch("/product/update", {
    ...payload
  });

const addToCart = (payload) =>
  client.post("/cart/add", {
    ...payload
  });
  
const deleteProduct = (product_id) =>
  client.delete(`/product/delete/${product_id}`);

const isProductInCart = (product_id) =>
  client.get(`/product/${product_id}/in-cart`);

const getNoOfProductsInCart = () =>
  client.get(`/cart/products-count`);

const getProductsInCart = () =>
  client.get(`/cart/products`);

export default {
  getProductsInCart,
  isProductInCart,
  addProduct,
  getUserProducts,
  getProductDetails,
  updateProduct,
  deleteProduct,
  getProducts,
  addToCart,
  getNoOfProductsInCart
};
