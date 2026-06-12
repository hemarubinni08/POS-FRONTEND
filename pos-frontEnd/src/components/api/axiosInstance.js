import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const publicUrls = [
  "/authenticate",
  "/user/register",
  "/role/list",
];

axiosInstance.interceptors.request.use(
  (config) => {
    const isPublicUrl = publicUrls.some((url) =>
      config.url?.includes(url)
    );

    if (!isPublicUrl && typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;