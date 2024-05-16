import { Descriptions, Modal } from "antd";
import PropTypes from "prop-types";
import dayjs from "dayjs";
BonusContent.propTypes = {
    data: PropTypes.object.isRequired,
    setOpen: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};
export default function BonusContent({ data, setOpen, open }) {
    const items = [
        {
            key: "1",
            label: "Shift name",
            children: data.fullName,
        },
        {
            key: "2",
            label: "Date",
            children: dayjs(data.dateTime).format("DD-MM-YYYY HH:mm:ss"),
        },
        {
            key: "3",
            label: "Total",
            children: data.totalBonus.toLocaleString(),
        },
        {
            key: "4",
            label: "Reason",
            children: data.reason,
        },
    ];
    return (
        <Modal
            open={open}
            title="Chi tiết bonus"
            onCancel={() => setOpen(false)}
            footer={null}
        >
            <Descriptions layout="vertical" bordered items={items} />
        </Modal>
    );
}
