import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

/* PUBLIC ENDPOINTS */
const publicUrls = [
  "/authenticate",
  "/user/add",
  "/role/list",
  "/validateToken",
];

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    const url = config.url || "";

    const isPublic = publicUrls.some((path) =>
      url === path || url.startsWith(path)
    );

    if (token && !isPublic) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const token = localStorage.getItem("token");

    if (token && (status === 401 || status === 403)) {
      localStorage.clear();
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default api;