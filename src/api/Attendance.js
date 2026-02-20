import client from "./Client";

const recordAttendance = (school_id, student_id, type, date, time) =>
  client.post("/attendance/record", {
    school_id,
    student_id,
    type,
    date,
    time,
  });

const getStudentAttendanceDetails = (school_id, reg_no) =>
  client.get(`${school_id}/attendance/student/${reg_no}/details`);

const getNoOfStaffStat = (school_id, params = {}) => {
  return client.get(`/${school_id}/attendance/stat/staff`, {
    params,
  });
};

const getNoOfStudentsStat = (school_id, params = {}) => {
  return client.get(`/${school_id}/attendance/stat/students`, {
    params,
  });
};

const getClassAttendanceStat = (school_id, params = {}) => {
  return client.get(`/${school_id}/class/attendance/stat/percentage`, {
    params,
  });
};

const getAttendanceHistory = (
  school_id,
  start_date,
  end_date,
  class_ids,
  class_group,
  class_categories,
  student_ids
) =>
  client.post("/attendance-history", {
    school_id,
    start_date,
    end_date,
    class_ids,
    class_group,
    class_categories,
    student_ids,
  });

const updateAttendance = (
  school_id,
  time,
  date,
  status,
  attendance_id,
  student_id
) =>
  client.post("/add-update-attendance", {
    school_id,
    time,
    date,
    status,
    attendance_id,
    student_id,
  });

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  recordAttendance,
  getStudentAttendanceDetails,
  getNoOfStudentsStat,
  getNoOfStaffStat,
  getClassAttendanceStat,
  getAttendanceHistory,
  updateAttendance,
};
