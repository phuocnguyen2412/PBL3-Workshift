import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Sider } = Layout;

export default function AdminDashboard({ collapsed }) {
    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical" />
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={["1"]}
                items={[
                    {
                        key: "1",
                        icon: <UserOutlined />,
                        label: <Link to="./employee">Employee</Link>,
                    },
                    {
                        key: "2",
                        icon: <VideoCameraOutlined />,
                        label: <Link to="./workshift">Work Shift</Link>,
                    },
                    {
                        key: "3",
                        icon: <UploadOutlined />,
                        label: "nav 3",
                    },
                ]}
            />
        </Sider>
    );
}
