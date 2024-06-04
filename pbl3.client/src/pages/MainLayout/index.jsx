import { useContext, useEffect, useState } from "react";

import { Layout, theme, Spin, ConfigProvider } from "antd";
const { Content } = Layout;
import AdminDashboard from "../../components/Dashboard";
import { Outlet, useNavigate } from "react-router-dom";
import { AccountContext } from "../../Context/AccountContext";

import useFetch from "../../custom hook/useFetch";
import localhost from "../../Services/localhost";

import HeaderLayout from "./Header";

function MainLayout() {
    const { postApi, loading } = useFetch(localhost);
    const [collapsed, setCollapsed] = useState(false);
    const account = useContext(AccountContext);
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(() =>
        JSON.parse(localStorage.getItem("darkMode"))
    );
    const {
        token: { borderRadiusLG },
    } = theme.useToken();

    const login = async () => {
        try {
            if (localStorage.getItem("token")) {
                const data = await postApi("/Account/LoginByToken", {
                    token: JSON.parse(localStorage.getItem("token")),
                });

                account.onChange(data);
                localStorage.removeItem("token");
                localStorage.setItem("token", JSON.stringify(data.token));
            } else {
                navigate("/login");
            }
        } catch (e) {
            navigate("/login");
            console.log(e);
        }
    };
    useEffect(() => {}, []);

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
