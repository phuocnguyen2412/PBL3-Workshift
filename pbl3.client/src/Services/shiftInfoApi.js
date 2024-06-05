import axiosClient from "./axiosClient";
class ShiftInfo {
    getAll = () => {
        return axiosClient.get("/ShiftInfo");
    };
    getAllByDate = (date) => {
        return axiosClient.get(
            `/ShiftInfo/shifts-and-employees-by-date/${date}`
        );
    };
    getAllOfEmployee = (employeeId) => {
        return axiosClient.get(`/ShiftInfo/workdates/${employeeId}`);
    };
    getAllOfManager = (managerId) => {
        return axiosClient.get(`/ShiftInfo/manager/${managerId}`);
    };
    add = (data) => {
        return axiosClient.post("/ShiftInfo", data);
    };
    delete = (idShiftInfo) => {
        return axiosClient.delete("/ShiftInfo" + idShiftInfo);
    };
    changeChecked = (idShiftInfo, isChecked) => {
        return axiosClient.put(
            `/ShiftInfo/${idShiftInfo}/${isChecked}`,
            ShiftInfo
        );
    };
}
const shiftInfo = new ShiftInfo();
export default shiftInfo;
