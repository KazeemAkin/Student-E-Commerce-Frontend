/* eslint-disable import/no-anonymous-default-export */
import client from "./Client";

const addStudent = (
  school_id,
  first_name,
  last_name,
  middle_name,
  gender,
  address,
  entry_class,
  previous_school,
  state_of_residence,
  lga_of_residence,
  state_of_origin,
  lga_of_origin,
  nationality,
  email,
  phone_number,
  religion,
  date_of_birth,
  active
) =>
  client.post("/student/register", {
    school_id,
    first_name,
    last_name,
    middle_name,
    gender,
    address,
    state_of_residence,
    lga_of_residence,
    state_of_origin,
    lga_of_origin,
    nationality,
    email,
    phone_number,
    religion,
    date_of_birth,
    active,
    entry_class,
    previous_school,
  });

const getStudents = (schoolId, page = 0, rows = 50, search = "", type = "", filter_value = "") => {
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
  if (filter_value) {
    params.filter_value = filter_value;
  }
  return client.get(`/${schoolId}/students`, {
    params,
  });
};

const toggleStudentVisibility = (student_id, active, school_id) =>
  client.post(`/student/visibility/toggle`, {
    id: student_id,
    school_id,
    active,
  });

const getStudentsInClass = (
  school_id,
  page,
  rows,
  search,
  class_id,
  type = "",
  filter_value,
) => {
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
  if (filter_value) {
    params.filter_value = filter_value;
  }

  return client.get(`/${school_id}/class/${class_id}/students`, {
    params,
  });
};

const updateStudent = (
  student_id,
  school_id,
  first_name,
  last_name,
  middle_name,
  gender,
  address,
  entry_class,
  previous_school,
  state_of_residence,
  lga_of_residence,
  state_of_origin,
  lga_of_origin,
  nationality,
  email,
  phone_number,
  religion,
  date_of_birth,
  active
) =>
  client.post("/student/update", {
    student_id,
    school_id,
    first_name,
    last_name,
    middle_name,
    gender,
    address,
    entry_class,
    previous_school,
    state_of_residence,
    lga_of_residence,
    state_of_origin,
    lga_of_origin,
    nationality,
    email,
    phone_number,
    religion,
    date_of_birth,
    active,
  });

const getSingleStudent = (studentId, schoolId) =>
  client.get(`/${schoolId}/student/${studentId}`);

const getStudentsByGraduationYear = (
  schoolId,
  graduation_year,
  graduation_class_id,
  type = ""
) => {
  const params = {};
  if (type) {
    params.type = type;
  }
  return client.get(
    `/${schoolId}/graduation/class/${graduation_class_id}/year/${graduation_year}`,
    { params }
  );
};

const getStudentProfile = (studentId, schoolId) =>
  client.get(`/${schoolId}/student/${studentId}/profile`);

const getStudentPercentage = (studentId, schoolId) =>
  client.get(`/${schoolId}/stat/student/${studentId}/assessment/percentage`);

const activateStudent = (student_ids, school_id, session_id, term_id) =>
  client.post("/students/activate", {
    student_ids,
    school_id,
    session_id,
    term_id
  });

const resetStudentPassword = (student_id, school_id) =>
  client.post("/reset-student-password", {
    student_id,
    school_id,
  });

const promoteStudent = (
  student_ids,
  school_id,
  comment,
  class_id,
  current_class_id
) =>
  client.post("/students/promote", {
    student_ids,
    school_id,
    comment,
    class_id,
    current_class_id,
  });

const deleteStudent = (student_id, school_id) =>
  client.post("/student/delete", {
    student_id,
    school_id,
  });

const uploadStudentAvatar = (user_id, avatar_base64, user_type) =>
  client.post("/avatar/upload", {
    user_id,
    avatar_base64,
    user_type,
  });

const getSelectedStudents = (schoolId, studentIds) => {
  const params = {};

  if (studentIds) {
    params.student_ids = studentIds;
  }
  return client.get(`/${schoolId}/selected-students`, { params });
};

const getSearchedStudents = (schoolId, value) => {
  const params = {};

  if (value) {
    params.value = value;
  }
  return client.get(`/${schoolId}/searched-students`, { params });
};

const activateAllStudent = (school_id, class_id) =>
  client.post("/activate-students-by-status", {
    school_id,
    class_id
  });


export default {
  activateAllStudent,
  addStudent,
  getStudents,
  toggleStudentVisibility,
  updateStudent,
  getSingleStudent,
  getStudentsInClass,
  getStudentProfile,
  getStudentPercentage,
  activateStudent,
  promoteStudent,
  deleteStudent,
  uploadStudentAvatar,
  getStudentsByGraduationYear,
  resetStudentPassword,
  getSelectedStudents,
  getSearchedStudents,
};
