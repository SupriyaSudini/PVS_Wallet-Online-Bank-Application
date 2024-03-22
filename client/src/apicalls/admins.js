const {axiosInstance}  = require(".");

// get all users and admins for super admin panel
export const GetAllAdmins = async () => {
    try {
        const { data } = await axiosInstance.get("/api/admins/usersadmins");
        return data;
    } catch (error) {
        return error.response.data;
    }
}


export const UpdateAdminStatus = async (payload) => {
    try {
       const { data } = await axiosInstance.post("/api/admins/update-admin-status", payload);
       return data;
    } catch (error) {
       return error.response.data;
    }
}

