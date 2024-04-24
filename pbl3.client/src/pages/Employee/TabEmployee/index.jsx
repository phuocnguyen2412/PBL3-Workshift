import { Button, Tabs } from "antd";
import {
    PlusOutlined,
    TeamOutlined,
    UserAddOutlined,
    UserDeleteOutlined,
} from "@ant-design/icons";

const items = [
    {
        label: "Tất cả",
        key: 0,
        icon: <TeamOutlined />,
    },
    {
        label: "Đang đi làm",
        key: 1,
        icon: <UserAddOutlined />,
    },
    {
        label: "Đã nghỉ làm",
        key: 2,
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

export default TabEmployee;
