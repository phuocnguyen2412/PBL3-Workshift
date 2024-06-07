import { notification, Input } from "antd";
const { Search } = Input;
import PropTypes from "prop-types";

import employeeApi from "../../Services/employeeApi";
import { useState } from "react";
const SearchEmployee = ({ setEmployee }) => {
    const [loading, setLoading] = useState(false);
    const [apiNotification, contextHolderNotification] =
        notification.useNotification();

    const handleSearch = async (value) => {
        try {
            setLoading(true);
            const data = await employeeApi.findByName(value);
            if (data.length == 0) throw new Error("");
            setEmployee(data);

            apiNotification.success({
                message: "Success!",
                description: `System have found employee whose name is ${value}`,
                placement: "topRight",
            });
        } catch (err) {
            apiNotification.error({
                message: "Error!",
                description: `System cound found employee whose name is ${value}`,
                placement: "topRight",
            });
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            {contextHolderNotification}
            <Search
                placeholder="input search text"
                allowClear
                onSearch={handleSearch}
                size="large"
                style={{
                    marginBottom: "16px",
                }}
                loading={loading}
            />
        </>
    );
};
SearchEmployee.propTypes = {
    setEmployee: PropTypes.func.isRequired,
};
export default SearchEmployee;
