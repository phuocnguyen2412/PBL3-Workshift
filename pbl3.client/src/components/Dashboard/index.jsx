import { Layout, Menu } from "antd";

import { AdminList } from "./DashboardList";
import { useState } from "react";
const { Sider } = Layout;

export default function AdminDashboard({ collapsed }) {
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
                    // remove repeat key
                    .filter((_, index) => index !== repeatIndex)
                    // remove current level all child
                    .filter(
                        (key) => levelKeys[key] <= levelKeys[currentOpenKey]
                    )
            );
        } else {
            // close
            setStateOpenKeys(openKeys);
        }
    };
    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical" />
            <Menu
                openKeys={stateOpenKeys}
                onOpenChange={onOpenChange}
                theme="light"
                mode="inline"
                items={AdminList}
                style={{
                    height: "100%",
                }}
            />
        </Sider>
    );
}
