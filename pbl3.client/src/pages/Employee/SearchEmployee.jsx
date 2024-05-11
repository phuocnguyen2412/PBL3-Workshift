import useFetch from "../../custom hook/useFetch";

import { notification, Input } from "antd";
const { Search } = Input;
import PropTypes from "prop-types";
import localhost from "../../Services/localhost";
const SearchEmployee = ({ setEmployee }) => {
    const [apiNotification, contextHolderNotification] =
        notification.useNotification();
    const { getApi, loading } = useFetch(localhost);
    const handleSearch = async (value) => {
        try {
            const data = await getApi(`/Employee/search/${value}`);
            setEmployee(data);
            apiNotification.success({
                message: "Thành công!",
                description: `Hệ thống đã tìm được nhân viên ${value}`,
                placement: "topRight",
            });
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
