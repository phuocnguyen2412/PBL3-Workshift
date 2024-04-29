import { useState } from "react";

import AddEmployee from "./AddEmployee";
import TabEmployee from "./TabEmployee";
import TableEmployee from "./TableEmployee";

const Employee = () => {
    const [employee, setEmployee] = useState(null);
    function handleTabCick(id) {
        if (id === "Tất cả") setEmployee();
        if (id === "Đang đi làm")
            setEmployee(employee.filter((item) => item.Status === true));
        if (id === "Đã nghỉ làm")
            setEmployee(employee.filter((item) => item.Status === false));
    }
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <TabEmployee
                handleTabCick={handleTabCick}
                handleOpenDrawer={showDrawer}
            />
            <AddEmployee
                open={open}
                onClose={onClose}
                setEmployee={setEmployee}
            />

            <TableEmployee
                data={employee}
                setEmployee={setEmployee}
                handleOpenDrawer={showDrawer}
            />
        </div>
    );
};

export default Employee;
