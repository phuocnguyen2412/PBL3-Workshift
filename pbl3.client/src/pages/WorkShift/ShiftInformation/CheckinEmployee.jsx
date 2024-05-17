import { Checkbox, notification } from "antd";
import useFetch from "../../../custom hook/useFetch.js";
import localhost from "../../../Services/localhost.js";
import PropTypes from "prop-types";
import { useContext } from "react";
import { AccountContext } from "../../../Context/AccountContext.jsx";
CheckinEmployee.propTypes = {
    record: PropTypes.object.isRequired,
    setItems: PropTypes.func.isRequired,
};
export default function CheckinEmployee({ shift, record, setItems }) {
    const account = useContext(AccountContext);
    const { updateApi } = useFetch(localhost);
    const [apiNotification, contextHolderNotification] =
        notification.useNotification();
    function timeStringToDate(timeString) {
        // Lấy thời gian hiện tại
        let date = new Date();

        // Tách giờ, phút và giây từ chuỗi thời gian
        let timeParts = timeString.split(":");
        let hours = parseInt(timeParts[0], 10);
        let minutes = parseInt(timeParts[1], 10);
        let seconds = parseInt(timeParts[2], 10);

        // Thiết lập giờ, phút, giây cho đối tượng Date
        date.setHours(hours, minutes, seconds, 0);

        return date;
    }
    const handleUpdateCheckinTime = async () => {
        try {
            let specificTime = timeStringToDate(shift.startTime);

            // Lấy thời gian hiện tại
            let now = new Date();
            if (now < specificTime) throw "Can't checkin before start time";
            const response = await updateApi(
                `/Shift/${record.shiftId}/checkin?ManagerId=${account.account.employeeId}`
            );
            apiNotification.success({
                message: "Error!",
                description: `Checkin ${record.fullName} successfully `,
                placement: "topRight",
            });
            console.log(response);
            setItems();
        } catch (error) {
            apiNotification.error({
                message: "Error!",
                description: `${error}`,
                placement: "topRight",
            });
        }
    };
    console.log(record);
    return (
        <div>
            {contextHolderNotification}
            <Checkbox
                disabled={record.checkInTime !== "2000-01-01T00:00:00"}
                checked={record.checkInTime !== "2000-01-01T00:00:00"}
                onClick={handleUpdateCheckinTime}
            >
                Checkin
            </Checkbox>
        </div>
    );
}
