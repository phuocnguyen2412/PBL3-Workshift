import { useContext, useEffect, useState } from "react";

import { Flex, Segmented, Spin } from "antd";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";

import TableBonus from "../Salary/BonusSalary/TableBonus";
import KanbanBonus from "../Salary/BonusSalary/KanbanBonus";
import CreateBonusSalary from "../Salary/BonusSalary/CreateBonusSalary";
import { AccountContext } from "../../Context/AccountContext";
import useFetch from "../../custom hook/useFetch";
import localhost from "../../Services/localhost";

export default function EmployeeBonusSalary() {
    const account = useContext(AccountContext);
    const { getApi, loading } = useFetch(localhost);
    const [data, setData] = useState([]);
    const [type, setType] = useState(null);
    const fetchData = async () => {
        const response = await getApi(
            `/BonusSalary/${account.account.employeeId}`
        );
        setData(response);
    };
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        setType(<TableBonus data={data} fetchData={fetchData} />);
    }, [data]);

    const onChangeSegmented = (e) => {
        if (e === "List")
            setType(<TableBonus data={data} fetchData={fetchData} />);
        else setType(<KanbanBonus data={data} />);
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
                {account.account.dutyName === "Admin" && (
                    <CreateBonusSalary reload={fetchData} />
                )}
            </Flex>

            <Spin spinning={loading}>{type}</Spin>
        </>
    );
}
