import { Button, notification } from "antd";
import useFetch from "../../../custom hook/useFetch";
import localhost from "../../../Services/localhost";
import PropTypes from "prop-types";

DeleteBonus.propTypes = {
    record: PropTypes.object.isRequired,
    fetchData: PropTypes.func.isRequired,
};

export default function DeleteBonus({ record, fetchData }) {
    const [apiNotification, contextHolderNotification] =
        notification.useNotification();
    const { deleteApi, loading } = useFetch(localhost);

    const handleDeleteBonus = async (id) => {
        try {
            const response = await deleteApi("/BonusSalary", id);
            apiNotification.success({
                message: "Success!",
                description: `${response.message}`,
                placement: "topRight",
            });
            setTimeout(() => {
                fetchData();
            }, 1000);
        } catch (err) {
            apiNotification.error({
                message: "Error!",
                description: `${err}`,
                placement: "topRight",
            });
        }
    };
    return (
        <>
            {contextHolderNotification}
            <Button
                onClick={() => {
                    handleDeleteBonus(record.id);
                }}
                loading={loading}
            >
                Delet bonus
            </Button>
        </>
    );
}
