import { Button, Table } from "antd";
import { useContext, useState } from "react";
import PropTypes from "prop-types";
import BonusContent from "./BonusContent";
import dayjs from "dayjs";
import DeleteBonus from "./DeleteBonus";
import { AccountContext } from "../../../Context/AccountContext";
import { Link } from "react-router-dom";
TableBonus.propTypes = {
    data: PropTypes.array.isRequired,
    fetchData: PropTypes.func.isRequired,
};
export default function TableBonus({ data, fetchData }) {
    const account = useContext(AccountContext);
    const [open, setOpen] = useState(false);

    let columns = [
        {
            title: "Employee",
            dataIndex: "fullName",
            key: "name",
            render: (_, record) => (
                <Link to={`/Employee/${record.employeeId}`}>
                    {record.fullName}
                </Link>
            ),
        },

        {
            title: "Date time",
            dataIndex: "dateTime",
            key: "date",

            render: (_, record) => (
                <>
                    <span>{dayjs(record.dateTime).format("DD-MM-YYYY")}</span>
                </>
            ),
        },

        {
            title: "Total",
            key: "totalBonus",
            dataIndex: "totalBonus",
            align: "center",
            render: (_, record) => (
                <>
                    <span>
                        {Math.floor(record.totalBonus).toLocaleString("de-DE")}
                    </span>
                </>
            ),
        },
        {
            title: "Action",
            key: "action",
            align: "center",
            width: "40px",
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
            align: "center",
            width: "40px",
            render: (_, record) => (
                <DeleteBonus record={record} fetchData={fetchData} />
            ),
        },
    ];
    if (account.account.dutyName !== "Admin") {
        columns = columns.filter((column) => column.key !== "delete");
    }
    return (
        <div>
            <Table bordered rowKey="id" dataSource={data} columns={columns} />
        </div>
    );
}
