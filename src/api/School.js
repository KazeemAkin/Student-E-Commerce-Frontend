import client from "./Client";

const updateSchoolSettings = (
  closing_date = "",
  opening_date = "",
  remarks = [],
  school_id,
  type = ""
) =>
  client.post(`/settings/update`, {
    closing_date,
    opening_date,
    remarks,
    school_id,
    type,
  });

const updatePassword = (
  school_id = "",
  current_password = "",
  new_password = "",
  confirm_password = ""
) =>
  client.post(`/settings/password/update`, {
    school_id,
    current_password,
    new_password,
    confirm_password,
  });

const getNumberOfStudentsInSchool = (school_id) =>
  client.get(`/${school_id}/stat/students`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

const getParentsCount = (school_id) =>
  client.get(`/${school_id}/parents-count`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

const getStaffStudentAttendancePercentCount = (school_id) =>
  client.get(`/${school_id}/attendance/staff-and-student-percent-count`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

const getSchoolAssessmentsData = (school_id) =>
  client.get(`/${school_id}/classes/students/assessments-data`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

const getNumberOfSubjectsInSchool = (school_id) =>
  client.get(`/${school_id}/stat/subjects`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

const getNoOfSchoolStudentsByGender = (school_id) =>
  client.get(`/${school_id}/stat/students/gender-data`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

const getNumberOfStaff = (school_id) =>
  client.get(`/${school_id}/stat/staff`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

const getNumberOfClasses = (school_id) =>
  client.get(`/${school_id}/stat/classes`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

const getStudentAssessmentPerformance = (school_id) =>
  client.get(`/${school_id}/stat/students/assessment`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

const getNoOfSchoolStaffByGender = (school_id) =>
  client.get(`/${school_id}/stat/staff/gender-data`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

const getRecentlyRegisteredStudents = (
  school_id,
  page = 0,
  rows = 10,
  search = ""
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

  return client.get(`/${school_id}/recently-registered/students`, {
    params,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const getRecentlyRegisteredStaff = (
  school_id,
  page = 0,
  rows = 10,
  search = ""
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

  return client.get(`/${school_id}/recently-registered/staff`, {
    params,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const getGraduationYears = (school_id) =>
  client.get(`/${school_id}/graduation-years`);

const updateAssessmentMaxScores = (
  school_id = "",
  ca1_max = "",
  ca2_max = "",
  exam_max = ""
) =>
  client.post(`/assessment/max-scores`, {
    school_id,
    ca1_max,
    ca2_max,
    exam_max,
  });

const updateUserAvatar = (user_id = "", avatar_base64 = "", user_type = "") =>
  client.post(`/avatar/upload`, {
    user_id,
    avatar_base64,
    user_type,
  });

const updateSchoolSignature = (school_id = "", avatar_base64 = "") =>
  client.post(`/signature/upload`, {
    school_id,
    avatar_base64
  });

const updatePeriods = (
  school_id,
  no_of_breaks,
  break_details,
  no_of_periods_after_last_break,
  no_of_classes_per_day
) =>
  client.post(`/academic-settings/periods`, {
    school_id,
    no_of_breaks,
    break_details,
    no_of_periods_after_last_break,
    no_of_classes_per_day,
  });

const updateSchoolTimes = (
  school_id,
  class_start_time,
  school_start_time,
  school_dismissal_time,
  lesson_start_time,
  lesson_dismissal_time,
  school_open_days,
  lesson_free_days
) =>
  client.post(`/academic-settings/times`, {
    school_id,
    class_start_time,
    school_start_time,
    school_dismissal_time,
    lesson_start_time,
    lesson_dismissal_time,
    school_open_days,
    lesson_free_days,
  });

// add batch schedule
const addClassSchedule = (school_id, formData) =>
  client.post(`/class/schedule/add`, {
    school_id,
    ...formData,
  });

const addSingleClassSchedule = (school_id, formData) =>
  client.post(`/class/single/schedule/add`, {
    school_id,
    ...formData,
  });

const updateClassSchedule = (school_id, formData) =>
  client.post(`/class/schedule/update`, {
    school_id,
    ...formData,
  });

const updateProfile = (school_id, formData) => {
  return client.post(`/profile/update`, {
    school_id,
    ...formData,
  });
};

const getSchoolClassSchedules = (
  school_id,
  session_id = null,
  term_id = null, 
  class_group = null,
  class_ids = null,
  class_category_ids = null,
  staff_ids = null,
  subject_ids = null
) => {
  const params = {};
  if (session_id) {
    params.session_id = session_id;
  }
  if (term_id) {
    params.term_id = term_id;
  }
  if (class_group) {
    params.classGroup = class_group;
  }
  if (class_ids) {
    params.class_ids = class_ids;
  }
  if (class_category_ids) {
    params.class_category_ids = class_category_ids;
  }
  if (staff_ids) {
    params.staff_ids = staff_ids;
  }
  if (subject_ids) {
    params.subject_ids = subject_ids;
  }

  return client.get(`/${school_id}/class-schedules`, {
    params,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const addUserGroup = (school_id, title, active, authorizations) =>
  client.post(`/user-group/add`, {
    school_id,
    title,
    active,
    authorizations,
  });

const updateUserGroup = (
  school_id,
  user_group_id,
  title,
  active,
  authorizations
) =>
  client.post(`/user-group/update`, {
    school_id,
    user_group_id,
    title,
    active,
    authorizations,
  });

const getUserGroups = (school_id) => {
  return client.get(`/${school_id}/user-groups`);
};

const getUserGroupDetails = (school_id, user_group_id) => {
  return client.get(`/${school_id}/user-group/${user_group_id}`);
};

const toggleUserGroupVisibility = (school_id, user_group_id, active) => {
  return client.post(`/user-group/visibility-toggle`, {
    school_id,
    user_group_id,
    active,
  });
};

const deleteUserGroup = (school_id, user_group_id) => {
  return client.post(`/user-group/delete`, {
    school_id,
    user_group_id,
  });
};

const updateNoOfTerms = (
  school_id,
  no_of_terms,
) =>
  client.post(`/no-of-terms/update`, {
    school_id,
    no_of_terms
  });


const getClassTopPerformingStudents = (
  school_id,
) => client.get(`/${school_id}/top-performing-students`);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getClassTopPerformingStudents,
  deleteUserGroup,
  toggleUserGroupVisibility,
  getUserGroupDetails,
  getUserGroups,
  addUserGroup,
  updateUserGroup,
  updateSchoolSettings,
  getNumberOfStudentsInSchool,
  getSchoolAssessmentsData,
  getNumberOfSubjectsInSchool,
  getNoOfSchoolStudentsByGender,
  getNumberOfStaff,
  getNumberOfClasses,
  getStudentAssessmentPerformance,
  getNoOfSchoolStaffByGender,
  getRecentlyRegisteredStudents,
  updatePassword,
  getRecentlyRegisteredStaff,
  updateAssessmentMaxScores,
  updateUserAvatar,
  getGraduationYears,
  updatePeriods,
  updateSchoolTimes,
  addClassSchedule,
  updateClassSchedule,
  getSchoolClassSchedules,
  addSingleClassSchedule,
  updateProfile,
  getParentsCount,
  getStaffStudentAttendancePercentCount,
  updateNoOfTerms,
  updateSchoolSignature
};
