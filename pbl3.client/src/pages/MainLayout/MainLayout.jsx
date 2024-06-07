import { useContext, useEffect, useState } from "react";

import { Layout, theme, Spin, ConfigProvider } from "antd";
const { Content } = Layout;
import AdminDashboard from "../../components/Dashboard";
import { Outlet, useNavigate } from "react-router-dom";

import HeaderLayout from "./Header";
import authApi from "../../Services/authApi";
import { AccountContext } from "../../Context/AccountContext";

function MainLayout() {
    const account = useContext(AccountContext);

    const [loading, setloading] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(() =>
        JSON.parse(localStorage.getItem("darkMode"))
    );
    const {
        token: { borderRadiusLG },
    } = theme.useToken();

    const login = async () => {
        try {
            setloading(true);
            const token = localStorage.getItem("Authorization");

            if (!token) {
                navigate("/login");
                return;
            }
            const res = await authApi.loginByToken({ token });
            account.onChange(res);
        } catch (e) {
            navigate("/login");
            console.log(e);
        } finally {
            setloading(false);
        }
    };
    useEffect(() => {
        login();
    }, []);

    return (
        <ConfigProvider
            theme={{
                algorithm: darkMode
                    ? theme.darkAlgorithm
                    : theme.defaultAlgorithm,
            }}
        >
            <Spin spinning={loading}>
                <Layout
                    style={{
                        height: "100vh",
                        overflow: "hidden",
                    }}
                >
                    <AdminDashboard
                        collapsed={collapsed}
                        style={{
                            height: "100%",
                        }}
                    />
                    <Layout>
                        <HeaderLayout
                            darkMode={darkMode}
                            setDarkMode={setDarkMode}
                            collapsed={collapsed}
                            setCollapsed={setCollapsed}
                        />
                        <Content
                            style={{
                                margin: "24px 16px",
                                padding: 24,
                                heigt: "100%",

                                borderRadius: borderRadiusLG,
                                overflow: "auto",
                            }}
                        >
                            <Outlet />
                        </Content>
                    </Layout>
                </Layout>
            </Spin>
        </ConfigProvider>
    );
}

export default MainLayout;
