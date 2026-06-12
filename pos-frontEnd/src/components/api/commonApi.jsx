import axiosInstance from "./axiosInstance";
 
const commonApi = {

    active: async (routeName) => {
  return await axiosInstance.get(`/${routeName}/active`);
},

  toggle: async (routeName, identifier) => {
    return await axiosInstance.get(`/${routeName}/toggle`, {
      params: {
        identifier,
      },
    });
  },
 
  // LIST
  list: async (routeName, payload) => {
    return await axiosInstance.post(`/${routeName}/list`, payload);
  },
 
  // ADD
  add: async (routeName, payload) => {
    return await axiosInstance.post(`/${routeName}/add`, payload);
  },
  
  // UPDATE
  update: async (routeName, payload) => {
    return await axiosInstance.post(`/${routeName}/update`, payload);
  },
 
  // DELETE
  delete: async (routeName, deleteField, value) => {
    return await axiosInstance.get(`/${routeName}/delete`,
      {
        params: {
          [deleteField]: value,
        },
      }
    );
  },
};

 
export default commonApi;
 