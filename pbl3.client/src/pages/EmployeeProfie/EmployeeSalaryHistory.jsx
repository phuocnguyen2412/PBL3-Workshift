import dayjs from "dayjs";
import DetailSalaryHistory from "../Salary/SalaryHistory/DetailSalaryHistory";
import useFetch from "../../custom hook/useFetch";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Spin, Table } from "antd";
import localhost from "../../Services/localhost";

const EmployeeSalaryHistory = () => {
    const { id } = useParams();
    const { getApi, loading } = useFetch(localhost);
    const [data, setData] = useState([]);
    const fetchData = async () => {
        try {
            console.log(`/SalaryHistory/EmployeeId?EmployeeId=${id}`);
            const response = await getApi(
                `/SalaryHistory/EmployeeId?EmployeeId=${id}`
            );
            console.log(response);
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
                <span>{dayjs(record.endDate).format("DD/MM/YYYY")}</span>
            ),
        },
        {
            align: "center",

            title: "Detail",

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
};

export default EmployeeSalaryHistory;
