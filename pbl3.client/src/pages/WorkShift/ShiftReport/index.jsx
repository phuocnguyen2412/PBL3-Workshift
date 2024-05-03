import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import { Segmented, Spin } from "antd";
import TableReport from "./TableReport";
import KanbanReport from "./KanbanReport";
import { useEffect, useState } from "react";
import useFetch from "../../../custom hook/useFetch";
import localhost from "../../../Services/localhost";

const ShiftReport = () => {
    const { getApi, loading } = useFetch(localhost);
    const [data, setData] = useState([]);
    const [type, setType] = useState(<TableReport />);
    useEffect(() => {
        const fetchData = async () => {
            //setData(getApi("/ShiftReport"));
            setData([1, 2, 3, 4]);
        };
        fetchData();
    }, []);
    const onChangeSegmented = (e) => {
        if (e === "List") setType(<TableReport data={data} />);
        else setType(<KanbanReport data={data} />);
    };
    return (
        <>
            <Segmented
                onChange={onChangeSegmented}
                block
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
            <Spin spinning={loading}>{type}</Spin>
        </>
    );
};

export default ShiftReport;
