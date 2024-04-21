import { useContext, useState, useEffect } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Button, theme, Avatar, Space } from "antd";
import AdminDashboard from "../../components/Dashboard";
import { Outlet, useNavigate } from "react-router-dom";
import { AccountContext } from "../../Context/AccountContext";
import { UserOutlined } from "@ant-design/icons";
const { Header, Content } = Layout;
function MainLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const account = useContext(AccountContext);
    const navigate = useNavigate();
    // useEffect(() => {
    //     if (Object.keys(account.account).length === 0) navigate("/login");
    // });

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout
            style={{
                height: "100vh",
            }}
        >
            <AdminDashboard
                collapsed={collapsed}
                style={{
                    height: "100%",
                }}
            />
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={
                            collapsed ? (
                                <MenuUnfoldOutlined />
                            ) : (
                                <MenuFoldOutlined />
                            )
                        }
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: "16px",
                            width: 64,
                            height: 64,
                        }}
                    />
                    <Space>
                        <div>{account.account.username}</div>
                        <Avatar size={32} icon={<UserOutlined />} />
                    </Space>
                </Header>
                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        heigt: "100%",
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}

export default MainLayout;
