import { Button, Tabs } from "antd";
import {
    PlusOutlined,
    TeamOutlined,
    UserAddOutlined,
    UserDeleteOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
const items = [
    {
        label: "Tất cả",
        key: "Tất cả",
        icon: <TeamOutlined />,
    },
    {
        label: "Đang đi làm",
        key: "true",
        icon: <UserAddOutlined />,
    },
    {
        label: "Đã nghỉ làm",
        key: "false",
        icon: <UserDeleteOutlined />,
    },
];

const TabEmployee = ({ handleTabCick, handleOpenDrawer }) => {
    const button = (
        <Button icon={<PlusOutlined />} onClick={handleOpenDrawer}>
            Thêm nhân viên
        </Button>
    );
    return (
        <>
            <Tabs
                tabBarExtraContent={button}
                items={items}
                onTabClick={handleTabCick}
            />
        </>
    );
};
TabEmployee.propTypes = {
    handleTabCick: PropTypes.func.isRequired,
    handleOpenDrawer: PropTypes.func.isRequired,
};

export default TabEmployee;
