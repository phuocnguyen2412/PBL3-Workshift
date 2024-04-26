import { useEffect, useState } from "react";
import useFetch from "../../custom hook/useFetch";
import TabEmployee from "./TabEmployee";

import TableEmployee from "./TableEmployee";
import { Form, Button, notification, Drawer } from "antd";
import InputEmployeeForm from "../../components/InputEmployeeForm/InputEmployeeForm";
import { DeleteColumnOutlined, SettingOutlined } from "@ant-design/icons";
import { Input } from "antd";
const { Search } = Input;
function handleTabCick(id) {
    console.log(id);
}
function handleSearch(value, event) {
    console.log(value);
}

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

    const [open, setOpen] = useState(false);
    const [reload, setReload] = useState(false);
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
                <InputEmployeeForm onClose={onClose} setReload={setReload} />
            </Drawer>

            <TableEmployee
                setReload={setReload}
                data={employee}
                setEmployee={setEmployee}
                reload={reload}
            />
        </div>
    );
};

export default Employee;
