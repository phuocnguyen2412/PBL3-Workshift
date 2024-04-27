import { useState } from "react";

import { Button, Drawer } from "antd";
import { DeleteColumnOutlined, SettingOutlined } from "@ant-design/icons";

import TabEmployee from "./TabEmployee";
import InputEmployeeForm from "../../components/InputEmployeeForm/InputEmployeeForm";
import TableEmployee from "./TableEmployee";

const Employee = () => {
    const [employee, setEmployee] = useState(
        [].map((item) => {
            return {
                ...item,
                change: (
                    <Button shape="circle" icon={<DeleteColumnOutlined />} />
                ),

                delete: <Button shape="circle" icon={<SettingOutlined />} />,
            };
        })
    );
    function handleTabCick(id) {
        console.log(id);
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
            <Drawer
                title="Create a new account"
                width={720}
                onClose={onClose}
                open={open}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
            >
                <InputEmployeeForm onClose={onClose} />
            </Drawer>

            <TableEmployee data={employee} setEmployee={setEmployee} />
        </div>
    );
};

export default Employee;
