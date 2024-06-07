import { Button, Table } from "antd";
import ReportContent from "./ReportContent";
import { useState } from "react";
import PropTypes from "prop-types";

import dayjs from "dayjs";
import { Link } from "react-router-dom";
TableReport.propTypes = {
    data: PropTypes.array.isRequired,
    fetchData: PropTypes.func.isRequired,
};
export default function TableReport({ data, fetchData }) {
    const [open, setOpen] = useState(false);
    const columns = [
        {
            title: "Employee",
            dataIndex: "employeeName",
            key: "name",
            render: (_, record) => (
                <Link to={`/Employee/${record.employeeId}`}>
                    {record.employeeName}
                </Link>
            ),
        },
        {
            title: "Shift name",
            dataIndex: "shiftName",
            key: "shiftName",
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            render: (_, record) => (
                <span>{dayjs(record.date).format("DD-MM-YYYY")}</span>
            ),
        },
        {
            title: "Start time",
            key: "startTime",
            dataIndex: "startTime",
        },
        {
            title: "End time",
            key: "endTime",
            dataIndex: "endTime",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <>
                    <Button
                        onClick={() => {
                            setOpen(true);
                        }}
                    >
                        More
                    </Button>
                    <ReportContent
                        fetchData={fetchData}
                        data={record}
                        setOpen={setOpen}
                        open={open}
                    />
                </>
            ),
        },
    ];

    return (
        <div>
            <Table rowKey="id" dataSource={data} columns={columns} />
        </div>
    );
}
