import { Checkbox, notification } from "antd";
import useFetch from "../../../custom hook/useFetch.js";
import localhost from "../../../Services/localhost.js";
import PropTypes from "prop-types";
CheckinEmployee.propTypes = {
    record: PropTypes.object.isRequired,
    setItems: PropTypes.func.isRequired,
};
export default function CheckinEmployee({ record, setItems }) {
    const { updateApi } = useFetch(localhost);
    const [apiNotification, contextHolderNotification] =
        notification.useNotification();
    const handleUpdateCheckinTime = async () => {
        try {
            const response = await updateApi(
                `/Shift/${record.shiftId}/checkin`
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
                disabled={!(record.checkInTime === "00:00:00")}
                checked={!(record.checkInTime === "00:00:00")}
                onClick={handleUpdateCheckinTime}
            >
                Checkin
            </Checkbox>
        </div>
    );
}
