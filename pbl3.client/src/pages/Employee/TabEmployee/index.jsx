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
        key: "Tất cả",
        icon: <TeamOutlined />,
    },
    {
        label: "Đang đi làm",
        key: "Đang đi làm",
        icon: <UserAddOutlined />,
    },
    {
        label: "Đã nghỉ làm",
        key: "Đã nghỉ làm",
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
