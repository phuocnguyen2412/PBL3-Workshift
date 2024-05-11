import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import { Flex, Spin, Tabs } from "antd";
import TableReport from "./TableReport";
import KanbanReport from "./KanbanReport";
import { useEffect, useState } from "react";
import useFetch from "../../../custom hook/useFetch";
import localhost from "../../../Services/localhost";
import CreateReport from "./CreateReport";

const ShiftReport = () => {
    const { getApi, loading } = useFetch(localhost);
    const [data, setData] = useState([]);

    useEffect(() => {
        try {
            const fetchData = async () => {
                const newData = await getApi("/Violate");
                setData(newData);
            };
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
                        children: <TableReport data={data} />,
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
                tabBarExtraContent={<CreateReport />}
            />
        </Spin>
    );
};

export default ShiftReport;
