import { Button, Descriptions, Modal, Tag, notification } from "antd";
import dayjs from "dayjs";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { AccountContext } from "../../../Context/AccountContext";
import salaryHistory from "../../../Services/SalaryHistoryApi";

DetailSalaryHistory.propTypes = {
    record: PropTypes.object.isRequired,
    fetchData: PropTypes.func.isRequired,
};

export default function DetailSalaryHistory({ record, fetchData }) {
    const account = useContext(AccountContext);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const [apiNotification, contextHolderNotification] =
        notification.useNotification();
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = async () => {
        setConfirmLoading(true);
        try {
            if (account.account.dutyName !== "Admin") throw "khong phai admin";
            const response = await salaryHistory.updatePaidDate(record.id);

            apiNotification.success({
                message: "Success!",
                description: `${response.message}`,
                placement: "topRight",
            });
            fetchData();
        } catch (error) {
            apiNotification.error({
                message: "Error!",
                description: `${error}`,
                placement: "topRight",
            });
        } finally {
            setConfirmLoading(false);
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
                    ) : record.dutyName === "Manager" ? (
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
            children: Math.floor(record.basicSalaryStorage).toLocaleString(
                "de-DE"
            ),
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
            key: "totalHours",
            label: "totalHours",
            children: Math.floor(record.totalHours).toLocaleString("de-DE"),
        },
        {
            key: "totalBonus",
            label: "totalBonus",
            children: Math.floor(record.totalBonus).toLocaleString("de-DE"),
        },

        {
            key: "totalViolate",
            label: "totalViolate",
            children: Math.floor(record.totalViolate).toLocaleString("de-DE"),
        },
        {
            key: "totalSalary",
            label: "totalSalary",
            children: Math.floor(record.totalSalary).toLocaleString("de-DE"),
        },
        {
            key: "Paid date",
            label: "Paid date",
            children: (
                <>
                    {record.paidDate ? (
                        <Tag color="green">
                            {dayjs(record.paidDate).format("DD-MM-YYYY")}
                        </Tag>
                    ) : (
                        <Tag color="red">Have not been paid</Tag>
                    )}
                </>
            ),
        },
    ];
    return (
        <>
            {contextHolderNotification}
            <Button onClick={showModal}>Detail</Button>
            <Modal
                title="Basic salary"
                open={open}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={
                    <>
                        {account.account.dutyName === "Admin" && (
                            <Button key="back" onClick={handleCancel}>
                                Return
                            </Button>
                        )}
                        {account.account.dutyName === "Admin" && (
                            <Button
                                key="submit"
                                type="primary"
                                loading={confirmLoading}
                                onClick={handleOk}
                            >
                                Pay
                            </Button>
                        )}
                    </>
                }
            >
                <Descriptions layout="vertical" bordered items={items} />
            </Modal>
        </>
    );
}
