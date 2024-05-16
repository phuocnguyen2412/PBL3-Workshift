import { Checkbox, notification } from "antd";
import useFetch from "../../../custom hook/useFetch.js";
import localhost from "../../../Services/localhost.js";
import PropTypes from "prop-types";
CheckoutEmployee.propTypes = {
    record: PropTypes.object.isRequired,
    setItems: PropTypes.func.isRequired,
};
export default function CheckoutEmployee({ record, setItems }) {
    const { updateApi } = useFetch(localhost);
    const [apiNotification, contextHolderNotification] =
        notification.useNotification();
    const handleUpdateCheckoutTime = async () => {
        try {
            await updateApi(`/Shift/${record.shiftId}/checkout`);
            apiNotification.success({
                message: "Error!",
                description: `Checkout ${record.fullName} successfully `,
                placement: "topRight",
            });
            setItems();
        } catch (error) {
            apiNotification.error({
                message: "Error!",
                description: `${error}`,
                placement: "topRight",
            });
        }
    };
    return (
        <div>
            {contextHolderNotification}
            <Checkbox
                disabled={!(record.checkOutTime === "00:00:00")}
                checked={!(record.checkOutTime === "00:00:00")}
                onClick={handleUpdateCheckoutTime}
            >
                Checkin
            </Checkbox>
        </div>
    );
}
