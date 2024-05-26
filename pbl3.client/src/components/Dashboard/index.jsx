import { Layout, Menu, theme } from "antd";

import { AdminList, Employee, Manager } from "./DashboardList";
import { useContext, useState } from "react";
const { Sider } = Layout;
import { AccountContext } from "../../Context/AccountContext";

import PropsTypes from "prop-types";
AdminDashboard.propTypes = {
    collapsed: PropsTypes.bool.isRequired,
};

export default function AdminDashboard({ collapsed }) {
    const account = useContext(AccountContext);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const getLevelKeys = (items1) => {
        const key = {};
        const func = (items2, level = 1) => {
            items2.forEach((item) => {
                if (item.key) {
                    key[item.key] = level;
                }
                if (item.children) {
                    return func(item.children, level + 1);
                }
            });
        };
        func(items1);
        return key;
    };
    const levelKeys = getLevelKeys(AdminList);
    const [stateOpenKeys, setStateOpenKeys] = useState(AdminList);
    const onOpenChange = (openKeys) => {
        const currentOpenKey = openKeys.find(
            (key) => stateOpenKeys.indexOf(key) === -1
        );
        // open
        if (currentOpenKey !== undefined) {
            const repeatIndex = openKeys
                .filter((key) => key !== currentOpenKey)
                .findIndex(
                    (key) => levelKeys[key] === levelKeys[currentOpenKey]
                );
            setStateOpenKeys(
                openKeys

                    .filter((_, index) => index !== repeatIndex)

                    .filter(
                        (key) => levelKeys[key] <= levelKeys[currentOpenKey]
                    )
            );
        } else {
            // close
            setStateOpenKeys(openKeys);
        }
    };
    const handleSelected = (e) => {
        if (e.key === "/login") {
            localStorage.removeItem("token");
        }
    };
    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div
                className="demo-logo-vertical"
                style={{
                    background: colorBgContainer,
                    padding: "24px",
                }}
            >
                <img
                    style={{
                        width: "80%",
                    }}
                    src="https://demo.1office.vn/packages/4x/style/packages/login/images/logo.svg"
                    alt=""
                />
            </div>
            <Menu
                onSelect={handleSelected}
                openKeys={stateOpenKeys}
                onOpenChange={onOpenChange}
                theme="light"
                mode="inline"
                items={
                    account.account.dutyName === "Admin"
                        ? AdminList
                        : account.account.dutyName === "Manager"
                        ? Manager
                        : Employee
                }
                style={{
                    height: "100%",
                    border: "none",
                }}
            />
        </Sider>
    );
}
