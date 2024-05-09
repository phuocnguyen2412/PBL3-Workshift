import { useContext, useEffect, useState } from "react";
import CreateBonusSalary from "./CreateBonusSalary";
import { AccountContext } from "../../../Context/AccountContext";
import { Flex, Segmented, Spin } from "antd";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import useFetch from "../../../custom hook/useFetch";
import localhost from "../../../Services/localhost";
import TableBonus from "./TableBonus";
import KanbanBonus from "./KanbanBonus";

const BonusSalary = () => {
    const account = useContext(AccountContext);
    const { getApi, loading } = useFetch(localhost);
    const [data, setData] = useState([]);
    const [type, setType] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const response = await getApi("/BonusSalary");
            
            setData(response);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            setType(<TableBonus data={data} />);
        }
    }, [data]);

    const onChangeSegmented = (e) => {
        if (e === "List") setType(<TableBonus data={data} />);
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
                {account.account.dutyName === "Admin" && <CreateBonusSalary />}
            </Flex>

            <Spin spinning={loading}>{type}</Spin>
        </>
    );
};

export default BonusSalary;
