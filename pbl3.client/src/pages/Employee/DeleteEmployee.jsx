import { DeleteOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { App, Button, notification } from "antd";

import { useState } from "react";

import PropsType from "prop-types";
import employeeApi from "../../Services/employeeApi";

const DeleteEmployee = ({ record, setEmployee }) => {
    const { modal } = App.useApp();
    const [apiNotification, contextHolderNotification] =
        notification.useNotification();
    const [loading, setloading] = useState(false);

    const confirmDelete = async () => {
        try {
            setloading(true);
            await employeeApi.delete(record.id);
            apiNotification.success({
                message: "Success!",
                description: `You have successfully deleted employee ${record.fullName}`,
                placement: "topRight",
            });

            setEmployee(await employeeApi.getAll());
        } catch (err) {
            apiNotification.error({
                message: "Error!",
                description: `You have failed to delete employee ${record.fullName}`,
                placement: "topRight",
            });
            console.log(err);
        } finally {
            setloading(() => false);
        }
    };

    const showConfirm = () => {
        modal.confirm({
            title: "CONFIRM YOUR DECISION?",
            icon: <ExclamationCircleFilled />,
            content: `Do you want to delete employee ${record.fullName}`,
            okText: "Yes",
            okType: "danger",

            onOk() {
                confirmDelete();
            },
        });
    };
    return (
        <>
            {contextHolderNotification}

            <Button
                danger
                shape="circle"
                icon={<DeleteOutlined />}
                onClick={() => {
                    showConfirm();
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
