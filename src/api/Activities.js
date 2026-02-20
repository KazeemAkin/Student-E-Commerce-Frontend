/* eslint-disable import/no-anonymous-default-export */
import client from "./Client";

const addActivityType = (school_id, title, nature, icon, color) =>
  client.post("/activity-type/add", {
    school_id,
    title,
    nature,
    icon,
    color
  });

const updateActivityType = (school_id, id, title, nature, icon, color) =>
  client.post("/activity-type/update", {
    school_id,
    title,
    nature,
    icon,
    id,
    color
  });

const deleteActivityType = (school_id, id) =>
  client.post("/activity-type/delete", {
    school_id,
    id
  });

const getActivityType = (schoolId, id) => {
  return client.get(`/${schoolId}/activity-type/${id}`);
};

const getActivityTypes = (schoolId) => {
  return client.get(`/${schoolId}/activity-types`);
};


const addActivity = (school_id, params) =>
  client.post("/activity/add", { ...params, school_id });

const getActivities = (school_id, class_id = null, staff_id = null, student_id = null, size) => {
  const params = {};
  if (class_id) {
    params.class_id = class_id;
  }
  if (staff_id) {
    params.staff_id = staff_id;
  }
  if (student_id) {
    params.student_id = student_id;
  }
  if (size) {
    params.size = size;
  }
  return client.get(`/${school_id}/activities`, { params });
};

const getActivityDetails = (schoolId, id) => {
  return client.get(`/${schoolId}/activity-details/${id}`);
};

const updateActivity = (school_id, activity_id, params) =>
  client.post("/activity/update", { ...params, activity_id, school_id });

const deleteActivity = (school_id, activity_id) =>
  client.post("/activity/delete", {
    school_id,
    activity_id
  });

const getActivitiesStatusCount = (schoolId) => {
  return client.get(`/${schoolId}/activities-status-count`);
};

const getActivitiesStatusLists = (schoolId) => {
  return client.get(`/${schoolId}/activities-status-lists`);
};

export default {
  getActivitiesStatusLists,
  getActivitiesStatusCount,
  updateActivityType,
  addActivityType,
  getActivityType,
  getActivityTypes,
  deleteActivityType,
  addActivity,
  getActivities,
  getActivityDetails,
  updateActivity,
  deleteActivity
};
