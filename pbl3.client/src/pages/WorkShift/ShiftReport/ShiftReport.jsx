import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import { DatePicker, Spin, Tabs, notification } from "antd";
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
    const [apiNotification, contextHolderNotification] =
        notification.useNotification();
    const [data, setData] = useState([]);
    const fetchData = async () => {
        if (account.account.dutyName === "Admin") {
            setData(await violateApi.getAll());
            return;
        }

        if (account.account.dutyName === "Manager") {
            setData(
                await violateApi.getAllOfManager(account.account.employeeId)
            );
            return;
        }
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

    const handleTimeSelect = async (e) => {
        try {
            setloading(true);
            const res = await violateApi.getAllOfDate(
                dayjs(e).format("YYYY-MM-DD")
            );
            if (account.account.dutyName === "Admin") setData(res);
            else
                setData(
                    res.filter(
                        (e) => e.managerId === account.account.employeeId
                    )
                );
        } catch (error) {
            apiNotification.error({
                message: "Error!",
                description: `There isn't any report that has date selected`,
                placement: "topRight",
            });
        } finally {
            setloading(false);
        }
    };
    return (
        <Spin spinning={loading}>
            {contextHolderNotification}
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
