/* eslint-disable import/no-anonymous-default-export */
import client from "./Client";

const addFeeCategory = (school_id, values) =>
  client.post("/fee-category/add", {
    school_id,
    ...values
  });

const updateFeeCategory = (school_id, fee_category_id, values) =>
  client.post("/fee-category/update", {
    school_id,
    fee_category_id,
    ...values
  });

const getFeeCategories = (page, rows, search_value) => {
  const params = {}; 
  if (page) {
    params.page = page;
  }
  if (rows) {
    params.rows = rows;
  }
  if (search_value) {
    params.search_value = search_value;
  }

  return client.get(`/fee-categories`, { params });
};

const getFeeCategory = (fee_category_id) => {
  return client.get(`/fee-category/${fee_category_id}`);
};

const deleteFeeCategory = (fee_category_id) =>
  client.post("/fee-category/delete", {
    fee_category_id
  });


const addFee = (values) =>
  client.post("/fee/add", {
    ...values
  });

const updateFee = (fee_id, values) =>
  client.post("/fee/update", {
    fee_id,
    ...values
  });

const getFees = (page, rows, search_value) => {
  const params = {}; 
  if (page) {
    params.page = page;
  }
  if (rows) {
    params.rows = rows;
  }
  if (search_value) {
    params.search_value = search_value;
  }

  return client.get(`/fees`, { params });
};

const getFeeDetail = (fee_id) => {
  return client.get(`/fee/${fee_id}`);
};

const deleteFee = (fee_id) =>
  client.post("/fee/delete", {
    fee_id
  });

const getFeesStatCount = () => {
  return client.get(`/fees-stat`);
};

const getFeesPayable = (studentId) => {
  return client.get(`/fees-payable/${studentId}`);
};

export default {
  getFeeCategories,
  addFeeCategory,
  updateFeeCategory,
  getFeeCategory,
  deleteFeeCategory,
  addFee,
  updateFee,
  getFees,
  getFeeDetail,
  deleteFee,
  getFeesStatCount, 
  getFeesPayable
};
