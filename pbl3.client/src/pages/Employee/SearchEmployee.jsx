import { notification, Input } from "antd";
const { Search } = Input;
import PropTypes from "prop-types";

import employeeApi from "../../Services/employeeApi";
const SearchEmployee = ({ setEmployee }) => {
    const [loading, setLoading] = useState(false);
    const [apiNotification, contextHolderNotification] =
        notification.useNotification();

    const handleSearch = async (value) => {
        try {
            setLoading(true);
            const data = await employeeApi.findByName(value);
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
