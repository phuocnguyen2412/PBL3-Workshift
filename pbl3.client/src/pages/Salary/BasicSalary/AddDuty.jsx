import { Button, Drawer, Form } from "antd";
import { useState } from "react";
import InputDutyForm from "./InputDutyForm";

export default function AddDuty({ setDutyList }) {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [form] = Form.useForm();
    const onClose = () => {
        setOpenDrawer(false);
        form.resetFields();
    };
    return (
        <>
            <Button onClick={() => setOpenDrawer(true)}>Thêm công việc</Button>
            <Drawer
                title="Create a new duty"
                width={720}
                onClose={onClose}
                open={openDrawer}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
            >
                <InputDutyForm
                    form={form}
                    onClose={onClose}
                    setDutyList={setDutyList}
                />
            </Drawer>
        </>
    );
}
