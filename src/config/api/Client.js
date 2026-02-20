import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://192.168.46.161:8051",
});

export default apiClient;
