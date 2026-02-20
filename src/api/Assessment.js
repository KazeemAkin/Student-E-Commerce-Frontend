/* eslint-disable import/no-anonymous-default-export */
import client from "./Client";

const recordAssessment = (
  school_id,
  student_id,
  ca1 = 0,
  ca2 = 0,
  exam = 0,
  subject_id,
  class_id
) =>
  client.post("/assessment/record", {
    school_id,
    student_id,
    ca1,
    ca2,
    exam,
    subject_id,
    class_id,
  });

const recordAssessments = (student_id, assessments) =>
  client.post("/assessments/record", {
    student_id,
    assessments,
  });

const addStudentPerformanceComment = (
  school_id,
  student_id,
  comment,
  user_id
) =>
  client.post("/assessment/comment/update", {
    school_id,
    student_id,
    comment,
  });

const removeAssessment = (
  school_id,
  student_id,
  session_id,
  term_id,
  subject_id
) =>
  client.post("/assessment/remove", {
    school_id,
    student_id,
    session_id,
    term_id,
    subject_id,
  });

const removeAssessments = (school_id, student_id, session_id, term_id) =>
  client.post("/assessments/remove", {
    school_id,
    student_id,
    session_id,
    term_id,
  });

const addRating = (school_id, value, description) =>
  client.post("/rating-index/add", {
    school_id,
    value,
    description,
  });

const updateRating = (school_id, rating_id, value, description) =>
  client.post("/rating-index/update", {
    school_id,
    rating_id,
    value,
    description,
  });

const deleteRating = (school_id, rating_id) =>
  client.post("/rating-index/delete", {
    school_id,
    rating_id,
  });

const getRatings = (school_id) => client.get(`/${school_id}/rating-indices`);

const getPsychomotor = (school_id) => client.get(`/${school_id}/psychomotor`);

const getRatingDetails = (school_id, rating_id) =>
  client.get(`/${school_id}/rating-index/${rating_id}`);

const addPsychomotor = (school_id, title) =>
  client.post("/psychomotor/add", {
    school_id,
    title,
  });

const updatePsychomotor = (school_id, psychomotor_id, title) =>
  client.post("/psychomotor/update", {
    school_id,
    psychomotor_id,
    title,
  });

const getPsychomotorDetails = (school_id, psychomotor_id) =>
  client.get(`/${school_id}/psychomotor/${psychomotor_id}`);

const deletePsychomotor = (school_id, psychomotor_id) =>
  client.post("/psychomotor/delete", {
    school_id,
    psychomotor_id,
  });

const getAffectiveDomains = (school_id) =>
  client.get(`/${school_id}/affective-domains`);

const getAffectiveDomainDetails = (school_id, affective_domain_id) =>
  client.get(`/${school_id}/affective-domain/${affective_domain_id}`);

const addAffectiveDomain = (school_id, title) =>
  client.post("/affective-domain/add", {
    school_id,
    title,
  });

const updateAffectiveDomain = (school_id, affective_domain_id, title) =>
  client.post("/affective-domain/update", {
    school_id,
    affective_domain_id,
    title,
  });

const deleteAffectiveDomain = (school_id, affective_domain_id) =>
  client.post("/affective-domain/delete", {
    school_id,
    affective_domain_id,
  });

const addPsychomotorForStudent = (
  school_id,
  student_id,
  session_id,
  term_id,
  values
) =>
  client.post("/student/psychomotor/add", {
    school_id,
    student_id,
    session_id,
    term_id,
    values,
  });

const addAffectiveDomainForStudent = (
  school_id,
  student_id,
  session_id,
  term_id,
  values
) =>
  client.post("/student/affective-domain/add", {
    school_id,
    student_id,
    session_id,
    term_id,
    values,
  });

export default {
  recordAssessment,
  addStudentPerformanceComment,
  removeAssessment,
  removeAssessments,
  addRating,
  updateRating,
  deleteRating,
  getRatings,
  getRatingDetails,
  getPsychomotor,
  addPsychomotor,
  updatePsychomotor,
  getPsychomotorDetails,
  deletePsychomotor,
  getAffectiveDomains,
  getAffectiveDomainDetails,
  addAffectiveDomain,
  updateAffectiveDomain,
  deleteAffectiveDomain,
  addPsychomotorForStudent,
  addAffectiveDomainForStudent,
  recordAssessments,
};
