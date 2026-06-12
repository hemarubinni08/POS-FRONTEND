import axios from "axios";
 
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});
 
axiosInstance.interceptors.request.use((config) => {
  const rawToken = localStorage.getItem("token");
  const url = config.url || "";
 
  // Public endpoints that do not require a login token
  const publicPaths = [
    "/authenticate",
    "/user/add",
    "/role/list",
  ];
 
  const isPublic = publicPaths.some((path) => url.includes(path));
 
  if (!rawToken && !isPublic) {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    return Promise.reject(new Error("Authentication required"));
  }
 
  // Only attach Authorization header for non-public requests.
  // Avoid sending a stale or invalid token when calling public endpoints
  // such as /authenticate which can lead to 403 responses.
  if (rawToken && !isPublic) {
    const cleanedToken = rawToken.replace(/^Bearer\s+/i, "").trim();
    config.headers.Authorization = `Bearer ${cleanedToken}`;
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
