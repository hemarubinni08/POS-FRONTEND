import axios from "axios";

const api = axios.create({

  baseURL: "http://localhost:8080/api",

});

api.interceptors.request.use(

  (config) => {

    const token = localStorage.getItem("token");

    /* PUBLIC URLS */

    const publicUrls = [

      "/authenticate",
      "/user/add",
      "/role/list",
      "/validateToken"

    ];

    const isPublic = publicUrls.some(url =>
      config.url.includes(url)
    );

    /* ADD TOKEN */

    if (token && !isPublic) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }

    return config;
  },

  (error) => Promise.reject(error)
);

api.interceptors.response.use(

  (response) => response,

  (error) => {

    const token = localStorage.getItem("token");

    if (

      token && (

        error.response?.status === 401 ||
        error.response?.status === 403
      )
    ) {

      localStorage.clear();

      window.location.href = "/";

    }

    return Promise.reject(error);
  }
);

export default api;