import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, notification } from "antd";
import { useState } from "react";
import useFetch from "../../../custom hook/useFetch";
import localhost from "../../../Services/localhost";
import PropsType from "prop-types";
export default function DeleteDuty({ record, setDutyList }) {
    const [openDelete, setOpenDelete] = useState(false);

    const [apiNotification, contextHolderNotification] =
        notification.useNotification();
    const { getApi, deleteApi } = useFetch(localhost);
    const confirmDelete = async () => {
        console.log(record);
        try {
            await deleteApi(`/Duty`, record.id);
            apiNotification.success({
                message: "Thành công!",
                description: `Bạn đã xóa công việc thành công`,
                placement: "topRight",
            });

            setDutyList(await getApi("/Duty"));
        } catch (err) {
            apiNotification.error({
                message: "Thất bại!",
                description: `Bạn đã xóa thất bại công việc`,
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
            {/* <Spin loading={loading}> */}
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
            {/* </Spin> */}

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
}
DeleteDuty.propTypes = {
    record: PropsType.object.isRequired,
    setDutyList: PropsType.func.isRequired,
};
