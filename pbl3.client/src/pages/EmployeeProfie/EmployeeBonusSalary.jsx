import { useEffect, useState } from "react";

import { Flex, Segmented, Spin } from "antd";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";

import TableBonus from "../Salary/BonusSalary/TableBonus";
import KanbanBonus from "../Salary/BonusSalary/KanbanBonus";

import useFetch from "../../custom hook/useFetch";
import localhost from "../../Services/localhost";
import { useParams } from "react-router-dom";

export default function EmployeeBonusSalary() {
    const { id } = useParams();

    const { getApi, loading } = useFetch(localhost);
    const [data, setData] = useState([]);
    const [type, setType] = useState(null);
    const fetchData = async () => {
        const response = await getApi(`/BonusSalary/${id}`);
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
            </Flex>

            <Spin spinning={loading}>{type}</Spin>
        </>
    );
}
