import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import { DatePicker, Spin, Tabs } from "antd";
import TableReport from "./TableReport";
import KanbanReport from "./KanbanReport";
import { useContext, useEffect, useState } from "react";

import CreateReport from "./CreateReport";
import { AccountContext } from "../../../Context/AccountContext";
import violateApi from "../../../Services/violateApi";
import dayjs from "dayjs";

const ShiftReport = () => {
    const [loading, setloading] = useState(false);
    const account = useContext(AccountContext);

    const [data, setData] = useState([]);
    const fetchData = async () => {
        let newData;
        if (account.account.dutyName === "Admin")
            newData = await violateApi.getAll();
        else if (account.account.dutyName === "Manager")
            newData = await violateApi.getAllOfManager(
                account.account.employeeId
            );

        setData(newData);
    };
    useEffect(() => {
        try {
            setloading(true);
            fetchData();
        } catch (error) {
            console.log(error);
        } finally {
            setloading(false);
        }
    }, []);
    const handleTimeSelect = (e) => {
        try {
            setloading(true);
        } catch (error) {
            console.log(error);
        } finally {
            setloading(false);
        }
        console.log(dayjs(e).format("YYYY-MM-DD"));
    };
    return (
        <Spin spinning={loading}>
            <DatePicker
                style={{
                    width: "100%",
                }}
                onChange={handleTimeSelect}
                size="large"
                
            />
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
