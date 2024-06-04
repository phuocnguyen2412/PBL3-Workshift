import axiosClient from "./axiosClient";
class DutyApi {
    getAll = () => {
        return axiosClient.get("/Duty");
    };
    add = (duty) => {
        return axiosClient.post("/Duty", duty);
    };
    delete = (id) => {
        return axiosClient.delete("/Duty" + id);
    };
    change = (duty) => {
        return axiosClient.put("/Duty", duty);
    };
}
const dutyApi = new DutyApi();
export default dutyApi;
