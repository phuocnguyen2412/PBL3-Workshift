import { useContext, useEffect, useState } from "react";
import CreateBonusSalary from "./CreateBonusSalary";
import { AccountContext } from "../../../Context/AccountContext";
import { Spin, Tabs } from "antd";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";

import TableBonus from "./TableBonus";
import KanbanBonus from "./KanbanBonus";
import bonusSalary from "../../../Services/BonusSalary";

const BonusSalary = () => {
    const account = useContext(AccountContext);
    const [loading, setloading] = useState(false);

    const [data, setData] = useState([]);

    const fetchData = async () => {
        const response = await bonusSalary.getAll();
        setData(response);
    };
    useEffect(() => {
        try {
            fetchData();
        } catch (error) {
            console.log(error);
        } finally {
            setloading(false);
        }
    }, []);

    return (
        <Spin spinning={loading}>
            <Tabs
                defaultActiveKey="1"
                items={[
                    {
                        key: "1",
                        children: (
                            <TableBonus data={data} fetchData={fetchData} />
                        ),
                        label: "List",
                        icon: <BarsOutlined />,
                    },
                    {
                        key: "2",
                        label: "Kanban",
                        children: <KanbanBonus data={data} />,
                        icon: <AppstoreOutlined />,
                    },
                ]}
                tabBarExtraContent={
                    account.account.dutyName === "Admin" && (
                        <CreateBonusSalary reload={fetchData} />
                    )
                }
            />
        </Spin>
    );
};

export default BonusSalary;
