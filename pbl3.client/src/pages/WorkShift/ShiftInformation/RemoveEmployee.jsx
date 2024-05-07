import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Spin } from "antd";
import { useState } from "react";
import useFetch from "../../../custom hook/useFetch";
import PropsType from "prop-types";

const RemoveEmployee = ({ record }) => {
    const { loading, deleteApi } = useFetch("");
    const [openDelete, setOpenDelete] = useState(false);
    const cancelDelete = () => {
        setOpenDelete(false);
    };
    const confirmDelete = async () => {
        deleteApi();
        setOpenDelete(false);
    };
    return (
        <>
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
