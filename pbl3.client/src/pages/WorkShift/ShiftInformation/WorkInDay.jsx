import { Collapse } from "antd";
import TableEmployeePerShift from "./TableEmployeePerShift";
import ShiftAction from "./ShiftAction";

const WorkInDay = () => {
    const items = [
        {
            key: "1",
            label: <ShiftAction />,
            children: <TableEmployeePerShift />,
        },
        {
            key: "2",
            label: "This is panel header 2",
            children: <TableEmployeePerShift />,
        },
        {
            key: "3",
            label: "This is panel header 3",
            children: <TableEmployeePerShift />,
        },
    ];
    return <Collapse accordion items={items} />;
};

export default WorkInDay;
