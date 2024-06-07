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
    add = (data) => {
        return axiosClient.post("/violate", data);
    };

    updateChecked = (violateId, checked) => {
        return axiosClient.put(`/Violate/${violateId}?isChecked=${checked}`);
    };
}
const violateApi = new ViolateApi();
export default violateApi;
