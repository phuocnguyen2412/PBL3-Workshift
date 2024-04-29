import { DeleteOutlined } from "@ant-design/icons";
import { Button, Flex, Modal, notification } from "antd";
import useFetch from "../../custom hook/useFetch";
import { useState } from "react";

const DeleteEmployee = ({ record, setEmployee }) => {
    const [openDelete, setOpenDelete] = useState(false);

    const [apiNotification, contextHolderNotification] =
        notification.useNotification();
    const { getApi, deleteApi, loading } = useFetch(
        "https://662a140667df268010a2887f.mockapi.io/PBL3"
    );
    const confirmDelete = async () => {
        try {
            await deleteApi(`/employee`, record.id);
            apiNotification.success({
                message: "Thành công!",
                description: `Bạn đã xóa thành công nhân viên`,
                placement: "topRight",
            });
            setEmployee(await getApi("/employee"));
        } catch (err) {
            apiNotification.error({
                message: "Thất bại!",
                description: `Bạn đã xóa thất bại nhân viên`,
                placement: "topRight",
            });
            console.log(err);
        }
        setOpenDelete(false);
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
                footer={null}
            >
                <p>Bạn có chắc chắn muốn xóa?</p>
                <Flex justify="end">
                    <Button
                        danger
                        loading={loading}
                        onClick={confirmDelete}
                        icon={<DeleteOutlined />}
                    >
                        Xác nhận xóa!
                    </Button>
                </Flex>
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

export default DeleteEmployee;
