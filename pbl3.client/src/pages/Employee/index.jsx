import { useState } from "react";

import AddEmployee from "./AddEmployee";
import TabEmployee from "./TabEmployee";
import TableEmployee from "./TableEmployee";
import useFetch from "../../custom hook/useFetch";
import localhost from "../../Services/localhost";
import { Spin, notification } from "antd";

const Employee = () => {
    const { getApi, loading } = useFetch(localhost);
    const [apiNotification, contextHolderNotification] =
        notification.useNotification();
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
            apiNotification.error({
                message: "Error!",
                description: `${e}`,
                placement: "bottomRight",
            });
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
