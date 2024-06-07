import { useContext, useEffect, useState } from "react";
import CreateBonusSalary from "./CreateBonusSalary";
import { AccountContext } from "../../../Context/AccountContext";
import { DatePicker, Spin, Tabs, notification } from "antd";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";

import TableBonus from "./TableBonus";
import KanbanBonus from "./KanbanBonus";
import bonusSalary from "../../../Services/BonusSalary";
import dayjs from "dayjs";

const BonusSalary = () => {
    const account = useContext(AccountContext);
    const [loading, setloading] = useState(false);
    const [apiNotification, contextHolderNotification] =
        notification.useNotification();
    const [data, setData] = useState([]);

    const fetchData = async () => {
        const response = await bonusSalary.getAll();
        setData(response);
    };
    useEffect(() => {
        try {
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
            setData(
                await bonusSalary.getAllByDate(dayjs(e).format("YYYY-MM-DD"))
            );
        } catch (error) {
            apiNotification.error({
                message: "Error!",
                description: `${error}`,
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
                            <TableBonus data={data} fetchData={fetchData} />
                        ),
                        label: "List",
                        icon: <BarsOutlined />,
                    },
                    {
                        key: "2",
                        label: "Kanban",
                        children: <KanbanBonus data={data} />,
                        icon: <AppstoreOutlined />,
                    },
                ]}
                tabBarExtraContent={
                    account.account.dutyName === "Admin" && (
                        <CreateBonusSalary reload={fetchData} />
                    )
                }
            />
        </Spin>
    );
};

export default BonusSalary;
