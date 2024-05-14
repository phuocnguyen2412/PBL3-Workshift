import { Button, Table } from "antd";
import ReportContent from "./ReportContent";
import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { AccountContext } from "../../../Context/AccountContext";
TableReport.propTypes = {
    data: PropTypes.array.isRequired,
    fetchData: PropTypes.func.isRequired,
};
export default function TableReport({ data, fetchData }) {
    const account = useContext(AccountContext);
    const [open, setOpen] = useState(false);
    const columns = [
        {
            title: "Employee",
            dataIndex: "employeeName",
            key: "name",
        },
        {
            title: "Age",
            dataIndex: "shiftName",
            key: "shiftName",
        },
        {
            title: "Address",
            dataIndex: "date",
            key: "date",
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
