import axiosClient from "./axiosClient";
class EmployeeApi {
    getAll = () => {
        return axiosClient.get("/Employee");
    };
    add = (employee) => {
        return axiosClient.post("/Employee", employee);
    };
    delete = (id) => {
        return axiosClient.delete("/Employee/" + id);
    };
    change = (employee) => {
        return axiosClient.put("/Employee", employee);
    };
    findByName = (name) => {
        return axiosClient.get("/Employee/search/" + name);
    };
    findById = (id) => {
        return axiosClient.get("/Employee/" + id);
    };
    findByStatus = (status) => {
        return axiosClient.get("/Employee/status/" + status);
    };
}
const employeeApi = new EmployeeApi();
export default employeeApi;
