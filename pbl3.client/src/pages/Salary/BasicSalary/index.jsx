import { useState } from "react";

import TableDuty from "./TableDuty";

import AddDuty from "./AddDuty";

const BasicSalary = () => {
    const [dutyList, setDutyList] = useState([]);

    return (
        <div>
            <AddDuty setDutyList={setDutyList} />
            <TableDuty dutyList={dutyList} setDutyList={setDutyList} />
        </div>
    );
};

export default BasicSalary;
