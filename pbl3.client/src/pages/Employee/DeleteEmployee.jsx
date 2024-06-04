import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Spin, notification } from "antd";

import { useState } from "react";

import PropsType from "prop-types";
import employeeApi from "../../Services/employeeApi";

const DeleteEmployee = ({ record, setEmployee }) => {
    const [openDelete, setOpenDelete] = useState(false);
    const [apiNotification, contextHolderNotification] =
        notification.useNotification();
    const [loading, setloading] = useState(false);

    const confirmDelete = async () => {
        try {
            setloading(true);
            await employeeApi.delete(record.id);
            apiNotification.success({
                message: "Thành công!",
                description: `Bạn đã xóa thành công nhân viên`,
                placement: "topRight",
            });

            setEmployee(await employeeApi.getAll());
        } catch (err) {
            apiNotification.error({
                message: "Thất bại!",
                description: `Bạn đã xóa thất bại nhân viên`,
                placement: "topRight",
            });
            console.log(err);
        } finally {
            setloading(() => false);
            setOpenDelete(() => false);
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
