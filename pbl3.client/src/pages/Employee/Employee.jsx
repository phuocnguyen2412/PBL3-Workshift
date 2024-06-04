import { useState } from "react";

import AddEmployee from "./AddEmployee";
import TabEmployee from "./TabEmployee";
import TableEmployee from "./TableEmployee";

import { Spin, notification } from "antd";
import employeeApi from "../../Services/employeeApi";

const Employee = () => {
    const [open, setOpen] = useState(false);
    const [loading, setloading] = useState(false);
    const [apiNotification, contextHolderNotification] =
        notification.useNotification();
    const [employee, setEmployee] = useState([]);
    async function handleTabCick(id) {
        try {
            setloading(true);
            let result;
            if (id === "Tất cả") {
                result = await employeeApi.getAll();
            } else {
                result = await employeeApi.findByStatus(id);
            }

            setEmployee(result);
        } catch (e) {
            apiNotification.error({
                message: "Error!",
                description: `${e}`,
                placement: "bottomRight",
            });
        } finally {
            setloading(false);
        }
    }

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    return (
        <>
            {contextHolderNotification}
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
        </>
    );
};

export default Employee;
