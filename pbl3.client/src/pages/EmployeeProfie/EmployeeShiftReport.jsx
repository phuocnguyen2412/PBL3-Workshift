import { useEffect, useState } from "react";
import localhost from "../../Services/localhost";
import useFetch from "../../custom hook/useFetch";
import TableReport from "../WorkShift/ShiftReport/TableReport";
import KanbanReport from "../WorkShift/ShiftReport/KanbanReport";
import { Spin, Tabs } from "antd";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";

import { useParams } from "react-router-dom";

export default function EmployeeShiftReport() {
    const { id } = useParams();
    const { getApi, loading } = useFetch(localhost);
    const [data, setData] = useState([]);

    const fetchData = async () => {
        const newData = await getApi(`/Violate/ByemployeeId/${id}`);
        setData(newData);
    };

    useEffect(() => {
        try {
            fetchData();
        } catch (error) {
            console.log(error);
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
