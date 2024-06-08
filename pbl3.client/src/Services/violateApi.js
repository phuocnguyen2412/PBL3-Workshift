import axiosClient from "./axiosClient";
class ViolateApi {
    getAll = () => {
        return axiosClient.get("/Violate");
    };
    getAllOfManager(id) {
        return axiosClient.get("/Violate/ByManagerId/" + id);
    }
    getAllOfEmployeeId(id) {
        return axiosClient.get("/Violate/ByemployeeId/" + id);
    }
    getAllOfDate(date) {
        return axiosClient.get("/Violate/ByDate?date=" + date);
    }
    add = (data) => {
        return axiosClient.post("/violate", data);
    };

    updateChecked = (violateId, checked) => {
        return axiosClient.put(`/Violate/${violateId}?isChecked=${checked}`);
    };

    updateHandle = (violateId, handle) =>
        axiosClient.put(`/Violate/Handle/${handle}?id=${violateId}`);
}
const violateApi = new ViolateApi();
export default violateApi;
