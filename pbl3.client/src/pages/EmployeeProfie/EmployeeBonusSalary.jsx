import { useEffect, useState } from "react";

import { DatePicker, Spin, Tabs } from "antd";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";

import TableBonus from "../Salary/BonusSalary/TableBonus";
import KanbanBonus from "../Salary/BonusSalary/KanbanBonus";

import { useParams } from "react-router-dom";
import bonusSalary from "../../Services/BonusSalary";
import dayjs from "dayjs";
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
    const handleTimeSelect = async (e) => {
        try {
            setloading(true);
            const res = await bonusSalary.getAllByDate(
                dayjs(e).format("YYYY-MM-DD")
            );
            setData(res.filter((data) => data.employeeId == id));
        } catch (error) {
            apiNotification.error({
                message: "Error!",
                description: `There isn't any report that has date selected`,
                placement: "topRight",
            });
        } finally {
            setloading(false);
        }
    };
    return (
        <Spin spinning={loading}>
            <DatePicker
                style={{
                    width: "100%",
                }}
                onChange={handleTimeSelect}
                size="large"
            />
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
