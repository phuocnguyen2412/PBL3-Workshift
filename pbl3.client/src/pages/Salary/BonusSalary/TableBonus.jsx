import { Button, Table } from "antd";
import { useState } from "react";
import PropTypes from "prop-types";
import BonusContent from "./BonusContent";
import dayjs from "dayjs";
import DeleteBonus from "./DeleteBonus";
TableBonus.propTypes = {
    data: PropTypes.array.isRequired,
    fetchData: PropTypes.func.isRequired,
};
export default function TableBonus({ data, fetchData }) {

    const [open, setOpen] = useState(false);
    const columns = [
        {
            title: "Employee",
            dataIndex: "fullName",
            key: "name",
        },

        {
            title: "Date time",
            dataIndex: "dateTime",
            key: "date",
            render: (_, record) => (
                <>
                    <span>
                        {dayjs(record.dateTime).format("DD-MM-YYYY HH:mm:ss")}
                    </span>
                </>
            ),
        },

        {
            title: "Total",
            key: "totalBonus",
            dataIndex: "totalBonus",
            render: (_, record) => (
                <>
                    <span>{record.totalBonus.toLocaleString()}</span>
                </>
            ),
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
                    <BonusContent data={record} setOpen={setOpen} open={open} />
                </>
            ),
        },
        {
            title: "Delete",
            key: "delete",
            render: (_, record) => (
                <>
                    <DeleteBonus record={record} fetchData={fetchData} />
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
