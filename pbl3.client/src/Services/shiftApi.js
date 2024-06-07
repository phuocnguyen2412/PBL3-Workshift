import axiosClient from "./axiosClient";

class ShiftApi {
    getAll = () => {
        return axiosClient.get("/Shift");
    };
    getAllOfEmployee = (employeeId) => {
        return axiosClient.get(`/Shift/employee/${employeeId}`);
    };
    add = (data) => {
        return axiosClient.post("/Shift", data);
    };
    updateCheckInTime = (shiftId, managerId) => {
        return axiosClient.put(
            `/Shift/${shiftId}/checkin?managerId=${managerId}`
        );
    };
    updateCheckOutTime = (shiftId, managerId) => {
        return axiosClient.put(
            `/Shift/${shiftId}/checkout?managerId=${managerId}`
        );
    };
    detele = (shiftId) => {
        return axiosClient.delete(`/Shift/delete?shiftId=${shiftId}`);
    };
}
const shiftApi = new ShiftApi();
export default shiftApi;
