import client from "./Client";

const addSubject = (
  school_id,
  title,
  code,
  active,
  discipline_id,
  category_ids,
  subject_activity_ids
) =>
  client.post("/subject/add", {
    school_id,
    title,
    code,
    active,
    discipline_id,
    category_ids,
    subject_activity_ids,
  });

const addSubjectActivity = (school_id, title) =>
  client.post("/subject-activity/add", {
    school_id,
    title,
  });

const getSubjects = (schoolId, classCategoryId) => {
  const params = {};
  if (classCategoryId) {
    params.categoryId = classCategoryId;
  }
  return client.get(`/${schoolId}/subjects`, { params });
};

// get subjects in class
const getSubjectsInClass = (school_id, class_id) => {
  return client.get(`/${school_id}/class/${class_id}/subjects`);
};

const getSubjectActivities = (schoolId) => {
  return client.get(`/${schoolId}/subject-activities`);
};

const toggleSubjectVisibility = (subject_id, active, school_id) =>
  client.post(`/subject/visibility/toggle`, {
    school_id,
    subject_id,
    active,
  });

const toggleSubjectsInClass = (subject_ids, class_id, school_id) =>
  client.post(`/class/subjects/toggle`, {
    school_id,
    id: class_id,
    subject_ids,
  });

const toggleStaffSubjects = (
  re_indexed_authorized_subjects,
  staff_id,
  school_id
) =>
  client.post(`/staff/subjects/assign`, {
    re_indexed_authorized_subjects,
    id: staff_id,
    school_id,
  });

const updateSubject = (
  subject_id,
  school_id,
  title,
  code,
  active,
  discipline_id,
  category_ids,
  subject_activity_ids
) =>
  client.post("/subject/update", {
    subject_id,
    school_id,
    title,
    code,
    active,
    discipline_id,
    category_ids,
    subject_activity_ids,
  });

const updateSubjectActivity = (id, school_id, title) =>
  client.post("/subject-activity/update", {
    id,
    school_id,
    title,
  });

const deleteSubject = (subject_id, school_id) =>
  client.post("/subject/delete", {
    subject_id,
    school_id,
  });

const deleteSubjectActivity = (id, school_id) =>
  client.post("/subject-activity/delete", {
    id,
    school_id,
  });

const getSingleSubject = (subject_id, school_id) =>
  client.get(`/${school_id}/subject/${subject_id}`);

const getSingleSubjectActivity = (id, school_id) =>
  client.get(`/${school_id}/subject-activity/${id}`);

const positionSubject = (
  school_id,
  class_id,
  session_id,
  term_id,
  subject_ids
) =>
  client.post("/student/subjects/position", {
    school_id,
    class_id,
    session_id,
    term_id,
    subject_ids,
  });

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  addSubject,
  getSubjects,
  toggleSubjectVisibility,
  updateSubject,
  getSingleSubject,
  deleteSubject,
  toggleSubjectsInClass,
  toggleStaffSubjects,
  positionSubject,
  addSubjectActivity,
  getSubjectActivities,
  updateSubjectActivity,
  deleteSubjectActivity,
  getSingleSubjectActivity,
  getSubjectsInClass,
};
