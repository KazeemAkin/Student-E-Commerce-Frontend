/* eslint-disable import/no-anonymous-default-export */
import client from "./Client";

const addParent = (formData) =>
  client.post("/parent/add", {
    formData,
  });

const getParents = (schoolId, page, rows, search, type) => {
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
  if (type) {
    params.type = type;
  }
  return client.get(`/${schoolId}/parents`, { params });
};

const toggleParentVisibility = (parent_id, active, school_id) =>
  client.post(`/parent/toggle`, {
    school_id,
    parent_id,
    active,
  });

const updateParent = (school_id, parent_id, form_data) =>
  client.post("/parent/update", {
    parent_id,
    school_id,
    form_data,
  });

const getParentDetails = (parent_id, school_id) =>
  client.get(`/${school_id}/parent/${parent_id}`);

const getParentKidsStat = (parent_id, school_id) =>
  client.get(`/${school_id}/parent/${parent_id}/stat/kids`);

const uploadParentAvatar = (user_id, avatar_base64, user_type) =>
  client.post("/avatar/upload", {
    user_id,
    avatar_base64,
    user_type,
  });

const assignStudentToParent = (
  school_id,
  parent_id,
  student_id,
  current_status
) =>
  client.post("/assign-student-to-parent", {
    school_id,
    parent_id,
    student_id,
    current_status,
  });

export default {
  addParent,
  getParents,
  toggleParentVisibility,
  updateParent,
  getParentDetails,
  getParentKidsStat,
  uploadParentAvatar,
  assignStudentToParent,
};
