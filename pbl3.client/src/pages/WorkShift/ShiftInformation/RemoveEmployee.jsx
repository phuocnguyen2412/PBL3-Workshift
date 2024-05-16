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
            deleteApi("/Shift", record.shiftId);
            setOpenDelete(false);
            apiNotification.success({
                message: "Success!",
                description: `You created a shift ${record.fullName}`,
                placement: "topRight",
            });
            setItems();
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
};
export default RemoveEmployee;
