import { Button, Flex, notification } from "antd";
import { useContext } from "react";
import { AccountContext } from "../../../Context/AccountContext";
import PropTypes from "prop-types";
import useFetch from "../../../custom hook/useFetch";
import localhost from "../../../Services/localhost";
ShiftAction.propTypes = {
    shift: PropTypes.object.isRequired,
    setItems: PropTypes.func.isRequired,
};
export default function ShiftAction({ shift, setItems }) {
    console.log(shift);
    const account = useContext(AccountContext);
    const { loading, deleteApi, postApi, updateApi } = useFetch(localhost);
    const [apiNotification, contextHolderNotification] =
        notification.useNotification();
    const handleDeleteShiftInfo = async (id) => {
        try {
            const response = await deleteApi(`/ShiftInfo`, id);
            console.log(response);
            apiNotification.success({
                message: "Thành công!",
                description: `Bạn đã xóa thành công ${shift.shiftName}: ${shift.startTime} - ${shift.endTime}`,
                placement: "topRight",
            });
            setItems();
        } catch (e) {
            apiNotification.error({
                message: "Thất bại!",
                description: `${e.message}`,
                placement: "topRight",
            });
        }
    };
    const handleCheck = async (id, checked) => {
        const response = await updateApi(`/ShiftInfo/${id}/${!checked}`);
        console.log(response);
        apiNotification.success({
            message: "Thành công!",
            description: `Bạn đã chỉnh sửa thành công ${shift.shiftName}: ${shift.startTime} - ${shift.endTime}`,
            placement: "topRight",
        });
        setItems();
    };
    const handleUpdate = async () => {
        try {
            const data = {
                employeeId: account.account.employeeId,
                shiftInfoId: shift.id,
                checkInTime: "00:00:00",
                checkOutTime: "00:00:00",
            };

            const res = await postApi("/Shift", data);
            console.log(res);
            apiNotification.success({
                message: "Success!",
                description: `${res.message}`,
                placement: "topRight",
            });
            setItems();
        } catch (e) {
            apiNotification.error({
                message: "Error!",
                description: `${e.message}`,
                placement: "topRight",
            });
        }
    };
    const handleCreate = async () => {
        try {
            const data = {
                employeeId: account.account.employeeId,
                shiftInfoId: shift.id,
                checkInTime: "00:00:00",
                checkOutTime: "00:00:00",
            };

            const res = await postApi("/Shift", data);

            apiNotification.success({
                message: "Success!",
                description: `${res.message}`,
                placement: "topRight",
            });
            setItems();
        } catch (e) {
            apiNotification.error({
                message: "Error!",
                description: `${e.message}`,
                placement: "topRight",
            });
        }
    };
    const handleDeleteShift = async () => {
        try {
            const data = shift.employees.find(
                (e) => e.employeeId === account.account.employeeId
            );
            console.log(data);
            await deleteApi("/Shift", data.shiftId);
            apiNotification.success({
                message: "Success!",
                description: `Unregistration successful`,
                placement: "topRight",
            });
            setItems();
        } catch (error) {
            apiNotification.error({
                message: "Error!",
                description: `${error.message}`,
                placement: "topRight",
            });
        }
    };
    return (
        <>
            {contextHolderNotification}
            <Flex justify="end" style={{ marginBottom: "16px" }}>
                {account.account.dutyName === "Admin" && (
                    <Button
                        loading={loading}
                        onClick={() => {
                            handleCheck(shift.id, shift.checked);
                        }}
                    >
                        {shift.checked ? "Open" : "Lock"}
                    </Button>
                )}
                {account.account.dutyName === "Admin" && (
                    <Button
                        style={{ marginLeft: "16px" }}
                        danger
                        loading={loading}
                        onClick={() => {
                            handleDeleteShiftInfo(shift.id);
                        }}
                    >
                        Delete work shift
                    </Button>
                )}

                {account.account.dutyName === "Quản lý" &&
                    (shift.employees.some(
                        (employee) =>
                            employee.employeeId === account.account.employeeId
                    ) ? (
                        <Button onClick={handleDeleteShift}>
                            UNREGISTRATION
                        </Button>
                    ) : (
                        <Button onClick={handleUpdate}>REGISTRATION</Button>
                    ))}
                {account.account.dutyName === "Nhân viên" &&
                    (shift.employees.some(
                        (employee) =>
                            employee.employeeId === account.account.employeeId
                    ) ? (
                        <Button onClick={handleDeleteShift}>
                            UNREGISTRATION
                        </Button>
                    ) : (
                        <Button onClick={handleCreate}>REGISTRATION</Button>
                    ))}
            </Flex>
        </>
    );
}
