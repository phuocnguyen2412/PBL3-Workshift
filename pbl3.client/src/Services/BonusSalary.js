import axiosClient from "./axiosClient";

class BonusSalary {
    getAll = () => axiosClient.get("/BonusSalary");
    getAllOfEmployee = (employeeId) =>
        axiosClient.get(`/BonusSalary/${employeeId}`);
    getAllByDate = (date) =>
        axiosClient.get(`/BonusSalary/bydate?date=${date}`);
    add = (data) => axiosClient.post("/BonusSalary/addforemployees", data);
    delete = (bonusSalaryId) =>
        axiosClient.delete(`/BonusSalary/${bonusSalaryId}`);
}
const bonusSalary = new BonusSalary();
export default bonusSalary;
