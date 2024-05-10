import { Badge, Descriptions, Modal, Tag } from "antd";
import PropTypes from "prop-types";
ReportContent.propTypes = {
    data: PropTypes.object.isRequired,
    setOpen: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};
export default function ReportContent({ data, setOpen, open }) {
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
        <Modal
            open={open}
            title="Chi tiết report"
            onCancel={() => setOpen(false)}
            okText="Xác nhận"
            onOk={() => {
                console.log("ok");
                setOpen(false);
            }}
        >
            {" "}
            <Descriptions layout="vertical" bordered items={items} />
        </Modal>
    );
}
