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
    const account = useContext(AccountContext);
    const { loading, deleteApi, updateApi } = useFetch(localhost);
    const [apiNotification, contextHolderNotification] =
        notification.useNotification();
    const handleDelete = async (id) => {
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
    const handleUpdate = async () => {};
    const handleCreate = async () => {};
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
                        {shift.checked ? "Mở ca làm" : "Khóa ca làm"}
                    </Button>
                )}
                {account.account.dutyName === "Admin" && (
                    <Button
                        style={{ marginLeft: "16px" }}
                        danger
                        loading={loading}
                        onClick={() => {
                            handleDelete(shift.id);
                        }}
                    >
                        Xóa ca làm
                    </Button>
                )}

                {account.account.dutyName === "Quản lý" && (
                    <Button onClick={handleUpdate}>Đăng kí quản lý</Button>
                )}
                {account.account.dutyName === "Nhân viên" && (
                    <Button onClick={handleCreate}>Đăng kí nhân viên</Button>
                )}
            </Flex>
        </>
    );
}
