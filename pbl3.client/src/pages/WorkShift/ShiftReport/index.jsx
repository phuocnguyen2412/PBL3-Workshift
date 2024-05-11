import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import { Spin, Tabs } from "antd";
import TableReport from "./TableReport";
import KanbanReport from "./KanbanReport";
import { useEffect, useState } from "react";
import useFetch from "../../../custom hook/useFetch";
import localhost from "../../../Services/localhost";
import CreateReport from "./CreateReport";

const ShiftReport = () => {
    const { getApi, loading } = useFetch(localhost);
    const [data, setData] = useState([]);
    const fetchData = async () => {
        const newData = await getApi("/Violate");
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
                        children: <TableReport data={data} fetchData={fetchData} />,
                        label: "List",
                        icon: <BarsOutlined />,
                    },
                    {
                        key: "2",
                        label: "Kanban",
                        children: <KanbanReport data={data} />,
                        icon: <AppstoreOutlined />,
                    },
                ]}
                tabBarExtraContent={<CreateReport fetchData={fetchData} />}
            />
        </Spin>
    );
};

export default ShiftReport;
