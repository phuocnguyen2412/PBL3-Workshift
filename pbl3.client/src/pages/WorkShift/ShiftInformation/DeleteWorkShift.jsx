import { Button, Modal, notification } from "antd";
import { useState } from "react";

import PropTypes from "prop-types";
import shiftInfo from "../../../Services/shiftInfoApi";
DeleteWorkShift.propTypes = {
    shift: PropTypes.object.isRequired,

    setItems: PropTypes.func.isRequired,
};
export default function DeleteWorkShift({ shift, setItems }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setloading] = useState(false);
    const [apiNotification, contextHolderNotification] =
        notification.useNotification();
    const handleDeleteShiftInfo = async (id) => {
        try {
            setloading(true);
            await shiftInfo.delete(id);

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
        setIsModalOpen(() => true);
    };

    const handleOk = async () => {
        handleDeleteShiftInfo(shift.id);
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(() => false);
    };

    return (
        <>
            {contextHolderNotification}
            <Modal
                title="Confirm delete"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Are you sure to delete this work shift?</p>
            </Modal>
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
