import { Checkbox, Modal, notification } from "antd";

import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { AccountContext } from "../../../Context/AccountContext.jsx";
import shiftApi from "../../../Services/shiftApi.js";
CheckinEmployee.propTypes = {
    shift: PropTypes.object.isRequired,
    record: PropTypes.object.isRequired,
    setItems: PropTypes.func.isRequired,
};

function timeStringToDate(timeString) {
    let date = new Date();

    let timeParts = timeString.split(":");
    let hours = parseInt(timeParts[0], 10);
    let minutes = parseInt(timeParts[1], 10);
    let seconds = parseInt(timeParts[2], 10);

    date.setHours(hours, minutes, seconds, 0);

    return date;
}

export default function CheckinEmployee({ shift, record, setItems }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(
        record.checkInTime !== "2000-01-01T00:00:00"
    );
    const account = useContext(AccountContext);

    const [apiNotification, contextHolderNotification] =
        notification.useNotification();

    const handleUpdateCheckinTime = async () => {
        try {
            let specificTime = timeStringToDate(shift.startTime);

            // Lấy thời gian hiện tại
            let now = new Date();
            if (now < specificTime) throw "Can't checkin before start time";
            await shiftApi.updateCheckInTime(
                record.shiftId,
                account.account.employeeId
            );
            apiNotification.success({
                message: "Error!",
                description: `Checkin ${record.fullName} successfully `,
                placement: "topRight",
            });
            setIsChecked(() => true);
            setItems();
        } catch (error) {
            setIsChecked(false);
            apiNotification.error({
                message: "Error!",
                description: `${error}`,
                placement: "topRight",
            });
        }
    };
    const showModal = () => {
        setIsChecked(() => false);
        setIsModalOpen(() => true);
    };

    const handleOk = async () => {
        await handleUpdateCheckinTime();
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(() => false);
        setIsChecked(() => record.checkInTime !== "2000-01-01T00:00:00");
    };
    return (
        <div>
            {contextHolderNotification}
            <Modal
                title="Confirm checkout"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Are you sure you want to checkout this person?</p>
            </Modal>
            <Checkbox
                disabled={record.checkInTime !== "2000-01-01T00:00:00"}
                checked={isChecked}
                onClick={() => {
                    if (!isChecked) {
                        showModal();
                    }
                }}
            >
                Checkin
            </Checkbox>
        </div>
    );
}
