import { App, Button, Modal, notification } from "antd";
import { useState } from "react";

import PropTypes from "prop-types";
import shiftInfo from "../../../Services/shiftInfoApi";
import { ExclamationCircleFilled } from "@ant-design/icons";
DeleteWorkShift.propTypes = {
    shift: PropTypes.object.isRequired,

    setItems: PropTypes.func.isRequired,
};

export default function DeleteWorkShift({ shift, setItems }) {
    const { modal } = App.useApp();

    const [loading, setloading] = useState(false);
    const [apiNotification, contextHolderNotification] =
        notification.useNotification();
    const handleDeleteShiftInfo = async () => {
        try {
            setloading(true);
            await shiftInfo.delete(shift.id);

            apiNotification.success({
                message: "Success!",
                description: `${shift.shiftName}: ${shift.startTime} - ${shift.endTime} was successfully deleted`,
                placement: "topRight",
            });
            setTimeout(() => {
                setItems();
            }, 2000);
        } catch (e) {
            apiNotification.error({
                message: "Thất bại!",
                description: `${e.message}`,
                placement: "topRight",
            });
        } finally {
            setloading(false);
        }
    };
    const showModal = () => {
        modal.confirm({
            title: "CONFIRM YOUR DECISION?",
            icon: <ExclamationCircleFilled />,
            content: `Do you want to delete work shift ${shift.shiftName}`,
            okText: "Yes",
            okType: "danger",

            onOk() {
                handleDeleteShiftInfo();
            },
        });
    };

    return (
        <>
            {contextHolderNotification}

            <Button
                style={{ marginLeft: "16px" }}
                danger
                loading={loading}
                onClick={showModal}
            >
                Delete work shift
            </Button>
        </>
    );
}
