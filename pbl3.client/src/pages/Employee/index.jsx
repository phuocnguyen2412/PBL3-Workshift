import { useEffect, useState } from "react";
import useFetch from "../../custom hook/useFetch";
import TabEmployee from "./TabEmployee";

import TableEmployee from "./TableEmployee";
import { Form, Button, notification, Drawer } from "antd";
import InputEmployeeForm from "../../components/InputEmployeeForm/InputEmployeeForm";
import { DeleteColumnOutlined, SettingOutlined } from "@ant-design/icons";
function handleTabCick(id) {
    console.log(id);
    api.success({
        message: "Thành công!",
        description: "Bạn đã thêm nhân viên thành công",
    });
    api.error({
        message: "Thất bại!",
        description: "Bạn đã thêm nhân viên thất bại",
    });
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
    const [api, contextHolder] = notification.useNotification();
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
                data={employee}
                setEmployee={setEmployee}
                reload={reload}
            />
        </div>
    );
};

export default Employee;
