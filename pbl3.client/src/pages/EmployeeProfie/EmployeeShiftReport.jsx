import { useContext, useEffect, useState } from "react";
import localhost from "../../Services/localhost";
import useFetch from "../../custom hook/useFetch";
import TableReport from "../WorkShift/ShiftReport/TableReport";
import KanbanReport from "../WorkShift/ShiftReport/KanbanReport";
import { Flex, Segmented, Spin } from "antd";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import CreateReport from "../WorkShift/ShiftReport/CreateReport";
import { AccountContext } from "../../Context/AccountContext";

export default function EmployeeShiftReport() {
    const account = useContext(AccountContext);
    const { getApi, loading } = useFetch(localhost);
    const [data, setData] = useState([]);
    const [type, setType] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const newData = await getApi(
                `/Violate/${account.account.employeeId}`
            );
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
}
