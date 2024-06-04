import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Spin, notification } from "antd";
import { useState } from "react";
import useFetch from "../../../custom hook/useFetch";
import PropsType from "prop-types";
import localhost from "../../../Services/localhost";

const RemoveEmployee = ({ record, setItems }) => {
    const { loading, deleteApi } = useFetch(localhost);
    const [openDelete, setOpenDelete] = useState(false);
    const [apiNotification, contextHolderNotification] =
        notification.useNotification();
    const cancelDelete = () => {
        setOpenDelete(false);
    };

    const confirmDelete = async () => {
        try {
            await deleteApi("/Shift/delete?shiftId=", record.shiftId);

            apiNotification.success({
                message: "Success!",
                description: `${record.fullName} was successfully deleted`,
                placement: "topRight",
            });
            setItems();
            setOpenDelete(() => false);
        } catch (e) {
            apiNotification.error({
                message: "Error!",
                description: `${e}`,
                placement: "topRight",
            });
        }
    };
    return (
        <>
            {contextHolderNotification}
            <Spin spinning={loading}>
                <Modal
                    centered
                    title="Confirm your decision"
                    open={openDelete}
                    onCancel={cancelDelete}
                    cancelText="Cancel"
                    onOk={confirmDelete}
                    okText="Yes"
                >
                    <p>Bạn có chắc chắn muốn xóa?</p>
                </Modal>
            </Spin>

            <Button
                onClick={() => setOpenDelete(true)}
                danger
                icon={<DeleteOutlined />}
            />
        </>
    );
};
RemoveEmployee.propTypes = {
    record: PropsType.object.isRequired,
    setItems: PropsType.func.isRequired,
};
export default RemoveEmployee;
