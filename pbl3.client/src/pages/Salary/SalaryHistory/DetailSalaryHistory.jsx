import { Button, Descriptions, Modal, Tag } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function DetailSalaryHistory({ record }) {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setModalText("The modal will be closed after two seconds");
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };
    const handleCancel = () => {
        console.log("Clicked cancel button");
        setOpen(false);
    };
    const items = [
        {
            key: "1",
            label: "Full name",
            children: (
                <>
                    <Link to={`/Employee/${record.id}`}>{record.fullName}</Link>
                </>
            ),
        },
        {
            key: "2",
            label: "Duty",
            children: (
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
            key: "5",
            label: "Coeficients",
            children: record.coefficientsSalary,
        },
        {
            key: "4",
            label: "Basic Salary",
            children: record.basicSalary,
        },

        {
            key: "10",
            label: "Start date",
            children: dayjs(record.startDate).format("DD-MM-YYYY HH:mm:ss"),
        },
        {
            key: "11",
            label: "End date",
            children: dayjs(record.endDate).format("DD-MM-YYYY HH:mm:ss"),
        },
        {
            key: "3",
            label: "totalHours",
            children: record.totalHours.toLocaleString(),
        },
        {
            key: "3",
            label: "totalBonus",
            children: record.totalBonus.toLocaleString(),
        },

        {
            key: "3",
            label: "totalViolate",
            children: record.totalViolate.toLocaleString(),
        },
        {
            key: "3",
            label: "totalSalary",
            children: record.totalSalary.toLocaleString(),
        },
        {
            key: "4",
            label: "Paid date",
            children: (
                <>
                    {record.paidDate === "0001-01-01T00:00:00" ? (
                        <Tag color="red">Have not been paid</Tag>
                    ) : (
                        <Tag color="green">
                            {dayjs(record.paidDate).format(
                                "DD-MM-YYYY HH:mm:ss"
                            )}{" "}
                        </Tag>
                    )}
                </>
            ),
        },
    ];
    return (
        <>
            <Button type="primary" onClick={showModal}>
                Detail
            </Button>
            <Modal
                title="Basic salary"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Descriptions layout="vertical" bordered items={items} />
            </Modal>
        </>
    );
}
