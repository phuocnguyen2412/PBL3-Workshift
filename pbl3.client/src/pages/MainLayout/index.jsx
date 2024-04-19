import { useContext, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Button, theme } from "antd";
import AdminDashboard from "../../components/Dashboard/AdminDashboard";
import { Outlet } from "react-router-dom";
import { AccountContext } from "../../Context/AccountContext";
import { Navigate } from "react-router-dom";
const { Header, Content } = Layout;
function MainLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const account = useContext(AccountContext);
    console.log(account);
    if (Object.keys(account.account).length === 0)
        return <Navigate to="/login" />;

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout>
            <AdminDashboard collapsed={collapsed} />
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
                </Header>
                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        minHeight: 280,
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
