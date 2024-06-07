import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Spin, notification } from "antd";
import { useState } from "react";

import PropsType from "prop-types";
import shiftApi from "../../../Services/shiftApi";

const RemoveEmployee = ({ record, setItems }) => {
    const [loading, setloading] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [apiNotification, contextHolderNotification] =
        notification.useNotification();
    const cancelDelete = () => {
        setOpenDelete(false);
    };

    const confirmDelete = async () => {
        try {
            setloading(true);
            await shiftApi.detele(record.shiftId);

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
        } finally {
            setloading(false);
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
                    <p>Remove {record.fullName} out of this work shift?</p>
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
