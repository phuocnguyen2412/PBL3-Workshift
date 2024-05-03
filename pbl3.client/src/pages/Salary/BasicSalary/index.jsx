import { useState } from "react";

import TableDuty from "./TableDuty";



const BasicSalary = () => {
    const [dutyList, setDutyList] = useState([]);

    return (
        <div>
            <TableDuty dutyList={dutyList} setDutyList={setDutyList} />
        </div>
    );
};

export default BasicSalary;
