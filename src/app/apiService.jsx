import axios from "axios";
import { BACKEND_API } from "./config";

const apiService = axios.create({
  baseURL: BACKEND_API,
});

apiService.interceptors.request.use(
  (request) => {
    console.log("Start Request", request);
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
    return Promise.reject(error);
  }
);

apiService.interceptors.response.use(
  (response) => {
    console.log("Response", response);
    return response;
  },
  function (error) {
    console.log("RESPONSE ERROR", error);
    const messagge = error.response?.data?.errors?.message || "UnKnown Error";
    return Promise.reject({ messagge });
  }
);

export default apiService;
