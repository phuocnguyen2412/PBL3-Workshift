import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import { Spin, Tabs } from "antd";
import TableReport from "./TableReport";
import KanbanReport from "./KanbanReport";
import { useContext, useEffect, useState } from "react";
import useFetch from "../../../custom hook/useFetch";
import localhost from "../../../Services/localhost";
import CreateReport from "./CreateReport";
import { AccountContext } from "../../../Context/AccountContext";

const ShiftReport = () => {
    const account = useContext(AccountContext);
    const { getApi, loading } = useFetch(localhost);
    const [data, setData] = useState([]);
    const fetchData = async () => {
        let newData = await getApi("/Violate");
        if (account.account.dutyName === "Admin")
            newData = await getApi("/Violate");
        else if (account.account.dutyName === "Manager")
            newData = await getApi(
                `/Violate/ByManagerId/${account.account.employeeId}`
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
                tabBarExtraContent={
                    account.account.dutyName === "Manager" && (
                        <CreateReport fetchData={fetchData} />
                    )
                }
            />
        </Spin>
    );
};

export default ShiftReport;
