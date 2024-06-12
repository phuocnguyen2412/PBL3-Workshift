import { useEffect, useState } from "react";

import { Spin, Table } from "antd";
import dayjs from "dayjs";
import DetailSalaryHistory from "./DetailSalaryHistory";
import { Link } from "react-router-dom";
import salaryHistory from "../../../Services/SalaryHistoryApi";

export default function TableSalaryHistory({ data, setData }) {
    const [loading, setloading] = useState(false);

    const fetchData = async () => {
        try {
            setloading(true);
            const response = await salaryHistory.getAll();
            setData(response);
        } catch (e) {
            console.log(e);
        } finally {
            setloading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    console.log(data);
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
            render: (_, record) => (
                <span>
                    {Math.floor(record.totalSalary).toLocaleString("de-DE")}
                </span>
            ),
        },
        {
            title: "Paid date",
            dataIndex: "paidDate",
            render: (_, record) => (
                <span>{dayjs(record.endDate).format("DD/MM/YYYY")}</span>
            ),
        },
        {
            align: "center",

            title: "detail",

            render: (_, record) => (
                <DetailSalaryHistory record={record} fetchData={fetchData} />
            ),
        },
    ];

    return (
        <Spin spinning={loading}>
            <Table dataSource={data} columns={columns} rowKey="id" />
        </Spin>
    );
}
