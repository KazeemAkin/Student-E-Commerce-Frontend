import client from "./Client";

const addDiscipline = (school_id, title) =>
  client.post("/discipline/add", {
    school_id,
    title,
  });

const updateDiscipline = (discipline_id, school_id, title) =>
  client.post("/discipline/update", {
    id: discipline_id,
    school_id,
    title,
  });

const getDisciplines = (schoolId) => client.get(`/${schoolId}/disciplines`);

const deleteDiscipline = (discipline_id, school_id) =>
  client.post("/discipline/delete", {
    id: discipline_id,
    school_id,
  });

const getSingleDiscipline = (discipline_id, school_id) =>
  client.get(`/${school_id}/discipline/${discipline_id}`);

export default {
  addDiscipline,
  updateDiscipline,
  getSingleDiscipline,
  deleteDiscipline,
  getDisciplines,
};
