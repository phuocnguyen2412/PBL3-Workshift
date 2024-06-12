import { Button, Form, Modal } from "antd";
import PropTypes from "prop-types";
import { useState } from "react";

import { SettingOutlined } from "@ant-design/icons";
import EditDutyForm from "./EditDutyForm";
export default function EditDuty({ record, setDutyList }) {
    const [openEdit, setOpenEdit] = useState(false);

    const [form] = Form.useForm();

    const cancelEdit = () => {
        setOpenEdit(false);
        form.resetFields();
    };

    const handleClickBtn = async () => {
        setOpenEdit(true);
    };

    return (
        <>
            <Modal
                centered
                title="Edit duty"
                open={openEdit}
                footer={null}
                onCancel={cancelEdit}
                width={"800px"}
            >
                <EditDutyForm
                    record={record}
                    form={form}
                    setDutyList={setDutyList}
                    setOpenEdit={setOpenEdit}
                />
            </Modal>

            <Button
                shape="circle"
                icon={<SettingOutlined />}
                onClick={handleClickBtn}
            />
        </>
    );
}
EditDuty.propTypes = {
    record: PropTypes.object.isRequired,
    setDutyList: PropTypes.func.isRequired,
};
