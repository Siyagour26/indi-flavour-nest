import axios from "axios";

const axiosUse = axios.create({
  baseURL: "http://localhost:3000",
});

axiosUse.interceptors.request.use((req) => {
  const token = sessionStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default axiosUse;