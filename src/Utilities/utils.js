import _ from "lodash";

const prepareResponseData = (response) => {
  const accessToken = response.headers.get("AccessToken");
  if (!empty(accessToken)) {
    localStorage.setItem("studentAccessToken", accessToken);
  }

  if (
    empty(response) ||
    empty(response.data) ||
    empty(response.data.success) ||
    empty(response.statusText) ||
    response.statusText !== "OK"
  ) {
    return !empty(response?.data?.message)
      ? {
          ...(isObject(response.data.message)
            ? response.data.message
            : { response: response.data.message }),
          success: false,
          logOut: !empty(response?.data?.message?.logOut)
            ? response.data.message.logOut
            : false,
          statusCodeType: !empty(response?.data?.statusCodeType)
            ? response.data.statusCodeType
            : false,
          others: isObject(response?.data?.message)
            ? (({ logOut, statusCodeType, message, ...rest }) => rest)(
                response.data.message,
              )
            : {},
        }
      : {
          response: "",
          success: true,
          statusCodeType: !empty(response?.data?.statusCodeType)
            ? response.data.statusCodeType
            : false,
        };
  }
  const response_data =
    !empty(response?.data?.data) && !empty(response?.data?.success)
      ? {
          response: response.data.data,
          success: response.data.success,
          count: !empty(response?.data?.count) ? response.data.count : 0,
        }
      : { success: response?.data?.success || false };
  return response_data;
};

const isNumber = (value = null) => {
  try {
    return (
      typeof value === "number" && value !== Infinity && value !== -Infinity
    );
  } catch (error) {
    return false;
  }
};

const isBoolean = (value = null) => {
  return typeof value === "boolean" || value === true || value === false;
};

const isUndefined = (value = undefined) => {
  return typeof value === "undefined" || value === undefined;
};

const isObject = (value = null) => {
  return typeof value === "object" &&
    Object?.prototype?.toString?.call(value) === "[object Object]"
    ? true
    : false;
};

const isArray = (value = null) => {
  return (typeof value === "object" &&
    Object?.prototype?.toString?.call(value) === "[object Array]") ||
    Array.isArray(value)
    ? true
    : false;
};

const isString = (value = null) => {
  return typeof value === "string";
};

const isNull = (value = null) => {
  return value === null ? true : false;
};

const empty = (value = null) => {
  let flag = false;
  if (isString(value) && (value === "" || value.trim() === "")) flag = true;
  else if (isNumber(value) && value === 0) flag = true;
  else if (isBoolean(value) && value === false) flag = true;
  else if (isObject(value) && Object.values(value).length === 0) flag = true;
  else if (isArray(value) && value.length === 0) flag = true;
  else if (isUndefined(value)) flag = true;
  else if (isNull(value)) flag = true;
  else if (Array.isArray(value) && value.length === 0) flag = true;
  else if (typeof value === "object" && Object.keys(value).length === 0)
    flag = true;

  return flag;
};

const reIndex = (array, key = "_id") => {
  const indexed_array = {};
  if ((_.isArray(array) || _.isObject(array)) && !_.isEmpty(array)) {
    _.forEach(array, (item) => {
      if (_.isObject(item) && _.has(item, key)) {
        indexed_array[item[key]] = item;
      }
    });
    return indexed_array;
  } else {
    return {};
  }
};

const findGrade = (remarks = [], scoreGrades, defaultCategoryId, score) => {
  let data = [];
  if (empty(remarks)) {
    data =
      !empty(scoreGrades[defaultCategoryId]) &&
      !empty(scoreGrades[defaultCategoryId].remarks)
        ? scoreGrades[defaultCategoryId].remarks
        : [];
  } else if (!empty(remarks) && isArray(remarks)) {
    data = remarks;
  }

  for (const item of data) {
    const _score = isNumber(score) ? Math.ceil(score) : 0;
    if (item.min <= _score && _score <= item.max) {
      return item;
    }
  }

  return {};
};

