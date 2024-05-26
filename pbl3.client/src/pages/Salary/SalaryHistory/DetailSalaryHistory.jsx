import { Button, Descriptions, Modal, Tag, notification } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../../custom hook/useFetch";
import localhost from "../../../Services/localhost";
import PropTypes from "prop-types";
DetailSalaryHistory.propTypes = {
    record: PropTypes.object.isRequired,
    fetchData: PropTypes.func.isRequired,
};

export default function DetailSalaryHistory({ record, fetchData }) {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const { updateApi } = useFetch(localhost);
    const [apiNotification, contextHolderNotification] =
        notification.useNotification();
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = async () => {
        setConfirmLoading(true);
        try {
            const response = await updateApi(`/SalaryHistory/${record.id}`, {});

            apiNotification.success({
                message: "Success!",
                description: `${response.messsage}`,
                placement: "topRight",
            });
            fetchData();
        } catch (error) {
            apiNotification.error({
                message: "Error!",
                description: `${error}`,
                placement: "topRight",
            });
        }
        setOpen(false);
        setConfirmLoading(false);
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
                    <Link to={`/Employee/${record.employeeId}`}>
                        {record.fullName}
                    </Link>
                </>
            ),
        },
        {
            key: "1000",
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
            children: dayjs(record.startDate).format("DD-MM-YYYY"),
        },
        {
            key: "11",
            label: "End date",
            children: dayjs(record.endDate).format("DD-MM-YYYY"),
        },
        {
            key: "totalHours3",
            label: "totalHours",
            children: record.totalHours.toLocaleString(),
        },
        {
            key: "totalBonus",
            label: "totalBonus",
            children: record.totalBonus.toLocaleString(),
        },

        {
            key: "totalViolate",
            label: "totalViolate",
            children: record.totalViolate.toLocaleString(),
        },
        {
            key: "totalSalary",
            label: "totalSalary",
            children: record.totalSalary.toLocaleString(),
        },
        {
            key: "Paid date",
            label: "Paid date",
            children: (
                <>
                    {record.paidDate === "0001-01-01T00:00:00" ? (
                        <Tag color="red">Have not been paid</Tag>
                    ) : (
                        <Tag color="green">
                            {dayjs(record.paidDate).format("DD-MM-YYYY")}
                        </Tag>
                    )}
                </>
            ),
        },
    ];
    return (
        <>
            {contextHolderNotification}
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
