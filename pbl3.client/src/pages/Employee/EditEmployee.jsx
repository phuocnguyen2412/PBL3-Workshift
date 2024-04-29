import { Button, Form, Modal } from "antd";
import { useState } from "react";
import EditEmployeeForm from "../../components/EditEmployeeForm/EditEmployeeForm";
import { SettingOutlined } from "@ant-design/icons";

const EditEmployee = ({ record, setEmployee }) => {
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
                title="Edit Employee"
                open={openEdit}
                footer={null}
                onCancel={cancelEdit}
                width={"800px"}
            >
                <EditEmployeeForm
                    employeeToEdit={record}
                    form={form}
                    setEmployee={setEmployee}
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
};

export default EditEmployee;
