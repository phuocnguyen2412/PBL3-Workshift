import { Descriptions } from "antd";
import dayjs from "dayjs";
import PropsType from "prop-types";
ShiftDetail.propTypes = {
    shift: PropsType.object.isRequired,
};
export default function ShiftDetail({ shift }) {
    const items = [
        {
            key: "1",
            label: "Manager's name",
            children: shift.managerName,
            span: 3,
        },
        {
            key: "2",
            label: "Check in time",
            children: dayjs(shift.checkInTime).format("DD/MM/YYYY HH:mm:ss"),
            span: 3,
        },
        {
            key: "3",
            label: "Check out time",
            children: dayjs(shift.checkOutTime).format("DD/MM/YYYY HH:mm:ss"),
            span: 3,
        },
        {
            key: "4",
            label: "Total hours",
            children: shift.totalHours,
            span: 3,
        },
    ];
    return <Descriptions title="Shift Info" bordered items={items} />;
}
