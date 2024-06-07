import { Button, Form, Modal } from "antd";
import { useState } from "react";
import EditEmployeeForm from "../../components/EditEmployeeForm/EditEmployeeForm";
import { SettingFilled } from "@ant-design/icons";
import PropTypes from "prop-types";
const EditEmployee = ({ record, setEmployee }) => {
    const [openEdit, setOpenEdit] = useState(false);

    const [form] = Form.useForm();

    const cancelEdit = () => {
        setOpenEdit(false);
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
                    record={record}
                    form={form}
                    setEmployee={setEmployee}
                    setOpenEdit={setOpenEdit}
                />
            </Modal>

            <Button
                shape="circle"
                icon={<SettingFilled />}
                onClick={handleClickBtn}
            />
        </>
    );
};
EditEmployee.propTypes = {
    record: PropTypes.object.isRequired,
    setEmployee: PropTypes.func.isRequired,
};
export default EditEmployee;
