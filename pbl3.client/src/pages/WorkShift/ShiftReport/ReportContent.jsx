import { Badge, Descriptions, Modal, Spin, Tag, notification } from "antd";
import PropTypes from "prop-types";

import { useContext, useState } from "react";
import { AccountContext } from "../../../Context/AccountContext";
import violateApi from "../../../Services/violateApi";
ReportContent.propTypes = {
    data: PropTypes.object.isRequired,
    setOpen: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    fetchData: PropTypes.func.isRequired,
};
export default function ReportContent({ data, setOpen, open, fetchData }) {
    const [loading, setloading] = useState(false);
    const account = useContext(AccountContext);
    const [apiNotification, contextHolderNotification] =
        notification.useNotification();

    const handleUpdateReport = async () => {
        try {
            setloading(true);
            if (account.account.dutyName !== "Admin") return;
            await violateApi.updateChecked(data.id, !data.checked);

            apiNotification.success({
                message: "Success!",
                description: `You updated report!`,
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
            setloading(false);
        }
    };
    const items = [
        {
            key: "1",
            label: "Shift name",
            children: data.shiftName,
        },
        {
            key: "2",
            label: "Date",
            children: data.date,
        },
        {
            key: "3",
            label: "Start time",
            children: data.startTime,
        },
        {
            key: "4",
            label: "End time",
            children: data.endTime,
        },
        {
            key: "5",
            label: "Employee",
            children: data.employeeName,
        },
        {
            key: "10",
            label: "Handle",
            children:
                data.handle > 0 ? (
                    <Tag color="green">{data.handle.toLocaleString()}</Tag>
                ) : (
                    <Tag color="red">{data.handle.toLocaleString()}</Tag>
                ),
        },
        {
            key: "7",
            label: "Reason",
            children: data.reason,
            span: 3,
        },
        {
            key: "8",
            label: "Reason",
            children: data.managerName,
        },
        {
            key: "6",
            label: "Check",
            children: data.checked ? (
                <Badge color="green" text={`${data.checked}`} />
            ) : (
                <Badge color="red" text={`${data.checked}`} />
            ),
        },
    ];
    return (
        <>
            {contextHolderNotification}
            <Spin spinning={loading}>
                <Modal
                    open={open}
                    title="Chi tiết report"
                    onCancel={() => setOpen(false)}
                    okText={data.checked ? "Hủy xác nhận" : "Xác nhận"}
                    onOk={() => {
                        handleUpdateReport();
                        setOpen(false);
                    }}
                >
                    <Descriptions layout="vertical" bordered items={items} />
                </Modal>
            </Spin>
        </>
    );
}
