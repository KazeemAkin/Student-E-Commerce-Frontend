/* eslint-disable import/no-anonymous-default-export */
import client from "./Client";

const addBankAccount = (values) =>
  client.post("/bank-account/add", {
    ...values
  });

const updateBankAccount = (bank_account_id, values) =>
  client.post("/bank-account/update", {
    bank_account_id,
    ...values
  });

const getBankAccounts = (page, rows, search_value) => {
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

  return client.get(`/bank-accounts`, { params });
};

const getBankAccount = (bank_account_id) => {
  return client.get(`/bank-account/${bank_account_id}`);
};

const deleteBankAccount = (bank_account_id) =>
  client.post("/bank-account/delete", {
    bank_account_id
  });

const toggleBankAccountVisibility = (bank_account_id, activate) =>
  client.post("/bank-account/toggle", {
    bank_account_id,
    activate
  });

export default {
  toggleBankAccountVisibility,
  getBankAccount,
  addBankAccount,
  updateBankAccount,
  getBankAccounts,
  deleteBankAccount
};
