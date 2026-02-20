import client from "./Client";

const getSchoolData = (userId) => {
  return client.get(`/details/${encodeURIComponent(userId)}`);
};

const updateQRCode = (user_id, school_id, user_type) => {
  return client.post("/qr-code/update", { user_id, school_id, user_type });
};

export default {
  getSchoolData,
  updateQRCode,
};
