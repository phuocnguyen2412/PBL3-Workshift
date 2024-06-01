import { Button, Modal, notification } from "antd";
import { useState } from "react";
import useFetch from "../../../custom hook/useFetch";
import localhost from "../../../Services/localhost";
import PropTypes from "prop-types";
DeleteWorkShift.propTypes = {
    shift: PropTypes.object.isRequired,

    setItems: PropTypes.func.isRequired,
};
export default function DeleteWorkShift({ shift, setItems }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { deleteApi, loading } = useFetch(localhost);
    const [apiNotification, contextHolderNotification] =
        notification.useNotification();
    const handleDeleteShiftInfo = async (id) => {
        try {
            const response = await deleteApi(`/ShiftInfo/`, id);
            console.log(response);
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
