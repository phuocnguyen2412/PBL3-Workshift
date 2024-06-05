import axiosClient from "./axiosClient";

class SalaryHistory {
    getAll = () => axiosClient.get("/SalaryHistory");
    getAllOfEmployee = (employeeId) =>
        axiosClient.get(`/SalaryHistory/EmployeeId?EmployeeId=${employeeId}`);
    add = (data) => axiosClient.post("/SalaryHistory", data);
    updatePaidDate = (salaryHistoryId) =>
        axiosClient.put(`/SalaryHistory/${salaryHistoryId}`);
}
const salaryHistory = new SalaryHistory();
export default salaryHistory;
