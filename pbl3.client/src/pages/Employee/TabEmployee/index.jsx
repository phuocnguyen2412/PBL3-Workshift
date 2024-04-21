import { Button, Tabs } from "antd";
import {
    PlusOutlined,
    TeamOutlined,
    UserAddOutlined,
    UserDeleteOutlined,
} from "@ant-design/icons";
const operations = <Button icon=<PlusOutlined />>Thêm nhân viên</Button>;

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
const TabEmployee = () => {
    return (
        <>
            <Tabs
                tabBarExtraContent={operations}
                items={items}
                onTabClick={(e) => console.log(e)}
            />
        </>
    );
};

export default TabEmployee;
