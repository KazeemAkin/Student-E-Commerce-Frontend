import client from "./Client";

const addClass = (school_id, title, active, category) =>
  client.post("/class/add", {
    school_id,
    title,
    active,
    category,
  });

const addClassCategory = (school_id, title) =>
  client.post("/class/category/add", {
    school_id,
    title,
  });

const getClasses = (schoolId) => client.get(`/${schoolId}/classes`);

const getClassCategories = (schoolId) =>
  client.get(`/${schoolId}/categories/class`);

const toggleClassVisibility = (class_id, active, school_id) =>
  client.post(`/class/visibility/toggle`, {
    school_id,
    id: class_id,
    active,
  });

const updateClass = (class_id, school_id, title, active, category_id) =>
  client.post("/class/update", {
    id: class_id,
    school_id,
    title,
    active,
    category_id,
  });

const updateClassTeacher = (class_id, school_id, class_teacher_id) =>
  client.post("/class/teacher/update", {
    id: class_id,
    school_id,
    class_teacher_id,
  });

const updateClassCategory = (categoryId, school_id, title) =>
  client.post("/class/category/update", {
    id: categoryId,
    school_id,
    title,
  });

const deleteClassCategory = (category_id, school_id) =>
  client.post("/class/category/delete", {
    id: category_id,
    school_id,
  });

const deleteClass = (class_id, school_id) =>
  client.post("/class/delete", {
    id: class_id,
    school_id,
  });

const assignClassesToStaff = (class_ids, staff_id, school_id) =>
  client.post("/staff/class/assign", {
    class_ids,
    id: staff_id,
    school_id,
  });

const postionClass = (
  school_id,
  class_id,
  session_id,
  term_id,
  subjects_to_assess,
  no_of_subjects_to_grade
) =>
  client.post("/class/assessment/position", {
    class_id,
    session_id,
    term_id,
    subjects_to_assess,
    school_id,
    no_of_subjects_to_grade
  });

const getSingleClass = (class_id, school_id) =>
  client.get(`/${school_id}/class/${class_id}`);

const getSingleCategory = (category_id, school_id) =>
  client.get(`/${school_id}/category/${category_id}/class`);

const getNumOfStudents = (class_id, school_id) =>
  client.get(`/${school_id}/stat/class/${class_id}/students`);

const studentAttendanceCount = (class_id, school_id) =>
  client.get(`/${school_id}/attendance/class/${class_id}/count`);

const getNumOfClassSubjects = (class_id, school_id) =>
  client.get(`/${school_id}/stat/class/${class_id}/subjects`);

const getAssessmentPercentage = (class_id, school_id) =>
  client.get(`/${school_id}/stat/class/${class_id}/assessment`);

const getStudentsInClassPerformance = (
  class_id,
  school_id,
  termId,
  sessionId,
  limit = null
) => {
  const params = {};

  if (termId) {
    params.termId = termId;
  }

  if (limit) {
    params.limit = limit;
  }

  if (sessionId) {
    params.sessionId = sessionId;
  }

  return client.get(`/${school_id}/class/${class_id}/performance/students`, {
    params: params,
  });
};

const getNumberOfStudentsByGender = (
  class_id,
  school_id,
  termId = null,
  sessionId = null
) => {
  const params = {};

  if (termId) {
    params.termId = termId;
  }

  if (sessionId) {
    params.sessionId = sessionId;
  }

  return client.get(`/${school_id}/stat/class/${class_id}/gender/students`, {
    params,
  });
};

const getSubjectsInClass = (class_id, school_id, limit) => {
  const params = {};
  if (limit) {
    params.limit = limit;
  }
  return client.get(`/${school_id}/class/${class_id}/subjects`, {
    params,
  });
};

const updateClassScheduleInterval = (category_id, school_id, interval) =>
  client.post("/class/schedule/interval/update", {
    category_id,
    school_id,
    interval,
  });

const updateLessonClassInterval = (school_id, lesson_class_interval) =>
  client.post("/class/lesson/schedule/interval/update", {
    school_id,
    lesson_class_interval,
  });

const updateMaxClassPeriodsInARow = (school_id, max_class_periods_in_a_row) =>
  client.post("/class/periods-in-a-row/update", {
    school_id,
    max_class_periods_in_a_row,
  });

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAssessmentPercentage,
  getNumOfClassSubjects,
  getNumOfStudents,
  addClass,
  getClasses,
  toggleClassVisibility,
  updateClass,
  getSingleClass,
  deleteClass,
  getStudentsInClassPerformance,
  getNumberOfStudentsByGender,
  getSubjectsInClass,
  assignClassesToStaff,
  postionClass,
  addClassCategory,
  updateClassCategory,
  deleteClassCategory,
  getClassCategories,
  getSingleCategory,
  updateClassTeacher,
  updateClassScheduleInterval,
  updateLessonClassInterval,
  updateMaxClassPeriodsInARow,
  studentAttendanceCount
};
