const {axiosInstance}  = require(".");

//Update user info
// Update user info
export const UpdateUserInfo = async (payload) => {
    try {
        // console.log("Payload:", payload);
        const { data } = await axiosInstance.post("/api/profile/edit/update-user-info", payload);
      
        return data;
    } catch (error) {
        return error.response.data;
    }
}



