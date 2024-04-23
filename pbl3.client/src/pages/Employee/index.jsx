import { useEffect, useState } from "react";
import TabEmployee from "./TabEmployee";
import TableEmployee from "./TableEmployee";

const Employee = () => {
    const [employee, setEmployee] = useState([]);
    function handleTabCick(id) {}
    useEffect(() => {});
    const [open, setOpen] = useState(false);
    return (
        <div>
            <TabEmployee handleTabCick={handleTabCick} />
            <TableEmployee data={employee}></TableEmployee>
        </div>
    );
};

export default Employee;
