import { useEffect, useState } from "react";

import { Spin, Tabs } from "antd";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";

import TableBonus from "../Salary/BonusSalary/TableBonus";
import KanbanBonus from "../Salary/BonusSalary/KanbanBonus";

import { useParams } from "react-router-dom";
import bonusSalary from "../../Services/BonusSalary";
export default function EmployeeBonusSalary() {
    const [loading, setloading] = useState(false);
    const { id } = useParams();

    const [data, setData] = useState([]);

    const fetchData = async () => {
        const response = await bonusSalary.getAllOfEmployee(id);
        setData(response);
    };
    useEffect(() => {
        try {
            setloading(true);
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
            />
        </Spin>
    );
}
