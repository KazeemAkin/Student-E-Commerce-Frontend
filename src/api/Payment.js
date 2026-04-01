import client from "./Client";

const getPaymentRecord = (school_id, student_id, payment_type, payment_status) => {
  return client.get(`/${school_id}/payment-record/user/${student_id}/type/${payment_type}/status/${payment_status}`);
};

const addPayment = (values) =>
  client.post("/payment/add", {
    ...values
  });

const updatePayment = (values) =>
  client.post("/payment/update", {
    ...values
  });

const getInvoiceDetails = (invoice_id) => {
  return client.get(`/invoice-details/${invoice_id}`);
};

const completePayment = (values) =>
  client.post("/complete-payment", {
    ...values
  });

const getPaymentHistories = (page = 0, rows = 50, search = "", filter_value = "") => {
  const params = {};
  if (page) {
    params.page = page;
  }
  if (rows) {
    params.rows = rows;
  }
  if (search) {
    params.search = search;
  }
  if (filter_value) {
    params.filter_value = filter_value;
  }
  return client.get(`/payment-histories`, { params });
};

const getPaymentHistoryStats = () => {
  return client.get('/payment-histories-stats');
};

const getPaymentSumPerMonth = () => {
  return client.get('/payment-sums-per-month');
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getPaymentSumPerMonth,
  getPaymentHistoryStats,
  getPaymentRecord,
  addPayment,
  updatePayment,
  getInvoiceDetails,
  completePayment,
  getPaymentHistories
};
