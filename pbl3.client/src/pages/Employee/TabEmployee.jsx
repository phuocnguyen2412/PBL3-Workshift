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
        label: "All",
        key: "Tất cả",
        icon: <TeamOutlined />,
    },
    {
        label: "Working",
        key: "true",
        icon: <UserAddOutlined />,
    },
    {
        label: "Off",
        key: "false",
        icon: <UserDeleteOutlined />,
    },
];

const TabEmployee = ({ handleTabCick, handleOpenDrawer }) => {
    const button = (
        <Button icon={<PlusOutlined />} onClick={handleOpenDrawer}>
            Add employee
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
