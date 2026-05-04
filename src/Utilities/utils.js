import _ from "lodash";

const prepareResponseData = (response) => {
  try {
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
  } catch (error) {
    return {
      success: false,
      response: "Something went wrong.",
      // eslint-disable-next-line
      logUserOut: response?.data?.message == "Invalid authentication token",
    };
  }
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
  formatDateToCustom,
  snakeToCamelCase,
  camelToSnakeCase,
  convertKeysToCamelCase,
  convertKeysToSnakeCase,
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
  toCurrency,
  convertToSnakeCase,
  isCamelCase,
  validPayload,
  toNormalCase,
  humanizeDate,
};
