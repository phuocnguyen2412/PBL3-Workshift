import { useContext, useEffect, useState } from "react";
import localhost from "../../Services/localhost";
import useFetch from "../../custom hook/useFetch";
import TableReport from "../WorkShift/ShiftReport/TableReport";
import KanbanReport from "../WorkShift/ShiftReport/KanbanReport";
import { Spin, Tabs } from "antd";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import CreateReport from "../WorkShift/ShiftReport/CreateReport";
import { AccountContext } from "../../Context/AccountContext";

export default function EmployeeShiftReport() {
    const account = useContext(AccountContext);
    const { getApi, loading } = useFetch(localhost);
    const [data, setData] = useState([]);

    const fetchData = async () => {
        const newData = await getApi(
            `/Violate/ByemployeeId/${account.account.employeeId}`
        );
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
                tabBarExtraContent={<CreateReport fetchData={fetchData} />}
            />
        </Spin>
    );
}
