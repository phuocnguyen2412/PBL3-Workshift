import axiosClient from "./axiosClient";
class AuthApi {
    loginByAccount = (account) => {
        return axiosClient.post("/Account/Login", account);
    };
    loginByToken = (token) => {
        return axiosClient.post("/Account/LoginByToken", token);
    };
    changePassword = (data) => {
        return axiosClient.post("/Account/ChangePassword", data);
    };
}
const authApi = new AuthApi();
export default authApi;
