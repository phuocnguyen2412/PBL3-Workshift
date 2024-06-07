import { useEffect, useState } from "react";

import TableReport from "../WorkShift/ShiftReport/TableReport";
import KanbanReport from "../WorkShift/ShiftReport/KanbanReport";
import { Spin, Tabs } from "antd";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";

import { useParams } from "react-router-dom";
import violateApi from "../../Services/violateApi";

export default function EmployeeShiftReport() {
    const [loading, setloading] = useState(false);
    const { id } = useParams();

    const [data, setData] = useState([]);

    const fetchData = async () => {
        const newData = await violateApi.getAllOfEmployeeId(id);
        setData(newData);
    };

    useEffect(() => {
        setloading(true);

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
                            <TableReport data={data} fetchData={fetchData} />
                        ),
                        label: "List",
                        icon: <BarsOutlined />,
                    },
                    {
                        key: "2",
                        label: "Kanban",
                        children: (
                            <KanbanReport data={data} fetchData={fetchData} />
                        ),
                        icon: <AppstoreOutlined />,
                    },
                ]}
            />
        </Spin>
    );
}
