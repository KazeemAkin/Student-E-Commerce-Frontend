import client from "./Client";

const toggleTermVisibility = (schoolId, termId, active) =>
  client.post("/term/visibility/toggle", {
    school_id: schoolId,
    term_id: termId,
    active,
  });

const getTerms = (schoolId) => client.get(`/terms/${schoolId}`);

const getSingleTerm = (schoolId, termId) =>
  client.get(`/${schoolId}/term/${termId}`);

export default {
  getTerms,
  getSingleTerm,
  toggleTermVisibility,
};
