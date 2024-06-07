import { Button, notification } from "antd";

import PropTypes from "prop-types";
import { DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import bonusSalary from "../../../Services/BonusSalary";

DeleteBonus.propTypes = {
    record: PropTypes.object.isRequired,
    fetchData: PropTypes.func.isRequired,
};

export default function DeleteBonus({ record, fetchData }) {
    const [apiNotification, contextHolderNotification] =
        notification.useNotification();
    const [loading, setloading] = useState(false);

    const handleDeleteBonus = async (id) => {
        try {
            setloading(true);
            const response = await bonusSalary.delete(id);
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
        } finally {
            setloading(false);
        }
    };
    return (
        <>
            {contextHolderNotification}
            <Button
                danger
                shape="circle"
                icon={<DeleteOutlined />}
                onClick={() => {
                    handleDeleteBonus(record.id);
                }}
                loading={loading}
            />
        </>
    );
}
