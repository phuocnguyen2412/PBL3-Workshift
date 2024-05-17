import { Checkbox, notification } from "antd";
import useFetch from "../../../custom hook/useFetch.js";
import localhost from "../../../Services/localhost.js";
import PropTypes from "prop-types";
import { useContext } from "react";
import { AccountContext } from "../../../Context/AccountContext.jsx";
CheckoutEmployee.propTypes = {
    record: PropTypes.object.isRequired,
    setItems: PropTypes.func.isRequired,
};
export default function CheckoutEmployee({ record, setItems }) {
    const account = useContext(AccountContext);
    const { updateApi } = useFetch(localhost);
    const [apiNotification, contextHolderNotification] =
        notification.useNotification();
    const handleUpdateCheckoutTime = async () => {
        try {
            const response = await updateApi(
                `/Shift/${record.shiftId}/checkotut?ManagerId=${account.account.employeeId}`
            );
            console.log(response);
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
                disabled={record.checkOutTime !== "2000-01-01T00:00:00"}
                checked={record.checkOutTime !== "2000-01-01T00:00:00"}
                onClick={handleUpdateCheckoutTime}
            >
                Checkout
            </Checkbox>
        </div>
    );
}
