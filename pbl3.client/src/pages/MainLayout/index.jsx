import { useContext, useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Button, theme, Flex } from "antd";
import AdminDashboard from "../../components/Dashboard";
import { Outlet, useNavigate } from "react-router-dom";
import { AccountContext } from "../../Context/AccountContext";
import { UserOutlined } from "@ant-design/icons";
import useFetch from "../../custom hook/useFetch";
import localhost from "../../Services/localhost";

const { Header, Content } = Layout;
function MainLayout() {
    const { postApi, loading } = useFetch(localhost);
    const [collapsed, setCollapsed] = useState(false);
    const account = useContext(AccountContext);
    const navigate = useNavigate();
    useEffect(() => {
        const login = async () => {
            if (Object.keys(account.account).length === 0) {
                try {
                    if (localStorage.getItem("account")) {
                        console.log(
                            JSON.parse(localStorage.getItem("account"))
                        );
                        const data = await postApi(
                            "/Account/Login",
                            JSON.parse(localStorage.getItem("account"))
                        );
                        account.onChange(data);
                    }
                } catch (e) {
                    navigate("/login");
                    console.log(e);
                }
            }
        };
        login();
    });

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
                    <Flex justify="space-between" align="center">
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
                        <Button
                            icon={<UserOutlined />}
                            style={{ margin: "0 16px" }}
                            onClick={() => {
                                navigate(
                                    `/employee/${account.account.employeeId}`
                                );
                            }}
                        >
                            {account.account.fullName}
                        </Button>
                    </Flex>
                </Header>
                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        heigt: "100%",
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        overflow: "hiddnen",
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}

export default MainLayout;