const toCurrency = (number) => {
  return number?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const convertToSnakeCase = (str) => {
  return str.replace(/[\s/]+/g, "_").toLowerCase();
};

const isCamelCase = (str) => /^[a-z][a-zA-Z0-9]*$/.test(str);
const isSnakeCase = (str) => /^[a-z]+(_[a-z]+)*$/.test(str);

const validPayload = (obj) => {
  const cleanedObj = {};

  Object.keys(obj).forEach((key) => {
    const value = obj[key];

    // Check if key is camelCased and value is not empty
    if (
      isSnakeCase(key) &&
      value !== null &&
      value !== undefined &&
      value !== ""
    ) {
      cleanedObj[key] = value;
    }
  });

  return cleanedObj;
};

const toNormalCase = (str) => {
  return str
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Humanize the date
const humanizeDate = (dateString) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleString();
  } catch (error) {
    return dateString;
  }
};

// Helper function to convert time string (HH:MM) to minutes since midnight
function timeStringToMinutes(timeString) {
  const [hours, minutes] = timeString.split(":").map(Number);
  return hours * 60 + minutes;
}

// Helper function to convert minutes since midnight to time string (HH:MM)
function minutesToTimeString(minutes) {
  const hours = String(Math.floor(minutes / 60)).padStart(2, "0");
  const mins = String(minutes % 60).padStart(2, "0");
  return `${hours}:${mins}`;
}

function generateTimeIntervals(interval, schoolStartTime, schoolEndTime) {
  const timeArray = [];

  const startTimeInMinutes = timeStringToMinutes(schoolStartTime);
  const endTimeInMinutes = timeStringToMinutes(schoolEndTime);

  let currentTime = startTimeInMinutes + interval;

  let id = 0;
  while (currentTime <= endTimeInMinutes) {
    timeArray.push({
      _id: id,
      value: minutesToTimeString(currentTime),
    });
    currentTime += interval;
    id++;
  }

  return timeArray;
}

function convertTo24HourFormat(time) {
  const [timePart, modifier] = time.split(" ");
  let [hours, minutes] = timePart.split(":");

  if (modifier === "PM" && hours !== "12") {
    hours = parseInt(hours, 10) + 12; // Convert PM hour to 24-hour format
  } else if (modifier === "AM" && hours === "12") {
    hours = "0"; // Midnight case
  }

  return `${String(hours).padStart(2, "0")}:${minutes}`;
}

function convertTimeTo12HourFormat(time) {
  if (!time || typeof time !== "string" || !/^\d{1,2}:\d{2}$/.test(time)) {
    return time;
  }

  let [hours, minutes] = time.split(":").map(Number);

  const modifier = hours >= 12 ? "PM" : "AM";
  if (hours === 0) {
    hours = 12;
  } else if (hours > 12) {
    hours -= 12;
  }
  return `${hours}:${String(minutes).padStart(2, "0")} ${modifier}`;
}

// Helper function to convert time to a 12-hour format
const convertTo12HourFormat = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? "PM" : "AM";
  const adjustedHours = hours % 12 || 12;
  return `${adjustedHours}:${minutes?.toString()?.padStart(2, "0") || ""} ${period}`;
};

function timeStringToDate(timeString) {
  return new Date(`1970-01-01T${convertTo24HourFormat(timeString)}`);
}

function generateValidStartTimes(
  lessonStartTime,
  classStartTime,
  schoolEndTime,
  classDuration,
  breakTimes,
) {
  let classIntervals = [];
  let count = 0;

  // Convert all time strings to Date objects
  let currentTime = timeStringToDate(classStartTime);
  const schoolEnd = timeStringToDate(schoolEndTime);
  const lessonStart = timeStringToDate(lessonStartTime);

  // Generate intervals before each break
  for (let breakTime of breakTimes) {
    let breakStart = timeStringToDate(breakTime.start_time);
    let breakEnd = timeStringToDate(breakTime.end_time);

    // Generate intervals from currentTime up to break start
    while (currentTime < breakStart) {
      let endTime = new Date(currentTime.getTime() + classDuration * 60000);

      // If the end time exceeds the break start time, stop
      if (endTime > breakStart) break;

      // Format time to 12-hour format with AM/PM
      const hours = currentTime.getHours();
      const minutes =
        currentTime?.getMinutes()?.toString()?.padStart(2, "0") || "";
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12;

      const timeString = `${formattedHours}:${minutes} ${ampm}`;

      // Add the interval
      classIntervals.push({
        value: timeString,
        _id: count,
      });

      // Move to the next interval
      currentTime = endTime;
      count++;
    }

    // Move currentTime to breakEnd to start new intervals after the break
    currentTime = breakEnd;
  }

  // Generate intervals after the last break until school end time
  while (currentTime < schoolEnd) {
    let endTime = new Date(currentTime.getTime() + classDuration * 60000);

    // If the endTime exceeds the school end time, break the loop
    if (endTime > schoolEnd) break;

    // Format time to 12-hour format with AM/PM
    const hours = currentTime.getHours();
    const minutes =
      currentTime?.getMinutes()?.toString()?.padStart(2, "0") || "";
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;

    const timeString = `${formattedHours}:${minutes} ${ampm}`;

    // Add the interval
    classIntervals.push({
      value: timeString,
      _id: count,
    });
    count++;

    // Move to the next interval
    currentTime = endTime;
  }

  // Filter intervals to ensure they do not start after the lesson start time
  return classIntervals.filter((interval) => {
    const intervalTime = timeStringToDate(interval.value);
    return intervalTime < lessonStart;
  });
}

