import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Button, Flex, Switch, Layout, theme } from "antd";
import { useContext } from "react";
import { AccountContext } from "../../Context/AccountContext";
import { useNavigate } from "react-router-dom";
const { Header } = Layout;
import PropTypes from "prop-types";

HeaderLayout.propTypes = {
    darkMode: PropTypes.bool.isRequired,
    setDarkMode: PropTypes.func.isRequired,
    collapsed: PropTypes.bool.isRequired,
    setCollapsed: PropTypes.func.isRequired,
};
export default function HeaderLayout({
    darkMode,
    setDarkMode,
    collapsed,
    setCollapsed,
}) {
    const account = useContext(AccountContext);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const navigate = useNavigate();
    return (
        <Header style={{ padding: 0, backgroundColor: colorBgContainer }}>
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
                <Flex justify="space-between" align="center">
                    <Switch
                        checkedChildren="Lumos!"
                        onClick={() => {
                            setDarkMode(!darkMode);
                            localStorage.removeItem("darkMode");
                            localStorage.setItem(
                                "darkMode",
                                JSON.stringify(!darkMode)
                            );
                        }}
                        unCheckedChildren="Nox!"
                    />
                    <Button
                        icon={<UserOutlined />}
                        style={{ margin: "0 16px" }}
                        onClick={() => {
                            navigate(`/employee/${account.account.employeeId}`);
                        }}
                    >
                        {account.account.fullName}
                    </Button>
                </Flex>
            </Flex>
        </Header>
    );
}
