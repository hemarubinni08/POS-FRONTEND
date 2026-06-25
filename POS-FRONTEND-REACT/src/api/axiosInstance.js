import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const url = config.url || "";

  // Public endpoints that do not require a login toke
  // n
  const publicPaths = [
    "/authenticate",
    "/user/add",
    "/role/findAllActive",
  ];

  const isPublic = publicPaths.some((path) => url.includes(path));

  if (!token && !isPublic) {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    return Promise.reject(new Error("Authentication required"));
  }

  // Only attach Authorization header for non-public requests.
  // Avoid sending a stale or invalid token when calling public endpoints
  // such as /authenticate which can lead to 403 responses.
  if (token && !isPublic) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;