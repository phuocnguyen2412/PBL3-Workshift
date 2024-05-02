import { useState } from "react";

import AddEmployee from "./AddEmployee";
import TabEmployee from "./TabEmployee";
import TableEmployee from "./TableEmployee";
import useFetch from "../../custom hook/useFetch";
import localhost from "../../Services/localhost";
import { Spin } from "antd";

const Employee = () => {
    const { getApi, loading } = useFetch(localhost);

    const [employee, setEmployee] = useState([]);
    async function handleTabCick(id) {
        try {
            let result;
            if (id === "Tất cả") {
                result = await getApi("/Employee");
            } else {
                result = await getApi(`/Employee/status/${id}`);
            }

            setEmployee(result);
        } catch (e) {
            console.log(e);
        }
    }
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    return (
        <Spin spinning={loading}>
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
        </Spin>
    );
};

export default Employee;
