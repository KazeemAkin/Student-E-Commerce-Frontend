import client from "./Client";

const addStaff = (
  school_id,
  first_name,
  last_name,
  middle_name,
  gender,
  title,
  address,
  state_of_residence,
  lga_of_residence,
  state_of_origin,
  lga_of_origin,
  nationality,
  email,
  phone_number1,
  phone_number2,
  qualification,
  course_studied,
  religion,
  date_of_birth,
  active
) =>
  client.post("/staff/register", {
    school_id,
    first_name,
    last_name,
    middle_name,
    gender,
    title,
    address,
    state_of_residence,
    lga_of_residence,
    state_of_origin,
    lga_of_origin,
    nationality,
    email,
    phone_number1,
    phone_number2,
    qualification,
    course_studied,
    religion,
    date_of_birth,
    active,
  });

const getStaff = (schoolId) => client.get(`/staff/${schoolId}`);

const toggleStaffVisibility = (staffId, active, schoolId) =>
  client.post(`/staff/visibility/toggle`, {
    id: schoolId,
    staff_id: staffId,
    active,
  });

const updateStaff = (
  staff_id,
  school_id,
  first_name,
  last_name,
  middle_name,
  gender,
  title,
  address,
  state_of_residence,
  lga_of_residence,
  state_of_origin,
  lga_of_origin,
  nationality,
  email,
  phone_number1,
  phone_number2,
  qualification,
  course_studied,
  religion,
  date_of_birth,
  active
) =>
  client.post("/staff/update", {
    staff_id,
    school_id,
    first_name,
    last_name,
    middle_name,
    gender,
    title,
    address,
    state_of_residence,
    lga_of_residence,
    state_of_origin,
    lga_of_origin,
    nationality,
    email,
    phone_number1,
    phone_number2,
    qualification,
    course_studied,
    religion,
    date_of_birth,
    active,
  });

const assignClassSubjectsToStaff = (staff_id, school_id, class_id, type) =>
  client.post("/staff/class/subjects/assign", {
    staff_id,
    school_id,
    class_id,
    type,
  });

const getSingleStaff = (staffId, schoolId) =>
  client.get(`/${schoolId}/staff/${staffId}`);

const getStaffProfile = (staffId, schoolId) =>
  client.get(`/${schoolId}/staff/${staffId}/profile`);

const uploadStaffAvatar = (user_id, avatar_base64, user_type) =>
  client.post("/avatar/upload", {
    user_id,
    avatar_base64,
    user_type,
  });

const addAuthorizations = (params) =>
  client.post("/staff/update-authorizations", {
    params,
  });

export default {
  addStaff,
  getStaff,
  toggleStaffVisibility,
  updateStaff,
  getSingleStaff,
  getStaffProfile,
  assignClassSubjectsToStaff,
  uploadStaffAvatar,
  addAuthorizations,
};