function generateValidLessonStartTime(
  lessonStartTime,
  schoolEndTime,
  classDuration,
) {
  let classIntervals = [];
  let count = 0;

  // Convert lessonStartTime and schoolEndTime to Date objects
  let currentTime = timeStringToDate(lessonStartTime);
  const schoolEnd = timeStringToDate(schoolEndTime);

  // Generate intervals until the school end time
  while (currentTime < schoolEnd) {
    // Calculate the end time of the current interval
    let endTime = new Date(currentTime.getTime() + classDuration * 60000);

    // If the end time exceeds the school end time, stop adding more intervals
    if (endTime > schoolEnd) break;

    // Format the current start time to 12-hour format with AM/PM
    const formattedTime = formatTime(currentTime);

    // Add the interval with an ID
    classIntervals.push({
      value: formattedTime,
      _id: count,
    });

    // Move to the next interval
    currentTime = endTime;
    count++;
  }

  return classIntervals;
}

function formatTime(date) {
  try {
    if (new Date(date)) {
      const hours = date.getHours();
      const minutes = date.getMinutes()?.toString()?.padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12;

      return `${formattedHours}:${minutes} ${ampm}`;
    }
  } catch (error) {
    console.log(error);
  }
  return "";
}

function calculateEndTime(startTime, classInterval, numberOfPeriods) {
  // Parse the start time into hours, minutes, and period (AM/PM)
  let [time, period] = startTime.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  // Convert the start time to 24-hour format for calculation
  if (period === "PM" && hours !== 12) {
    hours += 12;
  } else if (period === "AM" && hours === 12) {
    hours = 0;
  }

  // Check if startTime is valid
  if (isNaN(hours) || isNaN(minutes)) {
    throw new Error("Invalid start time format. Please use 'HH:MM AM/PM'.");
  }

  // Calculate the total minutes for the class periods
  const totalMinutes = classInterval * numberOfPeriods;

  // Add the total minutes to the start time
  minutes += totalMinutes;

  // Convert minutes into hours and adjust accordingly
  hours += Math.floor(minutes / 60);
  minutes %= 60;

  // Convert back to 12-hour format
  const endPeriod = hours >= 12 ? "PM" : "AM";
  const endHours = hours % 12 || 12; // Convert 0 to 12 for midnight and noon
  const endMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${endHours}:${endMinutes} ${endPeriod}`;
}

function checkTimeOverlap(start_time, end_time, arrayOfDateObjects) {
  // Convert the provided start_time and end_time into Date objects
  start_time = convertTo24HourFormat(start_time);
  end_time = convertTo24HourFormat(end_time);
  let startTime = new Date(`1970-01-01T${start_time}`);
  let endTime = new Date(`1970-01-01T${end_time}`);

  // Loop through the break arrayOfDateObjects and check for overlap
  for (let dateObject of arrayOfDateObjects) {
    let objectStartTime = new Date(
      `1970-01-01T${convertTo24HourFormat(dateObject.start_time)}`,
    );
    let objectEndTime = new Date(
      `1970-01-01T${convertTo24HourFormat(dateObject.end_time)}`,
    );

    // Check if the times overlap, with the new condition to ignore exact match cases
    if (
      startTime < objectEndTime &&
      endTime > objectStartTime && // General overlap check
      !(endTime === objectStartTime || startTime === objectEndTime) // No overlap if class ends when break starts or class starts when break ends
    ) {
      return true; // Overlap found
    }
  }
  return false; // No overlap found
}

// Function to check if a time falls within a break
const isDuringBreak = (startTime, endTime, breakDetails) => {
  return breakDetails.some((breakDetail) => {
    const breakStart = timeStringToDate(breakDetail.start_time).getTime();
    const breakEnd = timeStringToDate(breakDetail.end_time).getTime();
    const begining = timeStringToDate(startTime).getTime();
    const end = timeStringToDate(endTime).getTime();
    return begining >= breakStart && end <= breakEnd;
  });
};

// Function to get the schedule item for a specific time slot
const getScheduleItem = (day, timeSlot, classId, scheduleData) => {
  return scheduleData.find(
    (item) =>
      item.day === day &&
      timeStringToDate(item.startTime).getTime() === timeSlot.getTime() &&
      item.classId === classId,
  );
};

// Calculate the number of periods a class spans
const getNumberOfPeriods = (startTime, endTime, normalClassInterval) => {
  const diffInMinutes = (endTime - startTime) / (1000 * 60);
  return Math.ceil(diffInMinutes / normalClassInterval);
};

// Function to generate time slots with 12-hour time inputs
const generateTimeSlots = (
  normalClassInterval,
  lessonInterval,
  classStartTime,
  classEndTime,
  lessonStartTime,
  breakDetails,
) => {
  let timeSlots = [];

  // Convert times to 24-hour format for easier comparison
  let currentTime = convertTo24HourFormat(classStartTime);
  const classEnd24 = convertTo24HourFormat(classEndTime);
  const lessonStart24 = convertTo24HourFormat(lessonStartTime);

  // Convert currentTime to a Date object for manipulation
  currentTime = new Date(`1970-01-01T${currentTime}:00`);
  const classEndDate = new Date(`1970-01-01T${classEnd24}:00`);
  const lessonStartDate = new Date(`1970-01-01T${lessonStart24}:00`);

  // Convert break times to Date objects for comparison
  const breaks = breakDetails.map((breakItem) => ({
    start: new Date(
      `1970-01-01T${convertTo24HourFormat(breakItem.start_time)}:00`,
    ),
    end: new Date(`1970-01-01T${convertTo24HourFormat(breakItem.end_time)}:00`),
    label: `Break ${breakItem.break_number}`,
  }));

  while (currentTime < classEndDate) {
    // Check if the current time overlaps with any break period
    const breakPeriod = breaks.find(
      // eslint-disable-next-line no-loop-func
      ({ start, end }) => currentTime >= start && currentTime < end,
    );

    if (breakPeriod) {
      // If it's break time, add the break slot
      timeSlots.push({
        startTime: convertTo12HourFormat(breakPeriod.start),
        endTime: convertTo12HourFormat(breakPeriod.end),
        label: breakPeriod.label,
      });

      // Set currentTime to the end of the break and continue
      currentTime = new Date(breakPeriod.end);
      continue;
    }

    // Determine if we should use the lesson interval or the normal class interval
    const interval =
      currentTime >= lessonStartDate ? lessonInterval : normalClassInterval;

    // Calculate end time for the current slot
    const endTime = new Date(currentTime);
    endTime.setMinutes(endTime.getMinutes() + interval);

    // Store time slots in 12-hour format for display
    timeSlots.push({
      startTime: convertTo12HourFormat(currentTime),
      endTime: convertTo12HourFormat(endTime),
      label: "Class",
    });

    // Move to the next time slot
    currentTime = endTime;
  }

  return timeSlots;
};

const calculateColSpan = (
  scheduleStartTime,
  scheduleEndTime,
  normalClassInterval,
  lessonInterval,
  lessonStartTime,
) => {
  const timeDifference = (scheduleEndTime - scheduleStartTime) / (1000 * 60); // difference in minutes

  // Determine if this is during lesson time
  const isLessonTime = scheduleStartTime >= timeStringToDate(lessonStartTime);

  // Use the appropriate interval
  const interval = isLessonTime ? lessonInterval : normalClassInterval;

  // Calculate colSpan based on the interval
  return Math.ceil(timeDifference / interval);
};

// Function to calculate if the time difference is a normal time interval
function isNormalTimeInterval(startTime, endTime, normalTimeInterval) {
  const start = timeStringToDate(startTime);
  const end = timeStringToDate(endTime);

  // Calculate difference in minutes
  const differenceInMinutes = (end - start) / (1000 * 60);

  // Check if the difference is divisible by the normalTimeInterval
  return differenceInMinutes % normalTimeInterval === 0;
}

/**
 * handle file upload
 */
const handleFileUpload = async (event, setPreviewAvatar) => {
  try {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      // Convert file to Base64 when the file is loaded
      reader.onloadend = async () => {
        const base64String = reader.result;
        setPreviewAvatar(base64String);
      };
      reader.readAsDataURL(file);
    }
  } catch (error) {}
};

const compareArrays = (data1, data2) => {
  if (!isArray(data1) || !isArray(data2)) {
    return false;
  }
  if (data1.length !== data2.length) {
    return false;
  }

  for (let i = 0; i < data1.length; i++) {
    const obj1 = data1[i];
    const obj2 = data2[i];

    if (obj1?.name !== obj2?.name || obj1?.title !== obj2?.title) {
      return false;
    }
  }

  return true;
};

const getInputDateFormat = (now) => {
  try {
    if (!now) {
      now = new Date();
    }
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  } catch (error) {
    console.log({ error });
    return "";
  }
};

const debounce = (func, wait) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

const snakeToCamelCase = (value) => {
  const str = String(value);
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};

const camelToSnakeCase = (value) => {
  if (value == null || typeof value !== "string") {
    return String(value);
  }
  return value
    .replace(/([A-Z])/g, "_$1")
    .toLowerCase()
    .replace(/^_/, "");
};

const convertKeysToCamelCase = (obj) => {
  if (isObject(obj)) {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [snakeToCamelCase(key), value]),
    );
  }

  return false;
};

const convertKeysToSnakeCase = (obj) => {
  if (isObject(obj)) {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [camelToSnakeCase(key), value]),
    );
  }

  return false;
};

/**
 * convert js date to this format MM/DD/YYYY HH:MM AM/PM
 */
const formatDateToCustom = (dateInput, includeTime = true) => {
  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) {
      return dateInput;
    }

    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";

    hours = hours % 12 || 12;
    hours = String(hours).padStart(2, "0");

    if (includeTime) {
      return `${month}/${day}/${year} ${hours}:${minutes} ${ampm}`;
    }
    return `${month}/${day}/${year}`;
  } catch (error) {}
};

/**
 * Check if amount (currency) provided is a valid and can be made a float number
 * @param {*} amount
 * @returns true for valid and false for invalid
 */
function isValidAmount(amount) {
  try {
    if (parseFloat(amount) && parseFloat(amount) !== "NaN" && !isNaN(amount)) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

/**
 * Convert number to currency format e.g 20000 -> 20,000.00
 * @param {*} amount
 * @returns
 */
const toAmountFormat = (amount) => {
  try {
    if (amount === 0) {
      return "0.00";
    }
    if (!isValidAmount(amount)) {
      return "0.00";
    }
    return Number(amount).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  } catch (error) {
    return amount;
  }
};

export {
  isValidAmount,
  toAmountFormat,
  convertTimeTo12HourFormat,
  formatDateToCustom,
  snakeToCamelCase,
  camelToSnakeCase,
  convertKeysToCamelCase,
  convertKeysToSnakeCase,
  generateTimeSlots,
  getScheduleItem,
  getNumberOfPeriods,
  prepareResponseData,
  empty,
  isNumber,
  isArray,
  isBoolean,
  isObject,
  isString,
  isUndefined,
  isNull,
  reIndex,
  findGrade,
  toCurrency,
  convertToSnakeCase,
  isCamelCase,
  validPayload,
  toNormalCase,
  generateTimeIntervals,
  timeStringToMinutes,
  minutesToTimeString,
  generateValidStartTimes,
  convertTo24HourFormat,
  calculateEndTime,
  checkTimeOverlap,
  generateValidLessonStartTime,
  isDuringBreak,
  timeStringToDate,
  calculateColSpan,
  isNormalTimeInterval,
  humanizeDate,
  handleFileUpload,
  compareArrays,
  getInputDateFormat,
  debounce,
  convertTo12HourFormat,
};
