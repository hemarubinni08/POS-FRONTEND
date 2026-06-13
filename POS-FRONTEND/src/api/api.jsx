import axios from "axios";

const BASE_URL =  "http://localhost:8080/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * ================= TOKEN INTERCEPTOR =================
 */
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

/**
 * ================= GENERIC CRUD FACTORY =================
 */
export const createModuleAPI = (module) => ({
    list: (data) => api.post(`/${module}/list`, data),

    add: (data) => api.post(`/${module}/add`, data),

    update: (data) => api.post(`/${module}/update`, data),

    get: (identifier) =>
        api.get(`/${module}/get`, {
            params: { identifier },
        }),

    delete: (identifier) =>
        api.get(`/${module}/delete`, {
            params: { identifier },
        }),

    toggle: (identifier) =>
        api.post(`/${module}/toggle-status`, null, {
            params: { identifier },
        }),

    findAllActive: () =>
        api.get(`/${module}/findallactive`),
});

/**
 * ================= SPECIFIC MODULE APIs =================
 */

// PRODUCT
export const ProductAPI = createModuleAPI("product");

// SHELF
export const ShelfAPI = createModuleAPI("shelf");

// CATEGORY
export const CategoryAPI = createModuleAPI("category");

// BRAND
export const BrandAPI = createModuleAPI("brand");

// MODEL
export const ModelAPI = createModuleAPI("model");

// UNIT
export const UnitAPI = createModuleAPI("unit");

export default api;