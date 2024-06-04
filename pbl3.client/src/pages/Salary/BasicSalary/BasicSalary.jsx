import { useEffect, useState } from "react";
import dutyApi from "../../../Services/dutyApi";
import { Spin, Table, Tag } from "antd";
import EditDuty from "./EditDuty";
const BasicSalary = () => {
    const [dutyList, setDutyList] = useState([]);
    const [loading, setloading] = useState(false);
    useEffect(() => {
        try {
            setloading(true);
            const getData = async () => {
                const data = await dutyApi.getAll();
                setDutyList(data);
            };
            getData();
        } catch (error) {
            console.log(error);
        } finally {
            setloading(false);
        }
    }, []);
    const columns = [
        {
            title: "Duty",
            dataIndex: "dutyName",
            key: "dutyName",
            render: (_, record) => (
                <>
                    {record.dutyName === "Admin" ? (
                        <Tag bordered={false} color="red">
                            {record.dutyName}
                        </Tag>
                    ) : record.dutyName === "Manager" ? (
                        <Tag bordered={false} color="blue">
                            {record.dutyName}
                        </Tag>
                    ) : (
                        <Tag bordered={false} color="purple">
                            {record.dutyName}
                        </Tag>
                    )}
                </>
            ),
        },
        {
            title: "Basic salary",
            dataIndex: "basicSalary",
            key: "basicSalary",
        },
        {
            title: "Change",
            dataIndex: "Change",
            key: "change",
            render: (_, record) => (
                <EditDuty record={record} setDutyList={setDutyList} />
            ),
        },
    ];

    return (
        <>
            <Spin spinning={loading}>
                <Table rowKey="id" columns={columns} dataSource={dutyList} />
            </Spin>
        </>
    );
};

export default BasicSalary;
