import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import { Flex, Segmented, Spin } from "antd";
import TableReport from "./TableReport";
import KanbanReport from "./KanbanReport";
import { useEffect, useState } from "react";
import useFetch from "../../../custom hook/useFetch";
import localhost from "../../../Services/localhost";
import CreateReport from "./CreateReport";

const ShiftReport = () => {
    const { getApi, loading } = useFetch(localhost);
    const [data, setData] = useState([]);
    const [type, setType] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const newData = await getApi("/Violate");
            setData(newData);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            setType(<TableReport data={data} />);
        }
    }, [data]);

    const onChangeSegmented = (e) => {
        if (e === "List") setType(<TableReport data={data} />);
        else setType(<KanbanReport data={data} />);
    };
    return (
        <>
            <Flex justify="space-between">
                <Segmented
                    onChange={onChangeSegmented}
                    options={[
                        {
                            label: "List",
                            value: "List",
                            icon: <BarsOutlined />,
                        },
                        {
                            label: "Kanban",
                            value: "Kanban",
                            icon: <AppstoreOutlined />,
                        },
                    ]}
                />
                <CreateReport />
            </Flex>

            <Spin spinning={loading}>{type}</Spin>
        </>
    );
};

export default ShiftReport;
