import React, { useEffect, useState } from "react";
import useFetch from "../../../custom hook/useFetch";
import localhost from "../../../Services/localhost";
import { Spin, Table } from "antd";
import dayjs from "dayjs";
import DetailSalaryHistory from "./DetailSalaryHistory";
import { Link } from "react-router-dom";

export default function TableSalaryHistory() {
    const { getApi, loading } = useFetch(localhost);
    const [data, setData] = useState([]);
    const fetchData = async () => {
        try {
            const response = await getApi(`/SalaryHistory`);

            setData(response);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    const columns = [
        {
            title: "Full Name",
            dataIndex: "fullName",
            render: (_, record) => {
                return (
                    <>
                        <Link to={`/Employee/${record.id}`}>
                            {record.fullName}
                        </Link>
                    </>
                );
            },
        },

        {
            title: "Start Date",
            dataIndex: "startDate",

            render: (_, record) => (
                <>
                    <span>
                        {dayjs(record.startDate).format("DD/MM/YYYY HH:mm")}
                    </span>
                </>
            ),
        },
        {
            title: "End date",
            dataIndex: "endDate",
            render: (_, record) => (
                <>
                    <span>
                        {dayjs(record.endDate).format("DD/MM/YYYY HH:mm")}
                    </span>
                </>
            ),
        },
        {
            title: "Total salary",
            dataIndex: "totalSalary",
        },
        {
            title: "Paid date",
            dataIndex: "paidDate",
            render: (_, record) => (
                <span>{dayjs(record.endDate).format("DD/MM/YYYY HH:mm")}</span>
            ),
        },
        {
            align: "center",

            title: "detail",

            render: (_, record) => <DetailSalaryHistory record={record} />,
        },
    ];

    return (
        <Spin spinning={loading}>
            <Table dataSource={data} colunms={columns} rowKey="id" />
        </Spin>
    );
}
