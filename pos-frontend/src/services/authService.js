import axiosInstance from "../api/axiosConfig";
 
export const loginUser = async (loginData) => {
 
    return axiosInstance.post(
        "/api/authenticate",
        loginData
    );
};