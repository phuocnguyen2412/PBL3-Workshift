import { Spin, Table, Tag } from "antd";
import { useEffect } from "react";
import PropTypes from "prop-types";
import useFetch from "../../../custom hook/useFetch";
import localhost from "../../../Services/localhost";

import EditDuty from "./EditDuty";

export default function TableDuty({ dutyList, setDutyList }) {
    const { getApi, loading } = useFetch(localhost);

    useEffect(() => {
        const getData = async () => {
            const data = await getApi("/Duty");
            setDutyList(data);
        };
        getData();
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
                    ) : record.dutyName === "Quản lý" ? (
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
                <Table
                    rowKey="id"
                    columns={columns}
                    dataSource={dutyList}
                ></Table>
                ;
            </Spin>
        </>
    );
}
TableDuty.propTypes = {
    dutyList: PropTypes.array.isRequired,
    setDutyList: PropTypes.func.isRequired,
};
