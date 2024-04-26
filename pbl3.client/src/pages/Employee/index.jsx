import { useEffect, useState } from "react";
import useFetch from "../../custom hook/useFetch";
import TabEmployee from "./TabEmployee";

import TableEmployee from "./TableEmployee";
import { Modal, Form, Button, notification, Spin } from "antd";
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
function handleSubmitForm(e) {
    console.log(e);
}
const Employee = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
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

    return (
        <div>
            <TabEmployee
                handleTabCick={handleTabCick}
                handleOpenDrawer={() => {
                    console.log(1);
                    setOpenDrawer(true);
                }}
            />
            <InputEmployeeForm />
            {/* <TableEmployee data={employee} setEmployee={setEmployee} /> */}
        </div>
    );
};

export default Employee;
