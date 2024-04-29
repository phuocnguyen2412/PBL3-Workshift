import Search from "antd/es/transfer/search";
import useFetch from "../../custom hook/useFetch";
import { notification } from "antd";

const SearchEmployee = ({ setEmployee }) => {
    const [apiNotification, contextHolderNotification] =
        notification.useNotification();
    const { getApi } = useFetch("https://localhost:7120/api");
    const handleSearch = async (value) => {
        try {
            const data = await getApi(`/Employee/${value}`);
            if (typeof data === "object") setEmployee([data]);
            else setEmployee(data);
            apiNotification.success({
                message: "Thành công!",
                description: `Hệ thống đã tìm được nhân viên ${value}`,
                placement: "topRight",
            });
        } catch (err) {
            apiNotification.error({
                message: "Thất bại!",
                description: `Không tồn tại nhân viên ${value}`,
                placement: "topRight",
            });
            console.log(err);
        }
    };
    return (
        <>
            {contextHolderNotification}
            <Search
                placeholder="input search text"
                enterButton="Search"
                size="large"
                loading={false}
                onSearch={handleSearch}
            />
        </>
    );
};

export default SearchEmployee;
