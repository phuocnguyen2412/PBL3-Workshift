import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import { Button, Flex, Segmented, Spin } from "antd";
import TableReport from "./TableReport";
import KanbanReport from "./KanbanReport";
import { useEffect, useState } from "react";
import useFetch from "../../../custom hook/useFetch";
import localhost from "../../../Services/localhost";

const ShiftReport = () => {
    const { getApi, loading } = useFetch(localhost);
    const [data, setData] = useState([]);
    const [type, setType] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            //const newData = await getApi("/ShiftReport");
            setData([
                {
                    id: 1,
                    employeeName: "ABC",
                    shiftName: "Ca sáng",
                    startTime: "07:00:00",
                    endTime: "12:00:00",
                    date: "2023-12-12",
                    managerName: "ABC Manager",
                    reason: "Làm bể cốc",
                    handle: -100000,
                    checked: false,
                },
            ]);
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
                <Button>Create shift report</Button>
            </Flex>

            <Spin spinning={loading}>{type}</Spin>
        </>
    );
};

export default ShiftReport;
