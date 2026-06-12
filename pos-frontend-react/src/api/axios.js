import axios from "axios";
 
const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const openEndpoints = [
    "/authenticate",
    "/user/register",
    "/role/findByStatus",
  ];
 
  if (!openEndpoints.includes(config.url) && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
 
  return config;
});
export default api;