import client from "./Client";

const addSession = (schoolId, title, active) =>
  client.post("/session/create", {
    school_id: schoolId,
    title: title,
    active,
  });

const updateSession = (sessionId, schoolId, title, active) =>
  client.post("/session/update", {
    session_id: sessionId,
    school_id: schoolId,
    title: title,
    active,
  });

const toggleSessionVisibility = (schoolId, sessionId, active) =>
  client.post("/session/visibility/toggle", {
    school_id: schoolId,
    session_id: sessionId,
    active,
  });

const getSessions = (schoolId) => client.get(`/sessions/${schoolId}`);

const getSession = (sessionId, schoolId) =>
  client.get(`/${schoolId}/sessions/${sessionId}`);

export default {
  addSession,
  getSession,
  getSessions,
  updateSession,
  toggleSessionVisibility,
};
