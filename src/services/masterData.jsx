import api from "./api"

export const getBrands = async () => {
  const res = await api.post("/api/brand/list", {
    page: 0,
    sizePerPage: 100
  })
  return res.data || []
}

export const getModels = async () => {
  const res = await api.post("/api/models/list", {
    page: 0,
    sizePerPage: 100
  })
  return res.data || []
}

export const getUnits = async () => {
  const res = await api.post("/api/unit/list", {
    page: 0,
    sizePerPage: 100
  })
  return res.data || []
}

export const getCategories = async () => {
  const res = await api.post("/api/category/list", {
    page: 0,
    sizePerPage: 100
  })
  return res.data || []
}