import { Checkbox, Modal, notification } from "antd";
import useFetch from "../../../custom hook/useFetch.js";
import localhost from "../../../Services/localhost.js";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { AccountContext } from "../../../Context/AccountContext.jsx";

CheckoutEmployee.propTypes = {
    record: PropTypes.object.isRequired,
    setItems: PropTypes.func.isRequired,
};

export default function CheckoutEmployee({ record, setItems }) {
    const account = useContext(AccountContext);
    const { updateApi } = useFetch(localhost);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(
        record.checkOutTime !== "2000-01-01T00:00:00"
    );

    const showModal = () => {
        setIsChecked(() => false);
        setIsModalOpen(() => true);
    };

    const handleOk = async () => {
        await handleUpdateCheckoutTime();

        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setIsChecked(record.checkOutTime !== "2000-01-01T00:00:00");
    };

    const [apiNotification, contextHolderNotification] =
        notification.useNotification();

    const handleUpdateCheckoutTime = async () => {
        try {
            await updateApi(
                `/Shift/${record.shiftId}/checkout?managerId=${account.account.employeeId}`
            );

            apiNotification.success({
                message: "Success!",
                description: `Checked out ${record.fullName} successfully`,
                placement: "topRight",
            });
            setItems();
        } catch (error) {
            apiNotification.error({
                message: "Error!",
                description: `${error}`,
                placement: "topRight",
            });
            setIsChecked(false);
        }
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
                disabled={record.checkOutTime !== "2000-01-01T00:00:00"}
                checked={isChecked}
                onClick={() => {
                    if (!isChecked) {
                        showModal();
                    }
                }}
            >
                Checkout
            </Checkbox>
        </div>
    );
}
