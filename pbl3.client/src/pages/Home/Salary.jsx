import { useEffect, useState } from "react";
import useFetch from "../../custom hook/useFetch";
import localhost from "../../Services/localhost";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import DetailSalaryHistory from "../Salary/SalaryHistory/DetailSalaryHistory";
import { Alert, Col, Row, Spin, Table } from "antd";

export default function Salary() {
    const { getApi, loading } = useFetch(localhost);
    const [data, setData] = useState([]);
    const fetchData = async () => {
        try {
            const response = await getApi(`/SalaryHistory`);

            setData(() => response.filter((data) => data.paidDate === null));
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

            title: "detail",

            render: (_, record) => (
                <DetailSalaryHistory record={record} fetchData={fetchData} />
            ),
        },
    ];

    return (
        <>
            {data.length > 0 && (
                <Row gutter={16}>
                    <Col span={24}>
                        <Spin spinning={loading}>
                            <Alert
                                message="You haven't paid "
                                description=<Table
                                    dataSource={data}
                                    columns={columns}
                                    rowKey="id"
                                />
                                type="warning"
                                showIcon
                                closable
                            />
                        </Spin>
                    </Col>
                </Row>
            )}
        </>
    );
}
