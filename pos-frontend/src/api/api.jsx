import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // ✅ base URL only
  timeout: 10000,
});

// ✅ REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    console.log(" API CALL:", config.url);

    // ✅ Attach token ONLY if not login API
    if (token && !config.url.includes("/api/authenticate")) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers["Content-Type"] = "application/json";

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => {
    console.log("✅ RESPONSE:", response);
    return response;
  },
  (error) => {
    console.error("❌ API ERROR:", error);

    if (error.response) {
      console.error("❌ STATUS:", error.response.status);
      console.error("❌ DATA:", error.response.data);
    }

    // ✅ Handle 401
    if (error.response?.status === 401) {
      alert("Session expired. Please login again.");
      localStorage.clear();
      window.location.href = "/login";
    }

    // ✅ Handle 403
    if (error.response?.status === 403) {
      alert("Access Denied (403) - Check Roles / Token");
    }

    return Promise.reject(error);
  }
);

export default api;