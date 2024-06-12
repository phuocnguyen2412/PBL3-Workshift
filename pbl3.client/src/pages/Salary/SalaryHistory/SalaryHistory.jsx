import { useState } from "react";
import CreateSalaryHistory from "./CreateSalaryHistory";
import TableSalaryHistory from "./TableSalaryHistory";

const SalaryHistory = () => {
    const [data, setData] = useState([]);
    return (
        <>
            <CreateSalaryHistory  setData={setData} />
            <TableSalaryHistory data={data} setData={setData} />
        </>
    );
};

export default SalaryHistory;
