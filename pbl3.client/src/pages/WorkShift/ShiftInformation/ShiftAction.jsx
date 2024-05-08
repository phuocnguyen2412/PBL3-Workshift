import { Button, Flex, notification } from "antd";
import { useContext } from "react";
import { AccountContext } from "../../../Context/AccountContext";
import PropTypes from "prop-types";
import useFetch from "../../../custom hook/useFetch";
import localhost from "../../../Services/localhost";
ShiftAction.propTypes = {
    shift: PropTypes.object.isRequired,
};
export default function ShiftAction({ shift }) {
    const account = useContext(AccountContext);
    const { loading, deleteApi } = useFetch(localhost);
    const [apiNotification, contextHolderNotification] =
        notification.useNotification();
    const handleDelete = async (id) => {
        try {
            const response = await deleteApi(`/ShiftInfo`, id);

            apiNotification.success({
                message: "Thành công!",
                description: `Bạn đã xóa thành công ${response.shiftName}`,
                placement: "bottomRight",
            });
        } catch (e) {
            apiNotification.error({
                message: "Thất bại!",
                description: `${e.message}`,
                placement: "bottomRight",
            });
        }
    };

    const handleUpdate = async () => {};
    const handleCreate = async () => {};
    return (
        <>
            {contextHolderNotification}
            <Flex justify="space-between">
                <span>{`${shift.shiftName}: ${shift.startTime} - ${shift.endTime} `}</span>
                {account.account.dutyName === "Admin" && (
                    <Button
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
