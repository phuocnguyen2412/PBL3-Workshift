import { useEffect, useState } from "react";
import TabEmployee from "./TabEmployee";
import TableEmployee from "./TableEmployee";
import { Modal, Form, Button, notification } from "antd";
import InputEmployeeForm from "../../components/InputEmployee/InputEmployeeForm";
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
        [
            {
                FullName: "234",
                Email: "123123123",
                PhoneNumber: "123",
                TypeOfEmployee: "123123",
                CoeficientsSalary: "123123",
                Duty: "1231312",
            },
        ].map((item) => {
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

    useEffect(() => {});
    return (
        <div>
            <InputEmployeeForm
                open={openDrawer}
                setOpenDrawer={setOpenDrawer}
            />

            <TabEmployee
                handleTabCick={handleTabCick}
                handleOpenDrawer={() => {
                    console.log(1);
                    setOpenDrawer(true);
                }}
            />
            <TableEmployee data={employee} />
        </div>
    );
};

export default Employee;
