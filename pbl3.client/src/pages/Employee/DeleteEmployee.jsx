import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Spin, notification } from "antd";
import useFetch from "../../custom hook/useFetch";
import { useState } from "react";
import localhost from "../../Services/localhost";
import PropsType from "prop-types";

const DeleteEmployee = ({ record, setEmployee }) => {
    const [openDelete, setOpenDelete] = useState(false);
    const [apiNotification, contextHolderNotification] =
        notification.useNotification();
    const { getApi, deleteApi, loading } = useFetch(localhost);

    const confirmDelete = async () => {
        try {
            await deleteApi(`/Employee/`, record.id);
            apiNotification.success({
                message: "Thành công!",
                description: `Bạn đã xóa thành công nhân viên`,
                placement: "topRight",
            });
            setEmployee(await getApi("/Employee"));
        } catch (err) {
            apiNotification.error({
                message: "Thất bại!",
                description: `Bạn đã xóa thất bại nhân viên`,
                placement: "topRight",
            });
            console.log(err);
        }
    };

    const cancelDelete = () => {
        setOpenDelete(false);
    };

    return (
        <>
            {contextHolderNotification}
            <Modal
                centered
                title="Confirm your decision"
                open={openDelete}
                onCancel={cancelDelete}
                cancelText="Cancel"
                onOk={confirmDelete}
                okText="Yes"
            >
                <Spin spinning={loading}>
                    <p>Bạn có chắc chắn muốn xóa?</p>
                </Spin>
            </Modal>
            <Button
                danger
                shape="circle"
                icon={<DeleteOutlined />}
                onClick={() => {
                    setOpenDelete(true);
                }}
            />
        </>
    );
};
DeleteEmployee.propTypes = {
    record: PropsType.object.isRequired,
    setEmployee: PropsType.func.isRequired,
};
export default DeleteEmployee;
