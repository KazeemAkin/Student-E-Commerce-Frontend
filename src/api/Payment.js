import client from "./Client";

const payForProduct = (values) =>
  client.post("/payment/product", {
    ...values
  });

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  payForProduct,
};
