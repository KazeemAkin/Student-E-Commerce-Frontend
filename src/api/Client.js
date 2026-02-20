import axios from "axios";
import { API_SCHOOL_URL } from "../config/config";

const apiClient = axios.create({
  baseURL: API_SCHOOL_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
